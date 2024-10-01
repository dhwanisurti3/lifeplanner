<template>
  <div class="content bg-white p-6" v-if="item">
    <div class="title text-start text-2xl mb-8">
      {{ item.title }}
    </div>

    <!-- Header Tags -->
    <div>
      <p class="text-center text-sm text-gray-400 font-thin mb-3">January 11, 2025 at 11:43PM</p>
    </div>

    <div class="flex space-x-2 mb-4">
      <button class="bg-gray-300 text-gray-700 py-1 px-4 rounded">Lorem ipsum</button>
      <button class="bg-gray-300 text-gray-700 py-1 px-4 rounded">Tag2</button>
    </div>

    <!-- Daily Reflections -->
<!-- <div v-if="item.image">
  <img :src="item.image" alt="Uploaded Image" class="rounded-lg shadow-lg" />
</div> -->

    <div class="content ql-editor mb-6" id="preview" v-html="formattedText"></div>
    <!-- Images -->
    <div v-if="item.image" class="w-[80%]">
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="relative">
          <img :src="item.image" alt="Uploaded Image" class="rounded-lg shadow-lg" />
          <!-- <img src="../assets/_Nav item button.png" class="absolute top-2 right-2 "> -->
        </div>
      </div>
    </div>

    <!-- Video -->
    <div v-if="item.videoUrl" class="video-container mb-6 text-left max-w-full">
      <video controls class="w-[70%] rounded-lg shadow-lg text-left">
        <source :src="item.videoUrl" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Audio Player -->
    <div v-if="item.audioUrl" class="flex w-[70%] h-18 mb-4 rounded-xl border border-gray-300 p-2">
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
              <source :src="item.audioUrl" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
          <img src="../assets/_Nav item button.png" class="absolute top-2 right-2 w-6 h-6" alt="Icon" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <p class="text-sm text-gray-500 text-left">
      Remember, these examples are fictional and created for illustrative purposes...
    </p>
  </div>
</template>


<script>
export default {
  props: {
    item: {
      type: Object,
      required: false,
    },
  },
  computed: {
    formattedText() {
      // Log the item to the console
      // console.log("item", this.item);
      
      // Ensure item and item.text exist before sanitizing
      if (this.item && this.item.text) {
        return this.sanitizeHtml(this.item.text);
      }
      return '';
    },
  },
  methods: {
  sanitizeHtml(html) {
    // console.log("Raw HTML before sanitization:", html); // Log raw HTML for debugging
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const allowedTags = [
      "b", "strong", "i", "em", "u", "strike", "code",
      "blockquote", "pre", "p", "div",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "a", "img", 
      "video", "audio", "iframe", "br", "hr",
      "table", "tr", "td", "th", "span", "font", "color", "background"
    ];
    
    Array.from(tempDiv.getElementsByTagName("*")).forEach((node) => {
      if (!allowedTags.includes(node.nodeName.toLowerCase())) {
        node.parentNode.removeChild(node);
      }
    });

    const sanitizedHtml = tempDiv.innerHTML;
    // console.log("Sanitized HTML:", sanitizedHtml); // Log sanitized HTML for debugging
    return sanitizedHtml;
  },
},

};
</script>
<style >
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
</style>
