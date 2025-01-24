function zoomPicture() {
	const images = document.querySelectorAll('.katalog__li-img')
	const imagesArr = Array.from(images)
	imagesArr.map(img => {
		const handleClick = () => {
			if (img.classList.contains('img3')) {
				img.style.width = '700px'
				img.classList.toggle('zoom3')
			} else {
				img.classList.toggle('zoom')
			}
		}
		img.addEventListener('click', handleClick)
		document.addEventListener('click', e => {
			if (
				!e.target.classList.contains('zoom') &&
				!e.target.classList.contains('zoom3')
			) {
				imagesArr.forEach(img => {
					img.classList.remove('zoom')
					if (img.classList.contains('zoom3')) {
						img.style.width = '100%'
						img.classList.remove('zoom3')
					}
				})
			}
		})
	})
}
zoomPicture()
