<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
  >
    <button
      @click="$emit('close', false)"
      class="absolute top-4 right-4 text-zinc-300 border-2 p-1 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-zinc-100"
    >
      X
    </button>
    <table
      class="bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-4xl"
    >
      <thead>
        <tr class="bg-gray-100">
          <th
            v-for="hotel in hotels"
            :key="hotel.id"
            class="text-center text-sm sm:text-base px-4 py-2"
          >
            {{ hotel.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="hotel in hotels" :key="hotel.id" class="p-2">
            <img
              :src="hotel.image"
              alt="Hotel Image"
              class="w-full h-auto object-cover rounded-md"
            />
          </td>
        </tr>
        <tr>
          <td
            v-for="hotel in hotels"
            :key="hotel.id"
            class="text-center text-sm sm:text-base px-4 py-2"
          >
            {{ hotel.location }}
          </td>
        </tr>
        <tr>
          <td
            v-for="hotel in hotels"
            :key="hotel.id"
            class="text-center text-sm sm:text-base px-4 py-2"
          >
            {{ hotel.starRating }} estrellas
          </td>
        </tr>
        <tr>
          <td
            v-for="hotel in hotels"
            :key="hotel.id"
            class="text-center text-sm sm:text-base px-4 py-2"
          >
            ${{ hotel.pricePerNight }} USD
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  hotels: {
    type: Array,
  },
});
</script>

<style scoped>
.comparison-table {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
</style>
