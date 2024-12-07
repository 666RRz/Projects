/// <reference types="cypress" />

describe('Тест игры в пары', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    Cypress.on('uncaught:exception', (err, runnable) =>
      // returning false here prevents Cypress from
      // failing the test
      false);
    cy.visit('http://localhost:3000');
  });

  const startGame = () => {
    cy.contains('Запустить игру').click();
    cy.contains('Начать игру').click();
  }

  const clickCard = (index) => {
    cy.get('ul li').eq(index).click()
  }

  const pairCards = (index) => {
    let card = cy.get('ul li').eq(index + 2)
    let card2 = cy.get('ul li').eq(index + 3)
    card.click()
    card2.click()
  }

  function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
}

  it('Тест на запуск игры', () => {
    startGame()
    cy.get('ul');
  });
  it('Тест на перезапуск игры', () => {
    startGame()
    cy.contains('Еще разок').click();
    cy.contains('Начать игру').click();
  });
  it('Тест на добавление карточки', () => {
    startGame()
    cy.get('button.game__card-add').click();
  });
  it('Тест на удаление карточки', () => {
    startGame()
    cy.get('button.game__card-add').click();
    cy.get('button.game__card-remove').click();
  });
  it('Тест на смену темы на темную и обратно', () => {
    cy.contains('Запустить игру').click();
    cy.get('button.night').click();
    cy.get('button.night').click();
  });
  it('Тест на открытие карточки', () => {
    startGame()
    cy.get('ul li:first-child').click();
  })
  it('Тест на сравнении карточек', () => {
    startGame()
    cy.get('ul li:first-child').click();
    cy.get('ul li:last-child').click();
  });
  it('Тест на нахождение пары', () => {
    startGame()
    cy.get('ul li').each(($card, index) => {
      if(cy.get('ul li.clear').should('have.length', 0)){
        Cypress.on('fail', (error, runnable) => {
        console.error('Ошибка:', error);
        return false;
        });
      let card = cy.wrap($card)
        card.click()
        cy.wait(1500);
        if (index + 1 < cy.get('ul li').length) {
                let currentCard = cy.get('ul li').eq(index);
                let nextCard = cy.get('ul li').eq(index + 1);
                  if(cy.get('ul li').contains('.clear')) {
                    return
                  } else {
                    if(currentCard.should('have.class', 'delete') && nextCard.should('have.class', 'delete'))
                    {
                      nextCard.click();
                      cy.wait(500);
                    }
                  }
              }
            } else {
              cy.get('ul li.clear').should('have.length', 2)
            }
   });
  });
  it.only('Тест на нахождение непарных карточек', () => {
    startGame()
    cy.get('ul li').each(($card, index) => {
          let card = cy.get('ul li').eq(getRandomInt(0,8))
          let card2 = cy.get('ul li').eq(getRandomInt(0, 8))
          card.click()
          card2.click()
          cy.wait(1500);
          if(cy.get('ul li.clear')) {
            pairCards(index++)
            if(cy.get('ul li.clear').should('have.length', 4)) {
              pairCards(2)
              Cypress.on('fail', (error, runnable) => {
              console.error('Ошибка:', error);
              return false;
            });
            }
          }
  })
  })
});

