(function($) {

  var methods = {
    init: function( options ) {
      if(window.console) window.console.log('init', options);
      // iterate and reformat each matched element
    	return this.each(function() {
    		var $this = $(this),
    		    opts = $.extend({}, $.fn.purrrify.defaults, options),
            data = $this.data('purrrify'),
            $imgs = $(opts.context).find(opts.selector);


        // If the plugin hasn't been initialized yet
        if ( ! data ) {

          $this.bind('click', function(){
            
            // var $imgs = $(opts.context).find(opts.selector);
            $imgs.each(function(){
              var h = $(this).height(),
                  w = $(this).width(),
                  src = 'http://placekitten.com/';

              //  black and white option:
              if (opts.bw) {
                src += 'g/';
              };

              //  store original src for reverting:
              $(this).data( 'purrrify.original', $(this).attr('src') );

              //  bring on the kittens!
              $(this).attr( 'src', src + w + '/' + h );

            });

          });
            
          //  attach kitten burs:
          $this.data('purrrify', {
            target : $this,
            opts: opts
          });

        };
      });
    },
    undo: function() {
      return this.each(function() {
        var opts = $(this).data('purrrify').opts,
            $imgs = $(opts.context).find(opts.selector);
        $imgs.each(function(){
          $(this).attr( 'src', $(this).data('purrrify.original') );
          $(this).removeData('purrrify.original');
        });
        // $(this).removeData('purrrify');
      });
    }
  };

  // main plugin declaration:
  $.fn.purrrify = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.purrrify' );
    };
  };

  //	defaults
  $.fn.purrrify.defaults = {
    bw: false,            // use black and white images?
    context: 'body',      // context of the selector search
    selector: 'img'       // must be img elements!
  };

  // $.fn.purrrify.publicfunc = function() { return "jquery.purrrify public function. "; };

})(jQuery);