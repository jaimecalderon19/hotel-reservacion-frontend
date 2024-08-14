import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from "vue-router";




interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  // Função de login
  async function login(email: string, password: string) {
    try {
      // Simulação de uma requisição de login
      const response = await fakeApiLogin(email, password);
      user.value = response.user;
      token.value = response.token;

      // Armazenar o token em localStorage ou cookies, se necessário
      localStorage.setItem('authToken', response.token);
      console.log('HERE ', router);
      
      router.push("/dummylogin");
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  // Função de logout
  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('authToken');
  }

  // Função para carregar o estado inicial
  function loadUser() {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      // Simulação de um carregamento de usuário
      token.value = savedToken;
      user.value = { id: '1', name: 'Olindo Mendes', email: 'olindo@mendes.com' };
    }
  }

  return {
    user,
    token,
    login,
    logout,
    loadUser,
  };
});

async function fakeApiLogin(email: string, password: string) {
  return new Promise<{ user: User; token: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: '1', name: 'Olindo Mendes', email: 'olindo@mendes.com' },
        token: 'fake-jwt-token',
      });
    }, 1000);
  });
}


