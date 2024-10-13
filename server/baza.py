import sqlite3

def stworz():
    connection = sqlite3.connect('baza_piece.db')
    database = connection.cursor()
    database.execute("""CREATE TABLE ANKIETERZY(
    ID INT PRIMARY KEY,
    IMIE VARCHAR(50) NOT NULL,
    NAZWISKO VARCHAR(50) NOT NULL,
    NUMER_TELEFONU VARCHAR(15),
    LOGIN VARCHAR(50) NOT NULL UNIQUE,
    HASLO VARCHAR(255) NOT NULL)"""
                     )
    connection.commit()
    connection.close()

def dodaj():
    lista = input('Podaj: ID, IMIE, NAZWISKO, NUMER_TELEFONU, LOGIN, HASLO\n').split(' ')
    connection = sqlite3.connect('baza_piece.db')
    database = connection.cursor()
    database.execute("""
                    INSERT INTO ANKIETERZY VALUES(?, ?, ?, ?, ?, ?)
                     """, lista)
    connection.commit()
    connection.close()

def wypisz():
    connection = sqlite3.connect('baza_piece.db')
    database = connection.cursor()
    database.execute("SELECT * FROM ANKIETERZY")
    connection.commit()
    print(database.fetchall())

def main():
    decyzja = int(input("1. Jeśli chcesz stworzyć baze, 2. jeśli chcesz dodać kolejnego ankietera\n"))

    if decyzja == 1:
        stworz()
    else:
        dodaj()

main()
wypisz()