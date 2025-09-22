/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Cards (cards30)'];

  // Get all immediate child divs (each is a card container)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each card, extract the image and its alt as heading
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    let textCell = '';
    if (img && img.alt) {
      const heading = document.createElement('h3');
      heading.textContent = img.alt;
      textCell = heading;
    }
    return [img, textCell];
  });

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
