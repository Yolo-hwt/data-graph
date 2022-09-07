// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import Knowledge from '../components/Knowledge/Knowledge'
import HistoryWords from '../components/HistoryWords/HistoryWords'
import RedPlace from '../components/RedPlace/RedPlace'
import PeopleList from '../components/PeopleList/PeopleList'

//创建并暴露一个路由器
export default new VueRouter({
    routes: [{
            path: '/Knowledge',
            component: Knowledge
        },
        {
            path: '/HistoryWords',
            component: HistoryWords
        },
        {
            path: '/RedPlace',
            component: RedPlace
        },
        {
            path: '/PeopleList',
            component: PeopleList
        }
    ]
})