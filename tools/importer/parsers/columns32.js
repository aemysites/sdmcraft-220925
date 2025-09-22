/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (!gridChildren.length) return;

  const mainCol = gridChildren[0];
  // Extract left column content
  const leftColParts = [];
  const breadcrumbs = mainCol.querySelector('.flex-horizontal.flex-gap-xxs.y-center');
  if (breadcrumbs) leftColParts.push(breadcrumbs.cloneNode(true));
  const heading = mainCol.querySelector('.h2-heading');
  if (heading) leftColParts.push(heading.cloneNode(true));
  const meta = mainCol.querySelector('.utility-margin-bottom-1rem');
  if (meta) leftColParts.push(meta.cloneNode(true));
  const socials = mainCol.querySelector('ul[aria-label="Social media links"]');
  if (socials) leftColParts.push(socials.cloneNode(true));

  // Extract right column content (main image)
  let rightColPart = null;
  const imageContainer = Array.from(mainCol.children).find(div => div.querySelector('img.image'));
  if (imageContainer) {
    const mainImage = imageContainer.querySelector('img.image');
    if (mainImage) rightColPart = mainImage.cloneNode(true);
  }

  // Only include columns that actually have content (no empty columns)
  const contentRow = [];
  if (leftColParts.length > 0) contentRow.push(leftColParts);
  if (rightColPart) contentRow.push(rightColPart);
  if (contentRow.length < 2) {
    // If only one column, still output as a single column block
    if (contentRow.length === 1) {
      const headerRow = ['Columns block (columns32)'];
      const cells = [headerRow, contentRow];
      const block = WebImporter.DOMUtils.createTable(cells, document);
      element.replaceWith(block);
    }
    return;
  }

  const headerRow = ['Columns block (columns32)'];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
