<?php

include('functions.php');
include('PHPmailer.php');

$prepare = pdoQuery("INSERT INTO unsubscribed (email) VALUES (:email)", ['email' => $_GET['email']]);

$subject = 'unsubscribe';
$message = "{$_GET['email']}" ."\n";

mailer('alex-sert2012@mail.ru', $subject, $message);

$filename = "./unsubscribed.txt";
file_put_contents($filename, $message, FILE_APPEND);

echo "Ваша почта {$_GET['email']} удалена из рассылки. Спасибо ";