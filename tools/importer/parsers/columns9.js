/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a node by tag
  function getDirectChildByTag(parent, tag) {
    return Array.from(parent.children).find(child => child.tagName.toLowerCase() === tag);
  }

  // Find the .container > .grid-layout div
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = getDirectChildByTag(container, 'div');
  if (!grid) return;

  // Get all direct children of grid
  const gridChildren = Array.from(grid.children);

  // Identify content columns visually:
  // - Left: intro (h2, h3, p)
  // - Right: ul (contact methods)
  // - Bottom: img (spans both columns visually, but in columns block, should be a single cell row)

  // 1. Header row
  const headerRow = ['Columns block (columns9)'];

  // 2. First content row: left (intro), right (contacts)
  // Find intro div (with h2/h3/p)
  const introDiv = gridChildren.find(
    (el) => el.querySelector && (el.querySelector('h2') || el.querySelector('h3'))
  );
  // Find ul (contacts)
  const contactsUl = gridChildren.find(
    (el) => el.tagName && el.tagName.toLowerCase() === 'ul'
  );
  // Find image
  const img = gridChildren.find(
    (el) => el.tagName && el.tagName.toLowerCase() === 'img'
  );

  // Defensive: if any are missing, fallback to empty
  const leftCol = introDiv || '';
  const rightCol = contactsUl || '';
  const imgCol = img || '';

  // 3. Table rows
  const rows = [
    headerRow,
    [leftCol, rightCol],
    [imgCol], // image row is a single cell (no unnecessary empty columns)
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
