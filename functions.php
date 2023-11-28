<?php
/**
 * Plugin Name:       WisePlay-SEO Video Player
 * Description:       Add videos - Lazyload videos and prevent youtube embedded player clicks with Video Schema support. Supports wp-block and Elementor.
 * Requires at least: 5.3
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Sachin Yadav
 * Text Domain:       wpvp
 */

// Define plugin root directory path
define('WPVP_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WPVP_PLUGIN_URI', plugin_dir_url(__FILE__));

/**
 * Registers the block using `block.json`
 */
function wpvp_block_init() {

    register_block_type( WPVP_PLUGIN_DIR . '/build/video-block' );

}
add_action( 'init', 'wpvp_block_init' );

function wpvp_scripts() {
	// wp_register_script( 'wpvp-script', WPVP_PLUGIN_URI . 'build/wiseplayPlayer.js' );
	// wp_register_style( 'wpvp-widget-style', WPVP_PLUGIN_URI . 'build/wiseplayPlayer.css' );
	// wp_enqueue_script( 'wpvp-script' );
    // wp_enqueue_style('wpvp-widget-style');

    require_once( WPVP_PLUGIN_DIR . 'assets/scripts.php' );
}

add_action( 'admin_enqueue_scripts', 'wpvp_scripts' );
add_action( 'wp_footer', 'wpvp_scripts' );

/**
 * Register elementor wiseplay video widget.
 *
 * Include widget file and register widget class.
 *
 * @since 1.0.0
 * @param \Elementor\Widgets_Manager $widgets_manager Elementor widgets manager.
 * @return void
 */
function wpvp_register_video_widget( $widgets_manager ) {
	require_once( WPVP_PLUGIN_DIR . 'includes/elementor/widget.php' );
	$widgets_manager->register( new Elementor_Video_Widget() );
}
add_action( 'elementor/widgets/register', 'wpvp_register_video_widget' );


require_once( WPVP_PLUGIN_DIR . 'includes/class-wpvp-video-schema.php' );
