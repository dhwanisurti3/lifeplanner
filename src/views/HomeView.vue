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
