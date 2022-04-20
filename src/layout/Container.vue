<template>
  <div class="flex max-w-full h-screen">
    <div class="h-screen bottom-0 bg-slate-600 w-1/5">
      <sidebar></sidebar>
    </div>
    <main class="h-screen bg-slate-100 w-4/5">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import "material-icons/iconfont/material-icons.css";
import Table from "../components/Table.vue";
export default {
  name: "Container",
  components: { Sidebar, Table },
};
</script>
