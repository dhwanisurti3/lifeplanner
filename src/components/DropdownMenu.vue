<template>
  <div 
    class="dropdown-container" 
    @mouseenter="isDropdownVisible = true" 
    @mouseleave="isDropdownVisible = false"
  >
    <el-icon class="hover-icon">
      <img src="../assets/Icon.png" />
    </el-icon>

    <div v-if="isDropdownVisible" class="dropdown-menu">
      <div class="dropdown-item" @click="editPage">Edit Page</div>
      <div class="dropdown-item" @click="duplicatePage">Duplicate Page</div>
      <div class="dropdown-item" @click="deletePage">Delete Page</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onEdit: {
      type: Function,
      required: true,
    },
    onDuplicate: {
      type: Function,
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isDropdownVisible: false,
    };
  },
  methods: {
    editPage() {
      this.onEdit();
    },
    duplicatePage() {
      this.onDuplicate();
    },
    deletePage() {
      this.onDelete();
    },
  },
};
</script>

<style scoped>
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
    flex-direction: column;
    justify-items: start;
    text-align: start;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    font-size: 14px;
    padding: 0 0 0 6px;
}

.dropdown-item:hover {
  background: #f5f5f5; /* Highlight on hover */
}
</style>
