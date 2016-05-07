HanulWiki.ArticleModel=OBJECT({preset:function(){"use strict";return HanulWiki.MODEL},params:function(){"use strict";var e={id:{notEmpty:!0,size:{min:void 0===CONFIG.HanulWiki.minTagLength?1:CONFIG.HanulWiki.minTagLength,max:255}},content:{notEmpty:!0,size:{max:1e5}},keywords:{notEmpty:!0,array:!0},viewCount:{notEmpty:!0,integer:!0},backLinks:{notEmpty:!0,array:!0}};return{name:"Article",isNotUsingObjectId:!0,initData:{viewCount:0,keywords:[],backLinks:[]},methodConfig:{create:{valid:VALID(e),role:"USER"},update:{valid:VALID(e),role:"USER"},remove:{role:"USER"}}}}}),HanulWiki.BanModel=OBJECT({preset:function(){"use strict";return HanulWiki.MODEL},params:function(){"use strict";var e={id:{notEmpty:!0,size:{max:255}}};return{name:"Ban",isNotUsingObjectId:!0,methodConfig:{create:{valid:VALID(e),role:"ADMIN"},update:{valid:VALID(e),role:"ADMIN"},remove:{role:"ADMIN"}}}}}),HanulWiki.BlockTagModel=OBJECT({preset:function(){"use strict";return HanulWiki.MODEL},params:function(){"use strict";var e={id:{notEmpty:!0,size:{max:255}}};return{name:"BlockTag",isNotUsingObjectId:!0,methodConfig:{create:{valid:VALID(e),role:"ADMIN"},update:{valid:VALID(e),role:"ADMIN"},remove:{role:"ADMIN"}}}}}),HanulWiki.TalkModel=OBJECT({preset:function(){"use strict";return HanulWiki.MODEL},params:function(){"use strict";var e={content:{notEmpty:!0,size:{max:3e3}},keywords:{notEmpty:!0,array:!0}};return{name:"Talk",initData:{keywords:[]},methodConfig:{create:{valid:VALID(e),role:"USER"},update:!1,remove:!1}}}});HanulWiki.MAIN=METHOD({run:function(){"use strict";var n;1===CPU_CLUSTERING.getWorkerId()&&(n=SHARED_DB("idDB"),INTERVAL(1,RAR(function(){HanulWiki.ArticleModel.find({isFindAll:!0},function(i){var e=[];EACH(i,function(n){var i=0;EACH(e,function(e,o){return e.length<n.id.length?!1:void(i=o+1)}),e.splice(i,0,n.id)}),n.save({id:"ids",data:{ids:e}}),EACH(i,function(n){var i=n.content.trim().replace(/ /g,"").toLowerCase(),o=[];EACH(e,function(e,t){var a;n.id!==e&&(a=i.replace(new RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"g"),""),a.length<i.length&&o.push(e),i=a)}),CHECK_ARE_SAME([n.keywords,o])!==!0&&(HanulWiki.ArticleModel.update({id:n.id,keywords:o}),EACH(o,function(i){HanulWiki.ArticleModel.updateNoHistory({id:i,$addToSet:{backLinks:n.id}})}))})})})))}}),OVERRIDE(HanulWiki.ArticleModel,function(n){"use strict";HanulWiki.ArticleModel=OBJECT({preset:function(){return n},init:function(n,i,e){var o=SHARED_DB("idDB"),t=HanulWiki.DB("Article__HISTORY"),a=HanulWiki.SHARED_STORE("banStore");n.on("create",{before:function(n,e,t,r){var u,c;return a.get(r.ip)===!0?t({validErrors:{ban:!0}}):(u=n.content.trim().replace(/ /g,"").toLowerCase(),c=o.get("ids").ids,n.keywords=[],n.ip=r.ip,EACH(c,function(i,e){var o=u.replace(new RegExp(i.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"g"),"");o.length<u.length&&n.keywords.push(i),u=o}),NEXT([function(i){GET({host:"tagengine.hanul.co",uri:"__TAG_INPUT",paramStr:"tag="+encodeURIComponent(n.id)},i)},function(i){return function(e){CHECK_IS_IN({array:r.roles,value:"ADMIN"})===!0?i():HanulWiki.BlockTagModel.get(e,{notExists:function(){n.id=e,i()},success:function(){t({validErrors:{id:{type:"blocked"}}})}})}},function(){return function(){i.get(n.id,{notExists:e,success:function(){t({validErrors:{id:{type:"exists"}}})}})}}])),!1},after:function(n){var e=o.get("ids").ids,t=0;EACH(e,function(i,e){return i.length<n.id.length?!1:void(t=e+1)}),o.update({id:"ids",data:{$push:{ids:{$each:[n.id],$position:t}}}}),EACH(n.keywords,function(e){i.getDB().updateNoRecord({id:e,$addToSet:{backLinks:n.id}})})}}),n.on("update",{before:function(n,i,e,t){var r,u;return void 0!==t?(a.get(t.ip)===!0?e({validErrors:{ban:!0}}):void 0!==n.content&&NEXT([function(i){CHECK_IS_IN({array:t.roles,value:"ADMIN"})===!0?i():HanulWiki.BlockTagModel.get(n.id,{notExists:i,success:function(){e({validErrors:{id:{type:"blocked"}}})}})},function(){return function(){r=n.content.trim().replace(/ /g,"").toLowerCase(),u=o.get("ids").ids,n.keywords=[],n.ip=t.ip,EACH(u,function(i,e){var o;i!==n.id&&(o=r.replace(new RegExp(i.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"g"),""),o.length<r.length&&n.keywords.push(i),r=o)}),i()}}]),!1):void 0},after:function(n,e){n.content!==e.content&&(EACH(n.keywords,function(e){i.getDB().updateNoRecord({id:e,$addToSet:{backLinks:n.id}})}),HanulWiki.BROADCAST({roomName:"Article",methodName:"recentUpdate",data:n}))}}),n.on("remove",{before:function(n,e,o,t){return NEXT([function(i){CHECK_IS_IN({array:t.roles,value:"ADMIN"})===!0?i():HanulWiki.BlockTagModel.get(n,{notExists:i,success:function(){o({isNotAuthed:!0})}})},function(n){return function(){a.get(t.ip)===!0||CONFIG.HanulWiki.isCannotRemove===!0&&CHECK_IS_IN({array:t.roles,value:"ADMIN"})!==!0?o({isNotAuthed:!0}):n()}},function(){return function(){i.getDB().update({id:n,content:"글 삭제"},e)}}]),!1},after:function(n){o.get("ids").ids;o.update({id:"ids",data:{$pull:{ids:n.id}}}),EACH(n.keywords,function(e){i.getDB().updateNoRecord({id:e,$pull:{backLinks:n.id}})})}}),HanulWiki.ROOM(i.getName(),function(n,e){e("view",function(n,e){void 0!==n&&i.getDB().updateNoRecord({id:n,$inc:{viewCount:1}},{notExists:e,success:e})}),e("findHistory",function(n,i){void 0!==n&&t.find({filter:{docId:n.id},start:void 0===n.page?0:10*(n.page-1),count:10,sort:{time:-1}},i)}),e("searchIds",function(n,e){void 0!==n&&i.find({filter:{id:{$regex:n.trim().replace(/ /g,"").toLowerCase()}},sort:{viewCount:-1},count:20},function(n){var i=[];EACH(n,function(n){i.push(n.id)}),e(i)})})})}})}),OVERRIDE(HanulWiki.TalkModel,function(n){"use strict";HanulWiki.TalkModel=OBJECT({preset:function(){return n},init:function(n,i,e){var o=SHARED_DB("idDB"),t=HanulWiki.SHARED_STORE("banStore");n.on("create",{before:function(n,i,e,a){var r,u;return t.get(a.ip)===!0?(e({validErrors:{ban:!0}}),!1):(r=n.content.trim().replace(/ /g,"").toLowerCase(),u=o.get("ids").ids,n.keywords=[],n.ip=a.ip,EACH(u,function(i,e){var o=r.replace(new RegExp(i.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"g"),"");o.length<r.length&&n.keywords.push(i),r=o}),void 0)}})}})}),HanulWiki.AuthRoom=OBJECT({init:function(){"use strict";HanulWiki.ROOM("authRoom",function(n,i,e){i("auth",function(i,e){var o=void 0!==CONFIG.HanulWiki&&CONFIG.HanulWiki.isPublic===!0||void 0!==NODE_CONFIG.HanulWiki&&void 0!==i&&(i===NODE_CONFIG.HanulWiki.password||i===NODE_CONFIG.HanulWiki.adminPassword);o===!0&&(n.roles=["USER"]),void 0!==NODE_CONFIG.HanulWiki&&void 0!==NODE_CONFIG.HanulWiki.adminPassword&&i===NODE_CONFIG.HanulWiki.adminPassword&&(n.roles=["USER","ADMIN"]),e(o)})})}}),HanulWiki.BanRoom=OBJECT({init:function(){"use strict";var n=HanulWiki.SHARED_STORE("banStore");HanulWiki.BanModel.find({isFindAll:!0},EACH(function(i){n.save({name:i.id,value:!0})})),HanulWiki.ROOM("banRoom",function(i,e,o){e("ban",function(e,o){void 0!==e&&void 0!==i.roles&&CHECK_IS_IN({array:i.roles,value:"ADMIN"})===!0&&(n.save({name:e,value:!0}),HanulWiki.BanModel.create({id:e}),o())}),e("noBan",function(e,o){void 0!==e&&void 0!==i.roles&&CHECK_IS_IN({array:i.roles,value:"ADMIN"})===!0&&(n.remove(e),o())}),e("getBanList",function(e,o){if(void 0!==i.roles&&CHECK_IS_IN({array:i.roles,value:"ADMIN"})===!0){var t=[];EACH(n.list(),function(n,i){t.push(i)}),o(t)}})})}}),HanulWiki.ConnectionRoom=OBJECT({init:function(){"use strict";var n=HanulWiki.SHARED_DB("connectionDB");n.save({id:"connectionCountInfo",data:{count:0}}),HanulWiki.ROOM("connectionRoom",function(i,e,o){n.update({id:"connectionCountInfo",data:{$inc:{count:1}}}),HanulWiki.BROADCAST({roomName:"connectionRoom",methodName:"newUser"}),e("__DISCONNECTED",function(){n.update({id:"connectionCountInfo",data:{$inc:{count:-1}}}),HanulWiki.BROADCAST({roomName:"connectionRoom",methodName:"leaveUser"})}),e("getConnectionCount",function(i,e){e(n.get("connectionCountInfo").count)})})}});