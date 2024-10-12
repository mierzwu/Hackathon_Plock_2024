const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors'); // Dodaj pakiet cors

const app = express();
const port = 3000;

// Włącz CORS dla wszystkich połączeń
app.use(cors());

// Middleware do obsługi JSON
app.use(bodyParser.json());

// Połączenie z bazą danych SQLite
const db = new sqlite3.Database('./baza_piece.db', (err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
    } else {
        console.log('Połączono z bazą danych SQLite.');
    }
});

// Obsługa żądania GET na ścieżce /test
app.get('/test', (req, res) => {
    res.json({ test: 'test' });
});

// Obsługa żądania POST na ścieżce /login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Zapytanie do bazy danych, aby sprawdzić, czy użytkownik istnieje
    const query = `SELECT * FROM ANKIETERZY WHERE LOGIN = ? AND HASLO = ?`;

    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error('Błąd podczas weryfikacji użytkownika:', err);
            res.status(500).json({ error: 'Błąd podczas weryfikacji użytkownika' });
        } else if (row) {
            // Użytkownik został znaleziony
            res.json({ success: true, message: 'Logowanie udane' });
        } else {
            // Nie znaleziono takiego użytkownika
            res.json({ success: false, message: 'Nieprawidłowy login lub hasło' });
        }
    });
});

// Obsługa żądania POST na ścieżce /submit
app.post('/submit', (req, res) => {
    const { street, houseNumber, date, timeBlock } = req.body;

    // Aktualizacja tabeli Adresy na podstawie danych z formularza
    const query = `
        UPDATE Adresy
        SET Data_Odwiedzin = ?, Godzina_Odwiedzin = ?
        WHERE Ulica = ? AND Numer_budynku = ?`;

    db.run(query, [date, timeBlock, street, houseNumber], function (err) {
        if (err) {
            console.error('Błąd podczas aktualizacji danych:', err);
            res.status(500).json({ error: 'Błąd podczas aktualizacji danych' });
        } else {
            res.json({ message: 'Dane zostały zaktualizowane pomyślnie' });
        }
    });
});

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
