let listArray = [];
let listName = '';

// создаем и возвращаем заголовок приложения
function createAppTitle(title) {
  const appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

// создаем и возвращаем форму для создания дела
function createTodoItemForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';
  button.disabled = true;
  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  input.addEventListener('input', () => {
    if (input.value !== '') {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  return {
    form,
    input,
    button,
  };
}

// создаем и возвращаем список элементов
function createTodoList() {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItem(obj) {
  const item = document.createElement('li');
  // кнопки помещаем в элемент, который красиво покажет их в одной группе
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  // устанавливаем стили для элемента списка, а также для размещения кнопок
  // в его правой части с помощью flex
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.textContent = obj.name;
  // newItemParam.done ? item.classList.add('list-group-item-success') : item.classList.remove('list-group-item-success');

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  if (obj.done == true) item.classList.add('list-group-item-success');

  doneButton.addEventListener('click', () => {
    item.classList.toggle('list-group-item-success');

    for (const listItem of listArray) {
      if (listItem.id == obj.id) listItem.done = !listItem.done;
    }
    saveList(listArray, listName);
  });
  deleteButton.addEventListener('click', () => {
    if (confirm('Вы уверены?')) {
      item.remove();

      for (let i = 0; i < listArray.length; i++) {
        if (listArray[i].id == obj.id) listArray.splice(i, 1);
      }

      saveList(listArray, listName);
    }
  });

  // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
  return {
    item,
    doneButton,
    deleteButton,
  };
}

function getNewID(arr) {
  let max = 0;
  for (const item of arr) {
    if (item.id > max) max = item.id;
  }
  return max + 1;
}

function saveList(arr, keyName) {
  localStorage.setItem(keyName, JSON.stringify(arr));
}

function createTodoApp(container,
  {
    title = 'Список дел',
    keyName,
    defArray = [],
    todoItemList = [],
  }) {
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();

  listName = keyName;
  listArray = defArray;

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  const localData = localStorage.getItem(listName);

  if (localData !== null && localData !== '') listArray = JSON.parse(localData);

  for (const itemList of listArray) {
    const todoItem = createTodoItem(itemList);
    todoList.append(todoItem.item);
  }

  todoItemForm.form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }
    const newItem = {
      id: getNewID(listArray),
      name: todoItemForm.input.value,
      done: false,
    };

    const todoItem = createTodoItem(newItem);

    listArray.push(newItem);

    saveList(listArray, listName);

    todoList.append(todoItem.item);

    todoItemForm.button.disabled = true;
    todoItemForm.input.value = '';
  });
}

export { createTodoApp }

