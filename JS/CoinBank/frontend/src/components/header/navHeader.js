/// Создание навигации в хедере
import {el} from 'redom'
import {router} from "../../main";

export  default function createNavHeader() {
    const nav = el(
        'nav.header__nav',
        el('ul.header__nav-ul.nav__ul.ul', [
            el(
                'li.nav__ul-list',
                el('a.nav__list-link#atm', 'Банкоматы', {
                    href: `/atm`,
                    onclick(event) {
                        event.preventDefault()
                        router.navigate(event.target.getAttribute('href'))
                    },
                })
            ),
            el(
                'li.nav__ul-list',
                el('a.nav__list-link#accounts', 'Счета', {
                    href: `/accounts`,
                    onclick(event) {
                        event.preventDefault()
                        router.navigate(event.target.getAttribute('href'))
                    },
                })
            ),
            el(
                'li.nav__ul-list',
                el('a.nav__list-link#currency', 'Валюта', {
                    href: `/currency`,
                    onclick(event) {
                        event.preventDefault()
                        router.navigate(event.target.getAttribute('href'))
                    },
                })
            ),
            el(
                'li.nav__ul-list',
                el('a.nav__list-link#exit', 'Выйти', {
                    href: `/`,
                })
            ),
        ])
    )
    return nav
}