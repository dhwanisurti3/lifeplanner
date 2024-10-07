<template>
  <div>
    <!-- Show delete confirmation if item is deleted -->
    <div
      v-if="isDeleted"
      class="text-gray-500 p-4 flex justify-center items-center"
    >
      Item has been deleted.
    </div>

    <!-- Content only shows if item exists and is not deleted -->
    <div class="content bg-white p-6" v-if="item && !isDeleted">
      <div class="flex justify-between mb-8">
        <div class="title text-start text-2xl">
          {{ item.title }}
        </div>
        <div class="flex text-center items-center gap-2">
          <button
            class="flex items-center space-x-2 p-1  border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:border-gray-500"
          >
            <img src="../assets/share.png" alt="Share Icon" />
            <span class="text-sm">Share</span>
          </button>

          <div
            class="dropdown-container"
            @click.stop="isDropdownVisible = !isDropdownVisible"
          >
            <img src="../assets/Icon.png" class="hover-icon" alt="Icon" />

            <!-- Dropdown Menu -->
            <div v-if="isDropdownVisible" class="dropdown-menu">
              <div class="dropdown-item" @click="editPage">Edit Page</div>
              <div class="dropdown-item" @click.stop="handleDelete">
                Delete Page
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Header Tags -->
      <div>
        <p class="text-center text-sm text-gray-400 font-thin mb-3">
          January 11, 2025 at 11:43PM
        </p>
      </div>

      <div class="flex space-x-2 mb-4">
        <button class="bg-gray-300 text-gray-700 py-1 px-4 rounded">
          Lorem ipsum
        </button>
        <button class="bg-gray-300 text-gray-700 py-1 px-4 rounded">
          Tag2
        </button>
      </div>

      <!-- Daily Reflections -->
      <div
        class="content ql-editor mb-6"
        id="preview"
        v-html="formattedText"
      ></div>

      <!-- Images -->
      <div v-if="item.image" class="w-[80%]">
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="relative">
            <img
              :src="item.image"
              alt="Uploaded Image"
              class="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <!-- Video -->
      <div
        v-if="item.videoUrl"
        class="video-container mb-6 text-left max-w-full"
      >
        <video controls class="w-[70%] rounded-lg shadow-lg text-left">
          <source :src="item.videoUrl" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Audio Player -->
      <div
        v-if="item.audioUrl"
        class="flex w-[70%] h-18 mb-4 rounded-xl border border-gray-300 p-2"
      >
        <!-- Left Image -->
        <div class="flex-shrink-0 mt-2">
          <img src="../assets/record_mic.png" alt="Microphone" />
        </div>

        <!-- Audio Player and Details -->
        <div class="flex flex-col w-full relative ml-1">
          <div class="flex items-center space-x-4 mb-2 text-left">
            <div class="flex flex-col w-full mt-3">
              <div class="font-semibold">Audio</div>
              <audio controls class="w-[90%] bg-white mt-2 rounded-lg p-2">
                <source :src="item.audioUrl" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <img
              src="../assets/_Nav item button.png"
              class="absolute top-2 right-2 w-6 h-6"
              alt="Icon"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-sm text-gray-500 text-left">
        Remember, these examples are fictional and created for illustrative
        purposes...
      </p>
    </div>
  </div>
</template>

<script>
import { Delete } from "@element-plus/icons-vue";
import { ElButton, ElIcon } from "element-plus";
export default {
  props: {
    item: {
      type: Object,
      required: false,
    },
    sectionId: {
      type: Number,
      required: true,
    },
    deleteSection: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isDeleted: false, // State to track deletion
      isDropdownVisible: false,
    };
  },
  components: {
    Delete,
    ElButton,
    ElIcon,
  },
  computed: {
    formattedText() {
      // Ensure item and item.text exist before sanitizing
      if (this.item && this.item.text) {
        return this.sanitizeHtml(this.item.text);
      }
      return "";
    },
  },
  methods: {
    sanitizeHtml(html) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const allowedTags = [
        "b",
        "strong",
        "i",
        "em",
        "u",
        "strike",
        "code",
        "blockquote",
        "pre",
        "p",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "a",
        "img",
        "video",
        "audio",
        "iframe",
        "br",
        "hr",
        "table",
        "tr",
        "td",
        "th",
        "span",
        "font",
        "color",
        "background",
      ];
      Array.from(tempDiv.getElementsByTagName("*")).forEach((node) => {
        if (!allowedTags.includes(node.nodeName.toLowerCase())) {
          node.parentNode.removeChild(node);
        }
      });
      return tempDiv.innerHTML;
    },
    handleDelete() {
      this.deleteSection(this.sectionId); // Call the passed method with the section ID
      this.isDeleted = true; // Set isDeleted to true to show delete confirmation
    },
  },
};
</script>

<style>
.content {
  background-color: white;
  transition: width 0.3s;
  overflow-y: auto;
  scrollbar-width: none;
}

.content ::-webkit-scrollbar {
  display: none;
}

#preview h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.dropdown-container {
  position: relative;
  display: inline-block; /* Allow dropdown to appear inline */
}

.hover-icon {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%; /* Position dropdown below the icon */
  right: -13px; /* Align to the right */
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 10;
  width: 150px; /* Fixed width for the dropdown */
  overflow: hidden; /* Prevents content overflow */
}

.dropdown-item {
  height: 40px;
  display: flex;
  align-items: center;
  text-align: start;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 14px;
  padding: 0 6px; /* Add some padding */
}

.dropdown-item:hover {
  background: #f5f5f5; /* Highlight on hover */
}
</style>
