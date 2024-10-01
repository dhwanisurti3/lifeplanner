<template>
  <el-container class="h-screen bg-white">
    <el-aside width="286px" class="sidebar bg-white">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo bg-white"
        @open="handleOpen"
        @close="handleClose"
      >
      <el-menu-item index="add-new" class="el-menu-item">
  <div class="flex justify-between w-full items-center relative"> <!-- Added relative here -->
    <div>
      <span class="text-[18px] font-medium font-inter">Journal</span>
    </div>
    <div class="flex space-x-1">
      <el-icon>
        <img src="../assets/_Nav item button (2).png" @click="addNewJournalSection" />
      </el-icon>
      <el-icon>
        <img src="../assets/_Nav item button (1).png" @click="toggleSearch" />
      </el-icon>
    </div>
    <transition name="slide">
      
      <div
  v-if="showSearch"
  class="absolute top-3 bg-white px-2 flex items-center h-8 transition-transform"
>
  <input
    type="text"
    v-model="searchQuery"
    placeholder="Search..."
    class="border rounded-l h-8 border-r-0" 
  />
  <button @click="toggleSearch" class="flex items-center  rounded-r h-8 px-2 border border-l-0 border-gray-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    <span class="sr-only">Close</span> 
  </button>
</div>

    </transition>
  </div>
</el-menu-item>

  

        <div
          v-for="(sectionsByDate, date) in sections"
          :key="date"
          class="section-group bg-white h-full"
        >
          <div class="text-left font-semibold text-gray-400 mb-0 px-4 mx-1">
            {{ date }}
          </div>

          <el-menu-item
            v-for="(section, index) in sectionsByDate"
            :key="section.id"
            @click="selectSection(section.id)"
            @dragstart="startDrag($event, section)"
            @dragover.prevent
            @drop="onDrop($event, section)"
            draggable="true"
            class="el-menu-item flex justify-between items-start bg-white hover:bg-white my-1"
          >
            <div class="flex flex-col text-left">
              <span class="text-[16px] font-medium h-10">
                {{ getSectionTitle(section) }}
              </span>
              <span class="text-gray-500 text-sm">
                {{ formatDate(section.createdDate) }}
              </span>
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
      showSearch: false, // Controls visibility of search input
      searchQuery: '',
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
    // loadSectionsFromLocalStorage() {
    //   const sections = localStorage.getItem("sections");
    //   if (sections) {
    //     const parsedSections = JSON.parse(sections);
    //     this.$store.commit("SET_SECTIONS", parsedSections);
    //   }
    // },
    toggleSearch() {
      this.showSearch = !this.showSearch; // Toggle the search field
    },
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
      let selectedSection = null;

      // Iterate through each section in the sections object
      for (const dateKey in this.sections) {
        const sectionsForDate = this.sections[dateKey];

        if (Array.isArray(sectionsForDate)) {
          selectedSection = sectionsForDate.find(section => section.id === sectionId);
          if (selectedSection) break;
        }
      }

      // Check if the selected section exists
      if (selectedSection) {
        // Check if there are any items in the selected section
        if (selectedSection.items.length > 0) {
          this.currentItem = selectedSection.items[0]; // Set the current item to the first item
          this.showAddJournal = false; // Hide AddJournal
          this.showItemDetail = true; // Show ItemDetail
        } else {
          this.currentItem = null; // No items in section
          this.showAddJournal = true; // Show AddJournal
          this.showItemDetail = false; // Hide ItemDetail
        }
      } else {
        console.log("Selected section not found for ID:", sectionId);
        this.currentItem = null;
        this.showAddJournal = true; // Show AddJournal if section not found
        this.showItemDetail = false; // Hide ItemDetail
      }
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
    startDrag(event, section) {
      // Set the dragged section
      this.draggedSection = section;
      event.dataTransfer.effectAllowed = "move";
    },
    onDrop(event, targetSection) {
  // Flatten sections by converting the object to an array
  const allSections = Object.values(this.sections).flat();

  // Get the dragged and target section indices
  const draggedIndex = allSections.findIndex(
    (section) => section.id === this.draggedSection.id
  );
  const targetIndex = allSections.findIndex(
    (section) => section.id === targetSection.id
  );

  if (draggedIndex !== -1 && targetIndex !== -1) {
    // Swap sections in the flattened array
    this.$store.commit("UPDATE_SECTIONS_ORDER", {
      fromIndex: draggedIndex,
      toIndex: targetIndex,
    });
  }

  
  this.draggedSection = null; // Clear the dragged section
    // this.loadSectionsFromLocalStorage(); 
  
}

  },
  async mounted() {
    await this.fetchSections();
    // this.loadSectionsFromLocalStorage(); 
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
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease; /* Smooth transition for both enter and leave */
}

.slide-enter {
  transform: translateX(100%); /* Start off-screen to the right when entering */
}

.slide-enter-to {
  transform: translateX(-10%); /* Final state is in its normal position */
}

.slide-leave {
  transform: translateX(0); /* Keep in place while leaving */
}

.slide-leave-to {
  transform: translateX(100%); /* Slide out to the right */
}

</style>
