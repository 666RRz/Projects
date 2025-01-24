export default function changeTheme() {
  const themeButton = document.getElementById('theme');

  themeButton.addEventListener('click', () => {
    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = 'styles/white.css';

    if (document.head.children.length <= 10) {
      document.head.appendChild(styleSheet);
    } else if (document.head.children.length > 10) {
      document.head.lastChild.remove();
    }
  });
}
