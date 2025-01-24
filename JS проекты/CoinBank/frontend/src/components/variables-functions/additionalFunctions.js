import { mount, el, svg, list } from 'redom'
import { headerButtons } from './variables'
import Chart from 'chart.js/auto'

import '../../assets/scss/snackBar.scss'

/// Удаление класса current-page у кнопок в хедере
export function removeCurrentPage() {
	headerButtons.forEach(button => button.classList.remove('current-page'))
}

/// Создание уведомления об ошибке
export function changeTextContent(div, text) {
	div.textContent = text
}

/// Создание новой страницы
export function createNewPage(root, param, isNewPage) {
	if (isNewPage) {
		root.innerHTML = ''
		mount(root, param)
	} else {
		if (root.innerHTML === '') {
			mount(root, param)
		}
	}
}

/// Обрезка номера счета
export function normalizeDataAccount(num) {
	let result
	if (num.length > 14) {
		result = `${num.slice(0, 14)}...`
	} else {
		result = num
	}
	return result
}

/// Нормализация баланса
export function normalizeDataBalance(number, from, to, currentAccount) {
	if (typeof number !== 'number' || isNaN(number)) {
		throw new Error('Входное значение должно быть числом.')
	}

	const parts = number.toString().split('.')
	const integerPart = parts[0]
	const decimalPart = parts.length > 1 ? parts[1] : ''

	let formattedInteger

	if (integerPart.length >= 4) {
		formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	} else {
		formattedInteger = integerPart
	}

	if (!from || !to) {
		return formattedInteger + (decimalPart ? '.' + decimalPart : '') + ' ₽'
	}

	if (from === currentAccount) {
		return `- ${formattedInteger + (decimalPart ? '.' + decimalPart : '')} ₽`
	} else {
		return `+ ${formattedInteger + (decimalPart ? '.' + decimalPart : '')} ₽`
	}
}

/// Нормализация даты
export function normalizeDataDate(number) {
	let result

	const colonIndex = number.indexOf(':')
	if (colonIndex !== -1) {
		result = parseFloat(number.substring(0, colonIndex))
	} else {
		result = number
	}

	result = `${new Date(number).getDate()} ${getMonthName(
		new Date(number).getMonth()
	)} ${new Date(number).getFullYear()}`

	return result
}

/// Получение названия месяца
export function getMonthName(monthNumber) {
	if (monthNumber < 0 || monthNumber > 11) {
		return 'Некорректный номер месяца' // Обработка некорректного ввода
	}

	const monthNames = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	]

	return monthNames[monthNumber]
}

/// Создание попапа
export function createPopup(data) {
	if (data) {
		const div = el('.popup.popup-active', data)
		mount(document.body, div)
	}
}

/// Удаление попапа
export function removePopup() {
	const popup = document.querySelector('.popup')
	if (popup) {
		popup.innerHTML = ''
		popup.remove()
	}
}

/// Функция движения попапа
export function movePopup(e) {
	const popup = document.querySelector('.popup')
	if (popup && popup.classList.contains('popup-active')) {
		popup.style.left = e.x + 10 + 'px'
		popup.style.top = e.y + 10 + 'px'
	}
}

/// Создание графиков баланса
export function createChart(
	root,
	transactions,
	paddingLeft = 35,
	paddingRight = 35,
	compare
) {
	if (!root || !(root instanceof HTMLCanvasElement)) {
		console.error('Invalid canvas element:', root)
		return null
	}

	Chart.defaults.backgroundColor = '#ffffff'

	const accountNumber = document
		.querySelector('.detail__secondHeader-h3')
		.innerHTML.replace(/[№\s-]/g, '')

	const chartData = {
		labels: transactions.map(item => normalizeDataDate(item.date)),
		datasets: [
			{
				data: transactions.map(item => item.amount),
				backgroundColor: '#116acc',
				borderWidth: 0,
				borderRadius: 5,
				barThickness: 50,
			},
		],
	}

	const compareData = {
		labels: transactions.map(item => normalizeDataDate(item.date)),
		datasets: [
			{
				data: transactions.map(item =>
					item.from === accountNumber ? item.amount : null
				),
				backgroundColor: '#fd4e5d',
				borderWidth: 0,
				borderRadius: 5,
				barThickness: 50,
			},
			{
				data: transactions.map(item =>
					item.from !== accountNumber ? item.amount : null
				),
				backgroundColor: '#76ca66',
				borderWidth: 0,
				borderRadius: 5,
				barThickness: 50,
			},
		],
	}

	const chartConfig = {
		type: 'bar',
		data: chartData,
		options: {
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				x: {
					stacked: true,
					display: false,
					grid: {
						display: false,
					},
				},
				y: {
					stacked: true,
					display: false,
					grid: {
						display: false,
					},
					beginAtZero: true,
				},
			},
			layout: {
				padding: {
					left: paddingLeft,
					right: paddingRight,
				},
			},
		},
	}

	const stackedConfig = {
		type: 'bar',
		data: compareData,
		options: {
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				x: {
					stacked: true,
					display: false,
					grid: {
						display: false,
					},
				},
				y: {
					stacked: true,
					display: false,
					grid: {
						display: false,
					},
					beginAtZero: true,
				},
			},
			layout: {
				padding: {
					left: paddingLeft,
					right: paddingRight,
				},
			},
		},
	}

	if (compare) {
		return new Chart(root, stackedConfig)
	} else {
		return new Chart(root, chartConfig)
	}
}

