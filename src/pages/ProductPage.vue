<template>
  <TableTest :products="products" :dataName="dataName">
    <template #producttitle>
      <h4 class="text-xl">Бүтээгдэхүүний жагсаалт</h4></template
    >
  </TableTest>
</template>

<script>
import axios from "axios";
import TableTest from "../components/TableTest.vue";
import { onMounted, reactive, ref, computed } from "vue";
import BaseUrl from "../api/testApi";
export default {
  name: "ProductPage",
  components: { TableTest },
  props: {
    products: {
      type: Object,
    },
    dataName: {
      type: String,
    },
  },

  setup() {
    const products = reactive([]);
    const dataName = "productdatas";

    onMounted(async () => {
      try {
        const res = await BaseUrl.get(`${dataName}`);
        res.data.forEach((doc) => {
          products.push(doc);
        });
      } catch (e) {
        console.log("Error Loading Mount");
      }
    });
    return {
      products,
      dataName,
    };
  },

  methods: {},
};
</script>
