<template>
	<div class="main-containers">
		<div class="body-containers" :style='{"minHeight":"100vh","padding":"0px 0 0","margin":"0","position":"relative","background":"#fff"}'>
		<div class="top-container" :style='{"padding":"0 20px","margin":"0","alignItems":"center","display":"flex","right":"0","justifyContent":"flex-end","overflow":"hidden","top":"0","background":"rgba(0,0,0,0.5)","width":"35%","position":"fixed","height":"65px","zIndex":"1002"}'>
			<!-- info -->
			<div :style='{"display":"none"}'>
			  <el-image :style='{"width":"44px","objectFit":"cover","borderRadius":"100%","float":"left","height":"44px"}' src="http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg" fit="cover" />
			  <span :style='{"padding":"0 0 0 12px","lineHeight":"44px","color":"rgba(64, 158, 255, 1)","float":"left"}'>基于Python的适老化(老年人)健康预警系统的设计与实现</span>
			</div>
			<!-- weather -->
			<div class="weather" :style='{"padding":"0 20px","alignItems":"center","justifyContent":"center","display":"none"}'>
				<div :style='{"padding":"0 4px","fontSize":"16px","lineHeight":"44px","color":"#333"}'>{{weather.city}}</div>
				<div :style='{"padding":"0 4px","fontSize":"16px","lineHeight":"44px","color":"#333"}'>{{weather.tem}}°</div>
				<div :style='{"padding":"0 4px","fontSize":"16px","lineHeight":"44px","color":"#333"}'>{{weather.wea}}</div>
				<div :style='{"padding":"0 4px","fontSize":"16px","lineHeight":"44px","color":"#333"}'>{{weather.win}}</div>
				<div :style='{"padding":"0 4px","fontSize":"16px","lineHeight":"44px","color":"#333"}'>{{weather.win_speed}}</div>
			</div>
			<!-- time -->
			<div :style='{"padding":"0 4px","fontSize":"16px","lineHeight":"44px","color":"#333","display":"none"}'>{{times}}</div>
			
			<div v-if="false" :style='{"color":"#666","margin":"0 10px","fontSize":"14px"}'>0753-1234567</div>
			
			<div id="search" class="search" :style='{"margin":"0 10px","flexWrap":"wrap","background":"#fff","display":"none","height":"auto"}'>
				<div :style='{"margin":"0 10px 0 0"}' class="select">
					<el-select v-model="queryIndex">
						<el-option v-for="(item,index) in queryList" :key="index" :label="item.queryName" :value="index"></el-option>
					</el-select>
				</div>
				<div :style='{"margin":"0 10px 0 0"}' class="input" v-if="queryIndex==0">
					<el-input v-model="yishengyishengxingming" placeholder="医生姓名"></el-input>
				</div>
				<div :style='{"margin":"0"}' class="btn" v-if="queryIndex==0">
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"rgba(64, 158, 255, 1)","width":"auto","lineHeight":"44px","fontSize":"14px","height":"44px"}' type="primary" @click="search('yisheng')">
						<span class="icon iconfont icon-fangdajing07" :style='{"color":"rgba(255, 255, 255, 1)","margin":"0 4px 0 0","fontSize":"14px"}'></span>
						搜索
					</el-button>
				</div>
			</div>
			<img v-if="headportrait&&Token" :style='{"width":"40px","margin":"0 6px","borderRadius":"50%","height":"40px"}' :src="headportrait?baseUrl + headportrait:require('@/assets/avator.png')">
			<div v-if="Token" :style='{"padding":"0 12px","fontSize":"14px","lineHeight":"32px","color":"#fff","height":"32px","order":"0"}'>{{username}}</div>
			<div v-if="Token && notAdmin" :style='{"cursor":"pointer","padding":"0 6px","color":"#fff","fontSize":"14px","lineHeight":"32px","height":"32px","order":"2"}' @click="goMenu('/index/center')">个人中心</div>
			<el-button v-if="!Token" @click="toLogin()" :style='{"padding":"0 12px","margin":"0 10px","color":"#f4f4f5","borderRadius":"0px","background":"rgba(0,0,0,0)","display":"inline-block","fontSize":"14px","lineHeight":"32px","height":"32px","order":"5"}'>登录/注册</el-button>
			<el-button v-if="Token" @click="logout" :style='{"padding":"0 12px","margin":"0 10px","color":"#fff","borderRadius":"0px","background":"rgba(0,0,0,0)","display":"inline-block","fontSize":"14px","lineHeight":"32px","height":"32px","order":"6"}'>退出</el-button>
		</div>


			<div class="menu-preview" :style='{"borderColor":"#efefef","top":"0","left":"0","borderWidth":"0","width":"65%","position":"fixed","borderStyle":"solid","height":"auto","zIndex":"11"}'>
			<el-scrollbar wrap-class="scrollbar-wrapper-horizontal">
				<el-menu class="el-menu-horizontal-demo" :style='{"border":0,"padding":"0","listStyle":"none","margin":"0","background":"rgba(0,0,0,0.5)","display":"flex","width":"100%","position":"relative","zIndex":"111"}' :default-active="activeMenu" :unique-opened="true" mode="horizontal" :router="true" @select="handleSelect">
					<div class="userinfo" :style='{"width":"84px","padding":"6px 10px 0","display":"none","height":"auto"}'>
					  <el-image :style='{"width":"100%","objectFit":"cover","borderRadius":"20px","display":"block","height":"32px"}' src="http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg" fit="cover"></el-image>
					  <div :style='{"fontSize":"12px","lineHeight":"1.5","color":"#333","textAlign":"center"}'>nickname</div>
					</div>
					<el-menu-item class="home" index="/index/home" @click.native="goMenu('/index/home')">
						<span :style='{"padding":"0 10px","margin":"0","color":"inherit","display":"none","width":"14px","lineHeight":"56px","fontSize":"14px","height":"56px"}' class="icon iconfont "></span>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"14px","color":"inherit","height":"56px"}'>系统首页</span>
					</el-menu-item>
					<el-menu-item class="item" v-for="(menu, index) in menuList" :index="menu.url" :key="index" @click.native="goMenu(menu.url)">
						<i :style='{"padding":"0 10px","margin":"0","color":"inherit","display":"none","width":"14px","lineHeight":"56px","fontSize":"14px","height":"56px"}' :class="iconArr[index]"></i>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"14px","color":"inherit","height":"56px"}'>{{menu.name}}</span>
					</el-menu-item>
					<el-menu-item class="user" index="/index/center" v-if="Token && notAdmin" @click.native="goMenu('/index/center')">
						<span :style='{"padding":"0 10px","margin":"0","color":"inherit","display":"none","width":"14px","lineHeight":"56px","fontSize":"14px","height":"56px"}' class="icon iconfont "></span>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"14px","color":"inherit","height":"56px"}'>个人中心</span>
					</el-menu-item>
				</el-menu>
			</el-scrollbar>
			</div>


			<div class="banner-preview" :style='{"width":"100%","margin":"-60px 0 0 0","height":"auto"}'>
				<el-carousel :style='{"width":"100%","margin":"0 auto","height":"600px"}' trigger="click" indicator-position="inside" arrow="always" type="default" direction="horizontal" height="400px" :autoplay="true" :interval="3000" :loop="true">
					<el-carousel-item :style='{"borderRadius":"0","width":"100%","height":"600px"}' v-for="item in carouselList" :key="item.id">
						<el-image @click="carouselClick(item.url)" :style='{"objectFit":"cover","width":"100%","height":"600px"}' :src="baseUrl + item.value" fit="cover"></el-image>
					</el-carousel-item>
				</el-carousel>
			</div>


			<router-view id="scrollView"></router-view>
			
			<div class="bottom-preview" :style='{"width":"100%","height":"auto"}'>
				<div :style='{"padding":"20px","overflow":"hidden","color":"#fff","textAlign":"center","background":"#000","width":"100%","height":"auto"}'><div v-html="bottomContent"></div></div>
			</div>
		</div>
		
	</div>
