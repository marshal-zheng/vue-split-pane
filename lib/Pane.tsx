import { defineComponent, ref, onMounted, PropType, CSSProperties, VNode } from 'vue';
import { prefix as prefixAll } from 'inline-style-prefixer';
import { convertSizeToCssValue, getUnit } from './utils';

function PaneStyle({ split, initialSize, size, minSize, maxSize, resizersSize }) {
  const value = size || initialSize;
  const vertical = split === 'vertical';
  const styleProp = {
    minSize: vertical ? 'minWidth' : 'minHeight',
    maxSize: vertical ? 'maxWidth' : 'maxHeight',
    size: vertical ? 'width' : 'height'
  };

  const style: CSSProperties = {
    display: 'flex',
    outline: 'none'
  };

  style[styleProp.minSize] = convertSizeToCssValue(minSize, resizersSize);
  style[styleProp.maxSize] = convertSizeToCssValue(maxSize, resizersSize);

  switch (getUnit(value)) {
    case 'ratio':
      style.flex = value;
      break;
    case '%':
    case 'px':
      style.flexGrow = 0;
      style[styleProp.size] = convertSizeToCssValue(value, resizersSize);
      break;
  }

  return style;
}

export default defineComponent({
  name: 'Pane',
  props: {
    // The index of the pane. Typically used to identify the pane in a list.
    index: {
      type: Number as PropType<number>
    },
  
    // Custom CSS class for the pane.
    class: {
      type: String as PropType<string>
    },
  
    // Direction of the split. Can be either 'vertical' or 'horizontal'.
    split: {
      type: String as PropType<'vertical' | 'horizontal'>
    },
  
    // Initial size of the pane. Can be a string (e.g., '50%') or a number (e.g., 200).
    initialSize: {
      type: [String, Number] as PropType<string | number>,
      default: '1'
    },
  
    // Minimum size of the pane. Can be a string (e.g., '10%') or a number (e.g., 100px).
    minSize: {
      type: String as PropType<string>,
      default: '0'
    },
  
    // Maximum size of the pane. Can be a string (e.g., '90%') or a number (e.g., 500px).
    maxSize: {
      type: String as PropType<string>,
      default: '100%'
    },
  
    // Current size of the pane. Can be a string (e.g., '50%') or a number (e.g., 200).
    size: {
      type: String as PropType<string>
    },
  
    // Reference to the inner element of the pane. Typically used for DOM manipulation.
    innerRef: {
      type: Function,
      default: () => () => {}
    },
  
    // Size of the resizers in pixels. Default is 1.
    resizersSize: {
      type: Number,
      default: 1
    }
  },
  setup(props, { slots }) {
    const eleRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      props.innerRef(props.index, eleRef.value);
    });

    return () => {
      const { class: className, split, size, initialSize, minSize, maxSize, resizersSize } = props;
      const prefixedStyle = prefixAll(PaneStyle({ split, initialSize, size, minSize, maxSize, resizersSize }));
      const children: VNode[] = slots.default ? slots.default() : [];

      return (
        <div ref={eleRef} class={className} style={prefixedStyle}>
          {children}
        </div>
      );
    };
  }
});