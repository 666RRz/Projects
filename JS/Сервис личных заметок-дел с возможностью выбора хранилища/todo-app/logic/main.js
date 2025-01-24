import changeTheme from '../scripts/changeTheme.js';

export default async function todoApp() {
  let deals = null;
  if (JSON.parse(localStorage.getItem('massiveDeals')) === null || JSON.parse(localStorage.getItem('massiveDeals'))) {
    localStorage.setItem('massiveDeals', JSON.stringify([]));
  }
  let isTouched = true;
  const changeStorage = document.getElementById('aside-button');
  let sortedDeals = JSON.parse(localStorage.getItem('massiveDealsSorted')) || [];
  let daysMassive = [];
  const main = document.getElementById('main');
  const noDeals = document.querySelector('.noDeals');
  const form = document.getElementById('form');

  let divTouch = false;

  deals = await getStorage();

  // Функция получения списка дел
  async function getStorage() {
    if (!isTouched) {
      isTouched = true;
      try {
        changeStorage.innerHTML = 'Переключиться на локальное хранилище';
        const { getToDoList } = await import('../logic/server_logic.js');
        deals = await getToDoList();
        console.log('Сервер - ', deals);
        return deals;
      } catch (error) {
        console.error('Ошибка загрузки данных с сервера', error);
      }
    } else {
      isTouched = false;
      changeStorage.innerHTML = 'Переключиться на серверное хранилище';
      deals = JSON.parse(localStorage.getItem('massiveDeals'));
      console.log('Локал - ', deals);
      return deals;
    }
  }
  // Функция добавления дела
  async function addDeal(deal) {
    if (changeStorage.textContent === 'Переключиться на локальное хранилище') {
      // false = server
      try {
        const { createToDoDeal, getToDoList } = await import('../logic/server_logic.js');
        await createToDoDeal(deal);
        deals = await getToDoList();
        return deals;
      } catch (error) {
        console.error('Ошибка добавления дела на сервер', error);
      }
    } else {
      // true = localStorage
      deals = JSON.parse(localStorage.getItem('massiveDeals'));
      deals.push(deal);
      localStorage.setItem('massiveDeals', JSON.stringify(deals));
      const afterDeals = JSON.parse(localStorage.getItem('massiveDeals'));
      return afterDeals;
    }
  }
  // Функция удаления дела
  async function deleteMainDeal(id) {
    if (changeStorage.textContent === 'Переключиться на локальное хранилище') {
      try {
        const { deleteToDoDeal, getToDoList } = await import('../logic/server_logic.js');
        await deleteToDoDeal(id);
        deals = await getToDoList();
        return deals;
      } catch (error) {
        console.error('Ошибка добавления дела на сервер', error);
      }
    } else {
      deals = deals.filter((deal) => deal.id !== id);
      localStorage.setItem('massiveDeals', JSON.stringify(deals));
      const newDeals = JSON.parse(localStorage.getItem('massiveDeals'));
      return newDeals;
    }
  }
  // Функция сортировки по группам
  function groupFilter() {
    const groupBtn = document.getElementById('group-btn');
    const headerNav = document.querySelector('.nav');
    groupBtn.addEventListener('click', () => {
      // groupBtn.setAttribute('disabled', 'disabled');
      const groupDiv = document.createElement('div');

      if (document.querySelector('.group__div')) {
        document.querySelector('.group__div').remove();
      } else {
        window.addEventListener('click', (e) => {
          if (groupDiv.contains(e.target) || e.target === groupBtn) return;
          groupDiv.remove();
        });

        const groupDivSort = document.createElement('div');
        const groupDivFilter = document.createElement('div');

        const okButton = document.createElement('button');
        okButton.innerHTML = 'Применить';
        okButton.classList.add('group__button-confirm', 'touch');

        const resetButton = document.createElement('button');
        resetButton.innerHTML = 'Сбросить фильтры';
        resetButton.classList.add('group__button-reset', 'touch');

        const inputSortRedFirst = document.createElement('input');
        const inputSortYellowFirst = document.createElement('input');
        const inputSortGreenFirst = document.createElement('input');
        const inputFilterRed = document.createElement('input');
        const inputFilterYellow = document.createElement('input');
        const inputFilterGreen = document.createElement('input');

        inputSortRedFirst.classList.add('input-options');
        inputSortYellowFirst.classList.add('input-options');
        inputSortGreenFirst.classList.add('input-options');
        inputFilterRed.classList.add('input-options');
        inputFilterYellow.classList.add('input-options');
        inputFilterGreen.classList.add('input-options');

        inputSortRedFirst.setAttribute('type', 'checkbox');
        inputSortYellowFirst.setAttribute('type', 'checkbox');
        inputSortGreenFirst.setAttribute('type', 'checkbox');
        inputFilterRed.setAttribute('type', 'checkbox');
        inputFilterYellow.setAttribute('type', 'checkbox');
        inputFilterGreen.setAttribute('type', 'checkbox');

        const labelSortRedFirst = document.createElement('label');
        labelSortRedFirst.textContent = 'Сортировка по красным';
        labelSortRedFirst.appendChild(inputSortRedFirst);

        const labelSortYellowFirst = document.createElement('label');
        labelSortYellowFirst.textContent = 'Сортировка по желтым';
        labelSortYellowFirst.appendChild(inputSortYellowFirst);

        const labelSortGreenFirst = document.createElement('label');
        labelSortGreenFirst.textContent = 'Сортировка по зеленым';
        labelSortGreenFirst.appendChild(inputSortGreenFirst);

        const labelFilterRed = document.createElement('label');
        labelFilterRed.textContent = 'Показать только красные';
        labelFilterRed.appendChild(inputFilterRed);

        const labelFilterYellow = document.createElement('label');
        labelFilterYellow.textContent = 'Показать только желтые';
        labelFilterYellow.appendChild(inputFilterYellow);

        const labelFilterGreen = document.createElement('label');
        labelFilterGreen.textContent = 'Показать только зеленые';
        labelFilterGreen.appendChild(inputFilterGreen);

        inputSortRedFirst.setAttribute('type', 'checkbox');
        inputSortYellowFirst.setAttribute('type', 'checkbox');
        inputSortGreenFirst.setAttribute('type', 'checkbox');

        inputSortRedFirst.id = 'SRF';
        inputSortYellowFirst.id = 'SYF';
        inputSortGreenFirst.id = 'SGF';

        inputFilterRed.setAttribute('type', 'checkbox');
        inputFilterYellow.setAttribute('type', 'checkbox');
        inputFilterGreen.setAttribute('type', 'checkbox');

        inputFilterRed.id = 'FR';
        inputFilterYellow.id = 'FY';
        inputFilterGreen.id = 'FG';

        const sortH3 = document.createElement('h3');
        const filterH3 = document.createElement('h3');

        groupDiv.classList.add('group__div', 'flex');
        groupDivSort.classList.add('group__div-sort', 'flex');
        groupDivFilter.classList.add('group__div-filter', 'flex');

        sortH3.innerHTML = 'Сортировка';
        filterH3.innerHTML = 'Фильтры';

        groupDivSort.append(sortH3);
        groupDivFilter.append(filterH3);
        groupDivSort.appendChild(labelSortRedFirst);
        groupDivSort.appendChild(labelSortYellowFirst);
        groupDivSort.appendChild(labelSortGreenFirst);
        groupDivFilter.appendChild(labelFilterRed);
        groupDivFilter.appendChild(labelFilterYellow);
        groupDivFilter.appendChild(labelFilterGreen);
        groupDiv.append(groupDivSort, groupDivFilter, okButton, resetButton);
        headerNav.prepend(groupDiv);

        const labels = groupDiv.getElementsByTagName('label');
        for (let i = 0; i < labels.length; i++) {
          labels[i].classList.add('touch');
        }

        const dealsHolder = [...deals];
        console.log('Holder deals = ', dealsHolder);
        okButton.addEventListener('click', (e) => {
          groupBtn.classList.add('filtred-sign');
          e.preventDefault();
          let checkboxHolder = '';
          const checkboxes = document.querySelectorAll(
            'input[type="checkbox"]',
          );

          for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
              checkboxHolder = checkboxes[i].id;
            }
          }
          //  Если нажата сортировка по красным
          console.log(checkboxHolder);
          if (checkboxHolder === 'SRF') {
            sortedDeals = dealsHolder.sort((a, b) => {
              if (a.group === 'Высокий приоритет') return -1;
              if (b.group === 'Высокий приоритет') return 1;
              if (a.group === 'Средний приоритет') return -1;
              if (b.group === 'Средний приоритет') return 1;
              if (a.group === 'Легкий приоритет') return -1;
              return 1;
            });
            localStorage.setItem('massiveDealsSorted', JSON.stringify(sortedDeals));
            main.innerHTML = '';
            checkDeals();
          } else if (checkboxHolder === 'SYF') {
            sortedDeals = dealsHolder.sort((a, b) => {
              if (a.group === 'Средний приоритет') return -1;
              if (b.group === 'Средний приоритет') return 1;
              if (a.group === 'Высокий приоритет') return -1;
              if (b.group === 'Высокий приоритет') return 1;
              if (a.group === 'Легкий приоритет') return -1;
              return 1;
            });
            localStorage.setItem('massiveDealsSorted', JSON.stringify(sortedDeals));
            main.innerHTML = '';
            checkDeals();
          } else if (checkboxHolder === 'SGF') {
            sortedDeals = dealsHolder.sort((a, b) => {
              if (a.group === 'Легкий приоритет') return -1;
              if (b.group === 'Легкий приоритет') return 1;
              if (a.group === 'Средний приоритет') return -1;
              if (b.group === 'Средний приоритет') return 1;
              if (a.group === 'Высокий приоритет') return -1;
              return 1;
            });
            localStorage.setItem('massiveDealsSorted', JSON.stringify(sortedDeals));
            main.innerHTML = '';
            checkDeals();
          } else if (checkboxHolder === 'FR') {
            sortedDeals = dealsHolder.filter((deal) => deal.group === 'Высокий приоритет');
            localStorage.setItem('massiveDealsSorted', JSON.stringify(sortedDeals));
            main.innerHTML = '';
            checkDeals();
          } else if (checkboxHolder === 'FY') {
            sortedDeals = dealsHolder.filter((deal) => deal.group === 'Средний приоритет');
            localStorage.setItem('massiveDealsSorted', JSON.stringify(sortedDeals));
            main.innerHTML = '';
            checkDeals();
          } else if (checkboxHolder === 'FG') {
            sortedDeals = dealsHolder.filter((deal) => deal.group === 'Легкий приоритет');
            localStorage.setItem('massiveDealsSorted', JSON.stringify(sortedDeals));
            main.innerHTML = '';
            checkDeals();
          }

          checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
              checkboxHolder = checkbox.id;
            }
          });
          groupDiv.remove();
        });
        resetButton.addEventListener('click', (e) => {
          e.preventDefault();
          groupBtn.classList.remove('filtred-sign');
          groupDiv.remove();
          sortedDeals = [];
          console.log('Теперь holderDeals = ', dealsHolder);
          localStorage.setItem('massiveDealsSorted', JSON.stringify(sortedDeals));
          main.innerHTML = '';
          checkDeals();
        });
      }
    });
  }
  // Функция проверки на пустоту
  function checkDeals() {
    console.log('Длина sortedDeals =', sortedDeals.length);
    if (sortedDeals.length === 0) {
      if (!deals || deals.length === 0) {
        noDeals.classList.remove('none');
      } else {
        main.innerHTML = '';
        noDeals.classList.add('none');
        console.log('Какой deals перед построением массива = ', deals);
        createListOfDeals(deals);
      }
    } else if (!deals || deals.length === 0) {
      noDeals.classList.remove('none');
    } else {
      main.innerHTML = '';
      noDeals.classList.add('none');
      createListOfDeals(sortedDeals);
    }
  }
  // Построение таблицы дел
  function createListOfDeals(list) {
    const timeline = gsap.timeline({ reversed: true });
    for (let i = 0; i < list.length; i++) {
      const createWrapperDiv = document.createElement('div');
      const createContentWrapperDiv = document.createElement('div');
      const createNameDiv = document.createElement('div');
      const createButtonDiv = document.createElement('div');
      const dealName = document.createElement('h2');
      const createPDays = document.createElement('p');
      const createPDescription = document.createElement('p');
      const doneButton = document.createElement('button');
      const deleteButton = document.createElement('button');

      timeline.fromTo(createWrapperDiv, { opacity: 0, y: -100 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      });
      timeline.play();
      createWrapperDiv.classList.add('deals__wrapper', 'deals', 'flex');
      createWrapperDiv.setAttribute('id', `${list[i].id}`);
      createContentWrapperDiv.classList.add('deals__content-wrapper', 'flex');
      createNameDiv.classList.add('deals__div-name', 'flex');
      createPDays.classList.add('deals__p-days');
      createPDescription.classList.add('deals__p-description', 'none');
      createPDescription.setAttribute('id', `${list[i].id}`);
      createButtonDiv.classList.add('deals__div-buttons', 'flex');
      dealName.classList.add('deals__name');
      doneButton.classList.add('deals__done', 'option-buttons', 'touch');
      deleteButton.classList.add('deals__delete', 'option-buttons', 'touch');

      dealName.innerHTML = list[i].name.charAt(0).toUpperCase() + list[i].name.slice(1);
      createPDescription.innerHTML = list[i].description;
      doneButton.textContent = 'Сделано';
      deleteButton.textContent = 'Удалить';

      // Добавляем дни повторения
      if (list[i].repeatedDays.length === 7) {
        createPDays.textContent = 'Ежедневно';
      } else if (list[i].repeatedDays.length <= 0) {
        createPDays.textContent = 'Единоразово';
      } else {
        createPDays.textContent = list[i].repeatedDays.join(' ');
      }

      // раздаем приоритетность
      if (list[i].group === 'Высокий приоритет') {
        createWrapperDiv.classList.add('deal__wrapper-red');
      } else if (list[i].group === 'Средний приоритет') {
        createWrapperDiv.classList.add('deal__wrapper-yellow');
      } else if (list[i].group === 'Легкий приоритет') {
        createWrapperDiv.classList.add('deal__wrapper-green');
      } else {
        createWrapperDiv.classList.add('deal__wrapper-default');
      }

      // проверяем сделано ли дело
      if (list[i].isDone === true) {
        createWrapperDiv.setAttribute('background-color', 'green');
        list[i].remove();
      }

      // Показываем описание по наведеню мыши
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        const mainDeals = document.querySelector('.main__container').childNodes;
        mainDeals.forEach((deal) => {
          const pDescr = document.querySelector(
            `.deals__p-description[id="${deal.id}"]`,
          );
          const tl = gsap.timeline({ paused: true });
          tl.fromTo(
            pDescr,
            { display: 'none', marginTop: 0 },
            { display: 'block', marginTop: 30, duration: 0.8 },
          );
          deal.addEventListener('mouseover', () => {
            if (pDescr && deal.id === pDescr.id) {
              tl.play();
            }
          });
          deal.addEventListener('mouseout', () => {
            if (pDescr && deal.id === pDescr.id) {
              tl.reverse();
            }
          });
        });
      }, 1);

      createNameDiv.append(dealName, createPDays);
      createButtonDiv.append(doneButton, deleteButton);
      createContentWrapperDiv.append(createNameDiv, createButtonDiv);
      createWrapperDiv.append(createContentWrapperDiv);
      if (list[i].description !== '') {
        createWrapperDiv.append(createPDescription);
      }

      main.append(createWrapperDiv);

      // удаление элемента
      function deleteDeal() {
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(createWrapperDiv, { opacity: 1 }, {
          opacity: 0, y: -100, height: 0, duration: 1,
        });
        tl.play().then(async () => {
          deals = await deleteMainDeal(createWrapperDiv.id);
          console.log('АААААААААААА', deals);
          main.innerHTML = '';
          checkDeals();
        });
      }

      deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Вы действительно хотите удалить дело?')) {
          deleteDeal();
        }
      });
      doneButton.addEventListener('click', (e) => {
        e.preventDefault();
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(createWrapperDiv, { backgroundColor: 0 }, { backgroundColor: 'green', duration: 2 });
        tl.play().then(() => {
          deleteDeal();
        });
      });
    }
  }
  // Функция создания дела
  function createNewDeal() {
    const createDealButton = document.getElementById('add');
    const addDiv = document.getElementById('newDealP');
    const formInput = document.querySelector('.newDeal__input-name');
    const formSelectDays = document.querySelector('.newDeal__select-days');
    const formSelectGroup = document.querySelector('.newDeal__select-group');
    const formDescription = document.querySelector('.newDeal__textarea');
    const dayBtnDiv = document.getElementById('daysBtn');
    const dayButton = document.querySelectorAll('.newDeal__btn-button');

    // Визуализация в какие дни повторять задачу
    dayButton.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        el.classList.toggle('newDeal__btn-button-back');
      });
    });

    // Смотрим нажата ли кнопка "по дням" и обязуем давать название задаче
    setInterval(() => {
      if (formSelectDays.value === 'По дням') {
        dayBtnDiv.classList.remove('none');
        dayBtnDiv.classList.add('flex');
      } else {
        dayBtnDiv.classList.add('none');
      }
      if (formInput.value.trim() === '') {
        createDealButton.setAttribute('disabled', 'disabled');
        createDealButton.classList.add('add-op');
      } else {
        createDealButton.removeAttribute('disabled');
        createDealButton.classList.remove('add-op');
      }
    }, 500);

    // Обработка нажатия добавления дела
    createDealButton.addEventListener('click', async (e) => {
      e.preventDefault();
      daysMassive = [];
      addDiv.classList.remove('none');
      addDiv.classList.add('active', 'newDeal__popUp');

      function Deal(
        name,
        isDone = false,
        repeatedDays = [],
        group = null,
        description,
        id,
      ) {
        this.name = name;
        this.isDone = isDone;
        this.repeatedDays = repeatedDays;
        this.group = group;
        this.description = description;
        this.id = id;
      }

      const nameDeal = formInput.value.trim();
      const selectTypeGroupDeal = formSelectGroup.value;
      const descriptionDeal = formDescription.value.trim();
      const idDeal = crypto.randomUUID();

      const newDeal = new Deal(
        nameDeal,
        false,
        daysMassive,
        selectTypeGroupDeal,
        descriptionDeal,
        idDeal,
      );
      // Добавление дней для повторения
      const repeatedDays = document.querySelectorAll(
        '.newDeal__btn-button-back',
      );
      if (repeatedDays !== undefined || true) {
        repeatedDays.forEach((el) => {
          daysMassive.push(el.innerHTML);
          el.classList.remove('newDeal__btn-button-back');
        });
      }
      addDiv.classList.remove('active', 'newDeal__popUp');
      addDiv.classList.add('none');

      deals = await addDeal(newDeal);
      form.reset();
      main.innerHTML = '';
      checkDeals();
    });
  }
  // animation
  function animations() {
    const tl = gsap.timeline({ paused: true, reversed: true });
    const newDealButton = document.getElementById('newDeal');
    const cancelButton = document.getElementById('cancel');
    const selectDaysDiv = document.querySelector('.newDeal__btn-div');
    const newDealDiv = document.getElementById('newDealP');

    tl.fromTo(
      '#newDealP',
      { opacity: 0 },
      {
        opacity: 1,
        y: 50,
        duration: 0.5,
        ease: 'power3.out',
      },
    );

    document.addEventListener('click', (e) => {
      if (divTouch) {
        if (newDealDiv.contains(e.target) || e.target === newDealButton) return;
        cancelButton.click();
      }
    });
    newDealButton.addEventListener('click', () => {
      tl.play().then(() => {
        divTouch = true;
      });
      noDeals.classList.add('none');
    });
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (!deals || deals.length !== 0) {
        e.preventDefault();
        noDeals.classList.add('none');
      }
      tl.reverse().then(() => {
        divTouch = false;
        const repeatedDays = document.querySelectorAll(
          '.newDeal__btn-button-back',
        );
        newDealDiv.classList.add('none');
        selectDaysDiv.classList.add('none');
        if (repeatedDays !== undefined || true) {
          repeatedDays.forEach((el) => {
            el.classList.remove('newDeal__btn-button-back');
          });
        }
        form.reset();
        newDealDiv.classList.remove('active', 'newDeal__popUp');
        if (!deals || deals.length === 0) {
          noDeals.classList.remove('none');
        }
      });
    });
  }
  // Переключение хранилища
  changeStorage.addEventListener('click', async () => {
    deals = await getStorage();
    console.log('Какой сейчас массив должен быть построен = ', deals);
    main.innerHTML = '';
    checkDeals();
  });
  // Проверка на пустоту

  // Анимация кнопок навигации
  function animateNavButtons() {
    const dl = gsap.timeline();
    dl.fromTo(
      '.nav__list',
      { y: '-1200%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 2.5,
        ease: 'power3.out',
      },
    );

    const lists = document.querySelectorAll('.nav__list');
    lists.forEach((list) => {
      list.addEventListener('mouseover', () => {
        gsap.to(list, {
          duration: 0.3,
          ease: 'power3.out',
          scale: 1.1,
          outlineWidth: '3px',
          outlineStyle: 'solid',
          borderRadius: '30px',
          outlineOffset: '15px',
        });
      });
      list.addEventListener('mouseout', () => {
        gsap.to(list, {
          scale: 1,
          duration: 0.3,
          ease: 'power3.out',
          outline: 'none',
        });
      });
    });
  }
  // Анимация создания нового дела
  function newDealPopUp() {
    const newDealButton = document.getElementById('newDeal');
    const newDealDiv = document.getElementById('newDealP');
    newDealButton.addEventListener('click', () => {
      newDealDiv.classList.remove('none');
      newDealDiv.classList.add('active', 'newDeal__popUp');
    });
  }
  // Анимация логотипа
  function animateLogo() {
    const logo = document.querySelector('.header__logo');
    const toText = logo.querySelector('text');

    const to = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const doText = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text',
    );
    to.textContent = 'To-';
    doText.textContent = 'DO';

    to.setAttribute('x', toText.getAttribute('x'));
    to.setAttribute('y', toText.getAttribute('y'));
    to.setAttribute('font-family', toText.getAttribute('font-family'));
    to.setAttribute('font-size', toText.getAttribute('font-size'));
    to.setAttribute('fill', toText.getAttribute('fill'));
    to.setAttribute('font-weight', toText.getAttribute('font-weight'));
    to.setAttribute('letter-spacing', toText.getAttribute('letter-spacing'));

    doText.setAttribute(
      'x',
      toText.getAttribute('x') + to.getComputedTextLength(),
    );
    doText.setAttribute('y', toText.getAttribute('y'));
    doText.setAttribute('font-family', toText.getAttribute('font-family'));
    doText.setAttribute('font-size', toText.getAttribute('font-size'));
    doText.setAttribute('fill', toText.getAttribute('fill'));
    doText.setAttribute('font-weight', toText.getAttribute('font-weight'));
    doText.setAttribute(
      'letter-spacing',
      toText.getAttribute('letter-spacing'),
    );

    logo.appendChild(to);
    logo.appendChild(doText);

    toText.style.visibility = 'hidden';

    const tl = gsap.timeline();
    tl.set(to, { y: '-100%' });
    tl.set(doText, { x: `${to.getComputedTextLength()}px`, y: '-100%' });
    tl.to(to, { y: '0%', duration: 1, ease: 'power3.out' }).to(
      doText,
      {
        y: '0%',
        x: `+=${-to.getComputedTextLength()}`,
        duration: 1,
        ease: 'power3.out',
      },
      '+=0.2',
    );
  }
  // Анимация времени
  function animateWatch() {
    const tl = gsap.timeline();
    tl.fromTo(
      '#header-time',
      { opacity: -10000 },
      { opacity: 1, duration: 2, ease: 'power3.out' },
    );
  }
  // Смена темы

  // Создание часов
  function getTime() {
    const time = document.getElementById('header-time');
    setInterval(() => {
      time.innerHTML = new Date().toLocaleTimeString();
    }, 1000);
  }

  animateNavButtons();
  animateLogo();
  newDealPopUp();
  animateWatch();
  getTime();
  changeTheme();
  checkDeals();
  animations();
  createNewDeal();
  groupFilter();
}