/// Сортировка страницы со счетами по балансу
export function sortAccounts(name, data) {
	if (name !== 'Сортировка') {
		if (name === 'По балансу') return data.sort((a, b) => b.balance - a.balance)
		if (name === 'По номеру') return data.sort((a, b) => b.account - a.account)

		if (name === 'По последней транзакции') {
			return data.sort((a, b) => {
				if (!a.transactions.length && !b.transactions.length) return 0
				if (!a.transactions.length) return 1
				if (!b.transactions.length) return -1
				return (
					new Date(b.transactions[0].date) - new Date(a.transactions[0].date)
				)
			})
		}
	} else {
		return data
	}
}

/// Создание успешного уведомления
export function createSnackBar(text, type) {
	const closeSvg = svg(
		'svg.closeSvg',
		{
			width: 24,
			height: 24,
			viewBox: '0 0 24 24',
			fill: 'none',
			xmlns: 'http://www.w3.org/2000/svg',
			onclick: () => {
				snackBar.remove()
			},
		},
		[
			svg('defs', [
				svg('clipPath', { id: 'closeIconClip' }, [
					svg('rect', {
						width: 23,
						height: 23,
						transform: 'translate(0.5 0.5)',
						fill: 'white',
						'fill-opacity': 0,
						rx: 0,
					}),
				]),
			]),
			svg(
				'g',
				{
					'clip-path': 'url(#closeIconClip)',
				},
				[
					svg('path.main', {
						d: 'M17.59 5L12 10.58L6.4 5L5 6.41L10.59 12L5 17.58L6.4 19L12 13.41L17.59 19L19 17.58L13.41 12L19 6.41L17.59 5Z',
						fill: '',
						'fill-opacity': 1,
						'fill-rule': 'nonzero',
					}),
				]
			),
		]
	)

	let snackBar = null
	const path = closeSvg.querySelector('.main')

	if (type === 'success') {
		path.classList.add('success-wrapper')
		snackBar = el('.bar-wrapper.success-wrapper', text, closeSvg)
	} else if (type === 'decline') {
		path.classList.add('decline-wrapper')
		snackBar = el('.bar-wrapper.decline-wrapper', text, closeSvg)
	} else if (type === 'warning') {
		path.classList.add('warning-wrapper')
		snackBar = el('.bar-wrapper.warning-wrapper', text, closeSvg)
	} else if (type === 'info') {
		path.classList.add('info-wrapper')
		snackBar = el('.bar-wrapper.info-wrapper', text, closeSvg)
	}

	return snackBar
}

/// Функция разворота массива
export function reverseArrayWithIndex(arr) {
	const reversedArray = []
	for (let i = arr.length - 1; i >= 0; i--) {
		reversedArray.push(arr[i])
	}
	return reversedArray
}

/// Функция очистки значения от лишних символов
export function clearData(data) {
	return data.replace(/[₽+\s-]/g, '')
}

/// Функция, создающая массив транзакций по месяцам
export function groupTransactionsByMonth(transactions) {
	const result = []
	const processedKeys = [] // Массив для отслеживания обработанных месяцев и годов.

	for (let i = 0; i < transactions.length; i++) {
		const currentMonth = new Date(transactions[i].date).getMonth()
		const currentYear = new Date(transactions[i].date).getFullYear()
		const key = `${currentYear}-${currentMonth}` // Уникальный ключ.

		if (!processedKeys.includes(key)) {
			processedKeys.push(key)
			result.push(
				transactions.filter(item => {
					const itemMonth = new Date(item.date).getMonth()
					const itemYear = new Date(item.date).getFullYear()
					return itemMonth === currentMonth && itemYear === currentYear
				})
			)
		}
	}
}

/// Функция, возвращающая список валют для перевода
export function getCurrencyForTransactionList(myCurrency, isTo) {
	class Li {
		constructor() {
			this.el = el('li.changeCurrency.currency-transaction-li', {
				dataset: {
					target: isTo ? 'currency-code-li-to' : 'currency-code-li',
				},
			})
		}
		update(data) {
			this.el.innerHTML = ''
			this.el.innerHTML = data.code
		}
	}

	const ulEl = el('ul.changeCurrency.currency-transaction-ul', {
		dataset: {
			target: 'currency-ul',
		},
	})

	const ul = list(ulEl, Li)

	ul.update(myCurrency)

	return ul.el
}
