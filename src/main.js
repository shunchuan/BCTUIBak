import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import axios from 'axios';
import Cookies from 'js-cookie';
import common from './libs/common';
Vue.prototype.$ajax = axios;
// import VueAxios from 'vue-axios';

Vue.use(axios);
Vue.use(VueI18n);
Vue.use(iView);

let LoadRouters = Cookies.getJSON('LoadRouters');
let routes = null;
console.log('main.js记录loadRouters');
console.dir(LoadRouters);
if (LoadRouters) {
    // 这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
    routes = common.routerFormat(LoadRouters);
    router.addRoutes(routes);
    store.commit('setRouter', routes);
}

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        util.checkUpdate(this);
    },
    created() {
        let tagsList = [];
        if (routes) {
            routes.map((item) => {
                if (item.children.length <= 1) {
                    tagsList.push(item.children[0]);
                } else {
                    tagsList.push(...item.children);
                }
            });
        }
        this.$store.commit('setTagsList', tagsList);
        this.$store.commit('setHeaderMenuSelectName', '1');
        // let moduleList = this.$store.state.app.moduleList;
        // let openModuleID = moduleList[0][0].id;
        // this.$store.commit('setOpenModuleID', openModuleID);
    }
});
