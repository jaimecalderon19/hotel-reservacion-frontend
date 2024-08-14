<template>
  <div class="congratulations-page">
    <h1>🎉 Congratulations! 🎉</h1>
    <p>You’ve reached this page successfully. Well done!</p>
    <h3>This a dummy protected page, just for fun!</h3>
    <div class="fireworks">
      <div v-for="n in 6" :key="n" class="firework"></div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped>
.congratulations-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f4f8;
  color: #333;
  position: relative;
  overflow: hidden;
}

h1 {
  font-size: 2.5rem;
  color: #2c7a7b;
}

p {
  font-size: 1.25rem;
  color: #505256;
}
h3 {
  font-size: 1rem;
  color: #6d6767;
}

.fireworks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.firework {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: #ff6f61;
  border-radius: 50%;
  animation: explode 1.5s ease-out infinite;
  opacity: 0;
}

.firework:nth-child(1) {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}
.firework:nth-child(2) {
  top: 30%;
  left: 75%;
  animation-delay: 0.3s;
}
.firework:nth-child(3) {
  top: 50%;
  left: 50%;
  animation-delay: 0.6s;
}
.firework:nth-child(4) {
  top: 70%;
  left: 30%;
  animation-delay: 0.9s;
}
.firework:nth-child(5) {
  top: 80%;
  left: 80%;
  animation-delay: 1.2s;
}
.firework:nth-child(6) {
  top: 60%;
  left: 40%;
  animation-delay: 1.5s;
}

@keyframes explode {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(2);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
</style>

<!-- <h2>This is a page thats you see with a dummy login auth.</h2> -->
