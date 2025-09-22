/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each containing an image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: filter only those that have an image
  const columns = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img ? img : null;
  }).filter(Boolean);

  // Header row as required
  const headerRow = ['Columns block (columns1)'];

  // Second row: one cell per image
  const columnsRow = columns;

  // Build the table data
  const tableData = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
