import { createRouter, createWebHistory } from "vue-router";
import Modal from "./components/Modal.vue";
import ProductPage from "./pages/ProductPage.vue";
import UserPage from "./pages/UserPage.vue";
import Container from "./layout/Container.vue"

const routes = [
	{
		path: '/',
		name: 'home',
        component: Container,
        // redirect: to => {       
        //     return { path: '/table/data1'}
        //   },
        children :[
            {
                path: '/productPage',
                name: 'ProductPage',
                component: ProductPage,
                props:true,
            },
            {
                path:'/userPage',
                name:'UserPage',
                component: UserPage,
                props:true,
            },   
            // {
            //     path:'/create',
            //     name:'modal.create',
            //     component: Modal,
            //     props:true,
            // },
            // {
            //     path:'/edit/:id',
            //     name:'modal.edit',
            //     component:Modal,
            //     props:true,
            // },            
        ]
    },
	
]
export default createRouter({
	history: createWebHistory(),
	routes
})