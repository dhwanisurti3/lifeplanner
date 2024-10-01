import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import { CkeditorPlugin } from "@ckeditor/ckeditor5-vue";
import "element-plus/dist/index.css";

// Import quillEditor from vue3-quill
import { quillEditor } from 'vue3-quill';
// import customQuillModule from 'customQuillModule'
// Quill.register('modules/customQuillModule', customQuillModule)

const app = createApp(App);

app.use(store);
app.use(router);
app.use(CkeditorPlugin);

// Add Quill Editor plugin
app.use(quillEditor);

app.mount("#app");
