import sqlite3
import datetime

conection = sqlite3.connect('baza_piece.db')
database = conection.cursor()

dzisiejsza_data = '2024-10-23' #str(datetime.date.today())

database.execute(f"SELECT ID FROM Adresy WHERE Odwiedzony = 'Nie' LIMIT 10")
conection.commit()

data = database.fetchall()
data = [i[ 0 ] for i in data]

for i in range(5):
    database.execute(f"UPDATE Adresy SET ID_ANKIETER = ? WHERE ID = ?", [1, data[ i ]])
    conection.commit()
for i in range(5, 10):
    database.execute(f"UPDATE Adresy SET ID_ANKIETER = ? WHERE ID = ?", [2, data[ i ]])
    conection.commit()

conection.close()
print(data)
