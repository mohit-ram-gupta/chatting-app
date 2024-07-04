<?php 
  session_start();
  include('connect_db.php');
  print_r($_SESSION);
  die;
//   session_unset();
//   session_destroy();
  ?>