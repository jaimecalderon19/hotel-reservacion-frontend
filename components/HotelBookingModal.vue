<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    v-if="isOpen"
  >
    <div
      class="bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl w-full mx-4 sm:mx-8 lg:mx-16"
    >
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-1/2">
          <NotificationStatus :success="success" :warning="warning" />
          <img
            :src="reservation.image"
            alt="Hotel Image"
            class="w-full h-48 lg:h-full object-cover rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"
          />
          <div class="p-4 lg:p-6">
            <h3 class="text-xl font-bold text-gray-800">
              {{ reservation.name }}
            </h3>
            <p class="text-gray-600">{{ reservation.location }}</p>
            <p class="text-gray-400">
              {{ reservation.starRating }} <span>strellas</span>
            </p>
            <p class="text-blue-600 font-semibold">
              {{ reservation.pricePerNight }} /noche
            </p>
          </div>
        </div>

        <div class="w-full lg:w-1/2 p-6">
          <h2 class="text-2xl font-semibold mb-4">Hotel Reservation</h2>

          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Nombre completo</label
              >
              <input
                v-model="form.name"
                focus="clearError()"
                type="text"
                placeholder="Escriba su nombre"
                class="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
              <span v-if="errors.name" class="text-red-400 text-sm">{{
                errors.name
              }}</span>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Numero de telefono</label
              >
              <input
                v-model="form.contact"
                type="tel"
                placeholder="Escriba su telefono"
                class="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
              <span v-if="errors.contact" class="text-red-400 text-sm">{{
                errors.contact
              }}</span>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Methode de pago</label
              >
              <select
                v-model="form.paymentDetails"
                class="w-full h-12 rounded-md border border-gray-300 shadow-sm p-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>Elija un método de pago</option>
                <option  value="card">Targeta debito / credito</option>
                <option value="bank-transfer">Tranferencia bancaria</option>
                <option  value="cash">Efectivo</option>
              </select>
              <span v-if="errors.paymentDetails" class="text-red-400 text-sm">{{
                errors.paymentDetails
              }}</span>
            </div>

            <div
              class="flex flex-col-reverse lg:flex-row items-center justify-between"
            >
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 lg:mb-0"
              >
                Confirmar
              </button>
              <button
                @click="hideModal"
                type="button"
                class="text-red-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { InferType } from "yup";
import * as Yup from "yup";

const validationSchema = ref<Yup.ObjectSchema<InferType<typeof schema>> | null>(
  null,
);
const loadValidationSchema = async () => {
  if (!validationSchema.value) {
    const schema = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      contact: Yup.string()
        .required("Cellphone is required")
        .matches(/^\d+$/, "Cellphone must be a valid number"),
      paymentDetails: Yup.string().required("Payment method is required"),
    });
    validationSchema.value = schema;
  }
};

const form = reactive({
  name: "",
  contact: "",
  paymentDetails: "",
});

const errors = reactive({
  name: "",
  contact: "",
  paymentDetails: "",
});

const success = ref(false);
const warning = ref(false);
const closeModal = ref(false);
const response = ref<any>(null);

const props = defineProps<{
  isOpen?: boolean;
  reservation?: Record<string, any>;
}>();

const emit = defineEmits<{
  (event: "close", closeModal: boolean): void;
}>();

const hideModal = () => {
  emit("close", closeModal.value);
};

const handleSubmit = async () => {
  await loadValidationSchema();
  if (!validationSchema.value) return;

  try {
    await validationSchema.value.validate(form, { abortEarly: false });
    success.value = true;
    setTimeout(() => {
      resetForm();
    }, 2000);
    submitBooking();
  } catch (err) {
    handleValidationError(err);
    warning.value = true;
    setTimeout(() => {
      warning.value = false;
    }, 2000);
  }
};

const handleValidationError = (err: unknown) => {
  if (err instanceof Yup.ValidationError) {
    err.inner.forEach((error) => {
      if (error.path) {
        errors[error.path as keyof typeof errors] = error.message || "";
      }
    });
  }
};

const clearError = (field: keyof typeof errors) => {
  errors[field] = "";
};

const submitBooking = async () => {
  try {
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        cellphone: form.contact,
        payment: form.paymentDetails,
      }),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    response.value = await res.json();
  } catch (error) {
    console.log(error);
  }
};

const resetForm = () => {
  Object.keys(form).forEach((key) => (form[key as keyof typeof form] = ""));
  Object.keys(errors).forEach(
    (key) => (errors[key as keyof typeof errors] = ""),
  );
  success.value = false;
  hideModal();
};
</script>
