<?php

$appId = "";
$appSecret = "";
$accessToken = "";
$pageName = "";

require_once __DIR__ . '/vendor/autoload.php';

$fb = new Facebook\Facebook([
    'app_id' => $appId,
    'app_secret' => $appSecret,
    'default_graph_version' => 'v3.1',
	'default_access_token' => $accessToken
]);

try {
    $response = $fb->get('/' . $pageName . '/events');
} catch(Facebook\Exceptions\FacebookResponseException $e) {
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}

$pageList = $response->getGraphEdge()->asArray();
$eventsList = array();
foreach ($pageList as $event) {
	$event['timestamp'] = $event['start_time']->getTimestamp();
	$event['start_time'] = $event['start_time']->format(DATE_ISO8601);
	$event['end_time'] = $event['end_time']->format(DATE_ISO8601);
	$eventsList[] = $event;
}

echo json_encode($eventsList);
