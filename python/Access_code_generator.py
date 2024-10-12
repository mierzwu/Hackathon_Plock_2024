import random
import string
import sqlite3
import Eko_access_code_sender

def generate_code() ->str:
    pool = string.ascii_letters + string.digits
    code = ''.join(random.choice(pool) for _ in range(13))
    print(code)
    return code



conection = sqlite3.connect('baza_piece.db')
database = conection.cursor()
code = generate_code()
database.execute(f"""
    INSERT INTO Adresy (EMAIL, KOD)
    VALUES (?, ?)
    """, ["mierzwickiszymon1@gmail.com",code])
conection.commit() #email do wyjebania w przyszłości


database.execute(f'''SELECT EMAIL
                             FROM Adresy
                             WHERE KOD = '{code}'
                         ''')


conection.commit()
email = database.fetchall()[0][0]
Eko_access_code_sender.send_email(email,code)

conection.close()