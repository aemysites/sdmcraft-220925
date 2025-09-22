/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from an anchor card element
  function extractCardContent(cardAnchor) {
    // Try to find the image (if present)
    let img = cardAnchor.querySelector('img');
    // Try to find the tag (if present)
    let tag = cardAnchor.querySelector('.tag');
    // Try to find the heading (h2/h3/h4)
    let heading = cardAnchor.querySelector('h2, h3, h4');
    // Try to find the description (p)
    let desc = cardAnchor.querySelector('p');
    // Compose text cell
    const textContent = [];
    if (tag) {
      textContent.push(tag.cloneNode(true));
    }
    if (heading) {
      textContent.push(heading.cloneNode(true));
    }
    if (desc) {
      textContent.push(desc.cloneNode(true));
    }
    return [img ? img.cloneNode(true) : '', textContent];
  }

  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // The first card is the large left card (the first anchor inside grid)
  const mainCard = grid.querySelector('a.utility-link-content-block');

  // The next two cards are the two anchors in the first flex-horizontal (with images)
  const flexHorizontals = grid.querySelectorAll('div.flex-horizontal');
  const cardsWithImages = [];
  if (flexHorizontals[0]) {
    const anchors = flexHorizontals[0].querySelectorAll('a.utility-link-content-block');
    anchors.forEach(a => cardsWithImages.push(a));
  }

  // The remaining cards are the text-only cards in the second flex-horizontal
  const textOnlyCards = [];
  if (flexHorizontals[1]) {
    const anchors = flexHorizontals[1].querySelectorAll('a.utility-link-content-block');
    anchors.forEach(a => textOnlyCards.push(a));
  }

  // Compose all cards in order: mainCard, then cardsWithImages, then textOnlyCards
  const allCards = [mainCard, ...cardsWithImages, ...textOnlyCards];

  // Build table rows
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];
  allCards.forEach(cardAnchor => {
    if (!cardAnchor) return;
    const [img, textContent] = extractCardContent(cardAnchor);
    rows.push([img, textContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
