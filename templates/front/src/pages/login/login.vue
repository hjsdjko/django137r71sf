<template>
<div>
	<div class="container" :style='{"minHeight":"100vh","alignItems":"center","background":"url(http://codegen.caihongy.cn/20231018/d513797390d640ba91b1ab562bce4a55.png)","display":"flex","width":"100%","backgroundSize":"cover","backgroundPosition":"center center","backgroundRepeat":"no-repeat","justifyContent":"center"}'>
		<el-form ref="loginForm" :model="loginForm" :style='{"padding":"100px 20px","boxShadow":" 0px 4px 10px 0px rgba(0,0,0,0.302)","margin":"0 0 0 50%","borderRadius":"30px 0 0 30px","textAlign":"center","background":"#fff","width":"50%","position":"relative","height":"100vh"}' :rules="rules">
			<div v-if="true" :style='{"width":"80%","margin":"0 0 20px 12%","lineHeight":"40px","fontSize":"30px","color":"#769589","textAlign":"center"}'>USER / LOGIN</div>
			<div v-if="false" :style='{"margin":"0 0 10px 0","color":"rgba(64, 158, 255, 1)","textAlign":"center","width":"100%","lineHeight":"44px","fontSize":"20px","textShadow":"4px 4px 2px rgba(64, 158, 255, .5)"}'>基于Python的适老化(老年人)健康预警系统的设计与实现登录</div>
			<el-form-item v-if="loginType==1" class="list-item" :style='{"width":"70%","margin":"0 auto 20px 30%"}' prop="username">
				<div v-if="true" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"right"}'>账号：</div>
				<input :style='{"border":"1px solid #769589","padding":"0 10px","color":"#000","outlineOffset":"4px","borderRadius":"90px","width":"310px","fontSize":"14px","height":"44px"}' v-model="loginForm.username" placeholder="请输入账户">
			</el-form-item>
			<el-form-item v-if="loginType==1" class="list-item" :style='{"width":"70%","margin":"0 auto 20px 30%"}' prop="password">
				<div v-if="true" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"right"}'>密码：</div>
				<input :style='{"border":"1px solid #769589","padding":"0 10px","color":"#000","outlineOffset":"4px","borderRadius":"90px","width":"310px","fontSize":"14px","height":"44px"}' v-model="loginForm.password" placeholder="请输入密码" type="password">
			</el-form-item>

			<el-form-item class="list-type select" :style='{"width":"70%","margin":"0 auto 20px 30%"}' v-if="roles.length>1">
			  <el-select v-model="loginForm.tableName" placeholder="请选择角色" @change="selectChange">
				<el-option v-for="item,index in roles" :key="index" :label="item.roleName" :value="item.tableName" />
			  </el-select>
			</el-form-item>

			  <div v-if="flag" class="mask" style="position: fixed;z-index: 998;top: 0;right: 0;left: 0;bottom: 0;background: rgba(0,0,0,.5);"></div>
			  <!-- option1 -->
			  <div v-if="flag" class="box" :style='{"padding":"0 24px 24px","transform":"translate3d(-50%,-50%,0)","top":"50%","borderRadius":"20px","left":"50%","background":"#fff","position":"fixed","zIndex":999}'>
			    <span @click="flag = !flag" :style='{"cursor":"pointer","padding":"10px","top":"0","fontSize":"20px","position":"absolute","right":"0","zIndex":1}' class="icon iconfont guanbi icon-guanbi1"></span>
			    <div :style='{"lineHeight":"40px","fontSize":"18px","color":"#000","textAlign":"center"}'>身份验证</div>
			    <div id="option1" :style='{"width":"400px","padding":"20px","height":"auto"}'></div>
			  </div>
			
			<el-form-item class="list-btn" :style='{"width":"auto","padding":"0","margin":"0","background":"none","display":"inline-block"}'>
				<el-button v-if="loginType==1" :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 10px 0","color":"#fff","borderRadius":"40px","background":"#769589","display":"inline-block","width":"auto","fontSize":"14px","lineHeight":"36px","height":"36px"}' @click="submitForm('loginForm')">登录</el-button>
				<el-button v-if="loginType==1" :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 5px","outline":"none","color":"#fff","borderRadius":"4px","background":"rgba(64, 158, 255, 1)","display":"none","width":"auto","fontSize":"14px","height":"44px"}' @click="resetForm('loginForm')">重置</el-button>
			</el-form-item>
			<div :style='{"width":"auto","margin":"0","alignItems":"center","flexDirection":"column","display":"inline-block","height":"auto"}'>
			<router-link :style='{"cursor":"pointer","border":"1px solid #769589","padding":"0 10px","margin":"0 10px 10px 0","color":"#769589","textAlign":"center","display":"inline-block","textDecoration":"none","borderRadius":"20px","background":"#fff","width":"auto","fontSize":"14px","lineHeight":"36px","height":"36px"}' :to="{path: '/register', query: {role: item.tableName,pageFlag:'register'}}" v-if="item.hasFrontRegister=='是'" v-for="(item, index) in roles" :key="index">注册{{item.roleName.replace('注册','')}}</router-link>
			</div>
			<div class="idea1" :style='{"width":"100%","background":"red","display":"none","height":"40px"}'></div>
			<div class="idea2" :style='{"width":"100%","background":"blue","display":"none","height":"40px"}'></div>
		</el-form>
    </div>
