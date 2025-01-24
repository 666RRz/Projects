// Получение списка
export async function getToDoList() {
  const response = await fetch('http://localhost:3000/api/todos');
  // eslint-disable-next-line no-return-await
  return await response.json();
}
// Добавление дела
export async function createToDoDeal(deal) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deal),
  });
  const data = response.json();
}

// Удаление дела

export async function deleteToDoDeal(id) {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
}
