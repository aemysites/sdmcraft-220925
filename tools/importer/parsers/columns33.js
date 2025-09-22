/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be image and content)
  const gridChildren = Array.from(grid.children);

  // Find the image (first child)
  const imgEl = gridChildren.find(el => el.tagName === 'IMG');

  // Find the content column (second child)
  const contentCol = gridChildren.find(el => el !== imgEl);

  // Defensive: if missing, bail
  if (!imgEl || !contentCol) return;

  // Header row: must match block name exactly
  const headerRow = ['Columns block (columns33)'];

  // Second row: two columns, left is image, right is content
  // Reference existing elements, do not clone
  const secondRow = [imgEl, contentCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element
  element.replaceWith(table);
}
