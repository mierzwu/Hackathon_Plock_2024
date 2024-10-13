document.addEventListener('DOMContentLoaded', () => {
    fetch('http://192.168.150.174:3000/places')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Nie udało się pobrać placesów');
            }
        })
        .then(places => {
            const taskList = document.getElementById('placesList');

            places.forEach(places => {
                const listItem = document.createElement('li');
                listItem.textContent = `${places.Ulica}, ${places.Numer_budynku}, ${places.Numer_lokalu}`;
                placesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Błąd:', error);
            alert('Wystąpił błąd podczas pobierania placesów');
        });
});
