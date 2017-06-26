"use strict";define("forum/users",["translator"],function(e){var n={};var t=0;$(window).on("action:ajaxify.start",function(){if(t){clearTimeout(t);t=0}});n.init=function(){app.enterRoom("user_list");var e=utils.params().section?"?section="+utils.params().section:"";$(".nav-pills li").removeClass("active").find('a[href="'+window.location.pathname+e+'"]').parent().addClass("active");a();f();socket.removeListener("event:user_status_change",u);socket.on("event:user_status_change",u)};function a(){t=0;$("#search-user").on("keyup",function(){if(t){clearTimeout(t);t=0}t=setTimeout(s,150)});$('.search select, .search input[type="checkbox"]').on("change",function(){s()})}function s(){$('[component="user/search/icon"]').removeClass("fa-search").addClass("fa-spinner fa-spin");var e=$("#search-user").val();var n=p();var t={section:n,page:1};if(!e){return i(t)}t.term=e;t.sortBy=r();if($(".search .online-only").is(":checked")||n==="online"){t.onlineOnly=true}if(n==="banned"){t.bannedOnly=true}if(n==="flagged"){t.flaggedOnly=true}i(t)}function r(){var e;var n=p();if(n==="sort-posts"){e="postcount"}else if(n==="sort-reputation"){e="reputation"}else if(n==="users"){e="joindate"}return e}function i(e){var n=decodeURIComponent($.param(e));$.get(config.relative_path+"/api/users?"+n,o).fail(function(e){if(e&&e.responseJSON&&e.responseJSON.error){app.alertError(e.responseJSON.error)}})}function o(n){templates.parse("partials/paginator",{pagination:n.pagination},function(e){$(".pagination-container").replaceWith(e)});templates.parse("users","users",n,function(n){e.translate(n,function(e){e=$(e);$("#users-container").html(e);e.find("span.timeago").timeago();$('[component="user/search/icon"]').addClass("fa-search").removeClass("fa-spinner fa-spin")})})}function u(e){var n=p();if(n.startsWith("online")||n.startsWith("users")){c(e)}}function c(e){app.updateUserStatus($('#users-container [data-uid="'+e.uid+'"] [component="user/status"]'),e.status)}function p(){return utils.params().section||""}function f(){$('[component="user/invite"]').on("click",function(){bootbox.prompt("Email: ",function(e){if(!e){return}socket.emit("user.invite",e,function(n){if(n){return app.alertError(n.message)}app.alertSuccess("[[users:invitation-email-sent, "+e+"]]")})})})}return n});
//# sourceMappingURL=public/src/client/users.js.map