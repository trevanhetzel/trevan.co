<?php

  // Remove WP emoji stuff
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
    
  // Trim excerpt
  require get_template_directory() . '/inc/excerpt.php';

  // Ajax setup
  require get_template_directory() . '/inc/ajax.php';

?>
