(function (window) {

  function Base64() {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var base64DecodeChars = new Array(
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
      52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
      -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
      -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var that = this
    // public method for encoding
    this.encode = function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = that._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
      }
      return output;
    }

    // public method for decoding
    this.decode = function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = that._utf8_decode(output);
      return output;
    }

    // private method for UTF-8 encoding
    this._utf8_encode = function (string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }

      }
      return utftext;
    }

    // private method for UTF-8 decoding
    this._utf8_decode = function (utftext) {
      var string = "";
      var i = 0;
      var c, c1, c2;
      c = c1 = c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    }
    this.utf8to16 = function (str) {
      var out, i, len, c;
      var char2, char3;

      out = "";
      len = str.length;
      i = 0;
      while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
          case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += str.charAt(i - 1);
            break;
          case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
          case 14:
            // 1110 xxxx  10xx xxxx  10xx xxxx
            char2 = str.charCodeAt(i++);
            char3 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x0F) << 12) |
              ((char2 & 0x3F) << 6) |
              ((char3 & 0x3F) << 0));
            break;
        }
      }

      return out;
    }
    this.base64decode = function (str) {
      var c1, c2, c3, c4;
      var i, len, out;

      len = str.length;
      i = 0;
      out = "";
      while (i < len) {
        /* c1 */
        do {
          c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
          break;

        /* c2 */
        do {
          c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
          break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        /* c3 */
        do {
          c3 = str.charCodeAt(i++) & 0xff;
          if (c3 == 61)
            return out;
          c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
          break;

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        /* c4 */
        do {
          c4 = str.charCodeAt(i++) & 0xff;
          if (c4 == 61)
            return out;
          c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
          break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
      }
      return out;
    }

  }


  function H5ToNative() {
    var _callbackFn = {};

    this.base64 = new Base64();

    this.nativeCallback = function (callbackId, params) {
      var _fn = _callbackFn[callbackId];
      if (_fn) {
        _fn(params);
      }
    }

    this.execNative = function (event, params, fn) {
      var _type = _isAndroidOrIos();
      var _callbackId = 'callbackId_' + new Date().getTime();
      if (fn) {
        _callbackFn[_callbackId] = fn;
      }

      var _p = '';
      if (params) {
        _p = this.base64.encode(JSON.stringify(params));
      }
      if (_type == 0) {
        if (window.daka && window.daka.exec) {
          window.daka.exec(event, _callbackId, _p);
        }
      } else if (_type == 1) {
        window.location = 'native:exec:' + event + ':' + _callbackId + ':' + _p;//处理跳转问题

      } else {
        console.log(event + '::::' + _p);
      }
    }

    //处理ios非跳转问题 比如隐藏头 
    this.iosHandleEvent = function (event, params, fn) {
      var _callbackId = 'callbackId_' + new Date().getTime();
      if (fn) {
        _callbackFn[_callbackId] = fn;
      }

      var _p = '';
      if (params) {
        _p = this.base64.encode(JSON.stringify(params));
      }
      try {
        if (window.webkit.messageHandlers && window.webkit.messageHandlers.cwdkexecute) {
          window.webkit.messageHandlers.cwdkexecute.postMessage({ event: event, callbackId: _callbackId, p: _p });
        } else {
          this.nativeCallback(_callbackId, { 'status': '-1' });
        }
      } catch (error) {
        this.nativeCallback(_callbackId, { 'status': '-1', error: error });
      }
    }
  }
  // var base64=new Base64();
  // alert(typeof(base64.utf8to16(base64.decode("aHR0cHM6Ly90ZXN0LWFwcGFwaXMuOTUxNTUuY29tL3dlYmZlZC9jYWxsYmFjay9pbmRleC5odG1sP3Y9MTIzMTQyNCMvZmVzdGl2YWw="))))
  // JSON.parse(base64.utf8to16(base64.decode("aHR0cHM6Ly90ZXN0LWFwcGFwaXMuOTUxNTUuY29tL3dlYmZlZC9jYWxsYmFjay9pbmRleC5odG1sP3Y9MTIzMTQyNCMvZmVzdGl2YWw=")));
  if (window.daka) {
    // console.log("是大卡。。。");	
    var base64 = new Base64();
    var _mobile = JSON.parse(base64.utf8to16(base64.base64decode(window.daka.getMobileApp())));
    var appVersion = _mobile.appVersion;
  } else {
    // console.log("不是大卡。。。");
  }
  function lifeCycle() {
    var _callbackFn = {};
    var versions = "5.1.3";
    this.nativeOnShow = function () {
      if (_callbackFn["onShow"]) {
        var _fn = _callbackFn["onShow"];
        _fn();
      }
    }
    this.nativeOnHide = function () {
      if (_callbackFn["onHide"]) {
        var _fn = _callbackFn["onHide"];
        _fn();
      }
    }
    this.init = function (obj) {
      var _type = _isAndroidOrIos();
      _callbackFn = obj
      if (window.daka) {
        if (myCompare(appVersion, versions) != -1) {
          if (_type == 0) {
            if (window.daka && window.daka.exec) {
              window.daka.exec("lifeInit", "", "");
            }
          } else if (_type == 1) {
            // window.location='native:exec:'+event+':'+_callbackId+':'+_p;
            window.webkit.messageHandlers.dakaexec.postMessage({ 'event': "lifeInit", 'callbackId': "", 'params': "" });
          } else {
            console.log("other");
          }
          return 0;
        } else {
          return -1
        }
      }
    }
  }
  function _isAndroidOrIos() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
      return 0;
    } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      return 1;
    } else {
      return -1;
    }
  }
  function toNum(a) {
    var a = a.toString();
    var c = a.split('.');
    var num_place = ["", "0", "00", "000", "0000"], r = num_place.reverse();
    for (var i = 0; i < c.length; i++) {
      var len = c[i].length;
      c[i] = r[len] + c[i];
    }
    var res = c.join('');
    return res;
  }

  // 判断字符串是否以指定字符串结尾
  function endWith(string, str) {
    if (arguments.length != 2) {
      throw "传入的参数数量不对。"
    }
    return string.slice(-str.length) == str;
  }
  // 如果有字母，那就把所有的字母转为.ascii
  function formatString() {
    if (arguments.length != 1) {
      throw "无字符串，无法格式化";
    }
    var reg = /([a-zA-Z])/g;
    var regarray = arguments[0].match(reg);
    if (regarray == null) {
      return arguments[0].split('.');
    }
    if (regarray && regarray.length != 1) {
      throw "格式错误，只允许出现一个字母";
    }
    var regString = regarray.join('');
    if (endWith(arguments[0], regString) != true) {
      throw "传入的版本号有错";
    }
    return arguments[0].replace(regString, "." + regString.charCodeAt()).split('.');
  }
  function myCompare() {
    if (arguments.length > 2) {
      throw "目前只允许比较两个版本号";
    } else if (arguments.length < 2) {
      throw "比较版本必须传入参数";
    } else {
      if (arguments[0] == arguments[1]) {
        return 0;
      }
      var arr1 = formatString(arguments[0]);
      var arr2 = formatString(arguments[1]);
      var length = Math.min(arr1.length, arr2.length);
      for (var i = 0; i != length; i++) {
        if (arr1[i] > arr2[i]) {
          return 1;
        } else if (arr1[i] < arr2[i]) {
          return -1;
        } else {

        };
      }
      if (length == arr1.length) {
        return -1;
      } else {
        return 1;
      }
    }
  }
  window.h5_native = new H5ToNative();
  window.lifeCycle = new lifeCycle();
})(window)
