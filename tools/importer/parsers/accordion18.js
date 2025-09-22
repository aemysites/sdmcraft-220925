/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per requirements
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Defensive: find all direct children with class 'divider' (each is an accordion item)
  const accordionItems = element.querySelectorAll(':scope > .divider');

  accordionItems.forEach((item) => {
    // Each item contains a grid-layout div
    const grid = item.querySelector('.w-layout-grid');
    if (!grid) return;
    // The first child is the title, second is the content
    const children = grid.children;
    if (children.length < 2) return;
    const title = children[0];
    const content = children[1];
    rows.push([title, content]);
  });

  // If there are no .divider children, fallback: maybe the element itself is a .divider
  if (rows.length === 1 && element.classList.contains('divider')) {
    const grid = element.querySelector('.w-layout-grid');
    if (grid && grid.children.length >= 2) {
      const title = grid.children[0];
      const content = grid.children[1];
      rows.push([title, content]);
    }
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
