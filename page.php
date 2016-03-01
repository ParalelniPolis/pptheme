<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/views/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
if (is_front_page() ) {
    $context['header_transparent'] = 'header--transparent';
}

$args = array(
    'post_type' => 'post'
);
$context['blog_posts'] = Timber::get_posts($args);

$timber_carousel_items = array();
$carousel_item = types_child_posts('carousel-item');
foreach ($carousel_item as $carousel_item) {
    array_push($timber_carousel_items, new TimberPost($carousel_item->ID));
}

$timber_hero_elements = array();
$hero_elements = types_child_posts('hero-element');
foreach ($hero_elements as $hero_element) {
    array_push($timber_hero_elements, new TimberPost($hero_element->ID));
}

$timber_citation_elements = array();
$citations = types_child_posts('citation');
foreach ($citations as $citation) {
    array_push($timber_citation_elements, new TimberPost($citation->ID));
}

$context['carousel_items'] = $timber_carousel_items;
$context['hero_elements'] = $timber_hero_elements;
$context['citations'] = $timber_citation_elements;

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
