(() => {
  const left = document.getElementById("left");
  const right = document.getElementById("right");
  const hero = document.getElementById("hero__main");

  let idbag = ["hero__main", "hero__2", "hero__3"];
  let currentIdIndex = 0;

  const updateId = () => {
    setInterval(() => {
      hero.id = idbag[currentIdIndex];
      // const h1 = document.querySelector(".hero__h1");
      // const p = document.querySelector(".hero__p");
      // if (hero.id !== "hero__main") {
      //   h1.style.color = "#fff";
      //   p.style.color = "#fff";
      // } else {
      //   h1.style.color = "rgb(70, 70, 70)";
      //   p.style.color = "rgb(70, 70, 70)";
      // }
    }, 1000);
  };

  left.addEventListener("click", () => {
    currentIdIndex = (currentIdIndex - 1 + idbag.length) % idbag.length;
    updateId();
  });

  right.addEventListener("click", () => {
    currentIdIndex = (currentIdIndex + 1) % idbag.length;
    updateId();
  });

  updateId();
})();
