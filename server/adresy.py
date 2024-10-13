import sqlite3

conection = sqlite3.connect('baza_piece.db')
database = conection.cursor()

def tworzenie_tabeli_adresy():
    
    database.execute(f"""CREATE TABLE IF NOT EXISTS Adresy (
        ID INTEGER PRIMARY KEY,
        Miejscowosc TEXT,
        Osiedle TEXT,
        Ulica TEXT,
        Numer_budynku TEXT,
        Numer_lokalu TEXT,
        Ilosc_lokali_w_budynku INTEGER,
        Powierzchnia_uzytkowa INTEGER,
        Rodzaj_budynku TEXT,
        Typ_budynku TEXT,
        Odwiedzony TEXT,
        Data_Odwiedzin DATE,             
        Godzina_Odwiedzin TEXT,
        ID_ANKIETER INTEGER
        )""")
    conection.commit()

def wpisz():
    with open("Adresy1.csv", 'r') as file:
        data = []
        for row in file:
            data.append(row.split(";"))
        data = data[1::]
        i = 1
        for row in data:
            row[ len(row) - 1 ] = ''
            row.append('')
            database.execute(f"""
                    INSERT INTO Adresy
                    VALUES ({i}, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, row)
            i += 1
            conection.commit()

def wypisz():
    database.execute("SELECT * FROM Adresy")
    conection.commit()
    data = database.fetchall()
    for row in data:
        print(row)

tworzenie_tabeli_adresy()
wpisz()
wypisz()
conection.close()
