const STRONG_CALLOUTS = /^(Achtung|Häufiger Fehler|Keine Panik)/;

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(textOf).join('');
}

function isElement(node, tagName) {
  return node?.type === 'element' && node.tagName === tagName;
}

// Letzter Absatz, der nur aus Links und Trennzeichen besteht (Weiter/Zurück-Navigation).
function isNavParagraph(node) {
  if (!isElement(node, 'p')) return false;
  const children = node.children.filter((c) => !(c.type === 'text' && /^[\s·]*$/.test(c.value)));
  return children.length > 0 && children.every((c) => isElement(c, 'a'));
}

function transform(node) {
  if (!node.children) return;

  node.children = node.children.map((child) => {
    // Screenshots lassen sich per Klick vergrößern.
    if (isElement(child, 'img')) {
      return {
        type: 'element',
        tagName: 'button',
        properties: { type: 'button', className: ['zoom'], ariaLabel: 'Screenshot vergrößern' },
        children: [child],
      };
    }

    if (isElement(child, 'table')) {
      transform(child);
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrap'] },
        children: [child],
      };
    }

    if (isElement(child, 'blockquote')) {
      const strong = STRONG_CALLOUTS.test(textOf(child).trim());
      child.properties.className = strong ? ['callout', 'callout-strong'] : ['callout'];
    }

    transform(child);
    return child;
  });
}

export default function rehypeTutorial() {
  return (tree) => {
    // Den Seitentitel rendert das Layout selbst.
    const h1Index = tree.children.findIndex((c) => isElement(c, 'h1'));
    if (h1Index !== -1) tree.children.splice(h1Index, 1);

    // Weiter/Zurück-Links rendert ebenfalls das Layout.
    const elements = tree.children.filter((c) => c.type === 'element');
    const last = elements.at(-1);
    if (last && isNavParagraph(last) && textOf(last).includes('·')) {
      tree.children.splice(tree.children.indexOf(last), 1);
    }

    transform(tree);
  };
}
