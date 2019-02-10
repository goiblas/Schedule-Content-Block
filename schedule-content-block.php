<?php
/**
 *
 * @author      Jesús Olazagoitia (@goiblas)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Schedule content block
 * Description: Show your content when you want
 * Version:     1.0.0
 * Author:      Jesús Olazagoitia
 * Author URI:  https://goiblas.com
 * Text Domain: schedule-content-block
 * Domain Path: /languages
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */


//  Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

function schedule_content_block_load_textdomain() {
	load_plugin_textdomain( 'shedule-content-block', false, basename( __DIR__ ) . '/languages' );
}
add_action( 'init', 'schedule_content_block_load_textdomain' );


function init_schedule_content_block() {
	if(!function_exists('register_block_type')) {
		return;
	}

	$block_path = '/assets/js/editor.blocks.js';
    $editor_style_path = '/assets/css/blocks.editor.css';
    
	wp_enqueue_script(
		'js-eventos-plugin-demo',
		plugins_url($block_path, __FILE__),
		[ 'wp-i18n', 'wp-element', 'wp-editor', 'wp-blocks', 'wp-components' ],
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);

	wp_enqueue_style(
		'css-editor-eventos-plugin-demo',
		plugins_url($editor_style_path, __FILE__),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $editor_style_path )
	);


	// Register block
    register_block_type( 'schedule-content-block/schedule-content-block', array(
		'attributes' => array(
			'date' => array(
				'type' => 'string',
				'default' => new DateTime()
			),
			'hiddenStart' => array(
				'type' =>  'boolean',
				'default' => true
			)
		),
		'render_callback' =>  'render_schedule_content_block',
	 ) );
}

add_action('init', 'init_schedule_content_block');



/**
 * Render in frontend 
 */
function render_schedule_content_block($settings, $content = '') {
	$hiddenStart = $settings['hiddenStart']; 
	$date = strtotime($settings['date']);
	$now = strtotime("now");

	if($hiddenStart) {
		if( $date <= $now) {
			return $content;
		}
	} else {
		if( $date >= $now) {
			return $content;
		}
	}

}
