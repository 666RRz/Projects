import { el, list } from 'redom'

/// Импорт стилей
import '../assets/scss/currency.scss'

/// Импорты переменных

import {
	currencyUpSvg,
	currencyDownSvg,
} from '../components/variables-functions/variables'

import { getCurrencyForTransactionList } from '../components/variables-functions/additionalFunctions'

import { currencyTransaction } from '../components/variables-functions/serverRequests'

const createMyCurrencyComponent = currency => {
	const wrapper = el('.myCurrency__wrapper.myCurrency.Currency-style')
	const title = el('h2.myCurrency__title', 'Ваши валюты')

	class Li {
		constructor() {
			this.el = el('li.myCurrency__li')
		}
		update(data) {
			this.el.innerHTML = ''
			const infoDiv = el(
				'.myCurrency__ul-div',
				el('p.myCurrency__ul-name', data.code),
				el('span.myCurrency__ul-span'),
				el('p.myCurrency__ul-mount', data.amount)
			)

			this.el.append(infoDiv)
		}
	}
	const ul = list('ul.myCurrency__ul.Currency-style__ul', Li)

	ul.update(currency)

	wrapper.append(title, ul.el)
	return {
		wrapper,
		title,
		Li,
		ul,
	}
}

const createChangeCurrencyComponent = currency => {
	// Создание элементов
	const wrapper = el('.changeCurrency.changeCurrency__wrapper')

	const title = el('h2.changeCurrency__title', 'Обмен валюты')

	const divWrapper = el('.changeCurrency__divWrapper')
	const content = el('form.changeCurrency__innerContent', {
		method: 'post',
	})

	const from = el('span.changeCurrency__span-from', 'Из')
	const FromIn = el('span.changeCurrency__span-in', 'В')
	const spanSum = el('span.changeCurrency__span-sum', 'Сумма')

	const selectFrom = el(
		'.changeCurrency__selectFrom.select',
		{
			dataset: {
				target: 'selectFrom',
			},
		},
		el('span.selectFrom-span')
	)
	const selectIn = el(
		'.changeCurrency__selectIn.select',
		{
			dataset: {
				target: 'selectIn',
			},
		},
		el('span.selectIn-span')
	)
	const selectSum = el('input.changeCurrency__selectSum')

	const selectFromWrapper = getCurrencyForTransactionList(currency)
	const selectInWrapper = getCurrencyForTransactionList(currency, true)

	selectFrom.append(selectFromWrapper)
	selectIn.append(selectInWrapper)

	window.addEventListener('click', e => {
		if (e.target.dataset.target === 'selectFrom') {
			selectFrom.classList.toggle('select-back')
			selectFromWrapper.classList.add('currency-transaction-ul-active')
			return
		}
		if (e.target.dataset.target === 'selectIn') {
			selectIn.classList.toggle('select-back')
			selectInWrapper.classList.add('currency-transaction-ul-active')
			return
		}

		if (e.target.dataset.target === 'selectIn') {
			selectIn.classList.toggle('select-back')
			return
		}

		if (e.target.dataset.target === 'currency-ul') {
			return
		}

		if (e.target.dataset.target === 'currency-code-li') {
			selectFrom.firstChild.textContent = e.target.textContent
		}

		if (e.target.dataset.target === 'currency-code-li-to') {
			selectIn.firstChild.textContent = e.target.textContent
		}
		selectFromWrapper.classList.remove('currency-transaction-ul-active')
		selectInWrapper.classList.remove('currency-transaction-ul-active')
		selectFrom.classList.remove('select-back')
		selectIn.classList.remove('select-back')
	})

	const selectSumDiv = el('.changeCurrency__sumDiv', spanSum, selectSum)

	const selectDiv = el(
		'.changeCurrency__div',
		from,
		selectFrom,
		FromIn,
		selectIn
	)

	const button = el('button.changeCurrency__button', 'Обменять', {
		type: 'submit',
	})

	button.addEventListener('click', async (e, currency) => {
		e.preventDefault()
		const from = selectFrom.firstChild.textContent
		const to = selectIn.firstChild.textContent
		const amount = selectSum.value.trim()
		const token = window.sessionStorage.getItem('token')

		try {
			await currencyTransaction(from, to, amount, currency, token)
		} catch (error) {
			throw new Error('Ошибка перевода валюты - ', error)
		}
	})

	divWrapper.append(selectDiv, selectSumDiv)
	content.append(divWrapper, button)

	wrapper.append(title, content)

	return wrapper
}

const createRealTimeCurrencyComponent = currency => {
	const title = createMyCurrencyComponent(currency).title
	const wrapper = el('.allCurrency__wrapper.allCurrency.myCurrency')

	title.textContent = 'Изменение курсов в реальном времени'

	class Li {
		constructor() {
			this.el = el('li.myCurrency__li')
		}

		update(data) {
			this.el.innerHTML = ''

			const infoDiv = el(
				'.myCurrency__ul-div',
				el('p.myCurrency__ul-name', `${data.from}/${data.to}`),
				data.change === 1
					? el('span.myCurrency__ul-span.span-green')
					: el('span.myCurrency__ul-span.span-red'),
				el('p.myCurrency__ul-mount', data.rate),
				el('.currency-svg', middleWare(data))
			)

			this.el.append(infoDiv)
		}
	}

	function middleWare(data) {
		const svgElement = data.change === 1 ? currencyUpSvg : currencyDownSvg
		const clonedSvg = svgElement.cloneNode(true)
		return clonedSvg
	}

	const ul = list('ul.allCurrency__ul.myCurrency__ul', Li)

	ul.update(currency)

	wrapper.append(title, ul.el)
	return wrapper
}

export default function createCurrencyPage(currency) {
	const container = el('.container.currency__container')

	const wrapper = el('.currency__wrapper')
	const leftSide = el('.currency__wrapper-left')
	const rightSide = el('.currency__wrapper-right')

	const title = el('h1.currency__title.title', 'Валютный обмен')
	title.innerHTML = 'Валютный обмен'

	const myCurrencyComponent = createMyCurrencyComponent(currency).wrapper
	const changeCurrencyComponent = createChangeCurrencyComponent(currency)

	/// Инициализация сокет соединения
	const socket = new WebSocket('ws://localhost:3000/currency-feed')

	let realTimeCurrencyComponent = null

	const arr = []

	socket.onmessage = event => {
		let data = JSON.parse(event.data)
		arr.unshift(data)
		realTimeCurrencyComponent = null
		realTimeCurrencyComponent = createRealTimeCurrencyComponent(arr)

		rightSide.innerHTML = ''
		rightSide.append(realTimeCurrencyComponent)
	}

	leftSide.append(myCurrencyComponent, changeCurrencyComponent)

	wrapper.append(leftSide, rightSide)

	socket.onerror = function (error) {
		console.error('Ошибка: ', error.message)
	}
	socket.onclose = function (event) {
		if (event.wasClean) {
			console.log(
				`Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
			)
		} else {
			console.error('Соединение прервано')
		}
	}

	container.append(title, wrapper)
	return container
}
