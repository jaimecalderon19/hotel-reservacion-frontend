<template>
  <div>
    <header class="shadow-sm bg-white" id="myTopnav">
    <nav class="bg-blue-600 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <a href="#" class="text-white text-lg font-semibold">HotelFinder</a>
        <div class="space-x-4">
          <a href="#" class="text-white">Home</a>
          <a href="#" class="text-white">About</a>
          <a href="#" class="text-white">Contact</a>

          <span @click="singOut" v-if="isAuthenticate" class="text-white" style="cursor: pointer;">Cerrar sección</span>
          <span  @click="router.push('/login')" v-else class="text-white" style="cursor: pointer;">Iniciar sección</span>
        </div>
      </div>
    </nav>
    </header>
  
  </div>
</template>

<script setup lang="ts">

import { storeToRefs } from "pinia";
import { AuthenticationStore } from "../stores/Authentication" 
import { useRouter } from "nuxt/app";

const router = useRouter();

const authenticationStore = AuthenticationStore();

const { isAuthenticate } = storeToRefs(authenticationStore);


const singOut = () => {

  authenticationStore.logout();
  router.push("/login");
}

</script>