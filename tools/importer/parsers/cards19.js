/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all direct card children
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(card => {
    // Find the icon image (mandatory)
    // The icon is inside: card > div > div.icon > img
    let img = null;
    const iconDiv = card.querySelector(':scope > div > div.icon');
    if (iconDiv) {
      img = iconDiv.querySelector('img');
    }

    // Find the text content (mandatory)
    // The text is in a <p> sibling to the icon
    // But sometimes there may be more than one text node or element
    // So, collect all <p> and text nodes after the icon
    let textContent = null;
    const textNodes = [];
    // Find all <p> in the card (usually only one per card)
    card.querySelectorAll('p').forEach(p => {
      textNodes.push(p.cloneNode(true));
    });
    // If no <p>, fallback to any text node
    if (textNodes.length === 0) {
      Array.from(card.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          textNodes.push(p);
        }
      });
    }
    // Compose the text cell
    if (textNodes.length === 1) {
      textContent = textNodes[0];
    } else if (textNodes.length > 1) {
      // If multiple, wrap in a div
      const div = document.createElement('div');
      textNodes.forEach(n => div.appendChild(n));
      textContent = div;
    }

    // Defensive: if still no textContent, skip this card
    if (!textContent) return;

    // Compose the row: [icon image, text content]
    const row = [img, textContent];
    rows.push(row);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
