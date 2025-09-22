/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid (each is a column cell)
  const gridChildren = Array.from(grid.children);

  // Defensive: ensure we have at least 4 children
  if (gridChildren.length < 4) return;

  // First column: Taylor Brooks + tag list
  const col1 = document.createElement('div');
  col1.appendChild(gridChildren[0]);
  col1.appendChild(gridChildren[1]);

  // Second column: Heading + rich text
  const col2 = document.createElement('div');
  col2.appendChild(gridChildren[2]);
  col2.appendChild(gridChildren[3]);

  // Build the table rows
  const headerRow = ['Columns block (columns31)'];
  const columnsRow = [col1, col2];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
