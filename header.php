<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="<?php global $page_description; echo $page_description; ?>">

  <title><?php is_front_page() ? bloginfo('description') : wp_title(''); ?> - <?php bloginfo('name'); ?></title>
  <link rel="shortcut icon" type="image/x-icon" href="<?php echo esc_url( get_template_directory_uri() ); ?>/favicon.ico">
  <link rel="apple-touch-icon-precomposed" href="<?php echo esc_url( get_template_directory_uri() ); ?>/favicon-152.png">
  <!--[if lt IE 9]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->

  <link href="<?php echo esc_url( get_template_directory_uri() ); ?>/app.css" rel="stylesheet">

  <?php wp_head(); ?>
</head>

<body>
  <span class="loader"></span>
  <header class="header">
    <div class="header__inner">
      <h1 class="header__title">
        <a href="/">Trevan Hetzel</a>
      </h1>

      <svg class="header__search" version="1.1" x="0px" y="0px" width="20.9px" height="21px" viewBox="0 0 20.9 21" enable-background="new 0 0 20.9 21" xml:space="preserve">
        <path fill="#FFFFFF" d="M20.8,19l-4.9-4.9c1.1-1.5,1.8-3.3,1.8-5.3c0-4.9-4-8.8-8.8-8.8C4,0,0,4,0,8.8s4,8.8,8.8,8.8 c1.9,0,3.7-0.6,5.2-1.7l4.9,4.9c0.2,0.2,0.5,0.2,0.7,0l1.2-1.2C21,19.5,21,19.2,20.8,19z M2.6,8.8c0-3.4,2.8-6.2,6.2-6.2 S15,5.4,15,8.8c0,3.4-2.8,6.2-6.2,6.2S2.6,12.3,2.6,8.8z"/>
      </svg>

      <ul class="header__nav">
        <li class="header__nav__item">
          <a href="/">Articles</a>
        </li>
        <li class="header__nav__item">
          <a href="/projects">Projects</a>
        </li>
        <li class="header__nav__item">
          <a href="http://hetzelcreative.com" data-bypass>Consulting</a>
        </li>
        <li class="header__nav__item">
          <a href="/speaking">Speaking</a>
        </li>
        <li class="header__nav__item">
          <a href="/about">About</a>
        </li>
      </ul>

      <a href="#" class="header__hamburger"><span></span></a>
    </div>
  </header>

  <div class="wrapper">
