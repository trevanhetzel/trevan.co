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

  $posts = get_posts( array(
    'posts_per_page' => 10,
    's' => $searchTerm
  ));

  $result = array();
  
  foreach ($posts as $post) {
    $result[] = array(
      'title' => $post->post_title,
      'slug' => $post->post_name,
      'excerpt' => apply_filters('wp_trim_excerpt', $post->post_content)
    );
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
  $posts = get_posts( array(
    'name' => $_GET['slug'],
    'posts_per_page' => 1
  ));

  $result = array();

  if ($posts) {
    $result[] = array(
      'title' => $posts[0]->post_title,
      'slug' => $posts[0]->post_name,
      'content' => apply_filters('the_content', $posts[0]->post_content)
    );
  }

  if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    echo json_encode($result);
    die;
  } else {
    header('Location: '.$_SERVER['HTTP_REFERER']);
  }
}

?>
