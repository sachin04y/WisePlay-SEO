import './wiseplay-player.scss';

( function () {
	let playerSet = [];
	let importStatus = false;
	const YTvideoIdRgx =
		/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
	let tagName, sourceAttrName, rel, node;
	const _importModule = ( e = null, t = 'script' ) => {
		if ( '' !== e && null != e )
			return (
				( 'stylesheet' != t && 'css' != t && 'style' != t ) ||
					( ( tagName = 'link' ),
					( sourceAttrName = 'href' ),
					( rel = 'stylesheet' ),
					( t = 'text/css' ) ),
				( 'js' != t && 'script' != t ) ||
					( ( tagName = 'script' ),
					( sourceAttrName = 'src' ),
					( rel = '' ),
					( t = 'text/javascript' ) ),
				new Promise( ( r ) => {
					( node = document.createElement( tagName ) ),
						node.setAttribute( sourceAttrName, e ),
						node.setAttribute( 'rel', rel ),
						node.setAttribute( 'type', t ),
						document
							.getElementsByTagName( 'head' )[ 0 ]
							.appendChild( node ),
						( node.onload = function () {
							r( ! 0 );
						} );
				} )
			);
		console.error( 'ImportModule expects a link to the module.' );
	};

	const pauseAllInstances = ( playerInstance ) => {
		playerSet.forEach( ( el ) => {
			el != playerInstance && el.pause();
		} );
	};

	const createPlayer = ( video ) => {
		const type = video.getAttribute( 'type' );
		let template;
		if ( 'hosted' === type ) {
			template = '<video id="player" playsinline controls data-poster="' + video.getAttribute( 'poster') + '"><source src="' + video.getAttribute('source') + '" type="video/mp4" /></video>';
		} else {
			template = '<div id="player" data-plyr-provider="youtube" data-plyr-embed-id="' + video.getAttribute('source') + '"></div>';
		}
		video.innerHTML = template;
		let playerInstance = new Plyr( video.childNodes[ 0 ], {
			youtube: {
				noCookie: false,
				rel: 0,
				showinfo: 0,
				iv_load_policy: 3,
				modestbranding: 1,
			},
		} );
		video.removeEventListener( 'click', videoPlayListener );
		playerInstance.on( 'ready', ( event ) => {
			playerInstance.play();
		} );
		playerInstance.on( 'play', ( event ) => {
			pauseAllInstances( playerInstance );
		} );
		playerSet.push( playerInstance );
	};

	const videoPlayListener = function () {
		if ( importStatus ) {
			createPlayer( this );
		} else {
			Promise.all( [
				_importModule( 'https://cdn.plyr.io/3.7.8/plyr.js' ),
				_importModule( 'https://cdn.plyr.io/3.7.8/plyr.css', 'style' ),
			] ).then( () => {
				importStatus = true;
				createPlayer( this );
			} );
		}
	};

	class wiseplayVideoConstruct extends HTMLElement {
		connectedCallback() {
			let source = this.getAttribute( 'source' );
			let poster = this.getAttribute( 'poster' );
			if ( 'youtube' === this.getAttribute( 'type' ) && ! poster ) {
				let matches = source.match( YTvideoIdRgx );
				let embededID = !! matches ? matches[ 5 ] : source;
				poster = 'https://img.youtube.com/vi/' + embededID + '/maxresdefault.jpg';
			}
            this.innerHTML = '<div class="wpvp-player-facade"><img decoding="async" loading="lazy" src="' + poster + '" alt="poster"/> <span class="play-btn" role="button" aria-pressed="false" aria-label="Play"> <svg height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 58 58" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style="fill:#4611a7;" cx="29" cy="29" r="29"></circle> <g> <polygon style="fill:#FFFFFF;" points="44,29 22,44 22,29.273 22,14 "></polygon> <path style="fill:#FFFFFF;" d="M22,45c-0.16,0-0.321-0.038-0.467-0.116C21.205,44.711,21,44.371,21,44V14 c0-0.371,0.205-0.711,0.533-0.884c0.328-0.174,0.724-0.15,1.031,0.058l22,15C44.836,28.36,45,28.669,45,29s-0.164,0.64-0.437,0.826 l-22,15C22.394,44.941,22.197,45,22,45z M23,15.893v26.215L42.225,29L23,15.893z"></path> </g> </g></svg></span></div>';
            this.addEventListener( 'click', videoPlayListener );			
		}
	}
	customElements.define( 'wiseplay-video', wiseplayVideoConstruct );
} )();
