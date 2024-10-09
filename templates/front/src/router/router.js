import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import yishengList from '../pages/yisheng/list'
import yishengDetail from '../pages/yisheng/detail'
import yishengAdd from '../pages/yisheng/add'
import keshiList from '../pages/keshi/list'
import keshiDetail from '../pages/keshi/detail'
import keshiAdd from '../pages/keshi/add'
import yaopinxinxiList from '../pages/yaopinxinxi/list'
import yaopinxinxiDetail from '../pages/yaopinxinxi/detail'
import yaopinxinxiAdd from '../pages/yaopinxinxi/add'
import jiankangzixunList from '../pages/jiankangzixun/list'
import jiankangzixunDetail from '../pages/jiankangzixun/detail'
import jiankangzixunAdd from '../pages/jiankangzixun/add'
import yishengyuyueList from '../pages/yishengyuyue/list'
import yishengyuyueDetail from '../pages/yishengyuyue/detail'
import yishengyuyueAdd from '../pages/yishengyuyue/add'
import menzhenbingliList from '../pages/menzhenbingli/list'
import menzhenbingliDetail from '../pages/menzhenbingli/detail'
import menzhenbingliAdd from '../pages/menzhenbingli/add'
import jiankangkepuList from '../pages/jiankangkepu/list'
import jiankangkepuDetail from '../pages/jiankangkepu/detail'
import jiankangkepuAdd from '../pages/jiankangkepu/add'
import jiankangshujuList from '../pages/jiankangshuju/list'
import jiankangshujuDetail from '../pages/jiankangshuju/detail'
import jiankangshujuAdd from '../pages/jiankangshuju/add'
import jiankangjianyiList from '../pages/jiankangjianyi/list'
import jiankangjianyiDetail from '../pages/jiankangjianyi/detail'
import jiankangjianyiAdd from '../pages/jiankangjianyi/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import discussjiankangkepuList from '../pages/discussjiankangkepu/list'
import discussjiankangkepuDetail from '../pages/discussjiankangkepu/detail'
import discussjiankangkepuAdd from '../pages/discussjiankangkepu/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'yisheng',
					component: yishengList
				},
				{
					path: 'yishengDetail',
					component: yishengDetail
				},
				{
					path: 'yishengAdd',
					component: yishengAdd
				},
				{
					path: 'keshi',
					component: keshiList
				},
				{
					path: 'keshiDetail',
					component: keshiDetail
				},
				{
					path: 'keshiAdd',
					component: keshiAdd
				},
				{
					path: 'yaopinxinxi',
					component: yaopinxinxiList
				},
				{
					path: 'yaopinxinxiDetail',
					component: yaopinxinxiDetail
				},
				{
					path: 'yaopinxinxiAdd',
					component: yaopinxinxiAdd
				},
				{
					path: 'jiankangzixun',
					component: jiankangzixunList
				},
				{
					path: 'jiankangzixunDetail',
					component: jiankangzixunDetail
				},
				{
					path: 'jiankangzixunAdd',
					component: jiankangzixunAdd
				},
				{
					path: 'yishengyuyue',
					component: yishengyuyueList
				},
				{
					path: 'yishengyuyueDetail',
					component: yishengyuyueDetail
				},
				{
					path: 'yishengyuyueAdd',
					component: yishengyuyueAdd
				},
				{
					path: 'menzhenbingli',
					component: menzhenbingliList
				},
				{
					path: 'menzhenbingliDetail',
					component: menzhenbingliDetail
				},
				{
					path: 'menzhenbingliAdd',
					component: menzhenbingliAdd
				},
				{
					path: 'jiankangkepu',
					component: jiankangkepuList
				},
				{
					path: 'jiankangkepuDetail',
					component: jiankangkepuDetail
				},
				{
					path: 'jiankangkepuAdd',
					component: jiankangkepuAdd
				},
				{
					path: 'jiankangshuju',
					component: jiankangshujuList
				},
				{
					path: 'jiankangshujuDetail',
					component: jiankangshujuDetail
				},
				{
					path: 'jiankangshujuAdd',
					component: jiankangshujuAdd
				},
				{
					path: 'jiankangjianyi',
					component: jiankangjianyiList
				},
				{
					path: 'jiankangjianyiDetail',
					component: jiankangjianyiDetail
				},
				{
					path: 'jiankangjianyiAdd',
					component: jiankangjianyiAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'discussjiankangkepu',
					component: discussjiankangkepuList
				},
				{
					path: 'discussjiankangkepuDetail',
					component: discussjiankangkepuDetail
				},
				{
					path: 'discussjiankangkepuAdd',
					component: discussjiankangkepuAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
