const { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } = wp.blockEditor;
const { SelectControl, TextControl, TextareaControl, Panel, PanelBody, ToggleControl, Button, ResponsiveWrapper } = wp.components;

import './editor.scss';

const YTvideoIdRgx = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
export default function Edit( props ) {

    const p = {...useBlockProps() }

	const { attributes, setAttributes } = props;
    let currentPoster = '';

	const onChangeVideoType = ( newType ) => {
		setAttributes( { videoType: newType } );
	};

	const onChangeVideoURL = ( newURL ) => {
		setAttributes( { videoURL: newURL } );
	};

	const onChangeVideoPoster = ( media ) => {
		setAttributes( {
            videoPosterId: media.id,
			videoPosterUrl: media.url,
		} );
	};

	function onChangeYtPoster( newValue ) {
		setAttributes( { addYtPoster: newValue } );
	}

	const removeMedia = () => {
		setAttributes( {
			videoPosterUrl: '',
			videoPosterId: 0,
		} );
	};

    if ( attributes.videoType === 'youtube' && ! attributes.addYtPoster ) {
        let matches = attributes.videoURL.match( YTvideoIdRgx );
        let embededID = !! matches ? matches[ 5 ] : attributes.videoURL;
        let poster = 'https://img.youtube.com/vi/' + embededID + '/maxresdefault.jpg';
        setAttributes( {
            videoPosterUrl: poster,
        })
        currentPoster = poster;
    } else {
        if ( props.media ) {
            setAttributes( {
                videoPosterUrl: props.media.source_url,
            })
        }
    }

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
                <Panel>
                    <PanelBody title="Settings">
                        <SelectControl
                            label="Type of Video"
                            value={ attributes.videoType }
                            options={ [
                                { label: 'YouTube', value: 'youtube' },
                                { label: 'Self Hosted Video', value: 'hosted' },
                            ] }
                            onChange={ onChangeVideoType }
                        />

                        <TextControl
                            label={attributes.videoType === 'youtube' ? 'Youtube Video URL' : 'Video URL' }
                            value={ attributes.videoURL }
                            onChange={ onChangeVideoURL }
                        />

                        { attributes.videoType === 'youtube' && 
                            <ToggleControl
                                help="The poster is fetched from the youtube itself. If enabled, you can add your own poster image for youtube."
                                label="Add poster"
                                checked={ attributes.addYtPoster }
                                onChange={ onChangeYtPoster }
                            />
                        }
                        { (attributes.videoType === 'hosted' || attributes.addYtPoster ) && (
                            <>
                                <div className="editor-post-featured-image__container editor-post-featured-image">
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={ onChangeVideoPoster }
                                            value={ attributes.videoPosterId }
                                            allowedTypes={ [ 'image' ] }
                                            render={ ( { open } ) => (
                                                <Button
                                                    className={
                                                        attributes.videoPosterId == 0
                                                            ? 'editor-post-featured-image__toggle'
                                                            : 'editor-post-featured-image__preview'
                                                    }
                                                    onClick={ open }
                                                >
                                                    { attributes.videoPosterId == 0 && 'Choose a video poster' }
                                                    { props.media != undefined && (
                                                        <ResponsiveWrapper
                                                            naturalWidth={ props.media.media_details.width }
                                                            naturalHeight={ props.media.media_details.height }
                                                        >
                                                            <img src={props.media.source_url} />
                                                        </ResponsiveWrapper>
                                                    ) }
                                                </Button>
                                            ) }
                                        />
                                    </MediaUploadCheck>

                                    { attributes.videoPosterId != 0 && (
                                        <div
                                            className="editor-post-featured-image__actions"
                                            style={ {
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                gap: '8px',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                            } }
                                        >
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    title={ 'Replace image' }
                                                    value={ attributes.videoPosterId }
                                                    onSelect={ onChangeVideoPoster }
                                                    allowedTypes={ [ 'image' ] }
                                                    render={ ( { open } ) => (
                                                        <Button
                                                            variant="primary"
                                                            onClick={ open }
                                                            className="editor-post-featured-image__action"
                                                            isLarge
                                                        >
                                                            { 'Replace' }
                                                        </Button>
                                                    ) }
                                                />
                                            </MediaUploadCheck>
                                            <MediaUploadCheck>
                                                <Button
                                                    variant="primary"
                                                    className="editor-post-featured-image__action"
                                                    onClick={ removeMedia }
                                                    isDestructive
                                                >
                                                    { 'Remove' }
                                                </Button>
                                            </MediaUploadCheck>
                                        </div>
                                    ) }
                                </div>
                            </>
                        ) }
                    </PanelBody>
                </Panel>

                <Panel>
                    <PanelBody title="SEO">
                        <TextControl
                            label="Title"
                            value={ attributes.seo_title }
                            onChange={ (value) => {
                                setAttributes({
                                    seo_title: value
                                })
                            } }
                        />
                        <TextareaControl
                            help="Description of the video"
                            label="Description"
                            value={ attributes.seo_description }
                            onChange={(value) => {
                                setAttributes({
                                    seo_description: value
                                })
                            }}
                        />
                    </PanelBody>
                </Panel>
			</InspectorControls>
			<wiseplay-video
				type={ attributes.videoType }
				source={ attributes.videoURL }
				poster={ attributes.videoPosterUrl }
                name={attributes.seo_title}
                description={attributes.seo_description}
			></wiseplay-video>
		</div>
	);
}
