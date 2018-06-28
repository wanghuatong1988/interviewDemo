<template>
	<div>
		<ul>
			<li>js把光标移入文本框</li>
			<li>
				<textarea>
						moveEnd(obj){
							obj.focus();
							const len = obj.value.length;
							if (document.selection) {
								const sel = obj.createTextRange();
								sel.moveStart('character',len);
								sel.collapse();
								sel.select();
							} else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
								obj.selectionStart = obj.selectionEnd = len;
							}
						},
				</textarea>
			</li>
		</ul>

	</div>
</template>
<script>
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
</style>
