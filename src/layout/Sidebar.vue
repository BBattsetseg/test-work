<template>
  <div>
    <div
      class="bg-slate-800 h-14 text-white align-middle flex justify-center items-center"
    >
      <div class="flex-shrink-0 w-10 h-10 align-middle mr-4">
        <img
          class="w-full h-full rounded-full"
          :src="'../../public/logo.png'"
          alt=""
        />
      </div>
      <h4>ГЭРЭГЭ СИСТЕМС ХХК</h4>
    </div>
    <div class="text-white cursor-pointer">
      <div class="m-8 hover:text-slate-800">
        <router-link
          :to="{
            path: '/userPage',
          }"
          >Хэрэглэгчид
        </router-link>
      </div>
      <div class="m-8 hover:text-slate-800">
        <router-link
          :to="{
            path: '/productPage',
          }"
          >Бүтээгдэхүүнүүд
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>
