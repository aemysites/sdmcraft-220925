/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract slides from the tab panes
  function extractSlides(element) {
    const slides = [];
    // Find the tab content container
    const tabContent = element.querySelector('.w-tab-content');
    if (!tabContent) return slides;
    // Each .w-tab-pane is a slide
    tabContent.querySelectorAll(':scope > .w-tab-pane').forEach((pane) => {
      // Find the grid inside the pane
      const grid = pane.querySelector('.w-layout-grid');
      if (!grid) return;
      // Find image inside the grid
      const img = grid.querySelector('img');
      // Defensive: Only add if there's an image
      if (img) {
        // Remove the image from the grid so it doesn't appear twice
        img.remove();
        // Build text cell: collect all remaining content in the grid
        let textCell = '';
        // If there is any content left in the grid, add it to the text cell
        if (grid.childNodes.length > 0) {
          const fragment = document.createDocumentFragment();
          Array.from(grid.childNodes).forEach((node) => {
            fragment.appendChild(node);
          });
          textCell = fragment;
        }
        slides.push([img, textCell]);
      }
    });
    return slides;
  }

  const headerRow = ['Carousel (carousel22)'];
  const rows = [headerRow];
  const slides = extractSlides(element);
  rows.push(...slides);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
