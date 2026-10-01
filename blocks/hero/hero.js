export default function decorate(block) {
  const title = block.children[0]?.children[0];
  if (title) {
    title.setAttribute('role', 'heading');
    title.setAttribute('aria-level', '1');
  }

  const devotion = block.children[1]?.children[0];
  if (devotion) {
    devotion.setAttribute('role', 'heading');
    devotion.setAttribute('aria-level', '2');
  }
}
