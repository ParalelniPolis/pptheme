<?php

error_reporting(-1);
ini_set('display_errors', 'On');

$appId = "";
$appSecret = "";
$token = "";
$pageName = "";

require_once __DIR__ . '/vendor/autoload.php';

$fb = new Facebook\Facebook([
    'app_id' => $appId,
    'app_secret' => $appSecret,
    'default_graph_version' => 'v3.1'
]);

try {
    $response = $fb->get('/' . $pageName . '/events', $token);
} catch(Facebook\Exceptions\FacebookResponseException $e) {
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}

$pageList = $response->getGraphEdge()->asArray();
var_dump($pageList);
