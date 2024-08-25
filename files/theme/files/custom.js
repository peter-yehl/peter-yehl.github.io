$(document).ready(function() {
  $.fn.checkNavPositioning = function($el, $nav, scrollClass) {
    var navHeight = $nav.outerHeight();

    if (((this.outerHeight() - $(window).scrollTop()) < $nav.outerHeight()) && !$el.hasClass(scrollClass)) {
      $el.addClass(scrollClass);
      $el.css('padding-top', navHeight);
    } else if ((this.outerHeight() >= $(window).scrollTop()) && $el.hasClass(scrollClass)) {
      $el.removeClass(scrollClass);
      $el.css('padding-top', 0);
    }
  }

  $.fn.expandableSidebar = function(expandedClass) {
    var $me = this;
    $me.on('click', function() {
      $me.toggleClass(expandedClass);
    });
  }

  $.fn.intervalLoop = function(condition, action, duration, limit) {
    var counter = 0;
    var looper = setInterval(function() {
      if (counter >= limit || $.fn.checkIfElementExists(condition)) {
        clearInterval(looper);
      } else {
        action();
        counter++;
      }
    }, duration);
  }

  $.fn.checkIfElementExists = function(selector) {
    return $(selector).length;
  }

  var centoController = {
    init: function(opts) {
      var base = this;

      if ($(window).width() > 767) {
        $('.cento-header').checkNavPositioning($('body:not(.wsite-checkout-page)'), $('.nav-wrap'), 'affix');
      }

      base._addClasses();
      base._attachEvents();

      setTimeout(function() {
        $.fn.intervalLoop('', base._checkCartItems, 800, 3);
      }, 500);
    },

    _addClasses: function() {
      var base = this;

      $('.wsite-menu-default').find('li.wsite-menu-item-wrap').each(function() {
        var $me = $(this);
        if ($me.children('.wsite-menu-wrap').length > 0) {
          $me.addClass('has-submenu');
          $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-item'));
        }
      });

      $('.wsite-menu').find('li.wsite-menu-subitem-wrap').each(function() {
        var $me = $(this);
        if ($me.children('.wsite-menu-wrap').length > 0) {
          $me.addClass('has-submenu');
          $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-subitem'));
        }
      });

      $('li.wsite-menu-subitem-wrap.wsite-nav-current').parents('.wsite-menu-wrap').addClass('open');

      $('.wsite-form-sublabel').each(function() {
        var sublabel = $(this).text();
        $(this).prev('.wsite-form-input').attr('placeholder', sublabel);
      });

      $('.imageGallery').each(function() {
        if ($(this).children('div').length <= 6) {
          $(this).children('div').addClass('fullwidth-mobile');
        }
      });
    },

    _checkCartItems: function() {
      var base = this;
      if ($('#wsite-mini-cart').find('li.wsite-product-item').length > 0) {
        $('body').addClass('cart-full');
      } else {
        $('body').removeClass('cart-full');
      }
    },

    _moveLogin: function() {
      var loginDetach = $('#member-login').detach();
      $('.mobile-nav .wsite-menu-default > li:last-child').after(loginDetach);
    },

    _attachEvents: function() {
      var base = this;

      // Nav toggle
      $('.hamburger').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('nav-open');
      });

      // Hamburger menu toggle
      $('.hamburger-menu').on('click', function() {
        $('.nav-menu').toggleClass('open');
      });

      if ($(window).width() <= 992) {
        $.fn.intervalLoop('.mobile-nav #member-login', base._moveLogin, 800, 5);
      }

      $(window).on('scroll', function() {
        if ($(window).width() > 767) {
          $('.cento-header').checkNavPositioning($('body:not(.wsite-checkout-page)'), $('.nav-wrap'), 'affix');
        }
      });

      $('li.has-submenu span.icon-caret').on('click', function() {
        var $me = $(this);
        $me.siblings('.wsite-menu-wrap').toggleClass('open');
      });

      $('.wsite-com-sidebar').expandableSidebar('sidebar-expanded');
      $('#wsite-search-sidebar').expandableSidebar('sidebar-expanded');

      if ('ontouchstart' in window) {
        $('body').on('click', 'a.w-fancybox', function() {
          base._initSwipeGallery();
        });
      }

      $('.wsite-product-button, #wsite-com-product-add-to-cart, .wsite-product-item .wsite-remove-button').on('click', function() {
        setTimeout(function() {
          base._checkCartItems();
        }, 800);
      });
    },

    _initSwipeGallery: function() {
      var base = this;
      setTimeout(function() {
        var touchGallery = document.getElementsByClassName('fancybox-wrap')[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          } else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          base._initSwipeGallery();
        });
      }, 500);
    }
  };

  centoController.init();
});


