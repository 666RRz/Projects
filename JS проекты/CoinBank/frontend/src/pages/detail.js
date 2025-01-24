// Основные импорты
import { el, mount } from 'redom'

// Переменные
import { emailSvg } from '../components/variables-functions/variables'

// Запросы к серверу
import {
	getAccountsData,
	translateMoney,
} from '../components/variables-functions/serverRequests'

// Вспомогательные функции
import {
	createChart,
	reverseArrayWithIndex,
} from '../components/variables-functions/additionalFunctions'

// Компоненты
import createDetailHeader from '../components/header/accountHeader'
import createBalanceChart from '../components/balanceChart'
import createHistoryTable from '../components/historyTransactions'

// Стили
import '../assets/scss/detail.scss'
import '../assets/scss/snackBar.scss'

// Создание основного контейнера и шапки
const container = el('.container.detail')
/// Текущий график баланса
let currentChart = null

// Компонент формы перевода денег
function createTransferForm(balance, transactions) {
	/// Инпут для ввода счета получателя
	const inputAccount = el('input.detail__main-money-input#accountInput', {
		placeholder: 'placeholder',
		type: 'number',
		onclick: async () => {
			let accounts = await getAccountsData(
				window.sessionStorage.getItem('token')
			)
			accounts = accounts.payload
			createSelectionOfAccounts(inputHolder, accounts)
		},
		oninput: async () => {
			if (inputAccount.value !== '') {
				let accounts = await getAccountsData(
					window.sessionStorage.getItem('token')
				)
				accounts = accounts.payload

				let filtred = accounts.filter(item =>
					item.account.includes(inputAccount.value)
				)

				if (filtred.length === 0) {
					createSelectionOfAccounts(inputHolder, [
						{
							account: 'Нет нужных счетов',
						},
					])
				} else {
					createSelectionOfAccounts(inputHolder, filtred)
				}
			}
		},
	})
	/// Контейнер для инпута
	const inputHolder = el('.detail__main-money-input-holder', [inputAccount])

	/// Инпут вместе с лейблом
	const transferInputAccount = el('.detail__main-money-input-wrapper', [
		el('span.detail__main-money-input-label', 'Номер счета получателя'),
		inputHolder,
	])

	/// Выбор суммы перевода
	const transferInputSum = el('.detail__main-money-input-wrapper', [
		el('span.detail__main-money-input-label', 'Сумма перевода'),
		el('input.detail__main-money-input', {
			placeholder: 'placeholder',
			onkeypress: e => {
				if (!/[0-9]/.test(e.key)) {
					e.preventDefault()
				}
			},
		}),
	])

	/// Кнопка отправки перевода
	const transferButton = el(
		'button.detail__main-money-button',
		'Отправить',
		{
			onclick: () => {
				const currentAccount = document
					.querySelector('.detail__secondHeader-h3')
					.textContent.slice(2)
				const to = inputAccount.value.trim()
				const amount = transferInputSum
					.querySelector('.detail__main-money-input')
					.value.trim()

				translateMoney(
					currentAccount,
					to,
					amount,
					balance,
					transactions,
					window.sessionStorage.getItem('token')
				)
			},
		},
		emailSvg
	)

	/// Форма перевода
	const transferForm = el(
		'form.detail__main-money-form',
		transferInputAccount,
		transferInputSum,
		transferButton,
		{
			method: 'post',
			onsubmit: e => {
				e.preventDefault()
			},
		}
	)

	/// Выбор счета получателя
	async function createSelectionOfAccounts(wrapper, data = []) {
		const accounts = data
		const origin = wrapper

		class Li {
			constructor(data) {
				this.li = el('ul.detail__main-money-select-wrapper', {
					dataset: {
						target: '.detail__main-money-select',
					},
				})
			}

			update(data) {
				this.li.innerHTML = ''
				if (data === 0) {
					const emptyLi = el('li.detail__main-money-select-li', 'Нет данных')
					mount(this.li, emptyLi)
				} else {
					data.map(item => {
						const li = el('li.detail__main-money-select-li', item.account, {
							onclick: e => {
								const input = origin.querySelector('.detail__main-money-input')
								input.value = item.account
								this.li.remove()
							},
						})
						mount(this.li, li)
					})
				}
			}
		}

		const existingList = origin.querySelector(
			'.detail__main-money-select-wrapper'
		)
		if (existingList) {
			existingList.remove()
		}

		const liContainer = new Li()
		liContainer.update(accounts)
		mount(origin, liContainer.li)

		// Обработчик клика вне списка
		const handleClickOutside = e => {
			if (!origin.contains(e.target)) {
				liContainer.li.remove()
				document.removeEventListener('click', handleClickOutside)
			}
		}

		// Добавляем обработчик с небольшой задержкой, чтобы не сработал сразу
		setTimeout(() => {
			document.addEventListener('click', handleClickOutside)
		}, 0)
	}

	/// Основной компонент перевода
	const moneyTransfer = el(
		'.detail__main-money',
		el('h3.detail__main-money-h3', 'Новый перевод'),
		transferForm
	)
	return moneyTransfer
}

/// Очистка страницы
async function cleanupPreviousState() {
	container.innerHTML = ''
	if (currentChart) {
		currentChart.destroy()
		currentChart = null
	}
}

// Основная функция создания страницы
export default function createDetailPage(
	accountNumber,
	balance,
	transactions = []
) {
	const lastTransactions = reverseArrayWithIndex(transactions)
	// Инициализация шапки страницы

	const { detailHeader, secondHeader } = createDetailHeader(
		accountNumber,
		balance
	)
	/// Инициализация формы перевода
	const moneyTransfer = createTransferForm(balance, transactions)
	/// Инициализация графика баланса
	const balanceDynamics = createBalanceChart(
		lastTransactions.slice(0, 6),
		accountNumber
	)

	/// Инициализация таблицы истории

	const history = createHistoryTable(transactions, accountNumber)

	// Основная логика
	cleanupPreviousState().then(() => {
		const mainPart = el('.detail__main', [
			moneyTransfer,
			balanceDynamics.balanceComponent,
		])
		// Сборка страницы
		container.append(detailHeader, secondHeader, mainPart, history)

		currentChart = createChart(
			balanceDynamics.balanceChart,
			lastTransactions.slice(0, 6).reverse()
		)
	})

	return container
}
