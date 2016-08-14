// base: função para carregamento assíncrono
function loadAsync(url) {
	var e = document.createElement('script');
	e.type = 'text/javascript';
	e.async = true;
	e.src = url;

	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(e, s);
	return s;
}

// track de downloads e links externos no analytics
(function() {
	var rootUrl = location.protocol + '//' + (location.hostname||location.host) +
				  ((document.location.port||false) ? ':' + location.port : '') + '/';

	function track(el, url) {
		var callback = function() {
			_gaq.push(['_trackPageview', url]);
		};
		if (el.addEventListener){
			  el.addEventListener('click', callback, false);
		} else if (el.attachEvent){
			  el.attachEvent('onclick', callback);
		}
	}

	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var a = links[i];
		var href = a.getAttribute('href');

		if (href.indexOf('http://') === 0 || href.indexOf('https://') === 0) {
			track(a, '/LinkExterno/' + href);
		} else if (href.indexOf('.pdf') !== 0) {
			track(a, href);
		}
	}
})();

/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT License.
	https://github.com/scottjehl/iOS-Orientationchange-Fix
*/
(function(w){

	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }

    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );

		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}
        }
		else if( !enabled ){
			restoreZoom();
        }
    }

	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );
