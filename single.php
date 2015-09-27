<?php get_header(); ?>

<?php
$data = Timber::get_context();
$data['post'] = new TimberPost();
Timber::render('templates/article.twig', $data);
?>

<?php get_footer(); ?>
