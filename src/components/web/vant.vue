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

		<ul>
			<li>一般普通的下拉加载</li>
			<li>
				<infinite class="has" @infinite="loadMore" :disabled="disabled">
	    		<div class="filters-list">
						<ul>
							<li v-for="(item,index) in data_list" :key="index">
								//内容
							</li>
						</ul>
						<div class="clear"></div>
					</div>
	    	</infinite>
        <div class="load-more" v-if="disabled"></div>
        <div class="nothing" v-if="!disabled && data_list.length<=0 && finished"></div>
			</li>
		</ul>

		<ul>
			<li>
					点击菜单切换内容
			</li>
			<li>
				<!-- <tab v-model="index" @on-index-change="changeIndex">
					<tab-item>客厅</tab-item>
					<tab-item>卧室</tab-item>
					<tab-item>餐厅</tab-item>
				</tab>
				<swiper v-model="index">
					<swiper-item>1</swiper-item>
					<swiper-item>2</swiper-item>
					<swiper-item>3</swiper-item>
				</swiper> -->
			</li>
		</ul>

		<ul>
			<li>
				无限滚动
			</li>
			<li>
				<!-- <ly-tab>
					<ly-tab-item>
					</ly-tab-item>
				</ly-tab> -->
			</li>
		</ul>
	</div>
</template>
<script>

		import infinite from './components/infinite';

		// 占时无法匹配less 没有安装less-loader

		// import {LyTab, LyTabItem} from './components/slide';
		// import {Tab, TabItem} from './components/swiper-tabs/tabs';
		// import {Swiper, SwiperItem} from './components/swiper-tabs/swiper';

		export default {
			components: {
				infinite,
				// LyTab,
				// LyTabItem,
				// Tab,
				// TabItem,
				// Swiper,
				// SwiperItem,
			},
			data() {
				return {
					refresh_loading: false,  //每次加载完都要设置为false,表示已加载完
					disabled: true,
					finished: false,
					page: 1, //页数
					data_list: [],
					index: 0,
				}
			},
			methods: {
				loadMore() {
					if(this.finished) return false;
					this.disabled = true;
					this.$api.ajax({
						url: this.$api.url.applicationGetAppList,
						type: 'post',
						data: {
							page: this.page,
						},
						success: data=> {
							if(data && data.list.length){
								this.page++;
								this.finished = false;
								this.data_list.push(...data.list);
							}else{
								this.finished = true;
							}
							this.refresh_loading = false;
							this.disabled = false;
						},
						error: _=> {
							this.$toast.fail({
								message: '获取失败！',
								duration: 1000
							});
							this.finished = true;
							this.disabled = false;
						}
					});
				},
				changeIndex(index) {
					this.index = index;
				}
			}
		}
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
