<template>
  <el-container style="height: 100vh">
    <!-- <el-aside :width="isCollapsed ? '20px' : '264px'" class="sidebar"> -->
    <el-aside :width="isCollapsed ? '10px' : '264px'" class="sidebar">
      <div
        class="flex-container flex items-center justify-between mx-0 mt-4 mb-2"
        :class="{ 'mx-5': !isCollapsed }"
      >
        <span v-if="!isCollapsed" :class="{ 'ml-10': isCollapsed }">
          <img src="../assets/Logo.png" />
        </span>
        <el-icon
          :class="isCollapsed ? 'arrow-right' : 'arrow-right'"
          style="color: black; cursor: pointer"
          @click.stop="toggleSidebar"
          ><img src="../assets/arrow.png" :class="{ 'h-4': isCollapsed }"
        /></el-icon>
      </div>

      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1" class="p-0">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group class="p-0">
            <template #title><span>Group One</span></template>
            <el-menu-item
              index="1-1"
              class="p-0 rounded-md"
              @click="setActiveComponent('dashboard')"
            >
              <el-icon><img src="../assets/home.png" /></el-icon>
              Dashboard</el-menu-item
            >
            <el-menu-item
              index="1-2"
              class="p-0 rounded-md"
              @click="setActiveComponent('dashboard')"
            >
              <el-icon><img src="../assets/element-equal.png" /></el-icon>
              Tasks</el-menu-item
            >
            <el-menu-item
              index="1-3"
              class="p-0 rounded-md"
              @click="setActiveComponent('dashboard')"
            >
              <el-icon><img src="../assets/medal-star.png" /></el-icon>
              Goals</el-menu-item
            >
            <el-menu-item
              index="1-4"
              class="p-0 rounded-md"
              @click="setActiveComponent('dashboard')"
            >
              <el-icon><img src="../assets/24-support.png" /></el-icon>
              Routine</el-menu-item
            >
            <el-menu-item
              index="1-5"
              class="p-0 rounded-md"
              @click="setActiveComponent('journal')"
            >
              <el-icon><img src="../assets/receipt-edit.png" /></el-icon>
              Journal
            </el-menu-item>
            <el-menu-item
              index="1-6"
              class="p-0 rounded-md"
              @click="setActiveComponent('dashboard')"
            >
              <el-icon><img src="../assets/subtitle.png" /></el-icon>
              Al Advisor
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="1-7">Shared</el-menu-item>
        <el-menu-item
          index="2"
          class="p-0 rounded-md"
          @click="setActiveComponent('dashboard')"
        >
          <el-icon><img src="../assets/travel.png" /></el-icon>
          <template #title>Travel</template>
        </el-menu-item>
        <el-menu-item
          index="3"
          class="p-0 rounded-md"
          @click="setActiveComponent('dashboard')"
        >
          <el-icon><img src="../assets/house 1.png" /></el-icon>
          <template #title>Home</template>
        </el-menu-item>
        <el-menu-item
          index="4"
          class="p-0 rounded-md"
          @click="setActiveComponent('dashboard')"
        >
          <el-icon><img src="../assets/contract 1.png" /></el-icon>
          <template #title>Family</template>
        </el-menu-item>
        <el-menu-item
          index="5"
          class="p-0 rounded-md"
          @click="setActiveComponent('dashboard')"
        >
          <el-icon><img src="../assets/test 1.png" /></el-icon>
          <template #title>Career</template>
        </el-menu-item>
        <el-menu-item
          index="6"
          class="p-0 rounded-md"
          @click="setActiveComponent('dashboard')"
        >
          <el-icon><img src="../assets/document 1.png" /></el-icon>
          <template #title>Sport</template>
        </el-menu-item>
        <el-menu-item
          index="7"
          class="p-0 rounded-md"
          @click="setActiveComponent('dashboard')"
        >
          <el-icon><img src="../assets/book 1.png" /></el-icon>
          <template #title>Finance</template>
        </el-menu-item>
        <el-menu-item
          index="8"
          class="p-0 rounded-md"
          @click="setActiveComponent('dashboard')"
        >
          <el-icon><img src="../assets/travel.png" /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main class="p-0">
      <div class="content">
        <Navbar />
        <!-- Conditionally render Journal component -->
        <journal v-if="selectedComponent === 'journal'" />

        <!-- Display a message or placeholder when Journal is not selected -->
        <div v-else>
          <p class="h-full items-center flex justify-center">
            No component selected or this is not the journal section.
          </p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

    
<script>
import { mapActions, mapGetters } from "vuex";
import {
  Plus,
  Delete,
  ArrowRight,
  ArrowLeft,
  Home,
} from "@element-plus/icons-vue";
import {
  ElContainer,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElInput,
  ElButton,
  ElIcon,
} from "element-plus";
import Journal from "./Journal.vue";
import Navbar from "./Navbar.vue";

export default {
  components: {
    ElContainer,
    ElAside,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElInput,
    ElButton,
    ElIcon,
    Plus,
    Delete,
    ArrowRight,
    ArrowLeft,
    Journal,
    Navbar,
  },
  data() {
    return {
      isCollapsed: false,
      selectedComponent: null, // Track the currently active component
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed; // Toggle the sidebar state
    },
    setActiveComponent(component) {
      this.selectedComponent = component; // Set the active component to display
    },
  },
};
</script>

    
<style scoped>
.sidebar {
  background-color: white;
  transition: width 0.3s;
  overflow-y: auto; /* Allow vertical scrolling */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.sidebar::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari, and Edge */
}

.el-menu-vertical-demo {
  padding: 0px 8px; /* Optional: Add some padding to avoid content sticking to the edge */
}

.el-menu-item {
  transition: background-color 0.2s; /* Smooth transition for background color */
}

.el-menu-item:hover {
  background-color: #e0e0e0; /* Change background color on hover */
  color: #000; /* Change text color on hover */
}

.add-section {
  padding: 10px;
}

.arrow-left,
.arrow-right {
  color: black; /* Set the arrow icon color to black */
  cursor: pointer; /* Change cursor to pointer for better UX */
}
.el-main {
  padding: 0 !important;
}
</style>


    