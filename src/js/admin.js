import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

function addExcursionToUI(excursion) {
  const excursionsList = document.querySelector('.panel__excursions');
  const newExcursion = document.createElement('li');
  newExcursion.classList.add('excursions__item');

  newExcursion.innerHTML = `
   <li data-id="${excursion.id}" class="excursions__item excursions__item--prototype">
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
  </li>
  `;

  excursionsList.appendChild(newExcursion);
}

async function displayExcursions() {
  const api = new ExcursionsAPI();
  try {
    const excursions = await api.fetchExcursions();
    excursions.forEach((excursion) => {
      addExcursionToUI(excursion);
    });
  } catch (error) {
    console.error('Błąd podczas pobierania danych: ', error);
  }
}

displayExcursions();

// add item

document.querySelector('.form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('excursion-title').value;
  const description = document.getElementById('excursion-description').value;
  const adultPrice = parseFloat(
    document.getElementById('excursion-adult-price').value
  );
  const childPrice = parseFloat(
    document.getElementById('excursion-child-price').value
  );

  if (name && description && !isNaN(adultPrice) && !isNaN(childPrice)) {
    const data = {
      title: name,
      description: description,
      adultPrice: adultPrice,
      childPrice: childPrice,
    };

    try {
      const api = new ExcursionsAPI();
      const newExcursion = await api.addExcursion(data);
      addExcursionToUI(newExcursion);
    } catch (error) {
      console.error('Błąd podczas dodawania wycieczki: ', error);
    }
  } else {
    console.error('Błąd walidacji danych');
  }
});

// remove excursion
document
  .querySelector('.panel__excursions')
  .addEventListener('click', async (event) => {
    if (event.target.classList.contains('excursions__field-input--remove')) {
      const excursionId = event.target.closest('li').getAttribute('data-id');
      event.target.closest('li').remove();

      try {
        const api = new ExcursionsAPI();
        await api.removeExcursion(excursionId);
      } catch (error) {
        console.error('Błąd podczas usuwania wycieczki: ', error);
      }
    }
  });
