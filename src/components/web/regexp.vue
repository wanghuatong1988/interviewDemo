<template>
	<div>
		<ul>
			<li><strong>常规正则</strong></li>
			<li>
				<textarea style="height:600px;">
					//去掉左右两边的空格
					var add = ' sdsfsds '
					String.prototype.trim = function() {
						return this.replace(/(^\s*)|(\s*$)/g,'');
					}

					//匹配电话号码邮箱

					var reg = {
						regEmail: /^(\w*)@[a-z1-9]*\.(\w+)$/, 邮箱
						regMobile: /^1[3|4|5|8][0-9]\d{8}$/,手机
						regTel: /^0[\d]{3}-[\d]{7,8}$/,电话号码
						regFloatNumber: /^[1-9][0-9]*(\.[0-9]{1,2})?$/,纯数字保留两位小数
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
				</textarea>
			</li>
		</ul>

	</div>

</template>
<script type="text/javascript">
	console.log(parseFloat('12.3b')) //12.3
	console.log(0.1 + 0.2) // 0.30000000000000004;
</script>
<style lang="scss" scoped="" type="text/css">
ul,li {
  margin: 0;
  padding: 10px;
  list-style-type: none;
}
ul {
  border:1px solid #000;
  margin: 20px 0;
}
ul {
  border:1px solid #000;
  margin: 10px 0;
}
textarea {
  width: 80%;
  height: 100px;
}
.contenteditable {
  width:80%;border:1px solid #000;
  margin:0 auto;
}
ul {
 box-shadow: 2px 2px 5px #333;
}
textarea {
	width: 80%;
	height: 100px;
}
.contenteditable {
	width:80%;border:1px solid #000;
	margin:0 auto;
}
</style>
