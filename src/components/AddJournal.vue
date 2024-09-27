<template>
  <div class="add-item-form p-6">
    <form @submit.prevent="submitItem" class="space-y-4">
      <p class="font-inter font-normal text-xl leading-[30px] mb-5 text-left">
        New Journal
      </p>

      <!-- Title -->
      <div>
        <label
          for="title"
          class="block text-sm font-medium text-gray-800 text-left"
          >Title</label
        >

        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="Enter item title"
          class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <!-- Description -->
      <div>
        <label
          for="text"
          class="block text-sm font-medium text-gray-800 text-left"
          >Description</label
        >
        <textarea
          id="text"
          v-model="text"
          placeholder="Enter item text"
          rows="6"
          class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
      </div>

      <!-- Tags -->
      <div>
        <label
          for="tags"
          class="block text-sm font-medium text-gray-800 text-left"
          >Tags</label
        >
        <div class="flex flex-wrap mb-2">
          <span
            v-for="(tag, index) in tags"
            :key="index"
            class="bg-gray-300 text-gray-800 rounded-full px-3 py-1 mr-2 mb-2 text-sm"
          >
            {{ tag.name }}
            <button
              @click="removeTag(index)"
              class="ml-2 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
          </span>
        </div>
        <input
          id="tags"
          v-model="inputValue"
          @keyup.enter="addTag"
          type="text"
          placeholder="Enter tags..."
          class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div class="flex space-x-4">
        <!-- Voice Recorder -->
        <div class="flex-1">
          <label
            for="voice"
            class="block text-sm font-medium text-gray-800 text-left"
          >
            Record Voice
          </label>

          <!-- Hidden File Input -->
          <input
            id="voice"
            type="file"
            accept="audio/*"
            ref="voiceInput"
            class="hidden"
          />

          <!-- Image that triggers file input -->
          <div
            class="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer flex flex-col justify-center items-center"
            @click="$refs.voiceInput.click()"
          >
            <img
              src="../assets/record_mic.png"
              alt="Record Microphone"
              class="h-12 w-12"
            />
            <p>
              <span class="text-[#6941C6] font-semibold">Click </span>to start
              recording...
            </p>
          </div>
        </div>

        <!-- Video Recorder -->
        <div class="flex-1">
          <label
            for="video"
            class="block text-sm font-medium text-gray-800 text-left"
          >
            Video
          </label>

          <!-- Hidden File Input -->
          <input
            id="video"
            type="file"
            accept="video/*"
            ref="videoInput"
            class="hidden"
          />

          <!-- Image that triggers file input -->
          <div
            class="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer flex flex-col justify-center items-center"
            @click="$refs.videoInput.click()"
          >
            <img
              src="../assets/Featured icon.png"
              alt="Record Video"
              class="h-12 w-12"
            />
            <p>
              <span class="text-[#6941C6] font-semibold">Click </span>to start
              recording...
            </p>
          </div>
        </div>
      </div>

      <!-- File Upload Full Width -->
      <div class="mt-4 w-full">
        <label
          for="file"
          class="block text-sm font-medium text-gray-800 text-left"
        >
          Files
        </label>

        <!-- Hidden File Input -->
        <input id="file" type="file" ref="fileInput" class="hidden" />

        <!-- Image Trigger for File Upload -->
        <div
          class="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer flex flex-col justify-center items-center"
          @click="$refs.fileInput.click()"
        >
          <img
            src="../assets/Featured icon (1).png"
            alt="Upload File"
            class="h-12 w-12"
          />
          <p>
            <span class="text-[#6941C6] font-semibold">Click to upload</span> or
            drag and drop
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button
          type="button"
          @click="clearForm"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#6941C6] hover:bg-[#6941C6]"
        >
          Save
        </button>
      </div>

    </form>
  </div>
</template>
  
  
  <script>
  import { useRouter } from "vue-router";
// import { mapGetters } from "vuex";
export default {
  props: {
    sectionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputValue: "", // For binding the input
      tags: [],
      title: "",
      text: "",
      image: null,
      items: [],

    };
  },
  mounted() {
    this.$store.dispatch("fetchSections");
  },
  computed: {
    sectionItems() {
      const section = this.$store.state.sections.find(
        (s) => s.id === this.sectionId
      );
      return section ? section.items : [];
    },
  },

  methods: {
    addTag() {
      if (
        this.inputValue.trim() &&
        !this.tags.includes(this.inputValue.trim())
      ) {
        this.tags.push(this.inputValue.trim());
        this.inputValue = ""; // Clear the input after adding
      }
    },

    removeTag(index) {
      this.tags.splice(index, 1);
    },
    clearForm() {
      this.title = "";
      this.text = "";
      this.tags = [];
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async submitItem() {
  if (this.title && this.text) {
    const newItem = {
      id: Date.now().toString(),
      title: this.title,
      text: this.text,
      tags: this.tags,
      sectionId: this.sectionId,
    };

    // Dispatch action to add the item to the selected section
    await this.$store.dispatch("addItemToSection", {
      sectionId: this.sectionId,
      newItem,
    });
    
    // Emit the event with the new item
    this.$emit("submit-item", newItem);  // Changed here
    
    // Reset form fields
    this.clearForm();
    
    // Optionally, redirect or handle navigation here if needed
    // this.router.push({ name: 'ItemDetail', params: { id: newItem.id, sectionId: this.sectionId } });
  }
}

  

  },
  setup() {
    const router = useRouter(); // Create a router instance
    return { router }; // Return it so it can be used in methods
  },
};
</script>
  
  <style scoped>
.image-container {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.image-container {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.sidebar {
  background-color: white;
  transition: width 0.3s;
  overflow-y: auto;
  scrollbar-width: none;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.add-item-form {
  max-height: 95vh;
  overflow-y: auto;
}

.add-item-form::-webkit-scrollbar {
  display: none;
}

/* Styling for tags */
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.mt-1 {
  margin-top: 0.25rem;
}
.relative {
  position: relative;
}

.absolute {
  pointer-events: none; /* This ensures the tags don't interfere with input */
}
</style>
  