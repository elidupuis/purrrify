(function($) {

  var methods = {
    init: function( options ) {
  		var opts = $.extend(true, {}, $.purrrify.defaults, options),
          data = $('body').data('purrrify'),
          $imgs = $(opts.context).find(opts.selector);

      // If the plugin hasn't been initialized yet
      if ( ! data ) {

        function makeItHappen(){
          // if(window.console) window.console.log('makeItHappen() called');
          $imgs.each(function(){
            var h = $(this).height(),
                w = $(this).width(),
                src = opts.service;

            //  black and white option:
            // if (opts.bw) {
            //   src += 'g/';
            // };

            //  store original src for reverting:
            $(this).data( 'purrrify.original', $(this).attr('src') );
            
            if (opts.fadeIn) {
              $(this).css({ opacity: 0 }).load(function(){
                $(this).animate({ opacity: 1 });
              });
            };
            
            //  bring on the kittens!
            $(this).attr( 'src', src.replace('{w}', w).replace('{h}', h) );

          });
        };
        

        if (opts.trigger === 'konami') {
          if(window.console) window.console.log('konami');
          var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
          $(document).keydown(function(e) {
            kkeys.push( e.keyCode );
            if ( kkeys.toString().indexOf( konami ) >= 0 ){
              $(document).unbind('keydown',arguments.callee);
              makeItHappen();
            }
          });
        }else if(opts.trigger === 'onload'){
          if(window.console) window.console.log('onload');
          $(window).load(function(){
            if(window.console) window.console.log('window.load');
            makeItHappen();
          });
        }else{
          if(window.console) window.console.log('event');
          var e = opts.trigger.event + '.purrrify';
          $(opts.trigger.selector).bind(e, function(){
            if ( !$('body').hasClass('purrrified') ) {
              makeItHappen();
            };
            $('body').addClass('purrrified');
            return false;
          });
        };
        
        //  attach kitten burs:
        $('body').data('purrrify', {
          opts: opts
        });

      };
    },
    undo: function() {
      if(window.console) window.console.log('undo() called');
      var opts = $('body').data('purrrify').opts,
          $imgs = $(opts.context).find(opts.selector);
      $imgs.each(function(){
        $(this).attr( 'src', $(this).data('purrrify.original') );
        $(this).removeData('purrrify.original');
      });
      $('body').removeClass('purrrified');
    }
    // ,destroy: function(){
    //       if(window.console) window.console.log('destroy() called');
    //       var opts = $('body').data('purrrify').opts,
    //           $imgs = $(opts.context).find(opts.selector);
    //       $(opts.trigger.selector).unbind('.purrrify');
    //       $imgs.each(function(){
    //         $(this).attr( 'src', $(this).data('purrrify.original') );
    //         $(this).removeData('purrrify.original');
    //       });
    //       $('body').removeClass('purrrified');
    //     }
  };

  // main plugin declaration:
  $.purrrify = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.purrrify' );
    };
  };

  //	defaults
  $.purrrify.defaults = {
    context: 'body',      // context of the selector search
    selector: 'img',      // must be img elements!
    // grayscale: false,     // use black and white images?
    service: 'http://placekitten.com/{w}/{h}', //  might i suggest 'http://placedog.com/{w}/{h}'
    fadeIn: true,         // fade in teh kittens!
    trigger: { selector: '#doit', event: 'click' }   // object literal with jquery selector & event type or string 'konami' or 'onload'
  };

})(jQuery);