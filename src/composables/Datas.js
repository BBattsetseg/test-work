import  BaseUrl  from '../api/testApi';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useData(){
    const data= ref([])
    const usersdata=ref([])
    const user= ref([])
    const router = useRouter()
    const EntireUserList = ref([])

    const getAllData = async (params) => {
        let response = await BaseUrl.get('product',{params:params})
        data.value = response.data;
        usersdata.value=response.data.data
       
    }
    
    
    const getPageData = async(params)=>{
        let response = await BaseUrl.get('product',{params:params})
        return response.data.data
    }
    
    //Get all user's data from Paginated Api with recursion     
    
    const getEntireUserList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
          EntireUserList.value= EntireUserList.value.concat(res)
          res.concat(await getEntireUserList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }

    const getUser = async (id) => {
        let response = await BaseUrl.get(`product/${id}`)
        user.value = response.data.data;
    }
    
    const storeUser = async (data) => {
          await BaseUrl.post(`product`,data)
          await router.push({name: 'home.index'})
          
    }

    const updateUser = async (id) => {
          await BaseUrl.put(`product/${id}` , user.value)
          await router.push({name:'home.index'})
        }
    
    const deleteUser = async (id) => {
        let confirm=window.confirm('Want to delete this user ?')
        if(confirm) { 
            await BaseUrl.delete(`product/${id}`)
            alert('Please open Network log before deleting to check the API response')
        }
   }
    
      return {
            data,
            user,
            usersdata,
            EntireUserList,
            getAllData,
            getUser,
            deleteUser,
            updateUser,
            storeUser,
            getEntireUserList
      }
 }
