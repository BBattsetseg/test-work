import { createRouter, createWebHistory } from "vue-router";
import Home from '../src/pages/Home.vue';
import RegisterModal from '../src/components/RegisterModal.vue'
import ModalEdit from '../src/components/EditModal.vue'

const routes = [
	{
		path: '/',
		name: 'home.index',
        component: Home,
    },
    {
        path:'/create',
        name:'modal.create',
        component: RegisterModal
    },
    {
        path:'/edit/:id',
        name:'modal.edit',
        component:ModalEdit,
        props:true

    },
  
]
export default createRouter({
	history: createWebHistory(),
	routes
})