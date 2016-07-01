/* Cufon colors: begin */

Cufon('#nav > li.act > a', {
	color: '-linear-gradient(#b3b3b3, #6c6e70 )', textShadow: '1px 1px #131313'/*,
	hover: {
		color: '-linear-gradient(#111, #4b4b4b)', textShadow: '1px 1px #dde0e3'
	}*/
});

Cufon('#nav > li:not(.act) > a', {
	color: '-linear-gradient(#fff, 0.4=#e8eaeb, 0.6=#b0b5b8, #b0b5b8)', textShadow: '1px 1px #000'/*,
	hover: {
		color: '-linear-gradient(#b0b5b8, 0.4=#b0b5b8, 0.6=#e8eaeb, #fff)', textShadow: '1px 1px #000'
	}*/
});

Cufon('#about', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});

Cufon('h1, h2, h3, h4, h5, h6, .quote_author', {
	color: '-linear-gradient(#686b6c, #181818)', textShadow: '1px 1px #fff',
	hover: {
		color: '-linear-gradient(#a8abad, #434343)'
	}
});

Cufon('.post_type div, .post_type span, .header', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});
Cufon('.paginator li a', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});
Cufon('.paginator li.act a', {
	color: '-linear-gradient(#b3b3b3, #6c6e70)', textShadow: '1px 1px #131313'
});

Cufon('#footer .header', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});
Cufon('.article_c h2', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});
Cufon('#content_full_black h2', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});
Cufon('#content_full_black h5', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});
Cufon('.vertical_black h2', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});
Cufon('.vertical_black h5', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});

/* Cufon colors: end */





/*
   Move comments form
*/

var slider_auto = 0;

function move_form_to(ee)
{
      var e = $("#form_holder").html();
      var tt = $("#form_holder .header").text();
      
      var to_slide_up = ($(".comment_bg #form_holder").length ? $("#form_holder") : $(".share_com"));
      
      to_slide_up.slideUp(500, function () {
         $("#form_holder").remove();
         
         ee.append('<div id="form_holder">'+e+'</div>');
         $("#form_holder .header").html(tt);
         $("#form_holder [valed]").removeAttr('valed');
         $("#form_holder .do_clear").attr('remove', 1);
         
         Cufon('#form_holder h2', {
            color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '-1px -1px #000'
         });
         
         $(".formError").remove();
         
         $("#form_holder").hide();
         
         to_slide_up = ($(".comment_bg #form_holder").length ? $("#form_holder") : $(".share_com"));
         if (to_slide_up.hasClass('share_com')) $("#form_holder").show();
         
         to_slide_up.slideDown(500);
         
         if (ee.attr("id") != "form_prev_holder")
         {
            $("#comment_parent").val( ee.parent().attr("id").replace('comment-', '') );
         }
         else
         {
            $("#comment_parent").val("0");
         }
         
         upd_ev();
      });
}

function upd_ev()
{
   /* 
      Валидация форм
   */
   
   $("form .button").addClass('go_submit');
   
   $("[placeholder]").each(function () {
      $(this).val( $(this).val().replace( $(this).attr("placeholder"), "" ) );
      $(this).placeholder();
   });
   $("form .go_submit").unbind().click(function () {
      var e=$(this).parents("form");
      e.find("input, textarea").each(function () {
         $(this).unbind();
         $(this).val( $(this).val().replace( $(this).attr("placeholder"), "" ) );
      });
      if (!e.attr("valed")) e.validationEngine();
      e.attr("valed", "1");
      e.submit(); 
      e.find("input, textarea").each(function () {
         $(this).placeholder();
      });      
      return false;
   });
   $("form .do_clear").unbind().click(function () {
      $(this).parents("form").find("input, textarea").each(function () {
         $(this).val("").placeholder();
      });
      $(".formError").remove();
      
      if ($(this).attr("remove") && !$(this).parents("#form_prev_holder").length) 
      {
         move_form_to( $("#form_prev_holder") );
         $("#form_holder .do_clear").removeAttr('remove');
      }
      
      return false;
   });
   
   /*
      End: Валидация форм
   */
}

