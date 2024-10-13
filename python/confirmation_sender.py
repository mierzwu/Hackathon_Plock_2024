import smtplib, ssl, sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders


    

def send_email(email:str,data:str,godz:str) -> None: 
       
    port = 587 
    smtp_server = "smtp.gmail.com" 
    sender_email = "ekodoradcaplock@gmail.com" 
    receiver_email = email
    password = 'rfjn wizz nfbw zpko'
    body = 'Przedstawiciel projektu ekodoradca pojawi się '+str(data)+' około godziny '+str(godz)+f''' 
    wiadomość wysłana automatycznie porszę na nią nie odpowiadać :)'''
        
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "Potwierdzenie wizyty"
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

send_email(sys.argv[1],sys.argv[2],sys.argv[3])