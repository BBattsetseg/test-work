<template>
  <div
    class="w-4/5 h-screen bg-current flex justify-center items-center absolute top-0"
  >
    <div class="w-1/3 bg-white justify-center items-center flex flex-col p-4">
      <slot name="modalheader">
        <p class="text-3xl">
          {{ this.isEditing ? "Мэдээлэлээ засах" : "Шинээр бүртгэх" }}
        </p></slot
      >
      <slot name="modalbody"> </slot>
      <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
        <slot name="modalfooter">
          <button
            @click="this.isEditing == true ? edited() : create()"
            type="submit"
            class="transition duration-200 ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600 my-2"
          >
            {{ this.isEditing ? "done" : "create" }}
          </button>
          <button
            @click="close"
            class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100 my-2"
          >
            Cancel
          </button>
        </slot>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "Modal",
  props: {
    isEditing: {
      type: Boolean,
    },
  },

  setup(props) {
    const isEditing = props.isEditing;
    return {
      isEditing,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    edited() {
      this.$emit("edited");
    },
    create() {
      this.$emit("create");
    },
  },
};
</script>
