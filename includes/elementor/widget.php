<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


/**
 * Elementor Video Widget.
 *
 * @since 1.0.0
 */
class Elementor_Video_Widget extends \Elementor\Widget_Base {

	/**
	 * Get widget name.
	 *
	 * Retrieve widget name.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'wiseplay-video-player';
	}

	/**
	 * Get widget title.
	 *
	 * Retrieve Video widget title.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return string Widget title.
	 */
	public function get_title() {
		return esc_html__( 'WisePlay Video', 'wpvp' );
	}

	/**
	 * Get widget icon.
	 *
	 * Retrieve Video widget icon.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'eicon-play-o';
	}

	/**
	 * Get widget categories.
	 *
	 * Retrieve the list of categories the Video widget belongs to.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return [ 'general' ];
	}

	/**
	 * Get widget keywords.
	 *
	 * Retrieve the list of keywords the Video widget belongs to.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return array Widget keywords.
	 */
	public function get_keywords() {
		return [ 'video', 'player', 'youtube', 'embed', 'wiseplay' ];
	}

	/**
	 * Register Video widget controls.
	 *
	 * Add input fields to allow the user to customize the widget settings.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function register_controls() {

		$this->start_controls_section(
			'wiseplay_video_section',
			[
				'label' => esc_html__( 'WisePlay Video Player', 'wpvp' ),
			]
		);

        $this->add_control(
			'video_type',
			[
				'label' => esc_html__( 'Source', 'wpvp' ),
				'type' => \Elementor\Controls_Manager::SELECT,
				'default' => 'youtube',
                'options' => [
					'youtube' => esc_html__( 'YouTube', 'wpvp' ),
					'hosted'  => esc_html__( 'Self Hosted', 'wpvp' ),
				],
			]
		);

		$this->add_control(
			'url',
			[
				'label' => esc_html__( 'Link', 'wpvp' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'input_type' => 'url',
				'placeholder' => esc_html__( 'Enter your URL', 'wpvp' ),
			]
		);

        $this->add_control(
			'add_yt_poster',
			[
				'label' => esc_html__( 'Add Poster', 'wpvp' ),
				'type' => \Elementor\Controls_Manager::SWITCHER,
                'description' => 'The poster is fetched from the youtube itself. If enabled, you can add your own poster image for youtube.',
				'condition' => [
					'video_type' => 'youtube',
				]
			]
		);

        $this->add_control(
			'poster',
			[
				'label' => esc_html__( 'Poster Image', 'wpvp' ),
				'type' => \Elementor\Controls_Manager::MEDIA,
                'dynamic' => [
					'active' => true,
				],
				'default' => [
					'url' => \Elementor\Utils::get_placeholder_image_src(),
				],
                'conditions' => [
                    'relation' => 'or',
                    'terms' => [
                        [
                            'name' => 'video_type',
                            'operator' => '===',
                            'value' => 'hosted',
                        ],
                        [
                            'name' => 'add_yt_poster',
                            'operator' => '===',
                            'value' => 'yes',
                        ],
                    ],
                ],
			]
		);

		$this->end_controls_section();

        $this->start_controls_section(
			'video_seo',
			[
				'label' => esc_html__( 'SEO', 'wpvp' ),
			]
		);
        $this->add_control(
			'name',
			[
				'label' => esc_html__( 'Name', 'wpvp' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'input_type' => 'text',
				'placeholder' => esc_html__( 'Name', 'wpvp' ),
			]
		);

        $this->add_control(
			'description',
			[
				'label' => esc_html__( 'Description', 'wpvp' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'input_type' => 'text',
				'placeholder' => esc_html__( 'Description', 'wpvp' ),
			]
		);
		$this->end_controls_section();

	}

	/**
	 * Render Video widget output on the frontend.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function render() {

        $youtube_pattern = '/(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/]{11})/';
        $settings        = $this->get_settings_for_display();
        $poster          = '';

        if ( isset( $settings['poster'] ) && isset( $settings['poster']['url'] ) ) {
			$poster = $settings['poster']['url'];

		} else if ( 'youtube' === $settings['video_type'] ) {
            preg_match( $youtube_pattern, $settings['url'], $matches );
            if ( isset( $matches[1] ) ) {
                $poster = "https://img.youtube.com/vi/$matches[1]/maxresdefault.jpg";
            }
        }

        echo '<wiseplay-video type="' . $settings['video_type'] . '" source="' . $settings['url'] . '" poster="' . $poster . '"  name="' . $settings['name'] . '" description="' . $settings['description'] . '">';
        echo '</wiseplay-video>';
	}
    
    public function get_script_depends() {
		return [ 'widget-script' ];
	}

}