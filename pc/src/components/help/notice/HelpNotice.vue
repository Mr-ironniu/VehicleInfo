<template>
	<div class="adas-notice-wrap">
		<div class="notice-outer" :style="{right: outerStyle.right, bottom: outerStyle.bottom}">
			<div class="notice-inner" v-if="modal">
				<div class="notice-inner">
					<div class="notice-content">
						<div class="notice-title">
							<span>求助信息</span>
							<span style="position: fixed; right: 35px;" @click="showEdit"><i class="el-icon-edit"></i></span>
							<span style="position: fixed; right: 15px" @click="closeNotice"><i class="el-icon-close"></i></span>
						</div>
						
						<div class="notice-desc">
							<div style="height: 340px;">
								<div style=" font-size: 14px; line-height: 18px;">
									<ul>
										<li style="display: flex;">
											<div style="width:70px;font-weight:bold;margin-right: 5px; text-align: right;">
												用户名：
											</div>
											<div style="width:calc(100% - 95px);font-size:16px;">
												{{helpObj.userName}}
											</div>
										</li>
										<li style="display: flex;">
											<div style="width:70px;font-weight:bold;margin-right: 5px; text-align: right;">
												时间：
											</div>
											<div style="width:calc(100% - 95px);font-size:16px;">
												{{helpObj.createtime}}
											</div>
										</li>
										<li style="display: flex;">
											<div style="width:70px;font-weight:bold;margin-right: 5px; text-align: right;">
												位置：
											</div>
											<div style="width:calc(100% - 95px);text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
												{{helpObj.location}}
											</div>
										</li>
										<li style="display: flex;">
											<div style="width:70px;font-weight:bold;margin-right: 5px; text-align: right;">
												求助内容：
											</div>
											<div style="width:calc(100% - 95px);text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
												{{helpObj.seekcontent}}
											</div>
										</li>
										<li style="display: flex;">
											<div style="width:70px;font-weight:bold;margin-right: 5px; text-align: right;">
												求助图片：
											</div>
										</li>
										<li>
											<el-carousel indicator-position="none" height="200px">
												<el-carousel-item v-for="item in helpObj.pictureList" :key="item.id" >
													<el-image :src="item.path" :fit="fit" style="margin-top: 10px; height: 100%;"></el-image>
												</el-carousel-item>
											</el-carousel>
										</li>
									</ul>
									<el-pagination
										background
										small=""
										layout="prev, pager, next"
										@current-change="handleCurrentChange"
										:page-size="1"
										:total="helpList.length"
										style="text-align: center;"
										>
									</el-pagination>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: "helpNotice",
  model: {
    prop: "modal",
    event: "change"
  },
  props: {
    modal: {
      type: Boolean,
      default: false
    },
    helpList: {
      type: Array
    }
  },
  data() {
    return {
		fit: "fill",
		outerStyle: {
			right: 0,
			bottom: 0
		},
		isDragging: false,
		img: [
				'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
				'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
				'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
				'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
				'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
				'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
				'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
			],
		helpObj: {}
    };
  },
  watch: {
    helpList: {
      handler: function(val, oldval) {
		console.log(val)
		this.helpObj = val[0]
        // if (val.length) {
        //   this.onPageChange(1);
        // }
      }
    }
  },
  // computed: {
  //   ...mapState(["userConfig"])
  // },
  mounted() {
	console.log(this.helpList)	
  },
  beforeDestroy() {
    
  },
  methods: {
	handleCurrentChange(newPage) {
		if (this.helpList.length >= newPage) {
			this.helpObj = this.helpList[newPage - 1]
		}
	},
	closeNotice() {
		this.$emit('closeNotice')
	},
	showEdit() {
		this.$emit('showEdit')
	}
  }
};
</script>
<style>
	.notice-outer {
		width: 360px;
		position: fixed;
		z-index: 1010;
		/* display: none; */
		/* padding: 10px; */
	}
	.notice-inner {
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
		background: #fff;
		line-height: 1;
		position: relative;
		overflow: hidden;
		height: 100%;
		border: 4px solid #409EFF;
		/* padding: 16px; */
	}
	.notice-title {
		font-size: 16px;
		line-height: 18px;
		color: white;
		background-color: #409EFF;
		padding-right: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 700;
		text-align: center;
		user-select: none;
		cursor: pointer;
	}
	.notice-desc{
		font-size: 12px;
		color: #495060;
		text-align: justify;
		line-height: 1.5;
		margin: 16px;
	}
	ul {
		padding: 0;
	}
</style>
