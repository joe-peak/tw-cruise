// 阻止React事件冒泡
export const stopPropagation = e => {
  e.stopPropagation();
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
};

export const noop = () => {};