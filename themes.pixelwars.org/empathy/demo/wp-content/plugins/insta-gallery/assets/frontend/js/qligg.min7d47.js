!function($){var swiper_index=0,$swipers={};function qligg_load_item_images($item,next_max_id){var $wrap=$(".insta-gallery-list",$item),$spinner=$(".insta-gallery-spinner",$item),feed=$item.data("feed");$.ajax({url:qligg.ajax_url,type:"post",timeout:3e4,data:{action:"qligg_load_item_images",next_max_id:next_max_id,feed:JSON.stringify(feed)},beforeSend:function(){$spinner.show()},success:function(response){if(!0!==response.success)return $wrap.append($(response.data)),void $spinner.hide();var $images=$(response.data);$wrap.append($images).trigger("qligg.loaded",[$images])},complete:function(){},error:function(jqXHR,textStatus){$spinner.hide(),console.log(textStatus)}})}$(".insta-gallery-feed").on("qligg.loaded",(function(e,images){var $item=$(e.delegateTarget),$wrap=$(".insta-gallery-list",$item),$spinner=$(".insta-gallery-spinner",$item),$button=$(".insta-gallery-button.load",$item),options=$item.data("feed"),total=$(images).length,loaded=0;total&&$wrap.find(".insta-gallery-image").load((function(e){++loaded>=total&&$wrap.trigger("qligg.imagesLoaded",[images])})),total<options.limit&&($spinner.hide(),setTimeout((function(){$button.fadeOut()}),300))})),$(".insta-gallery-feed").on("qligg.imagesLoaded",(function(e){var $item=$(e.delegateTarget),$spinner;$(".insta-gallery-spinner",$item).hide()})),$(".insta-gallery-feed[data-feed_layout=gallery]").on("qligg.imagesLoaded",(function(e,images){var $item;$(e.delegateTarget).addClass("loaded"),$(images).each((function(i,item){setTimeout((function(){$(item).addClass("ig-image-loaded")}),150+30*i)}))})),$(".insta-gallery-feed[data-feed_layout=carousel]").on("qligg.imagesLoaded",(function(e,images){var $item;$(e.delegateTarget).addClass("loaded"),$(images).each((function(i,item){$(item).addClass("ig-image-loaded")}))})),$(".insta-gallery-feed[data-feed_layout=carousel]").on("qligg.imagesLoaded",(function(e,images){var $item=$(e.delegateTarget),$swiper=$(".swiper-container",$item),options=$item.data("feed");options.carousel.slides=options.carousel.slidespv,swiper_index++,$swipers[swiper_index]=new Swiper($swiper,{loop:!0,autoHeight:!0,observer:!0,observeParents:!0,slidesPerView:1,spaceBetween:2,autoplay:!!options.carousel.autoplay&&{delay:parseInt(options.carousel.autoplay_interval)},pagination:{el:".swiper-pagination",dynamicBullets:!0,clickable:!0,type:"bullets"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{320:{slidesPerView:2,spaceBetween:2},480:{spaceBetween:parseInt(options.spacing),slidesPerView:Math.min(2,parseInt(options.carousel.slides))},768:{spaceBetween:parseInt(options.spacing),slidesPerView:Math.min(3,parseInt(options.carousel.slides))},1024:{spaceBetween:parseInt(options.spacing),slidesPerView:parseInt(options.carousel.slides)}}})})),$(".insta-gallery-feed[data-feed_layout=masonry]").on("qligg.imagesLoaded",(function(e,images){var $item=$(e.delegateTarget),$wrap=$(".insta-gallery-list",$item);$wrap.data("masonry")?$wrap.masonry("appended",images,!1):$wrap.masonry({itemSelector:".insta-gallery-item",isResizable:!0,isAnimated:!1,transitionDuration:0,percentPosition:!0,columnWidth:".insta-gallery-item:last-child"})})),$(".insta-gallery-feed[data-feed_layout=masonry]").on("layoutComplete",(function(e,items){var $item;$(e.delegateTarget).addClass("loaded"),$(items).each((function(i,item){$(item.element).addClass("ig-image-loaded")}))})),$(".insta-gallery-feed").on("qligg.loaded",(function(e){var $item=$(e.delegateTarget),$wrap=$(".insta-gallery-list",$item),options=$item.data("feed");$(".insta-gallery-item .insta-gallery-icon.qligg-icon-instagram",$wrap).on("click",(function(e){e.stopPropagation()})),options.popup.display&&$(".insta-gallery-item",$wrap).magnificPopup({type:"inline",callbacks:{beforeOpen:function(){this.st.mainClass=this.st.mainClass+" qligg-mfp-wrap"},elementParse:function(item){var media="",profile="",counter="",caption="",info="",likes="",date="",comments="";media='<img src="'+item.el.data("item").images.standard+'"/>',counter='<div class="mfp-icons"><div class="mfp-counter">'+(item.index+1)+" / "+$(".insta-gallery-item",$wrap).length+'</div><a class="mfp-link" href="'+item.el.data("item").link+'" target="_blank" rel="noopener"><i class="qligg-icon-instagram"></i>Instagram</a></div>',options.popup.profile&&(profile='<div class="mfp-user"><img src="'+options.profile.profile_picture_url+'"><a href="https://www.instagram.com/'+options.profile.username+'" title="'+options.profile.name+'" target="_blank" rel="noopener">'+options.profile.username+"</a></div>"),options.popup.caption&&(caption='<div class="mfp-caption">'+item.el.data("item").caption+"</div>"),item.el.data("item").date&&(date='<div class="mfp-date">'+item.el.data("item").date+"</div>"),item.el.data("item").comments&&options.popup.comments&&(comments='<div class="mfp-comments"><i class="qligg-icon-comment"></i>'+item.el.data("item").comments+"</div>"),item.el.data("item").likes&&options.popup.likes&&(likes='<div class="mfp-likes"><i class="qligg-icon-heart"></i>'+item.el.data("item").likes+"</div>"),(options.popup.likes||options.popup.comments)&&(info='<div class="mfp-info">'+likes+comments+date+"</div>"),item.src='<div class="mfp-figure '+options.popup.align+'">'+media+'<div class="mfp-close"></div><div class="mfp-bottom-bar"><div class="mfp-title">'+profile+counter+caption+info+"</div></div></div>"}},gallery:{enabled:!0}})})),$(".insta-gallery-feed").on("click",".insta-gallery-button.load",(function(e){e.preventDefault();var $item=$(e.delegateTarget),next_max_id;if(!$item.hasClass("loaded"))return!1;qligg_load_item_images($item,$(".insta-gallery-list .insta-gallery-item:last-child",$item).data("item").i)})),$(".insta-gallery-feed").each((function(index,item){var $item=$(item);if($item.hasClass("loaded"))return!1;qligg_load_item_images($item,0)})),-1!=navigator.appVersion.indexOf("MSIE 8.")&&(document.body.className+=" instagal-ie-8"),-1!=navigator.appVersion.indexOf("MSIE 9.")&&(document.body.className+=" instagal-ie-9")}(jQuery);