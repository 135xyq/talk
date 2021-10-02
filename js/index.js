(function() {
    var btn = document.querySelector('.footer .btn');
    var ipt = document.querySelector('.footer input');
    var iptNull = document.getElementsByClassName('input-null')[0];
    var init = function() {
        addEvents();
    }

    var addEvents = function() {
        btn.addEventListener('click', setData); //发送按钮添加事件
        ipt.addEventListener('keypress', onEnterSetData);
        // ipt.addEventListener('focus', setDisplay);//将提示框隐藏
    }

    // 按下enter发送信息
    var onEnterSetData = function(e) {
        if (e.key === 'Enter') {
            console.log(1);
            setData();
        }
    }

    var setDisplay = function() {
        if (ipt.value) {
            // console.log('gtrb');
            iptNull.style.display = 'none';
        }
    }

    var setData = function() {
        var txt = ipt.value.trim(); //输入框内容（去除空格）
        // console.log(txt);
        if (!txt) { //输入框为空
            iptNull.style.display = 'block';
            setTimeout(function() {
                iptNull.style.display = 'none';
            }, 1500); //发送内容为空就在1.5秒后提示框消失
            return;
        } else {
            // scrollToBottom();
            // 渲染页面
            renderPage(txt);
            // scrollToBottom();
        }
    }

    // 每次发送完信息，让页面滚动到最底部
    var scrollToBottom = function() {
        var height = content.scrollHeight;
        // console.log(height);
        content.scrollTop = height;
    }

    var renderPage = function(txt) {
        // 将信息添加到自己的信息栏中
        txtInToHtml(txt, 'right');
        scrollToBottom(); //每次渲染完消息都自动滚动到可见区域


        // 清空输入框
        ipt.value = '';

        // 向后台请求数据
        setDataToBackEnd(txt);
    }

    var setDataToBackEnd = function(txt) {
        ajax({
            url: 'https://api.hyfarsight.com/test/testRequest/robotChat',
            method: 'POST',
            data: { txt: txt }, // 参数也是由后端约定
            onSuccess: function(res) {
                var reg1 = /喜欢谁/;
                var reg2 = /爱谁/;
                if (reg1.test(txt) || reg2.test(txt)) {
                    txtInToHtml("我喜欢冯孟宇，永远喜欢！爱意随风起，风止意难平！");
                } else { txtInToHtml(res.responseTxt, 'left'); }

                scrollToBottom(); //每次渲染完消息都自动滚动到可见区域
            }
        })
    }

    var txtInToHtml = function(txt, str) {
        var divNode = document.createElement('div');
        divNode.className = str === 'right' ? 'avatar-container chat-container' : 'robot-container chat-container';
        var img = document.createElement('img');
        img.src = str === 'right' ? "./img/xyq.jpg" : "./img/hsz.jpg";
        var childDiv = document.createElement('div');
        childDiv.className = 'text-container';
        childDiv.innerHTML = txt.replace(/{br}/g, '<br/>');
        divNode.appendChild(img);
        divNode.appendChild(childDiv);
        content.appendChild(divNode);
    }
    init();
})();