export default function GetTime() {
  const time = document.getElementById('header-time');
  setInterval(() => {
    time.innerHTML = new Date().toLocaleTimeString();
  }, 1000);
}
