<?php
/**
 *
 * @author      Jesús Olazagoitia (@goiblas)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Schedule content block
 * Description: Show or hide your content when you want
 * Version:     2.0.1
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
	load_plugin_textdomain( 'shedule-content-block', false, plugin_dir_path( __FILE__ ) . '/languages' );
}
add_action( 'init', 'schedule_content_block_load_textdomain' );

function init_schedule_content_block() {
	if(!function_exists('register_block_type')) {
		return;
	}

    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	wp_register_script(
		'schedule_content_block_script',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
	
	wp_register_style(
        'schedule_content_block_css_editor',
        plugins_url( 'assets/css/blocks.editor.css', __FILE__ ),
        [],
		$asset_file['version']
	);

	// Register block
	$date = new DateTime();
    register_block_type( 'schedule-content-block/schedule-content-block', array(
		'editor_script' => 'schedule_content_block_script',
		'editor_style' => 'schedule_content_block_css_editor',
		'attributes' => array(
			'date' => array(
				'type' => 'number',
				'default' => $date->getTimestamp() * 1000
			),
			'hiddenStart' => array(
				'type' =>  'boolean',
				'default' => true
			),
			'isMultiDate' => array(
				'type' => 'boolean',
				'default' => false
			),
			'dates'=> [
				'type' => 'array'
			]
		),
		'render_callback' =>  'render_schedule_content_block',
	 ) );
}

add_action('init', 'init_schedule_content_block');

/**
 * Render in frontend 
 */
function render_schedule_content_block($settings, $content = '') {
	if($settings['isMultiDate']) {
		return render_multidate_schedule_content_block($settings, $content);
	} else {
		return render_singledate_schedule_content_block($settings, $content);
	}
}

function render_multidate_schedule_content_block($settings, $content) {
	$dates = $settings['dates'];

	if(empty($dates)) {
		return $content;
	}

	$date = new DateTime();
	$now = $date->getTimestamp();
	$hidden = false;

	foreach ($dates as $key => $value) {
		if($value['timestamp'] / 1000 <= $now) {
			$hidden = $value['hidden'];
		}
	}

	if(!$hidden) {
		return $content;
	}
}
function render_singledate_schedule_content_block($settings, $content) {

	$hiddenStart = $settings['hiddenStart'];

	$block_date = $settings['date'] / 1000;
	$date = new DateTime();
	$now = $date->getTimestamp();

	if($hiddenStart) {
		if( $block_date <= $now) {
			return $content;
		}
	} else {
		if( $block_date >= $now) {
			return $content;
		}
	}
}