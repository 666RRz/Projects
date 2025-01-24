const handelers = {
  onDone({todoItem}) {
    todoItem.done = !todoItem.done;
    fetch(`https://localhost:3000/api/todos/${todoItem.id}`), {
      method: 'PATH',
      body: JSON.stringify({done: todoItem.done}),
      headers: {'Content-Type': 'application/json'},
    }
  },
  onDelete({todoItem, element}) {
    if (!confirm('Вы уверены?')) {
      return;
    }
    element.remove();
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
      method: 'DELETE',
    })
  }
};

const response = await fetch(`https://localhost:3000/api/totos?owner=${owner}`)
const todoItemList = await response.json();

const response = await fetch('https://localhost:3000/api/todos', {
  method: 'POST',
  body: JSON.stringify({
    name: todoItemForm.input.value.trim();
    owner,
  }),
  headers: {
    'Content-Type': 'application/json',
  }
})

const todoItem = await response.json();
