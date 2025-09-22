/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children divs of a node
  function getDirectDivs(node) {
    return Array.from(node.children).filter((el) => el.tagName === 'DIV');
  }

  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Get the first grid: contains left (headline) and right (desc + author + button)
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const mainGridDivs = getDirectDivs(mainGrid);
  // Left: headline
  const leftCol = mainGridDivs[0];
  // Right: description, author, button
  const rightCol = mainGridDivs[1];

  // Get the second grid: two images
  const imageGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  const imageDivs = imageGrid ? getDirectDivs(imageGrid) : [];

  // Compose left column: headline stack
  const leftColContent = [];
  if (leftCol) {
    // Eyebrow (trend alert)
    const eyebrow = leftCol.querySelector('.eyebrow');
    if (eyebrow) leftColContent.push(eyebrow);
    // Headline
    const headline = leftCol.querySelector('h1');
    if (headline) leftColContent.push(headline);
  }

  // Compose right column: description, author, button
  const rightColContent = [];
  if (rightCol) {
    // Description
    const desc = rightCol.querySelector('.rich-text');
    if (desc) rightColContent.push(desc);
    // Author row (avatar + name/date/read time)
    const authorRow = rightCol.querySelector('.w-layout-grid');
    if (authorRow) {
      // Only grab the avatar/name/date/read time row (first child)
      const authorInfo = authorRow.querySelector('.flex-horizontal.y-center.flex-gap-xs');
      if (authorInfo) rightColContent.push(authorInfo);
      // Button (Read more)
      const button = authorRow.querySelector('a.button');
      if (button) rightColContent.push(button);
    }
  }

  // Compose images
  const img1 = imageDivs[0] ? imageDivs[0].querySelector('img') : null;
  const img2 = imageDivs[1] ? imageDivs[1].querySelector('img') : null;

  // Table structure:
  // [ [header] ]
  // [ [left stack, right stack] ]
  // [ [img1, img2] ]
  const headerRow = ['Columns block (columns11)'];
  const contentRow = [leftColContent, rightColContent];
  const imagesRow = [];
  if (img1 || img2) imagesRow.push(img1 ? img1 : '', img2 ? img2 : '');

  const rows = [headerRow, contentRow];
  if (imagesRow.length) rows.push(imagesRow);

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
