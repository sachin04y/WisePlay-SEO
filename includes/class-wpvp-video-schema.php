<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Zpvp_Video_Schema {

    private $allowed_post_types = array(
        'post',
        'page'
    );

    public function __construct() {

        add_action( 'the_content', array( $this, 'extract_wiseplay_videos' ) );
        add_action( 'wp_footer', array( $this, 'generate_schema' ) );
    }

    private function if_post_allowed() {

        if ( in_array( get_post_type(), $this->allowed_post_types ) ) {
            return true;
        } else {
            return false;
        }
    }

    public function extract_wiseplay_videos( $content ) {

        global $wiseplay_videos_data;

        if ( ! $this->if_post_allowed() ) {
            return $content; 
        }

        if ( empty( $content ) ) {
            return $content;
        }

        $dom = new DOMDocument();
        
        // set error level
        $internal_errors = libxml_use_internal_errors( true );
        $dom->loadHTML( mb_convert_encoding( $content, 'HTML-ENTITIES', 'UTF-8' ) );
        // Restore error level
        libxml_use_internal_errors( $internal_errors );

        $xpath       = new DOMXPath($dom);
        $video_nodes = $xpath->query('//wiseplay-video');
        $videos      = array();

        foreach ( $video_nodes as $video_node ) {
            
            $video_attributes = array();
            
            foreach ( $video_node->attributes as $attr ) {
                $video_attributes[ $attr->name ] = $attr->value;
            }
            $videos[] = $video_attributes;
        }

        $wiseplay_videos_data = $videos;

        return $content;
    }

    public function generate_schema() {

        global $wiseplay_videos_data;

        $defaults = array(
            'name'        => get_the_title(),
            'description' => get_the_title(),
            'upload_date' => get_the_modified_date('c')
        );

        $video_schema = array(
            "@context" => "http://schema.org",
            "@graph"   => array()
        );

        foreach ( $wiseplay_videos_data as $video ) {

            $video_item = array(
                '@type'        => 'VideoObject',
                'name'         => isset( $video['name'] ) && $video['name'] ? $video['name'] : $defaults['name'],
                'description'  => isset( $video['description'] ) && $video['description'] ? $video['description'] : $defaults['description'],
                'uploadDate'   => isset( $video['upload_date'] ) && $video['upload_date'] ? $video['upload_date'] : $defaults['upload_date'],
                'thumbnailUrl' => isset( $video['poster'] ) && $video['poster'] ? $video['poster'] : '',
                'contentUrl'   => isset( $video['source'] ) && $video['source'] ? $video['source'] : ''
            );
            $video_schema['@graph'][] = $video_item;
        }

        $json_ld_script = '<script type="application/ld+json" id="wiseplay-video-schema">' . wp_json_encode( $video_schema ) . '</script>';

        echo $json_ld_script;
    }
}

new Zpvp_Video_Schema();