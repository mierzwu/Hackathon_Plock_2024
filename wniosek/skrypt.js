document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    dateInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);

    dateInput.addEventListener('input', function() {
        const selectedDate = new Date(this.value);
        const dayOfWeek = selectedDate.getUTCDay();

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            let nextValidDate = new Date(selectedDate);
            nextValidDate.setDate(selectedDate.getDate() + (dayOfWeek === 0 ? 1 : 2));

            this.value = nextValidDate.toISOString().split('T')[0];
            alert('Wybrano weekend. Data została automatycznie zmieniona na najbliższy dzień roboczy.');
        }
    });

    // Obsługa formularza
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const data = {
            street: document.getElementById('street').value,
            houseNumber: document.getElementById('house-number').value,
            date: document.getElementById('date').value,
            timeBlock: document.getElementById('time-block').value
        };

        const email_data = {
            date: document.getElementById('date').value,
            timeBlock: document.getElementById('time-block').value 
        }

        fetch('http://192.168.150.174:3000/email', { // Updated to localhost for consistency
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email_data),
        })
        .then(response => response.json())
        .then(data => {
            alert('Dane zostały przesłane pomyślnie.');
        })
        .catch((error) => {
            console.error('Błąd:', error);
            alert('Wystąpił błąd podczas przesyłania danych.');
        });

        fetch('http://192.168.150.174:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            alert('Dane zostały przesłane pomyślnie.');
        })
        .catch((error) => {
            console.error('Błąd:', error);
            alert('Wystąpił błąd podczas przesyłania danych.');
        });
    });
});
