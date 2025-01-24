import { formElements } from '../../main'
import createAccountsPage from '../../pages/accounts'
import { createNewPage } from '../variables-functions/additionalFunctions'
import { root } from '../variables-functions/variables'
import { authorization } from '../authForm/authorization'

import { createSnackBar } from '../variables-functions/additionalFunctions'
import createDetailPage from '../../pages/detail'
import createCurrencyPage from '../../pages/currency'

/// Авторизация
export async function getStartData(login, password) {
	return await fetch(`http://localhost:3000/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			login: login,
			password: password,
		}),
	})
}

/// Получение данных по токену
export async function getAccountsData(token) {
	return await fetch(`http://localhost:3000/accounts`, {
		headers: {
			authorization: `Basic ${token}`,
		},
	}).then(res => res.json())
}

/// Получение детальной информации о счёте
export async function getAccountData(token, accountId) {
	const res = await fetch(`http://localhost:3000/account/${accountId}`, {
		headers: {
			authorization: `Basic ${token}`,
		},
	}).then(res => res.json())

	return res
}

/// Создание нового счёта
export async function createNewAccount(token) {
	const res = await fetch('http://localhost:3000/create-account', {
		method: 'POST',
		headers: {
			authorization: `Basic ${token}`,
		},
	}).then(res => res.json())

	const accountData = await authorization(
		formElements.loginInput,
		formElements.passwordInput
	)

	createNewPage(root, createAccountsPage(accountData), true)

	return res
}

/// Перевод средств
export async function translateMoney(
	from,
	to,
	amount,
	balance,
	transactions,
	token
) {
	const addBar = barName => {
		document.body.append(barName)
		setTimeout(() => {
			barName.remove()
		}, 5000)
	}

	const successBar = createSnackBar('Перевод успешно выполнен', 'success')
	const warningBar = createSnackBar('Пожалуйста введите сумму', 'warning')

	if (amount === '') {
		addBar(warningBar)
		return
	}

	const res = await fetch('http://localhost:3000/transfer-funds', {
		method: 'POST',
		headers: {
			authorization: `Basic ${token}`,
			'Content-type': 'application/json',
		},

		body: JSON.stringify({
			from,
			to,
			amount,
		}),
	}).then(response => response.json())

	const newBalance = res.payload.balance

	if (res.error !== '') {
		let declineBar = null
		if (res.error === 'Overdraft prevented') {
			declineBar = createSnackBar(`Сумма перевода превышает баланс`, 'decline')
		} else if (res.error === 'Invalid account from') {
			declineBar = createSnackBar(`Не верный номер вашего счета`, 'decline')
		} else if (res.error === 'Invalid account to') {
			declineBar = createSnackBar(`Не верный номер счета получателя`, 'decline')
		} else {
			declineBar = createSnackBar(`Не указана сумма перевода`, 'decline')
		}
		addBar(declineBar)
	} else {
		addBar(successBar)
		createNewPage(root, createDetailPage(from, newBalance, transactions), true)
	}

	return res
}

/// Перевод обьекта обьектов в массив обьектов

export function fromObjToArray(data) {
	const currencyArr = []

	for (const key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			const element = data[key]
			currencyArr.push(element)
		}
	}

	return currencyArr
}

/// Получение списка всех и валют и валют пользователя

export async function getAllCurrency(token, all) {
	let url = null

	if (all) {
		url = 'http://localhost:3000/all-currencies'
	} else {
		url = 'http://localhost:3000/currencies'
	}

	const res = await fetch(url, {
		headers: {
			authorization: `Basic ${token}`,
		},
	}).then(result => result.json())

	if (url) {
		const result = fromObjToArray(res.payload)
		return result
	} else {
		return res.payload
	}
}

export async function currencyTransaction(from, to, amount, currency, token) {
	const addBar = barName => {
		document.body.append(barName)
		setTimeout(() => {
			barName.remove()
		}, 5000)
	}

	const successBar = createSnackBar('Обмен успешно выполнен', 'success')
	const warningBar = createSnackBar('Пожалуйста введите сумму', 'warning')

	if (amount === '') {
		addBar(warningBar)
		return
	}

	const res = await fetch('http://localhost:3000/currency-buy', {
		method: 'POST',
		headers: {
			authorization: `Basic ${token}`,
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			from,
			to,
			amount,
		}),
	}).then(response => response.json())

	const newCurrency = fromObjToArray(res.payload)

	if (res.error !== '') {
		let declineBar = null
		if (res.error === 'Unknown currency code') {
			declineBar = createSnackBar('Неверный валютный код', 'decline')
		} else if (res.error === 'Invalid amount') {
			declineBar = createSnackBar('Неверная сумма перевода', 'decline')
		} else if (res.error === 'Not enough currency') {
			declineBar = createSnackBar(
				'Недостаточно средств на счете списания',
				'decline'
			)
		} else if (res.error === 'Overdraft prevented') {
			declineBar = createSnackBar('Сумма обмена превышает баланс', 'decline')
		} else {
			declineBar = createSnackBar('Неизвестная ошибка', 'decline')
		}
		addBar(declineBar)
	} else {
		addBar(successBar)
		createNewPage(root, createCurrencyPage(newCurrency), true)
	}

	return res.payload
}
