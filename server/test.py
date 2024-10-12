import sqlite3

conection = sqlite3.connect('baza_piece.db')
database = conection.cursor()

database.execute('SELECT * FROM Adresy')
data = database.fetchall()

for row in data:
    print(row)