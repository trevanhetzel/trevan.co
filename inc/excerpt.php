<?php

function trev_trim_excerpt( $text='' ) {
    $text = strip_shortcodes( $text );
    $text = apply_filters('the_content', $text);
    $text = str_replace(']]>', ']]&gt;', $text);
    $excerpt_length = apply_filters('excerpt_length', 75);
    $excerpt_more = apply_filters('excerpt_more', '...');
    return wp_trim_words( $text, $excerpt_length, $excerpt_more );
}

add_filter('wp_trim_excerpt', 'trev_trim_excerpt');

?>
