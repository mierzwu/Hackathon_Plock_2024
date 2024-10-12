import smtplib, ssl, sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders


    

def send_email(email:str,access_code:str) -> None: 
       
    port = 587 
    smtp_server = "smtp.gmail.com" 
    sender_email = "ekodoradcaplock@gmail.com" 
    receiver_email = email
    password = 'rfjn wizz nfbw zpko'
    body = 'Twój personalny kod do wysłania podania o dofinansofanie na zmianę ogrzewania to: '+str(access_code)+' aby go wykorzystać przejdź na stronę: http://192.168.150.174:5501/dofinansowanie/wniosek_formularz.html'
        
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "Dofinansowanie na ogrzewanie"
    msg.attach(MIMEText(body,"plain"))

    context = ssl.create_default_context()
        
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        
        print("email sent")#debug
        server.quit()


