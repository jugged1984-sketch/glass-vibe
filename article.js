document.querySelectorAll('.article-contents a').forEach(link => {
  link.addEventListener('click', () => {
    link.closest('details').open = false;
  });
});
