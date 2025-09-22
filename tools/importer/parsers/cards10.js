/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card anchors (direct children)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Build table rows
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // Image (first div > img)
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    let image = null;
    if (imageContainer) {
      const img = imageContainer.querySelector('img');
      if (img) {
        image = img.cloneNode(true);
      }
    }

    // Text content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let textCell = document.createElement('div');
    if (textContainer) {
      // Tag (optional, as a label)
      const tag = textContainer.querySelector('.tag-group .tag');
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag.textContent;
        tagSpan.style.fontSize = '0.85em';
        tagSpan.style.fontWeight = 'bold';
        tagSpan.style.display = 'block';
        tagSpan.style.marginBottom = '0.5em';
        textCell.appendChild(tagSpan);
      }
      // Title (h3)
      const title = textContainer.querySelector('h3');
      if (title) {
        textCell.appendChild(title.cloneNode(true));
      }
      // Description (p)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textCell.appendChild(desc.cloneNode(true));
      }
      // Call-to-action (if the card is a link and not just '#')
      if (card.href && card.getAttribute('href') && card.getAttribute('href') !== '#') {
        const cta = document.createElement('a');
        cta.href = card.getAttribute('href');
        cta.textContent = 'Learn more';
        cta.style.display = 'inline-block';
        cta.style.marginTop = '0.75em';
        textCell.appendChild(cta);
      }
    }
    rows.push([
      image,
      textCell.childNodes.length ? Array.from(textCell.childNodes) : ''
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
