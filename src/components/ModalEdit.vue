<script>
import axios from "axios";

export default {
  name: "ModalEdit",
  setup() {},
  data() {
    let edatas = {
      id: this.$route.query.id,
      serialNum: this.$route.query.serialNum,
      name: this.$route.query.name,
      detail: this.$route.query.detail,
      date: this.$route.query.date, 
    }
   return {
      id: edatas.id,
      serialNum: edatas.serialNum,
      name: edatas.name,
      detail: edatas.detail,
      date: edatas.date,    
    };
  },

  methods: {
    closeModal() {
      return this.$router.push("/");
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

        let res = await axios.put(`http://localhost:3001/data1/${this.id}`, payload);
        let data = res.data;
        console.log(data);
      } catch (e) {
        console.error(e);
      }
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div class="w-full h-screen bg-current flex justify-center items-center">
    <div
      class="w-1/3 h-1/2 bg-white justify-center items-center flex flex-col p-4"
    >
      <p class="text-3xl">Засварлах</p>

      <input
        required=""
        placeholder="Сериал дугаар оруулах pd12473xxxxxx"
        class="
          appearance-none
          block
          w-full
          bg-grey-lighter
          text-grey-darker
          border border-grey-lighter
          rounded-lg
          h-10
          px-4
          my-2
        "
        type="text"
        v-model="serialNum"
      />

      <input
        required=""
        placeholder="Нэр бөглөх Жишээ: Gerege systems"
        class="
          appearance-none
          block
          w-full
          bg-grey-lighter
          text-grey-darker
          border border-grey-lighter
          rounded-lg
          h-10
          px-4
          my-2
        "
        type="text"
        v-model="name"
      />

      <textarea
        required=""
        name="message"
        id=""
        class="
          appearance-none
          block
          w-full
          bg-grey-lighter
          text-grey-darker
          border border-grey-lighter
          rounded-lg
          h-10
          px-4
          my-2
        "
        placeholder="Тайлбар оруулах"
        v-model="detail"
      ></textarea>

      <input
        required=""
        placeholder="Огноо сонгоно уу"
        class="
          appearance-none
          block
          w-full
          bg-grey-lighter
          text-grey-darker
          border border-grey-lighter
          rounded-lg
          h-10
          px-4
          my-2
        "
        type="date"
        v-model="date"
      />

      <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
        <button
          @click="closeModal"
          class="
            mb-2
            md:mb-0
            bg-white
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            border
            text-gray-600
            rounded-full
            hover:shadow-lg hover:bg-gray-100
            my-2
          "
        >
          Cancel
        </button>
        <button
          @click="edited"
          type="submit"
          class="
            transition
            duration-200
            ease-in-out
            mb-2
            md:mb-0
            bg-green-400
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            text-white
            rounded-full
            hover:shadow-lg hover:bg-green-600
            my-2
          "
        >
          Done
        </button>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>


