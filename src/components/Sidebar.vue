<template>
  <el-container style="height: 100vh">
    <!-- <el-aside :width="isCollapsed ? '20px' : '264px'" class="sidebar"> -->
    <el-aside :style="{ width: computedWidth }" class="sidebar">
      <div
        class="flex-container flex items-center justify-between mx-0 mt-4 mb-2"
        :class="{ 'mx-5': !isCollapsed }"
      >
        <span v-if="!isCollapsed" :class="{ 'ml-10': isCollapsed }">
          <img src="../assets/Logo wrap.png" />
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
              class="p-0 rounded-md flex justify-between"
              @click="setActiveComponent('dashboard')"
              @mouseenter="dropdownVisibility['1-1'] = true"
              @mouseleave="dropdownVisibility['1-1'] = false"
            >
              <div>
                <el-icon>
                  <img src="../assets/home.png" />
                </el-icon>
                Dashboard
              </div>

              <DropdownMenu
                v-if="dropdownVisibility['1-1']"
                :onEdit="editPage"
                :onDuplicate="duplicatePage"
                :onDelete="deletePage"
              />
            </el-menu-item>
            <el-menu-item
              index="1-2"
              class="p-0 rounded-md flex justify-between"
              @click="setActiveComponent('dashboard')"
              @mouseenter="dropdownVisibility['1-2'] = true"
              @mouseleave="dropdownVisibility['1-2'] = false"
            >
              <diV>
                <el-icon><img src="../assets/element-equal.png" /></el-icon>
                Tasks
              </diV>

              <DropdownMenu
                v-if="dropdownVisibility['1-2']"
                :onEdit="editPage"
                :onDuplicate="duplicatePage"
                :onDelete="deletePage"
              />
            </el-menu-item>
            <el-menu-item
              index="1-3"
              class="p-0 rounded-md flex justify-between"
              @click="setActiveComponent('dashboard')"
              @mouseenter="dropdownVisibility['1-3'] = true"
              @mouseleave="dropdownVisibility['1-3'] = false"
            >
              <div>
                <el-icon><img src="../assets/medal-star.png" /></el-icon>
                Goals
              </div>

              <DropdownMenu
                v-if="dropdownVisibility['1-3']"
                :onEdit="editPage"
                :onDuplicate="duplicatePage"
                :onDelete="deletePage"
              />
            </el-menu-item>
            <el-menu-item
              index="1-4"
              class="p-0 rounded-md flex justify-between"
              @click="setActiveComponent('dashboard')"
              @mouseenter="dropdownVisibility['1-4'] = true"
              @mouseleave="dropdownVisibility['1-4'] = false"
            >
              <div>
                <el-icon><img src="../assets/24-support.png" /></el-icon>
                Routine
              </div>

              <DropdownMenu
                v-if="dropdownVisibility['1-4']"
                :onEdit="editPage"
                :onDuplicate="duplicatePage"
                :onDelete="deletePage"
              />
            </el-menu-item>
            <el-menu-item
              index="1-5"
              class="p-0 rounded-md flex justify-between"
              @click="setActiveComponent('journal')"
              @mouseenter="dropdownVisibility['1-5'] = true"
              @mouseleave="dropdownVisibility['1-5'] = false"
            >
              <div>
                <el-icon><img src="../assets/receipt-edit.png" /></el-icon>
                Journal
              </div>

              <DropdownMenu
                v-if="dropdownVisibility['1-5']"
                :onEdit="editPage"
                :onDuplicate="duplicatePage"
                :onDelete="deletePage"
              />
            </el-menu-item>
            <el-menu-item
              index="1-6"
              class="p-0 rounded-md flex justify-between"
              @click="setActiveComponent('dashboard')"
              @mouseenter="dropdownVisibility['1-6'] = true"
              @mouseleave="dropdownVisibility['1-6'] = false"
            >
              <div>
                <el-icon><img src="../assets/subtitle.png" /></el-icon>
                Al Advisor
              </div>

              <DropdownMenu
                v-if="dropdownVisibility['1-6']"
                :onEdit="editPage"
                :onDuplicate="duplicatePage"
                :onDelete="deletePage"
              />
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="1-7">Shared</el-menu-item>
        <el-menu-item
          index="2"
          class="p-0 rounded-md flex justify-between items-center"
          @click="setActiveComponent('dashboard')"
          @mouseenter="dropdownVisibility['2'] = true"
          @mouseleave="dropdownVisibility['2'] = false"
        >
          <div class="flex items-center">
            <el-icon><img src="../assets/travel.png" /></el-icon>
            <span class="ml-2">Travel</span>
            <!-- Added a span for text -->
          </div>
          <DropdownMenu
            v-if="dropdownVisibility['2']"
            :onEdit="editPage"
            :onDuplicate="duplicatePage"
            :onDelete="deletePage"
          />
        </el-menu-item>

        <el-menu-item
          index="3"
          class="p-0 rounded-md flex justify-between items-center"
          @click="setActiveComponent('dashboard')"
          @mouseenter="dropdownVisibility['3'] = true"
          @mouseleave="dropdownVisibility['3'] = false"
        >
          <div class="flex items-center">
            <el-icon><img src="../assets/house 1.png" /></el-icon>
            <span class="ml-2">Home</span>
            <!-- Added a span for text -->
          </div>
          <DropdownMenu
            v-if="dropdownVisibility['3']"
            :onEdit="editPage"
            :onDuplicate="duplicatePage"
            :onDelete="deletePage"
          />
        </el-menu-item>

        <el-menu-item
          index="4"
          class="p-0 rounded-md flex justify-between items-center"
          @click="setActiveComponent('dashboard')"
          @mouseenter="dropdownVisibility['4'] = true"
          @mouseleave="dropdownVisibility['4'] = false"
        >
          <div class="flex items-center">
            <el-icon><img src="../assets/contract 1.png" /></el-icon>
            <span class="ml-2">Family</span>
            <!-- Added a span for text -->
          </div>
          <DropdownMenu
            v-if="dropdownVisibility['4']"
            :onEdit="editPage"
            :onDuplicate="duplicatePage"
            :onDelete="deletePage"
          />
        </el-menu-item>

        <el-menu-item
          index="5"
          class="p-0 rounded-md flex justify-between items-center"
          @click="setActiveComponent('dashboard')"
          @mouseenter="dropdownVisibility['5'] = true"
          @mouseleave="dropdownVisibility['5'] = false"
        >
          <div class="flex items-center">
            <el-icon><img src="../assets/test 1.png" /></el-icon>
            <span class="ml-2">Career</span>
            <!-- Added a span for text -->
          </div>
          <DropdownMenu
            v-if="dropdownVisibility['5']"
            :onEdit="editPage"
            :onDuplicate="duplicatePage"
            :onDelete="deletePage"
          />
        </el-menu-item>

        <el-menu-item
          index="6"
          class="p-0 rounded-md flex justify-between items-center"
          @click="setActiveComponent('dashboard')"
          @mouseenter="dropdownVisibility['6'] = true"
          @mouseleave="dropdownVisibility['6'] = false"
        >
          <div class="flex items-center">
            <el-icon><img src="../assets/document 1.png" /></el-icon>
            <span class="ml-2">Sport</span>
            <!-- Added a span for text -->
          </div>
          <DropdownMenu
            v-if="dropdownVisibility['6']"
            :onEdit="editPage"
            :onDuplicate="duplicatePage"
            :onDelete="deletePage"
          />
        </el-menu-item>

        <el-menu-item
          index="7"
          class="p-0 rounded-md flex justify-between items-center"
          @click="setActiveComponent('dashboard')"
          @mouseenter="dropdownVisibility['7'] = true"
          @mouseleave="dropdownVisibility['7'] = false"
        >
          <div class="flex items-center">
            <el-icon><img src="../assets/book 1.png" /></el-icon>
            <span class="ml-2">Finance</span>
            <!-- Added a span for text -->
          </div>
          <DropdownMenu
            v-if="dropdownVisibility['7']"
            :onEdit="editPage"
            :onDuplicate="duplicatePage"
            :onDelete="deletePage"
          />
        </el-menu-item>

        <el-menu-item
          index="8"
          class="p-0 rounded-md flex justify-between items-center"
          @click="setActiveComponent('dashboard')"
          @mouseenter="dropdownVisibility['8'] = true"
          @mouseleave="dropdownVisibility['8'] = false"
        >
          <div class="flex items-center">
            <el-icon><img src="../assets/travel.png" /></el-icon>
            <span class="ml-2">Navigator Four</span>
            <!-- Added a span for text -->
          </div>
          <DropdownMenu
            v-if="dropdownVisibility['8']"
            :onEdit="editPage"
            :onDuplicate="duplicatePage"
            :onDelete="deletePage"
          />
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main class="p-0 min-h-screen overflow-y-auto">
      <div class="content flex flex-col h-full">
        <!-- <Navbar @toggle-sidebar="toggleSidebar" /> -->
        <div class="sticky top-0 z-50 bg-white">
          <Navbar @toggle-sidebar="toggleSidebar" />
        </div>
        <div class="flex-1 overflow-y-auto">
          <!-- Conditionally render Journal component -->
          <journal v-if="selectedComponent === 'journal'" />

          <!-- Display a message or placeholder when Journal is not selected -->
          <div v-else>
            <p class="h-full items-center flex justify-center">
              No component selected or this is not the journal section.
            </p>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Plus, Delete, ArrowRight, ArrowLeft, Home } from "@element-plus/icons-vue";
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
import DropdownMenu from "./DropdownMenu.vue";

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
    DropdownMenu,
  },
  data() {
    return {
      isCollapsed: true,
      selectedComponent: null,
      showDropdown: false,
      dropdownVisibility: {
        "1-1": false,
        "1-2": false,
        "1-3": false,
        "1-4": false,
        "1-6": false,
      },
    };
  },
  computed: {
    computedWidth() {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 1240) {
        return this.isCollapsed ? "0px" : "264px";
      }
      return this.isCollapsed ? "10px" : "264px";
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    handleResize() {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1280) {
        this.isCollapsed = false;
      } else {
        this.$forceUpdate();
        this.isCollapsed = true;
        this.selectedComponent = "journal";
      }
    },
    setActiveComponent(component) {
      this.selectedComponent = component;
    },
    editPage() {
      console.log("Edit page");
    },
    duplicatePage() {
      console.log("Duplicate page");
    },
    deletePage() {
      console.log("Delete page");
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