$(document).ready(function () {

   $(".comments").click(function () {
   
      move_form_to( $(this).parent().parent() );
      
      return false;
   });

   /* Всплывающее окошко для навигационной ленты */

   var popup_options = {
      jump_height:        30,
      show_duration:      300,
      hide_duration:      300,
      tout:               200,
      top:                -131   // почему-то $("ul.pxs_thumbnails div").position().top дает неправильное значение 
   };
   
   if (!$.browser.msie)
   {
      $("ul.pxs_thumbnails li div").css({
         display:       'none',
         opacity:       0
      });
   }
   
   var touts    = new Array();
   var cur_elem = null;
   var n=0;
   $("ul.pxs_thumbnails li").each(function () {
      $(this).attr("n", ++n);
   });
   
   $("ul.pxs_thumbnails li").hover(function () {
      cur_elem = $("div", this);
      touts[ parseInt($(this).attr("n")) ] = setTimeout(function () {
         if ($.browser.msie)
         {
            cur_elem.show().css({
               top:        popup_options.top+"px"
            });
         }
         else
         {
            cur_elem.show().css({
               opacity:    0,
               top: ( popup_options.top - popup_options.jump_height )+"px"
            }).animate({
               opacity:    1,
               top:        popup_options.top+"px"
            }, {
               duration:   popup_options.show_duration,
               queue:      false,
               complete:   function () {
                  //$(this).hide();
               }
            });
         }
      }, popup_options.tout);
   }, function () {
   
      if (touts[ parseInt($(this).attr("n")) ]) clearTimeout(touts[ parseInt($(this).attr("n")) ]);
   
      if ($.browser.msie)
      {
         $("div", this).hide();
      }
      else
      {
         $("div", this).animate({
            opacity:    0
         }, {
            duration:   popup_options.hide_duration,
            queue:      false,
            complete:   function () {
               $(this).hide();
            }
         });
      }   
   });
   
   /* End: Всплывающее окошко для навигационной ленты */
   
   
   $(window).resize(function () {
      $(".pxs_slider").children().eq(0).css('margin-left', '0px');
   });
   
   
   /* Слайдер, перенес инициализацию из slider.js, добавляю выезжание стрелки */
   
   if ($('#pxs_container').length)
   {
   
      var arrow_duration  = 1000;
      var arrow_prev      = $( $(".pxs_slider").children()[0] );
      var arrow_left_init = "-"+$("#pxs_container div.desc").width()+"px";
      
      $(".pxs_slider").children().eq(0).css('margin-left', '-10px');
      
      $("#pxs_container div.desc:gt(0)").css({
         left: arrow_left_init
      });
     
	 
	   $('#pxs_container').parallaxSlider({
	      auto: 8000,
	      animDone: function (parent) {
	         $("div.desc", parent).show().animate({
	            left: '0px'
	         }, {
	            duration: arrow_duration,
	            queue: false, 
	            complete: function () {
	               $("div.desc", arrow_prev).hide().css('left', arrow_left_init);
	               arrow_prev = parent;
	            }
	         });
	      }
	   });
	
	}
   
   /* End: Слайдер */
   
   
   
   
   
   /* 
      Блоки с картинками и на них текст - добавление fade 
   */
   
   var blocks_speed_fade_in  = 300;
   var blocks_speed_fade_out = 300;
   
   $(".col_1-3 .desc").css({
      display: 'block',
      opacity: 0
   });
   
   $(".col_1-3").hover(function () {
      $(".desc", this).animate({
         opacity: 1
      }, {
         duration: blocks_speed_fade_in,
         queue: false,
         complete: function () {
            if ($.browser.msie) this.style.removeAttribute('filter');
         }
      });
   }, function () {
      $(".desc", this).animate({
         opacity: 0
      }, {
         duration: blocks_speed_fade_out,
         queue: false
      });
   });
   
   /*
      End: Блоки с картинками и на них текст - добавление fade 
   */
   
   
   
   
   upd_ev();
   
   
   /* 
      Цвет меню 
   */
   
   $("#mainmenu li.act").addClass("active");
   
   var n=0;
   $("#mainmenu > li").each(function () {
      $(this).find("a:eq(0)").attr("id", "m"+(++n));
   });
   $("#mainmenu > li").mouseover(function () {
	   return;
      if ( $(this).hasClass('act') )
         return;
      Cufon.replace('#'+$(this).find("a:eq(0)").attr("id"), {
		      color: '-linear-gradient(#950d38, #dc3560)', textShadow: '1px 1px #000'
      });
   });
   $("#mainmenu > li").mouseout(function () {
	   return;
      if ( $(this).hasClass('act') )
         return;
      Cufon.replace('#'+$(this).find("a:eq(0)").attr("id"), {
		   color: '-linear-gradient(#b8b4b1, #edebe8)', textShadow: '1px 1px #000',
		   hover: {
			   color: '-linear-gradient(#950d38, #dc3560)', textShadow: '1px 1px #000'
		   }
      });
   });
      
   /*
      End: цвет меню
   */
   
   if (1)
   {
      var popup_options2 = { top: 25 };
      
      var touts2    = new Array();
      var cur_elem2 = null;
      var n2=0;
      $("#mainmenu > li").each(function () {
         if ( !$(this).children("div").length )
            return;
         $(this).attr("n", ++n2).addClass("parent");
      });
      
      $("#mainmenu > li.parent").hover(function () {
         cur_elem2 = $("div", this);
         touts2[ parseInt($(this).attr("n")) ] = setTimeout(function () {
            if ($.browser.msie)
            {
               cur_elem2.show().css({
                  display:    'block',
                  top:        popup_options2.top+"px"
               });
            }
            else
            {
               cur_elem2.css({
                  opacity:    0,
                  display:    'block',
                  top: ( popup_options2.top + popup_options.jump_height )+"px"
               }).animate({
                  opacity:    1,
                  top:        popup_options2.top+"px"
               }, {
                  duration:   popup_options.show_duration,
                  queue:      false
               });
            }
         }, popup_options.tout);
      }, function () {
      
         if (touts2[ parseInt($(this).attr("n")) ]) clearTimeout(touts2[ parseInt($(this).attr("n")) ]);
      
         if ($.browser.msie)
         {
            $("div", this).hide();
         }
         else
         {
            $("div", this).animate({
               opacity:    0
            }, {
               duration:   popup_options.hide_duration,
               queue:      false,
               complete:   function () {
                  $(this).hide();
               }
            });
         }   
      });
   }
   
   $(".gal").attr("rel", "gal[g]");
   if ($.prettyPhoto && $(".gal").length)
   {
      $(".gal").each(function () {
         $(this).attr("rel", "gal[g]")
            .attr("title",  $(this).find("h4").text() );
      });
      $("a[rel=gal\\[g\\]]").prettyPhoto({
         theme: 'light_rounded',
         gallery_markup: ''
      });
   }
   
   $(".sh").each(function () {
      var now = 0;
      var maxnow = $(this).children(".item").length-1;
      var ee = $(this);
      $(this).parent().find(".larr, .rarr").click(function () {
         var the_now = now;
         if ( !$(this).hasClass('larr') ) now++; else now--;
         if (now<0) now = maxnow;
         if (now>maxnow) now=0;
         var now_h = ee.height();
         //$(".widget_arr").hide();
         ee.find(".item:eq("+the_now+")").fadeOut(300, function () {
            var gg = ee.find(".item:eq("+now+")");
            gg.show();
            ee.css({ height: 'auto' });
            var new_h = ee.height();
            gg.hide();
            ee.css({ height: now_h }).animate({ height: new_h }, { duration: 300, complete: function () {
               //$(".widget_arr").show();
            } });
            gg.fadeIn(300);
         });
         return false;
      });
   });
   
});

