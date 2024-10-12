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

// Obsługa żądania POST na ścieżce /submit


app.get('/test', (req, res) =>{
    res.json({test: 'test'});
});

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
