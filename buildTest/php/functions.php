<?php

function pdoConnect()
{
    static $pdo;
    if ($pdo === null) {
        require_once('config.php');
        $dsn = "mysql:host={$config['hostname']};dbname={$config['dbname']};charset=utf8";
        $pdo = new PDO($dsn, $config['dbuser'], $config['dbpassowrd']);
    }
    return $pdo;
}

function pdoQuery($sql, $params = [])
{
    $pdo = pdoConnect();
    $prepare = $pdo->prepare($sql);
    $prepare->execute($params);
    return $prepare;
}

function checkData($data)
{
    $keys = [
        'good',
        'code',
        'description',
        'email',
        'phone',
        'name'
    ];
    $result = [];

    foreach ($keys as $value) {
        $result[$value] = (!empty($data[$value])) ? strip_tags (trim($data[$value])) : null;
    }
    return $result;
}


