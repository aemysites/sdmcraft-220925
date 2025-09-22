/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout div (the two-column layout)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (should be [content div, img] or [img, content div])
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Find the image element (may be first or second)
  const imgEl = gridChildren.find(el => el.tagName.toLowerCase() === 'img');
  // Find the content div (not an img)
  const contentDiv = gridChildren.find(el => el.tagName.toLowerCase() !== 'img');

  // Defensive: Only use the image if it's an <img>
  // Defensive: Only use the content div if it exists
  if (!imgEl || !contentDiv) return;

  // For the content column, collect ALL children (not just h1, p, button group)
  // This ensures all text content is included
  const leftCellContent = Array.from(contentDiv.childNodes).filter(node => {
    // Only include elements and meaningful text nodes
    return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
  });

  // Build the table rows
  const headerRow = ['Columns block (columns3)'];
  const contentRow = [leftCellContent, imgEl];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
