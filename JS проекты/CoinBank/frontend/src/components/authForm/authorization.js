import { errorDiv, errorP, successSvg } from '../variables-functions/variables'
import { changeTextContent } from '../variables-functions/additionalFunctions'
import {
	getStartData,
	getAccountsData,
} from '../variables-functions/serverRequests'
import { router } from '../../main'

/// Процесс авторизации
export async function authorization(loginInput, passwordInput) {
	const login = loginInput.value.trim()
	const password = passwordInput.value.trim()

	return new Promise(async (resolve, reject) => {
		const res = await getStartData(login, password)

		const data = await res.json()

		if (data.error) {
			if (data.error === 'No such user') {
				errorAnim(
					changeTextContent(errorP, 'Пользователь с таким именем не найден'),
					loginInput,
					passwordInput
				)
			} else {
				errorAnim(
					changeTextContent(errorP, 'Данные для входа не верны'),
					loginInput,
					passwordInput
				)
			}
		} else {
			getAccount(data.payload.token, login)
				.then(loginAcc => {
					resolve(loginAcc.payload)
					window.sessionStorage.setItem('token', data.payload.token)
				})
				.catch(err => reject(err))
		}
	})
}
/// Процесс получения данных по токену
export async function getAccount(token) {
	const res = await getAccountsData(token)

	if (res.error) {
		throw new Error('Ошибка на стороне сервера')
	} else {
		router.navigate(`/accounts`)
	}
	return res
}

/// Анимация результата авторизации
export function errorAnim(div, login, password, isSuccess) {
	const ANIMATION_DELAY = 3000
	const REMOVE_DELAY = 3000

	const addInputClass = className => {
		login.classList.add(className)
		password.classList.add(className)
	}

	const removeInputClass = className => {
		login.classList.remove(className)
		password.classList.remove(className)
	}

	const addErrorDiv = success => {
		success
			? errorDiv.classList.add('error-div-success')
			: errorDiv.classList.add('error__div-error')
	}

	const removeErrorDiv = success => {
		success
			? errorDiv.classList.remove('error-div-success')
			: errorDiv.classList.remove('error__div-error')
	}

	if (isSuccess) {
		addInputClass('input-success')
		addErrorDiv(true)
		setTimeout(() => {
			errorDiv.classList.add('error-miss')
			removeInputClass('input-success')
			removeErrorDiv(true)
		}, ANIMATION_DELAY)

		setTimeout(() => {
			errorDiv.remove()
		}, REMOVE_DELAY)
	} else {
		addInputClass('input-error')
		addErrorDiv()

		setTimeout(() => {
			removeErrorDiv()
		}, ANIMATION_DELAY)

		setTimeout(() => {
			password.value = ''
			removeInputClass('input-error')
			removeErrorDiv()
		}, REMOVE_DELAY)
	}
}
