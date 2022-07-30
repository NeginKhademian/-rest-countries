<template>
  <div :class="darkMode ? 'dark' : 'light'">
    <Navbar @onclick="darkMode = !darkMode">
      <router-view></router-view>
    </Navbar>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";

const components = {
  Navbar: defineAsyncComponent(() => import("@/components/Navbar/Navbar.vue")),
};
export default {
  name: "App",
  components,
  setup() {
    const darkMode = ref(false);
    return {
      darkMode,
    };
  },
};
</script>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.d-inline-block {
  display: inline-block;
}
</style>
