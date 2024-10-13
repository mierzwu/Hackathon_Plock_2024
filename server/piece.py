import sqlite3
import random
conection = sqlite3.connect('baza_piece.db')
database = conection.cursor()

def tworzenie_tabeli_piece():
    
    database.execute(f"""CREATE TABLE IF NOT EXISTS Piece (
        ID INTEGER PRIMARY KEY,
        TYP_PIECA TEXT,
        LICZBA_SZTUK INTEGER,
        OGRZEWANIE TEXT,
        CWU TEXT,
        POMPA_CIEPLA TEXT,
        PALIWO TEXT,
        ILOSC_PALIWA REAL,
        EMAIL TEXT,
        KOD TEXT
        )""")
    conection.commit()
    
def wpisz():
    email = ""#test email
    i=1
    for i in range(30):
        typ = ["na paliwo stałe","Ogrzewanie olejowe","Ogrzewanie gazowe","Ogrzewanie elektryczne","Ogrzewanie z m.s.c.","OZE","Inne źródło ogrzewania"]
        temp = random.randint(0, 6)
        l_sztuk = [1,2,3,4,5]
        temp1 = random.randint(0, 4)
        ogrzewanie = "tak"
        cwu = "tak"
        pompa_ciepla = "nie"
        if(typ[temp]=="na paliwo stałe"):
                ogrzewanie = "nie"
                cwu = "nie"
        if(typ[temp]=="OZE"):
                pompa_ciepla = "tak"

        paliwo = ["orzech","kostka","groszek","miał","węgiel brunatny","Drewno kawałkowe","Pellet/Brykiet","Inna biomasa","Gaz przewodowu","Gaz butla/zbiornik LPG/zbiornik"]
        temp5 = random.randint(0, 9)
        ilosc_paliwa = [1,2,3,4]
        temp6 = random.randint(0, 3)
        database.execute(f"""
            INSERT INTO Piece
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,[i+1,typ[temp],l_sztuk[temp1],ogrzewanie,cwu,pompa_ciepla,paliwo[temp5],ilosc_paliwa[temp6],email,''])
        conection.commit()


def wypisz():
    database.execute("SELECT * FROM Piece")
    conection.commit()
    data = database.fetchall()
    for row in data:
        print(row)

tworzenie_tabeli_piece()
wpisz()
wypisz()
conection.close()
