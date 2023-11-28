export default function save( props ) {
	const { attributes } = props;

	return (
		<wiseplay-video
            type={ attributes.videoType }
            source={ attributes.videoURL }
            poster={ attributes.videoPosterUrl }
            name={attributes.seo_title}
            description={attributes.seo_description}
        ></wiseplay-video>
	);
}
