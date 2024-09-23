<template>
  <div class="add-item-form p-6">
    <form @submit.prevent="submitItem" class="space-y-4">
      <p class="font-inter font-normal text-xl leading-[30px] mb-5 text-left">
        New Journal
      </p>

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
          for="title"
          class="block text-sm font-medium text-gray-800 text-left"
        >
          Tags
        </label>
        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="Enter item title"
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

      <div class="mt-6">
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>

    <!-- <div class="added-items mt-8 flex flex-wrap gap-4">
      <h2 class="text-xl font-semibold mb-4 w-full">Added Items</h2>
      <div v-if="items.length === 0" class="text-gray-500">
        No items added yet.
      </div>
      <div v-else class="w-full flex flex-wrap gap-4">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <h3 class="font-semibold text-lg text-gray-900">{{ item.title }}</h3>
          <p class="text-gray-700">{{ item.text }}</p>
          <div v-if="item.image" class="mt-2">
            <img
              :src="item.image"
              alt="Uploaded item image"
              class="w-full h-32 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
  
  
  <script>
export default {
  data() {
    return {
      title: "",
      text: "",
      image: null,
      items: [],
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result; // Get base64 string of the image
      };
      reader.readAsDataURL(file); // Convert image to base64
    },
    async submitItem() {
      if (this.title && this.text && this.image) {
        const newItem = {
          id: Date.now().toString(),
          title: this.title,
          text: this.text,
          image: this.image, // Save base64 string instead of uploading
        };

        this.$store.dispatch("addItemToSection", {
          sectionId: this.$store.state.selectedSectionId,
          newItem,
        });

        // Clear form fields
        this.title = "";
        this.text = "";
        this.image = null;
      } else {
        alert("Please fill out all fields!");
      }
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
</style>
  