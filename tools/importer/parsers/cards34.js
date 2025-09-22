/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Get all immediate children that are cards (anchor tags)
  const cardEls = Array.from(element.querySelectorAll(':scope > a'));

  cardEls.forEach((cardEl) => {
    // Defensive: find image (mandatory)
    const img = cardEl.querySelector('img');
    // Defensive: find the card content container (the inner grid)
    const cardContent = cardEl.querySelector('div.w-layout-grid');

    // Defensive: find heading (h3), description (p), and CTA (last div with text 'Read')
    let heading = cardContent ? cardContent.querySelector('h3') : null;
    let description = cardContent ? cardContent.querySelector('p') : null;
    let ctaDivs = cardContent ? Array.from(cardContent.querySelectorAll('div')) : [];
    let cta = ctaDivs.find(div => div.textContent.trim() === 'Read');

    // Defensive: find tag and time (optional, can be included above heading)
    let tagRow = cardContent ? cardContent.querySelector('.flex-horizontal') : null;
    let tagContent = [];
    if (tagRow) {
      // Tag
      let tag = tagRow.querySelector('.tag > div');
      if (tag) {
        tagContent.push(tag);
      }
      // Time
      let time = tagRow.querySelector('.paragraph-sm');
      if (time) {
        tagContent.push(time);
      }
    }

    // Compose the text cell
    const textCellContent = [];
    if (tagContent.length) {
      // Put tag and time in a horizontal flex container
      const tagWrap = document.createElement('div');
      tagWrap.style.display = 'flex';
      tagWrap.style.gap = '0.5em';
      tagWrap.append(...tagContent);
      textCellContent.push(tagWrap);
    }
    if (heading) textCellContent.push(heading);
    if (description) textCellContent.push(description);
    if (cta) textCellContent.push(cta);

    // Add row: [image, text content]
    rows.push([
      img || '',
      textCellContent.length ? textCellContent : ''
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(block);
}
