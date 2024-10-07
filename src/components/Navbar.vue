<template>
  <div
    class="sticky top-0 z-50 flex justify-between px-3 sm:px-3 md:px-4 bg-white mt-[14px] xl:mt-0 border-b shadow-sm xl:border-b-0 xl:shadow-none"
  >
    <div
      class="hidden lg:hidden xl:flex lg:w-[576px] lg:h-[64px] sm:space-x-3 xl:items-center xl:space-x-3 xl:w-[570px] xl:h-[64px]"
    >
      <!-- <div class="hidden  sm:space-x-3 md:flex md:items-center md:space-x-3 md:w-[370px] md:h-[50px] xl:flex xl:items-center xl:space-x-3 xl:w-[576px] xl:h-[64px]"> -->

      <el-input
        placeholder="Search..."
        v-model="searchQuery"
        class="w-[576px] h-[53px] mt-2"
      >
        <template #prefix>
          <!-- <el-icon class="icon"
            > -->
          <img src="../assets/search.png" />
          <!-- </el-icon> -->
        </template>
      </el-input>
    </div>

    <div class="xl:hidden mb-4">
      <img src="../assets/Logo wrap.png" alt="Small Screen Image" />
    </div>

    <div class="flex justify-end items-start xl:items-center md:space-x-2 text-center">
      <div><img src="../assets/notification.png" /></div>

      <div><img src="../assets/setting.png" /></div>

      <div class="relative hidden xl:block">
        <img
          class="w-10 h-10 rounded-full object-cover"
          src="../assets/photo.png"
          alt="Profile"
        />
      </div>
      <div class="relative xl:hidden">
        <img
          class="w-10 h-10 rounded-full object-cover"
          src="../assets/menu.png"
          alt="Profile Small"
          @click="$emit('toggle-sidebar')"
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
