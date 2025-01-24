import {el} from 'redom'
import {authorization} from "./authorization";
import {errorDiv} from "../variables-functions/variables";

/// Создание формы авторизации
export default function createAuthorizationForm() {
    const loginInput = el('input.form__login-input.input', {
        placeholder: 'Логин',
    })
    const passwordInput = el('input.form__password-input.input', {
        placeholder: 'Пароль',
        type: 'password',
    })

    const form = el(
        'div.form__wrapper',
        {
            style: {
                backgroundColor: '#F3F4F6',
                borderRadius: '50px',
                padding: '50px 85px 50px 40px',
            },
        },
        [
            el('h2.form__wrapper-h2', 'Вход в аккаунт'),
            el(
                'form.form',
                {
                    method: 'Post',
                    onsubmit: async e => {
                        e.preventDefault()
                        await authorization(loginInput, passwordInput)
                    },
                },
                [
                    el('div.form__login-div.div', [
                        el('span.form__login-span.span', 'Логин', errorDiv),
                        loginInput,
                    ]),
                    el('div.form__password-div.div', [
                        el('span.form__password-span.span', 'Пароль'),
                        passwordInput,
                    ]),
                    el('button.form__submit-btn#enterButton', 'Войти'),
                ]
            ),
        ]
    )

    return { form, loginInput, passwordInput }
}