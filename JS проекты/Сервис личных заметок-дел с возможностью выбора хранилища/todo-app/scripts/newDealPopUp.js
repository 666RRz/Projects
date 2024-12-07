export default function newDealPopUp() {
  const newDealButton = document.getElementById('newDeal');
  const newDealDiv = document.getElementById('newDealP');
  const noDeals = document.querySelector('.noDeals');
  newDealButton.addEventListener('click', () => {
    newDealDiv.classList.remove('none');
    newDealDiv.classList.add('active', 'newDeal__popUp');
    noDeals.classList.add('none');
  });
}
