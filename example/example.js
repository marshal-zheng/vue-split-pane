const {VueSplitPane: SplitPane, Vue: VueInstance} = window;
const { createApp, ref, h, reactive, defineComponent } = VueInstance
const { Pane } = VueSplitPane

const customHandle = h('span', { class: 'custom-handle custom-handle-se' });

const SimpleExample = defineComponent({
  name: 'SimpleExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>
      <pre class="source">
        <code>
          &lt;SplitPane split="vertical"&gt;
            &lt;Pane initialSize="200px"&gt;You can use a Pane component&lt;/Pane&gt;
            &lt;div&gt;or you can use a plain old div&lt;/div&gt;
            &lt;Pane initialSize="25%" minSize="10%" maxSize="500px"&gt;Using a Pane allows you to specify any constraints directly&lt;/Pane&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">
        <SplitPane split="vertical">
          <Pane initialSize="200px">You can use a Pane component</Pane>
          <div>or you can use a plain old div</div>
          <Pane initialSize="25%" minSize="10%" maxSize="500px">
            Using a Pane allows you to specify any constraints directly
          </Pane>
        </SplitPane>
      </div>
    </section>
  `
});

const SimpleNestedExample = defineComponent({
  name: 'SimpleNestedExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>
      <pre class="source">
        <code>
          &lt;SplitPane split="vertical"&gt;
            &lt;Pane/&gt;
            &lt;Pane/&gt;
            &lt;SplitPane split="horizontal"&gt;
              &lt;Pane/&gt;
              &lt;Pane/&gt;
              &lt;Pane/&gt;
            &lt;/SplitPane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

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

      </div>

    </section>
  `
});

const MultiplePropsNestedExample = defineComponent({
  name: 'MultiplePropsNestedExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>
      <pre class="source">
        <code>
          &lt;Pane initialSize="200px" minSize="200px" maxSize="600px"&gt;initialSize="200px" minSize="200px" maxSize="600px"&lt;/Pane&gt;
          &lt;Pane minSize="20%" maxSize="80%"&gt;minSize="20%" maxSize="80%"&lt;/Pane&gt;
          &lt;SplitPane split="horizontal"&gt;
            &lt;Pane minSize="10%" maxSize="600px"&gt;minSize="10%" maxSize="600px"&lt;/Pane&gt;
            &lt;Pane initialSize="50%" minSize="50px" maxSize="80%"&gt;initialSize="50%" minSize="50px" maxSize="80%"&lt;/Pane&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="vertical">
          <Pane initialSize="200px" minSize="200px" maxSize="600px">initialSize="100px" minSize="100px" maxSize="600px"</Pane>
          <Pane minSize="20%" maxSize="80%">minSize="20%" maxSize="80%"</Pane>
          <SplitPane split="horizontal">
            <Pane minSize="10%" maxSize="600px">minSize="10%" maxSize="600px"</Pane>
            <Pane initialSize="50%" minSize="50px" maxSize="80%">initialSize="50%" minSize="50px" maxSize="80%"</Pane>
          </SplitPane>
        </SplitPane>

      </div>

    </section>
  `
});


const BasicVerticalExample = defineComponent({
  name: 'BasicVerticalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>
      <pre class="source">
        <code>
          &lt;SplitPane split="vertical"&gt;
            &lt;div&gt;This is a div&lt;/div&gt;
            &lt;div&gt;This is a div&lt;/div&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="vertical">
          <div>This is a div</div>
          <div>This is a div</div>
        </SplitPane>

      </div>

    </section>
  `
});

const BasicHorizontalExample = defineComponent({
  name: 'BasicHorizontalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>
      <pre class="source">
        <code>
          &lt;SplitPane split="horizontal"&gt;
            &lt;div&gt;This is a div&lt;/div&gt;
            &lt;div&gt;This is a div&lt;/div&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="horizontal">
          <div>This is a div</div>
          <div>This is a div</div>
        </SplitPane>
        
      </div>
    </section>
  `
});

const BasicVerticalPaneExample = defineComponent({
  name: 'BasicVerticalPaneExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane split="vertical"&gt;
            &lt;Pane&gt;This is a Pane&lt;/Pane&gt;
            &lt;Pane&gt;This is a Pane&lt;/Pane&gt;
          &lt;/SplitPane&gt;        
        </code>
      </pre>

      <div class="example">

        <SplitPane split="vertical">
          <Pane>This is a Pane</Pane>
          <Pane>This is a Pane</Pane>
        </SplitPane>
        
      </div>
    </section>
  `
});

