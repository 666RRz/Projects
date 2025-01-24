// Внешние зависимости
import { el, list } from 'redom'
import { router } from '../main'

// Переменные
import { buttonPlus } from '../components/variables-functions/variables'

// Утилиты
import {
	normalizeDataBalance,
	normalizeDataDate,
	sortAccounts,
} from '../components/variables-functions/additionalFunctions'

// Запросы к серверу
import { createNewAccount } from '../components/variables-functions/serverRequests'

// Стили
import '../assets/scss/accounts.scss'

export default function createAccountsPage(massive) {
	// Создание опций сортировки
	const selectOptions = el('div.accounts__header-left-select-options', [
		el('div#sort-number.select-option', 'По номеру', {
			dataset: { target: '.accounts__header-left-select' },
		}),
		el('div#sort-balance.select-option', 'По балансу', {
			dataset: { target: '.accounts__header-left-select' },
		}),
		el('div#sort-lastTransaction.select-option', 'По последней транзакции', {
			dataset: { target: '.accounts__header-left-select' },
		}),
	])

	// Обработчик клика по опциям сортировки
	selectOptions.addEventListener('click', e => {
		if (e.target.dataset.target !== '.accounts__header-left-select') {
			return
		}
		select.textContent = e.target.textContent
		select.classList.remove('accounts__header-left-select-back')
		ul.update(sortAccounts(select.textContent, massive))
	})

	// Создание селекта сортировки
	const select = el('div.accounts__header-left-select', 'Сортировка', {
		onclick: () => {
			select.classList.toggle('accounts__header-left-select-back')
		},
		dataset: {
			target: '.accounts__header-left-select',
		},
	})

	// Класс для создания элемента списка счетов
	class Li {
		constructor() {
			this.el = el('li', { class: 'accounts__body-item' })
		}

		// Метод обновления данных счета
		update(data) {
			this.el.innerHTML = ''
			const accountDiv = el('div.account__body-account.account', [
				el('h3.account__title', data.account),
				el('h4.account__balance', [normalizeDataBalance(data.balance)]),
				el('.account__options', [
					el('div.account__options-info', [
						el(
							'span.account__options-span',
							`Последняя транзакция:  `,
							el('br'),
							el(
								'span.account__options-info-date',
								data.transactions[0]
									? normalizeDataDate(data.transactions[0].date)
									: 'Нет транзакций'
							)
						),
					]),
					el('button.account__options-info-button', 'Открыть', {
						onclick: async event => {
							event.preventDefault()
							router.navigate(`/detail/${data.account}`)
						},
					}),
				]),
			])

			this.el.appendChild(accountDiv)
		}
	}

	// Обработчик кликов для закрытия селекта сортировки
	window.addEventListener('click', e => {
		if (e.target.dataset.target === '.accounts__header-left-select') {
			selectOptions.classList.toggle(
				'accounts__header-left-select-options-active'
			)
		}

		if (
			e.target.dataset.target === '.accounts__header-left-select-options' ||
			e.target.dataset.target === '.accounts__header-left-select'
		) {
			return
		}

		selectOptions.classList.remove(
			'accounts__header-left-select-options-active'
		)
		select.classList.remove('accounts__header-left-select-back')
	})

	// Создание списка счетов
	const ul = list('ul.accounts__body.ul', Li)

	// Формирование структуры страницы счетов
	const accountsPage = el('div.accounts.container', [
		el('.accounts__header', [
			el('.accounts__header-left', [
				el('h2.accounts__header-left-title', 'Ваши счета'),
				select,
				selectOptions,
			]),
			el('button.accounts__header-button', 'Создать новый счет', buttonPlus, {
				onclick: async event => {
					event.preventDefault()
					createNewAccount(window.sessionStorage.getItem('token'))
				},
			}),
		]),
		ul,
	])

	// Обновление списка счетов начальными данными
	ul.update(sortAccounts(select.textContent, massive))

	return accountsPage
}
