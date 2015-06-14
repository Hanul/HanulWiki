HanulWiki.MAIN=METHOD({run:function(){"use strict";HanulWiki.MATCH_VIEW({uri:"**",target:HanulWiki.Layout}),HanulWiki.MATCH_VIEW({uri:"",target:HanulWiki.Home}),HanulWiki.MATCH_VIEW({uri:"{id}",target:HanulWiki.View}),HanulWiki.MATCH_VIEW({uri:["func/new","func/update/{id}"],target:HanulWiki.Form}),HanulWiki.MATCH_VIEW({uri:"func/login",target:HanulWiki.Login})}}),function(){function e(e){this.tokens=[],this.tokens.links={},this.options=e||c.defaults,this.rules=u.normal,this.options.gfm&&(this.rules=this.options.tables?u.tables:u.gfm)}function t(e,t){if(this.options=t||c.defaults,this.links=e,this.rules=p.normal,this.renderer=this.options.renderer||new n,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.rules=this.options.breaks?p.breaks:p.gfm:this.options.pedantic&&(this.rules=p.pedantic)}function n(e){this.options=e||{}}function i(e){this.tokens=[],this.token=null,this.options=e||c.defaults,this.options.renderer=this.options.renderer||new n,this.renderer=this.options.renderer,this.renderer.options=this.options}function r(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function s(e){return e.replace(/&([#\w]+);/g,function(e,t){return t=t.toLowerCase(),"colon"===t?":":"#"===t.charAt(0)?String.fromCharCode("x"===t.charAt(1)?parseInt(t.substring(2),16):+t.substring(1)):""})}function o(e,t){return e=e.source,t=t||"",function n(i,r){return i?(r=r.source||r,r=r.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(i,r),n):new RegExp(e,t)}}function l(){}function a(e){for(var t,n,i=1;i<arguments.length;i++){t=arguments[i];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}function c(t,n,s){if(s||"function"==typeof n){s||(s=n,n=null),n=a({},c.defaults,n||{});var o,l,u=n.highlight,p=0;try{o=e.lex(t,n)}catch(h){return s(h)}l=o.length;var g=function(e){if(e)return n.highlight=u,s(e);var t;try{t=i.parse(o,n)}catch(r){e=r}return n.highlight=u,e?s(e):s(null,t)};if(!u||u.length<3)return g();if(delete n.highlight,!l)return g();for(;p<o.length;p++)!function(e){return"code"!==e.type?--l||g():u(e.text,e.lang,function(t,n){return t?g(t):null==n||n===e.text?--l||g():(e.text=n,e.escaped=!0,void(--l||g()))})}(o[p])}else try{return n&&(n=a({},c.defaults,n)),i.parse(e.lex(t,n),n)}catch(h){if(h.message+="\nPlease report this to https://github.com/chjj/marked.",(n||c.defaults).silent)return"<p>An error occured:</p><pre>"+r(h.message+"",!0)+"</pre>";throw h}}var u={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:l,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:l,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:l,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};u.bullet=/(?:[*+-]|\d+\.)/,u.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,u.item=o(u.item,"gm")(/bull/g,u.bullet)(),u.list=o(u.list)(/bull/g,u.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+u.def.source+")")(),u.blockquote=o(u.blockquote)("def",u.def)(),u._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",u.html=o(u.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,u._tag)(),u.paragraph=o(u.paragraph)("hr",u.hr)("heading",u.heading)("lheading",u.lheading)("blockquote",u.blockquote)("tag","<"+u._tag)("def",u.def)(),u.normal=a({},u),u.gfm=a({},u.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/}),u.gfm.paragraph=o(u.paragraph)("(?!","(?!"+u.gfm.fences.source.replace("\\1","\\2")+"|"+u.list.source.replace("\\1","\\3")+"|")(),u.tables=a({},u.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),e.rules=u,e.lex=function(t,n){var i=new e(n);return i.lex(t)},e.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},e.prototype.token=function(e,t,n){for(var i,r,s,o,l,a,c,p,h,e=e.replace(/^ +$/gm,"");e;)if((s=this.rules.newline.exec(e))&&(e=e.substring(s[0].length),s[0].length>1&&this.tokens.push({type:"space"})),s=this.rules.code.exec(e))e=e.substring(s[0].length),s=s[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?s:s.replace(/\n+$/,"")});else if(s=this.rules.fences.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"code",lang:s[2],text:s[3]});else if(s=this.rules.heading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:s[1].length,text:s[2]});else if(t&&(s=this.rules.nptable.exec(e))){for(e=e.substring(s[0].length),a={type:"table",header:s[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3].replace(/\n$/,"").split("\n")},p=0;p<a.align.length;p++)a.align[p]=/^ *-+: *$/.test(a.align[p])?"right":/^ *:-+: *$/.test(a.align[p])?"center":/^ *:-+ *$/.test(a.align[p])?"left":null;for(p=0;p<a.cells.length;p++)a.cells[p]=a.cells[p].split(/ *\| */);this.tokens.push(a)}else if(s=this.rules.lheading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:"="===s[2]?1:2,text:s[1]});else if(s=this.rules.hr.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"hr"});else if(s=this.rules.blockquote.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"blockquote_start"}),s=s[0].replace(/^ *> ?/gm,""),this.token(s,t,!0),this.tokens.push({type:"blockquote_end"});else if(s=this.rules.list.exec(e)){for(e=e.substring(s[0].length),o=s[2],this.tokens.push({type:"list_start",ordered:o.length>1}),s=s[0].match(this.rules.item),i=!1,h=s.length,p=0;h>p;p++)a=s[p],c=a.length,a=a.replace(/^ *([*+-]|\d+\.) +/,""),~a.indexOf("\n ")&&(c-=a.length,a=this.options.pedantic?a.replace(/^ {1,4}/gm,""):a.replace(new RegExp("^ {1,"+c+"}","gm"),"")),this.options.smartLists&&p!==h-1&&(l=u.bullet.exec(s[p+1])[0],o===l||o.length>1&&l.length>1||(e=s.slice(p+1).join("\n")+e,p=h-1)),r=i||/\n\n(?!\s*$)/.test(a),p!==h-1&&(i="\n"===a.charAt(a.length-1),r||(r=i)),this.tokens.push({type:r?"loose_item_start":"list_item_start"}),this.token(a,!1,n),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(s=this.rules.html.exec(e))e=e.substring(s[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:"pre"===s[1]||"script"===s[1]||"style"===s[1],text:s[0]});else if(!n&&t&&(s=this.rules.def.exec(e)))e=e.substring(s[0].length),this.tokens.links[s[1].toLowerCase()]={href:s[2],title:s[3]};else if(t&&(s=this.rules.table.exec(e))){for(e=e.substring(s[0].length),a={type:"table",header:s[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3].replace(/(?: *\| *)?\n$/,"").split("\n")},p=0;p<a.align.length;p++)a.align[p]=/^ *-+: *$/.test(a.align[p])?"right":/^ *:-+: *$/.test(a.align[p])?"center":/^ *:-+ *$/.test(a.align[p])?"left":null;for(p=0;p<a.cells.length;p++)a.cells[p]=a.cells[p].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(a)}else if(t&&(s=this.rules.paragraph.exec(e)))e=e.substring(s[0].length),this.tokens.push({type:"paragraph",text:"\n"===s[1].charAt(s[1].length-1)?s[1].slice(0,-1):s[1]});else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"text",text:s[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var p={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:l,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:l,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};p._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,p._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,p.link=o(p.link)("inside",p._inside)("href",p._href)(),p.reflink=o(p.reflink)("inside",p._inside)(),p.normal=a({},p),p.pedantic=a({},p.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),p.gfm=a({},p.normal,{escape:o(p.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:o(p.text)("]|","~]|")("|","|https?://|")()}),p.breaks=a({},p.gfm,{br:o(p.br)("{2,}","*")(),text:o(p.gfm.text)("{2,}","*")()}),t.rules=p,t.output=function(e,n,i){var r=new t(n,i);return r.output(e)},t.prototype.output=function(e){for(var t,n,i,s,o="";e;)if(s=this.rules.escape.exec(e))e=e.substring(s[0].length),o+=s[1];else if(s=this.rules.autolink.exec(e))e=e.substring(s[0].length),"@"===s[2]?(n=this.mangle(":"===s[1].charAt(6)?s[1].substring(7):s[1]),i=this.mangle("mailto:")+n):(n=r(s[1]),i=n),o+=this.renderer.link(i,null,n);else if(this.inLink||!(s=this.rules.url.exec(e))){if(s=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(s[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(s[0])&&(this.inLink=!1),e=e.substring(s[0].length),o+=this.options.sanitize?r(s[0]):s[0];else if(s=this.rules.link.exec(e))e=e.substring(s[0].length),this.inLink=!0,o+=this.outputLink(s,{href:s[2],title:s[3]}),this.inLink=!1;else if((s=this.rules.reflink.exec(e))||(s=this.rules.nolink.exec(e))){if(e=e.substring(s[0].length),t=(s[2]||s[1]).replace(/\s+/g," "),t=this.links[t.toLowerCase()],!t||!t.href){o+=s[0].charAt(0),e=s[0].substring(1)+e;continue}this.inLink=!0,o+=this.outputLink(s,t),this.inLink=!1}else if(s=this.rules.strong.exec(e))e=e.substring(s[0].length),o+=this.renderer.strong(this.output(s[2]||s[1]));else if(s=this.rules.em.exec(e))e=e.substring(s[0].length),o+=this.renderer.em(this.output(s[2]||s[1]));else if(s=this.rules.code.exec(e))e=e.substring(s[0].length),o+=this.renderer.codespan(r(s[2],!0));else if(s=this.rules.br.exec(e))e=e.substring(s[0].length),o+=this.renderer.br();else if(s=this.rules.del.exec(e))e=e.substring(s[0].length),o+=this.renderer.del(this.output(s[1]));else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),o+=r(this.smartypants(s[0]));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else e=e.substring(s[0].length),n=r(s[1]),i=n,o+=this.renderer.link(i,null,n);return o},t.prototype.outputLink=function(e,t){var n=r(t.href),i=t.title?r(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,i,this.output(e[1])):this.renderer.image(n,i,r(e[1]))},t.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/--/g,"—").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},t.prototype.mangle=function(e){for(var t,n="",i=e.length,r=0;i>r;r++)t=e.charCodeAt(r),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},n.prototype.code=function(e,t,n){if(this.options.highlight){var i=this.options.highlight(e,t);null!=i&&i!==e&&(n=!0,e=i)}return t?'<pre><code class="'+this.options.langPrefix+r(t,!0)+'">'+(n?e:r(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:r(e,!0))+"\n</code></pre>"},n.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},n.prototype.html=function(e){return e},n.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},n.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},n.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"},n.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},n.prototype.paragraph=function(e){return"<p>"+e.replace(/\n/g,"<br>")+"</p>\n"},n.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},n.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},n.prototype.tablecell=function(e,t){var n=t.header?"th":"td",i=t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">";return i+e+"</"+n+">\n"},n.prototype.strong=function(e){return"<strong>"+e+"</strong>"},n.prototype.em=function(e){return"<em>"+e+"</em>"},n.prototype.codespan=function(e){return"<code>"+e+"</code>"},n.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},n.prototype.del=function(e){return"<del>"+e+"</del>"},n.prototype.link=function(e,t,n){if(this.options.sanitize){try{var i=decodeURIComponent(s(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(r){return""}if(0===i.indexOf("javascript:")||0===i.indexOf("vbscript:"))return""}var o='<a href="'+e+'"';return-1===e.indexOf("http://")&&-1===e.indexOf("https://")&&(o+=" onclick=\"HanulWiki.GO('"+e+"'); return false;\""),t&&(o+=' title="'+t+'"'),o+=">"+n+"</a>"},n.prototype.image=function(e,t,n){var i='<img src="'+e+'" alt="'+n+'"';return t&&(i+=' title="'+t+'"'),i+=this.options.xhtml?"/>":">"},i.parse=function(e,t,n){var r=new i(t,n);return r.parse(e)},i.prototype.parse=function(e){this.inline=new t(e.links,this.options,this.renderer),this.tokens=e.reverse();for(var n="";this.next();)n+=this.tok();return n},i.prototype.next=function(){return this.token=this.tokens.pop()},i.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},i.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},i.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,i,r,s="",o="";for(n="",e=0;e<this.token.header.length;e++)i={header:!0,align:this.token.align[e]},n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(s+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",r=0;r<t.length;r++)n+=this.renderer.tablecell(this.inline.output(t[r]),{header:!1,align:this.token.align[r]});o+=this.renderer.tablerow(n)}return this.renderer.table(s,o);case"blockquote_start":for(var o="";"blockquote_end"!==this.next().type;)o+=this.tok();return this.renderer.blockquote(o);case"list_start":for(var o="",l=this.token.ordered;"list_end"!==this.next().type;)o+=this.tok();return this.renderer.list(o,l);case"list_item_start":for(var o="";"list_item_end"!==this.next().type;)o+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(o);case"loose_item_start":for(var o="";"list_item_end"!==this.next().type;)o+=this.tok();return this.renderer.listitem(o);case"html":var a=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(a);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},l.exec=l,c.options=c.setOptions=function(e){return a(c.defaults,e),c},c.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new n,xhtml:!1},c.Parser=i,c.parser=i.parse,c.Renderer=n,c.Lexer=e,c.lexer=e.lex,c.InlineLexer=t,c.inlineLexer=t.output,c.parse=c,"undefined"!=typeof module&&"object"==typeof exports?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):this.marked=c}.call(function(){return this||("undefined"!=typeof window?window:global)}()),HanulWiki.Form=CLASS({preset:function(){"use strict";return VIEW},init:function(e){"use strict";var t,n=DIV({style:{padding:10},c:[UUI.BUTTON({style:{flt:"left",color:"#4183c4"},title:"뒤로가기",on:{tap:function(){history.back()}}}),CLEAR_BOTH()]}).appendTo(HanulWiki.Layout.getContent());e.on("paramsChange",function(i){var r=i.id;NEXT([function(e){void 0===r?(TITLE(CONFIG.title+" :: 글작성"),e()):(r=r.replace(/@!/g,"/"),TITLE(CONFIG.title+" :: 글수정"),HanulWiki.ArticleModel.get(r,e))},function(){return function(i){var r,s;e.checkIsClosed()!==!0&&(void 0!==t&&t.remove(),n.append(t=UUI.VALID_FORM({style:{marginTop:10},errorMsgs:{id:{notEmpty:"이름을 입력해주세요.",size:function(e){return"이름은 "+e.max+"글자 미만으로 입력해주세요."},exists:function(){return"이미 존재하는 문서입니다."}},content:{notEmpty:"내용을 입력해주세요."}},errorMsgStyle:{padding:"5px 10px",backgroundColor:"#D83F25",color:"#fff"},c:[UUI.TEXT_BUTTON({style:{marginTop:10,flt:"right"},title:"기본 폼으로",on:{tap:function(){r.after(UUI.FULL_TEXTAREA({style:{marginTop:10,height:300,border:"1px solid #999"},value:void 0===i?void 0:i.content,name:"content"})),r.remove(),r=void 0}}}),CLEAR_BOTH(),r=DIV({style:{marginTop:10,height:300}}),UUI.FULL_SUBMIT({style:{marginTop:10,backgroundColor:"#4183C4",color:"#fff",fontWeight:"bold"},value:void 0===i?"글 작성":"글 수정"}),UUI.FULL_UPLOAD_FORM({style:{marginTop:10},box:HanulWiki,uploadSuccess:function(e,t){t.after(P({c:"![ScreenShot]("+HanulWiki.RF("THUMB/"+e.id)+")"}))}})],on:{submit:function(e,t){var n=t.getData();void 0!==i&&(n.id=i.id),void 0!==r&&(n.content=s.getValue()),(void 0===i?HanulWiki.ArticleModel.create:HanulWiki.ArticleModel.update)(n,{notValid:t.showErrors,success:function(e){HanulWiki.GO(e.id.replace(/\//g,"@!"))}})}}})),s=ace.edit(r.getEl()),s.setTheme("ace/theme/twilight"),s.getSession().setMode("ace/mode/markdown"),void 0!==i?(t.setData(i),s.setValue(i.content,1)):t.prepend(UUI.FULL_INPUT({style:{border:"1px solid #999"},placeholder:"이름",name:"id"})))}}])}),e.on("close",function(){n.remove()})}}),HanulWiki.Home=CLASS({preset:function(){"use strict";return VIEW},init:function(e){"use strict";var t,n,i,r=DIV({c:[void 0===CONFIG.description?"":P({style:{marginBottom:20},c:CONFIG.description}),DIV({c:[t=DIV({style:{marginRight:10,flt:"left",border:"1px solid #ccc"},c:H2({style:{backgroundColor:"#4183C4",color:"#fff",fontWeight:"bold",padding:5,textAlign:"center"},c:"인기글"})}),n=DIV({style:{marginRight:10,flt:"left",border:"1px solid #ccc"},c:H2({style:{backgroundColor:"#4183C4",color:"#fff",fontWeight:"bold",padding:5,textAlign:"center"},c:"최신글"})}),i=DIV({style:{flt:"left",border:"1px solid #ccc"},c:H2({style:{backgroundColor:"#4183C4",color:"#fff",fontWeight:"bold",padding:5,textAlign:"center"},c:"최근 수정글"})}),CLEAR_BOTH()]})]}).appendTo(HanulWiki.Layout.getContent());TITLE(CONFIG.title),HanulWiki.ArticleModel.find({count:20,sort:{viewCount:-1}},EACH(function(n){var i;e.checkIsClosed()!==!0&&(t.append(DIV({style:{padding:5},c:[i=A({style:{color:"#4183c4"},c:n.id,on:{tap:function(){HanulWiki.GO(n.id.replace(/\//g,"@!"))}}}),SPAN({style:{marginLeft:5,fontSize:10},c:"("+n.viewCount+")"})]})),GET({host:"tagengine.btncafe.com",uri:"__REP_TAG",paramStr:"tag="+encodeURIComponent(n.id)},function(e){i.empty(),i.append(e)}))})),HanulWiki.ArticleModel.find({count:20},EACH(function(t){var i;e.checkIsClosed()!==!0&&(n.append(DIV({style:{padding:5},c:[i=A({style:{color:"#4183c4"},c:t.id,on:{tap:function(){HanulWiki.GO(t.id.replace(/\//g,"@!"))}}}),SPAN({style:{marginLeft:5,fontSize:10},c:"("+t.viewCount+")"})]})),GET({host:"tagengine.btncafe.com",uri:"__REP_TAG",paramStr:"tag="+encodeURIComponent(t.id)},function(e){i.empty(),i.append(e)}))})),HanulWiki.ArticleModel.find({count:20,sort:{lastUpdateTime:-1}},EACH(function(t){var n;e.checkIsClosed()!==!0&&(i.append(DIV({style:{padding:5},c:[n=A({style:{color:"#4183c4"},c:t.id,on:{tap:function(){HanulWiki.GO(t.id.replace(/\//g,"@!"))}}}),SPAN({style:{marginLeft:5,fontSize:10},c:"("+t.viewCount+")"})]})),GET({host:"tagengine.btncafe.com",uri:"__REP_TAG",paramStr:"tag="+encodeURIComponent(t.id)},function(e){n.empty(),n.append(e)}))})),e.on("close",function(){r.remove()})}}),HanulWiki.Layout=CLASS(function(e){"use strict";var t,n,i,r={fontSize:12},s=!1;return e.checkIsAuthed=n=function(){return s},e.getContent=i=function(){return t},{preset:function(){return VIEW},init:function(e){var n,i,o=HanulWiki.STORE("passwordStore"),l=HanulWiki.ROOM("authRoom"),a=DIV({style:{backgroundColor:"#fff",color:"#000"},c:[n=DIV({style:{backgroundColor:"#4183C4",color:"#fff",fontWeight:"bold"}}),t=DIV({style:{padding:10}}),i=DIV({style:{borderTop:"1px solid #ccc",backgroundColor:"#eee",padding:10}})]}).appendTo(BODY);void 0!==CONFIG.HanulWiki&&("CC BY"===CONFIG.HanulWiki.license?i.append(DIV({style:r,c:[A({href:"http://creativecommons.org/licenses/by/4.0/",c:IMG({src:"https://i.creativecommons.org/l/by/4.0/88x31.png"})}),BR(),"이 저작물은 ",A({href:"http://creativecommons.org/licenses/by/4.0/",c:"크리에이티브 커먼즈 저작자표시 4.0 국제 라이선스"}),"에 따라 이용할 수 있습니다."]})):"CC BY-SA"===CONFIG.HanulWiki.license?i.append(DIV({style:r,c:[A({href:"http://creativecommons.org/licenses/by-sa/4.0/",c:IMG({src:"https://i.creativecommons.org/l/by-sa/4.0/88x31.png"})}),BR(),"이 저작물은 ",A({href:"http://creativecommons.org/licenses/by-sa/4.0/",c:"크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스"}),"에 따라 이용할 수 있습니다."]})):"CC BY-ND"===CONFIG.HanulWiki.license?i.append(DIV({style:r,c:[A({href:"http://creativecommons.org/licenses/by-nd/4.0/",c:IMG({src:"https://i.creativecommons.org/l/by-nd/4.0/88x31.png"})}),BR(),"이 저작물은 ",A({href:"http://creativecommons.org/licenses/by-nd/4.0/",c:"크리에이티브 커먼즈 저작자표시-변경금지 4.0 국제 라이선스"}),"에 따라 이용할 수 있습니다."]})):"CC BY-NC"===CONFIG.HanulWiki.license?i.append(DIV({style:r,c:[A({href:"http://creativecommons.org/licenses/by-nc/4.0/",c:IMG({src:"https://i.creativecommons.org/l/by-nc/4.0/88x31.png"})}),BR(),"이 저작물은 ",A({href:"http://creativecommons.org/licenses/by-nc/4.0/",c:"크리에이티브 커먼즈 저작자표시-비영리 4.0 국제 라이선스"}),"에 따라 이용할 수 있습니다."]})):"CC BY-NC-SA"===CONFIG.HanulWiki.license?i.append(DIV({style:r,c:[A({href:"http://creativecommons.org/licenses/by-nc-sa/4.0/",c:IMG({src:"https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"})}),BR(),"이 저작물은 ",A({href:"http://creativecommons.org/licenses/by-nc-sa/4.0/",c:"크리에이티브 커먼즈 저작자표시-비영리-동일조건변경허락 4.0 국제 라이선스"}),"에 따라 이용할 수 있습니다."]})):"CC BY-NC-ND"===CONFIG.HanulWiki.license&&i.append(DIV({style:r,c:[A({href:"http://creativecommons.org/licenses/by-nc-nd/4.0/",c:IMG({src:"https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png"})}),BR(),"이 저작물은 ",A({href:"http://creativecommons.org/licenses/by-nc-nd/4.0/",c:"크리에이티브 커먼즈 저작자표시-비영리-변경금지 4.0 국제 라이선스"}),"에 따라 이용할 수 있습니다."]})),void 0!==CONFIG.HanulWiki.copyright&&i.append(DIV({style:r,c:CONFIG.HanulWiki.copyright}))),l.send({methodName:"auth",data:o.get("password")},function(t){s=t,e.checkIsClosed()!==!0&&(n.append(H1({style:{flt:"left",padding:10,cursor:"pointer"},c:CONFIG.title,on:{tap:function(){HanulWiki.GO("")}}})),n.append(UUI.BUTTON_H({style:{flt:"left",padding:10},title:"처음으로",on:{tap:function(){HanulWiki.GO("")}}})),n.append(UUI.BUTTON_H({style:{flt:"left",padding:10},title:s===!0?"글 작성":"로그인",on:{tap:function(){HanulWiki.GO(s===!0?"func/new":"func/login")}}})),n.append(CLEAR_BOTH())),e.on("uriChange",function(e){void 0!==CONFIG.HanulWiki&&CONFIG.HanulWiki.isPrivate===!0&&s!==!0&&"func/login"!==e&&HanulWiki.GO("func/login")})}),e.on("close",function(){l.exit(),a.remove(),t=void 0})}}}),HanulWiki.Login=CLASS({preset:function(){"use strict";return VIEW},init:function(e){"use strict";var t=HanulWiki.STORE("passwordStore"),n=HanulWiki.ROOM("authRoom"),i=DIV({c:UUI.VALID_FORM({c:[UUI.FULL_INPUT({style:{border:"1px solid #999"},placeholder:"비밀번호",name:"password",type:"password"}),UUI.FULL_CHECKBOX({style:{marginTop:10},label:"로그인을 유지하시겠습니까?",name:"isRememberMe"}),UUI.FULL_SUBMIT({style:{marginTop:10,backgroundColor:"#4183C4",color:"#fff",fontWeight:"bold"},value:"로그인"})],on:{submit:function(e,i){var r=i.getData();n.send({methodName:"auth",data:r.password},function(e){e===!0?(t.save({name:"password",value:r.password,isToSession:r.isRememberMe!==!0}),HanulWiki.REFRESH("")):UUI.MODAL({style:{padding:"20px 30px",backgroundColor:"#ddd"},c:"비밀번호가 다릅니다."})})}}})}).appendTo(HanulWiki.Layout.getContent());TITLE(CONFIG.title+" :: 로그인"),e.on("close",function(){n.exit(),i.remove()})}}),HanulWiki.View=CLASS({preset:function(){"use strict";return VIEW},init:function(e){"use strict";var t=DIV().appendTo(HanulWiki.Layout.getContent());e.on("paramsChange",function(n){var i=n.id.replace(/@!/g,"/");HanulWiki.ArticleModel.get(i,function(n){var i,r,s,o=CALENDAR(TIME(n.createTime));e.checkIsClosed()!==!0&&(t.empty(),t.append(UUI.BUTTON({style:{flt:"left",color:"#4183c4"},title:"뒤로가기",on:{tap:function(){history.back()}}})),t.append(CLEAR_BOTH()),t.append(UUI.PANEL({style:{marginTop:10},contentStyle:{border:"1px solid #ccc"},c:[H3({style:{padding:10},c:[r=SPAN({c:n.id}),DIV({style:{flt:"right",marginTop:1,fontSize:12,color:"#999"},c:[SPAN({c:"조회수 "+n.viewCount}),SPAN({style:{marginLeft:10},c:o.getYear()+"년 "+o.getMonth()+"월 "+o.getDate()+"일 "+o.getHour()+"시 "+o.getMinute()+"분"})]}),CLEAR_BOTH()]}),DIV({style:{borderTop:"1px solid #ccc",padding:10},c:[HanulWiki.Layout.checkIsAuthed()===!0?DIV({style:{flt:"right",color:"#4183c4",marginBottom:10},c:[A({c:"글 수정",on:{tap:function(){HanulWiki.GO("func/update/"+n.id.replace(/\//g,"@!"))}}})," ",A({c:"글 삭제",on:{tap:function(){confirm("정말 삭제하시겠습니까?")===!0&&HanulWiki.ArticleModel.remove(n.id,function(){HanulWiki.REFRESH("")})}}})]}):"",CLEAR_BOTH(),i=P({style:{fontSize:14}})]})]})),i.getEl().setAttribute("class","markdown-body"),i.getEl().innerHTML=marked(n.content),s=function(e){var t,i,r,o="",l=[],a=0;if("A"!==e.tagName)if(void 0===e.tagName)t=e.textContent,EACH(e.textContent,function(e,t){" "!==e&&(l[o.length]=t,o+=e.toLowerCase())}),EACH(l,function(e,i){EACH(n.keywords,function(n){return o.substring(i,i+n.length)===n?(t=t.substring(0,e+a)+'<a href="'+n.replace(/\//g,"@!")+'" onclick="HanulWiki.GO(\''+n.replace(/\//g,"@!")+"'); return false;\">"+t.substring(e+a,l[i+n.length-1]+a+1)+"</a>"+t.substring(l[i+n.length-1]+a+1),a+=57+2*n.replace(/\//g,"@!").length,!1):void 0})}),i=document.createElement("span"),i.innerHTML=t,e.parentNode.insertBefore(i,e),e.remove();else for(r=0;r<e.childNodes.length;r+=1)s(e.childNodes[r])},s(i.getEl()),GET({host:"tagengine.btncafe.com",uri:"__REP_TAG",paramStr:"tag="+encodeURIComponent(n.id)},function(e){r.empty(),r.append(e)}))})}),e.on("close",function(){t.remove()})}});