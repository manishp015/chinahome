/*!
 * jQuery floatingscroll Plugin 2.1.1
 * Copyright (c) 2011-2015 Amphiluke
 * Dual licensed under the MIT and GPL licenses
 */
!function(t){"use strict";function i(t){var i=this;i.cont={block:t[0],left:0,top:0,bottom:0,height:0,width:0},i.sbar=i.initScroll(),i.visible=!0,i.updateAPI(),i.syncSbar(t[0]),i.addEventHandlers()}var n=t.jQuery,o=window,s=function(){return o.pageYOffset+o.innerHeight};/*@cc_on @if (@_jscript_version<9) o=document.documentElement;s=function(){return o.scrollTop+o.clientHeight}; @end @*/n.extend(i.prototype,{initScroll:function(){var t=n("<div class='fl-scrolls'></div>");return n("<div></div>").appendTo(t).css({width:this.cont.block.scrollWidth+"px"}),t.appendTo("body")},addEventHandlers:function(){var t,i,o,s=this;for(t=s.eventHandlers=[{$el:n(window),handlers:{scroll:function(){s.checkVisibility()},resize:function(){s.updateAPI()}}},{$el:s.sbar,handlers:{scroll:function(){s.visible&&s.syncCont(this)}}},{$el:n(s.cont.block),handlers:{scroll:function(){!s.visible&&s.syncSbar(this)},focusin:function(){setTimeout(function(){s.syncSbar(s.cont.block)},0)},"update.fscroll adjustScroll":function(t){("fscroll"===t.namespace||"adjustScroll"===t.type)&&s.updateAPI()},"destroy.fscroll":function(t){"fscroll"===t.namespace&&s.destroyAPI()}}}],i=0,o=t.length;o>i;i++)t[i].$el.bind(t[i].handlers)},checkVisibility:function(){var t,i=this,n=i.cont,o=i.sbar[0].scrollWidth<=i.sbar[0].offsetWidth;o||(t=s(),o=n.bottom<=t||n.top>t),i.visible===o&&(i.visible=!i.visible,i.sbar.toggleClass("fl-scrolls-hidden"))},syncCont:function(t){this.cont.block.scrollLeft=t.scrollLeft},syncSbar:function(t){this.sbar[0].scrollLeft=t.scrollLeft},updateAPI:function(){var t=this,i=t.cont,o=n(i.block),s=o.offset();i.height=o.outerHeight(),i.width=o.outerWidth(),i.left=s.left,i.top=s.top,i.bottom=s.top+i.height,t.sbar.width(i.width).css("left",s.left+"px"),n("div",t.sbar).width(o[0].scrollWidth),t.checkVisibility()},destroyAPI:function(){var t,i,n=this.eventHandlers;for(t=0,i=n.length;i>t;t++)n[t].$el.unbind(n[t].handlers);this.sbar.remove()}}),n.fn.attachScroll=n.fn.floatingScroll=function(t){var o=this;/*@cc_on if(@_jscript_version<=5.7&&!window.XMLHttpRequest) return o; @*/return arguments.length&&"init"!==t?i.prototype.hasOwnProperty(t+"API")&&o.trigger(t+".fscroll"):o.each(function(){new i(n(this))}),o}}(this);