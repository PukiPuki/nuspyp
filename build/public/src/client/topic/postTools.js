"use strict";define("forum/topic/postTools",["share","navigator","components","translator","forum/topic/votes","forum/topic/move-post"],function(t,o,a,e,n,i){var r={};var s=false;r.init=function(o){s=false;c();p(o);t.addShareHandlers(ajaxify.data.titleRaw);n.addVoteHandler();r.updatePostCount(ajaxify.data.postcount)};function c(){$('[component="topic"]').on("show.bs.dropdown",".moderator-tools",function(){var t=$(this);var o=t.find(".dropdown-menu");if(o.html()){return}var a=t.parents("[data-pid]");var n=a.attr("data-pid");var i=parseInt(a.attr("data-index"),10);socket.emit("posts.loadPostTools",{pid:n,cid:ajaxify.data.cid},function(t,a){if(t){return app.alertError(t.message)}a.posts.display_move_tools=a.posts.display_move_tools&&i!==0;templates.parse("partials/topic/post-menu-list",a,function(t){e.translate(t,function(t){o.html(t);$(window).trigger("action:post.tools.load")})})})})}r.toggle=function(t,o){var e=a.get("post","pid",t);e.find('[component="post/quote"], [component="post/bookmark"], [component="post/reply"], [component="post/flag"], [component="user/chat"]').toggleClass("hidden",o);e.find('[component="post/delete"]').toggleClass("hidden",o);e.find('[component="post/restore"]').toggleClass("hidden",!o);e.find('[component="post/purge"]').toggleClass("hidden",!o);e.find('[component="post/tools"] .dropdown-menu').html("")};r.updatePostCount=function(t){var e=a.get("topic/post-count");e.html(t).attr("title",t);utils.makeNumbersHumanReadable(e);o.setCount(t)};function p(t){var o=a.get("topic");o.on("click",'[component="post/quote"]',function(){l($(this),t)});o.on("click",'[component="post/reply"]',function(){d($(this),t)});$(".topic").on("click",'[component="topic/reply"]',function(){d($(this),t)});$(".topic").on("click",'[component="topic/reply-as-topic"]',function(){e.translate("[[topic:link_back, "+ajaxify.data.titleRaw+", "+config.relative_path+"/topic/"+ajaxify.data.slug+"]]",function(t){$(window).trigger("action:composer.topic.new",{cid:ajaxify.data.cid,body:t})})});o.on("click",'[component="post/bookmark"]',function(){return f($(this),m($(this),"data-pid"))});o.on("click",'[component="post/upvote"]',function(){return n.toggleVote($(this),".upvoted","posts.upvote")});o.on("click",'[component="post/downvote"]',function(){return n.toggleVote($(this),".downvoted","posts.downvote")});o.on("click",'[component="post/vote-count"]',function(){n.showVotes(m($(this),"data-pid"))});o.on("click",'[component="post/flag"]',function(){var t=m($(this),"data-pid");require(["flags"],function(o){o.showFlagModal({type:"post",id:t})})});o.on("click",'[component="post/edit"]',function(){var t=$(this);var o=parseInt(m(t,"data-timestamp"),10);var a=parseInt(ajaxify.data.postEditDuration,10);if(r(a,o,"post-edit-duration-expired")){$(window).trigger("action:composer.post.edit",{pid:m(t,"data-pid")})}});o.on("click",'[component="post/delete"]',function(){var o=$(this);var a=parseInt(m(o,"data-timestamp"),10);var e=parseInt(ajaxify.data.postDeleteDuration,10);if(r(e,a,"post-delete-duration-expired")){v($(this),t)}});function r(t,o,a){if(!ajaxify.data.privileges.isAdminOrMod&&t&&Date.now()-o>t*1e3){var e=Math.floor(t/86400);var n=Math.floor(t%86400/3600);var i=Math.floor(t%86400%3600/60);var r=t%86400%3600%60;var s="[[error:"+a+", "+t+"]]";if(e){if(n){s="[[error:"+a+"-days-hours, "+e+", "+n+"]]"}else{s="[[error:"+a+"-days, "+e+"]]"}}else if(n){if(i){s="[[error:"+a+"-hours-minutes, "+n+", "+i+"]]"}else{s="[[error:"+a+"-hours, "+n+"]]"}}else if(i){if(r){s="[[error:"+a+"-minutes-seconds, "+i+", "+r+"]]"}else{s="[[error:"+a+"-minutes, "+i+"]]"}}app.alertError(s);return false}return true}o.on("click",'[component="post/restore"]',function(){v($(this),t)});o.on("click",'[component="post/purge"]',function(){h($(this),t)});o.on("click",'[component="post/move"]',function(){i.openMovePostModal($(this))});o.on("click",'[component="post/chat"]',function(){y($(this))})}function d(t,o){var a=u();k(function(){var e=g(t);if(m(t,"data-uid")==="0"||!m(t,"data-userslug")){e=""}var n=t.is('[component="post/reply"]')?m(t,"data-pid"):null;if(a.text&&(!n||!a.pid||n===a.pid)){e=e||a.username;$(window).trigger("action:composer.addQuote",{tid:o,pid:n,topicName:ajaxify.data.titleRaw,username:e,text:a.text,selectedPid:a.pid})}else{$(window).trigger("action:composer.post.new",{tid:o,pid:n,topicName:ajaxify.data.titleRaw,text:e?e+" ":""})}})}function l(t,o){var a=u();k(function(){var e=g(t);var n=m(t,"data-pid");function i(t){$(window).trigger("action:composer.addQuote",{tid:o,pid:n,username:e,topicName:ajaxify.data.titleRaw,text:t})}if(a.text&&n&&n===a.pid){return i(a.text)}socket.emit("posts.getRawPost",n,function(t,o){if(t){return app.alertError(t.message)}i(o)})})}function u(){var t="";var o;var a="";var e=window.getSelection?window.getSelection():document.selection.createRange();var n=$('[component="post"] [component="post/content"]');var i;n.each(function(t,o){if(e&&e.containsNode&&o&&e.containsNode(o,true)){i=o}});if(i){var r=document.createRange();r.selectNodeContents(i);var s=e.getRangeAt(0).cloneRange();if(s.compareBoundaryPoints(Range.START_TO_START,r)<0){s.setStart(r.startContainer,r.startOffset)}if(s.compareBoundaryPoints(Range.END_TO_END,r)>0){s.setEnd(r.endContainer,r.endOffset)}r.detach();t=s.toString();var c=$(i).parents('[component="post"]');o=c.attr("data-pid");a=g($(i));s.detach()}return{text:t,pid:o,username:a}}function f(t,o){var a=t.attr("data-bookmarked")==="false"?"posts.bookmark":"posts.unbookmark";socket.emit(a,{pid:o,room_id:"topic_"+ajaxify.data.tid},function(t){if(t){app.alertError(t.message)}});return false}function m(t,o){return t.parents("[data-pid]").attr(o)}function g(t){var o="";var a=t.parents("[data-pid]");if(t.attr("component")==="topic/reply"){return o}if(a.length){o=a.attr("data-username").replace(/\s/g,"-")}if(a.length&&a.attr("data-uid")!=="0"){o="@"+o}return o}function v(t,o){var e=m(t,"data-pid");var n=a.get("post","pid",e);var i=!n.hasClass("deleted")?"delete":"restore";w(i,e,o)}function h(t,o){w("purge",m(t,"data-pid"),o)}function w(t,o,a){e.translate("[[topic:post_"+t+"_confirm]]",function(e){bootbox.confirm(e,function(e){if(!e){return}socket.emit("posts."+t,{pid:o,tid:a},function(t){if(t){app.alertError(t.message)}})})})}function y(t){var o=t.parents("[data-pid]");app.newChat(o.attr("data-uid"));t.parents(".btn-group").find(".dropdown-toggle").click();return false}function k(t){var o=Math.min(Date.now()-1e3*60*60*24*ajaxify.data.topicStaleDays,864e13);if(s||ajaxify.data.lastposttime>=o){return t()}e.translate("[[topic:stale.warning]]",function(o){var a=bootbox.dialog({title:"[[topic:stale.title]]",message:o,buttons:{reply:{label:"[[topic:stale.reply_anyway]]",className:"btn-link",callback:function(){s=true;t()}},create:{label:"[[topic:stale.create]]",className:"btn-primary",callback:function(){e.translate("[[topic:link_back, "+ajaxify.data.title+", "+config.relative_path+"/topic/"+ajaxify.data.slug+"]]",function(t){$(window).trigger("action:composer.topic.new",{cid:ajaxify.data.cid,body:t})})}}}});a.modal()})}return r});
//# sourceMappingURL=public/src/client/topic/postTools.js.map