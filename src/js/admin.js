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
                            Dziecko: <strong>${excursion.childPrice}PLN</strong>
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
