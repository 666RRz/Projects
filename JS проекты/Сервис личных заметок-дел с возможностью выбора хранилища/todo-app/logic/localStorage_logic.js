let deals = [];

export function getToDoList() {
  return JSON.parse(localStorage.getItem('massiveDeals'));
}

export function createToDoDeal(deal) {
  deals.push(deal);
  return JSON.stringify(localStorage.setItem('massiveDeals', JSON.stringify(deals)));
}

export function deleteToDoDeal(id) {
  deals = deals.filter((deal) => deal.id !== id);
  localStorage.setItem('massiveDeals', JSON.stringify(deals));
  const newDeals = JSON.parse(localStorage.getItem('massiveDeals'));
  return newDeals;
}
