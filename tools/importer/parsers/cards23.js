/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and all text for a card anchor
  function extractCardContent(cardAnchor) {
    // Find image (mandatory for this block)
    let img = cardAnchor.querySelector('img');
    if (!img) {
      img = cardAnchor.querySelector('div img');
    }
    if (!img) return null; // Only allow cards with images

    // For text: get only the first heading and the first description (no duplicates)
    const textCell = document.createElement('div');
    const heading = cardAnchor.querySelector('h1, h2, h3, h4');
    if (heading) textCell.appendChild(heading.cloneNode(true));
    // Prefer .paragraph-sm, fallback to first <p> or <div> after heading
    let desc = cardAnchor.querySelector('.paragraph-sm');
    if (!desc) {
      // Find first <p> or <div> after heading
      let found = false;
      Array.from(cardAnchor.children).forEach(child => {
        if (found) return;
        if (child === heading) {
          found = true;
          return;
        }
        if (!heading && (child.tagName === 'P' || child.tagName === 'DIV')) {
          desc = child;
          found = true;
        }
      });
      // If not found, just take first <p> or <div>
      if (!desc) desc = cardAnchor.querySelector('p, div');
    }
    if (desc && desc !== heading) textCell.appendChild(desc.cloneNode(true));
    return [img, textCell];
  }

  // Find all grid layouts in all tab panes
  const cards = [];
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      // Select all anchors that are direct children of grid
      const anchors = grid.querySelectorAll('a');
      anchors.forEach((anchor) => {
        const card = extractCardContent(anchor);
        if (card) {
          cards.push(card);
        }
      });
    }
  });

  const headerRow = ['Cards (cards23)'];
  const tableRows = [headerRow, ...cards];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
