/// Импорты css модулей
import '../src/assets/css/autorizationForm.min.css'
import '../src/assets/css/normalize-min.css'
import '../src/assets/css/reset.css'

/// Импорты компонентов страниц
import createHeader from './components/header/header'
import createAccountsPage from './pages/accounts'
import createAuthorizationForm from './components/authForm/authform'

/// Импорт роутера
import getRouter from './components/routing'

/// Импорты авторизации
import { authorization } from './components/authForm/authorization'
import {
	getAccountData,
	getAllCurrency,
} from './components/variables-functions/serverRequests'

/// Импорты готовых страниц
import createDetailPage from './pages/detail'
import createAtmPage from './pages/atms'
import createStatisticsPage from './pages/statistics'
import createCurrencyPage from './pages/currency'

/// Импорт функций - конструкторов страниц
import {
	createNewPage,
	removeCurrentPage,
} from './components/variables-functions/additionalFunctions'

import { placeHolder } from './components/variables-functions/placeHolder'

/// Импорты переменных
import {
	accountButton,
	atmButton,
	currencyButton,
	header,
	navHeader,
	root,
} from './components/variables-functions/variables'

export let formElements /// - Элементы формы
export const router = getRouter() /// Обьявление роутера
const map = document.getElementById('map') /// DOM элемент карты

/// РОУТИНГ

router.on('/', () => {
	createNewPage(root, placeHolder, true)
	formElements = createAuthorizationForm()
	createNewPage(header, createHeader())
	createNewPage(root, formElements.form, true)
	window.sessionStorage.removeItem('token')
})

router.on('/atm', () => {
	createNewPage(root, placeHolder, true)
	removeCurrentPage()
	atmButton.classList.add('current-page')
	createNewPage(root, createAtmPage(), true)
	map.classList.add('show')
})

router.on('/accounts', async () => {
	createNewPage(root, placeHolder, true)
	map.classList.remove('show')
	removeCurrentPage()
	accountButton.classList.add('current-page')
	header.innerHTML = ''
	createNewPage(header, createHeader(navHeader))

	try {
		const accountData = await authorization(
			formElements.loginInput,
			formElements.passwordInput
		)

		createNewPage(root, createAccountsPage(accountData), true)
	} catch (err) {
		console.log(err)
		console.log('Ошибка авторизации', err)
		window.location.href = '/'
	}
})

router.on('/detail/:id', async match => {
	createNewPage(root, placeHolder, true)
	map.classList.remove('show')
	removeCurrentPage()

	const accountId = match.data.id

	try {
		const token = window.sessionStorage.getItem('token')
		if (!token || !accountId) {
			throw new Error('Отсутствуют необходимые данные для загрузки счета')
		}

		const { error, payload } = await getAccountData(token, accountId)

		if (error) {
			console.error('Ошибка при получении данных счета:', error)
			router.navigate('/accounts')
			return
		}

		const { account, balance, transactions } = payload

		createNewPage(root, createDetailPage(account, balance, transactions), true)
	} catch (error) {
		console.error('Критическая ошибка при загрузке детальной страницы:', error)
		router.navigate('/accounts')
	}
})

router.on('/statistic/:id', async match => {
	map.classList.remove('show')
	removeCurrentPage()
	const accountId = match.data.id
	try {
		const token = window.sessionStorage.getItem('token')
		if (!token || !accountId) {
			throw new Error('Отсутствуют необходимые данные для загрузки счета')
		}
		const { error, payload } = await getAccountData(token, accountId)
		if (error) {
			console.error('Ошибка при получении данных счета:', error)
			router.navigate('/accounts')
			return
		}
		const { account, balance, transactions } = payload

		createNewPage(
			root,
			createStatisticsPage(account, balance, transactions),
			true
		)
	} catch (error) {
		console.error(
			'Критическая ошибка при загрузке детальной статистики:',
			error
		)
		router.navigate('/accounts')
	}
})

router.on('/currency', async () => {
	createNewPage(root, placeHolder, true)
	map.classList.remove('show')
	removeCurrentPage()
	currencyButton.classList.add('current-page')

	const token = window.sessionStorage.getItem('token')
	const myCurrency = await getAllCurrency(token)

	createNewPage(root, createCurrencyPage(myCurrency), true)
})

router.resolve()
