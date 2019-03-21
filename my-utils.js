// cookie处理
// money格式化 (format)

// 日期对象转毫秒数：dateObj.getTime()
// 毫秒数转日期对象：new Date(timestamp)

var BaseUtil = {
    /**
     * 获取url中的参数
     * 
     * @param {String} url(最多只能有一个问号)
     * @return {Object} json
     */
	getUrlParams: function (url) {
		var searchUrl = url || window.location.search;
		var searchIndex = searchUrl.indexOf('?');
		
		var json = {};
		
		if (searchIndex != -1) {
			var paramsArr = searchUrl.substring(searchIndex + 1).split('&');
			for (var i = 0; i < paramsArr.length; i++) {
				var pairIndex = paramsArr[i].indexOf('=');
				if (pairIndex != -1) {
					var key = paramsArr[i].split('=')[0];
					var value = paramsArr[i].split('=')[1];
					json[key] = value;
				}
			}
		}
		return json;
	}
}

// 日期格式化
var DateUtil = {
    /**
     * @param {Number} timestamp(时间戳)
     * @param {String} str(年月日连接符)
     */
    toYMDhms: function (timestamp, str) {
        if (!timestamp) {
            return '';
        }
        var date = new Date(timestamp),
        	str = str || '-',
        	Y = date.getFullYear(),
        	M = date.getMonth() + 1,
        	D = date.getDate(),
        	h = date.getHours(),
        	m = date.getMinutes(),
        	s = date.getSeconds();
        return Y +
            str + (M < 10 ? ('0' + M) : M) +
            str + (D < 10 ? ('0' + D) : D) +
            ' ' + (h < 10 ? ('0' + h) : h) +
            ':' + (m < 10 ? ('0' + m) : m) +
            ':' + (s < 10 ? ('0' + s) : s);
    },
    toYMDhm: function (timestamp, str) {
        if (!timestamp) {
            return '';
        }
        var date = new Date(timestamp),
        	str = str || '-',
        	Y = date.getFullYear(),
        	M = date.getMonth() + 1,
        	D = date.getDate(),
        	h = date.getHours(),
        	m = date.getMinutes();
        return Y +
            str + (M < 10 ? ('0' + M) : M) +
            str + (D < 10 ? ('0' + D) : D) +
            ' ' + (h < 10 ? ('0' + h) : h) +
            ':' + (m < 10 ? ('0' + m) : m);
    },
    toYMD: function (timestamp, str) {
        if (!timestamp) {
            return '';
        }
        var date = new Date(timestamp),
        	str = str || '-',
        	Y = date.getFullYear(),
        	M = date.getMonth() + 1,
        	D = date.getDate();
        return Y +
            str + (M < 10 ? ('0' + M) : M) +
            str + (D < 10 ? ('0' + D) : D);
    }
}


// 字符串处理
var StringUtil = {
	/**
	 * 判断字符串是否为空(只有  str='' 的时候才是false)
	 * 
	 * @param {String} str
	 * @return {Boolean}
	 */
	isEmpty: function (str) {
		/* 如果 str 为 undefined, null 呢？
		 * 
		if (str === '') {
			return true
		} else {
			return false
		}
		*/
		
		if (str) {
			console.log('不为空');
			return false;
		} else {
			console.log('为空');
			return true;
		}
	}
}

// number运算 (浮点数计算bug, 随机数生成)

// 浮点数计算 bug, 四则运算: 加减乘除
var NumberUtil = {
	// 加
	add: function (arg1, arg2) {
		var r1, r2, m;
		try { r1 = arg1.toString().split('.')[1].length } catch (err) { r1 = 0 }
		try { r2 = arg2.toString().split('.')[1].length } catch (err) { r2 = 0 }
		
		m = Math.pow(10, Math.max(r1, r2));
		return (arg1*m + arg2*m) / m;
	},
	// 减
	sub: function (arg1, arg2) {
		var r1, r2, m;
		try { r1 = arg1.toString().split('.')[1].length } catch (err) { r1 = 0 }
		try { r2 = arg2.toString().split('.')[1].length } catch (err) { r2 = 0 }
		
		m = Math.pow(10, Math.max(r1, r2));
		return (arg1*m - arg2*m) / m;
	},
	// 乘
	mul: function (arg1, arg2) {
		var s1 = arg1.toString(), s2 = arg2.toString(), m = 0;
		try { m += s1.split('.')[1].length } catch (err) {}
		try { m += s2.split('.')[1].length } catch (err) {}
		
		s1 = Number(s1.replace(".", ""));
		s2 = Number(s2.replace(".", ""));
		
		return s1*s2 / Math.pow(10, m);
	},
	// 除
	div: function (arg1, arg2) {
		var s1 = arg1.toString(), s2 = arg2.toString(), r1 = 0, r2 = 0;
		try { r1 = s1.split('.')[1].length } catch (err) {}
		try { r2 = s2.split('.')[1].length } catch (err) {}
		
		s1 = Number(s1.replace(".", ""));
		s2 = Number(s2.replace(".", ""));
		
		return this.mul(s1/s2, Math.pow(10, r2-r1));
	},
	// 除: 方法二
	div2: function (arg1, arg2) {
		var s1, s2, r1 = 0, r2 = 0, m;
		try { r1 = arg1.toString().split('.')[1].length } catch (err) {}
		try { r2 = arg2.toString().split('.')[1].length } catch (err) {}
		
		m = Math.pow(10, Math.max(r1, r2));
		
		s1 = arg1 * m;
		s2 = arg2 * m;
		
		return s1/s2;
	},
	// 求余 (假余数，其实余数只存在整数之间相除)
	mod: function (arg1, arg2) {
		var s1 = this.div(arg1, arg2).toString().split('.')[0];
		var s2 = this.mul(arg2, s1);
		
		return this.sub(arg1, s2);
	}
}

//  浮点数 bug 测试用
//	console.log(0.2 + 0.1);
//	console.log(2.2 - 1.2);
//	console.log(0.068 * 100);
//	console.log(1.2 / 3);
//	console.log(3.2 % 2);



// 获取验证码倒计时
//function timeCountDown (e) {
//	console.log(e)
//}

// 和上面直接定义函数方法，哪种方法好
var TimeCountDown = function (e, func) {
	var self = e;
	var count = 6;
	self.disabled = true;	//还可以添加自定义样式
	self.innerText = count + 's重新获取';
	func()	//在调用处定义发送验证码，也可以不传这个参数，发送后 再调用 倒计时
	
	var timer = setInterval(function () {
		count--;
		if (count === 0) {
			clearInterval(timer);
			count = 6;
			self.innerText = '重新获取';
			self.disabled = false;
		} else {
			self.innerText = count + 's重新获取';
		}
	}, 1000);
}

// 发送验证码
function func () {
	console.log('发送验证码')
}
