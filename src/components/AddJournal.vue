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
        <quill-editor
          v-model="text"
          :options="editorOption"
          :disabled="disabled"
          @blur="onEditorBlur"
          @focus="onEditorFocus"
          @ready="onEditorReady"
          @change="onEditorChange"
          
        />
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
            <label for="voice" class="block text-sm font-medium text-gray-800 text-left">
              Record Voice
            </label>
            <!-- Audio Playback -->
            <audio v-if="audioUrl" :src="audioUrl" controls class="mt-3"></audio>
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
              @click="startRecording"
            >
              <img
                src="../assets/record_mic.png"
                alt="Record Microphone"
                class="h-12 w-12"
              />
              <p>
                <span class="text-[#6941C6] font-semibold">{{ recording ? 'Recording...' : 'Click to start recording...' }}</span>
              </p>
            </div>

            <!-- Stop Recording Button -->
            <button v-if="recording" @click="stopRecording" class="mt-3 bg-red-500 text-white py-1 px-4 rounded">
              Stop Recording
            </button>


          </div>

        <!-- Video Recorder -->
        <div class="flex-1">
      <label class="block text-sm font-medium text-gray-800 text-left">Record Video</label>

      <!-- Video Element -->
      <!-- Video Playback -->
      <div v-if="videoUrl" class="mt-4">
        <video controls :src="videoUrl" class="w-full mt-2" />
      </div>
      <!-- Image that triggers recording -->
      <div
        class="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer flex flex-col justify-center items-center"
        @click="startRecordingVideo"
      >
        <img
          src="../assets/Featured icon.png"
          alt="Record Video"
          class="h-12 w-12"
        />
        <p>
          <span class="text-[#6941C6] font-semibold">{{ recordingVideo ? 'Recording...' : 'Click to start recording...' }}</span>
        </p>
      </div>
      <!-- <video ref="video" class="w-full mt-2" autoplay playsinline></video> -->


      <!-- Stop Recording Button -->
      <button v-if="recordingVideo" @click="stopRecordingVideo" class="mt-3 bg-red-500 text-white py-1 px-4 rounded">
        Stop Recording
      </button>


      </div>
      </div>

      <!-- File Upload Full Width -->
      <!-- <input
          id="image"
          type="file"
          @change="onFileChange"
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        /> -->
      <div class="mt-4 w-full">
    <label
      for="file"
      class="block text-sm font-medium text-gray-800 text-left"
    >
      Images
    </label>

    <!-- Hidden File Input -->
    <input 
      id="image" 
      type="file" 
      ref="fileInput" 
      accept="image/*" 
      class="hidden" 
      @change="onFileChange" 
    />

    <!-- Image Trigger for File Upload -->
    <div
      class="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer flex flex-col justify-center items-center"
      @click="$refs.fileInput.click()"
    >
      <img
        src="../assets/Featured icon (1).png"
        alt="Upload Image"
        class="h-12 w-12"
      />
      <p>
        <span class="text-[#6941C6] font-semibold">Click to upload</span> or
        drag and drop
      </p>
    </div>

    <!-- Show uploaded image preview -->
    <div v-if="uploadedImageUrl" class="mt-4">
      <img :src="uploadedImageUrl" alt="Uploaded Image" class="h-32 w-32 object-cover rounded-lg" />
      <p class="mt-2 text-gray-700">
        Uploaded Image: {{ uploadedFile.name }}
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
  import 'quill/dist/quill.snow.css'; 

  export default {
  props: {
    sectionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // uploadedImageUrl: null,
      // uploadedFile: null, 
      image:null,
      mediaRecorder: null,
      audioChunks: [],
      audioUrl: null,
      recording: false,
      recordingVideo: false,
      videoUrl: null,
      stream: null,
      inputValue: "", 
      tags: [],
      title: "",
      text: "",
      image: null,
      items: [],
      readOnly :true,
      editorOption: {
        placeholder: 'add description',
    
        readOnly: this.readOnly,
        modules: {
          toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
        },
        theme: 'snow',
      },
      disabled: false 
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
    handleFileUpload(event) {
      const file = event.target.files[0]; 
      if (file && file.type.startsWith('image/')) { 
        this.uploadedFile = file;

 
        this.uploadedImageUrl = URL.createObjectURL(file);

        
        const formData = new FormData();
        formData.append('file', file);
      } else {
        alert('Please upload a valid image file.');
      }
    },
    clearForm() {
      this.title = "";
      this.text = "";
      this.tags = [];
      this.videoUrl = "",
      this.audioUrl = "",
      // this.uploadedImageUrl = ""
      this.image = ""
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result; 
      };
      reader.readAsDataURL(file); // Convert image to base64
    },
    async startRecording() {
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Your browser does not support audio recording.');
        return;
      }
      this.recording = true;
      this.audioChunks = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioUrl = URL.createObjectURL(audioBlob);
      };
      this.mediaRecorder.start();
    },

    stopRecording() {
      this.recording = false;
      this.mediaRecorder.stop(); 
    },
    async startRecordingVideo() {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.$refs.video.srcObject = this.stream;

      this.mediaRecorder = new MediaRecorder(this.stream);
      this.recordingVideo = true;
      const videoChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        videoChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
        this.videoUrl = URL.createObjectURL(videoBlob);
        this.stream.getTracks().forEach(track => track.stop()); // Stop all tracks
      };

      this.mediaRecorder.start();
    },
    stopRecordingVideo() {
      this.mediaRecorder.stop();
      this.recordingVideo = false;
    },
    async submitItem() {
    if (this.title && this.text) {
      const newItem = {
        id: Date.now().toString(),
        title: this.title,
        text: this.text,
        tags: this.tags,
        sectionId: this.sectionId,
        audioUrl: this.audioUrl, 
      videoUrl: this.videoUrl, 
      image:this.image
      };
    await this.$store.dispatch("addItemToSection", {
      sectionId: this.sectionId,
      newItem,
    });
    
    // Emit the event with the new item
    this.$emit("submit-item", newItem);  
    
    // Reset form fields
    this.clearForm();
  }
},
onEditorBlur(quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
    // console.log('editor change!', quill, html, text)
    this.text = html; 
  },
  

  },
  setup() {
    const router = useRouter(); 
    return { router }; 
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
  pointer-events: none; 
}
</style>
  