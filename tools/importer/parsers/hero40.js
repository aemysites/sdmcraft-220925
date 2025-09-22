/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Table header row ---
  const headerRow = ['Hero (hero40)'];

  // --- 2. Background image row ---
  // Find the main image (background)
  let bgImg = null;
  const imgCandidates = element.querySelectorAll('img');
  if (imgCandidates.length > 0) {
    // Use the first image as the background
    bgImg = imgCandidates[0];
  }
  const bgImageRow = [bgImg ? bgImg : ''];

  // --- 3. Content row (title, subheading, CTA) ---
  // Find the container with the main text and CTA
  let contentCell = document.createElement('div');
  // Find the grid that contains the heading and content
  const gridContainers = element.querySelectorAll('.container .w-layout-grid');
  let heading = null, subheading = null, paragraph = null, cta = null;
  if (gridContainers.length > 0) {
    const grid = gridContainers[0];
    // Heading
    heading = grid.querySelector('h1');
    // Subheading and paragraph
    const flexVertical = grid.querySelector('.flex-vertical');
    if (flexVertical) {
      paragraph = flexVertical.querySelector('p');
      // CTA button
      const buttonGroup = flexVertical.querySelector('.button-group');
      if (buttonGroup) {
        cta = buttonGroup.querySelector('a');
      }
    }
  }
  // Append found elements to content cell
  if (heading) contentCell.appendChild(heading);
  if (paragraph) contentCell.appendChild(paragraph);
  if (cta) contentCell.appendChild(cta);

  // Defensive: if nothing found, fallback to all text content
  if (!contentCell.hasChildNodes()) {
    contentCell.textContent = element.textContent.trim();
  }

  const contentRow = [contentCell];

  // --- 4. Build table and replace ---
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
