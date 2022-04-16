<script>
import axios from "axios";
import RegisterModal from "../components/RegisterModal.vue";
import BaseUrl from "../api/testApi"

export default {
  components: {RegisterModal} ,
  setup() {
},
  name: "data1",
  data() {
    return {
      datas: [],
    };
  },

  async created() {
    try {
      const res = await axios.get(`http://localhost:3001/data1`);
      this.datas = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    handler(event) {
      if (event) {
       this.$router.push('/create')
      }
    },

    async deleteModal(id){
       let confirm=window.confirm('Want to delete this user ?')
        if(confirm) { 
          try {
            const res =  await BaseUrl.delete(`data1/${id}`)
            alert("Амжилттай устсан тул browser-оо refresh хийнэ үү")
             this.$router.push('/')
          }  catch(e){
            console.error(e);
          }
          
        }
    }
  },
};
</script>
<template>
  <div class="m-10" >
    <div class="flex justify-between mb-4">
      <h4 class="text-xl">Төхөөрөмжийн жагсаалт-1</h4>
      <button @click="handler" class="bg-green-700 p-2 rounded-md text-white">
        Бүртгэх
      </button>
    </div>
    <div>
      <div
        class="flex justify-between mb-2 border-t border-slate-200 border-solid"
      >
        <p>Нийт {{datas.length}}</p>
        <p>Xуудас 1/1> Мөрийн тоо: {{datas.length}}</p>
      </div>
      <table
        class="table-fixed w-full border-slate-200 table table-striped table-bordered"
      >
        <thead>
          <tr class="border-2 border-slate-200 border-solid">
            <th class="w-24"></th>
            <th>Сериал дугаар</th>
            <th>Нэр</th>
            <th>Тайлбар</th>
            <th>Бүртгэгдсэн огноо</th>
          </tr>
        </thead>
        <tbody class="divide-y-2 divide-slate-200 divide-solid">
          <tr>
            <td class="w-24"></td>
            <td class="px-2"><input class="w-full" /></td>
            <td class="px-2"><input class="w-full" /></td>
            <td class="px-2"><input class="w-full" /></td>
            <td class="px-2"></td>
          </tr>
        </tbody>
        <tbody class="divide-y-2 divide-slate-200 divide-solid">
          <tr v-for="item in datas" :key="item.id">
            <td class="w-24 pl-8" @click="deleteModal(item.id)">
              <img class="w-5 h-5" src="../delete.webp" alt="" />
            </td>
            <td>{{ item.serialNum }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.detail }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