const BasicHorizontalPaneExample = defineComponent({
  name: 'BasicHorizontalPaneExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane split="horizontal"&gt;
            &lt;Pane&gt;This is a Pane&lt;/Pane&gt;
            &lt;Pane&gt;This is a Pane&lt;/Pane&gt;
          &lt;/SplitPane&gt;        
        </code>
      </pre>

      <div class="example">

        <SplitPane split="horizontal">
          <Pane>This is a Pane</Pane>
          <Pane>This is a Pane</Pane>
        </SplitPane>

      </div>
    </section>
  `
});

const PanesAndDivsExample = defineComponent({
  name: 'PanesAndDivsExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>
      <pre class="source">
        <code>
          &lt;SplitPane split="horizontal"&gt;
            &lt;Pane&gt;This is a Pane&lt;/Pane&gt;
            &lt;div&gt;This is a div&lt;/div&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="horizontal">
          <Pane>This is a Pane</Pane>
          <div>This is a div</div>
        </SplitPane>

      </div>
    </section>
  `
});

const InitialPercentageVerticalExample = defineComponent({
  name: 'InitialPercentageVerticalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane&gt;
            &lt;Pane initialSize="20%"&gt;This Pane has initial size of 20%&lt;/Pane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane>
          <Pane initialSize="20%">This Pane has initial size of 20%</Pane>
          <Pane/>
        </SplitPane>

      </div>
    </section>
  `
});

const InitialPercentageHorizontalExample = defineComponent({
  name: 'InitialPercentageHorizontalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane split="horizontal"&gt;
            &lt;Pane/&gt;
            &lt;Pane initialSize="20%"&gt;This Pane has initial size of 20%&lt;/Pane&gt;
          &lt;/SplitPane&gt;      
        </code>
      </pre>

      <div class="example">

        <SplitPane split="horizontal">
          <Pane/>
          <Pane initialSize="20%">This Pane has initial size of 20%</Pane>
        </SplitPane>

      </div>
    </section>
  `
});


const InitialPxVerticalExample = defineComponent({
  name: 'InitialPxVerticalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane&gt;
            &lt;Pane initialSize="200px"&gt;This Pane has initial size of 200px&lt;/Pane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane>
          <Pane initialSize="200px">This Pane has initial size of 200px</Pane>
          <Pane/>
        </SplitPane>

      </div>
    </section>  
  `
});

const InitialPxHorizontalExample = defineComponent({
  name: 'InitialPxHorizontalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane split="horizontal"&gt;
            &lt;Pane/&gt;
            &lt;Pane initialSize="200px"&gt;This Pane has initial size of 200px&lt;/Pane&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="horizontal">
          <Pane/>
          <Pane initialSize="200px">This Pane has initial size of 200px</Pane>
        </SplitPane>

      </div>
    </section>
  `
});


const MinPercentageVerticalExample = defineComponent({
  name: 'MinPercentageVerticalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane&gt;
            &lt;Pane minSize="20%"&gt;This Pane has a minimum size of 20%&lt;/Pane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane>
          <Pane minSize="20%">This Pane has a minimum size of 20%</Pane>
          <Pane/>
        </SplitPane>

      </div>
    </section>
  `
});

const MinPercentageHorizontalExample = defineComponent({
  name: 'MinPercentageHorizontalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane split="horizontal"&gt;
            &lt;Pane minSize="20%"&gt;This Pane has a minimum size of 20%&lt;/Pane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="horizontal">
          <Pane minSize="20%">This Pane has a minimum size of 20%</Pane>
          <Pane/>
        </SplitPane>

      </div>
    </section>
  `
});


