<?php

// Return all posts
add_action( 'wp_ajax_return_all', 'return_all' );
add_action( 'wp_ajax_nopriv_return_all', 'return_all' );

// Return single post
add_action( 'wp_ajax_return_one', 'return_one' );
add_action( 'wp_ajax_nopriv_return_one', 'return_one' );

// Return all posts
function return_all () {
  if ($_GET['s']) {
    $searchTerm = $_GET['s'];
  } else {
    $searchTerm = '';
  }

  $query = new WP_Query( array(
    'posts_per_page' => 10,
    's' => $searchTerm
  ));

  $result = array();
  
  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();
      global $post;

      $categories = get_the_category($post->ID);

      $cats = array();

      foreach ($categories as $key=>$category) {
        $cats[$key] = $category->name;
      }

      $result[] = array(
        'title' => get_the_title(),
        'slug' => $post->post_name,
        'date' => get_the_date(),
        'day' => get_the_date('j'),
        'month' => get_the_date('M'),
        'excerpt' => apply_filters('wp_trim_excerpt', $post->post_content),
        'categories' => $cats
      );
    }
  }

  if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    echo json_encode($result);
    die;
  } else {
    header('Location: '.$_SERVER['HTTP_REFERER']);
  }
}

// Return single post
function return_one () {
  $query = new WP_Query( array(
    'name' => $_GET['slug'],
    'posts_per_page' => 1
  ));

  $result = array();

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();
      global $post;

      $categories = get_the_category($post->ID);

      $cats = array();

      foreach ($categories as $key=>$category) {
        $cats[$key] = $category->name;
      }

      $result[] = array(
        'title' => get_the_title(),
        'slug' => $post->post_name,
        'date' => get_the_date(),
        'day' => get_the_date('j'),
        'month' => get_the_date('M'),
        'content' => apply_filters('the_content', $post->post_content),
        'categories' => $cats
      );
    }
  }

  if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    echo json_encode($result);
    die;
  } else {
    header('Location: '.$_SERVER['HTTP_REFERER']);
  }
}

?>
