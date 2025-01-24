;(() => {
	function addLoadLink() {
		const Buttons = document.querySelectorAll('.header__menu-li-link')
		const menuButtons = Array.from(Buttons)
		window.addEventListener('load', () => {
			if (window.location.pathname === '/index.html') {
				menuButtons[0].classList.add('header__menu-li-link-active')
			} else if (window.location.pathname === '/katalog.html') {
				menuButtons[1].classList.add('header__menu-li-link-active')
				// } else if (window.location.pathname === '/for-her.html') {
				// 	menuButtons[2].classList.add('header__menu-li-link-active')
				// } else if (window.location.pathname === '/korporativ.html') {
				// 	menuButtons[3].classList.add('header__menu-li-link-active')
				// } else if (window.location.pathname === '/for-him.html') {
				// 	menuButtons[4].classList.add('header__menu-li-link-active')
			} else if (window.location.pathname === '/contacts.html') {
				menuButtons[2].classList.add('header__menu-li-link-active')
			} else if (window.location.pathname === '/about-us.html') {
				menuButtons[3].classList.add('header__menu-li-link-active')
			}
		})
	}

	addLoadLink()
})()
