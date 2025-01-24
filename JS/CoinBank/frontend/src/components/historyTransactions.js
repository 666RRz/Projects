// Внешние зависимости
import { el, list } from 'redom'

// Утилиты
import {
	normalizeDataBalance,
	normalizeDataDate,
	normalizeDataAccount,
	createPopup,
	removePopup,
	movePopup,
} from './variables-functions/additionalFunctions'

// Стили
import '../assets/scss/historyTransactions.scss'

export default function createHistoryTable(transactions, currentAccount) {
	/// Перевернутый массив

	const reversedTransactions = [...transactions].reverse()

	/// Заголовок таблицы истории
	const tableHead = el('div.history__table', [
		el('div.history__table-thead', [
			el('div.history__table-tr#thead', [
				el('div.history__table-th', 'Счет отправителя'),
				el('div.history__table-th', 'Счет получателя'),
				el('div.history__table-th', 'Сумма'),
				el('div.history__table-th', 'Дата'),
			]),
		]),
	])

	/// Список строк таблицы истории
	class Li {
		constructor() {
			this.el = el('li.history__table-tr-wrapper')
		}

		update(data) {
			this.el.innerHTML = ''
			let historyTable = null
			if (data.length !== 0) {
				historyTable = el('div.history__table-tr.history__table-data', [
					el('div.history__table-td', normalizeDataAccount(data.from), {
						onmouseover: () => {
							createPopup(data.from)
						},
						onmouseout: () => {
							removePopup()
						},
						onmousemove: e => {
							movePopup(e)
						},
					}),
					el('div.history__table-td', normalizeDataAccount(data.to), {
						onmouseover: () => {
							createPopup(data.to)
						},
						onmouseout: () => {
							removePopup()
						},
						onmousemove: e => {
							movePopup(e)
						},
					}),
					middleware(
						el(
							'div.history__table-td',
							data.amount
								? normalizeDataBalance(
										data.amount,
										data.from,
										data.to,
										currentAccount
								  )
								: 0
						)
					),
					el('div.history__table-td', normalizeDataDate(data.date)),
				])
			} else {
				historyTable = el('div.history__table-tr.history__table-data', [
					el('div.history__table-td#from', '0'),
					el('div.history__table-td#to', '0'),
					el('div.history__table-td#amount', '0'),
					el('div.history__table-td#date', '0'),
				])
			}
			this.el.appendChild(historyTable)
		}
	}

	function middleware(el) {
		el.textContent.includes('-')
			? el.classList.add('negativeTransaction')
			: el.classList.add('positiveTransaction')
		return el
	}

	/// Список строк таблицы истории
	const ul = list('ul.history__table-tbody#tbody', Li)

	/// Основной компонент таблицы истории
	const history = el('.history', [
		el('h3.history__h3.select-img-down', 'История переводов', {
			onclick: () => {
				document
					.querySelector('.history__h3')
					.classList.toggle('select-img-down')
				document.querySelector('.history__wrapper').classList.toggle('show')
			},
		}),
		el('.history__wrapper', [tableHead, ul]),
	])

	/// Обновление данных транзакций
	ul.update(reversedTransactions)

	return history
}
