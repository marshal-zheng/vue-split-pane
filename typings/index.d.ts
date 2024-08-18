declare module '@marsio/vue-split-pane' {
  import { DefineComponent } from 'vue';

  interface SplitPaneProps {
    allowResize: boolean,
    resizerSize: number,
    split: 'vertical' | 'horizontal',
    step: number
  }

  export interface PaneProps extends Props {
    index: number,
    class: string,
    split: 'vertical' | 'horizontal',
    initialSize: string | number,
    minSize: string | number,
    maxSize: string | number,
    size: string | number,
    resizersSize: number,
    innerRef: (index: number, ref: HTMLElement) => void
  } 

  const SplitPane: DefineComponent<Partial<SplitPaneProps>>;
  const Pane: DefineComponent<Partial<PaneProps>>;
  export { Pane }
  export default SplitPane
  export type { SplitPaneProps, PaneProps }
}
