// Внешние зависимости
import { el } from 'redom'

// Стили
import '../assets/scss/atms.scss'

export default function createAtmPage() {
	const mainDIv = el('.atm__wrapper.container', [
		el('h2.atm__wrapper-h2', 'Карта банкоматов'),
	])

	return mainDIv
}
