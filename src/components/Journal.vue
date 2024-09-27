<template>
  <el-container class="h-screen bg-white">
    <el-aside width="286px" class="sidebar bg-white">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo bg-white"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item
          index="add-new"
          @click="addNewJournalSection"
          class="el-menu-item"
        >
          <div class="flex justify-between w-full items-center">
            <div>
              <span class="text-[18px] font-medium font-inter">Journal</span>
            </div>
            <div class="flex space-x-1">
              <el-icon>
                <img src="../assets/_Nav item button (2).png" />
              </el-icon>
              <el-icon>
                <img src="../assets/_Nav item button (1).png" />
              </el-icon>
            </div>
          </div>
        </el-menu-item>

        <div
          v-for="(sectionsByDate, date) in sections"
          :key="date"
          class="section-group bg-white h-full"
        >
          <div class="text-left font-semibold text-gray-400 mb-4 px-4 mx-1">
            {{ date }}
          </div>

          <el-menu-item
            v-for="section in sectionsByDate"
            :key="section.id"
            @click="selectSection(section.id)"
            class="el-menu-item flex justify-between items-start bg-white hover:bg-white my-1"
          >
            <!-- <div class="flex flex-col text-left">
              <span class="text-[16px] font-medium h-10">{{
                section.title
              }}</span>
              <span class="text-gray-500 text-sm">{{
                formatDate(section.createdDate)
              }}</span>
            </div> -->
            <div class="flex flex-col text-left">
              <!-- Dynamically set section title -->
              <span class="text-[16px] font-medium h-10">
                {{ getSectionTitle(section) }}
              </span>
              <span class="text-gray-500 text-sm">{{ formatDate(section.createdDate) }}</span>
            </div>
            <el-button type="text" @click.stop="deleteSection(section.id)">
              <el-icon><delete /></el-icon>
            </el-button>
          </el-menu-item>
        </div>
      </el-menu>

      <div v-if="showInputField" class="add-section bg-white">
        <el-input v-model="newTitle" placeholder="Enter section title" />
        <el-button @click="addNewSection" type="primary" size="small">
          Add
        </el-button>
      </div>
    </el-aside>

    <el-main class="el-main bg-white">
      <div class="content bg-white ">

      <p v-if="!selectedSectionId">Please select a section to add items.</p>
      <template v-else>
        <ItemDetail v-if="showItemDetail" :item="currentItem" :sectionId="selectedSectionId" />
        <AddJournal
          v-else
          :section-id="selectedSectionId"
          @submit-item="handleNewItem" 
        />
      </template>

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
import { format } from "date-fns";
import ItemDetail from "./ItemDetail.vue";

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
    ItemDetail
  },
  data() {
    return {
      currentItem: null,
      showInputField: false,
      newTitle: "",
      showItemDetail: false, // Control visibility of ItemDetail
      currentItem: null, // Store the current item to be shown in ItemDetail
      selectedSectionId: 'selectedSectionId', // Set your selected section ID
      
    
    };
  },
  computed: {
    ...mapGetters(["sections","selectedSectionId"]),
    // selectedSectionId() {
    //   return this.$store.state.selectedSectionId;
    // },
    selectedSectionId() {
      return this.$store.state.selectedSectionId;
    },
    showItemDetail() {
      return !!this.currentItem; // Show ItemDetail if currentItem is not null
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
    async addNewJournalSection() {
      const newSection = {
        id: Date.now().toString(),
        title: "New Journal", // Default title
        createdDate: new Date().toISOString(),
        items: [],
      };
      await this.addSection(newSection); // Call the Vuex action to add the section
    },
    async deleteSection(sectionId) {
      await this.removeSection(sectionId);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return format(date, "MMMM dd, yyyy");
    },
    async selectSection(sectionId) {
      await this.$store.dispatch("selectSection", sectionId);
    },
    handleNewItem(newItem) {
      // Set the new item to display in ItemDetail
      this.currentItem = newItem;
      this.showItemDetail = true;  
      
      // Push the route programmatically if you need
  //     if (newItem && this.selectedSectionId) {
  //   this.$router.push({
  //     name: 'ItemDetail',
  //     params: { id: newItem.id, sectionId: this.selectedSectionId }
  //   });
  // } else {
  //   console.error("Invalid item or section ID:", newItem.id, this.selectedSectionId);
  // }
    },
    getSectionTitle(section) {
      if (section.items.length === 0) {
        return "New Journal"; // Default title if no items
      } else {
        return section.items[0].title; // Title from the first item
      }
    },
  },
  async mounted() {
    await this.fetchSections();
  },
};
</script>

<style scoped>
/* Ensure the full layout has no margins and paddings */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.sidebar {
  background-color: white; /* Set sidebar background */
}

.add-section {
  padding: 10px;
  background-color: white; /* Ensure the add section has a white background */
}

.el-main {
  padding: 0 !important;
  background-color: white; /* Ensure main area is white */
}

/* Custom styles for the date and title */
.section-group .text-gray-500 {
  font-size: 0.875rem; /* small text */
}

.section-group .font-semibold {
  margin-bottom: 1rem; /* Adjust bottom margin to separate sections */
}

.section-group .flex-col {
  text-align: left;
}

/* Increase space between title and date */
.section-group .mt-1 {
  margin-top: 0.25rem; /* Adds slight margin between title and date */
}
.el-menu-item {
  background-color: white; /* Default background */
}

.el-menu-item:hover {
  background-color: white;
}
.sidebar {
  background-color: white;
  transition: width 0.3s;
  overflow-y: auto; /* Allow vertical scrolling */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.sidebar::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari, and Edge */
}
</style>
