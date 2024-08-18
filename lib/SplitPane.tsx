import { defineComponent, ref, reactive, Ref, PropType } from 'vue';
import { css } from '@emotion/css';
import { get, set, isEmpty } from 'lodash'

import Pane from './Pane'
import Resizer from './Resizer'
import {
  removeNullChildren,
  convert,
  getUnit,
  convertToUnit,
  adjustSize,
  DEFAULT_PANE_SIZE,
  DEFAULT_PANE_MAX_SIZE,
  DEFAULT_PANE_MIN_SIZE
} from './utils'

export type VueRef<T extends HTMLElement> = Ref<T | null>;

interface PaneDimensions {
  width: number;
  height: number;
}

interface DimensionsSnapshot {
  resizersSize: number;
  paneDimensions: PaneDimensions[];
  splitPaneSizePx: number;
  minSizesPx: number[];
  maxSizesPx: number[];
  sizesPx: number[];
}


interface State {
  sizes: string[];
  resizerIndex: number;
  dimensionsSnapshot: DimensionsSnapshot | null;
  startClientX: number;
  startClientY: number;
  paneElements: HTMLElement[];
}

const ColumnStyle = css`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
  outline: none;
  overflow: hidden;
  user-select: text;
`;

const RowStyle = css`
  display: flex;
  height: 100%;
  flex-direction: row;
  flex: 1;
  outline: none;
  overflow: hidden;
  user-select: text;
`;


