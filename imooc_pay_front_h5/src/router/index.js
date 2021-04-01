import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index.vue'
import pay from '../pages/pay.vue'
import activity from '../pages/activity.vue'

Vue.use(Router)

const routes = [
	{
		path: '/index',
		name: 'index',
		component: index,
		meta: { title: '首页'}
	},
	{
		path: '/pay',
		name: 'pay',
		component: pay,
		meta: { title: '充值'}
	},
	{
		path: '/activity',
		name: 'activity',
		component: activity,
		meta: { title: '活动'}
	}
]

const router = new Router({
	routes
})

export default router