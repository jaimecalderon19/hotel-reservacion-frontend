<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia seccion con tu cuenta</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" @submit.prevent="validateAndLogin" >
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
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
      <span v-if="errors.password" class="text-red-500">{{
            errors.password
          }}</span>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      No tienes cuenta?
      <a href="/singUp" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Registrate Gratis</a>
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
  email?: string;
  password?: string;
}

const authenticationStore = AuthenticationStore();

const email = ref<string>("");
const password = ref<string>("");
const errors = ref<ValidationErrors>({});
const router = useRouter();
const route = useRoute();

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("correo es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

async function validateAndLogin(): Promise<void> {
  try {
    await schema.validate(
      { email: email.value, password: password.value },
      { abortEarly: false },
    );
    await login();
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

async function login(): Promise<void> {
  await authenticationStore.login({email: email.value, password: password.value});
  router.push({ name: "/" });
}

</script>
