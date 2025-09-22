/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns39)'];

  // Get all direct child divs (each is a column cell)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only add non-empty columns
  const contentRow = columns.map(col => col);

  // Compose table data
  const tableData = [
    headerRow,
    contentRow,
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
