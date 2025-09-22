/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns37)'];

  // Find the grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Get all direct children of the grid
    const gridChildren = Array.from(grid.children);
    // For this HTML, there are two columns:
    // 1. Left: heading + subheading
    // 2. Right: button
    // We'll reference the first child (content) and the second child (button)
    if (gridChildren.length >= 2) {
      // First column: heading + subheading
      const leftCol = gridChildren[0];
      // Second column: button
      const rightCol = gridChildren[1];
      columns = [leftCol, rightCol];
    } else {
      // Fallback: just use all children as columns
      columns = gridChildren;
    }
  } else {
    // Fallback: use all children of element
    columns = Array.from(element.children);
  }

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