const MinPxVerticalExample = defineComponent({
  name: 'MinPxVerticalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane&gt;
            &lt;Pane minSize="200px"&gt;This Pane has a minimum size of 200px&lt;/Pane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane>
          <Pane minSize="200px">This Pane has a minimum size of 200px</Pane>
          <Pane/>
        </SplitPane>

      </div>
    </section>  
  `
});

const MinPxHorizontalExample = defineComponent({
  name: 'MinPxHorizontalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane split="horizontal"&gt;
            &lt;Pane minSize="200px"&gt;This Pane has a minimum size of 200px&lt;/Pane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="horizontal">
          <Pane minSize="200px">This Pane has a minimum size of 200px</Pane>
          <Pane/>
        </SplitPane>

      </div>
    </section>
  `
});


const MaxPercentageVerticalExample = defineComponent({
  name: 'MaxPercentageVerticalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane&gt;
            &lt;Pane maxSize="20%"&gt;This Pane has a maximum size of 20%&lt;/Pane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane>
          <Pane maxSize="20%">This Pane has a maximum size of 20%</Pane>
          <Pane/>
        </SplitPane>

      </div>
    </section>
  `
});

const MaxPercentageHorizontalExample = defineComponent({
  name: 'MaxPercentageHorizontalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane split="horizontal"&gt;
            &lt;Pane maxSize="20%"&gt;This Pane has a maximum size of 20%&lt;/Pane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="horizontal">
          <Pane maxSize="20%">This Pane has a maximum size of 20%</Pane>
          <Pane/>
        </SplitPane>

      </div>
    </section>
  `
});


const MaxPxVerticalExample = defineComponent({
  name: 'MaxPxVerticalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane&gt;
            &lt;Pane maxSize="200px"&gt;This Pane has a maximum size of 200px&lt;/Pane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane>
          <Pane maxSize="200px">This Pane has a maximum size of 200px</Pane>
          <Pane/>
        </SplitPane>

      </div>
    </section>
  `
});

const MaxPxHorizontalExample = defineComponent({
  name: 'MaxPxHorizontalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane split="horizontal"&gt;
            &lt;Pane maxSize="200px"&gt;This Pane has a maximum size of 200px&lt;/Pane&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="horizontal">
          <Pane maxSize="200px">This Pane has a maximum size of 200px</Pane>
          <Pane/>
        </SplitPane>

      </div>
    </section>
  `
});


const MultipleVerticalExample = defineComponent({
  name: 'MultipleVerticalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane split="vertical"&gt;
            &lt;Pane/&gt;
            &lt;Pane/&gt;
            &lt;Pane/&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="vertical">
          <Pane/>
          <Pane/>
          <Pane/>
          <Pane/>
        </SplitPane>

      </div>
    </section>
  `
});

const MultipleHorizontalExample = defineComponent({
  name: 'MultipleHorizontalExample',
  components: {
    SplitPane,
    Pane
  },
  template: `
    <section>

      <pre class="source">
        <code>
          &lt;SplitPane split="horizontal"&gt;
            &lt;Pane/&gt;
            &lt;Pane/&gt;
            &lt;Pane/&gt;
            &lt;Pane/&gt;
          &lt;/SplitPane&gt;
        </code>
      </pre>

      <div class="example">

        <SplitPane split="horizontal">
          <Pane/>
          <Pane/>
          <Pane/>
          <Pane/>
        </SplitPane>

      </div>
    </section>
  `
});

const examples = {
  SimpleExample,
  SimpleNestedExample,
  MultiplePropsNestedExample,
  MultipleHorizontalExample,
  MultipleVerticalExample,
  MaxPxHorizontalExample,
  MaxPxVerticalExample,
  MaxPercentageHorizontalExample,
  MaxPercentageVerticalExample,
  MinPxHorizontalExample,
  MinPxVerticalExample,
  MinPercentageHorizontalExample,
  MinPercentageVerticalExample,
  InitialPxHorizontalExample,
  InitialPxVerticalExample,
  InitialPercentageHorizontalExample,
  InitialPercentageVerticalExample,
  BasicHorizontalPaneExample,
  BasicVerticalPaneExample,
  BasicHorizontalExample,
  BasicVerticalExample,
  PanesAndDivsExample,
};


const name = document.location.search.substr(1) || 'SimpleExample';
const component = examples[name];
if (component) {
  const app = createApp(component);
  app.mount('#container');
}
