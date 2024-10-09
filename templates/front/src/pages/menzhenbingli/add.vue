<template>
<div :style='{"width":"1200px","padding":"20px","margin":"10px auto 20px","position":"relative","background":"#fff"}'>
    <el-form
	  :style='{"width":"100%","padding":"50px 0 80px","position":"relative","flexWrap":"wrap","display":"flex"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="预约编号" prop="yuyuebianhao">
            <el-input v-model="ruleForm.yuyuebianhao" 
                placeholder="预约编号" clearable :disabled=" false  ||ro.yuyuebianhao"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="用户账号" prop="yonghuzhanghao">
            <el-input v-model="ruleForm.yonghuzhanghao" 
                placeholder="用户账号" clearable :disabled=" false  ||ro.yonghuzhanghao"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="用户姓名" prop="yonghuxingming">
            <el-input v-model="ruleForm.yonghuxingming" 
                placeholder="用户姓名" clearable :disabled=" false  ||ro.yonghuxingming"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="主诉" prop="zhusu">
            <el-input v-model="ruleForm.zhusu" 
                placeholder="主诉" clearable :disabled=" false  ||ro.zhusu"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="既往史" prop="jiwangshi">
            <el-input v-model="ruleForm.jiwangshi" 
                placeholder="既往史" clearable :disabled=" false  ||ro.jiwangshi"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="药物禁忌" prop="yaowujinji">
            <el-input v-model="ruleForm.yaowujinji" 
                placeholder="药物禁忌" clearable :disabled=" false  ||ro.yaowujinji"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="临床诊断" prop="linchuangzhenduan">
            <el-input v-model="ruleForm.linchuangzhenduan" 
                placeholder="临床诊断" clearable :disabled=" false  ||ro.linchuangzhenduan"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="药品名称" prop="yaopinmingcheng">
            <el-select  @change="yaopinmingchengChange" v-model="ruleForm.yaopinmingcheng" placeholder="请选择药品名称">
              <el-option
                  v-for="(item,index) in yaopinmingchengOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="药品价格" prop="yaopinjiage">
			<el-input-number v-model="ruleForm.yaopinjiage" placeholder="药品价格" :readonly="ro.yaopinjiage"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="医疗费用" prop="yiliaofeiyong">
			<el-input-number v-model="ruleForm.yiliaofeiyong" placeholder="医疗费用" :readonly="ro.yiliaofeiyong"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="总金额" prop="zongjine">
              <el-input v-model="zongjine" placeholder="总金额" disabled></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="医生工号" prop="yishenggonghao">
            <el-input v-model="ruleForm.yishenggonghao" 
                placeholder="医生工号" clearable :disabled=" false  ||ro.yishenggonghao"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="医生姓名" prop="yishengxingming">
            <el-input v-model="ruleForm.yishengxingming" 
                placeholder="医生姓名" clearable :disabled=" false  ||ro.yishengxingming"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="照片" v-if="type!='cross' || (type=='cross' && !ro.touxiang)" prop="touxiang">
            <file-upload
            tip="点击上传照片"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
            @change="touxiangUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' class="upload" v-else label="照片" prop="touxiang">
                <img v-if="ruleForm.touxiang.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.touxiang.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.touxiang.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="诊断时间" prop="zhenduanshijian">
              <el-date-picker
				  :disabled=" false  ||ro.zhenduanshijian"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.zhenduanshijian" 
                  type="datetime"
                  placeholder="诊断时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item :style='{"width":"50%","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="治疗方案" prop="zhiliaofangan">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="治疗方案"
              v-model="ruleForm.zhiliaofangan">
            </el-input>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"#769589","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"1px solid #769589","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#769589","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
	  let self = this
      return {
        id: '',
        baseUrl: '',
        ro:{
				yuyuebianhao : false,
				yonghuzhanghao : false,
				yonghuxingming : false,
				zhusu : false,
				jiwangshi : false,
				yaowujinji : false,
				linchuangzhenduan : false,
				zhiliaofangan : false,
				yaopinmingcheng : false,
				yaopinjiage : false,
				yiliaofeiyong : false,
				zongjine : false,
				yishenggonghao : false,
				yishengxingming : false,
				touxiang : false,
				zhenduanshijian : false,
				ispay : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          yuyuebianhao: '',
          yonghuzhanghao: '',
          yonghuxingming: '',
          zhusu: '',
          jiwangshi: '',
          yaowujinji: '',
          linchuangzhenduan: '',
          zhiliaofangan: '',
          yaopinmingcheng: '',
          yaopinjiage: '',
          yiliaofeiyong: '',
          zongjine: '',
          yishenggonghao: '',
          yishengxingming: '',
          touxiang: '',
          zhenduanshijian: '',
          ispay: '',
        },
        yaopinmingchengOptions: [],


        rules: {
          yuyuebianhao: [
          ],
          yonghuzhanghao: [
          ],
          yonghuxingming: [
          ],
          zhusu: [
          ],
          jiwangshi: [
          ],
          yaowujinji: [
          ],
          linchuangzhenduan: [
          ],
          zhiliaofangan: [
          ],
          yaopinmingcheng: [
          ],
          yaopinjiage: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          yiliaofeiyong: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          zongjine: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          yishenggonghao: [
          ],
          yishengxingming: [
          ],
          touxiang: [
          ],
          zhenduanshijian: [
          ],
          ispay: [
          ],
        },
		centerType: false,
      };
    },
    computed: {
		zongjine : {
			get: function () {
				let c = this.ruleForm
				let a = c.yaopinjiage+c.yiliaofeiyong
				this.ruleForm.zongjine = a?Number(a).toFixed(2):0
				return a?Number(a).toFixed(2):0
			}
			
		},



    },
    components: {
    },
    created() {
		if(this.$route.query.centerType){
			this.centerType = true
		}
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
      this.ruleForm.zhenduanshijian = this.getCurDateTime()
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='yuyuebianhao'){
              this.ruleForm.yuyuebianhao = obj[o];
              this.ro.yuyuebianhao = true;
              continue;
            }
            if(o=='yonghuzhanghao'){
              this.ruleForm.yonghuzhanghao = obj[o];
              this.ro.yonghuzhanghao = true;
              continue;
            }
            if(o=='yonghuxingming'){
              this.ruleForm.yonghuxingming = obj[o];
              this.ro.yonghuxingming = true;
              continue;
            }
            if(o=='zhusu'){
              this.ruleForm.zhusu = obj[o];
              this.ro.zhusu = true;
              continue;
            }
            if(o=='jiwangshi'){
              this.ruleForm.jiwangshi = obj[o];
              this.ro.jiwangshi = true;
              continue;
            }
            if(o=='yaowujinji'){
              this.ruleForm.yaowujinji = obj[o];
              this.ro.yaowujinji = true;
              continue;
            }
            if(o=='linchuangzhenduan'){
              this.ruleForm.linchuangzhenduan = obj[o];
              this.ro.linchuangzhenduan = true;
              continue;
            }
            if(o=='zhiliaofangan'){
              this.ruleForm.zhiliaofangan = obj[o];
              this.ro.zhiliaofangan = true;
              continue;
            }
            if(o=='yaopinmingcheng'){
              this.ruleForm.yaopinmingcheng = obj[o];
              this.ro.yaopinmingcheng = true;
              continue;
            }
            if(o=='yaopinjiage'){
              this.ruleForm.yaopinjiage = obj[o];
              this.ro.yaopinjiage = true;
              continue;
            }
            if(o=='yiliaofeiyong'){
              this.ruleForm.yiliaofeiyong = obj[o];
              this.ro.yiliaofeiyong = true;
              continue;
            }
            if(o=='zongjine'){
              this.ruleForm.zongjine = obj[o];
              this.ro.zongjine = true;
              continue;
            }
            if(o=='yishenggonghao'){
              this.ruleForm.yishenggonghao = obj[o];
              this.ro.yishenggonghao = true;
              continue;
            }
            if(o=='yishengxingming'){
              this.ruleForm.yishengxingming = obj[o];
              this.ro.yishengxingming = true;
              continue;
            }
            if(o=='touxiang'){
              this.ruleForm.touxiang = obj[o].split(",")[0];
              this.ro.touxiang = true;
              continue;
            }
            if(o=='zhenduanshijian'){
              this.ruleForm.zhenduanshijian = obj[o];
              this.ro.zhenduanshijian = true;
              continue;
            }
          }
        }else if(type=='edit'){
			this.info()
		}
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/yaopinxinxi/yaopinmingcheng', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.yaopinmingchengOptions = res.data.data;
          }
        });

		if (localStorage.getItem('raffleType') && localStorage.getItem('raffleType') != null) {
			localStorage.removeItem('raffleType')
			setTimeout(() => {
				this.onSubmit()
			}, 300)
		}
      },
      // 下二随
      yaopinmingchengChange () {
        this.$http.get('follow/yaopinxinxi/yaopinmingcheng?columnValue=' + this.ruleForm.yaopinmingcheng, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            if(res.data.data.yaopinjiage){
              this.ruleForm.yaopinjiage = res.data.data.yaopinjiage
            }
          }
        });
      },

    // 多级联动参数
      // 多级联动参数
      info() {
        this.$http.get(`menzhenbingli/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

			if(this.ruleForm.zongjine==0){
				this.$message.error('总金额不能为空')
				return false
			}
			//更新跨表属性
			var crossuserid;
			var crossrefid;
			var crossoptnum;
			this.$refs["ruleForm"].validate(valid => {
				if(valid) {
					if(this.type=='cross'){
						var statusColumnName = localStorage.getItem('statusColumnName');
						var statusColumnValue = localStorage.getItem('statusColumnValue');
						if(statusColumnName && statusColumnName!='') {
							var obj = JSON.parse(localStorage.getItem('crossObj'));
							if(!statusColumnName.startsWith("[")) {
								for (var o in obj){
									if(o==statusColumnName){
										obj[o] = statusColumnValue;
									}
								}
								var table = localStorage.getItem('crossTable');
								this.$http.post(table+'/update', obj).then(res => {});
							} else {
								crossuserid=Number(localStorage.getItem('frontUserid'));
								crossrefid=obj['id'];
								crossoptnum=localStorage.getItem('statusColumnName');
								crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
							}
						}
					}
					if(crossrefid && crossuserid) {
						this.ruleForm.crossuserid=crossuserid;
						this.ruleForm.crossrefid=crossrefid;
						var params = {
							page: 1,
							limit: 10,
							crossuserid:crossuserid,
							crossrefid:crossrefid,
						}
						this.$http.get('menzhenbingli/list', {
							params: params
						}).then(res => {
							if(res.data.data.total>=crossoptnum) {
								this.$message({
									message: localStorage.getItem('tips'),
									type: 'error',
									duration: 1500,
								});
								return false;
							} else {
								// 跨表计算


								this.$http.post(`menzhenbingli/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
									if (res.data.code == 0) {
										this.$message({
											message: '操作成功',
											type: 'success',
											duration: 1500,
											onClose: () => {
												this.$router.go(-1);
											}
										});
									} else {
										this.$message({
											message: res.data.msg,
											type: 'error',
											duration: 1500
										});
									}
								});
							}
						});
					} else {


						this.$http.post(`menzhenbingli/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
							if (res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										this.$router.go(-1);
									}
								});
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error',
									duration: 1500
								});
							}
						});
					}
				}
			});
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
		// 返回
		back() {
			this.$router.go(-1);
		},
      touxiangUploadChange(fileUrls) {
          this.ruleForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 80px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 80px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 0;
	  border-radius: 4px;
	  padding: 0 12px;
	  outline: none;
	  color: #000;
	  background: #F6F6F6;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
	  border: 0;
	  border-radius: 4px;
	  padding: 0 12px;
	  outline: none;
	  color: #000;
	  background: #F6F6F6;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border: 0;
	  border-radius: 4px;
	  padding: 0 10px;
	  outline: none;
	  color: #000;
	  background: #F6F6F6;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 0;
	  border-radius: 4px;
	  padding: 0 10px 0 30px;
	  outline: none;
	  color: #000;
	  background: #F6F6F6;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  border: 1px dashed #666;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #000;
	  background: #F6F6F6;
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  border: 1px dashed #666;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #000;
	  background: #F6F6F6;
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  border: 1px dashed #666;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #000;
	  background: #F6F6F6;
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 0;
	  border-radius: 4px;
	  padding: 12px;
	  outline: none;
	  color: #000;
	  background: #F6F6F6;
	  width: 400px;
	  font-size: 14px;
	  min-height: 120px;
	  height: auto;
	}
</style>
