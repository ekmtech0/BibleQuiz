<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-[#00B9EB] via-[#0097CC] to-[#004E7D] text-white font-poppins"
  >

      <audio  src="/src/audio/emotional-inspiring-corporate-298888.mp3" autoplay></audio>

    <!-- Efeito de fundo animado -->
    <div class="absolute inset-0">
      <div class="absolute w-80 h-80 bg-[#004E7D]/40 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
      <div class="absolute w-80 h-80 bg-[#00B9EB]/30 rounded-full blur-3xl bottom-10 right-20 animate-pulse"></div>
    </div>

    <!-- Conteúdo -->
    <div class="relative z-10 w-full max-w-md p-8 flex flex-col items-center space-y-8">
      <h1
        class="font-helvetica font-extrabold text-5xl sm:text-6xl drop-shadow-2xl tracking-wide animate-fadeIn"
      >
        Qual é o teu <span class="text-[#00B9EB]">nome?</span>
      </h1>

      <input
        v-model="playerName"
        type="text"
        placeholder="Ex: Victor"
        class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 w-full text-white text-lg placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-[#00B9EB]/40 focus:border-[#00B9EB] transition-all duration-300"
      />

      <button
        @click="comecarJogo"
        class="relative overflow-hidden bg-gradient-to-r from-[#004E7D] to-[#00B9EB] text-white text-xl font-bold px-10 py-4 rounded-full shadow-lg shadow-[#00B9EB]/40 hover:scale-105 hover:shadow-[#00B9EB]/60 transition-all duration-500"
      >
        <span class="relative z-10">Começar o Jogo 🎮</span>
        <span
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-700 ease-in-out"
        ></span>
      </button>

      <div class="space-y-1 text-gray-200">
        <p class="text-lg">O teu nome aparecerá no ranking final 🏆</p>
        <p class="text-lg italic text-[#00B9EB]/90">Boa sorte!</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const playerName = ref('')
const gameStarted = ref(false)

function comecarJogo() {
  if (playerName.value.trim() === '') {
    alert('Por favor, escreve o teu nome antes de começar!')
    return
  }
  localStorage.setItem('playerName', playerName.value)
  gameStarted.value = true
  router.push('JogoExpo')
}
</script>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 1s ease forwards;
}
</style>
