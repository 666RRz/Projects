const cardNum = document.getElementById('cardNumber');
const cardCvc = document.getElementById('cardCvc');
const cardEmail = document.getElementById('cardEmail');
const cardDate = document.getElementById('cardDate');

const valid = require('card-validator');
import { el } from 'redom';


export function checkCardNumber(num) {
  let inputValue = num;
  inputValue = inputValue.replace(/[^0-9]/g, '');
  inputValue = inputValue.replace(/(.{4})/g, '$1 ');
  inputValue = inputValue.substring(0, 19);
  return valid.number(inputValue).isValid
}

export function checkCardDate() {
  let inputValue = cardDate.value;
  inputValue = inputValue.replace(/[^0-9]/g, '');
  inputValue = inputValue.replace(/(.{2})/g, '$1/');
  inputValue = inputValue.substring(0, 5);
  cardDate.value = inputValue;
}

export function checkCardCvc(num) {
  let inputValue = num;
  inputValue = inputValue.replace(/[^0-9]/g, '');
  return valid.cvv(inputValue).isValid
}

export function checkCardEmail() {
  let inputValue = cardEmail.value;
  inputValue = inputValue.replace(/[^a-zA-Z0-9@._-]/g, '');
  cardEmail.value = inputValue;
}

export function createCardForm() {
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
        el('img#logo'),
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

  return form
}
