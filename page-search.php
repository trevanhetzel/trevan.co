<?php
global $bodyClass;
$bodyClass = 'search--open';
get_header(); ?>

<?php
Timber::render('templates/search.twig');
?>

<?php get_footer(); ?>
