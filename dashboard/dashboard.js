document.addEventListener('DOMContentLoaded', () => {
    // Funkcja do pobrania danych z serwera
    async function fetchTasks() {
        try {
            const response = await fetch('/api/places'); // Endpoint, który zwraca dane o zadaniach w formacie JSON
            if (!response.ok) {
                throw new Error('Błąd sieci');
            }
            const places = await response.json(); // Konwersja odpowiedzi do formatu JSON
            generateTasks(places);
        } catch (error) {
            console.error('Błąd pobierania danych:', error);
            document.getElementById('taskList').textContent = 'Błąd ładowania zadań.';
        }
    }

    // Funkcja do dynamicznego generowania zadań na podstawie danych z serwera
    function generateTasks(places) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Wyczyszczenie listy zadań (jeśli było "Ładowanie zadań...")

        if (places.length === 0) {
            taskList.textContent = 'Brak dostępnych zadań.';
            return;
        }

        places.forEach((place, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.id = `task-${index + 1}`;

            const taskHeader = document.createElement('div');
            taskHeader.classList.add('task-header');
            taskHeader.innerHTML = `<p>Zadanie ${index + 1} - Adres: ${place.Ulica} ${place.Numer_budynku}, Godzina: ${place.Godzina}, Mieszkaniec: ${place.Mieszkaniec}, Tel: ${place.Tel}</p>`;

            const taskContent = document.createElement('div');
            taskContent.classList.add('task-content');
            taskContent.innerHTML = `
                <button class="wypelnij-ankiete" onclick="handleAnkieta(${index + 1})">Wypełnij ankietę</button>
                <button class="mieszkaniec-nieobecny" onclick="handleNieobecnosc(${index + 1})">Mieszkaniec nieobecny</button>
            `;

            taskDiv.appendChild(taskHeader);
            taskDiv.appendChild(taskContent);
            taskList.appendChild(taskDiv);
        });
    }

    // Wywołanie funkcji pobierającej zadania po załadowaniu strony
    fetchTasks();
});

// Funkcje do obsługi kliknięć w przyciski
function handleAnkieta(taskId) {
    alert('Wypełnij ankietę dla zadania ' + taskId);
}

function handleNieobecnosc(taskId) {
    alert('Mieszkaniec nieobecny dla zadania ' + taskId);
}
