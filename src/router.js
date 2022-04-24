import { createRouter, createWebHistory } from "vue-router";
import ProductPage from "./pages/ProductPage.vue";
import UserPage from "./pages/UserPage.vue";
import Container from "./layout/Container.vue"

const routes = [
	{
		path: '/',
		name: 'home',
        component: Container,
        redirect: to => {       
            return { path: '/userPage'}
          },
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
                   
        ]
    },
	
]
export default createRouter({
	history: createWebHistory(),
	routes
})