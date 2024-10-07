<template>
  <div class="home">
    <Sidebar />
    <!-- <Justtry/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
// import Justtry from "@/components/Justtry.vue";

export default {
  name: "HomeView",
  components: {
    Sidebar,
    // Justtry
  },
};
</script>
<style>
* {
  --el-menu-active-color: rgb(53, 51, 51); /* Replace with your desired hex color */
}
.el-menu-item.is-active {
  color: var(--el-menu-active-color);
  font-weight: bold; /* Makes the active menu item text bold */
}
</style>
