<script>
export default {
  name: "Table",
};
</script>

<template>
  <div>
    <slot name="tableheader"></slot>
    <main>
      <slot name="tablemain"></slot>
    </main>
  </div>
</template>

<style lang="css">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
</style>
