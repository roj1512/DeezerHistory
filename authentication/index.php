<?php
require("config.php");
$code = $_GET["code"];
if (!isset($code)) {
    header(
        "Location: "
        . "$REDIR_URL/auth"
    );
    exit();
}
$uri          = "https://connect.deezer.com/oauth/access_token.php?app_id=$ID&secret=$SECRET&code=$code";
$contents     = parse_str(file_get_contents($uri), $result);
$access_token = $result["access_token"];
header(
    "Location: "
    . "https://t.me/"
    . $BOT_USERNAME
    . "?start=sak"
    . "$access_token"
);
?>
