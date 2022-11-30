<template>
	<view class="view">
		<view style="font-size: 16px; font-weight: bold;" class="" v-if="this.form.spuCode">
			编辑
		</view>
		<view style="font-size: 16px; font-weight: bold;" class="" v-else>
			新增
		</view>
		<uni-forms :modelValue="form" label-position="left"label-width="80px">
			<uni-forms-item label="商品名称:" name="spuName">
				<uni-easyinput style="width: 400rpx" type="text" v-model="form.spuName" placeholder="请输入商品名称"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="价格:" name="price">
				<uni-easyinput style="width: 400rpx" type="text" v-model="form.price" placeholder="请输入价格"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="标题:" name="desc">
				<uni-easyinput style="width: 400rpx" type="text" v-model="form.desc" placeholder="请输入标题"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="所属分类:" name="type">
				<uni-data-select
					style="width: 400rpx"
					v-model="form.type"
					:localdata="range"
					@change="change"
				></uni-data-select>			
			</uni-forms-item>
		</uni-forms>
		<view class="jump-next-area">
			<button class="jump-next submit" size="mini" type="primary" @click="addSub">保存</button>
			<button class="jump-next submit" size="mini" type="primary" @click="handleBut">取消</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'新增',
				form:{
					spuName:"",
					price:"",
					title:"",
					type:"",
				},
				range:[
					{ value: 0, text: "篮球" },
					{ value: 1, text: "足球" },
					{ value: 2, text: "游泳" },
				]
			}
		},
		mounted() {
			
		},
		onLoad(option) {
			if(option.item){
				this.form = JSON.parse(decodeURIComponent(option.item))
			}
		},
		methods: {
			change(e) {	
			      console.log("e:", e);
			},
			handleBut(){
				console.log("====");
				uni.navigateBack({
					delta:1,
				})
			},
			addSub(){
					if(this.form.spuCode){
						let params = {
						         "spuName":this.form.spuName,
						         "price":this.form.price,
						         "desc":this.form.desc,
								 "spuCode":this.form.spuCode
						         // "type":this.form.type,
											}
						uni.request({
										url: `${this.$baseUrl}/spu/update`,
										method: 'POST',
										data:params,
										success: (res)=>{
											// if(res){
												uni.showToast({
													title: '编辑成功'
												})
												setTimeout(function() {
													uni.navigateBack({
														delta:1,
													})
												},2000)
											// }
										},
										fail: (err)=>{}
								}) 
						
					}else{
						let params = {
						         "spuName":this.form.spuName,
						         "price":this.form.price,
						         "desc":this.form.desc,
						         // "type":this.form.type,
											}
						uni.request({
										url: `${this.$baseUrl}/spu/create`,
										method: 'POST',
										data:params,
										success: (res)=>{
											if(res){
												uni.showToast({
													title: '新增成功'
												})
												setTimeout(function() {
													uni.navigateBack({
														delta:1,
													},2000)
												})
											}
										},
										fail: (err)=>{}
								}) 
						
						}
					}
		}
	}
</script>

<style>
.view{
	margin: 1rem;
},
.submit{
	margin: 2rem;
}
</style>
