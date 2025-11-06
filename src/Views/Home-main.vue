<template>
  <section
    class="min-h-screen flex items-center justify-center relative overflow-hidden text-white font-poppins"
  >
       <audio ref=" bgMusic" src="/src/audio/music_zapsplat_easy_cheesy.mp3" autoplay loop></audio>
 

    <!-- Fundo animado com gradiente em movimento -->
    <div
      class="absolute inset-0 animate-gradient bg-gradient-to-br from-[#00B9EB] via-[#0097CC] to-[#004E7D] opacity-90"
    ></div>

    <!-- Efeito de luz dinâmico -->
    <div class="absolute inset-0">
      <div
        class="absolute w-72 h-72 bg-[#004E7D]/40 rounded-full blur-3xl top-10 left-20 animate-pulse"
      ></div>
      <div
        class="absolute w-72 h-72 bg-[#00B9EB]/30 rounded-full blur-3xl bottom-10 right-20 animate-pulse"
      ></div>
    </div>

    <!-- Conteúdo principal -->
    <div class="relative z-10 flex flex-col items-center space-y-12 text-center px-6">
      <!-- Título -->
      <div>
        <h1
          class="font-helvetica font-black text-6xl italic drop-shadow-2xl leading-tight"
        >
          <span class="text-white">EXPO</span>
          <span class="text-[#00B9EB]">JOVEM</span>
          <span class="block text-4xl mt-2 text-white/90">2025</span>
        </h1>
      </div>

      <!-- Subtítulo -->
      <div>
        <h1
          class="font-helvetica font-extrabold text-7xl drop-shadow-lg tracking-wide text-white"
        >
          BibleQuiz
        </h1>
        <p class="max-w-xl mt-4 text-lg text-gray-100 leading-relaxed">
          Testa o teu conhecimento, junta-te à diversão e vê o quanto sabes da
          <span
            class="font-semibold bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text"
            >Palavra de Deus!</span
          >
        </p>
      </div>

      <!-- Card do Ranking -->
      <div
        class="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl shadow-[#00B9EB]/30 transform hover:scale-[1.02] transition-all duration-500"
      >
        <h1
          class="text-center font-bold text-2xl mb-4 text-white drop-shadow-[0_0_10px_#00B9EB]/70"
        >
          🏆 Top 5 Jogadores
        </h1>

        <div
          v-for="(candidato, index) in candidatos"
          :key="index"
          class="flex justify-between items-center bg-gradient-to-r from-white/10 to-[#004E7D]/30 rounded-xl px-6 py-3 mb-3 border border-white/10 hover:border-[#00B9EB]/50 transition-all"
        >
          <div class="flex items-center space-x-3">
            <span class="text-2xl font-bold text-yellow-300"
              >#{{ index + 1 }}</span
            >
            <p class="font-semibold text-xl text-white">{{ candidato.nome }}</p>
          </div>
          <p class="font-semibold text-lg text-yellow-500">
            {{ candidato.pontos }} <span class="text-white">pts</span>
          </p>
        </div>
      </div>

      <!-- Botão Jogar -->
      <div class="flex flex-col items-center space-y-4">
        <button
          @click="irPara('/NomeExpo')"
          class="bg-gradient-to-r from-[#004E7D] to-[#00B9EB] text-white font-bold text-2xl px-10 py-4 rounded-full shadow-lg shadow-[#00B9EB]/40 hover:scale-105 hover:shadow-[#00B9EB]/60 transition-all duration-300"
        >
          🎮 Jogar Agora
        </button>
        <p class="text-lg text-gray-200 animate-pulse">
          Vê se consegues ultrapassar os teus amigos!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const candidatos = ref([
  { nome: "Makuka", nivel: "1", pontos: "1250" },
  { nome: "Edvaldo", nivel: "2", pontos: "1200" },
  { nome: "Marcelina", nivel: "3", pontos: "1190" },
  { nome: "Zípora", nivel: "4", pontos: "1050" },
  { nome: "Estefânia", nivel: "5", pontos: "1000" },
]);

function irPara(path) {
  router.push(path);
}
</script>

<style scoped>
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}
</style>
