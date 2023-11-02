class ExcursionsAPI {
  constructor() {
    this.apiUrl = 'http://localhost:3000/excursions';
  }

  async fetchData(apiUrl) {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Nie udało się pobrać danych o wycieczkach');
  }

  async sendOrder(orderData) {
    const apiUrl = 'http://localhost:3000/orders';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    };

    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        return true;
      } else {
        throw new Error('Wystąpił błąd podczas wysyłania zamówienia.');
      }
    } catch (error) {
      this.handleAPIError(error, 'Wystąpił błąd podczas dodawania wycieczki.');
    }
  }

  async addExcursion(data) {
    const apiUrl = 'http://localhost:3000/excursions';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const newExcursion = await response.json();
        return newExcursion;
      } else {
        throw new Error('Błąd podczas dodawania wycieczki.');
      }
    } catch (error) {
      this.handleAPIError(error, 'Wystąpił błąd podczas dodawania wycieczki');
    }
  }

  async removeExcursion(excursionId) {
    const apiUrl = `http://localhost:3000/excursions/${excursionId}`;
    const options = {
      method: 'DELETE',
    };
    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        return true;
      } else {
        throw new Error('Błąd podczas usuwania wycieczki.');
      }
    } catch (error) {
      this.handleAPIError(error, 'Wystąpił błąd podczas usuwania wycieczki');
    }
  }

  async updateExcursion(updatedExcursion) {
    const apiUrl = `http://localhost:3000/excursions/${updatedExcursion.id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExcursion),
    };

    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Błąd podczas aktualizacji wycieczki.');
    } catch (error) {
      this.handleAPIError(error.message);
    }
  }

  handleAPIError(error, errorMessage) {
    console.error('Błąd komunikacji z API:', error);
    throw new Error(
      errorMessage || 'Wystąpił błąd podczas aktualizacji wycieczki'
    );
  }
}

export default ExcursionsAPI;
