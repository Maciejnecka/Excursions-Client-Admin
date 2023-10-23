class ExcursionsAPI {
  async fetchExcursions() {
    const apiUrl = 'http://localhost:3000/excursions';

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Błąd podczas pobierania danych');
      }
    } catch (error) {
      console.error('Błąd komunikacji z API:'.error);
      throw new Error('Nie udało się pobrać danych o wycieczkach');
    }
  }

  async sendOrder(orderData) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    };

    const apiUrl = 'http://localhost:3000/orders';

    return fetch(apiUrl, options)
      .then((response) => {
        if (response.ok) {
          return true;
        } else {
          throw new Error('Wystąpił błąd podczas wysyłania zamówienia.');
        }
      })
      .catch((error) => {
        console.error('Błąd podczas komunikacji z API:', error);
        throw new Error('Wystąpił błąd podczas komunikacji z serwerem.');
      });
  }
}

export default ExcursionsAPI;
