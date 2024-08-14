<template>
  <div>
    <div
      v-if="success"
      class="w-72 m-3 flex items-center absolute top-42 h-16 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 bg-lime-200 transition ease-out duration-75"
      role="alert"
    >
      <span class="font-medium">Booking successful! Have a great day. </span>
    </div>
    <div
      v-if="warning"
      class="w-72 m-3 flex items-center absolute top-42 h-16 p-4 mb-4 text-sm text-yellow-200 rounded-lg bg-green-50 bg-yellow-600 transition ease-out duration-75"
      role="alert"
    >
      <span class="font-medium">Oops, check your info again, please!</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  success: {
    type: Boolean,
  },
  warning: {
    type: Boolean,
  },
});
</script>
