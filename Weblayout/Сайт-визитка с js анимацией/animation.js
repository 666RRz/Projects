(()=> {
  window.addEventListener('DOMContentLoaded', animateFirstPage)
  function burgerMenuAnimation() {
    const burgerButton = document.querySelector('.burger');
    const burgerButtonClose = document.querySelector('.close');
    const menu = document.querySelector('.menu');
    const tlFirstPage = gsap.timeline();
      const tl = gsap.timeline({paused: true, reversed: true});

    tl.fromTo('.nav__list',{opacity: 0, y: 50}, {opacity: 1, duration: 1, y: -10})
    tl.fromTo('.menu__right', {opacity: 0, y: 50}, {opacity: 1, duration: 1, y: -10})
      .fromTo('.social', {opacity: 0, y: 50}, {opacity: 1, duration: 1, y: -10}, '<');

    tlFirstPage.fromTo('.hero__title', {opacity: 0, y: 50}, {opacity: 1, y: -10, duration: 0.6 })
      .fromTo('.hero__btn', {opacity: 0, y: 50}, {opacity: 1, y: -10, duration: 0.6}, '<');
    tlFirstPage.fromTo('.hero__descr', {opacity: 0, y: 50}, {opacity: 1, y: -10, duration: 0.6});
    tlFirstPage.fromTo(`.img-1`, {opacity: 0, scale: 0.5}, {opacity: 1, scale: 1, duration: 0.6});
    tlFirstPage.fromTo(`.img-2`, {opacity: 0, scale: 0.5}, {opacity: 1, scale: 1, duration: 0.6});
    tlFirstPage.fromTo(`.img-3`, {opacity: 0, scale: 0.5}, {opacity: 1, scale: 1, duration: 0.6});
    tlFirstPage.fromTo('.photos__author', {opacity: 0}, {opacity: 1, duration: 1});

    function burgerAnim() {
      tl.play();
      menu.classList.add('menu--open');
    }
    function burgerAnimClose() {
      tl.reverse().then(()=> {
        menu.classList.remove('menu--open');
      })
    }

    burgerButton.addEventListener('click', burgerAnim)
    burgerButtonClose.addEventListener('click', burgerAnimClose)
  }
  function animateFirstPage() {
    tlFirstpage.play();
  }
  burgerMenuAnimation();
})()


