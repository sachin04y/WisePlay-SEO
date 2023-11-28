import { registerBlockType } from '@wordpress/blocks';
const { withSelect } = wp.data;
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { bool } from 'prop-types';

registerBlockType( metadata.name, {
	icon: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.71371 0 0 6.71371 0 15C0 23.2863 6.71371 30 15 30C23.2863 30 30 23.2863 30 15C30 6.71371 23.2863 0 15 0ZM21.998 16.4516L11.3528 22.5605C10.3972 23.0927 9.19355 22.4093 9.19355 21.2903V8.70968C9.19355 7.59677 10.3911 6.90726 11.3528 7.43952L21.998 13.9113C22.9899 14.4677 22.9899 15.9012 21.998 16.4516Z" fill="#4611A7"/>
        </svg>
    ),
	attributes: {
		videoType: {
			type: 'string',
			default: 'youtube',
		},
		videoURL: {
			type: 'string',
			default: '',
		},
		videoPosterUrl: {
			type: 'string',
			default: '',
		},
		videoPosterId: {
			type: 'number',
			default: 0,
		},
        addYtPoster: {
            type: bool,
            default: false
        },
        seo_title: {
			type: 'string',
			default: '',
		},
        seo_description: {
			type: 'string',
			default: '',
		},
	},
	/**
	 * @see ./edit.js
	 */
	edit: withSelect( ( select, props ) => {
		return {
			media: props.attributes.videoPosterId
				? select( 'core' ).getMedia( props.attributes.videoPosterId )
				: undefined,
		};
	} )( Edit ),

	/**
	 * @see ./save.js
	 */
	save: Save,
} );
