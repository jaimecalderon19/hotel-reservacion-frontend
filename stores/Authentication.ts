import { defineStore } from "pinia"

import { useNuxtApp } from "nuxt/app"


export const AuthenticationStore = defineStore("authentication", {
  state: () => ({
    isAuthenticate: false as boolean,
    token: "" as string,
    user: {} as IAuth,
  }),
  persist: true,
  getters: {
  },
  actions: {
    async logout(): Promise<void> {
      this.$reset()
    },
    async login(formulario: ILogin): Promise<boolean> {
      const { $api, $toast } = useNuxtApp()
      
      console.error("Entro a la funcion");

      return $api.post("/auth/login", formulario)
        .then(result => {
          this.isAuthenticate = true
          this.user = result.user
          this.token = result.access_token
          
          console.log("llego arriba del toast");
          
          $toast.success("Iniciaste seccion con exito")

          return true
        })
        .catch(error => {
          console.log(error)
          this.$reset()
          $toast.error(error.data.message)

          return false
        })
    },

    async register(formulario: IRegister): Promise<boolean> {
      const { $api, $toast  } = useNuxtApp()
      
      return await $api.post("/auth/register", formulario)
        .then(result => {

          this.isAuthenticate = true
          this.user = result.user
          this.token = result.access_token

          $toast.success("Te has registrado con éxito",)
          return true;
          
        })
        .catch(async error => {
          if (error.response.status === 500)
            $toast.error(error.data.message)
          console.log(await error)

          return false
        })
    },
  },
})


interface ILogin {
  email: string
  password: string | number
}

interface IRegister {
    username:    string;
    lastName:    string;
    firstName:   string;
    phoneNumber: string;
    email:       string;
    password:    string;
}


export interface IAuth {
    username:    string;
    email:       string;
    password:    string;
    firstName:   string;
    lastName:    string;
    phoneNumber: string;
    role:        string;
    _id:         string;
    createdAt:   Date;
    updatedAt:   Date;
}
