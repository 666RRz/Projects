// Внешние зависимости
import { el } from 'redom'
import { router } from '../main'

// Утилиты
import { normalizeDataBalance } from './variables-functions/additionalFunctions'

// Стили
import '../assets/scss/balanceChart.scss'

export default function createBalanceChart(transactions, accountNumber) {
	let maxBalanceP = null

	const negativeTransactions = transactions.map(item =>
		item.from === accountNumber ? item : null
	)

	/// Заголовок графика баланса
	const balanceH3 = el('h3.balance-chart__title', 'Динамика баланса')

	/// График баланса
	const balanceChart = el('canvas.balance-chart__canvas')

	/// Компоненты баланса
	const balanceTable = el('div.balance-chart__table', balanceChart)

	const hasTransactions = transactions.length > 0
	const maxBalancePeriod =
		hasTransactions && getMaxBalancePeriod(transactions, negativeTransactions)

	const maxNeg = el(
		'p.balance-chart__minNegative-value',
		maxBalancePeriod.maxNegBalance
			? normalizeDataBalance(maxBalancePeriod.maxNegBalance.amount)
			: null
	)

	const createBalanceContent = () => {
		if (!hasTransactions) {
			maxBalanceP = el('div.balance-chart__empty', `Нет данных`)
			return [balanceTable, maxBalanceP]
		}

		maxBalanceP = el(
			'div.balance-chart__max-value',
			el(
				'p.balance-chart__max-value-p',
				maxBalancePeriod.maxBalance
					? normalizeDataBalance(maxBalancePeriod.maxBalance.amount)
					: '0'
			),
			el('p.balance-chart__min-value', '0')
		)

		return [balanceTable, maxBalanceP]
	}

	const balanceWrapper = el('div.balance-chart__wrapper', [
		createBalanceContent(),
	])

	const wrapper = getPeriodMonth(transactions)

	const balanceComponent = el(
		'.balance-chart.componentsBackground',
		balanceH3,
		balanceWrapper,
		hasTransactions ? wrapper : null,
		{
			onclick: () => {
				router.navigate(`/statistic/${accountNumber}`)
			},
		}
	)

	/// Создание таблицы с месяцами

	function getPeriodMonth(transactions) {
		if (transactions.length === 0) return null

		const month = getMonthNominative(new Date(transactions[0].date).getMonth())

		const monthsToShow = window.location.pathname.includes('/detail/') ? 6 : 12

		const wrapper = el('div.balance-chart__months-wrapper')

		for (let i = 0; i < monthsToShow; i++) {
			const p = el('p.balance-chart__period-month', month)
			wrapper.append(p)
		}

		return wrapper
	}

	/// Получение периода с максимальным балансом
	function getMaxBalancePeriod(pos, neg) {
		if (pos.length === 0) {
			return null
		}
		let maxBalance = null
		let maxNegBalance = null

		if (pos.length >= 6) {
			maxBalance = pos.sort((a, b) => a.amount - b.amount)
			const length = maxBalance.length
			maxNegBalance = []

			neg.map(item => {
				if (item !== null) {
					maxNegBalance.push(item)
				}
			})

			maxNegBalance.sort((a, b) => b.amount - a.amount)

			return {
				maxBalance: maxBalance[length - 1],
				maxNegBalance: maxNegBalance[0],
			}
		} else {
			maxBalance = pos.sort((a, b) => b.amount - a.amount)
			return {
				maxBalance: maxBalance[0],
			}
		}
	}

	/// Получение названия месяца в ИП
	function getMonthNominative(monthNumber) {
		if (monthNumber < 0 || monthNumber > 11) {
			return 'Некорректный номер месяца' // Обработка некорректного ввода
		}

		const monthNames = [
			'янв',
			'фев',
			'мар',
			'апр',
			'май',
			'июн',
			'июл',
			'авг',
			'сен',
			'окт',
			'ноя',
			'дек',
		]

		return monthNames[monthNumber]
	}

	return {
		balanceComponent,
		balanceH3,
		balanceChart,
		balanceWrapper,
		balanceTable,
		maxBalanceP,
		wrapper,
		maxNeg,
		getPeriodMonth,
		getMaxBalancePeriod,
		getMonthNominative,
	}
}
