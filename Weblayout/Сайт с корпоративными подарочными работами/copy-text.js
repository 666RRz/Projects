(() => {
  const copyBtnFirst = document.querySelector(".copy-button-first");
  const copyBtnSec = document.querySelector(".copy-button-sec");
  copyBtnFirst.addEventListener("click", () => copyText("adr1"));
  copyBtnSec.addEventListener("click", () => copyText("adr2"));
  function copyText(id) {
    if(navigator.clipboard) {
      navigator.clipboard.writeText(document.getElementById(id).textContent.trim()).then(() => {
        alert('Текст упешно скопирован')
      }, (error) => {
        console.error(error);
      })
    } else {
      alert("Не удалось скопировать данные, разрешите копирование данных в настройках вашего браузера, либо скопируйте вручную")
    }
  }
})();
