import { otherRouter } from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';
import api from '../../libs/axios/api';
// import routerLoader from '../../router/routerloader';
import util from '../../libs/util';


const app = {
    state: {
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openModuleID: '', // 选择的模块ID
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'light', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
        moduleList: [{
            id: '1',
            name: '文档'
        },
        {
            id: '2',
            name: '组织管理'
        },
        {
            id: '3',
            name: '统计分析',
            children: [
                {
                    id: '3-1',
                    name: '统计分析'
                },
                {
                    id: '3-2',
                    name: '活动分析'
                },
                {
                    id: '3-3',
                    name: '时段分析'
                }
            ]
        },
        {
            id: '4',
            name: '综合设置'
        }
        ],
        menuList: [],
        routers: [
            otherRouter
            // ,
            // ...appRouter
        ],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
        buttonGroupRowHeight: 0, // 页面中按钮组的高度，隐藏时为0
        nowHeaderMenuSelectName: '1', // 当前选择的模块
        strLoadRouters:null
    },
    mutations: {
        setOpenModuleID(state, payload) {
            state.openModuleID = payload;
        },
        setTagsList(state, list) {
            state.tagsList.push(...list);
        },
        async updateMenulist(state) {
            // let accessCode = parseInt(Cookies.get('access')); 
                      
            let url = '';
            if (state.nowHeaderMenuSelectName === '1') {
                url = '../src/libs/json/menulist.json';
            } else if (state.nowHeaderMenuSelectName === '2') {
                url = '../src/libs/json/menulist1.json';
            }
            let res = await api.getJsonApi(url);
            state.menuList = res.data;

            // routerLoader.setRouters();  
            url = "../src/libs/json/router.json"
            res = await api.getJsonApi(url)
            let rout = res.data;  
            let routers=util.routerFormat(rout);  
            // debugger    
            state.loadRouter=routers;
            // this.$router.addRoutes(routers);
        },
        changeMenuTheme(state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme(state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu(state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage(state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage(state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag(state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList(state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags(state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags(state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList(state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        setCurrentPath(state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName(state, name) {
            state.currentPageName = name;
        },
        setAvator(state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang(state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu(state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount(state, count) {
            state.messageCount = count;
        },
        increateTag(state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setButtonGroupRowHeight(state, rowHeight) {
            state.buttonGroupRowHeight = rowHeight;
        },
        setHeaderMenuSelectName(state, menuName) {
            state.nowHeaderMenuSelectName = menuName;
        },
        setLoadRouters(state, payload) {
            state.strLoadRouters = payload;
            Cookies.set('LoadRouters', state.strLoadRouters);
        },
        setRouter(state,payload){
            state.routers=[otherRouter,...payload];
        }
    }
};

export default app;
