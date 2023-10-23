import './../css/client.css';
import ExcursionsAPI from './ExcursionsAPI';

const excursionsList = document.querySelector('.panel__excursions');
const cartList = document.querySelector('.panel__summary');

const cart = [];

function addToCart(event) {
  event.preventDefault();

  const form = event.target;
  const adultsInput = form.querySelector(
    '.excursions__field-input[name="adults"]'
  );
  const adultPriceInput = form.querySelector('.excursions__field--adult-price');

  const childrenInput = form.querySelector(
    '.excursions__field-input[name="children"]'
  );
  const childPriceInput = form.querySelector('.excursions__field--child-price');

  const excursionItem = form.closest('.excursions__item');
  const title = excursionItem.querySelector('.excursions__title').textContent;

  const adults = parseInt(adultsInput.value);
  const adultPrice = parseInt(adultPriceInput.textContent);
  const children = parseInt(childrenInput.value);
  const childPrice = parseInt(childPriceInput.textContent);

  if (isNaN(adults) || isNaN(children) || adults < 0 || children < 0) {
    alert('Proszę wprowadzić poprawną ilość dorosłych i dzieci.');
    return;
  }

  const totalPrice = adults * adultPrice + children * childPrice;

  const cartItem = {
    title,
    adults,
    adultPrice,
    children,
    childPrice,
    totalPrice,
  };
  cart.push(cartItem);

  renderCart();
}

function renderCart() {
  cartList.innerHTML = '';

  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalValue = document.querySelector('.order__total-price-value');
  totalValue.textContent = totalPrice + ' PLN';

  cart.forEach((item) => {
    const cartItem = document.createElement('li');
    console.log(item);
    cartItem.innerHTML = `
      <h3 class="summary__title">
        <span class="summary__name">${item.title}</span>
        <strong class="summay__total-price">${item.totalPrice} PLN</strong>
        <a href="#" class="summary__btn-remove" title="usuń">X</a>
      </h3>
      <p class="summary__prices">dorośli: ${item.adults} x ${item.adultPrice} PLN, dzieci: ${item.children} x ${item.childPrice} PLN</p>
    `;
    cartList.appendChild(cartItem);
  });
}

excursionsList.addEventListener('submit', addToCart);
