<template>
  <div class="bg-gray-100">
    <section class="bg-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold text-gray-800">
          Encuentra tu hotel perfecto
        </h1>
        <p class="text-gray-600 mt-4">
          Reserva hoteles a los mejores precios con facilidad.
        </p>

        <form class="mt-8 max-w-full mx-auto">
          <div
            class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4"
          >
            <input
              type="text"
              placeholder="¿A dónde vas? Busca aquí..."
              v-model="destination"
              class="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="date"
              placeholder="check in"
              v-model="checkInDate"
              class="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            <input
              type="date"
              placeholder="check out"
              v-model="checkOutDate"
              class="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            
          </div>
        </form>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold text-gray-800 mb-8">
          Hoteles disponibles
        </h2>
        <div
          class="flex flex-row gap-4 justify-end h-12 items-center bg-white p-6 mb-4"
        >
          <label for="sort">Ordenar por:</label>
          <select class="bg-white" v-model="sortBy">
            <option value="price">Price</option>
            <option value="rating">Ratings</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="hotel in filteredHotels"
            :key="hotel.id"
            class="bg-white p-6 rounded-lg shadow-md"
          >
            <img
              :src="hotel.image"
              :alt="hotel.name"
              class="w-full h-48 object-cover rounded-md"
            />
            <h3 class="text-xl font-bold text-gray-800 mt-4">
              {{ hotel.name }}
            </h3>
            <p class="text-gray-600 mt-2">{{ hotel.location }}</p>
            <p class="text-gray-400 mt-2">
              {{ hotel.starRating }} <span>estrellas</span>
            </p>
            <p class="text-blue-500 font-semibold mt-4">
              $ {{ hotel.pricePerNight }} USD /noche
            </p>
            <div class="flex">
              <p class="mr-2">Comparar hotel</p>
              <input
                type="checkbox"
                :value="hotel"
                @click="toggleHotelSelection(hotel)"
              />
            </div>
            <button
              class="block w-full mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              @click="makeReservation(hotel._id)"
            >
              Reservar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
    <div v-if="selectedHotels.length > 1">
      <ComparisonHotelTable
        :hotels="selectedHotels"
        @close="selectedHotels.length = 0"
      />
    </div>

    <HotelBookingModal
      :is-open="openModal"
      :reservation="reservation"
      :book="guests"
      @close="closeModal"
    />

    <footer class="bg-blue-600 py-4">
      <div class="container mx-auto text-center text-white">
        <p>&copy; 2024 HotelFinder. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { ComputedRef } from "vue";
import { HotelStore } from "../stores/HotelStore";
import type { IHotel } from "../stores/HotelStore";
import { storeToRefs } from "pinia";

import type { Guests } from "../types/index";


const hotelStore = HotelStore();
const { hotels } = storeToRefs(hotelStore);


onMounted(
 () => {
  hotelStore.list();
 } 
)

const destination = ref<string>("");
const checkInDate = ref<string>("");
const checkOutDate = ref<string>("");
const selectedHotels = ref<IHotel[]>([]);
const isOpen = ref<boolean>(false);
const adults = ref<number>(1);
const children = ref<number>(0);
const rooms = ref<number>(1);
const sortBy = ref<string>("name");
const openModal = ref<boolean>(false);
const reservation = ref<IHotel | null>(null);
const guests = ref<Guests>({
  rooms: 1,
  adults: 1,
  children: 0,
  checkin: "",
  checkout: "",
});

const filteredHotels: ComputedRef<IHotel[]> = computed(() => {
  if (destination.value) {
    return hotels.value.filter((hotel) =>
      hotel.location.toLowerCase().includes(destination.value.toLowerCase()),
    );
  }

  switch (sortBy.value) {
    case "price":
      return hotels.value.sort((room, hotel) => room.pricePerNight - hotel.pricePerNight);
    case "rating":
      return hotels.value.sort((room, hotel) => hotel.starRating - room.starRating);
    case "name":
      console.log(hotels.value);
      
      return hotels.value.sort((room, hotel) =>
        room.name.localeCompare(hotel.name),
      );
    default:
      return hotels.value;
  }
});

const toggleHotelSelection = (hotel: IHotel) => {
  const index = selectedHotels.value.findIndex(
    (selected) => selected._id === hotel._id,
  );

  if (index === -1) {
    selectedHotels.value.push(hotel);
  } else {
    selectedHotels.value.splice(index, 1);
  }
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const saveSelection = () => {
  guests.value = {
    rooms: rooms.value,
    adults: adults.value,
    children: children.value,
    checkin: checkInDate.value,
    checkout: checkOutDate.value,
  };
  isOpen.value = false;
};

const makeReservation = (id: string) => {
  openModal.value = true;
  reservation.value = hotels.value.find((hotel) => hotel._id === id) || null;
};

const closeModal = (payload: boolean) => {
  openModal.value = payload;
};
</script>