</template>

<script>
import Vue from 'vue'
import Swiper from "swiper";
import axios from 'axios'

export default {
    data() {
		return {
		queryList:[
		  {
			  queryName:"医生姓名",
		  },
		],
		queryIndex: 0,
		yishengyishengxingming: '',
            activeIndex: '0',
			roleMenus: [{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-brand","buttons":["新增","查看","修改","删除"],"menu":"用户","menuJump":"列表","tableName":"yonghu"}],"menu":"用户管理"},{"child":[{"allButtons":["新增","查看","修改","删除","在线咨询","立即预约"],"appFrontIcon":"cuIcon-discover","buttons":["新增","查看","修改","删除"],"menu":"医生","menuJump":"列表","tableName":"yisheng"}],"menu":"医生管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-medal","buttons":["查看","修改","删除"],"menu":"科室","menuJump":"列表","tableName":"keshi"}],"menu":"科室管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-skin","buttons":["新增","查看","修改","删除"],"menu":"药品信息","menuJump":"列表","tableName":"yaopinxinxi"}],"menu":"药品信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核","咨询科室类别","医生咨询次数","首页总数","首页统计"],"appFrontIcon":"cuIcon-send","buttons":["查看","修改","删除","咨询科室类别","医生咨询次数","首页总数","首页统计"],"menu":"健康咨询","menuJump":"列表","tableName":"jiankangzixun"}],"menu":"健康咨询管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核","门诊病历"],"appFrontIcon":"cuIcon-present","buttons":["查看","修改","删除"],"menu":"医生预约","menuJump":"列表","tableName":"yishengyuyue"}],"menu":"医生预约管理"},{"child":[{"allButtons":["新增","查看","修改","删除","支付","医疗费用统计","首页总数","首页统计"],"appFrontIcon":"cuIcon-brand","buttons":["查看","修改","删除","医疗费用统计","首页总数","首页统计"],"menu":"门诊病历","menuJump":"列表","tableName":"menzhenbingli"}],"menu":"门诊病历管理"},{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-phone","buttons":["查看","修改","删除","查看评论"],"menu":"健康科普","menuJump":"列表","tableName":"jiankangkepu"}],"menu":"健康科普管理"},{"child":[{"allButtons":["新增","查看","修改","删除","健康建议"],"appFrontIcon":"cuIcon-pic","buttons":["查看","修改","删除"],"menu":"健康数据","menuJump":"列表","tableName":"jiankangshuju"}],"menu":"健康数据管理"},{"child":[{"allButtons":["新增","查看","修改","删除","健康等级统计","首页总数","首页统计"],"appFrontIcon":"cuIcon-brand","buttons":["查看","修改","删除","健康等级统计","首页总数","首页统计"],"menu":"健康建议","menuJump":"列表","tableName":"jiankangjianyi"}],"menu":"健康建议管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-skin","buttons":["新增","查看","修改","删除"],"menu":"轮播图管理","tableName":"config"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"健康资讯","tableName":"news"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"健康资讯分类","tableName":"newstype"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","在线咨询","立即预约"],"appFrontIcon":"cuIcon-time","buttons":["查看","在线咨询","立即预约"],"menu":"医生列表","menuJump":"列表","tableName":"yisheng"}],"menu":"医生模块"},{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-time","buttons":["查看","查看评论"],"menu":"健康科普列表","menuJump":"列表","tableName":"jiankangkepu"}],"menu":"健康科普模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","审核","咨询科室类别","医生咨询次数","首页总数","首页统计"],"appFrontIcon":"cuIcon-send","buttons":["查看","删除"],"menu":"健康咨询","menuJump":"列表","tableName":"jiankangzixun"}],"menu":"健康咨询管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核","门诊病历"],"appFrontIcon":"cuIcon-present","buttons":["删除","查看"],"menu":"医生预约","menuJump":"列表","tableName":"yishengyuyue"}],"menu":"医生预约管理"},{"child":[{"allButtons":["新增","查看","修改","删除","支付","医疗费用统计","首页总数","首页统计"],"appFrontIcon":"cuIcon-brand","buttons":["查看","支付"],"menu":"门诊病历","menuJump":"列表","tableName":"menzhenbingli"}],"menu":"门诊病历管理"},{"child":[{"allButtons":["新增","查看","修改","删除","健康建议"],"appFrontIcon":"cuIcon-pic","buttons":["新增","查看","修改","删除"],"menu":"健康数据","menuJump":"列表","tableName":"jiankangshuju"}],"menu":"健康数据管理"},{"child":[{"allButtons":["新增","查看","修改","删除","健康等级统计","首页总数","首页统计"],"appFrontIcon":"cuIcon-brand","buttons":["查看"],"menu":"健康建议","menuJump":"列表","tableName":"jiankangjianyi"}],"menu":"健康建议管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","在线咨询","立即预约"],"appFrontIcon":"cuIcon-time","buttons":["查看","在线咨询","立即预约"],"menu":"医生列表","menuJump":"列表","tableName":"yisheng"}],"menu":"医生模块"},{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-time","buttons":["查看","查看评论"],"menu":"健康科普列表","menuJump":"列表","tableName":"jiankangkepu"}],"menu":"健康科普模块"}],"hasBackLogin":"否","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"用户","tableName":"yonghu"},{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","审核","咨询科室类别","医生咨询次数","首页总数","首页统计"],"appFrontIcon":"cuIcon-send","buttons":["查看","审核","医生咨询次数"],"menu":"健康咨询","menuJump":"列表","tableName":"jiankangzixun"}],"menu":"健康咨询管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核","门诊病历"],"appFrontIcon":"cuIcon-present","buttons":["审核","查看","门诊病历"],"menu":"医生预约","menuJump":"列表","tableName":"yishengyuyue"}],"menu":"医生预约管理"},{"child":[{"allButtons":["新增","查看","修改","删除","支付","医疗费用统计","首页总数","首页统计"],"appFrontIcon":"cuIcon-brand","buttons":["查看","删除","医疗费用统计"],"menu":"门诊病历","menuJump":"列表","tableName":"menzhenbingli"}],"menu":"门诊病历管理"},{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-phone","buttons":["新增","查看","修改","删除"],"menu":"健康科普","menuJump":"列表","tableName":"jiankangkepu"}],"menu":"健康科普管理"},{"child":[{"allButtons":["新增","查看","修改","删除","健康建议"],"appFrontIcon":"cuIcon-pic","buttons":["查看","健康建议"],"menu":"健康数据","menuJump":"列表","tableName":"jiankangshuju"}],"menu":"健康数据管理"},{"child":[{"allButtons":["新增","查看","修改","删除","健康等级统计","首页总数","首页统计"],"appFrontIcon":"cuIcon-brand","buttons":["查看","删除","健康等级统计"],"menu":"健康建议","menuJump":"列表","tableName":"jiankangjianyi"}],"menu":"健康建议管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["查看"],"menu":"健康资讯","tableName":"news"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","在线咨询","立即预约"],"appFrontIcon":"cuIcon-time","buttons":["查看","在线咨询","立即预约"],"menu":"医生列表","menuJump":"列表","tableName":"yisheng"}],"menu":"医生模块"},{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-time","buttons":["查看","查看评论"],"menu":"健康科普列表","menuJump":"列表","tableName":"jiankangkepu"}],"menu":"健康科普模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"医生","tableName":"yisheng"}],
			baseUrl: '',
			carouselList: [],
			menuList: [],
			form: {
				ask: '',
				userid: localStorage.getItem('frontUserid')
			},
			headportrait: localStorage.getItem('frontHeadportrait')?localStorage.getItem('frontHeadportrait'):'',
			Token: localStorage.getItem('frontToken'),
            username: localStorage.getItem('username'),
            notAdmin: localStorage.getItem('frontSessionTable')!='"users"',
			timer: '',
			// 时间
			times: '',
			// 天气
			weather: {},
			iconArr: [
				'el-icon-star-off',
				'el-icon-goods',
				'el-icon-warning',
				'el-icon-question',
				'el-icon-info',
				'el-icon-help',
				'el-icon-picture-outline-round',
				'el-icon-camera-solid',
				'el-icon-video-camera-solid',
				'el-icon-video-camera',
				'el-icon-bell',
				'el-icon-s-cooperation',
				'el-icon-s-order',
				'el-icon-s-platform',
				'el-icon-s-operation',
				'el-icon-s-promotion',
				'el-icon-s-release',
				'el-icon-s-ticket',
				'el-icon-s-management',
				'el-icon-s-open',
				'el-icon-s-shop',
				'el-icon-s-marketing',
				'el-icon-s-flag',
				'el-icon-s-comment',
				'el-icon-s-finance',
				'el-icon-s-claim',
				'el-icon-s-opportunity',
				'el-icon-s-data',
				'el-icon-s-check'
			],
			bottomContent: '',
		}
    },
    created() {
		this.$nextTick(() => {
			// 获取时间
			this.setTimes()
		})
		// 获取天气
		this.getWeather()
		this.baseUrl = this.$config.baseUrl;
		this.menuList = this.$config.indexNav;
		this.getCarousel();
        if(localStorage.getItem('frontToken') && localStorage.getItem('frontToken')!=null) {
			this.getSession()
        }
    },
    mounted() {
        this.activeIndex = localStorage.getItem('keyPath') || '0';



    },
    computed: {
		activeMenu() {
			const route = this.$route
			const {
				meta,
				path
			} = route
			// if st path, the sidebar will highlight the path you sete
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
    },
    watch: {
        $route(newValue) {
            let that = this
            let url = window.location.href
            let arr = url.split('#')
            for (let x in this.menuList) {
                if (newValue.path == this.menuList[x].url) {
                    this.activeIndex = x
                }
            }
            this.Token = localStorage.getItem('frontToken')
            if(arr[1]!='/index/home'){
            	var element = document.getElementById('scrollView');
            	var distance = element.offsetTop;
            	window.scrollTo( 0, distance )
            }else{
            	window.scrollTo( 0, 0 )
            }
        },
		headportrait(){
			this.$forceUpdate()
		},
    },
    methods: {
      search(tablename) {
        if (this.queryIndex == 0 && this.yishengyishengxingming) {
          this.$router.push({path: '/index/' + tablename, query: {indexQueryCondition: this.yishengyishengxingming}});
        }
      },
		// 获取当前时间
		setTimes() {
			setInterval(()=>{
				let d = new Date()
				this.times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
			},1000)
		},
		// 获取当前城市天气
		getWeather(){
			axios({
				method: 'get',
				url: 'http://v0.yiketianqi.com/free/day?appid=69475998&appsecret=rldbX1Zl'
			}).then(res => {
				this.weather = res.data
			})
		},

		async getSession() {
			await this.$http.get(`${localStorage.getItem('UserTableName')}/session`, {emulateJSON: true}).then(async res => {
				if (res.data.code == 0) {
					localStorage.setItem('sessionForm',JSON.stringify(res.data.data))
					localStorage.setItem('frontUserid', res.data.data.id);
					if(res.data.data.vip) {
						localStorage.setItem('vip', res.data.data.vip);
					}
					if(res.data.data.touxiang) {
						this.headportrait = res.data.data.touxiang
						localStorage.setItem('frontHeadportrait', res.data.data.touxiang);
					} else if(res.data.data.headportrait) {
						this.headportrait = res.data.data.headportrait
						localStorage.setItem('frontHeadportrait', res.data.data.headportrait);
					}
				}
			});
		},
        handleSelect(keyPath) {
            if (keyPath) {
                localStorage.setItem('keyPath', keyPath)
            }
        },
		toLogin() {
		  this.$router.push('/login');
		},
        logout() {
            localStorage.clear();
            Vue.http.headers.common['Token'] = "";
            this.$router.push('/index/home');
            this.activeIndex = '0'
            localStorage.setItem('keyPath', this.activeIndex)
            this.Token = ''
            this.$forceUpdate()
            this.$message({
                message: '登出成功',
                type: 'success',
                duration: 1000,
            });
        },
		getCarousel() {
			this.$http.get('config/list', {params: { page: 1, limit: 3 }}).then(res => {
				if (res.data.code == 0) {
					this.carouselList = res.data.data.list;
				}
			});
		},
		// 轮播图跳转
		carouselClick(url) {
			if (url) {
				if (url.indexOf('https') != -1) {
					window.open(url)
				} else {
					this.$router.push(url)
				}
			}
		},
		goBackend() {
			localStorage.setItem('Token', localStorage.getItem('frontToken'));
			localStorage.setItem('role', localStorage.getItem('frontRole'));
			localStorage.setItem('sessionTable', localStorage.getItem('frontSessionTable'));
			localStorage.setItem('headportrait', localStorage.getItem('frontHeadportrait'));
			localStorage.setItem('userid', localStorage.getItem('frontUserid'));
			window.open(`${this.$config.baseUrl}admin/dist/index.html`, "_blank");
		},
		goMenu(path) {
            this.$router.push(path);
		},
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.menu-preview {
	  .el-scrollbar {
	    height: 100%;
	  
	    & /deep/ .scrollbar-wrapper-vertical {
	      overflow-x: hidden;
	    }
	  
	    & /deep/ .scrollbar-wrapper-horizontal {
	      overflow-y: hidden;
	  
	      .el-scrollbar__view {
	        white-space: nowrap;
	      }
	    }
	  }
	}
	
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #fff;
				white-space: nowrap;
				display: flex;
				font-size: 14px;
				line-height: 65px;
				background: rgba(0,0,0,0);
				align-items: center;
				position: relative;
				list-style: none;
				height: 65px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home:hover {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home.is-active {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #fff;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: rgba(0,0,0,0);
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user:hover {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user.is-active {
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #fff;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: rgba(0,0,0,0);
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service:hover {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service.is-active {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #fff;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: rgba(0,0,0,0);
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop:hover {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop.is-active {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #fff;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: rgba(0,0,0,0);
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back:hover {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back.is-active {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #fff;
				white-space: nowrap;
				display: flex;
				font-size: 14px;
				line-height: 65px;
				background: rgba(0,0,0,0);
				align-items: center;
				position: relative;
				list-style: none;
				height: 65px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item:hover {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item.is-active {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.banner-preview {
	  .el-carousel /deep/ .el-carousel__indicator button {
	    width: 0;
	    height: 0;
	    display: none;
	  }
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left {
		margin: 150px 0 0 0;
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left:hover {
		background: #666;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right {
		margin: 150px 0 0 0;
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right:hover {
		background: #666;
	}

	.banner-preview .el-carousel /deep/ .el-carousel__indicators {
		padding: 0;
		margin: 0 0 10px;
		z-index: 2;
		position: absolute;
		list-style: none;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li {
		border-radius: 10px;
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 12px;
		opacity: 0.4;
		transition: 0.3s;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li:hover {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 0.7;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li.is-active {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 1;
		height: 12px;
	}

    .chat-content {
        padding-bottom: 20px;
        width: 100%;
        margin-bottom: 10px;
        max-height: 300px;
        height: 300px;
        overflow-y: scroll;
        border: 1px solid #eeeeee;
        background: #fff;

        .left-content {
            float: left;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }

        .right-content {
            float: right;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }
    }

    .clear-float {
        clear: both;
    }


	
	// -------- search --------
	.main-containers .search .select /deep/ .el-input__inner {
				border: 0;
				border-radius: 4px;
				padding: 0 30px 0 10px;
				box-shadow: 0 0 6px rgba(64, 158, 255, .3);
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 180px;
				font-size: 14px;
				height: 44px;
			}
	
	.main-containers .search .input /deep/ .el-input__inner {
				border: 0;
				border-radius: 4px;
				padding: 0 10px;
				box-shadow: 0 0 6px rgba(64, 158, 255, .3);
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 180px;
				font-size: 14px;
				height: 44px;
			}
	// -------- search --------
	
	.main-containers .btn-service {
				border: 0;
				padding: 0 8px;
				margin: 0 0px;
				color: #fff;
				background: rgba(0,0,0,0);
				width: auto;
				font-size: 14px;
				line-height: 32px;
				height: 32px;
				order: 4;
			}
	
	.main-containers .btn-service:hover {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
	
	.main-containers .btn-shop {
				border: 0;
				padding: 0 8px;
				margin: 0 0px;
				color: #fff;
				background: rgba(0,0,0,0);
				width: auto;
				font-size: 14px;
				line-height: 32px;
				height: 32px;
				order: 3;
			}
	
	.main-containers .btn-shop:hover {
				color: #fff;
				background: rgba(255,255,255,.3);
			}
</style>
