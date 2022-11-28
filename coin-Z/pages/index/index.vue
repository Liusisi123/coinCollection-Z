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
		<uni-table style="height: 30%;" ref="table" border stripe type="selection" @selection-change="selectionChange">
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
				<uni-td align="center">{{ item.create_time }}</uni-td>
				<uni-td align="center">{{ item.update_time }}</uni-td>
				<uni-td align="center">{{ item.status }}</uni-td>
				<uni-td align="center">
					<view class="uni-group">
						<button class="uni-button" size="mini" type="primary" @click="edit(item.spuCode)">修改</button>
						<button class="uni-button" size="mini" type="warn" @click="deleteBut(item.spuCode)">删除</button>
					</view>
				</uni-td>
			</uni-tr>
		</uni-table>
		<view class="uni-pagination-box">
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
		mounted() {
			this.seach()
		},
		methods: {
			seach(){
				let params = {
				          // "phone":this.userphone,
				          // "name":this.username
				
				    }
				    uni.request({
				          url: `${this.$baseUrl}/spu/findAll`,
				          method: 'GET',
				          success: (res)=>{
							  console.log("res",res)
							  this.tableData = res.data.data
							  this.total = res.data.total
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
</style>
