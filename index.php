<?php get_header(); ?>

<?php
$data = Timber::get_context();
$data['posts'] = Timber::get_posts();
Timber::render('templates/index.twig', $data);
?>

<?php get_footer(); ?>
