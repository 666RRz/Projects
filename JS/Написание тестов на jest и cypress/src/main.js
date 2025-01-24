// eslint-disable-next-line import/no-extraneous-dependencies
import { el, mount } from 'redom';

import './assets/css/OnlineCardForm.css';

import americanExpressLogo from './assets/img/american-express.png';
import mastercardLogo from './assets/img/master-card.png';
import mirLogo from './assets/img/mir.png';
import uncardLogo from './assets/img/uncard.png';
import visaLogo from './assets/img/visa.png';

const valid = require('card-validator');

const root = document.querySelector('.rootWrapper');

function validateCardForm() {

  const logo = document.getElementById('logo');
  const cardNum = document.getElementById('cardNumber');
  const cardCvc = document.getElementById('cardCvc');
  const cardEmail = document.getElementById('cardEmail');

  const cardDate = document.getElementById('cardDate');

  const cardName = document.getElementById('cardName');
  const div = document.getElementById('my-card');

  const button = document.getElementById('submitButton');

  const validationFlags = {
    cardNum: false,
    cardDate: false,
    cardCvc: false,
    cardEmail: false,
  };

  function checkValidation() {
    checkValidation;
    if (Object.values(validationFlags).every((flag) => flag === true)) {
      button.removeAttribute('disabled');
      button.classList.remove('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
      button.classList.add('disabled');
    }
  }

  cardNum.addEventListener('input', () => {
    let inputValue = cardNum.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    inputValue = inputValue.replace(/(.{4})/g, '$1 ');
    inputValue = inputValue.substring(0, 19);
    cardNum.value = inputValue;
  });

  cardNum.addEventListener('focusout', () => {
    const value = cardNum.value.trim();
    cardNum.classList.remove('input-wrong');
    try {
      if (valid.number(value).card.niceType === 'Mir') {
        cardName.innerHTML = 'Мир';
        logo.src = mirLogo;
        div.classList.add('div-mir');
      } else if (valid.number(value).card.niceType === 'Visa') {
        cardName.innerHTML = 'Visa';
        logo.src = visaLogo;
        div.classList.add('div-visa');
      } else if (valid.number(value).card.niceType === 'Mastercard') {
        cardName.innerHTML = 'MasterCard';
        logo.src = mastercardLogo;
        div.classList.add('div-master');
      } else if (valid.number(value).card.niceType === 'American Express') {
        cardName.innerHTML = 'American Express';
        logo.src = americanExpressLogo;
        div.classList.add('div-exp');
      } else if (valid.number(value).card.niceType) {
        cardName.innerHTML = valid.number(value).card.niceType;
        logo.src = uncardLogo;
        div.classList.add('div-some');
      }
    } catch (err) {
      cardName.innerHTML = 'Новая карта';
      div.classList.remove('div-mir', 'div-visa', 'div-master', 'div-exp', 'div-some');
      logo.src = uncardLogo;
    }

    if (valid.number(value).isValid || value === '') {
      cardNum.classList.remove('input-wrong');
    } else {
      cardNum.classList.add('input-wrong');
    }

    if (valid.number(value).isValid) {
      validationFlags.cardNum = true;
    } else {
      validationFlags.cardNum = false;
    }

    checkValidation();
  });

  cardDate.addEventListener('input', () => {
    let inputValue = cardDate.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    inputValue = inputValue.replace(/(.{2})/g, '$1/');
    inputValue = inputValue.substring(0, 5);
    cardDate.value = inputValue;
  });

  cardDate.addEventListener('focusout', () => {
    const value = cardDate.value.trim();
    console.log(valid.expirationDate(value, 8));

    if (valid.expirationDate(value, 8).isValid || value === '') {
      cardDate.classList.remove('input-wrong');
    } else {
      cardDate.classList.add('input-wrong');
    }

    if (valid.expirationDate(value, 8).isValid) {
      validationFlags.cardDate = true;
    } else {
      validationFlags.cardDate = false;
    }
    checkValidation();
  });

  cardCvc.addEventListener('input', () => {
    let inputValue = cardCvc.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    inputValue = inputValue.substring(0, 3);
    cardCvc.value = inputValue;
  });

  cardCvc.addEventListener('focusout', () => {
    const value = cardCvc.value.trim();

    if (valid.cvv(value).isValid || cardCvc.value === '') {
      cardCvc.classList.remove('input-wrong');
    }	else {
      cardCvc.classList.add('input-wrong');
    }
    if (valid.cvv(value).isValid) {
      validationFlags.cardCvc = true;
    } else {
      validationFlags.cardCvc = false;
    }
    checkValidation();
  });

  cardEmail.addEventListener('input', () => {
    let inputValue = cardEmail.value;
    inputValue = inputValue.replace(/[^a-zA-Z0-9@._-]/g, '');
    cardEmail.value = inputValue;
  });

  cardEmail.addEventListener('focusout', () => {
    if (!cardEmail.value.includes('@') || !cardEmail.value.includes('.')) {
      cardEmail.classList.add('input-wrong');
    } else {
      cardEmail.classList.remove('input-wrong');
    }

    if (cardEmail.value === '') {
      cardEmail.classList.remove('input-wrong');
    }

    if (!cardEmail.classList.contains('input-wrong') && cardEmail.value !== '') {
      validationFlags.cardEmail = true;
    } else {
      validationFlags.cardEmail = false;
    }
    checkValidation();
  });
}

export async function createCardForm() {
  const form = el('form#form', {
    method: 'POST',
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }, [
    el('#my-card.card-js.card-wrapper', [
      el('#cardDataHolder.card-logo', [
        el('h2#cardName', 'Новая карта', {
          position: 'relative',
        }),
        el('img#logo', {
          src: uncardLogo,
        }),
      ]),
      el('input#cardNumber.card-number', {
        type: 'text',
        required: 'required',
        placeholder: 'XXXX XXXX XXXX XXXX',
      }),
      el('input#cardDate.expiry-month', {
        type: 'text',
        required: 'required',
        placeholder: 'month/year',
      }),
      el('input#cardCvc.cvc', {
        type: 'text',
        required: 'required',
        placeholder: 'cvc',
      }),
      el('input#cardEmail', {
        type: 'text',
        required: 'required',
        placeholder: 'Email',
      }),
    ]),
    el('.card-div', [
      el('button#submitButton.disabled', 'Добавить новую карту', {
        disabled: 'disabled',
        type: 'submit',
      }),
    ]),
  ]);

  mount(root, form);
}

createCardForm().then(() => {
  validateCardForm();
});
