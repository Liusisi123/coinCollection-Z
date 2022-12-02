const OSS = require('ali-oss');
import axios from 'axios';

let aliOssClient = {};

export function getAliOosClient(bucket) {
	if (aliOssClient[bucket]) {
		return aliOssClient[bucket];
	} else {
		aliOssClient[[bucket]] = axios
			.get(`http://170.106.8.145:3000/spu/get_ali_img_upload_signature`,)
			.then(res => {
				console.log('res',res);
				res = res.data;
				return new OSS({
					accessKeyId: res.Credentials.AccessKeyId,
					accessKeySecret: res.Credentials.AccessKeySecret,
					stsToken: res.Credentials.SecurityToken,
					refreshSTSToken: async () => {
						// const info = await axios.get(
						// 	`http://170.106.8.145:3000/spu/get_ali_img_upload_signature`,
						// );
						const info = await axios.get(
							`http://170.106.8.145:3000/spu/get_ali_img_upload_signature`,
						);
						
						console.log('info',info);
						return {
							accessKeyId: info.data.Credentials.AccessKeyId,
							accessKeySecret:
								info.data.Credentials.AccessKeySecret,
							stsToken: info.data.Credentials.SecurityToken,
						};
					},
					refreshSTSTokenInterval: 10000,
					bucket: bucket,
					region: 'oss-us-east-1',
				});
			});
		return aliOssClient[bucket];
	}
}

export function pickerOptions() {
	var pickerOptions = {
		shortcuts: [
			{
				text: '最近一周',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', [start, end]);
				},
			},
			{
				text: '最近一个月',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					picker.$emit('pick', [start, end]);
				},
			},
			{
				text: '最近三个月',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					picker.$emit('pick', [start, end]);
				},
			},
		],
	};
	return pickerOptions;
}

export function replaceProductName(productName) {
	return productName.replace(/\s/g, '-');
}
