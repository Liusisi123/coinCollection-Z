<template>
	<view class="view">
		<!-- <page-head :title="title"></page-head> -->
		<uni-forms :modelValue="form" label-position="top">
			<uni-forms-item label="商品名称:" name="spuName">
				<uni-easyinput style="width: 200px" type="text" v-model="form.spuName" placeholder="请输入商品名称"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="价格:" name="price">
				<uni-easyinput style="width: 200px" type="text" v-model="form.price" placeholder="请输入价格"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="标题:" name="desc">
				<uni-easyinput style="width: 200px" type="text" v-model="form.desc" placeholder="请输入标题"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="所属分类:" name="type">
				<uni-data-select
					style="width: 200px"
					v-model="form.type"
					:localdata="range"
					@change="change"
				></uni-data-select>			
			</uni-forms-item>
		</uni-forms>
		<view class="uni-btn-mini" @click="addSub">
			<button style="mini" type="primary">保存</button>
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
			console.log("id",option.id);
		},
		methods: {
			change(e) {	
			      console.log("e:", e);
			    },
			addSub(){
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
									// uni.navigateTo({
									// 	url:'index/index'
									// })
									uni.navigateBack({
										delta:1,
									})
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
