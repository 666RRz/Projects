// Внешние зависимости
import { el } from 'redom'
import { router } from '../main'

// Компоненты
import createDetailHeader from '../components/header/accountHeader'
import createBalanceChart from '../components/balanceChart'
import createHistoryTable from '../components/historyTransactions'
import createComparisonChart from '../components/comparisonTransactions'

// Утилиты
import {
	createChart,
	reverseArrayWithIndex,
} from '../components/variables-functions/additionalFunctions'

// Стили
import '../assets/scss/statistics.scss'

/// Header страницы статистики
const createStatisticHeader = (accountNumber, balance) => {
	const { detailHeader, secondHeader, h2, backButton } = createDetailHeader(
		accountNumber,
		balance
	)

	h2.textContent = 'История Баланса'
	backButton.onclick = () => {
		router.navigate(`/detail/${accountNumber}`)
	}

	return { detailHeader, secondHeader, h2, backButton }
}

/// Компонент динамики баланса
export function createBalanceDynamics(transactions, accountNumber) {
	const balanceDynamics = createBalanceChart(transactions, accountNumber)

	const balanceTable = balanceDynamics.balanceTable
	const balanceComponent = balanceDynamics.balanceComponent
	const balanceWrapper = balanceDynamics.balanceWrapper
	const balanceMoths = balanceDynamics.wrapper
	const balanceChart = balanceDynamics.balanceChart
	const balanceTitle = balanceDynamics.balanceH3
	const maxBalanceP = balanceDynamics.maxBalanceP
	const maxNeg = balanceDynamics.maxNeg
	const getPeriodMonth = balanceDynamics.getPeriodMonth

	if (balanceMoths) {
		balanceMoths.classList.add('statistics__balance-months')
	}

	balanceComponent.style.padding = '25px, 100px'
	balanceComponent.classList.add('statistics__balance-chart')

	balanceTable.style.width = '1000px'
	balanceTable.classList.add('statistics__balance-table')

	balanceWrapper.classList.add('statistics__balance-wrapper')

	return {
		balanceDynamics,
		balanceTitle,
		balanceTable,
		balanceComponent,
		balanceWrapper,
		balanceMoths,
		balanceChart,
		maxBalanceP,
		maxNeg,
		getPeriodMonth,
	}
}

/// Переменная для хранения состояния графика
let currentChart = null

/// основная функция построения страницы
export default function createStatisticsPage(
	accountNumber,
	balance,
	transactions
) {
	const lastTransactions = reverseArrayWithIndex(transactions)

	const header = createStatisticHeader(accountNumber, balance)
	const balanceDynamics = createBalanceDynamics(
		lastTransactions.slice(0, 12),
		accountNumber
	)
	const history = createHistoryTable(transactions, accountNumber)
	const comparisonChart = createComparisonChart(transactions, accountNumber)

	currentChart = createChart(
		balanceDynamics.balanceChart,
		lastTransactions.slice(0, 12),
		46,
		46
	)

	return el('div.container', [
		header.detailHeader,
		header.secondHeader,
		balanceDynamics.balanceComponent,
		comparisonChart,
		history,
	])
}
