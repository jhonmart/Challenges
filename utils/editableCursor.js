export function saveCaretPosition(context) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(context);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);
  const start = preSelectionRange.toString().length;
  return start;
}

export function restoreCaretPosition(context, savedPosition) {
  const range = document.createRange();
  const selection = window.getSelection();
  let charIndex = 0;
  let nodeStack = [context];
  let node, foundStart = false;

  while ((node = nodeStack.pop())) {
    if (node.nodeType === 3) { // text node
      const nextCharIndex = charIndex + node.length;
      if (!foundStart && savedPosition >= charIndex && savedPosition <= nextCharIndex) {
        range.setStart(node, savedPosition - charIndex);
        range.collapse(true);
        foundStart = true;
        break;
      }
      charIndex = nextCharIndex;
    } else {
      let i = node.childNodes.length;
      while (i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }
  }

  if (foundStart) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
