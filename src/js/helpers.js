import {h, render} from 'vue';

export function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else {
    el.parentNode?.removeChild(el)
  }
}

export function createComponent(component, props, parentContainer, slots = {}) {
  const vNode = h(component, props, slots)
  const container = document.createElement('div');
  container.classList.add('vld-container')
  parentContainer.appendChild(container);
  render(vNode, container);

  return vNode.component
}

export function hasWindow() {
  return typeof window !== 'undefined';
}

export const MayBeHTMLElement = hasWindow() ? window.HTMLElement : Object;
