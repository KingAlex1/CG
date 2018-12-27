<?php

function submit()
{
    $remoteIp = $_SERVER['REMOTE_ADDR'];
    $gRecaptchaResponse = $_REQUEST['g-recaptcha-response'];
    $recaptcha = new \ReCaptcha\ReCaptcha('6LcUPIEUAAAAABj-MZ50ICHWTVKl8ymdvwcYtwPz');
    $resp = $recaptcha->verify($gRecaptchaResponse, $remoteIp);
    if ($resp->isSuccess()) {
      return true;
    } else {
      return false; 
    }

}