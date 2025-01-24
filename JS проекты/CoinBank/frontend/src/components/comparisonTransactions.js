/// Импорты компонентов
import { createBalanceDynamics } from '../pages/statistics'

import {
	createChart,
	reverseArrayWithIndex,
} from './variables-functions/additionalFunctions'

/// Основная функция создания графика сравнения

export default function createComparisonChart(transactions, accountNumber) {
	const lastTransactions = reverseArrayWithIndex(transactions)
	const shortTransactions = lastTransactions.slice(0, 12)

	const {
		balanceComponent: root,
		balanceChart: chart,
		balanceTitle: title,
		maxBalanceP,
		maxNeg,
	} = createBalanceDynamics(
		reverseArrayWithIndex(shortTransactions),
		accountNumber
	)

	const maxBalance = maxBalanceP.children[0]
	if (maxBalance) {
		maxBalance.after(maxNeg)
	}

	chart.id = 'ComparisonChart'
	title.textContent = 'Соотношение входящих исходящих транзакций'

	createChart(chart, shortTransactions, 46, 46, true)

	return root
}
