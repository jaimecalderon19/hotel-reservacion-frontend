<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Crea una cuenta</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="validateAndLogin" >
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nombres</label>
          <div class="mt-2">
            <input v-model="name" id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <span v-if="errors.name" class="text-red-500">{{
              errors.name
            }}</span>

        <div>
          <label for="last_name" class="block text-sm font-medium leading-6 text-gray-900">Apellidos</label>
          <div class="mt-2">
            <input v-model="last_name" id="last_name" name="last_name" type="text" autocomplete="last_name" required class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
<span v-if="errors.last_name" class="text-red-500">{{
              errors.last_name
            }}</span>

        <div>
          <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Numero de telefono</label>
          <div class="mt-2">
            <input v-model="phone" id="phone" name="phone" type="tel" autocomplete="phone" required class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
<span v-if="errors.phone" class="text-red-500">{{
              errors.phone
            }}</span>



        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Correo</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <span v-if="errors.email" class="text-red-500">{{
              errors.email
            }}</span>
  
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="confirm_password" class="block text-sm font-medium leading-6 text-gray-900">Confirmar Contraseña</label>
          </div>
          <div class="mt-2">
            <input v-model="confirm_password" id="confirm_password" name="confirm_password" type="password" autocomplete="confirm-password" required class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <span v-if="errors.password" class="text-red-500">{{
              errors.password
            }}</span>
  
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrarse</button>
        </div>
      </form>
  
      <p class="mt-10 text-center text-sm text-gray-500">
        Tines Cuenta?
        <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Iniciar Seccion</a>
      </p>
  </div>
    </div>
  </template>
  
  <script setup lang="ts" >
  import { ref } from "vue";
  import { AuthenticationStore } from "../stores/Authentication";
  import * as yup from "yup";
  import { useRoute, useRouter } from "nuxt/app";
  
  interface ValidationErrors {
    name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    password?: string;
  }
  
  const authenticationStore = AuthenticationStore();
  
  const name = ref<string>("");
  const last_name = ref<string>("");
  const phone = ref<string>("");
  const email = ref<string>("");
  const password = ref<string>("");
  const confirm_password = ref<string>("");
  const errors = ref<ValidationErrors>({});
  const router = useRouter();
  const route = useRoute();
  
  const schema = yup.object().shape({
    last_name: yup.string().required("apellido es obligatorio"),
    name: yup.string().required("nombre es obligatorio"),
    phone: yup.string().required("telefono es obligatorio"),
    email: yup.string().email("Email inválido").required("correo es obligatorio"),
    password: yup
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });
  
  async function validateAndLogin(): Promise<void> {
    try {
        if(password.value != confirm_password.value){
            errors.value.password = "Las contraseñas no coinciden"
            return;
        }

      await schema.validate(
        { name: name.value, last_name: last_name.value, phone: phone.value, email: email.value, password: password.value },
        { abortEarly: false },
      );
      await singUp();
    } catch (validationErrors) {
      errors.value = (validationErrors as yup.ValidationError).inner.reduce(
        (acc: ValidationErrors, err) => {
          acc[err.path as keyof ValidationErrors] = err.message;
          return acc;
        },
        {},
      );
    }
  }
  
  async function singUp(): Promise<void> {
    
    const userData = {
        "lastName": last_name.value,
        "firstName": name.value,
        "phoneNumber": phone.value,
        "email": email.value,
        "password": password.value
        }

    const isRegister =  await authenticationStore.register(userData);
    if(isRegister){
        router.push("/");
    }
  }
  
  </script>
  