// PIE
$(function () {
    $('.alignleft, ul.pxs_slider li div.holder img, .shadow_dark, .shadow_dark i, #content_full_black .shadow_dark, .shadow_light, .alignright').each(function() {
        if ($.browser.msie) PIE.attach(this);
    });
});
// end PIE

// flickr animations
$(function () {
   $(".flickr").each(function () {
      var ee = $(this);
      ee.parent().hover(function () {
      },
      function () {
         $("i", ee).animate({
            opacity: 0
         }, {
            duration: 300,
            queue: false
         });
      });
      $("i", ee).hover(function () {
         $(this).animate({
            opacity: 0
         }, {
            duration: 300,
            queue: false
         });      
         $("i", ee).not( $(this) ).animate({
            opacity: 0.4
         }, {
            duration: 300,
            queue: false
         });
      }, function () {
         
      });
   });
});
// end flickr animations


// menu

var menu_timeout_open = false;
var menu_timeout_close = false;

$(function () {

   var menu_speed_show = 300;
   var menu_show_timeout = 300;

   $("#nav li").each(function () {
      var sub_ul = $(this).children("div");
      
      if (!sub_ul.length)
      {
         $(this).hover(function () {
            if (menu_timeout_open)
               clearTimeout(menu_timeout_open);
         },
         function () {
         });
         return;
      }
      
      var anim_prop = 'left';
      
      prev_left = 25;
      //prev_left2 = 155;
      prev_left2 = 125;
      var is_level2 = (sub_ul.parent().parent().attr("id") == "nav" ? 0 : 1);
      
      //prev_left = 172;
      
      var new_left = parseInt( prev_left );
      var init_left = new_left+20;

      var new_left2 = parseInt( prev_left2 );
      var init_left2 = new_left2+20;

      if ($.browser.msie)
      {
         sub_ul.css({
            display: 'none'
         });
      }
      else
      {
         sub_ul.css({
            display: 'none',
            opacity: 0,
         });
      }
      
      $(this).hover(function () {
         if (menu_timeout_open)
            clearTimeout(menu_timeout_open);
         
         menu_timeout_open = setTimeout(function () {
            sub_ul.find("div").hide();
            if ($.browser.msie)
            {
               sub_ul.show();
            }
            else
            {
               if (is_level2)
               {
                  sub_ul.css({
                     display: 'block',
                     opacity: 0,
                     left: init_left2
                  }).animate({
                     opacity: 1,
                     left: new_left2
                  }, {
                     duration: menu_speed_show,
                     queue: false,
                     complete: function () {
                        if ($.browser.msie) this.style.removeAttribute('filter');
                     }
                  });
               }
               else
               {
                  sub_ul.css({
                     display: 'block',
                     opacity: 0,
                     top: init_left

                  }).animate({
                     opacity: 1,
                     top: new_left
                  }, {
                     duration: menu_speed_show,
                     queue: false,
                     complete: function () {
                        if ($.browser.msie) this.style.removeAttribute('filter');
                     }
                  });
               }
            }
         }, menu_show_timeout);
      },
      function () {
         sub_ul.hide();
      });
   });
   
   $("#nav").hover(function () { },function () {
      //$("#nav div").hide();
      if (menu_timeout_open)
         clearTimeout(menu_timeout_open);
   });
   
   $("#nav div").each(function () {
      var tout_hide = false;
      var d = $(this);
      d.hover(function () {
         if (tout_hide)
            clearTimeout(tout_hide);
      },
      function () {
         tout_hide = setTimeout(function () {
            d.hide();
         }, 500);
      });
   });

});

// end menu

// plus minus animate
$(function () {
/*   $(".one-third a i, .shadow_dark i, .shadow_light i").each(function () { */
   if (1)
   {
      $(".shadow_dark i, .shadow_light i").each(function () {
         $(this).css({
            display: 'block',
            opacity: 0,
            visibility: 'visible'
         });
         $(this).hover(function () {
            if ($.browser.msie)
               this.style.removeAttribute('filter');
            else
               $(this).animate({
                  opacity: 1
               }, {
                  duration: 500,
                  queue: false
               });
         }, function () {
            if ($.browser.msie)
               $(this).css({
                  opacity: 0
               });
            else
               $(this).animate({
                  opacity: 0
               }, {
                  duration: 500,
                  queue: false
               });
         });
      });
   }
   else
   {
   }
});
// end plus minus animate

// pf 
$(function () {
   $("a.prettyPhoto").prettyPhoto({
      theme: 'light_rounded',
      gallery_markup: ''
   });
});
// end pf
