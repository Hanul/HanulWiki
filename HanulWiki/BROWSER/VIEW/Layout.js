HanulWiki.Layout = CLASS(function(cls) {
	'use strict';

	var
	// license style
	licenseStyle = {
		fontSize : 12
	},
	
	// is authed
	isAuthed = false,
	
	// content
	content,
	
	// check is authed.
	checkIsAuthed,
	
	// get content.
	getContent;
	
	cls.checkIsAuthed = checkIsAuthed = function() {
		return isAuthed;
	};
	
	cls.getContent = getContent = function() {
		return content;
	};

	return {

		preset : function() {
			return VIEW;
		},

		init : function(inner, self) {

			var
			// password store
			passwordStore = HanulWiki.STORE('passwordStore'),
			
			// auth room
			authRoom = HanulWiki.ROOM('authRoom'),
			
			// menu
			menu,
			
			// footer
			footer,
			
			// layout
			layout = DIV({
				style : {
					backgroundColor : '#fff',
					color : '#000'
				},
				c : [menu = DIV({
					style : {
						backgroundColor : CONFIG.HanulWiki.baseColor,
						color : '#fff',
						fontWeight : 'bold'
					}
				}),
				
				content = DIV({
					style : {
						padding : 10
					}
				}),
				
				footer = DIV({
					style : {
						borderTop : '1px solid #ccc',
						backgroundColor : '#eee',
						padding : 10
					}
				})]
			}).appendTo(BODY);
				
			if (CONFIG.HanulWiki.license === 'CC BY') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by/4.0/',
						c : IMG({
							src : 'https://i.creativecommons.org/l/by/4.0/88x31.png'
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by/4.0/',
						c : '크리에이티브 커먼즈 저작자표시 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			else if (CONFIG.HanulWiki.license === 'CC BY-SA') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by-sa/4.0/',
						c : IMG({
							src : 'https://i.creativecommons.org/l/by-sa/4.0/88x31.png'
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by-sa/4.0/',
						c : '크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			else if (CONFIG.HanulWiki.license === 'CC BY-ND') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by-nd/4.0/',
						c : IMG({
							src : 'https://i.creativecommons.org/l/by-nd/4.0/88x31.png'
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by-nd/4.0/',
						c : '크리에이티브 커먼즈 저작자표시-변경금지 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			else if (CONFIG.HanulWiki.license === 'CC BY-NC') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by-nc/4.0/',
						c : IMG({
							src : 'https://i.creativecommons.org/l/by-nc/4.0/88x31.png'
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by-nc/4.0/',
						c : '크리에이티브 커먼즈 저작자표시-비영리 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			else if (CONFIG.HanulWiki.license === 'CC BY-NC-SA') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by-nc-sa/4.0/',
						c : IMG({
							src : 'https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png'
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by-nc-sa/4.0/',
						c : '크리에이티브 커먼즈 저작자표시-비영리-동일조건변경허락 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			else if (CONFIG.HanulWiki.license === 'CC BY-NC-ND') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by-nc-nd/4.0/',
						c : IMG({
							src : 'https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png'
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by-nc-nd/4.0/',
						c : '크리에이티브 커먼즈 저작자표시-비영리-변경금지 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			if (CONFIG.HanulWiki.copyright !== undefined) {
				footer.append(DIV({
					style : licenseStyle,
					c : CONFIG.HanulWiki.copyright
				}));
			}
			
			authRoom.send({
				methodName : 'auth',
				data : passwordStore.get('password')
			}, function(_isAuthed) {
				
				isAuthed = _isAuthed;
				
				if (inner.checkIsClosed() !== true) {
					
					if (CONFIG.HanulWiki.logo !== undefined) {
					
						menu.append(IMG({
							style : {
								flt : 'left',
								cursor : 'pointer'
							},
							src : HanulWiki.R(CONFIG.HanulWiki.logo),
							on : {
								tap : function() {
									HanulWiki.GO('');
								}
							}
						}));
					}
					
					menu.append(H1({
						style : {
							flt : 'left',
							padding : 10,
							cursor : 'pointer'
						},
						c : CONFIG.title,
						on : {
							tap : function() {
								HanulWiki.GO('');
							}
						}
					}));
				
					menu.append(FORM({
						style : {
							flt : 'left'
						},
						c : [UUI.FULL_INPUT({
							style : {
								marginTop : 5,
								flt : 'left',
								width : 100
							},
							name : 'id'
						}), UUI.FULL_SUBMIT({
							style : {
								marginTop : 5,
								flt : 'left',
								width : 50,
								padding : 5,
								backgroundColor : '#ccc'
							},
							value : '이동'
						}), CLEAR_BOTH()],
						on : {
							submit : function(e, form) {
								HanulWiki.GO(form.getData().id.replace(/\//g, '@!'));
							}
						}
					}));
					
					menu.append(UUI.BUTTON_H({
						style : {
							marginLeft : 10,
							flt : 'left',
							padding : 10
						},
						title : '처음으로',
						on : {
							tap : function() {
								HanulWiki.GO('');
							}
						}
					}));
					
					menu.append(UUI.BUTTON_H({
						style : {
							flt : 'left',
							padding : 10
						},
						title : isAuthed === true ? '글 작성' : '로그인',
						on : {
							tap : function() {
								HanulWiki.GO(isAuthed === true ? 'func/new' : 'func/login');
							}
						}
					}));
					
					menu.append(CLEAR_BOTH());
				}
			
				inner.on('uriChange', function(uri) {
					if (CONFIG.HanulWiki.isPrivate === true && isAuthed !== true && uri !== 'func/login') {
						HanulWiki.GO('func/login');
					}
				});
			});
			
			inner.on('close', function() {
				authRoom.exit();
				layout.remove();
				content = undefined;
			});
		}
	};
});