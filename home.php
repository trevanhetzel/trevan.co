<?php get_header(); ?>

<?php
$context = Timber::get_context();
$context['posts'] = Timber::get_posts();
$context['pagination'] = Timber::get_pagination();
Timber::render('templates/home.twig', $context);
?>

<?php get_footer(); ?>
