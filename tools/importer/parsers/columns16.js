/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each column cell)
  const gridItems = Array.from(grid.children);
  if (!gridItems.length) return;

  // For each grid item, find the innermost image (if present)
  const cells = gridItems.map((item) => {
    // Find the first <img> inside this item
    const img = item.querySelector('img');
    if (img) return img;
    // If no image, fallback to the item itself
    return item;
  });

  // Compose the table rows
  const headerRow = ['Columns block (columns16)'];
  const contentRow = cells;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
