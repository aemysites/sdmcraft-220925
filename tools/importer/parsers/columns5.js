/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout.container');
  if (!grid) return;

  // Left column: text content (heading, paragraph, buttons)
  const leftSection = grid.querySelector('div.section');
  const leftColContent = [];
  if (leftSection) {
    // Heading
    const heading = leftSection.querySelector('h2');
    if (heading) leftColContent.push(heading);
    // Paragraph (rich text)
    const para = leftSection.querySelector('.rich-text, .w-richtext, p');
    if (para) leftColContent.push(para);
    // Buttons
    const btnGroup = leftSection.querySelector('.button-group');
    if (btnGroup) {
      const btns = Array.from(btnGroup.querySelectorAll('a'));
      leftColContent.push(...btns);
    }
  }

  // Right column: image (reference existing element)
  // The image is a direct child of the parent grid, not inside the left section
  let rightColImage = null;
  const parentGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (parentGrid) {
    // Find img that is a direct child of the parent grid
    rightColImage = Array.from(parentGrid.children).find(
      (el) => el.tagName === 'IMG'
    );
  }
  // Fallback: any image inside element
  if (!rightColImage) {
    rightColImage = element.querySelector('img');
  }
  const rightColContent = rightColImage ? [rightColImage] : [];

  // Compose table: header row, then columns row
  const headerRow = ['Columns block (columns5)'];
  const columnsRow = [leftColContent, rightColContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
