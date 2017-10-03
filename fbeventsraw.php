<?php

error_reporting(-1);
ini_set('display_errors', 'On');

$app_id = "475486162662346";
$app_secret = "c9887bb8358b2a88a5d83dc9c3bf6d2e";


require 'vendor/autoload.php';

require __DIR__ . '/vendor/facebook/php-sdk-v4/autoload.php';

use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\GraphUser;
use Facebook\FacebookRequestException;
use Facebook\FacebookJavaScriptLoginHelper;

FacebookSession::setDefaultApplication($app_id,$app_secret);

$session = new FacebookSession($app_id."|".$app_secret);

try {
    // Get a list of pages with you as admin
    $request = new FacebookRequest($session, 'GET', '/vejdiven/events');

    $pageList = $request->execute()->getGraphObject()->asArray();

    var_dump($pageList);


} catch (FacebookRequestException $e) {
    echo 'Request error: ' . $e->getMessage();
    exit;
}
