/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a link element from an iframe src
  function createLinkFromIframe(iframe) {
    const a = document.createElement('a');
    a.href = iframe.src;
    a.textContent = iframe.title || iframe.src;
    return a;
  }

  // Get the grid-layout container (main content)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the main heading (visual, not screen-reader-only)
  const heading = grid.querySelector('.h1-heading');

  // Find the subheading (paragraph)
  const subheading = grid.querySelector('.subheading');

  // Find the button group (CTAs)
  const buttonGroup = grid.querySelector('.button-group');

  // Find the YouTube video iframe (background asset)
  let backgroundAsset = null;
  const videoDiv = grid.querySelector('.w-embed-youtubevideo');
  if (videoDiv) {
    const iframe = videoDiv.querySelector('iframe');
    if (iframe) {
      // Per instructions, non-img src elements become links
      backgroundAsset = createLinkFromIframe(iframe);
    }
  }

  // Compose the content cell for row 3
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (buttonGroup) contentCell.push(buttonGroup);

  // Build the table rows
  const headerRow = ['Hero (hero25)'];
  const backgroundRow = [backgroundAsset ? backgroundAsset : ''];
  const contentRow = [contentCell];

  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
