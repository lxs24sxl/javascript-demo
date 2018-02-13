// 脚本加载的期间提前检测
// 条件预加载确保所有函数调消耗的时间相同。
var addHandler = document.body.addEventListener ?
				// 主流浏览器
				function ( target, eventType, handler ) {
					target.addEventListener(eventType, handler, false);
				}:
				// IE
				function ( target, eventType, handler ) {
					target.attachEvent( "on" + eventType, handler );
				};
var removeHandler = document.body.removeEventListener ?
				// 主流浏览器
				function ( target, eventType, handler ) {
					target.removeEventListener(eventType, handler, false);
				}:
				// IE
				function ( target, eventType, handler ) {
					target.detachEvent( "on" + eventType, handler );
				};

/*集合转数组:提高遍历效率*/
function toArray ( coll ) {
	for ( var i = 0, a = [], len = coll.length; i < len; i++ ) {
		a[ i ] = coll[ i ];
	}
	return a;
}

/**
 * @desc 判断元素是否有某个class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
 function removeClass ( ele, cls ) {
 	if ( hasClass( ele, cls )) {
 		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
 		ele.className = ele.className.replace( reg, '');
 	}
 }
 /**
  * @desc 判断元素是否有某个class
  * @param {HTMLElement} ele
  * @param {String} cls
  * @return {Boolean}
  */
 function hasClass ( ele, cls ) {
 	return ( new RegExp( '(\\s|^)' + cls + '(\\s|$)')).test( ele.className );
 }
 /**
  * @desc 为元素添加class
  * @param {HTMLElement} ele
  * @param {String} cls
  */
 function addClass( ele, cls ) {
 	if ( !hasClass( ele, cls )) {
 		ele.className += ' ' + cls;
 	}
 }

// 获取包括菜单按钮的div
var oNewsTab = document.getElementById( "newsTab" );
// 获取菜单按钮
var oTabA = toArray( oNewsTab.getElementsByTagName( "a" ) );
// 获取执行动画的几个div
var newsList = toArray( document.getElementsByClassName( "i_news_list" ));
// 定义局部变量：获取菜单按钮的数量
var oTabALen = oTabA.length;
for ( var i = 0; i < oTabALen; i++ ) {
	// 使用闭包处理 i 溢出问题
	// 不这样处理的话，点击事件只会是最后一个的效果
	(function (x){
		addHandler( oTabA[ x ], "click", function () {
			for ( var j = 0; j < oTabALen; j++ ) {
				// 移除菜单的效果
				removeClass(oTabA[ j ], "cur");
				// 移除(初始化)所有的子div添加animation动画效果
				removeClass( newsList[ j ], "active");
				// 隐藏(初始化)所有的子div
				newsList[ j ].style.cssText = "display: none";
			}
			// 为与菜单项向对应的下标一致的 子div 添加类名
			// 作用: 添加动画效果
			addClass( newsList[ x ], "active");
			// 将与菜单项向对应的下标一致的 子div 显示
			newsList[ x ].style.cssText = "display: block";
			// 选中当前菜单项
			addClass(oTabA[ x ], "cur");
		});
	})(i);
}