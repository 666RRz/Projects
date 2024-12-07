import { checkCardNumber, checkCardCvc, createCardForm } from './validFunctionsTest';

describe('Тесты на валидацию номера карты', () => {
  test('Пропускает корректный номер карты', () => {
  expect(checkCardNumber('4917484589897107')).toBe(true)
})
  test('Не пропускает произвольную строку', () => {
    expect(checkCardNumber('asdjkasdjkhлфывао??sd..')).toBe(false)
  })
  test('Не пропускает строку с недостаточным количеством цифр', () => {
    expect(checkCardNumber('49174')).toBe(false)
  })
  test('Не пропускает строку с недостаточным количеством цифр', () => {
    expect(checkCardNumber('49174')).toBe(false)
  })
  test('Не пропускает строку со слишком большим количеством цифр ', () => {
    expect(checkCardNumber('4917449174845898971074917484589897107')).toBe(false)
  })
});
describe('Тесты на CVV/CVC', () => {
  test('CVV/CVC пропускает строку с тремя цифровыми символами', () => {
    expect(checkCardCvc('323')).toBe(true)
  })
  test('CVV/CVC не пропускает строку с 1-2 цифровыми символами', () => {
    expect(checkCardCvc('32')).toBe(false)
    expect(checkCardCvc('3')).toBe(false)
  })
  test('CVV/CVC не пропускает строку 4+ символами', () => {
    expect(checkCardCvc('323231')).toBe(false)
  })
  test('CVV/CVC не пропускает строку тремя не цифровыми символами', () => {
    expect(checkCardCvc('цофтю.?')).toBe(false)
  })
})
describe('Тест на корректное создание DOM - дерева', () => {
  test('Создание дом дерева возвращает форму с четырьмя полями', () => {
    const expectedLayout = '<form id="form" method="POST" style="display: flex; flex-direction: column; align-items: center;"><div id="my-card" class="card-js card-wrapper"><div id="cardDataHolder" class="card-logo"><h2 id="cardName" position="relative">Новая карта</h2><img id="logo"></div><input id="cardNumber" class="card-number" type="text" required="" placeholder="XXXX XXXX XXXX XXXX"><input id="cardDate" class="expiry-month" type="text" required="" placeholder="month/year"><input id="cardCvc" class="cvc" type="text" required="" placeholder="cvc"><input id="cardEmail" type="text" required="" placeholder="Email"></div><div class="card-div"><button id="submitButton" class="disabled" disabled=\"\" type="submit">Добавить новую карту</button></div></form>'
    const form = createCardForm()
    expect(form).toBeInstanceOf(HTMLFormElement)
    expect(form.outerHTML).toBe(expectedLayout)
  })
})


