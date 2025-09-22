/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row per block spec
  const headerRow = ['Carousel (carousel24)'];

  // Defensive: find the card container (may be nested)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Get image (mandatory, first column)
  const img = cardBody.querySelector('img');

  // Get title (optional, styled as heading)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose text cell (second column)
  const textCellContent = [];
  if (heading) {
    // Use <h2> for semantic heading
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCellContent.push(h2);
  }
  // No additional description or CTA found in this HTML

  // Compose slide row
  const slideRow = [img, textCellContent.length ? textCellContent : ''];

  // Build table
  const cells = [headerRow, slideRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
