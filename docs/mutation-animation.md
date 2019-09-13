# Mutation Animation Mixin <maturity-badge poc>(Proof of concept)</maturity-badge>

## Problem

Animating inserted and, especially, removed elements is tricky. For inserted elements, a simple CSS Animation is enough, but you still want to clear the DOM after the animation has finished, not to pollute it with unnecessary class names or other attributes.

Animating removed nodes is quite a bit more complex, as you need to keep the element in the DOM for the duration of the animation and only after that can you remove it from the DOM.

These are doable, but require a lot of additional code when you would just want to call `appendChild`, `insertChild` and `removeChild` to manipulate a simple list of items.

## Solution

The `MutationAnimationMixin` helper manages all of the above for you. You only need to define the animation keyframes for the insert and remove states. `MutationObserver` is used to catch inserted and removed elements.

For removed elements, a clone of the element is briefly re-inserted to the DOM for the duration of the animation. A clone is used to avoid any unexpected `connectedCallback` and `disconnectedCallback` calls for the removed element.

The explicit width and height are set as the element’s inline styles for the duration of the animation (measured before the animation starts).

> ###### NOTE
>
> You need to define the remove animation. Otherwise elements can not be removed completely (the cloned element will stay visible in the DOM).

## Example

First we create a new custom element using the mixin.

```html
<script type="module">
  import {MutationAnimationMixin} from 'j-elements';

  class MyList extends MutationAnimationMixin(HTMLElement) {}

  customElements.define('my-list', MyList);
</script>
```

Then we can use the new element and apply animations for inserted and removed elements.

<div class="list-example"></div>
```html,live
<j-button id="add">Add item</j-button>
<j-button id="remove">Remove item</j-button>
<j-button id="add-remove">Add & remove items</j-button>

<my-list>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
</my-list>

<style>
  /* You can customize the class names and animation names if you want */

  my-list .j-ma-insert,
  my-list .j-ma-remove {
    pointer-events: none;
    overflow: hidden;
    animation: j-ma-animation .4s ease-in-out;
  }

  my-list .j-ma-remove {
    animation-direction: reverse;
  }

  @keyframes j-ma-animation {
    0% {
      height: 0;
      opacity: 0;
    }
  }

  /* Irrelevant styles, for the list and the items, are omitted from here */
</style>

<script>
  const list = document.querySelector('my-list');
  let i = list.children.length;

  function addItem() {
    const newItem = document.createElement('div');
    newItem.textContent = 'Item ' + i++;

    const items = list.querySelectorAll(`:not(.j-ma-remove)`);
    const insertIndex = parseInt(Math.random() * items.length);

    list.insertBefore(newItem, items[insertIndex]);
  }

  function removeItem() {
    const items = list.querySelectorAll(`:not(.j-ma-remove)`);
    if (items.length > 0) {
      let removeIndex = parseInt(Math.random() * items.length);

      list.removeChild(items[removeIndex]);
    }
  }

  document.querySelector('#add').addEventListener('click', e => {
    addItem();
  });

  document.querySelector('#remove').addEventListener('click', e => {
    removeItem();
  });

  document.querySelector('#add-remove').addEventListener('click', e => {
    addItem();
    removeItem();
  });
</script>
```

<style>
my-list {
  display: block;
  border: 1px solid #ddd;
  margin-top: 1em;
  max-height: 60vh;
  overflow: auto;
}

my-list div {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 1em;
  box-sizing: border-box;
}

my-list div:not(:last-child) {
  box-shadow: inset 0 -1px 0 0 #ddd;
}

.list-example + .demo-snippet .demo-snippet__code .hljs {
  max-height: 40em;
}
</style>
