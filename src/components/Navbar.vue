<template>
  <div
    class="sticky top-0 z-10 flex justify-between items-center px-4 bg-white"
  >
    <div class="flex items-center space-x-3 w-[576px] h-[64px]">
      <el-input
        placeholder="Search..."
        v-model="searchQuery"
        class="w-[576px] h-[53px] mt-2"
      >
        <template #prefix>
          <el-icon class="icon"
            ><img src="../assets/_Nav item button (1).png" class="h-6 w-7"
          /></el-icon>
        </template>
      </el-input>
    </div>

    <div class="flex items-center space-x-6">
      <el-icon class="cursor-pointer">
        <notification />
      </el-icon>

      <el-icon class="cursor-pointer">
        <setting />
      </el-icon>

      <div class="relative">
        <img
          class="w-10 h-10 rounded-full object-cover"
          :src="profilePhoto"
          alt="Profile"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ElInput, ElIcon } from "element-plus";
import { Notification, Setting } from "@element-plus/icons-vue";

export default {
  components: {
    ElInput,
    ElIcon,
    Notification,
    Setting,
  },
  data() {
    return {
      searchQuery: "", // Search input model
      profilePhoto: "https://via.placeholder.com/40", // Example profile photo URL
    };
  },
};
</script>
  
  <style scoped>
</style>
  