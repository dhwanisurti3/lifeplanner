<template>
  <div class="add-item-form p-6">
    <form @submit.prevent="submitItem" class="space-y-4">
      <p class="font-inter font-normal text-xl leading-[30px] mb-5 text-left">
        New Journal
      </p>
      <!-- <p class="font-inter font-normal text-xl leading-[30px] mb-5 text-left">
        {{ selectedSection ? selectedSection.title : "No Section Selected" }}
      </p> -->

      <div>
        <label
          for="title"
          class="block text-sm font-medium text-gray-800 text-left"
        >
          Title
        </label>
        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="Enter item title"
          class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          for="text"
          class="block text-sm font-medium text-gray-800 text-left"
        >
          Description
        </label>
        <textarea
          id="text"
          v-model="text"
          placeholder="Enter item text"
          rows="6"
          class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
      </div>

      <div>
        <label
          for="tags"
          class="block text-sm font-medium text-gray-800 text-left"
        >
          Tags
        </label>
        <div class="relative">
          <input
            id="tags"
            v-model="inputValue"
            @keyup.enter="addTag"
            type="text"
            placeholder="Enter tags..."
            class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 flex-wrap top-2"
          >
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
        </div>
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
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          cancle
        </button>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#6941C6] hover:bg-[#6941C6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
  
  
  <script>
// import { mapGetters } from "vuex";
export default {
  data() {
    return {
      inputValue: "", // For binding the input
      tags: [],
      title: "",
      text: "",
      image: null,
      items: [],
      section: {
        title: "", // Example title; replace it with your dynamic data source
      },
    };
  },
  // computed: {
  //   ...mapGetters(["selectedSection"]), // Add selectedSection to computed properties
  // },
  methods: {
    addTag() {
      // Check if input is not empty and if the tag does not already exist
      if (
        this.inputValue.trim() &&
        !this.tags.some((tag) => tag.name === this.inputValue.trim())
      ) {
        this.tags.push({ name: this.inputValue.trim() }); // Add a new tag as an object
        this.inputValue = ""; // Clear the input field
      }
    },
    removeTag(index) {
      this.tags.splice(index, 0); // Remove the tag at the specified index
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
      if (this.title && this.text && this.image) {
        const newItem = {
          id: Date.now().toString(),
          title: this.title,
          text: this.text,
          image: this.image,
        };

        this.$store.dispatch("addItemToSection", {
          sectionId: this.$store.state.selectedSectionId,
          newItem,
        });

        this.title = "";
        this.text = "";
        this.image = null;
      }
      // else {
      //   alert("Please fill out all fields!");
      // }
    },
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
  scrollbar-width: none;
}

.add-item-form::-webkit-scrollbar {
  display: none;
}
.relative {
  position: relative;
}

input {
  padding-left: 100px; /* Adjust based on your tag size */
}

.absolute {
  pointer-events: none; /* This ensures the tags don't interfere with input */
}
</style>
  