/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main container and grid
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The mainGrid children: [heading, quote, nestedGrid]
  const gridChildren = Array.from(mainGrid.children);
  if (gridChildren.length < 3) return;

  // Left column: heading, avatar+name+role
  const leftCol = document.createElement('div');
  leftCol.appendChild(gridChildren[0]); // heading (h2)

  // Nested grid contains: divider, avatar+name+role, logo image
  const nestedGrid = gridChildren[2];
  if (!nestedGrid) return;
  const nestedChildren = Array.from(nestedGrid.children);
  // Find avatar/name/role group
  const avatarGroup = nestedChildren.find(
    (el) => el.classList.contains('flex-horizontal')
  );
  if (avatarGroup) {
    leftCol.appendChild(avatarGroup);
  }

  // Right column: quote, logo image
  const rightCol = document.createElement('div');
  rightCol.appendChild(gridChildren[1]); // quote (p)
  // Find logo image (last child in nested grid)
  const logoImg = nestedChildren.find(
    (el) => el.querySelector('img') && el.classList.contains('utility-display-inline-block')
  );
  if (logoImg) {
    rightCol.appendChild(logoImg);
  }

  // Compose table rows
  const headerRow = ['Columns block (columns27)'];
  const contentRow = [leftCol, rightCol];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
