document.addEventListener('DOMContentLoaded', () => {
    async function fetchTasks() {
        try {
            const response = await fetch('http://192.168.1.113:3000/places');
            if (!response.ok) {
                throw new Error('Network error');
            }
            const places = await response.json();
            generateTasks(places);
        } catch (error) {
            console.error('Error fetching data:', error);
            document.getElementById('taskList').textContent = 'Error loading tasks.';
        }
    }

    function generateTasks(places) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        if (places.length === 0) {
            taskList.textContent = 'No tasks available.';
            return;
        }
        const tab = ['8:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', "14:00 - 16:00", '16:00 - 18:00']
        places.forEach((place, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.id = place.ID;

            const taskHeader = document.createElement('div');
            taskHeader.classList.add('task-header');
            taskHeader.innerHTML = `<p>Adres: ${place.Ulica} ${place.Numer_budynku}<br> Godzina: ${tab[ index ]}</p>`;

            const taskContent = document.createElement('div');
            taskContent.classList.add('task-content');
            taskContent.innerHTML = `
                <button class="wypelnij-ankiete" onclick="handleAnkieta(${place.ID})">Wypełnij ankietę</button>
                <button class="mieszkaniec-nieobecny" onclick="handleNieobecnosc(${place.ID})">Domownicy nieobecni</button>
            `;

            taskDiv.appendChild(taskHeader);
            taskDiv.appendChild(taskContent);
            taskList.appendChild(taskDiv);

            // Add event listener for toggling task expansion
            taskHeader.addEventListener('click', () => {
                // Collapse all other tasks
                const allTasks = document.querySelectorAll('.task');
                allTasks.forEach(task => {
                    if (task !== taskDiv) {
                        task.classList.remove('active');
                        task.querySelector('.task-content').style.maxHeight = '0';
                    }
                });

                // Toggle the current task
                if (taskDiv.classList.contains('active')) {
                    taskContent.style.maxHeight = '0'; // Collapse
                } else {
                    taskContent.style.maxHeight = taskContent.scrollHeight + 'px'; // Expand to full height
                }
                taskDiv.classList.toggle('active');
            });
        });
    }

    fetchTasks();
});

function handleAnkieta(taskId) {
    window.location.href = '../ankieta/ankieta.html';
    const taskElement = document.getElementById(taskId);

    // Sprawdź, czy element istnieje
    if (taskElement) {
        // Usuń element z drzewa DOM
        taskElement.remove();
    } else {
        console.error('Task not found: ' + taskId);
    }
    
}

function handleNieobecnosc(taskId) {
    const taskElement = document.getElementById(taskId);

    // Sprawdź, czy element istnieje
    if (taskElement) {
        // Usuń element z drzewa DOM
        taskElement.remove();
    } else {
        console.error('Task not found: ' + taskId);
    }
}
