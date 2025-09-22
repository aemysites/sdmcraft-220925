/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor/div
  function extractCard(cardEl) {
    // Find image (mandatory)
    let img = cardEl.querySelector('img');
    // Find heading (h3 or h4)
    let heading = cardEl.querySelector('h3, h4');
    // Find description (p)
    let desc = cardEl.querySelector('p');
    // Find CTA (button or .button or a.button)
    let cta = cardEl.querySelector('.button, button');
    let textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    return [img, textContent];
  }

  // Find the grid containing the cards
  // The first grid-layout is the outer, the second is the inner grid with the cards
  const outerGrid = element.querySelector('.w-layout-grid.grid-layout');
  let cardRows = [];
  if (outerGrid) {
    // The first child is a card (the big left card), the second child is a grid of smaller cards
    const children = Array.from(outerGrid.children);
    // First card (big left card)
    const firstCard = children[0];
    if (firstCard && firstCard.matches('a')) {
      cardRows.push(extractCard(firstCard));
    }
    // Second child is a grid of smaller cards
    const innerGrid = children[1];
    if (innerGrid && innerGrid.classList.contains('w-layout-grid')) {
      // Each child is a card anchor
      const innerCards = Array.from(innerGrid.children).filter((el) => el.matches('a'));
      innerCards.forEach(card => {
        cardRows.push(extractCard(card));
      });
    }
  }

  // Build the table rows
  const headerRow = ['Cards (cards2)'];
  const tableRows = [headerRow];
  cardRows.forEach(([img, textContent]) => {
    tableRows.push([img, textContent]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
