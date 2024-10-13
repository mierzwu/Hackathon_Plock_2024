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

app.use(express.static('../ankieterzy'));


// Połączenie z bazą danych SQLite
const db = new sqlite3.Database('./baza_piece.db', (err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
    } else {
        console.log('Połączono z bazą danych SQLite.');
    }
});

// Obsługa żądania GET na ścieżce /places
app.get('/places', (req, res) => {
    const query = `SELECT Ulica, Numer_budynku, Numer_lokalu FROM Adresy WHERE ID_ANKIETER = 1`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Błąd podczas pobierania placesów:', err);
            return res.status(500).json({ error: 'Błąd podczas pobierania placesów' });
        }

        // Jeśli dane zostały poprawnie pobrane, zwracamy je jako JSON
        res.status(200).json(rows);
    });
});


// Obsługa żądania POST na ścieżce /login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Zapytanie do bazy danych w celu weryfikacji danych logowania
    const query = `SELECT * FROM ANKIETERZY WHERE LOGIN = ? AND HASLO = ?`;

    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error('Błąd podczas logowania:', err);
            return res.status(500).json({ success: false, error: 'Błąd podczas logowania' });
        }

        if (row) {
            // Użytkownik został znaleziony
            return res.status(200).json({ success: true, message: 'Logowanie udane', user: row });
        } else {
            // Użytkownik nie został znaleziony
            return res.status(401).json({ success: false, error: 'Błędna nazwa użytkownika lub hasło' });
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
