/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if there are columns
  if (!columns.length) return;

  // For each column, try to find the image inside
  const cells = columns.map(col => {
    // Try to find the image inside this column
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const tableRows = [
    ['Columns block (columns7)'], // Header row
    cells // Second row: one cell per column, each with its image
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
