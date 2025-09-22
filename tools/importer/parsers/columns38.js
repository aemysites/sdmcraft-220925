/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: Heading, subheading, and buttons
  const leftCol = columns[0];
  const leftContent = [];
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: Images
  const rightCol = columns[1];
  let rightContent = [];
  // Find the inner grid with images
  const imagesGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
  if (imagesGrid) {
    rightContent = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Build the table rows
  const headerRow = ['Columns block (columns38)'];
  const contentRow = [leftContent, rightContent];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
