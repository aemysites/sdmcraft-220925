/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: exactly one cell, per guidelines
  const headerRow = ['Cards (cards35)'];

  // Get all direct child divs (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows for each card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return null;

    // First cell: image
    const imageCell = img;
    // Second cell: use all text content in the cardDiv except for the image
    let textContent = '';
    Array.from(cardDiv.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      } else if (node !== img && node.nodeType === Node.ELEMENT_NODE) {
        textContent += node.textContent.trim() + ' ';
      }
    });
    // If textContent is empty, fallback to img.alt
    textContent = textContent.trim() || (img.alt ? img.alt.trim() : '');
    return [imageCell, textContent];
  }).filter(Boolean); // Remove any nulls

  // Compose the table cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
