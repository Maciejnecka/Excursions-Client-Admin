class ExcursionsAPI {
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
