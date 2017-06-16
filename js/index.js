/*jsonp输入框模块开始*/
var fnSearch = null;
var inputValue = DOM.next(DOM.getByClassName("glass")[0]).defaultValue;
var scriptId = 0;
/*onChange方法有兼容性问题，这里的思路是使用定时器，每隔1秒检测一次输入框是否有值*/
var searchTimer = window.setInterval(function () {
    try {
        document.body.removeChild(document.getElementById(scriptId));
    } catch (e) {

    }
    var value = DOM.next(DOM.getByClassName("glass")[0]).value;
    if (value == "" || value == inputValue) {
        return;
    } else {
        inputValue = value;
        fnSearch = function (data) {
            //操作
            if (data.result.code == 0) {
                var array = data.item;
                var oUl = DOM.getByClassName("searchend")[0];
                var str = '';
                for (var i = 0; i < array.length; i++) {
                    var cur = array[i];
                    if (cur["idType"] >= 2 && cur["class"] != "电影" && cur["da"]) {
                        str += '<li><a href="' + cur["url"] + '" class="item_posi"><span class="result_title">' + cur["title"] + '</span><span class="title_desc">(' + cur["da"] + ')&nbsp;' + cur["class"] + '</span><span class="item_posi"><i class="icon_arrow"></i></span></a><div class="wrap_content"><a href="" class="figure"><img src="' + cur["dc"] + '" alt=""></a><div class="wrap_right"><div class="detail_list"><h3>' + cur["tt"] + '</h3><p>' + cur["ee"] + '</p><p>主演：' + cur["pa"] + '</p></div><a href="' + cur["url"] + '" class="btn_play">立即播放</a></div></div></li>';
                    } else {
                        str += '<li><a href="http://v.qq.com/search.html?pagetype=3&stj2=search.smartbox&stag=txt.smart_index&ms_key=' + cur["word"] + '" class="item_posi"><span class="result_title">' + cur["title"] + '</span><span class="title_desc">&nbsp;</span></a></li>'
                    }
                }
                oUl.innerHTML = str;
                oUl.style.display = "block";
            }
        };
        var script = document.createElement("script");
        script.id = ++scriptId;
        script.src = "http://s.video.qq.com/smartbox?plat=2&ver=0&num=10&otype=json&query=" + value + "&callback=fnSearch&low_login=1&_=1461240039775";
        document.body.appendChild(script);
    }
}, 1000);
/*jsonp输入框模块结束*/
(function () {
    //全网搜input输入框处理，获得焦点失去焦点清除内容
    var input = DOM.next(DOM.getByClassName("glass")[0]);
    on(input, "focus", function () {
        if (this.value = this.defaultValue)this.value = "";
    });
    on(input, "blur", function () {
        if (this.value == "")this.value = this.defaultValue;
        DOM.getByClassName("searchend")[0].style.display = "none";
    });
    //导航栏处理
    navigate(DOM.getByClassName("bannerbottom-left")[0]);
    navigate(DOM.getByClassName("bannerbottom-right")[0]);
    //轮播图处理
    var oUlSmall = DOM.getByClassName("viwebtphoto")[0];
    /*轮播图大图的左右点击按钮绑定点击事件*/
    var left = DOM.getByClassName("btn_prev")[0];
    on(left, "click", leftClick);
    var right = DOM.getByClassName("btn_next")[0];
    on(right, "click", rightClick);
    DOM.children(DOM.children(DOM.children(DOM.getByClassName("viwebtphoto")[0], "li")[0], "a")[0], "i")[0].style.display = "block";
    DOM.setCss(DOM.children(DOM.children(DOM.getByClassName("viwebtphoto")[0], "li")[0], "a")[0], "opacity", "1");
    /*中央大轮播图*/
    carousel(DOM.getByClassName("viweinner")[0], DOM.getByClassName("viwebtphoto")[0], true, 0);
    /*侧面三个小轮播图*/
    carousel(DOM.getByClassName("ad_listcf")[0], DOM.getByClassName("ad_page")[0], false, 0);
    carousel(DOM.getByClassName("ad_listcf")[1], DOM.getByClassName("ad_page")[1], false, 1);
    carousel(DOM.getByClassName("ad_listcf")[2], DOM.getByClassName("ad_page")[2], false, 2);
    //logo登录
    var logoA = DOM.children(DOM.getByClassName("QQ")[0], "a")[0];
    var logoClose = DOM.getByClassName("logoBoardClose")[0];
    //给三个登录绑定登录事件
    logoA.onclick = openLogo;
    DOM.getByClassName("login")[0].onclick=openLogo;
    DOM.getByClassName("login")[1].onclick=openLogo;
    //登录按钮的事件
    function openLogo() {
            DOM.getByClassName("logoBoard")[0].style.display = "block";
            var light = document.getElementById("light");
            light.style.height = (document.documentElement.offsetHeight || document.body.offsetHeight) + "px";
        DOM.getByClassName("wxLogo")[0].style.display="none";
        DOM.getByClassName("qqLogo")[0].style.display="block";
        DOM.addClass(document.getElementById("tabOne"),"optionSelectQQ");
        DOM.removeClass(document.getElementById("tabTwo"),"optionSelectWx");
    }
    //关闭登录窗口
    logoClose.onclick = function () {
        DOM.getByClassName("logoBoard")[0].style.display = "none";
        light.style.height = "0";
    };
    //轮播图大图的左右点击按钮绑定点击事件
    function leftClick() {
        var defaultLeft = parseFloat(DOM.getCss(oUlSmall, "left"));
        if (defaultLeft < 0) {
            animate(oUlSmall, {"left": 0}, 1);
        } else {
            animate(oUlSmall, {"left": -oUlSmall.offsetWidth / 2}, 1);
        }
    }
    function rightClick() {
        var defaultLeft = parseFloat(DOM.getCss(oUlSmall, "left"));
        if (defaultLeft < 0) {
            animate(oUlSmall, {"left": 0}, 1);
        } else {
            animate(oUlSmall, {"left": -oUlSmall.offsetWidth / 2}, 1);
        }
    }

    /**
     * 导航栏显示隐藏子div
     * @param ele 导航栏
     */
    function navigate(ele) {
        var oLis = DOM.children(ele, "li");
        var oAs = [];
        TOOLS.each(oLis, function (item) {
            oAs.push(DOM.children(item, "a")[0]);
        });
        TOOLS.each(oAs, function (item) {
            on(item, "mouseenter", function () {
                var next = DOM.next(this);
                on(next, "mouseenter", function () {
                    this.style.display = "block";
                });
                DOM.next(this).style.display = "block";
            });
            on(item, "mouseleave", function () {
                var next = DOM.next(this);
                on(next, "mouseleave", function () {
                    this.style.display = "none";
                });
                DOM.next(this).style.display = "none";
            });
        });
        function hover() {
            DOM.next(this).style.display = "block";
            var othersLi = DOM.siblings(this.parentNode);
            TOOLS.each(othersLi, function (item) {
                var oDivs = DOM.children(item, "div")[0].style.display = "none";
            });
            return false;
        }
    }

    /**
     * 自动轮播
     * @param photoArea  图片区域
     * @param btnArea  按钮区域
     * @param flag 轮播图类型，true大轮播图。false小轮播图
     * @param num  第几个
     */
    function carousel(photoArea, btnArea, flag, num) {
        var photoWidth = DOM.firstChild(photoArea).offsetWidth;
        var btnLis = flag?DOM.children(btnArea, "li"):DOM.children(btnArea, "a");
        for (var i = 0; i < btnLis.length; i++) {
            btnLis[i].index = i;
            btnLis[i].onmouseenter = function () {
                changeColor(this.index);
                if(flag){
                    animate(photoArea, {left: -photoWidth * this.index}, 0, 1);
                }else{
                    animate(photoArea, {left: -photoWidth * this.index}, 0, 1);
                }
                step = this.index;
                window.clearInterval(autoTimer);
                autoTimer = window.setTimeout(function () {
                    autoTimer = window.setInterval(autoMove, 3000);
                }, 3000)
            }
        }

        if(flag){
            var div = photoArea.getElementsByTagName("div")[0].cloneNode(true);
            photoArea.appendChild(div);
            photoArea.style.width = photoArea.offsetWidth + div.offsetWidth + "px";
        }else{
            var div = photoArea.getElementsByTagName("li")[0].cloneNode(true);
            photoArea.appendChild(div);
            photoArea.style.width = photoArea.offsetWidth + div.offsetWidth + "px";
        }

        var step = 0;

        function autoMove() {
            if(flag){
                step++;
                if (step == 15) {
                    photoArea.style.left = 0;
                    step = 1;
                }
                if (step % 7 == 0)rightClick();
                if (step == 14) {
                    changeColor(0);
                } else {
                    changeColor(step);
                }
                animate(photoArea, {left: -photoWidth * step}, 0, 1);
            }else{
                step++;
                if (step == 4) {
                    photoArea.style.left = 0;
                    step = 1;
                }
                if (step == 3) {
                    changeColor(0);
                } else {
                    changeColor(step);
                }
                animate(photoArea, {left: -photoWidth * step}, 0, 1);
            }

        }

        var autoTimer = window.setInterval(autoMove, 3000);

        function changeColor(n) {
            if (flag) {
                var oSpan1 = DOM.getByClassName("viweb_t")[0];
                var oSpan2 = DOM.getByClassName("viweb_b")[0];
                for (var i = 0; i < btnLis.length; i++) {
                    var oIs = DOM.children(DOM.children(btnLis[i], "a")[0], "i")[0];
                    oIs.style.display = "none";
                    var oAs = DOM.children(btnLis[i], "a")[0];
                    DOM.setCss(oAs, "opacity", "1");
                    //改变左侧文字
                    oSpan1.innerHTML = DOM.children(oAs, "span")[0].innerHTML;
                    oSpan2.innerHTML = DOM.children(oAs, "span")[1].innerHTML;
                }
                var oIsN = DOM.children(DOM.children(btnLis[n], "a")[0], "i")[0];
                oIsN.style.display = "block";
                var oAsN = DOM.children(btnLis[n], "a")[0];
                DOM.setCss(oAsN, "opacity", "1");
                oSpan1.innerHTML = DOM.children(DOM.children(btnLis[n], "a")[0], "span")[0].innerHTML;
                oSpan2.innerHTML = DOM.children(DOM.children(btnLis[n], "a")[0], "span")[1].innerHTML;
            } else {
                var oSpan = DOM.getByClassName("ad_page")[num];
                var oAs=oSpan.getElementsByTagName("a");
                TOOLS.each(oAs,function (item) {
                    item.className="page_item";
                });
                oAs[n].className="current";
            }

        }
    }

    var aryScroll = [0];
    //滚动条滚动的时候进行的操作
    window.onscroll = function () {
        var h = document.documentElement.scrollTop || document.body.scrollTop;
        aryScroll.push(h);//这里将每次滑动翻过去的距离记录到数组里
        //返回顶部代码
        if (h > 0) {
            var backTop = document.getElementById("backTop");
            backTop.style.display = "block";
            backTop.onclick = function () {
                var backTopTimer=window.setInterval(function () {
                    document.body.scrollTop*=0.8;
                    if(document.body.scrollTop<=1){
                        document.body.scrollTop=0;
                        window.clearInterval(backTopTimer);
                    }
                },5);
                this.style.display = "none";
            }
        }
        //搜索框下滑隐藏。
        var banner = DOM.getByClassName("banner")[0];
        if (h > 126) {
            // animate(banner, {height: 0}, 1000);
            banner.style.display="none";
        }
        if (aryScroll[aryScroll.length - 2] > aryScroll[aryScroll.length - 1]) {
            //根据数组中最后两项的值判断是否是向上滑。让倒数第二项的值大于倒数第一项的值的时候说明是上滑
            // animate(banner, {height: 253}, 1000);
            banner.style.display="block";
        }
    };
    /**
     * 滑动门
     * @param doorUl 滑动门ul区域
     * 每个li中有一张短图一张长图，当鼠标滑到短图上的时候：ul向左滑动，增加li的宽度，显示长图
     * ul向左滑动的距离是当前li的索引*li的宽度。最后一个li作特殊处理
     */
    doorMove(DOM.getByClassName("door")[0]);
    doorMove(DOM.getByClassName("door")[1]);
    doorMove(DOM.getByClassName("door")[2]);
    doorMove(DOM.getByClassName("door")[3]);
    function doorMove(doorUl) {
        var doorLis = doorUl.getElementsByTagName("li");
        TOOLS.each(doorLis, function (val, index) {
            if (index == 4) {
                index = 3;
            }
            val.index = index;
            on(val, "mousemove", function () {
                animate(doorUl, {"left": -val.index * 248}, 1000);
                var span = DOM.children(this, "span")[0];
                animate(span, {"width": 744}, 1000);
                animate(this, {"width": 992}, 1000);
            });
            on(val, "mouseout", function () {
                animate(doorUl, {"left": 0}, 1000);
                var span = DOM.children(this, "span")[0];
                animate(span, {"width": 0}, 1000);
                animate(this, {"width": 248}, 1000);
            })
        })
    }

})();


