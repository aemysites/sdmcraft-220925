/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card root element
  function extractCard(cardDiv) {
    // Find the first image (mandatory)
    const img = cardDiv.querySelector('img');
    // Find the text container (mandatory for this block)
    let textContainer = null;
    // Look for a div with h3/h2/h1 or p
    const possibleTextDivs = cardDiv.querySelectorAll('div');
    for (const div of possibleTextDivs) {
      if (div.querySelector('h3, h2, h1, p')) {
        textContainer = div;
        break;
      }
    }
    // If not found, just use the cardDiv itself
    if (!textContainer) textContainer = cardDiv;

    // Extract heading and paragraph (if present)
    let heading = textContainer.querySelector('h3, h2, h1');
    let desc = textContainer.querySelector('p');
    // Defensive: clone nodes so we don't move them from the DOM
    let textFrag = document.createDocumentFragment();
    let hasText = false;
    if (heading) {
      textFrag.appendChild(heading.cloneNode(true));
      hasText = true;
    }
    if (desc) {
      textFrag.appendChild(desc.cloneNode(true));
      hasText = true;
    }
    // If neither, fallback to text content
    if (!hasText) {
      const txt = textContainer.textContent.trim();
      if (txt) {
        textFrag.appendChild(document.createTextNode(txt));
        hasText = true;
      }
    }
    // Only return if both image and text content exist
    if (img && hasText) {
      return [img, textFrag];
    }
    return null;
  }

  // Get all direct children that are cards (divs with an image)
  const cardDivs = Array.from(element.children).filter(div => div.querySelector('img'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards26)']);
  // Card rows
  for (const cardDiv of cardDivs) {
    const card = extractCard(cardDiv);
    if (card) {
      rows.push(card);
    }
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
