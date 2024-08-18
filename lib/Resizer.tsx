import { defineComponent, ref, reactive, PropType, onMounted } from 'vue';
import { css } from '@emotion/css';
import { DraggableCore } from "@marsio/vue-draggable";

const Wrapper = css`
  background: #000;
  opacity: 0.2;
  z-index: 1;
  box-sizing: border-box;
  background-clip: padding-box;

  :hover {
    transition: all 2s ease;
  }
`;

const HorizontalWrapper = css`
  ${Wrapper};
  height: 11px;
  margin: -5px 0;
  border-top: 5px solid rgba(255, 255, 255, 0);
  border-bottom: 5px solid rgba(255, 255, 255, 0);
  cursor: row-resize;
  width: 100%;

  :hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }

  .disabled {
    cursor: not-allowed;
  }
  .disabled:hover {
    border-color: transparent;
  }
`;

const VerticalWrapper = css`
  ${Wrapper};
  width: 11px;
  margin: 0 -5px;
  border-left: 5px solid rgba(255, 255, 255, 0);
  border-right: 5px solid rgba(255, 255, 255, 0);
  cursor: col-resize;

  :hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
  .disabled {
    cursor: not-allowed;
  }
  .disabled:hover {
    border-color: transparent;
  }
`;

export default defineComponent({
  name: 'Resizer',
  props: {
    index: {
      type: Number as PropType<number>,
      required: true
    },
    split: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical'
    },
    step: { type: Number, default: 1 },
  },
  setup(props, { emit }) {
    const { split, step } = props
    const resizer = ref<HTMLElement | null>(null);
    const draggableAxis = split === 'vertical' ? 'x' : 'y'

    const state = reactive({
      dragging: false
    })

    onMounted(() => {
      if (resizer.value) {
        resizer.value.setAttribute('data-attribute', props.split);
        resizer.value.setAttribute('data-type', 'Resizer');
      }
    });

    return () => {
      const wrapperClass = props.split === 'vertical' ? VerticalWrapper : HorizontalWrapper;
      return (
        <DraggableCore
          axis={draggableAxis}
          nodeRef={resizer}
          grid={[step, step]}
          dragFn={(e, data) => {
            if (!state.dragging) return false;
            emit('drag', e, data)
          }}
          stopFn={event => {
            state.dragging = false
            emit('touchEnd', event)
          }}
          startFn={event =>{
            state.dragging = true
            emit('mouseDown', event, props.index)
          }}
        >
          <div
            class={[wrapperClass, 'vue-splitpane-resizer']}
            ref={resizer}
          />
        </DraggableCore>
      )
    };
  }
});