<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden font-poppins px-6">
    <!-- 🎵 Música de fundo -->
    <audio ref="bgMusic" src="/src/audio/emotional-inspiring-corporate-298888.mp3" loop></audio>

    <!-- ✅ Som de acerto -->
    <audio ref="correctSound" src="/src/audio/successed-295058.mp3"></audio>

    <!-- ❌ Som de erro -->
    <audio ref="errorSound" src="/src/audio/spin-fail-295088.mp3"></audio>

    <!-- Fundo animado -->
    <div class="absolute inset-0">
      <div class="absolute w-72 h-72 bg-[#004E7D]/40 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
      <div class="absolute w-72 h-72 bg-[#00B9EB]/30 rounded-full blur-3xl bottom-10 right-20 animate-pulse"></div>
      <div class="absolute w-96 h-96 bg-[#00B9EB]/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
    </div>

    <!-- Conteúdo principal -->
    <div class="relative z-10 w-full max-w-4xl text-center">
      
      <!-- QUIZ ATIVO -->
      <div v-if="!quizEnded">
        <p class="text-lg md:text-2xl mb-6 font-medium tracking-wide">
          Pergunta {{ currentQuestion + 1 }} / {{ questions.length }}
        </p>

        <div class="w-full bg-white/10 rounded-full h-3 mb-12 overflow-hidden">
          <div class="h-full bg-gradient-to-r from-[#00B9EB] to-[#004E7D] transition-all duration-700 ease-out"
               :style="{ width: ((currentQuestion + 1) / questions.length) * 100 + '%' }"></div>
        </div>

        <div class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-10 transition-all duration-500 hover:shadow-[#004E7D]/50">
          <h1 class="text-3xl md:text-4xl font-extrabold mb-10 leading-snug">
            {{ questions[currentQuestion].question }}
          </h1>

          <div class="flex flex-col space-y-6 mt-4">
            <button v-for="option in questions[currentQuestion].options" :key="option"
                    @click="checkAnswer(option)"
                    class="relative py-4 px-6 rounded-2xl text-xl transition-all duration-300
                           border border-white/20 hover:scale-105 hover:border-[#00B9EB]
                           hover:bg-gradient-to-r hover:from-[#004E7D]/30 hover:to-[#00B9EB]/30
                           font-semibold"
                    :class="{
                      'bg-green-500/30 border-green-400 text-green-200 scale-105': showFeedback && option === questions[currentQuestion].correct,
                      'bg-red-500/30 border-red-400 text-red-200 scale-95': showFeedback && option !== questions[currentQuestion].correct && option === selected
                    }"
                    :disabled="showFeedback"
            >
              {{ option }}
              <span v-if="showFeedback && option === questions[currentQuestion].correct"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-green-300 text-2xl">✓</span>
              <span v-if="showFeedback && option === selected && option !== questions[currentQuestion].correct"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-red-300 text-2xl">✗</span>
            </button>
          </div>

          <transition name="fade">
            <div v-if="showFeedback" class="mt-12">
              <button @click="nextQuestion"
                      class="bg-gradient-to-r from-[#004E7D] to-[#00B9EB] hover:opacity-90
                             px-8 py-3 rounded-2xl text-xl font-bold tracking-wide shadow-lg shadow-[#004E7D]/40
                             transition-all duration-300 hover:scale-105">
                Próxima pergunta →
              </button>
            </div>
          </transition>
        </div>
      </div>

      <!-- TELA FINAL -->
      <div v-else>
        <h1 class="text-6xl font-helvetica font-black drop-shadow-2xl">
          {{ resultado.titulo }}, {{ playerName }}!
        </h1>

        <h2 class="text-2xl mt-6 font-semibold text-gray-100 drop-shadow-md">
          Acertaste <span class="text-[#00B9EB] font-bold">{{ score }}</span> de <span class="text-white/90">{{ questions.length }}</span> perguntas
        </h2>

        <p class="text-2xl mt-10 italic font-semibold text-white drop-shadow-md">
          {{ resultado.mensagem }}
        </p>

        <p class="mt-12 text-xl italic text-gray-200 drop-shadow-md">
          "{{ resultado.passagem.texto }}"
        </p>
        <p class="mt-2 font-semibold text-[#00B9EB]">{{ resultado.passagem.referencia }}</p>

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
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const playerName = ref(localStorage.getItem("playerName") || "Jogador");

// 🔊 Refs dos áudios
const bgMusic = ref(null);
const correctSound = ref(null);
const errorSound = ref(null);

// QUESTÕES
const allQuestions = [
  { question: "Quem construiu a Arca?", options: ["Abraão", "Moises", "Noé", "José"], correct: "Noé" },
  { question: "Quem libertou o povo de Israel do Egito?", options: ["Davi", "Moisés", "Elias", "Josué"], correct: "Moisés" },
  { question: "Qual foi o primeiro milagre de Jesus?", options: ["Curar um cego", "Andar sobre as águas", "Transformar água em vinho", "Ressuscitar Lázaro"], correct: "Transformar água em vinho" },
  { question: "Quem foi engolido por um grande peixe?", options: ["Pedro", "Jonas", "José", "Elias"], correct: "Jonas" },
  { question: "Quantos dias durou o dilúvio?", options: ["20 dias", "40 dias", "60 dias", "100 dias"], correct: "40 dias" },
  { question: "Quem traiu Jesus por 30 moedas de prata?", options: ["Pedro", "Judas", "Tomé", "André"], correct: "Judas" },
  { question: "Em que cidade nasceu Jesus?", options: ["Nazaré", "Jerusalém", "Belém", "Samaria"], correct: "Belém" }
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const questions = ref(shuffle([...allQuestions]));
const currentQuestion = ref(0);
const score = ref(0);
const selected = ref(null);
const showFeedback = ref(false);
const quizEnded = ref(false);

// 🎯 RESULTADO FINAL
const resultado = computed(() => {
  if (score.value < 4) {
    return {
      titulo: "Não desanimes",
      mensagem: "Ainda tens muito a aprender, mas com perseverança vais melhorar.",
      passagem: {
        texto: "O que despreza a correção despreza a sua própria alma, mas o que ouve a repreensão adquire entendimento.",
        referencia: "Provérbios 15:32"
      }
    };
  } else if (score.value < questions.value.length) {
    return {
      titulo: "Bom trabalho",
      mensagem: "Estás a progredir! Continua a estudar e a aprofundar a tua fé.",
      passagem: {
        texto: "O coração do entendido adquire conhecimento, e o ouvido dos sábios busca conhecimento.",
        referencia: "Provérbios 18:15"
      }
    };
  } else {
    return {
      titulo: "🎉 Parabéns, conhecedor da Palavra",
      mensagem: "Completaste todas as perguntas corretamente! Que a tua fé continue a crescer.",
      passagem: {
        texto: "O homem bom do bom tesouro do coração tira boas coisas, e o homem sábio do seu tesouro tira sabedoria.",
        referencia: "Lucas 6:45"
      }
    };
  }
});

// ✅ FUNÇÕES
function checkAnswer(option) {
  selected.value = option;
  showFeedback.value = true;
  if (option === questions.value[currentQuestion.value].correct) {
    score.value++;
    correctSound.value?.play();
  } else {
    errorSound.value?.play();
  }
}

function nextQuestion() {
  showFeedback.value = false;
  selected.value = null;
  if (currentQuestion.value < questions.value.length - 1) currentQuestion.value++;
  else quizEnded.value = true;
}

function restartQuiz() {
  score.value = 0;
  currentQuestion.value = 0;
  quizEnded.value = false;
  showFeedback.value = false;
  selected.value = null;
  questions.value = shuffle([...allQuestions]);
}

onMounted(() => {
  // O Chrome só permite autoplay após interação
  const tryPlay = () => {
    bgMusic.value.volume = 0.6;
    bgMusic.value.play().catch(() => {});
    window.removeEventListener("click", tryPlay);
  };
  window.addEventListener("click", tryPlay);
});

function irPara(path) {
  router.push(path);
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
