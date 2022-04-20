import { createRouter, createWebHistory } from "vue-router";
import RegisterModal from '../src/components/RegisterModal.vue';
import ModalEdit from '../src/components/ModalEdit.vue';
import Table from '../src/components/Table.vue'
import Container from './layout/Container.vue'

const routes = [
	{
		path: '/',
		name: 'home',
        component: Container,
        redirect: to => {
            // the function receives the target route as the argument
            // we return a redirect path/location here.
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
                component: RegisterModal,
                props:true,
            },
            {
                path:'/edit/:id',
                name:'modal.edit',
                component:ModalEdit,
                props:true,
            },  
        ]
    },
	
]
export default createRouter({
	history: createWebHistory(),
	routes
})