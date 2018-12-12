<?php
require('../../voiceit-php-backend/VoiceIt2WebBackend.php');
include('../config.php');

// Session must be started here since VoiceIt2WebBackend will output the 
// JSON object response and we won't be able to create the session afterwards
session_start();

$myVoiceIt = new VoiceIt2WebBackend($VOICEIT_API_KEY, $VOICEIT_API_TOKEN);

function voiceItResultCallback($jsonObj){
  $callType = strtolower($jsonObj["callType"]);
  $userId = $jsonObj["userId"];
  if(stripos($callType, "verification") !== false){
    if($jsonObj["jsonResponse"]["responseCode"] == "SUCC"){
      // User was successfully verified so lookup user details via
      // VoiceIt UserId and add to the session
      $_SESSION["userId"] = $userId;
    }
  }
}

$myVoiceIt->InitBackend($_POST, $_FILES, voiceItResultCallback);
?>
