/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all images in the hero background
  function getHeroImages(el) {
    // Find the grid with images (background collage)
    const grid = el.querySelector('.desktop-3-column');
    if (!grid) return [];
    // Get all img elements inside the grid
    return Array.from(grid.querySelectorAll('img'));
  }

  // Helper to get the hero content (title, subheading, CTA)
  function getHeroContent(el) {
    // Find the content container
    const content = el.querySelector('.ix-hero-scale-3x-to-1x-content');
    if (!content) return null;
    // Get the inner container with text and buttons
    const inner = content.querySelector('.container');
    if (!inner) return content;
    return inner;
  }

  // Find the main hero block wrapper
  let heroWrapper = element;
  // Defensive: If this is not the header, look for the header inside
  if (!heroWrapper.classList.contains('section')) {
    heroWrapper = element.querySelector('header.section') || element;
  }

  // Table header row
  const headerRow = ['Hero (hero20)'];

  // Row 2: Background images (collage)
  const images = getHeroImages(heroWrapper);
  // If there are images, put them in a fragment for the cell
  let imagesCell;
  if (images.length) {
    // Optionally wrap in a div for layout flexibility
    const imgContainer = document.createElement('div');
    images.forEach(img => imgContainer.appendChild(img));
    imagesCell = imgContainer;
  } else {
    imagesCell = '';
  }

  // Row 3: Hero content (title, subheading, CTA)
  const heroContent = getHeroContent(heroWrapper);
  let contentCell;
  if (heroContent) {
    contentCell = heroContent;
  } else {
    contentCell = '';
  }

  // Compose table rows
  const rows = [
    headerRow,
    [imagesCell],
    [contentCell],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
