
<script>

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector('input[name="service_id"]').value;
  const surname = document.querySelector('input[name="surname"]').value;
  const phone = document.querySelector('input[name="template_id"]').value;
  const gift = document.querySelector('input[name="user_id"]').value;
  const comment = document.querySelector('textarea[name="comment"]').value;

  const templateParams = {
    _subject: "Новый заказ",
    _message: `Имя: ${name} ${surname}\nТелефон: ${phone}\nПодарок: ${gift}\nКомментарий: ${comment}`,
  };

  emailjs
    .send("service_wy80ed9", "template_hda1w3d", templateParams)
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      alert("Заказ отправлен успешно!");
    })
    .catch((error) => {
      console.log("FAILED...", error);
      alert("Ошибка отправки заказа. Пожалуйста, попробуйте снова.");
    });
});

</script>