</div>
</template>

<script>
import menu from '@/config/menu'
export default {
	//数据集合
	data() {
		return {
            baseUrl: this.$config.baseUrl,
            loginType: 1,
			roleMenus: [],
			loginForm: {
				username: '',
				password: '',
				tableName: '',
				code: '',
			},
			role: '',
            roles: [],
			rules: {
				username: [
					{ required: true, message: '请输入账户', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			},
			codes: [{
				num: 1,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 2,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 3,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 4,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}],
			flag: false,
			verifyCheck2: false,
		}
	},
  components: {
  },
	created() {
		this.roleMenus = menu.list()
		for(let item in this.roleMenus) {
		    if(this.roleMenus[item].hasFrontLogin=='是') {
		        this.roles.push(this.roleMenus[item]);
		    }
		}
		
	},
	mounted() {
	},
    //方法集合
    methods: {
		randomString() {
			var len = 4;
			var chars = [
			  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
			  'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
			  'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
			  'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
			  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2',
			  '3', '4', '5', '6', '7', '8', '9'
			]
			var colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
			var sizes = ['14', '15', '16', '17', '18']
			
			var output = []
			for (var i = 0; i < len; i++) {
			  // 随机验证码
			  var key = Math.floor(Math.random() * chars.length)
			  this.codes[i].num = chars[key]
			  // 随机验证码颜色
			  var code = '#'
			  for (var j = 0; j < 6; j++) {
			    var key = Math.floor(Math.random() * colors.length)
			    code += colors[key]
			  }
			  this.codes[i].color = code
			  // 随机验证码方向
			  var rotate = Math.floor(Math.random() * 45)
			  var plus = Math.floor(Math.random() * 2)
			  if (plus == 1) rotate = '-' + rotate
			  this.codes[i].rotate = 'rotate(' + rotate + 'deg)'
			  // 随机验证码字体大小
			  var size = Math.floor(Math.random() * sizes.length)
			  this.codes[i].size = sizes[size] + 'px'
			}
		},
	  selectChange(e){
		  this.role = e
	  },
      submitForm(formName) {
        if (this.roles.length!=1) {
            if (!this.role) {
                this.$message.error("请选择登录用户类型");
                return false;
            }
        } else {
            this.role = this.roles[0].roleName;
            this.loginForm.tableName = this.roles[0].tableName;
        }

		this.flag = true
		this.$nextTick(()=>{
			this.setVerify(formName)
		})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
	  loginPost(formName) {
		this.$refs[formName].validate((valid) => {
		  if (valid) {
		    this.$http.get(`${this.loginForm.tableName}/login`, {params: this.loginForm}).then(res => {
		      if (res.data.code === 0) {
		        localStorage.setItem('frontToken', res.data.token);
		        localStorage.setItem('UserTableName', this.loginForm.tableName);
		        localStorage.setItem('username', this.loginForm.username);
		        localStorage.setItem('adminName', this.loginForm.username);
		        localStorage.setItem('frontSessionTable', this.loginForm.tableName);
		        localStorage.setItem('frontRole', this.role);
		        localStorage.setItem('keyPath', 0);
		        this.$router.push('/');
		        this.$message({
		          message: '登录成功',
		          type: 'success',
		          duration: 1500,
		        });
		      } else {
		        this.$message.error(res.data.msg);
		      }
		    });
		  } else {
		    return false;
		  }
		});
	  },
	  setVerify(formName) {
	  // option1
	    $("#option1").slideVerify({
	    	type: 2, //类型
	    	vOffset: 5,
	    	vSpace: 5,
	    	imgName: [{"name":"1.webp","uid":1697636958674,"url":"http://codegen.caihongy.cn/20230624/def2091e36b94e56ac715add21ead926.webp","status":"success"},{"name":"1.webp","uid":1697636958675,"url":"http://codegen.caihongy.cn/20230624/e472a03077fc40919d549846b8ebc2dd.jpg","status":"success"}].map((item)=>{return item.url}),
	    	imgSize: {"width":"360px","height":"200px"},
	    	blockSize: {"width":"40px","height":"40px"},
	    	barSize: {"width":"360px","height":"40px"},
	    	ready: () => {},
	    	success: () => {
				setTimeout(()=>{
				  this.flag = false
				  this.loginPost(formName)
				},2500)
	    	}
	    })
	  },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.container {
		position: relative;
		background: url(http://codegen.caihongy.cn/20231018/d513797390d640ba91b1ab562bce4a55.png);
		
		.el-form-item {
		  & /deep/ .el-form-item__content {
		    width: 100%;
		  }
		}
		
		.list-item /deep/ .el-form-item__content {
			display: flex;
		}

		.list-code /deep/ .el-form-item__content {
			display: flex;
		}

		.list-type /deep/ .el-form-item__content {
			margin: 20px 0;
			display: flex;
		}

		.list-btn /deep/ .el-form-item__content {
			display: inline-block;
		}
		
		.list-item /deep/ .el-input .el-input__inner {
			border: 1px solid #769589;
			border-radius: 90px;
			padding: 0 10px;
			color: #000;
			width: 310px;
			font-size: 14px;
			outline-offset: 4px;
			height: 44px;
		}
		
		.list-code /deep/ .el-input .el-input__inner {
			border: 1px solid #769589;
			border-radius: 90px 0 0 90px;
			padding: 0 10px;
			outline: none;
			color: #000;
			display: inline-block;
			vertical-align: middle;
			width: 210px;
			font-size: 14px;
			height: 44px;
		}

		// select
		.list-type.select .el-select /deep/ .el-input__inner {
			border: 1px solid #769589;
			border-radius: 90px;
			padding: 0 10px;
			margin: 0 0 0 65px;
			color: #000;
			width: 310px;
			font-size: 14px;
			height: 44px;
		}
	}

	// option1Style
	#option1 /deep/ .verify-img-panel {
				border-radius: 4px;
				margin: 0 0 5px;
				width: 360px;
				position: relative;
				height: 200px;
			}
	  
	#option1 /deep/ .verify-img-panel .verify-refresh {
				cursor: pointer;
				padding: 5px;
				z-index: 2;
				top: 0;
				position: absolute;
				right: 0;
			}
	
	#option1 /deep/ .verify-img-panel .verify-refresh .iconfont {
				color: #fff;
				font-size: 20px;
				line-height: 1;
			}
	
	#option1 /deep/ .verify-bar-area {
				border: 1px solid #ddd;
				background: #FFFFFF;
				width: 360px;
				line-height: 40px;
				position: relative;
				text-align: center;
				height: 40px;
			}
	
	#option1 /deep/ .verify-bar-area .verify-msg {
				color: #333;
				font-size: 16px;
			}
	
	#option1 /deep/ .verify-bar-area .verify-left-bar {
				cursor: pointer;
				border: 1px solid #ddd;
				top: -1px;
				left: -1px;
				background: #f0fff0;
				width: 40px;
				position: absolute;
				height: 40px;
			}
	
	#option1 /deep/ .verify-bar-area .verify-left-bar.verify-left-bar-active {
				border: 1px solid #1a91ed;
			}
	
	#option1 /deep/ .verify-bar-area .verify-left-bar.verify-left-bar-success {
				border: 1px solid rgb(92, 184, 92);
			}
	
	#option1 /deep/ .verify-bar-area .verify-left-bar.verify-left-bar-error {
				border: 1px solid red;
			}
	
	#option1 /deep/ .verify-bar-area .verify-left-bar .verify-move-block {
				cursor: pointer;
				box-shadow: 0 0 2px #888888;
				top: 0;
				left: 0;
				background: #fff;
				width: 38px;
				position: absolute;
				height: 38px;
			}
	
	#option1 /deep/ .verify-bar-area .verify-left-bar.verify-left-bar-active .verify-move-block {
				color: #fff !important;
				background: #1a91ed !important;
			}
	
	#option1 /deep/ .verify-bar-area .verify-left-bar.verify-left-bar-success .verify-move-block {
				color: #fff !important;
				background: rgb(92, 184, 92) !important;
			}
	
	#option1 /deep/ .verify-bar-area .verify-left-bar.verify-left-bar-error .verify-move-block {
				color: #fff !important;
				background: red !important;
			}
	
	#option1 /deep/ .verify-bar-area .verify-left-bar .verify-move-block .verify-icon {
				color: inherit;
				font-size: 18px;
			}
</style>
