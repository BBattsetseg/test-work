<script>
import axios from "axios";
import { onMounted, reactive, ref, computed } from "vue";
import BaseUrl from "../api/testApi";
import { useRoute } from "vue-router";
export default {
  name: "Table",
  setup() {
    const products = reactive([]);
    const searchQuery = ref("");
    let currentPage = ref(1);
    let CountPerEachPage = 8;
    let pagedDatas = reactive([]);
    const route = useRoute();
    const dataName = route.params.id;
    const title = route.query.title;

    const searchedProducts = computed(() => {
      return products.filter((product) => {
        return (
          product.serialNum
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });

    const numberOfPages = () => {
      return Math.ceil(products.length / CountPerEachPage);
    };

    onMounted(async () => {
      try {
        const res = await axios.get(`http://localhost:3001/${dataName}`);
        res.data.forEach((doc) => {
          products.push(doc);
        });
      } catch (e) {
        console.log("Error Loading Mount");
      }
    });

    return {
      searchedProducts,
      numberOfPages,
      searchQuery,
      products,
      dataName,
      currentPage,
      CountPerEachPage,
      pagedDatas,
      title,
    };
  },

  methods: {
    //Create Modal
    createModal(event) {
      if (event) {
        this.$router.push({
          path: `/create`,
          query: {
            dataName: this.dataName,
          },
        });
      }
    },

    async deleteModal(id) {
      let confirm = window.confirm("Want to delete this user ?");
      if (confirm) {
        try {
          const res = await BaseUrl.delete(`${this.dataName}/${id}`);
          alert("Амжилттай устсан тул browser-оо refresh хийнэ үү");
          this.$router.push("/");
        } catch (e) {
          console.error(e);
        }
      }
    },

    //Edit Modal
    async edit(id) {
      try {
        const res = await BaseUrl.get(`${this.dataName}/${id}`);
        alert("edit modal");
        let editdatas = res.data;
        this.$router.push({
          path: `/edit/${id}`,
          query: {
            serialNum: editdatas.serialNum,
            id: editdatas.id,
            serialNum: editdatas.serialNum,
            name: editdatas.name,
            detail: editdatas.detail,
            date: editdatas.date,
            dataName: this.dataName,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    //Pagination

    ////function for go to previous page
    getPreviousPage() {
      try {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.validateEachPage(this.currentPage);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //function for go to next page
    getNextPage() {
      try {
        if (this.currentPage < this.numberOfPages()) {
          this.currentPage++;
          this.validateEachPage(this.currentPage);
        }
      } catch (e) {
        console.log(e);
      }
    },

    validateEachPage(paginationPage) {
      //validating pages based on page count
      if (paginationPage < 1) paginationPage = 1;
      if (paginationPage > this.numberOfPages())
        paginationPage = this.numberOfPages();
      this.pagedDatas = [];

      for (
        var i = (paginationPage - 1) * this.CountPerEachPage;
        i < paginationPage * this.CountPerEachPage;
        i++
      ) {
        if (this.products[i] !== undefined) {
          const dataobj = [this.products[i]];
          dataobj.forEach((data) => this.pagedDatas.push(data));
        }
      }
    },
  },
};
</script>
<template>
  <div class="m-10">
    <div class="flex justify-between mb-4">
      <h4 class="text-xl">{{ this.title }}</h4>
      <button
        @click="createModal"
        class="bg-green-700 p-2 rounded-md text-white"
      >
        Бүртгэх
      </button>
    </div>
    <div>
      <div
        class="flex justify-between mb-2 border-t border-slate-200 border-solid"
      >
        <p>Нийт {{ this.products.length }}</p>
        <div class="items-center justify-between">
          <div class="flex items-center space-x-5">
            <a
              @click="getPreviousPage"
              class="flex items-center px-2 py-2 text-gray-800 cursor-pointer rounded-md"
            >
              <span
                class="transition duration-200 ease-in-out material-icons text-base"
              >
                arrow_back_ios
              </span>
            </a>
            <p>Хуудас</p>
            <a
              class="transition duration-500 ease-in-out border-t-2 hover:border-blue-300 py-2 mr-4 text-gray-700 cursor-pointer"
            >
              {{ currentPage }}
            </a>
            <p>/</p>
            <a
              class="transition duration-500 ease-in-out border-t-2 hover:border-blue-300 py-2 text-gray-700 cursor-pointer"
            >
              {{ this.numberOfPages() }}
            </a>

            <a
              @click="getNextPage"
              class="px-2 py-2 font-bold cursor-pointer rounded-3xl"
            >
              <span
                class="transition duration-200 ease-in-out material-icons text-base font-bold"
              >
                arrow_forward_ios
              </span>
            </a>
            <p class="font-bold px-2 py-2 text-gray-700">
              Мөрийн тоо: {{ searchedProducts.length }}
            </p>
          </div>
        </div>
        <!-- //////////////////////////////////// -->
      </div>
      <table
        class="table-fixed w-full border-slate-200 table table-striped table-bordered"
      >
        <thead>
          <tr class="border-2 border-slate-200 border-solid">
            <th class="w-16"></th>
            <th class="w-16"></th>
            <th>Сериал дугаар</th>
            <th>Нэр</th>
            <th>Тайлбар</th>
            <th>Бүртгэгдсэн огноо</th>
          </tr>
        </thead>
        <tbody class="divide-y-2 divide-slate-200 divide-solid">
          <tr>
            <td class="w-16"></td>
            <td class="w-16"></td>
            <td class="px-2">
              <input
                class="w-full"
                v-model="searchQuery"
                placeholder=" Search ..."
              />
            </td>
            <td class="px-2"><input class="w-full" /></td>
            <td class="px-2"><input class="w-full" /></td>
            <td class="px-2"></td>
          </tr>
        </tbody>

        <tbody class="divide-y-2 divide-slate-200 divide-solid">
          <tr
            v-for="item in this.searchQuery
              ? searchedProducts
              : this.pagedDatas"
            :key="item.id"
          >
            <td class="w-16 pl-8 cursor-pointer" @click="deleteModal(item.id)">
              <span class="material-icons hover:text-blue-600"> delete </span>
            </td>
            <td class="w-16 pl-8 cursor-pointer" @click="edit(item.id)">
              <span class="material-icons hover:text-blue-600"> edit </span>
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

<style lang="css">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
</style>
