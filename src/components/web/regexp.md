* 常规正则
```
//去掉左右两边的空格
  var add = ' sdsfsds '
  String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
  }

  var reg = {
    regEmail: /^(\w*)@[a-z1-9]*\.(\w+)$/, 邮箱
    regMobile: /^1[3|4|5|8][0-9]\d{8}$/,手机
    regTel: /^0[\d]{3}-[\d]{7,8}$/,电话号码
    regFloatNumber: /^[1-9]+(\.[0-9]{1,2})?$/,纯数字、小数点保留两位小数
    regInt: /^([0]|[1-9]([0-9]+)?)$/,纯数字，第一个有可能为0
    regPeopleID: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, 身份证号
  }

  //获取路径的字段
  var url = 'http://www.wanghuatong.com/ss=11&ss=22';
  var reg = /(^|\\?|&)ss=(\w*)/g;
  url.replace(reg, function($0,$1,$2){
    //$0 全部()内容
    //$1 第一个()
    //$2 第二个()
    console.log($2);
  })

  //如何将12000000.11转化为12,000,000.11

  function commafy(num){
      return num && num
          .toString()
          .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
                return $2 + ',';
          });
    }
    console.log(commafy('12000000.11'))

  //获取括号里的内容
  regText(name){
    let dom = 'scale(1.2) rotate(36deg)',
      val = 0;
    let reg = new RegExp('\\b(' + name + '\\()(.*?)(\\b\\))','g');
      dom.replace(reg, ($1, $2, $3)=>{
        val = +$3;
      });
    return val;
  }
```