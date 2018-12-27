<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function mailer($mailTo, $subject, $message)
{
    try {

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = "smtp.mail.ru";
        $mail->SMTPAuth = true;
        $mail->Username = "alex-sert2012@mail.ru";
        $mail->Password = "500mars";
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        $mail->setFrom("alex-sert2012@mail.ru", 'Mailer');
        $mail->addAddress("$mailTo");
        $mail->addReplyTo('alex-sert2012@mail.ru');
        $mail->CharSet = 'UTF-8';
        $mail->isHTML(true);
        $mail->Subject = "$subject";
        $mail->Body = "$message";
        $mail->send();    
        
    } catch (Exception $e) {
        echo 'Сообщение не может быть отправленно: ', $mail->ErrorInfo;
    }
}