<script >
import Table from "../components/Table.vue";
import { useState } from "../composables/state";

export default {
  name: "Home",
  components:  {Table} ,
  setup() {
    const [state, setState] = useState(1);
    return {
      state,
      setState,
    };
  },

  data(){
    return{
      dataa1:"data1",
      dataa2:"data2",
      tableTitle1: "Төхөөрөмжийн жагсаалт-1",
      tableTitle2: "Төхөөрөмжийн жагсаалт-2",
    }
  },
};
</script>

<template>
  <div class="flex max-w-full h-screen">
    <div class="h-screen bg-slate-600 w-1/5">
      <div>
        <div
          class="
            bg-slate-800
            h-14
            text-white
            align-middle
            flex
            justify-center
            items-center
          "
        >
          <div class="flex-shrink-0 w-10 h-10 align-middle mr-4">
            <img class="w-full h-full rounded-full" src="./logo.png" alt="" />
          </div>
          <h4>ГЭРЭГЭ СИСТЕМС ХХК</h4>
        </div>
        <div class="text-white cursor-pointer">
          <div @click="setState(1)" class="m-8 hover:text-slate-800">
            Салбар, төхөөрөмж-1
          </div>
          <div @click="setState(2)" class="m-8 hover:text-slate-800">
            Салбар, төхөөрөмж-2
          </div>
        </div>
      </div>
    </div>
    <div class="h-screen bg-slate-100 w-4/5">
      <template v-if="state == 1">
        <Table :dataName="dataa1" :tableTitle="tableTitle1" key="1"/>
      </template>

      <template v-else>
        <Table :dataName="dataa2" :tableTitle="tableTitle2" key="2"/>
      </template>
    </div>
  </div>
</template>