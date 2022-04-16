<script>
import axios from "axios";

export default {
  name: "data2",
  data() {
    return {
      datas: [],
    };
  },

  async created() {
    try {
      const res = await axios.get(`http://localhost:3001/data2`);
      this.datas = res.data;
    } catch (e) {
      console.error(e);
    }
  },
  
  methods: {
    handler(event) {
      alert(`Hello ${this.name}!`);
      if (event) {
        alert(event.target.tagName);
      }
    },
  },
};
</script>

<template>
  <div class="m-10">
    <div class="flex justify-between mb-4">
      <h4>Төхөөрөмжийн жагсаалт 2</h4>
      <button @click="handler" class="bg-green-700 p-2 rounded-md text-white">
        Бүртгэх
      </button>
    </div>
    <div>
      <div
        class="flex justify-between mb-2 border-t border-slate-200 border-solid"
      >
        <p>Нийт 11</p>
        <p>Xуудас 1/1> Мөрийн тоо: 11</p>
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
            <td class="w-24 pl-8">
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
