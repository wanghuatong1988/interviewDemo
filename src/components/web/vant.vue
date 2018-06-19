<template>
	<div>

		<ul>
			<li><strong>vant的组件van-pull-refresh遇到在弹出框下做下拉加载更多的细节?</strong></li>
			<li>
				<textarea style="height:250px;">
					<div class="outer-rel"> <!--外层相对定位-->
						<div class="outer-abs"> <!--外层绝对定位-->
							<van-pull-refresh v-model="refresh_loading" v-infinite-scroll="loadMore" infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
								<div class="order-list"> <!--内层用overflow:hidden-->
									<div class="infoImg" v-for="(item, index) of layoutList" :key="index" :style="{'background': 'url('+ item.img +')', 'background-size': 'cover'}"></div>
								</div>
							</van-pull-refresh>
							<load-more v-if="disabled" />
						</div>
					</div>
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

.outer-rel {
	width: 100%;
	height: 183px;
	position: relative;
	overflow: hidden;
	.outer-abs {
		width: 100%;
		height: 183px;
		position: absolute;
		overflow-y: scroll;
		top: 0;
		left: 0;
		.order-list {
			width: 100%;
			overflow: hidden;
			.infoImg {
				width: 130px;
				height: 80px;
				float: left;
				margin: 0px 0 12px 15px;
				border:1px solid #fff;
				&:hover {
					border:1px solid #0FC4FF;
				}
			}
		}
	}
}
</style>
