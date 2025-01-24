
export function animateNavButtons() {
  const dl = gsap.timeline();
  dl.fromTo(
    '.nav__list',
    { y: '-1200%', opacity: 0 },
    {
      y: '0%', opacity: 1, duration: 2.5, ease: 'power3.out',
    },
  );

  const lists = document.querySelectorAll('.nav__list');
  lists.forEach((list) => {
    list.addEventListener('mouseover', () => {
      gsap.to(list, {
        duration: 0.3,
        ease: 'power3.out',
        scale: 1.1,
        outlineWidth: '3px',
        outlineStyle: 'solid',
        borderRadius: '30px',
        outlineOffset: '15px',
      });
    });
    list.addEventListener('mouseout', () => {
      gsap.to(list, {
        scale: 1,
        duration: 0.3,
        ease: 'power3.out',
        outline: 'none',
      });
    });
  });
}
export function animateLogo() {
  const logo = document.querySelector('.header__logo');
  const toText = logo.querySelector('text');

  const to = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  const doText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  to.textContent = 'To-';
  doText.textContent = 'DO';

  to.setAttribute('x', toText.getAttribute('x'));
  to.setAttribute('y', toText.getAttribute('y'));
  to.setAttribute('font-family', toText.getAttribute('font-family'));
  to.setAttribute('font-size', toText.getAttribute('font-size'));
  to.setAttribute('fill', toText.getAttribute('fill'));
  to.setAttribute('font-weight', toText.getAttribute('font-weight'));
  to.setAttribute('letter-spacing', toText.getAttribute('letter-spacing'));

  doText.setAttribute('x', toText.getAttribute('x') + to.getComputedTextLength());
  doText.setAttribute('y', toText.getAttribute('y'));
  doText.setAttribute('font-family', toText.getAttribute('font-family'));
  doText.setAttribute('font-size', toText.getAttribute('font-size'));
  doText.setAttribute('fill', toText.getAttribute('fill'));
  doText.setAttribute('font-weight', toText.getAttribute('font-weight'));
  doText.setAttribute('letter-spacing', toText.getAttribute('letter-spacing'));

  logo.appendChild(to);
  logo.appendChild(doText);

  toText.style.visibility = 'hidden';

  const tl = gsap.timeline();
  tl.set(to, { y: '-100%' });
  tl.set(doText, { x: `${to.getComputedTextLength()}px`, y: '-100%' });
  tl.to(to, { y: '0%', duration: 1, ease: 'power3.out' })
    .to(doText, {
      y: '0%', x: `+=${-to.getComputedTextLength()}`, duration: 1, ease: 'power3.out',
    }, '+=0.2');
}
export function animateWatch() {
  const tl = gsap.timeline();
  tl.fromTo('#header-time', { opacity: -10000 }, { opacity: 1, duration: 2, ease: 'power3.out' });
}
export function animateNewDeal() {
  const tl = gsap.timeline({ paused: true, reversed: true });
  const newDealButton = document.getElementById('newDeal');
  const cancelButton = document.getElementById('cancel');
  const newDealDiv = document.getElementById('newDealP');
  tl.fromTo('#newDealP', { opacity: 0 }, {
    opacity: 1, y: 50, duration: 0.5, ease: 'power3.out',
  });
  newDealButton.addEventListener('click', () => {
    tl.play();
  });
  cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    tl.reverse().then(() => {
      newDealDiv.classList.remove('active', 'newDeal__popUp');
      newDealDiv.classList.add('none');
    });
  });
}
