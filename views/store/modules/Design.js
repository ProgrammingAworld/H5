'use strict';

module.exports = {
	state: {
		/*是否显示提示框*/
		isAlert: false,
		/*提示框信息*/
		alertMessage: "",
		/*是否弹出音乐提示框*/
		musicDialog: false,
		/*用户上传音乐列表数据*/
		userMusics: [],
		/*是否弹出图片提示框*/
		imageDialog: false,
		/*用户上传图片列表数据*/
		userImages: [],
		/*右侧修改设计的弹出框*/
		isModifyEle: false,
		/*设计界面各个已添加数据*/
		DesignInfos: {
			/*id号*/
			id: 1,
			/*页面id*/
			pageId: 1,
			/*音乐*/
			music: '',
			/*当前选中的元素*/
			currentElement: '',
			/*当前选中的元素类型 image text*/
			currentElementType: 'text',
			/*当前选中的页面*/
			currentPage: 'page_0',
			/*页面*/
			pages: [
				{
					id: 'page_0',
					/*
						文本
						例: {
							id: design_1,
							text: 'test',
							style:{
								left: '20%',
								top: '10%',
								color: '#ff00ff',
								background-color: 'transparent',
								font-size： '100',
								line-height: '100%',
								padding: '0px',
							}
						}
					*/
					text: [],
					/*
						图片
						例：{
							id: 'design_1',
							imageID: '2313123213',
							style: {
								width: '50px',
								height: '50px',
								left: '20%',
								top: '10%',
							},
						}
					*/
					image: [],
				},
			],
		},
	},
	mutations: {
		/*页面数目加1*/
		addPageNum(state){
			state.DesignInfos.pages.push({
				id: 'page_'+state.DesignInfos.pageId,
				text: [],
				image: [],
			})

			state.DesignInfos.pageId++;
		},
		/*页面数目减1*/
		delPageNum(state, pageId){
			state.DesignInfos.pages.forEach((item, index) => {
				if (item.id === pageId) {
					state.DesignInfos.pages.splice(index, 1)
				}
			})
		},
		/*弹出提示*/
		alertDesignMessage(state, {isAlert, message}){
			state.isAlert = isAlert ? true : false;
			state.alertMessage = message || "";
		},
		/*弹出音乐提示框*/
		musicDialog(state, l){
			state.musicDialog = l ? true : false;
		},
		/*弹出音乐提示框*/
		imageDialog(state, l){
			state.imageDialog = l ? true : false;
		},
		/*刷新用户上传音乐列表*/
		updateUserMusics(state, szMusics){
			state.userMusics = szMusics;
		},
		/*刷新用户上传图片列表*/
		updateUserImages(state, szImages){
			state.userImages = szImages;
		},
		/*修改选择的背景音乐*/
		updateMusic(state, music){
			let audio = document.getElementById('myAudio');
			audio.pause();
			audio.src = '/H5/PlayMusic?id='+music;
			audio.play();
			state.DesignInfos.music = music;
		},
		/*增加文本*/
		addDesignText(state, text){
			state.DesignInfos.pages.forEach((item, index) => {
				if (item.id === state.DesignInfos.currentPage) {
					item.text.push({
						id: 'design_'+state.DesignInfos.id,
						text: text || "",
						style:{
							left: '0%',
							top: '10%',
							color: 'black',
							'font-size': '100%',
							'background-color': 'transparent',
							'line-height': '100%',
							padding: '0px',
						}
					})
				}
			})

			state.DesignInfos.id++;
		},
		/*根据id修改style*/
		modifyTextStyleById(state, info){
			state.DesignInfos.pages.forEach((item, index) => {
				if (item.id === state.DesignInfos.currentPage) {
					item.text.forEach(t => {
						if (t.id === info.id) {
							for(let s in info){
								if (s === 'id') continue;
								t.style[s] = info[s];
							}
						}
					})
				}
			})
			
		},
		modifyTextContentById(state, info){
			state.DesignInfos.pages.forEach((item, index) => {
				if (item.id === state.DesignInfos.currentPage) {
					item.text.forEach(t => {
						if (t.id === info.id) {
							t.text = info.text;
						}
					})
				}
			})
		},
		/*修改当前选中的元素*/
		modifyCurrentElement(state, ele){
			state.DesignInfos.pages.forEach((item, index) => {
				if (item.id === state.DesignInfos.currentPage) {
					item.image.forEach((item, index) => {
						if (item.id === ele) {
							state.DesignInfos.currentElementType = 'image';
						}
					})

					item.text.forEach((item, index) => {
						if (item.id === ele) {
							state.DesignInfos.currentElementType = 'text';
						}
					})
				}
			})

			state.DesignInfos.currentElement = ele || '';
		},
		/*修改当前被选中的页面*/
		changePage(state, page){
			state.DesignInfos.currentPage = page || 'page_0';
		},
		/*是否修改界面元素，弹出右侧弹出框*/
		isModifyEle(state, l){
			state.isModifyEle = l ? true : false;
		},
		/*增加一张图片*/
		addDesignImage(state, id){
			state.DesignInfos.pages.forEach((item, index) => {
				if (item.id === state.DesignInfos.currentPage) {
					item.image.push({
						id: 'design_'+state.DesignInfos.id,
						imageID: id,
						style: {
							width: '50px',
							height: '50px',
							left: '0%',
							top: '10%',
						},
					})
				}
			})

			state.DesignInfos.id++;
		},
		/*更新当前选中元素的类型*/
		updateCurrentElementType(state, type){
			state.currentElementType = (type === 'text') ? 'text':'image';
		},
		/*根据id修改图片的style*/
		modifyImageStyleById(state, info){
			state.DesignInfos.pages.forEach((item, index) => {
				if (item.id === state.DesignInfos.currentPage) {
					item.image.forEach(t => {
						if (t.id === info.id) {
							for(let s in info){
								if (s === 'id') continue;
								t.style[s] = info[s];
							}
						}
					})
				}
			})
			
		},
		/*设置设置界面数据，如果infos为空则清空所有原始数据*/
		setDesign(state, infos){
			if (infos) {
				state.DesignInfos = infos;
			}
			else{
				/*恢复默认*/
				state.DesignInfos = {
					id: 1,
					pageId: 1,
					music: '',
					currentElement: '',
					currentElementType: 'text',
					currentPage: 'page_0',
					pages: [
						{
							id: 'page_0',
							text: [],
							image: [],
						},
					],
				}
			}
		},
	},
	actions: {
		/*增加一个页面*/
		addPageNum(context){
			context.commit('addPageNum');
		},
		/*删除一个页面*/
		delPageNum(context, pageId){
			context.commit('delPageNum', pageId);
		},
		/*弹出音乐提示框*/
		musicDialog(context, l){
			fetch('/H5/rpc',
				{
					method:'POST',
					headers:{ 
			 			'Accept': 'application/json', 
			 			'Content-Type': 'application/json'
					},
					credentials: 'same-origin',
					body: JSON.stringify({
						method: 'getAllUserMusics',
						params: null,
					})
				}
			)
			.then(response => response.json())
			.then(d => {
				if (d.result) {
					context.commit('updateUserMusics', d.params);
					context.commit('musicDialog', l ? true : false);
				}
				else{
					this.$store.commit('alertDesignMessage', {isAlert: true, message: '数据获取异常，请重试'});
				}
			})
		},
		/*弹出图片提示框*/
		imageDialog(context, l){
			fetch('/H5/rpc',
				{
					method:'POST',
					headers:{ 
			 			'Accept': 'application/json', 
			 			'Content-Type': 'application/json'
					},
					credentials: 'same-origin',
					body: JSON.stringify({
						method: 'getAllUserImages',
						params: null,
					})
				}
			)
			.then(response => response.json())
			.then(d => {
				if (d.result) {
					context.commit('updateUserImages', d.params);
					context.commit('imageDialog', l ? true : false);
				}
				else{
					this.$store.commit('alertDesignMessage', {isAlert: true, message: '数据获取异常，请重试'});
				}
			})
		},
		/*取消选中当前元素并让编辑框消失*/
		cancelCurrentEle(context){
			context.commit('isModifyEle', false);
			context.commit('modifyCurrentElement', '');
		},
	},
	getters: {
		
	}
}
