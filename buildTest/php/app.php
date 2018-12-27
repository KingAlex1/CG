<?php

include('functions.php');
include('PHPmailer.php');
include('recaptcha.php');



if (submit()) {

    $data = checkData($_POST);

    pdoQuery("INSERT INTO clients (name, email,phone) 
VALUES (:name, :email, :phone)",
        ['name' => $data['name'], 'email' => $data['email'], 'phone' => $data['phone']]);

    pdoQuery("INSERT INTO orders (user_id,product_name, product_code, description) 
VALUES (:user_id, :product_name, :product_code, :description)",
        ['user_id' => $id, 'product_name' => $data['good'], 'product_code' => $data['code'], 'description' => $data['description']]);

    $subject = 'order';
    $message = "
  <p>запрос </p>
  <p>Название продукции: {$data['good']} </p>
  <p>Код ТН ВЭД продукции : {$data['code']}  </p>
  <p>Описание: {$data['description']}</p> 
  <p>Почта: {$data['email']}</p> 
  <p>Описание: {$data['phone']}</p> 
  <p>Ф.И.О.: {$data['name']}</p> 
  ";


    mailer('alex-sert2012@mail.ru', $subject, $message);

    $message = "Спасибо, Ваш запрос отправлен, ожидайте, скоро с Вами свяжутся наши сотрудники";  
    $arr[] = $message;
    $arr[] = true;
    print json_encode($arr);

} else {
    
    $message = "Извините, вы не прошли проверку, попробуйте еще раз";
    $arr[] = $message;
    $arr[] = false;
    print json_encode($arr);
}