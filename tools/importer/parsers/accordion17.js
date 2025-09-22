/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children with a selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Each accordion item is a .accordion.w-dropdown
  const accordionItems = element.querySelectorAll(':scope > .accordion.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: find .w-dropdown-toggle > .paragraph-lg
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content: find nav.accordion-content .w-richtext or the whole nav
    const nav = item.querySelector('nav.accordion-content');
    let contentEl = null;
    if (nav) {
      // Look for .w-richtext inside nav
      contentEl = nav.querySelector('.w-richtext') || nav;
    }

    // Defensive: fallback to empty div if missing
    const titleCell = titleEl || document.createElement('div');
    const contentCell = contentEl || document.createElement('div');

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
