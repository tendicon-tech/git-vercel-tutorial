const STRONG_CALLOUTS = {
  de: /^(Achtung|Häufiger Fehler|Keine Panik)/,
  // Smartypants macht aus ' ein typografisches ’ – beide Schreibweisen zulassen.
  en: /^(Careful|Common mistake|Don['\u2019]t panic)/,
};

const ZOOM_LABEL = { de: 'Screenshot vergrößern', en: 'Enlarge screenshot' };

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

function transform(node, lang) {
  if (!node.children) return;

  node.children = node.children.map((child) => {
    // Screenshots lassen sich per Klick vergrößern.
    if (isElement(child, 'img')) {
      return {
        type: 'element',
        tagName: 'button',
        properties: { type: 'button', className: ['zoom'], ariaLabel: ZOOM_LABEL[lang] },
        children: [child],
      };
    }

    if (isElement(child, 'table')) {
      transform(child, lang);
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrap'] },
        children: [child],
      };
    }

    if (isElement(child, 'blockquote')) {
      const strong = STRONG_CALLOUTS[lang].test(textOf(child).trim());
      child.properties.className = strong ? ['callout', 'callout-strong'] : ['callout'];
    }

    transform(child, lang);
    return child;
  });
}

export default function rehypeTutorial() {
  return (tree, file) => {
    // Die Sprache steckt im Ordnernamen der Markdown-Datei.
    const lang = /[/\\]en[/\\][^/\\]+$/.test(file?.path ?? '') ? 'en' : 'de';

    // Den Seitentitel rendert das Layout selbst.
    const h1Index = tree.children.findIndex((c) => isElement(c, 'h1'));
    if (h1Index !== -1) tree.children.splice(h1Index, 1);

    // Weiter/Zurück-Links rendert ebenfalls das Layout.
    const elements = tree.children.filter((c) => c.type === 'element');
    const last = elements.at(-1);
    if (last && isNavParagraph(last) && textOf(last).includes('·')) {
      tree.children.splice(tree.children.indexOf(last), 1);
    }

    transform(tree, lang);
  };
}
