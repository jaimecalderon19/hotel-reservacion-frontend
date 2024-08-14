import { defineStore } from "pinia"

import { useNuxtApp } from "nuxt/app"


export const HotelStore = defineStore("hotelStore", {
  state: () => ({
    hotels: [] as IHotel[],
    hotel: {} as IHotel,
  }),
  getters: {
  },
  actions: {
    async logout(): Promise<void> {
      this.$reset()
    },
    async list(): Promise<void> {
      const { $api, $toast } = useNuxtApp()
      
      console.error("Entro a la funcion");

      return $api.get("/hotels")
        .then(result => {
          console.log(result);
          
          this.isAuthenticate = true
          this.hotels = result

        })
        .catch(error => {
          console.log(error)
          this.$reset()
          $toast.error(error.data.message)
        })
    },
  },
})


export interface IHotel {
  _id:           string;
  name:          string;
  location:      string;
  description:   string;
  starRating:    number;
  amenities:     string[];
  image:         string;
  pricePerNight: number;
  __v:           number;
}