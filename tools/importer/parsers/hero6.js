/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  // Find the image element (background)
  let bgImg = null;
  const img = element.querySelector('img');
  if (img) {
    bgImg = img;
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (headline, subheading, CTA)
  let contentCell = [];
  const card = element.querySelector('.card');
  if (card) {
    // Headline
    const h1 = card.querySelector('h1');
    if (h1) contentCell.push(h1);
    // Subheading
    const subheading = card.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // CTA buttons
    const ctas = card.querySelectorAll('a');
    if (ctas.length > 0) {
      contentCell = contentCell.concat(Array.from(ctas));
    }
  }
  const contentRow = [contentCell.length > 0 ? contentCell : ''];

  // Compose table cells
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
