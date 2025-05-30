import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import news from '@/views/modules/news/list'
    import yishengyuyue from '@/views/modules/yishengyuyue/list'
    import menzhenbingli from '@/views/modules/menzhenbingli/list'
    import jiankangshuju from '@/views/modules/jiankangshuju/list'
    import keshi from '@/views/modules/keshi/list'
    import yaopinxinxi from '@/views/modules/yaopinxinxi/list'
    import jiankangjianyi from '@/views/modules/jiankangjianyi/list'
    import yonghu from '@/views/modules/yonghu/list'
    import yisheng from '@/views/modules/yisheng/list'
    import config from '@/views/modules/config/list'
    import jiankangzixun from '@/views/modules/jiankangzixun/list'
    import discussjiankangkepu from '@/views/modules/discussjiankangkepu/list'
    import jiankangkepu from '@/views/modules/jiankangkepu/list'
    import newstype from '@/views/modules/newstype/list'


//2.配置路由   注意：名字
export const routes = [{
    path: '/',
    name: '系统首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '系统首页',
      component: Home,
      meta: {icon:'', title:'center', affix: true}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/news',
        name: '健康资讯',
        component: news
      }
      ,{
	path: '/yishengyuyue',
        name: '医生预约',
        component: yishengyuyue
      }
      ,{
	path: '/menzhenbingli',
        name: '门诊病历',
        component: menzhenbingli
      }
      ,{
	path: '/jiankangshuju',
        name: '健康数据',
        component: jiankangshuju
      }
      ,{
	path: '/keshi',
        name: '科室',
        component: keshi
      }
      ,{
	path: '/yaopinxinxi',
        name: '药品信息',
        component: yaopinxinxi
      }
      ,{
	path: '/jiankangjianyi',
        name: '健康建议',
        component: jiankangjianyi
      }
      ,{
	path: '/yonghu',
        name: '用户',
        component: yonghu
      }
      ,{
	path: '/yisheng',
        name: '医生',
        component: yisheng
      }
      ,{
	path: '/config',
        name: '轮播图管理',
        component: config
      }
      ,{
	path: '/jiankangzixun',
        name: '健康咨询',
        component: jiankangzixun
      }
      ,{
	path: '/discussjiankangkepu',
        name: '健康科普评论',
        component: discussjiankangkepu
      }
      ,{
	path: '/jiankangkepu',
        name: '健康科普',
        component: jiankangkepu
      }
      ,{
	path: '/newstype',
        name: '健康资讯分类',
        component: newstype
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
