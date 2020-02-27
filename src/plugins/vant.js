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

// 联系人
import { ContactCard, ContactList, ContactEdit } from 'vant';
Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);

// 地址列表
import { AddressList } from 'vant';
Vue.use(AddressList);

// 编辑地址
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

// 单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);

// 提交订单
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);

// 宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid);
Vue.use(GridItem);