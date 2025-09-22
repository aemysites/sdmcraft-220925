/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns21)'];

  // Defensive: Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children);

  // For each column, collect its content block
  // Each column is a cell in the second row
  const contentRow = columns.map((col) => col);

  // Table structure: header, then one row with all columns
  const rows = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
