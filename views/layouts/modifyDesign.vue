<template>
 	<div>
		<mu-drawer right :open="isOpen" class="drawer" >
			<mu-tabs :value="activeTab" @change="handleTabChange" class="tab">
				<mu-tab value="style" icon="star" title="样式"/>
				<mu-tab value="cartoon" icon="star" title="动画"/>
			</mu-tabs>
			<div v-show="isStyle" class="showStyle">
				<div v-show="isText">
					<div class="showTextDiv">
						<div class="showText modifyPrompt">文本内容</div>
						<mu-auto-complete v-model="modifyText" class="text" >
					</div>
					<div>
						<div class="modifyPrompt">横向位置</div>
						<mu-slider v-model="modifyLeft" class="slider"/>
					</div>
					<div>
						<div class="modifyPrompt">纵向位置</div>
						<mu-slider v-model="modifyTop" class="slider"/>
					</div>
					<div>
						<div class="modifyPrompt">文字颜色</div>
						<input type="color" name="" class="color" v-model="modifyColor" >
					</div>
					<div>
						<div class="modifyPrompt">背景颜色</div>
						<input type="color" name="" class="color" v-model="modifyBackgroundColor" >
					</div>
					<div>
						<div class="modifyPrompt">字体大小</div>
						<mu-slider v-model="modifyFontSize" class="slider" max='300' />
					</div>
					<div>
						<div class="modifyPrompt">行高</div>
						<mu-slider v-model="modifyLineHeight" class="slider" max='500' />
					</div>
					<div>
						<div class="modifyPrompt">内边距</div>
						<mu-slider v-model="modifyPadding" class="slider" max='100' />
					</div>
				</div>
				<div v-show="isImage">
					<div>
						<div class="modifyPrompt">横向位置</div>
						<mu-slider v-model="modifyLeft" class="slider"/>
					</div>
					<div>
						<div class="modifyPrompt">纵向位置</div>
						<mu-slider v-model="modifyTop" class="slider"/>
					</div>
					<div>
						<div class="modifyPrompt">图片宽度</div>
						<mu-slider v-model="modifyImageWidth" class="slider" max='340'/>
					</div>
					<div>
						<div class="modifyPrompt">图片高度</div>
						<mu-slider v-model="modifyImageHeight" class="slider" max='340'/>
					</div>
				</div>
			</div>
			<div v-show="isCartoon">
				isCartoon
			</div>
		</mu-drawer>
 	</div>
</template>

<script>

	export default {
		components: {

		},
		data(){
			return {
				activeTab: 'style',
				modifyLeft: 0,
				modifyTop: 0,
				modifyColor: 'black',
				modifyFontSize: 0,
				modifyLineHeight: 100,
				modifyBackgroundColor: 'transparent',
				modifyText: '',
				modifyPadding: 0,
				modifyImageWidth: 0,
				modifyImageHeight: 0,
			}
		},
		beforeUpdate(){
			this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
				if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
					if (this.$store.state.Design.DesignInfos.currentElementType === 'text') {
						/*选中元素为文本*/
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.modifyLeft = parseInt(t.style.left);
								this.modifyTop = parseInt(t.style.top);
								this.modifyColor = t.style.color;
								this.modifyFontSize = parseInt(t.style['font-size']);
								this.modifyBackgroundColor = t.style['background-color'];
								this.modifyText = t.text;
								this.modifyLineHeight = parseInt(t.style['line-height']);
								this.modifyPadding = parseInt(t.style['padding']);
							}
						})
					}
					else if (this.$store.state.Design.DesignInfos.currentElementType === 'image') {
						/*选中元素为图片*/
						item.image.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.modifyLeft = parseInt(t.style.left);
								this.modifyTop = parseInt(t.style.top);
								this.modifyImageWidth = parseInt(t.style.width);
								this.modifyImageHeight = parseInt(t.style.height);
							}
						})
					}
				}
			})
		},
		computed: {
			isOpen(){
				return this.$store.state.Design.isModifyEle;
			},
			isStyle(){
				return this.activeTab === 'style';
			},
			isText(){
				return (this.$store.state.Design.DesignInfos.currentElementType === 'text');
			},
			isImage(){
				return (this.$store.state.Design.DesignInfos.currentElementType === 'image');
			},
			isCartoon(){
				return this.activeTab === 'cartoon';
			},
		},
		methods: {
			handleTabChange (val) {
				this.activeTab = val
			},
		},
		watch: {
			modifyLeft(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						let type = (this.$store.state.Design.DesignInfos.currentElementType === 'text')?'text':'image';
						let commitType = (type === 'text')?'modifyTextStyleById':'modifyImageStyleById';
						item[type].forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit(commitType, {
									left: val + '%',
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyTop(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						let type = (this.$store.state.Design.DesignInfos.currentElementType === 'text')?'text':'image';
						let commitType = (type === 'text')?'modifyTextStyleById':'modifyImageStyleById';
						item[type].forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit(commitType, {
									top: val + '%',
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyColor(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyTextStyleById', {
									color: val,
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyFontSize(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyTextStyleById', {
									'font-size': val + '%',
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyBackgroundColor(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyTextStyleById', {
									'background-color': val,
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyText(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyTextContentById', {
									text: val,
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyLineHeight(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyTextStyleById', {
									'line-height': val + '%',
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyPadding(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyTextStyleById', {
									'padding': val + 'px',
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyImageWidth(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.image.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyImageStyleById', {
									'width': val + 'px',
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyImageHeight(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.image.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyImageStyleById', {
									'height': val + 'px',
									id: t.id
								});
							}
						})
					}
				})
			},
		},
	}
</script>

<style scoped>
	.drawer{
		background-color: #d7ccc8;
		width: 400px;
	}

	.tab{
		background-color: #795548;
	}

	.slider{
		width: 250px;
		margin-left: 20px;
	}

	.text{
		margin-left: 20px;
	}

	.color{
		width: 200px;
		margin-left: 20px;
	}

	.showStyle > div > div{
		margin-left: 30px;
		margin-top: 20px;
		height: 30px;
	}

	.showStyle > div > div > div{
		float: left;
	}

	.showTextDiv{
		height: 50px;
	}

	.showText{
		margin-top: 13px;
	}

	.modifyPrompt{
		width: 70px;
	}
</style>