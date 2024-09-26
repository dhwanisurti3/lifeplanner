<!-- <template> -->
    <!-- <el-main class="el-main bg-white">
    </el-main> -->

  <!-- <div class="journal-page p-6"> -->
    
    <!-- <h2 class="font-bold text-2xl mb-4">Journal Entries</h2>
    <div v-if="journalItems.length === 0" class="mb-4">
      <p>No journal entries found.</p>
    </div>
    <div v-for="item in journalItems" :key="item.id" class="mb-4 p-4 border border-gray-300 rounded-lg">
      <h3 class="font-semibold">{{ item.title }}</h3>
      <p>{{ item.text }}</p>
      <div>
        <span v-for="(tag, index) in item.tags" :key="index" class="tag">
          {{ tag }}
        </span>
      </div>
    </div> -->
  <!-- </div> -->
<!-- </template> -->


<template>
  <div class="content bg-white p-6">
    <div class="title text-start text-2xl mb-8">
      New Title
    </div>
    <!-- Header Tags -->
     <div>
      <p class="text-center text-sm text-gray-400  font-thin mb-3">January 11, 2025 at 11:43PM</p>
     </div>
    <div class="flex space-x-2 mb-4">
      <button class="bg-gray-300 text-gray-700 py-1 px-4 rounded">Lorem ipsum</button>
      <button class="bg-gray-300 text-gray-700 py-1 px-4 rounded">Tag2</button>
    </div>

    <!-- Daily Reflections -->
    <div class="mb-6 text-left">
      <h2 class="text-xl font-semibold mb-2">1. Daily Reflections:</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>Hosted a successful yoga workshop, attracting new members.</li>
        <li>Faced a challenge with scheduling; considering a new software solution.</li>
        <li>Explored partnership opportunities with local health food vendors.</li>
      </ul>
    </div>

    <!-- Goals and Objectives -->
    <div class="mb-6 text-left">
      <h2 class="text-xl font-semibold mb-2">2. Goals and Objectives:</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>Increase class attendance by 15% in the next month.</li>
        <li>Launch a referral program to incentivize current members.</li>
        <li>Expand class offerings to include high-demand fitness trends.</li>
      </ul>
    </div>

    <!-- Financial Updates -->
    <div class="mb-6 text-left">
      <h2 class="text-xl font-semibold mb-2">3. Financial Updates:</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>Monthly revenue increased by 8%.</li>
        <li>Investment in new equipment for upcoming fitness classes.</li>
        <li>Analyzing cost-effective marketing strategies for the next quarter.</li>
      </ul>
    </div>

    <!-- Customer Reflections -->
    <div class="mb-6 text-left">
      <h2 class="text-xl font-semibold mb-2">4. Customer Insights:</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>Received positive testimonials from members on recent classes.</li>
        <li>Addressed a member concern about class timing and scheduling.</li>
      </ul>
    </div>
    <div class="mb-6 text-left">Received positive testimonials from members on recent classes.Received positive testimonials from members on recent classes.Received positive testimonials from members on recent classes.Received positive testimonials from members on recent classes.</div>
    

    <!-- Images -->
     <div class="w-[80%]">
      <div class="grid grid-cols-2 gap-4 mb-6">
    <div class="relative">
      <img src="https://via.placeholder.com/300x200" alt="Placeholder" class="rounded-lg shadow-lg" />
      <img src="../assets/_Nav item button.png" class="absolute top-2 right-2 ">
      </img>
    </div>

    <div class="relative">
      <img src="https://via.placeholder.com/300x200" alt="Placeholder" class="rounded-lg shadow-lg" />
      <img src="../assets/_Nav item button.png" class="absolute top-2 right-2 ">
      </img >
    </div>

    <div class="relative">
      <img src="https://via.placeholder.com/300x200" alt="Placeholder" class="rounded-lg shadow-lg" />
      <img src="../assets/_Nav item button.png" class="absolute top-2 right-2 ">
      </img >
    </div>

    <div class="relative">
      <img src="https://via.placeholder.com/300x200" alt="Placeholder" class="rounded-lg shadow-lg" />
      <img src="../assets/_Nav item button.png" class="absolute top-2 right-2 ">
      </img >
    </div>
  </div>
  </div>

    <!-- Audio Player -->
    <div class="flex w-[70%] h-18 mb-4  rounded-xl border border-gray-300 p-2">
    <!-- Left Image -->
    <div class="flex-shrink-0 mt-2">
      <img src="../assets/record_mic.png" alt="Microphone" />
    </div>
    <!-- Audio Player and Details -->
    <div class="flex flex-col w-full relative ml-1">
      <div class="flex items-center space-x-4 mb-2 text-left">
        <div class="flex flex-col w-full mt-3">
          <div class="font-semibold">Record 1</div>
          <audio controls class="w-[90%] bg-white mt-2  rounded-lg p-2">
            <source src="your-audio-file.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
        <img src="../assets/_Nav item button.png" class="absolute top-2 right-2 w-6 h-6" alt="Icon" />
      </div>
    </div>
  </div>


    <!-- Video -->
    <div class="video-container mb-6 text-left max-w-full ">
      <video controls class="w-[70%] rounded-lg shadow-lg text-left">
        <source src="your-video-file.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

  

    <!-- Footer -->
    <p class="text-sm text-gray-500 text-left">
      Remember, these examples are fictional and created for illustrative purposes...
    </p>
  </div>
</template>


<script>
export default {
  computed: {
    journalItems() {
      const sections = this.$store.state.sections;
      // console.log("Sections State:", sections); // Log the entire sections state

      // Log the current section ID from the route
      const sectionId = this.$route.params.sectionId;
      console.log("Current Section ID:", sectionId);

      sections.forEach((section, index) => {
        console.log(`Section ${index}:`, section); // Log each section
        console.log(`Items in Section ${index}:`, section.items); // Log items in each section
      });

      const items = sections
        .flatMap(section => section.items)
        .filter(item => item.sectionId === sectionId); // Filter items by sectionId

      console.log("Filtered Journal Items:", items); // Log the items after filtering
      return items;
    },
  },
};
</script>

<style scoped>
.video-container {
  margin: auto;
}
</style>
