// Основные импорты
import { el } from 'redom'
import { router } from '../../main'

// Вспомогательные функции
import { normalizeDataBalance } from '../variables-functions/additionalFunctions'

// Переменные
const { leftArrow } = await import('../variables-functions/variables')

// Стили
import '../../assets/scss/detail.scss'

export default function createDetailHeader(accountNumber, balance) {
	/// Заголовок шапки

	const h2 = el('h2.detail__header-h2', 'Просмотр счета')
	const backButton = el(
		'a.detail__header-button',
		'Вернуться назад',
		leftArrow,
		{
			onclick: e => {
				e.preventDefault()
				router.navigate('/accounts')
			},
		}
	)
	const detailHeader = el('.detail__header#headerAccount', [h2, backButton])

	const h3 = el('h3.detail__secondHeader-h3', `№ ${accountNumber}`)
	const balanceSpan = el('span.detail__secondHeader-balance-span', 'Баланс:')
	const balanceValue = el(
		'p.detail__secondHeader-balance-p',
		normalizeDataBalance(balance)
	)
	const balanceDiv = el('div.detail__secondHeader-balance', [
		balanceSpan,
		balanceValue,
	])
	const secondHeader = el('.detail__secondHeader#secondHeaderAccount', [
		h3,
		balanceDiv,
	])

	return {
		detailHeader: detailHeader,
		h2: h2,
		backButton: backButton,
		secondHeader: secondHeader,
		h3: h3,
		balanceDiv: balanceDiv,
	}
}
