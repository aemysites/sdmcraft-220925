/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extracts the first <img> in a container
  function getFirstImage(el) {
    return el.querySelector('img');
  }

  // Helper: Builds the text content cell for a card
  function buildTextCell(cardLink) {
    const fragments = [];
    // Tag and date row
    const tagDateRow = cardLink.querySelector('.flex-horizontal');
    if (tagDateRow) {
      // Tag
      const tag = tagDateRow.querySelector('.tag');
      if (tag) {
        const tagClone = tag.cloneNode(true);
        fragments.push(tagClone);
      }
      // Date
      const date = tagDateRow.querySelector('.paragraph-sm');
      if (date) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = ' ' + date.textContent;
        fragments.push(dateSpan);
      }
    }
    // Title (h3)
    const title = cardLink.querySelector('h3');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      fragments.push(document.createElement('br'));
      fragments.push(strong);
    }
    return fragments;
  }

  // Header row: exactly one column
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Each card is an <a> inside the grid
  const cardLinks = element.querySelectorAll(':scope > a');
  cardLinks.forEach((cardLink) => {
    // Image cell
    const imgContainer = cardLink.querySelector('.utility-aspect-2x3');
    let image = imgContainer ? getFirstImage(imgContainer) : null;
    const imageCell = image ? image : '';
    // Text cell
    const textCell = buildTextCell(cardLink);
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
