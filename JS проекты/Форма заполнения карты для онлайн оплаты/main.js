
const valid = require('card-validator')

const cardNum = document.getElementById('cardNumber')
// const cardMonth = document.getElementById('cardMonth')
// const cardYear = document.getElementById('cardYear')
const cardCvc = document.getElementById('cardCvc')
const cardEmail = document.getElementById('cardEmail')

const cardDate = document.getElementById('cardDate')

const cardName = document.getElementById('cardName')
const div = document.getElementById('my-card')

const button = document.getElementById('submitButton')

let validationFlags = {
	cardNum: false,
	cardDate: false,
	cardCvc: false,
	cardEmail: false
}

cardNum.addEventListener('input', ()=> {
	let inputValue = cardNum.value
	inputValue = inputValue.replace(/[^0-9]/g, '')
	inputValue = inputValue.replace(/(.{4})/g, '$1 ');
	inputValue = inputValue.substring(0, 19);
	cardNum.value = inputValue
})

cardNum.addEventListener('focusout', ()=> {
	const value = cardNum.value.trim()
	cardNum.classList.remove('input-wrong')

	try {
		if(valid.number(value).card.niceType === 'Mir') {
			cardName.innerHTML = 'Мир'
			div.classList.add('div-mir')
		} else if(valid.number(value).card.niceType === 'Visa') {
			cardName.innerHTML = 'Visa'
			div.classList.add('div-visa')
		} else if(valid.number(value).card.niceType === 'Mastercard') {
			cardName.innerHTML = 'MasterCard'
			div.classList.add('div-master')
		} else if(valid.number(value).card.niceType === 'American Express') {
			cardName.innerHTML = 'American Express'
			div.classList.add('div-exp')
		} else if(valid.number(value).card.niceType) {
				cardName.innerHTML = valid.number(value).card.niceType
				div.classList.add('div-some')
		}
	} catch(err) {
		cardName.innerHTML = 'Новая карта'
		div.classList.remove('div-mir', 'div-visa', 'div-master', 'div-exp', 'div-some')

	}

	if(valid.number(value).isValid || value === '') {
		cardNum.classList.remove('input-wrong')
	} else {
		cardNum.classList.add('input-wrong')
	}

	if(valid.number(value).isValid) {
		validationFlags.cardNum = true
	} else {
		validationFlags.cardNum = false
	}

	checkValidation()

})

// cardMonth.addEventListener('input', ()=> {
// 	let inputValue = cardMonth.value
// 	inputValue = inputValue.substring(0, 2);
// 	cardMonth.value = inputValue
// })

// cardMonth.addEventListener('focusout', ()=> {
// 	const value = cardMonth.value.trim()

// 	if(valid.expirationMonth(value).isValid || cardMonth.value === '') {
// 		cardMonth.classList.remove('input-wrong')
// 	} else {
// 		cardMonth.classList.add('input-wrong')
// 	}


// 	if(valid.expirationMonth(value).isValid) {
// 		validationFlags.cardMonth = true
// 	} else {
// 		validationFlags.cardMonth = false
// 	}

// 	checkValidation()
// })

// cardYear.addEventListener('input', ()=> {
// 	let inputValue = cardYear.value
// 	inputValue = inputValue.replace(/[^0-9]/g, '')
// 	inputValue = inputValue.substring(0, 4);
// 	cardYear.value = inputValue
// })

// cardYear.addEventListener('focusout', ()=> {
// 	const value = cardYear.value.trim()
// 	if(valid.expirationYear(value, 8).isValid || cardYear.value === '') {
// 		cardYear.classList.remove('input-wrong')
// 	}	else {
// 		cardYear.classList.add('input-wrong')
// 	}
// 	if(valid.expirationYear(value, 8).isValid) {
// 		validationFlags.cardYear = true
// 	} else {
// 		validationFlags.cardYear = false
// 	}
// 	checkValidation()
// })


cardDate.addEventListener('input', ()=> {
	let inputValue = cardDate.value
	inputValue = inputValue.replace(/[^0-9]/g, '')
	inputValue = inputValue.replace(/(.{2})/g, '$1/')
	inputValue = inputValue.substring(0, 5)
	cardDate.value = inputValue
})

cardDate.addEventListener('focusout', ()=> {
	const value = cardDate.value.trim()
	console.log(valid.expirationDate(value, 8));


	if(valid.expirationDate(value, 8 ).isValid || value === '') {
		cardDate.classList.remove('input-wrong')
	} else {
		cardDate.classList.add('input-wrong')
	}


	if(valid.expirationDate(value, 8).isValid) {
		validationFlags.cardDate = true
	} else {
		validationFlags.cardDate = false
	}
	checkValidation()
})


cardCvc.addEventListener('input', ()=> {
	let inputValue = cardCvc.value
	inputValue = inputValue.replace(/[^0-9]/g, '')
	inputValue = inputValue.substring(0, 3);
	cardCvc.value = inputValue
})

cardCvc.addEventListener('focusout', ()=> {
	const value = cardCvc.value.trim()

	if(valid.cvv(value).isValid || cardCvc.value === '') {
		cardCvc.classList.remove('input-wrong')
	}	else {
		cardCvc.classList.add('input-wrong')
	}
	if(valid.cvv(value).isValid) {
		validationFlags.cardCvc = true
	} else {
		validationFlags.cardCvc = false
	}
	checkValidation()

})

cardEmail.addEventListener('input', ()=> {
	let inputValue = cardEmail.value
	inputValue = inputValue.replace(/[^a-zA-Z0-9@._-]/g, '');
	cardEmail.value = inputValue
})

cardEmail.addEventListener('focusout', ()=> {
	if(!cardEmail.value.includes('@') || !cardEmail.value.includes('.')) {
		cardEmail.classList.add('input-wrong')
	} else {
		cardEmail.classList.remove('input-wrong')
	}

	if(cardEmail.value === '') {
		cardEmail.classList.remove('input-wrong')
	}

	if(!cardEmail.classList.contains('input-wrong') && cardEmail.value !== '') {
		validationFlags.cardEmail = true
	} else {
		validationFlags.cardEmail = false
	}
	checkValidation()

})

function checkValidation() {
	checkValidation
	if(Object.values(validationFlags).every(flag => flag === true)) {
		button.removeAttribute('disabled')
		button.classList.remove('disabled')
	} else {
		button.setAttribute('disabled', 'disabled')
		button.classList.add('disabled')
	}
}

