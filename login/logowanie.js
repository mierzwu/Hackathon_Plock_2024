document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Zatrzymanie domyślnego zachowania formularza

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Wysłanie danych logowania do serwera za pomocą fetch API
    fetch('http://192.168.150.174:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            //alert('Logowanie zakończone sukcesem!');
            // Możesz przekierować na stronę główną
            if('eko' == username){
                window.location.href = '../dashboard_ekodoradca/dashboard.html';
            }
            else if('str' == username){
                window.location.href = '../dashboard_straznik/dashboard.html';
            }
            else{
                window.location.href = '../urzednik/urzednik.html';
            }
        } else {
            alert('Błędny login lub hasło');
        }
    })
    .catch(error => {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas logowania');
    });
});
