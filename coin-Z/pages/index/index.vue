<template>
	<view class="view">
		<uni-forms :modelValue="formData" label-position="top" :inline="true">
			<uni-forms-item label="姓名:" name="name">
				<uni-easyinput style="width: 200px" type="text" v-model="formData.name" placeholder="请输入姓名"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="性别:" name="name">
				<uni-easyinput style="width: 200px" type="text" v-model="formData.name" placeholder="请输入姓名"></uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<view class="jump-next-area" >
			<!-- <navigator url="add/add?title=add" hover-class="navigator-hover"> -->
				<button @click="jumpSecondPage" class="jump-next" size="mini" type="primary">新增</button>
				<button @click="seach" class="jump-next" size="mini" type="primary">搜索</button>
			<!-- </navigator> -->
		</view>
		<view class="content">
			<uni-table style="height: 475px;" ref="table" border stripe type="selection" @selection-change="selectionChange">
					<uni-tr>
						<uni-th width="150" align="center">url</uni-th>
						<uni-th width="150" align="center">商品图片</uni-th>
						<uni-th width="150" align="center">ID</uni-th>
						<uni-th align="center">商品名称</uni-th>
						<uni-th align="center">价格</uni-th>
						<uni-th align="center">标题</uni-th>
						<uni-th align="center">描述</uni-th>
						<uni-th align="center">所属分类</uni-th>
						<uni-th align="center">新建时间</uni-th>
						<uni-th align="center">更新时间</uni-th>
						<uni-th align="center">商品状态</uni-th>
						<uni-th width="204" align="center">设置</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in tableData" :key="index">
						<uni-td align="center">{{ item.url }}</uni-td>
						<uni-td align="center">
							<image style="width: 60px;height: 60px;" :src="item.mainUrl" mode=""></image>
						</uni-td>
						<uni-td align="center">{{ item.spuCode }}</uni-td>
						<uni-td align="center">{{ item.spuName }}</uni-td>
						<uni-td align="center">{{ item.price }}</uni-td>
						<uni-td align="center">{{ item.title }}</uni-td>
						<uni-td align="center">{{ item.desc }}</uni-td>
						<uni-td align="center">{{ item.type }}</uni-td>
						<uni-td align="center">{{ item.create_time | formatDate }}</uni-td>
						<uni-td align="center">{{ item.update_time | formatDate }}</uni-td>
						<uni-td align="center">{{ item.status }}</uni-td>
						<uni-td align="center">
							<view class="uni-group">
								<button class="uni-button" size="mini" type="primary" @click="edit(item.spuCode)">修改</button>
								<button class="uni-button" size="mini" type="warn" @click="deleteBut(item.spuCode)">删除</button>
							</view>
						</uni-td>
					</uni-tr>
			</uni-table>
			<view class="footer uni-pagination-box">
				<uni-pagination 
					show-icon 
					:page-size="pageSize" 
					:current="pageCurrent" 
					:total="total" 	
					@change="change" />
					<view>
						<text class="example-info">当前页：{{ pageCurrent }}，数据总量：{{ total }}条，每页数据：{{ pageSize }}</text>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'index',
				total: 0,
				pageSize: 10,
				pageCurrent: 1,
				formData: {
					name: ""
				},
				tableData: [],
			}
		},
		onLoad() {
				this.selectedIndexs = []
				this.seach(1)
			},
		mounted() {
			this.seach()
		},
		filters: {
			formatDate: function (cellValue) {
				console.log("cellValue",cellValue);
				if (cellValue == null || cellValue == "") return "";
				  var date = new Date(cellValue)
				  var year = date.getFullYear()
				  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
				  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
				  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
				  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
				  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
				  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
				// console.log("value",value);
				// var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				// console.log("date",date);
				// var Y = date.getFullYear() + '-';
				// var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				// var D = date.getDate() + '-';
				// var h = date.getHours() + ':';
				// var m = date.getMinutes() + ':';
				// var s = date.getSeconds();
				// return Y+M+D+h+m+s;
			}
		},
		methods: {
			// 分页触发
			change(e) {
				this.$refs.table.clearSelection()
				this.selectedIndexs.length = 0
				this.seach(e.current)
			},
			seach(pageCurrent, value = ''){
				console.log("pageCurrent",pageCurrent);
				let params = {
				          // "phone":this.userphone,
				          // "name":this.username
				
				    }
					this.pageCurrent = pageCurrent
				    uni.request({
						// pageSize: this.pageSize,
						// pageCurrent: pageCurrent,
						// value: value,
						  url: `${this.$baseUrl}/spu/findAll`,
						  method: 'GET',
						  success: (res)=>{
							  console.log("res",res)
							  this.tableData = res.data.data
							  this.total = res.data.total
							  console.log("this.tableData",this.tableData);
						  },
						  fail: (err)=>{}
				    })  
			},
			jumpSecondPage(){
				console.log("jumpSecondPage")
				uni.navigateTo({
					url:'add/add',
					fail: (error) => {
						console.log(error)
					}
				})
			},
			edit(spuCode){
				console.log("spuCode")
				uni.navigateTo({
					url:`add/add?id=${spuCode}`,
					fail: (error) => {
						console.log(error)
					}
				})
			},
			deleteBut(spuCode){
				console.log("spuCode",spuCode)
				let params = {
				         "spuCode":spuCode,
									}
				uni.request({
						url: `${this.$baseUrl}/spu/delete`,
						method: 'POST',
						data:params,
						success: (res)=>{
							if(res){
								uni.showToast({
									title: '删除成功'
								})
								this.seach()
							}
						},
						fail: (err)=>{}
				})
			}
		}
	}
</script>

<style>
.view{
	margin:10px
}
.content{
		/* width: 750rpx; */
		font-family: PingFang SC-Regular, PingFang SC;
	}
	/* 表格标题固定定位 */
	.table_head{
		position: fixed;
		margin-top: 50px;
		/* top: 0; */
		left: 0;
	}
	.table_body{
		margin-top: 100px;
	}
	/* 底部 */
	.footer{
		position: fixed;
		left: 0rpx;
		bottom: 0rpx;
		width: 100%;
		height: 126rpx;
		background: #F5F5F5;
	}
</style>
