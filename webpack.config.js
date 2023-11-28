const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

let entries = {
	...defaultConfig.entry(),
	wiseplayPlayer: path.resolve( process.cwd(), 'src', 'wiseplay-player.js' ),
};

module.exports = {
	...defaultConfig,
	entry: entries,
};
