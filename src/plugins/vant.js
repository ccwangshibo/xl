import Vue from 'vue';

// tabbar底部导航
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);

// loading加载
import{Loading} from 'vant';
Vue.use(Loading);

// 消息提示
import{Toast} from 'vant';
Vue.use(Toast);

// 弹出框
import {Dialog} from 'vant';
Vue.use(Dialog);

// NavBar
import { NavBar } from 'vant';
Vue.use(NavBar);

// 添加地址
import { ContactCard, ContactList, ContactEdit } from 'vant';
Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);

//地址列表
import { AddressList } from 'vant';
Vue.use(AddressList);