<?php

header('Access-Control-Allow-Origin: *');

$calendars = json_decode($_GET['calendars']);

$calendar_data = array();

foreach ($calendars as $index => $calendar) {
  array_push($calendar_data, file_get_contents($calendar));
}

echo json_encode($calendar_data);
