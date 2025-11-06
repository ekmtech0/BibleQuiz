<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden font-poppins">
    <!-- Fundo animado -->
    <div class="absolute inset-0">
      <div class="absolute w-72 h-72 bg-[#004E7D]/40 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
      <div class="absolute w-72 h-72 bg-[#00B9EB]/30 rounded-full blur-3xl bottom-10 right-20 animate-pulse"></div>
      <div class="absolute w-96 h-96 bg-[#00B9EB]/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
    </div>

    <!-- Conteúdo principal -->
    <div class="relative z-10 text-center px-8 max-w-4xl">
      <!-- Título principal -->
      <h1 class="text-6xl font-helvetica font-black drop-shadow-2xl">
        {{ titulo }}
      </h1>

      <!-- Pontuação -->
      <h2 class="text-2xl mt-6 font-semibold text-gray-100 drop-shadow-md">
        Acertaste <span class="text-[#00B9EB] font-bold">{{ score }}</span> de <span class="text-white/90">{{ questions.length }}</span> perguntas
      </h2>

      <!-- Mensagem personalizada -->
      <p class="text-2xl mt-10 italic font-semibold text-white drop-shadow-md">
        {{ mensagem }}
      </p>

      <!-- Passagem bíblica -->
      <p class="mt-12 text-xl italic text-gray-200 drop-shadow-md">
        "{{ passagem.texto }}"
      </p>
      <p class="mt-2 font-semibold text-[#00B9EB]">{{ passagem.referencia }}</p>

      <!-- Botões -->
      <div class="mt-16 flex flex-col space-y-4 items-center">
        <button @click="restartQuiz"
                class="bg-gradient-to-r from-[#004E7D] to-[#00B9EB] text-white font-bold text-xl px-10 py-4 rounded-full shadow-lg shadow-[#00B9EB]/40 hover:scale-105 hover:shadow-[#00B9EB]/60 transition-all duration-300">
          🔁 Jogar novamente
        </button>
        <button @click="irPara('/')"
                class="bg-transparent border-2 border-white/40 hover:border-[#00B9EB] text-white font-semibold text-lg px-8 py-3 rounded-full transition-all duration-300">
          ⬅️ Voltar ao início
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const score = ref(0); // Pontuação final do jogador
const questions = ref([]); // Total de perguntas
const playerName = ref(localStorage.getItem("playerName") || "Jogador");

// Mensagens e passagens bíblicas por nível de desempenho
const resultado = computed(() => {
  if (score.value < 4) {
    return {
      titulo: "Não desanimes!",
      mensagem: "Ainda tens muito a aprender, mas com perseverança vais melhorar.",
      passagem: {
        texto: "O que despreza a correção despreza a sua própria alma, mas o que ouve a repreensão adquire entendimento.",
        referencia: "Provérbios 15:32"
      }
    }
  } else if (score.value < questions.value.length) {
    return {
      titulo: "Bom trabalho!",
      mensagem: "Estás a progredir! Continua a estudar e a aprofundar a tua fé.",
      passagem: {
        texto: "O coração do entendido adquire conhecimento, e o ouvido dos sábios busca conhecimento.",
        referencia: "Provérbios 18:15"
      }
    }
  } else {
    return {
      titulo: "🎉 Parabéns, conhecedor da Palavra!",
      mensagem: "Completaste todas as perguntas corretamente! Que a tua fé continue a crescer.",
      passagem: {
        texto: "O homem bom do bom tesouro do coração tira boas coisas, e o homem sábio do seu tesouro tira sabedoria.",
        referencia: "Lucas 6:45"
      }
    }
  }
});

// Computed para facilitar template
const titulo = computed(() => resultado.value.titulo);
const mensagem = computed(() => resultado.value.mensagem);
const passagem = computed(() => resultado.value.passagem);

// Funções
function restartQuiz() { router.push("/quiz"); } // Voltar para iniciar o quiz
function irPara(path) { router.push(path); }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
