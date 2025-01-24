const input = document.getElementById('input')
const button = document.getElementById('button')

class NewClass {
	constructor(name, surname) {
		this.FullName = `Ваше полное имя - ${name} ${surname}`
	}

	map() {
	return 'asldkaskld'
	}

	render() {
	return 'daslkdl'
	}
}

function someValidation(value) {
	value = value.trim().replace(/\s/g, '')
	return value
}

input.addEventListener('focusout', ()=> {
	const value = someValidation(input.value)
	input.value = value
})

function checkClass(className) {
	try {
		const value = eval(className)
		if(typeof value === 'function') {
			return value
		} else {
			return false
	}
} catch(err) {
	return false
}
}

function createOl(el) {
	if(typeof el !== 'function') {
		return;
	}


	const item = el.prototype
	console.log('item', item)
	if(typeof el === null) {
		return
	} else {
		const root = document.querySelector('.render-ol')
		root.classList.remove('none')
		let methodHoler = Object.getOwnPropertyNames(item)
		const descriptorsHoler = []
		const descriptors = Object.getOwnPropertyDescriptors(item)
		for (let descriptorsKey in descriptors) {
			descriptorsHoler.push(typeof descriptors[descriptorsKey].value)
		}


		const ol = document.createElement('ol')
		ol.textContent = item.constructor.name
		for(let i = 0; i < methodHoler.length; i++) {
			const li = document.createElement('li')
			for (let j = 0; j < descriptorsHoler.length; j++) {
				li.textContent = `${methodHoler[i]} - ${descriptorsHoler[j]}`
			}
			li.classList.add('li')
			ol.appendChild(li)
		}


		root.appendChild(ol)



		const next = Object.getPrototypeOf(item)
		try {
			createOl(next.constructor)
		}catch (err) {
			throw new Error('Последний прототип')
		}

	}

}

button.addEventListener('click', () => {
	if(checkClass(input.value)) {
		const classTrap = []
		input.classList.remove('find-class__input-error')
		value = checkClass(input.value)
		classTrap.push(value.prototype.constructor)
    if(document.querySelector('.render-ol').children.length > 1) {
      const div = document.querySelector('.render-ol')
      div.innerHTML = ''
    }
    createOl(value)

	} else {
		input.classList.add('find-class__input-error')
		input.value = ''
		throw new Error('Неверное значеsние класса')
	}
})



