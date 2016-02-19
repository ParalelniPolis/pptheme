<?php

error_reporting(-1);
ini_set('display_errors', 'On');

$app_id = "xxxxxxxx";
$app_secret = "xxxxxx";


require 'vendor/autoload.php';

require __DIR__ . '/fb/autoload.php';

use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\GraphUser;
use Facebook\FacebookRequestException;
use Facebook\FacebookJavaScriptLoginHelper;

FacebookSession::setDefaultApplication($app_id,$app_secret);

$session = new FacebookSession($app_id."|".$app_secret);

try {
    // Get a list of pages with you as admin
    $request = new FacebookRequest($session, 'GET', '/'.$_GET["page"].'/events');

    $pageList = $request->execute()->getGraphObject()->asArray();

    $events_list = array();

    foreach ($pageList["data"] as $event) {

        $event_stamp = strtotime($event->start_time);

        $event->timestamp = $event_stamp;

        $events_list[] = $event;

    }

    echo json_encode($events_list);


} catch (FacebookRequestException $e) {
    echo 'Request error: ' . $e->getMessage();
    exit;
}
