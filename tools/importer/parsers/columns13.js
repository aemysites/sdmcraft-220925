/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Columns block (columns13)'];

  // 2. Find the two main columns: left image, right content
  // The root element is <section> ...
  // It contains a .w-layout-grid.grid-layout.desktop-1-column
  const grid = element.querySelector('.w-layout-grid.grid-layout.desktop-1-column');
  if (!grid) return;

  // The grid has two direct children:
  // - First: image column (background image)
  // - Second: content column (card with inner grid)
  const [imgCol, contentCol] = grid.children;

  // Left column: get the image inside the first grid child
  let leftImg = null;
  if (imgCol) {
    leftImg = imgCol.querySelector('img');
  }

  // Right column: get the card content
  let cardBody = null;
  if (contentCol) {
    const card = contentCol.querySelector('.card.card-on-secondary');
    if (card) {
      cardBody = card.querySelector('.card-body');
    }
  }

  // In the card body, there's a grid with 3 columns:
  // [image] [text+list+button]
  let rightGrid = null;
  if (cardBody) {
    rightGrid = cardBody.querySelector('.w-layout-grid.grid-layout.desktop-3-column');
  }

  // The rightGrid has 3 children: [image, text block, (possibly empty/unused)]
  // But in this HTML, the third column is not used, so we only need two columns.
  // We'll extract the image and the text block as two columns.
  let gridImg = null;
  let gridTextBlock = null;
  if (rightGrid) {
    const gridChildren = Array.from(rightGrid.children);
    gridImg = gridChildren.find(el => el.tagName === 'IMG');
    // The text block is the div with the h2 and the list
    gridTextBlock = gridChildren.find(el => el.querySelector('h2'));
  }

  // Compose the two columns:
  // Left: the main background image (leftImg)
  // Right: the card with the inner grid (contains gridImg and gridTextBlock)
  // But visually, the screenshot shows: left = image, right = text+list+button, with a small image inside the card
  // So, the best mapping is:
  //   - Column 1: left image (leftImg)
  //   - Column 2: all card content (cardBody)

  // Defensive: if leftImg or cardBody missing, fall back to the whole grid children
  const col1 = leftImg ? leftImg : (imgCol || '');
  const col2 = cardBody || (contentCol || '');

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [col1, col2],
  ], document);

  element.replaceWith(table);
}
