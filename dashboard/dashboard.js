document.addEventListener('DOMContentLoaded', function() {
    const userName = 'Jan'; // Tutaj wstaw imię użytkownika np. pobrane z serwera
    document.getElementById('greeting').textContent = `Witaj, ${userName}!`;

    // Dodaj event listener do każdego zadania
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('click', function(event) {
            event.stopPropagation(); // Zatrzymaj dalszą propagację

            if (this.classList.contains('active')) {
                closeTask(this); // Zamykanie zadania
            } else {
                closeAllTasks(); // Zamykanie wszystkich innych zadań
                openTask(this); // Otwieranie bieżącego zadania
            }
        });
    });

    // Kliknięcie w dowolne miejsce poza zadaniem zamyka otwarte zadania
    document.addEventListener('click', function() {
        closeAllTasks();
    });
});

// Funkcja otwierająca zadanie
function openTask(task) {
    const content = task.querySelector('.task-content');
    task.classList.add('active');
    content.style.maxHeight = content.scrollHeight + 'px'; // Ustawienie dynamicznej wysokości
}

// Funkcja zamykająca zadanie
function closeTask(task) {
    const content = task.querySelector('.task-content');
    task.classList.remove('active');
    content.style.maxHeight = '0'; // Zwijanie zadania
}

// Funkcja zamykająca wszystkie zadania
function closeAllTasks() {
    const activeTasks = document.querySelectorAll('.task.active');
    activeTasks.forEach(task => closeTask(task));
}

// Obsługa wypełnienia ankiety
function handleAnkieta(taskId) {
    alert(`Przejście do ankiety dla zadania ${taskId}`);
    window.location.href = `ankieta.html?task=${taskId}`; // Przekierowanie do strony ankiety
}

// Obsługa "Mieszkaniec nieobecny"
function handleNieobecnosc(taskId) {
    alert(`Mieszkaniec nieobecny dla zadania ${taskId}`);
    // Możesz dodać więcej operacji, np. zapisanie informacji o nieobecności
}
