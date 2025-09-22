/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Defensive: Find the main grid container (should be direct child of .container)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Each column may have one or more children, but in this HTML, each is a single div with content
  // We'll put each column's content in its own cell
  const columnCells = columns.map(col => {
    // If the column has only one child, just use that element
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // If multiple children, put them in an array
    return Array.from(col.children);
  });

  // Build the table rows
  const rows = [headerRow, columnCells];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
