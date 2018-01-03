const removeElement = (el) => {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else {
    el.parentNode.removeChild(el)
  }
};

const hasWindow = () => {
  return typeof window !== 'undefined';
};


export {removeElement, hasWindow}
