<template>
  <el-container style="height: 100vh">
    <el-aside width="286px" class="sidebar">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item
          index="add-new"
          @click="showInputField = true"
          class="el-menu-item"
        >
          <div class="flex justify-between w-full items-center">
            <div>
              <span class="text-[18px] font-medium font-inter">Journal</span>
            </div>
            <div class="flex space-x-1">
              <el-icon
                ><img src="../assets/_Nav item button (2).png"
              /></el-icon>
              <el-icon
                ><img src="../assets/_Nav item button (1).png"
              /></el-icon>
            </div>
          </div>
        </el-menu-item>
        <el-menu-item
          v-for="section in sections"
          :key="section.id"
          @click="selectSection(section.id)"
          class="flex justify-between"
        >
          {{ section.title }}
          <el-button type="text" @click.stop="deleteSection(section.id)">
            <el-icon><delete /></el-icon>
          </el-button>
        </el-menu-item>
      </el-menu>

      <div v-if="showInputField" class="add-section">
        <el-input v-model="newTitle" placeholder="Enter section title" />
        <el-button @click="addNewSection" type="primary" size="small">
          Add
        </el-button>
      </div>
    </el-aside>

    <el-main class="el-main">
      <div class="content">
        <div class="content">
          <AddJournal v-if="selectedSectionId" :sectionId="selectedSectionId" />
          <!-- <ItemList v-if="selectedSectionId" :sectionId="selectedSectionId" /> -->
          <p v-else>Please select a section to add items.</p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Plus, Delete } from "@element-plus/icons-vue";
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
import AddJournal from "./AddJournal.vue";

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
    AddJournal,
  },
  data() {
    return {
      showInputField: false,
      newTitle: "",
    };
  },
  computed: {
    ...mapGetters(["sections"]),
    selectedSectionId() {
      return this.$store.state.selectedSectionId;
    },
  },
  methods: {
    ...mapActions([
      "fetchSections",
      "addSection",
      "removeSection",
      "selectSection",
    ]),
    async addNewSection() {
      if (this.newTitle) {
        const newSection = {
          id: Date.now().toString(),
          title: this.newTitle,
          items: [],
        };
        await this.addSection(newSection);
        this.newTitle = "";
        this.showInputField = false;
      }
    },
    // async addNewSection() {
    //   if (this.newtitle) {
    //   }
    // },
    async deleteSection(sectionId) {
      await this.removeSection(sectionId);
    },
  },
  async mounted() {
    await this.fetchSections();
  },
};
</script>

<style scoped>
/* Add your styles here */
.sidebar {
  background-color: #f5f5f5;
}
.add-section {
  padding: 10px;
}
.el-menu-item {
  padding: 0 8px !important;
}
.el-main {
  padding: 0 !important;
}
</style>
