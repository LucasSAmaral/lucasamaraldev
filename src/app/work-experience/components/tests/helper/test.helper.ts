export const getComponentPseudoValues = (el: JQuery<HTMLElement>) => {
  const win = el[0].ownerDocument.defaultView;

  const before = win?.getComputedStyle(el[0], 'before');

  const after = win?.getComputedStyle(el[0], 'after');

  const contentValue = before?.getPropertyValue('content');

  return { before, after, contentValue };
};
