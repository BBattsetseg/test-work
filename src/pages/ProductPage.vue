<template>
  <div class="m-10">
    <div class="flex justify-between mb-4">
      <h4 class="text-xl">Бүтээгдэхүүний жагсаалт</h4>
      <button
        @click="openModal()"
        class="bg-green-700 p-2 rounded-md text-white"
      >
        Бүртгэх
      </button>
    </div>
    <Table>
      <template #tableheader>
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
        </div>
      </template>
      <template #tablemain>
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
              <td
                class="w-16 pl-8 cursor-pointer"
                @click="deleteModal(item.id)"
              >
                <span class="material-icons hover:text-blue-600"> delete </span>
              </td>
              <td class="w-16 pl-8 cursor-pointer" @click="editBtn(item.id)">
                <span class="material-icons hover:text-blue-600"> edit </span>
              </td>
              <td>{{ item.serialNum }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.detail }}</td>
              <td>{{ item.date }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </Table>
  </div>
  <Modal
    v-if="state"
    @close="close"
    @edited="edited"
    @create="create"
    :isEditing="isEditing"
  >
    <template v-slot="modalheader"> </template>
    <template #modalbody>
      <input
        required=""
        placeholder="Сериал дугаар оруулах pd12473xxxxxx"
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 my-2"
        type="text"
        v-model="serialNum"
      />

      <input
        required=""
        placeholder="Нэр бөглөх Жишээ: Gerege systems"
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 my-2"
        type="text"
        v-model="name"
      />

      <textarea
        required=""
        name="message"
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 my-2"
        placeholder="Тайлбар оруулах"
        v-model="detail"
      ></textarea>

      <input
        required=""
        placeholder="Огноо сонгоно уу"
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 my-2"
        type="date"
        v-model="date"
      />
    </template>
    <template #modalfooter> </template>
  </Modal>
</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref, computed } from "vue";
import BaseUrl from "../api/testApi";
import { useRoute } from "vue-router";
import Table from "../components/Table.vue";
import Modal from "../components/Modal.vue";
import { useState } from "../composables/state.js";

export default {
  name: "ProductPage",
  components: { Table, Modal },
  props: {
    products: {
      type: Object,
    },
    isEditing: {
      type: Boolean,
    },
  },

  setup() {
    const isEditing = false;
    const products = reactive([]);
    const searchQuery = ref("");
    const [state, setState] = useState(false);
    let currentPage = ref(1);
    let CountPerEachPage = 8;
    let pagedDatas = reactive([]);
    const route = useRoute();
    const dataName = "productdatas";
    //modaldata
    const id = Math.floor(Math.random(10) * 1000);
    const serialNum = "";
    const name = "";
    const detail = "";
    const date = "";

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
      state,
      setState,
      id,
      serialNum,
      name,
      detail,
      date,
      isEditing,
    };
  },

  methods: {
    openModal() {
      this.setState(true);
      this.isEditing = false;
    },

    close() {
      this.setState(false);
      this.isEditing = false;
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

    async editBtn(id) {
      this.isEditing = true;
      const res = await BaseUrl.get(`${this.dataName}/${id}`);
      let editdatas = res.data;
      (this.serialNum = editdatas.serialNum),
        (this.id = editdatas.id),
        (this.serialNum = editdatas.serialNum),
        (this.name = editdatas.name),
        (this.detail = editdatas.detail),
        (this.date = editdatas.date),
        (this.dataName = this.dataName),
        this.setState(true);
    },

    async edited() {
      alert("edited");
      try {
        let payload = {
          id: this.id,
          serialNum: this.serialNum,
          name: this.name,
          detail: this.detail,
          date: this.date,
        };
        let res = await axios.put(
          `http://localhost:3001/${this.dataName}/${this.id}`,
          payload
        );

        this.setState(false);
      } catch (e) {
        console.error(e);
      }
    },

    async create() {
      alert("created");
      try {
        let payload = {
          id: Math.floor(Math.random(10) * 1000),
          serialNum: this.serialNum,
          name: this.name,
          detail: this.detail,
          date: this.date,
        };
        let res = await axios.post(
          `http://localhost:3001/${this.dataName}`,
          payload
        );
      } catch (e) {
        console.error(e);
      }
      this.setState(false);
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
