import random
import string
import sqlite3
import access_code_sender


def generate_code() ->str:
    pool = string.ascii_letters + string.digits
    code = ''.join(random.choice(pool) for _ in range(13))
    print(code)
    return code




conection = sqlite3.connect('baza_piece.db')
database = conection.cursor()

for i in range (30):
    database.execute(f'''SELECT TYP_PIECA
                        FROM Piece
                        WHERE ID = "{i+1}"
                              ''')

    conection.commit()
    krytrium = database.fetchall()[0][0]

    if (krytrium=="na paliwo stałe"):
        code = generate_code()
        database.execute(f"""
            UPDATE Piece
            SET KOD = "{code}"
            WHERE ID = "{i+1}"
            """)
        conection.commit()


        database.execute(f'''SELECT EMAIL
                                 FROM Piece
                                 WHERE KOD = '{code}'
                             ''')

        conection.commit()
        email = database.fetchall()[0][0]
        #access_code_sender.send_email(email,code)

conection.close()