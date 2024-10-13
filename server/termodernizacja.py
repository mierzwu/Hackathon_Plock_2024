import sqlite3
import random
conection = sqlite3.connect('baza_piece.db')
database = conection.cursor()

def tworzenie_tabeli_termodernizacji():
    
    database.execute(f"""CREATE TABLE IF NOT EXISTS Termodernizacja (
        ID INTEGER PRIMARY KEY,
        Past_ocieplenie_scian TEXT,
        Past_ocieplenie_scian_grubosc INTEGER,
        Past_ocieplenie_dachu TEXT,
        Past_ocieplenie_stropu TEXT,
        Past_wymiana_okien TEXT,
        Past_wymiana_drzwi TEXT,
        Ocieplenie_scian TEXT,
        Ocieplenie_scian_grubosc INTEGER,
        Ocieplenie_dachu TEXT,
        Ocieplenie_stropu TEXT,
        Wymiana_okien TEXT,
        Wymiana_drzwi TEXT
        )""")
    conection.commit()
    
def wpisz():
    i=1
    for i in range(30):
        time = ["F","P"]
        temp = random.randint(0, 1)
        if(time[temp]=="F"):
            temp1=""
            dlugosc = [5,10,15]
            temp2 = random.randint(0,2)
            temp3 = ["tak","nie"]
            database.execute(f"""
                 INSERT INTO Termodernizacja
                VALUES ("{i+1}", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,[temp1,temp1,temp1,temp1,temp1,temp1,temp3[temp],dlugosc[temp2],temp3[temp],temp3[temp],temp3[temp],temp3[temp]])
            conection.commit()
        if(time[temp]=="P"):
            temp1=""
            dlugosc = [5,10,15]
            temp2 = random.randint(0,2)
            temp3 = ["tak","nie"]
            database.execute(f"""
                 INSERT INTO Termodernizacja
                VALUES ("{i+1}", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,[temp3[temp],dlugosc[temp2],temp3[temp],temp3[temp],temp3[temp],temp3[temp],temp1,temp1,temp1,temp1,temp1,temp1])
            conection.commit()


def wypisz():
    database.execute("SELECT * FROM Termodernizacja")
    conection.commit()
    data = database.fetchall()
    for row in data:
        print(row)

tworzenie_tabeli_termodernizacji()
wpisz()
wypisz()
conection.close()

