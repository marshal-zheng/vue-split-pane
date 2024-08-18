# Vue Split Pane 

A Vue 3 component for creating resizable split panes. This component allows you to easily create layouts with resizable panels, either horizontally or vertically. It supports various features such as initial size, minimum and maximum size constraints, and nested panes.

See the example and associated code in [ExampleLayout](/example/example.js)

[**[Demo](http://110.41.33.162:9005/) | [Changelog](/CHANGELOG.md) | [View Example](/example/example.js)**]

## Quick Start

This package has two major exports:

* [`<SplitPane>`](/lib/SplitPane.tsx): is used to create resizable panels within a layout. It supports both vertical and horizontal splits, allowing users to adjust the size of different sections of a page.
* [`<Pane>`](/lib/Pane.tsx): is a part of the SplitPane layout system, representing an individual resizable panel. It supports both vertical and horizontal splits and allows for flexible sizing and styling.

To quickly start using `@marsio/vue-split-pane`, follow the steps below:

### Step 1: Installation

First, you need to install the package. Run the following command in your project directory:

```bash
npm install @marsio/vue-split-pane
```

or if you prefer using Yarn:

```bash
yarn add @marsio/vue-split-pane
```

or if you prefer using Pnpm:

```bash
pnpm add @marsio/vue-split-pane
```


### Step 2: Importing

In your Vue component, import `@marsio/vue-split-pane`:

```javascript
import SplitPane, { Pane } from '@marsio/vue-split-pane';
```

### Step 3: Using `@marsio/vue-split-pane`

Now, you can use the `SplitPane` component in your Vue application

```vue
<template>
  <SplitPane>
    <Pane>This is a Pane</Pane>
    <Pane>This is a Pane</Pane>
  </SplitPane>     
</template>

<script>
import SplitPane, { Pane } from '@marsio/vue-split-pane';

export default {
  components: {
    SplitPane,
    Pane
  }
}
</script>
```
Or Hybrid

```vue
<template>
  <SplitPane split="vertical">
    <Pane initialSize="200px">You can use a Pane component</Pane>
    <div>or you can use a plain old div</div>
    <Pane initialSize="25%" minSize="10%" maxSize="500px">Using a Pane allows you to specify any constraints directly</Pane>
  </SplitPane>    
</template>

<script>
import SplitPane, { Pane } from '@marsio/vue-split-pane';

export default {
  components: {
    SplitPane,
    Pane
  }
}
</script>
```

Or Nested

```vue
<template>
   <SplitPane split="vertical">
    <Pane/>
    <Pane/>
    <SplitPane split="horizontal">
      <Pane/>
      <Pane/>
      <Pane/>
    </SplitPane>
    <Pane/>
  </SplitPane>  
</template>

<script>
import SplitPane, { Pane } from '@marsio/vue-split-pane';

export default {
  components: {
    SplitPane,
    Pane
  }
}
</script>
```

### Step 4: Enjoy!

That's it! You've successfully integrated split pane functionality into your Vue application. Customize it further according to your needs.


#### `<SplitPane>` Props:

```js
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
```

#### `<Pane>` Props:

```js
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
```

### Modern browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

### Changelog.

Detailed changes for each release are documented in the [release notes](CHANGELOG.md).

### Release checklist

- Update CHANGELOG
- `pnpm release`
- `pnpm publish`

### License

MIT
