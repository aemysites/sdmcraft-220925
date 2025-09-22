/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (should be two: text column and image column)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: the text content
  const textCol = columns.find((col) => col.tagName !== 'IMG');
  // Second column: the image
  const imgCol = columns.find((col) => col.tagName === 'IMG');

  // Defensive: fallback if not found
  if (!textCol || !imgCol) return;

  // Build the table rows
  const headerRow = ['Columns block (columns28)'];
  const contentRow = [textCol, imgCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
