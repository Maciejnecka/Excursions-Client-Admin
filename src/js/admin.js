import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

function createExcursionElement(excursion) {
  const newExcursion = document.createElement('li');
  newExcursion.classList.add('excursions__item');
  newExcursion.setAttribute('data-id', excursion.id);
  newExcursion.innerHTML = `
      <header class="excursions__header">
          <h2 class="excursions__title">${excursion.title}</h2>
          <p class="excursions__description">${excursion.description}</p>
      </header>
      <form class="excursions__form">
          <div class="excursions__field">
              <label class="excursions__field-name">
                  Dorosły: <strong>${excursion.adultPrice} PLN</strong>
              </label>
          </div>
          <div class="excursions__field">
              <label class="excursions__field-name">
                  Dziecko: <strong>${excursion.childPrice} PLN</strong>
              </label>
          </div>
          <div class="excursions__field excursions__field--submit">
              <input
                  class="excursions__field-input excursions__field-input--update"
                  value="edytuj"
                  type="submit"
              />
              <input
                  class="excursions__field-input excursions__field-input--remove"
                  value="usuń"
                  type="submit"
              />
          </div>
      </form>
  `;

  return newExcursion;
}

function addExcursionToUI(excursion) {
  const excursionsList = document.querySelector('.panel__excursions');
  const newExcursion = createExcursionElement(excursion);

  excursionsList.appendChild(newExcursion);
  clearInputFields();

  newExcursion
    .querySelector('.excursions__field-input--update')
    .addEventListener('click', () => {
      updateExcursionUI(excursion, newExcursion);
    });
}

function clearInputFields() {
  const nameInput = document.getElementById('excursion-title');
  const descriptionInput = document.getElementById('excursion-description');
  const adultPriceInput = document.getElementById('excursion-adult-price');
  const childPriceInput = document.getElementById('excursion-child-price');

  nameInput.value = '';
  descriptionInput.value = '';
  adultPriceInput.value = '';
  childPriceInput.value = '';
}

async function displayExcursions() {
  const api = new ExcursionsAPI();
  try {
    const excursions = await api.fetchData(api.apiUrl);
    excursions.forEach((excursion) => {
      addExcursionToUI(excursion);
    });
  } catch (error) {
    console.error('Błąd podczas pobierania danych: ', error);
  }
}

displayExcursions();

document.querySelector('.form').addEventListener('submit', handleFormAdd);

async function handleFormAdd(event) {
  document.querySelector('.form').addEventListener('submit', handleFormAdd);
  event.preventDefault();

  const nameInput = document.getElementById('excursion-title');
  const descriptionInput = document.getElementById('excursion-description');
  const adultPriceInput = document.getElementById('excursion-adult-price');
  const childPriceInput = document.getElementById('excursion-child-price');

  const name = nameInput.value;
  const description = descriptionInput.value;
  const adultPrice = parseFloat(adultPriceInput.value);
  const childPrice = parseFloat(childPriceInput.value);

  if (validateInput(name, description, adultPrice, childPrice)) {
    const data = {
      title: name,
      description: description,
      adultPrice: adultPrice,
      childPrice: childPrice,
    };

    try {
      const newExcursion = await addExcursion(data);
      addExcursionToUI(newExcursion);
    } catch (error) {
      console.error('Błąd podczas dodawania wycieczki: ', error);
    }
  } else {
    alert('Błąd: Wszystkie pola muszą być wypełnione');
  }
}

function validateInput(name, description, adultPrice, childPrice) {
  return name && description && !isNaN(adultPrice) && !isNaN(childPrice);
}

async function addExcursion(data) {
  try {
    const api = new ExcursionsAPI();
    return await api.addExcursion(data);
  } catch (error) {
    throw error;
  }
}

async function handleRemoveClick(event) {
  if (event.target.classList.contains('excursions__field-input--remove')) {
    const listItem = event.target.closest('li');
    if (!listItem) return;

    const excursionTitle =
      listItem.querySelector('.excursions__title').textContent;
    const shouldRemove = window.confirm(
      `Are you sure you want to remove excursion "${excursionTitle}"?`
    );

    if (shouldRemove) {
      const excursionId = listItem.getAttribute('data-id');
      listItem.remove();

      try {
        const api = new ExcursionsAPI();
        await api.removeExcursion(excursionId);
      } catch (error) {
        console.error('Błąd podczas usuwania wycieczki: ', error);
      }
    }
  }
}

document
  .querySelector('.panel__excursions')
  .addEventListener('click', handleRemoveClick);

function updateExcursionUI(excursion, listItem) {
  listItem.innerHTML = `
      <header class="excursions__header">
          <input class="excursions__title" type="text" value="${excursion.title}" />
          <textarea rows="10" class="excursions__description">${excursion.description}</textarea>
      </header>
      <form class="excursions__form">
          <div class="excursions__field">
              <label class="excursions__field-name">
                  Dorosły: <input class="excursions__adult-price" type="number" value="${excursion.adultPrice}" />
              </label>
          </div>
          <div class="excursions__field">
              <label class="excursions__field-name">
                  Dziecko: <input class="excursions__child-price" type="number" value="${excursion.childPrice}" />
              </label>
          </div>
          <div class="excursions__field excursions__field--submit">
              <input
                  class="excursions__field-input excursions__field-input--update"
                  value="zapisz"
                  type="submit"
              />
              <input
                  class="excursions__field-input excursions__field-input--remove"
                  value="usuń"
                  type="submit"
              />
          </div>
      </form>
  `;

  listItem
    .querySelector('.excursions__field-input--update')
    .addEventListener('click', async () => {
      const updatedExcursion = {
        id: excursion.id,
        title: listItem.querySelector('.excursions__title').value,
        description: listItem.querySelector('.excursions__description').value,
        adultPrice: parseFloat(
          listItem.querySelector('.excursions__adult-price').value
        ),
        childPrice: parseFloat(
          listItem.querySelector('.excursions__child-price').value
        ),
      };

      try {
        const api = new ExcursionsAPI();
        const updatedData = await api.updateExcursion(updatedExcursion);
        updateExcursionUI(updatedData, listItem);
      } catch (error) {
        console.error('Błąd podczas aktualizacji wycieczki: ', error);
      }
    });
}
