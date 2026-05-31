// Smooth-scroll to a section id, accounting for the sticky nav.
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
