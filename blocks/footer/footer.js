import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  let fragment = await loadFragment(footerPath, { decorate: false });
  if (!fragment && footerPath !== footerPath.toLowerCase()) {
    fragment = await loadFragment(footerPath.toLowerCase(), { decorate: false });
  }
  if (!fragment) return;

  const authoredFooter = fragment.querySelector('.footer');
  if (authoredFooter) {
    authoredFooter.classList.remove('footer');
    const brandCell = authoredFooter.querySelector(':scope > div > div');
    if (brandCell && !brandCell.querySelector('p')) {
      const paragraph = document.createElement('p');
      while (brandCell.firstChild) paragraph.append(brandCell.firstChild);
      brandCell.append(paragraph);
    }
  }

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
