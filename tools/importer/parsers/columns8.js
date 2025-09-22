/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns) container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // The grid's direct children are the columns (usually two: heading and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: heading (e.g., h2)
  const headingCol = columns[0];
  // Second column: content (e.g., p + a)
  const contentCol = columns[1];

  // Always reference the actual elements (do not clone or create new)
  // Compose the two columns for the row
  const row = [headingCol, contentCol];

  // Build the table
  const headerRow = ['Columns block (columns8)'];
  const tableRows = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
