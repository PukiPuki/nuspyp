"use strict";define("admin/manage/categories",["vendor/jquery/serializeObject/jquery.ba-serializeobject.min","translator"],function(e,a){var t={};var r=-1;var i;t.init=function(){socket.emit("admin.categories.getAll",function(e,a){if(e){return app.alertError(e.message)}t.render(a)});$('button[data-action="create"]').on("click",t.throwCreateModal);$(".categories").on("click",'button[data-action="toggle"]',function(){var e=$(this);var a=e.attr("data-cid");var r=e.parents('li[data-cid="'+a+'"]');var i=r.hasClass("disabled");var n=r.find("li[data-cid]").map(function(){return $(this).attr("data-cid")}).get();t.toggle([a].concat(n),!i);return false})};t.throwCreateModal=function(){socket.emit("admin.categories.getNames",{},function(e,a){if(e){return app.alertError(e.message)}templates.parse("admin/partials/categories/create",{categories:a},function(e){var a=bootbox.dialog({title:"[[admin/manage/categories:alert.create]]",message:e,buttons:{save:{label:"[[global:save]]",className:"btn-primary",callback:r}}});function r(){var e=a.find("form").serializeObject();e.description="";e.icon="fa-comments";t.create(e);a.modal("hide");return false}a.find("form").on("submit",r)})})};t.create=function(e){socket.emit("admin.categories.create",e,function(e,a){if(e){return app.alertError(e.message)}app.alert({alert_id:"category_created",title:"[[admin/manage/categories:alert.created]]",message:"[[admin/manage/categories:alert.create-success]]",type:"success",timeout:2e3});ajaxify.go("admin/manage/categories/"+a.cid)})};t.render=function(e){var t=$(".categories");if(!e||!e.length){a.translate("[[admin/manage/categories:alert.none-active]]",function(e){$("<div></div>").addClass("alert alert-info text-center").text(e).appendTo(t)})}else{i={};c(e,t,0)}};t.toggle=function(e,a){var t={};e.forEach(function(e){t[e]={disabled:a?1:0}});socket.emit("admin.categories.update",t,function(e){if(e){return app.alertError(e.message)}ajaxify.refresh()})};function n(e){r=e.to.dataset.cid}function o(e){var a=parseInt(r,10)!==-1;if(e.newIndex!=null&&parseInt(e.oldIndex,10)!==parseInt(e.newIndex,10)||a){var t=a?i[r]:i[e.from.dataset.cid];var n={};var o=0;var c=t.toArray();var s=c.length;for(o;o<s;o+=1){n[c[o]]={order:o+1}}if(a){n[e.item.dataset.cid].parentCid=r}r=-1;socket.emit("admin.categories.update",n)}}function c(e,t,r){var s=0;e.forEach(function(e,t,r){a.translate(e.name,function(a){if(e.name!==a){e.name=a}s+=1;if(s===r.length){d()}})});if(!e.length){d()}function d(){templates.parse("admin/partials/categories/category-rows",{cid:r,categories:e},function(s){a.translate(s,function(a){t.append(a);for(var s=0,d=e.length;s<d;s+=1){c(e[s].children,$('li[data-cid="'+e[s].cid+'"]'),e[s].cid)}i[r]=Sortable.create($('ul[data-cid="'+r+'"]')[0],{group:"cross-categories",animation:150,handle:".icon",dataIdAttr:"data-cid",ghostClass:"placeholder",onAdd:n,onEnd:o})})})}}return t});
//# sourceMappingURL=public/src/admin/manage/categories.js.map