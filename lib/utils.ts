import { cloneVNode, VNode } from 'vue';

export const DEFAULT_PANE_SIZE = '1';
export const DEFAULT_PANE_MIN_SIZE = '0';
export const DEFAULT_PANE_MAX_SIZE = '100%';

export function cloneElement(vnode: VNode, props) {
  const mergedProps = { ...vnode.props };

  // Merge style
  if (props.style && vnode.props && vnode.props.style) {
    mergedProps.style = { ...vnode.props.style, ...props.style };
  }

  // Merge class
  if (props.class && vnode.props && vnode.props.class) {
    const existingClasses = Array.isArray(vnode.props.class) ? vnode.props.class : [vnode.props.class];
    const newClasses = Array.isArray(props.class) ? props.class : [props.class];
    mergedProps.class = [...existingClasses, ...newClasses];
  }

  return cloneVNode(vnode, mergedProps);
}

export function unFocus(document, window) {
  if (document.selection) {
    document.selection.empty();
  } else {
    try {
      window.getSelection().removeAllRanges();
    } catch (e) {
        // eslint-disable-next-line no-empty
    }
  }
}

export function getDefaultSize(defaultSize, minSize, maxSize, draggedSize) {
  if (typeof draggedSize === 'number') {
    const min = typeof minSize === 'number' ? minSize : 0;
    const max =
      typeof maxSize === 'number' && maxSize >= 0 ? maxSize : Infinity;
    return Math.max(min, Math.min(max, draggedSize));
  }
  if (defaultSize !== undefined) {
    return defaultSize;
  }
  return minSize;
}

export function removeNullChildren(children) {
  return children.filter(c => c);
}

export function toPx(value, unit = 'px', size) {
  switch (unit) {
    case '%': {
      return +(size * value / 100).toFixed(2);
    }
    default: {
      return +value;
    }
  }
}

export function convert(str: string, size: number): number {
  const tokens = str.match(/([0-9]+)([px|%]*)/);
  const value = tokens ? parseInt(tokens[1]) : 0;
  const unit = tokens ? tokens[2] : '';
  return toPx(value, unit, size);
}

export function getUnit(size) {
  if(size.endsWith('px')) {
    return 'px';
  }

  if(size.endsWith('%')) {
    return '%';
  }

  return 'ratio';
}

export function convertSizeToCssValue(value, resizersSize) {
  if(getUnit(value) !== '%') {
    return value;
  }

  if (!resizersSize) {
    return value;
  }

  const idx = value.search('%');
  const percent = value.slice(0, idx) / 100;
  if (percent === 0) {
    return value;
  }

  return `calc(${value} - ${resizersSize}px*${percent})`
}

export function convertToUnit(size: number, unit: string, containerSize?: number): string {
  switch(unit) {
    case '%':
      return  containerSize ? `${(size / containerSize * 100).toFixed(2)}%` : '';
    case 'px':
      return `${size.toFixed(2)}px`;
    case 'ratio':
      return (size * 100).toFixed(0);
    default:
      throw new Error(`Unsupported unit: ${unit}`);
  }
}

export function adjustSize(sizePx, minSizePx, maxSizePx) {
  let hasReachedLimit = false;
  if (sizePx < minSizePx) {
    sizePx = minSizePx;
    hasReachedLimit = true;
  } else if (sizePx > maxSizePx) {
    sizePx = maxSizePx;
    hasReachedLimit = true;
  }
  return { sizePx, hasReachedLimit };
}