const SplitPane = defineComponent({
  name: 'SplitPane',
  props: {
    // Determines if the pane is resizable. Default is true.
    allowResize: { type: Boolean, default: true },

    // Size of the resizer in pixels. Default is 1.
    resizerSize: {
      type: Number,
      default: 1
    },

    // Direction of the split. Can be either 'vertical' or 'horizontal'. Default is 'vertical'.
    split: {
      type: String as PropType<"vertical" | "horizontal">,
      default: 'vertical'
    },

    // Step size for resizing in pixels. Default is 1.
    step: { type: Number, default: 1 }
  },
  emits: ['change', 'drag', 'resizeStart', 'resizeEnd'],
  setup (props, { slots, emit }) {
    const {
      step,
      split,
    } = props

    const getPanePropMinMaxSize = (key: 'minSize' | 'maxSize') => {
      const children = slots.default ? slots.default() : []
      return removeNullChildren(children).map(child => 
        get(child, `props.${key}`) || 
        (key === 'maxSize' ? DEFAULT_PANE_MAX_SIZE : DEFAULT_PANE_MIN_SIZE)
      );
    }

    const getPanePropSize = () => {
      const children = slots.default ? slots.default() : []
      return removeNullChildren(children).map(child => 
        get(child, 'props.size') || 
        get(child, 'props.initialSize') || 
        DEFAULT_PANE_SIZE
      );
    }

    const state: State = reactive({
      sizes: getPanePropSize(),
      resizerIndex: 0,
      dimensionsSnapshot: null,
      startClientX: 0,
      startClientY: 0,
      paneElements: [],
    })

    const splitPaneRef: Ref<HTMLElement | null> = ref(null)

    const onMouseUp = (event) => {
      event.preventDefault();
      emit('resizeEnd', state.sizes)
    }

    const onMove = (e) => {
      const { clientX, clientY } = e
      const { split } = props
      const { resizerIndex } = state
      const {
        sizesPx,
        minSizesPx,
        maxSizesPx,
        splitPaneSizePx,
        paneDimensions
      } = state.dimensionsSnapshot as DimensionsSnapshot;

      const sizeDim = split === 'vertical' ? 'width' : 'height';
      const primary = paneDimensions[resizerIndex];
      const secondary = paneDimensions[resizerIndex + 1];
      const maxSize = primary[sizeDim] + secondary[sizeDim];
      const primaryMinSizePx = minSizesPx[resizerIndex];
      const secondaryMinSizePx = minSizesPx[resizerIndex + 1];
      const primaryMaxSizePx = Math.min(maxSizesPx[resizerIndex], maxSize);
      const secondaryMaxSizePx = Math.min(maxSizesPx[resizerIndex + 1], maxSize);
      const moveOffset = split === 'vertical'
        ? state.startClientX - clientX
        : state.startClientY - clientY;

      let primarySizePx = primary[sizeDim] - moveOffset;
      let secondarySizePx = secondary[sizeDim] + moveOffset;
      let primaryHasReachedLimit = false;
      let secondaryHasReachedLimit = false;

      const primaryAdjustment = adjustSize(primarySizePx, primaryMinSizePx, primaryMaxSizePx);
      primarySizePx = primaryAdjustment.sizePx;
      primaryHasReachedLimit = primaryAdjustment.hasReachedLimit;

      const secondaryAdjustment = adjustSize(secondarySizePx, secondaryMinSizePx, secondaryMaxSizePx);
      secondarySizePx = secondaryAdjustment.sizePx;
      secondaryHasReachedLimit = secondaryAdjustment.hasReachedLimit;

      if (primaryHasReachedLimit) {
        secondarySizePx = primary[sizeDim] + secondary[sizeDim] - primarySizePx;
      } else if (secondaryHasReachedLimit) {
        primarySizePx = primary[sizeDim] + secondary[sizeDim] - secondarySizePx;
      }

      sizesPx[resizerIndex] = primarySizePx;
      sizesPx[resizerIndex + 1] = secondarySizePx;

      let sizes = state.sizes.concat();
      let updateRatio;

      [primarySizePx, secondarySizePx].forEach((paneSize, idx) => {
        const unit = getUnit(sizes[resizerIndex + idx]);
        if (unit !== 'ratio') {
          sizes[resizerIndex + idx] = convertToUnit(paneSize, unit, splitPaneSizePx);
        } else {
          updateRatio = true;
        }
      });

      if (updateRatio) {
        let ratioCount = 0;
        let lastRatioIdx;
        sizes = sizes.map((size, idx) => {
          if (getUnit(size) === 'ratio') {
            ratioCount++;
            lastRatioIdx = idx;
  
            return convertToUnit(sizesPx[idx], 'ratio');
          }
  
          return size;
        });
  
        if (ratioCount === 1) {
          sizes[lastRatioIdx] = '1';
        }
      }
      emit('change', state.sizes)
      state.sizes = sizes;
    }

    const getResizersSize = (children) => {
      return (children.length - 1) * props.resizerSize;
    }

    const getPaneDimensions = () => {
      return state.paneElements.filter(el => el).map(el => el.getBoundingClientRect());
    }

    const getDimensionsSnapshot = (): DimensionsSnapshot => {
      const children = slots.default ? slots.default() : []
      const split = props.split;
      const paneDimensions = getPaneDimensions();
      const splitPaneDimensions = (splitPaneRef.value as HTMLElement).getBoundingClientRect();
      const minSizes: string[] = getPanePropMinMaxSize('minSize');
      const maxSizes: string[] = getPanePropMinMaxSize('maxSize');

      const resizersSize = getResizersSize(removeNullChildren(children));
      const splitPaneSizePx = splitPaneDimensions[`${split === 'vertical' ? 'width' : 'height'}`] - resizersSize;

      const minSizesPx = minSizes.map(s => convert(s, splitPaneSizePx));
      const maxSizesPx = maxSizes.map(s => convert(s, splitPaneSizePx));
      const sizesPx = paneDimensions.map(d => split === 'vertical' ? d.width : d.height);
  
      return {
        resizersSize,
        paneDimensions,
        splitPaneSizePx,
        minSizesPx,
        maxSizesPx,
        sizesPx
      };
    }

    const onDown = (resizerIndex, clientX, clientY) => {
      const {allowResize } = props;

      if (!allowResize) {
        return;
      }

      state.resizerIndex = resizerIndex;
      state.dimensionsSnapshot = getDimensionsSnapshot()
      state.startClientX = clientX;
      state.startClientY = clientY;
      emit('resizeStart', state.sizes)
    }

    const onMouseDown = (event, resizerIndex) => {
      event.preventDefault();
      onDown(resizerIndex, event.clientX, event.clientY)
    }

    const setPaneRef = (idx: number, el: HTMLElement | null) => {
      if (isEmpty(state.paneElements)) {
        state.paneElements = []
      }

      set(state, `paneElements[${idx}]`, el)
    }

    return () => {
      
      const children = slots.default ? slots.default() : []
      const notNullChildren = removeNullChildren(children)
      const resizersSize = getResizersSize(notNullChildren)
      const sizes = state.sizes;

      const elements = notNullChildren.reduce((acc, child, idx) => {
        const resizerIndex = idx - 1;
        const isPane = child.type === 'Pane';
        const paneProps = {
          index: idx,
          'data-type': 'Pane',
          split,
          class: 'vue-split-pane__pane',
          key: `Pane-${idx}`,
          innerRef: setPaneRef,
          resizersSize,
          size: sizes[idx]
        };
        const pane = isPane ? <Pane {...child.props} {...paneProps}>{child.children}</Pane> : (
          <Pane {...child.props} {...paneProps}>{child}</Pane>
        );
  
        if (acc.length === 0) {
          return [...acc, pane];
        } else {
          const resizer = (
            <Resizer
              index={resizerIndex}
              key={`Resizer-${resizerIndex}`}
              split={split}
              step={step}
              onDrag={onMove}
              onTouchEnd={onMouseUp}
              onMouseDown={onMouseDown}
            />
          );
  
          return [...acc, resizer, pane];
        }
      }, []);

      const className = split === 'vertical' ? RowStyle : ColumnStyle;

      return (
        <div
          data-type="SplitPane"
          data-split={split}
          ref={splitPaneRef}
          class={[className, 'vue-split-pane']}
        >
          {elements}
        </div>
      )
    }
  } 
})

export default SplitPane