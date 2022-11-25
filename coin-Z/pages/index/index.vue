<template>
	<view class="uni-container view">
		<uni-forms :modelValue="formData" label-position="top" :inline="true">
			<uni-forms-item label="姓名:" name="name">
				<uni-easyinput style="width: 200px" type="text" v-model="formData.name" placeholder="请输入姓名"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="性别:" name="name">
				<uni-easyinput style="width: 200px" type="text" v-model="formData.name" placeholder="请输入姓名"></uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<view class="uni-group">
			<button class="uni-button" size="mini" type="primary">新增</button>
		</view>
		<uni-table ref="table" border stripe type="selection" @selection-change="selectionChange">
			<uni-tr>
				<uni-th width="150" align="center">日期</uni-th>
				<uni-th width="150" align="center">姓名</uni-th>
				<uni-th align="center">地址</uni-th>
				<uni-th width="204" align="center">设置</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in tableData" :key="index">
				<uni-td align="center">{{ item.date }}</uni-td>
				<uni-td align="center">
					<view class="name">{{ item.name }}</view>
				</uni-td>
				<uni-td align="center">{{ item.address }}</uni-td>
				<uni-td align="center">
					<view class="uni-group">
						<button class="uni-button" size="mini" type="primary" @click="edit">修改</button>
						<button class="uni-button" size="mini" type="warn">删除</button>
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				total: 0,
				pageSize: 10,
				pageCurrent: 1,
				formData: {
					name: ""
				},
				tableData: [
					{
						date: "1",
						name: "2",
						address: "3",
					}
				],
			}
		},
		methods: {
			edit(){
				console.log("0000")
			},
		}
	}
</script>

<style>
.view{
	margin:10px
}
</style>
