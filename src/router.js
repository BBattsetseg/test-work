import { createRouter, createWebHistory } from "vue-router";
import Modal from '../src/components/Modal.vue';
import Table from '../src/components/Table.vue'
import Container from './layout/Container.vue'

const routes = [
	{
		path: '/',
		name: 'home',
        component: Container,
        redirect: to => {       
            return { path: '/table/data1'}
          },
        children :[
            {
                path: '/table/:id',
                name: 'table',
                component: Table,
                props:true,
            },
            {
                path:'/create',
                name:'modal.create',
                component: Modal,
                props:true,
            },
            {
                path:'/edit/:id',
                name:'modal.edit',
                component:Modal,
                props:true,
            },  
        ]
    },
	
]
export default createRouter({
	history: createWebHistory(),
	routes
})