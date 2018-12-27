<?php
/**
 * Created by PhpStorm.
 * User: alex-
 * Date: 13.12.2018
 * Time: 12:12
 */

session_start();

require "./vendor/autoload.php";
$appDir = realpath(__DIR__ . '/');

if ($_SERVER['REQUEST_URI'] == '/') {
    require_once($appDir . DIRECTORY_SEPARATOR . 'index.html');
    return 0;
}

// добавить заказ в бд

if (!empty($_POST) && $_SERVER['REQUEST_URI'] == '/order/add') {
    require_once($appDir . DIRECTORY_SEPARATOR . '/php/app.php');
    return 0;
}

// просмотр пользователей

if ($_SERVER['REQUEST_URI'] == "/admin/users") {
    require_once ('./php/functions.php');
    $prepare = pdoQuery("SELECT id FROM clients");
    $clients = $prepare->fetchAll(PDO::FETCH_ASSOC);
    $numberClients = count($clients);
    echo "Всего клиентов: " . $numberClients . "<br>";
    return 0;
}

// просмтр заказов
if ($_SERVER['REQUEST_URI'] === "/admin/orders"){
    require_once ('./php/functions.php');
    $prepare = pdoQuery("SELECT id FROM orders");
    $orders  = $prepare->fetchAll(PDO::FETCH_ASSOC);
    $allOrders = count($orders);
    echo "Вcего заказов: " . $allOrders;
}

// отписаться

if ($_SERVER['REQUEST_URI'] === "/unsubscribe/?email={$_GET['email']}"){
    
    require_once ($appDir.DIRECTORY_SEPARATOR.'php/unsubscribe.php');
    return 0;
    
}