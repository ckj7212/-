/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function exportToStandaloneHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>초등학교 6학년 과학 [우리 몸의 구조와 기능]</title>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Nanum+Gothic:wght@400;700;800&family=Nanum+Pen+Script&display=swap" rel="stylesheet">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Nanum Gothic"', 'sans-serif'],
            hand: ['"Gaegu"', 'cursive'],
            pen: ['"Nanum Pen Script"', 'cursive']
          },
          animation: {
            'bounce-slow': 'bounce 3s infinite',
            'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'fade-in': 'fadeIn 0.4s ease-out forwards',
            'scale-up': 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0', transform: 'translateY(10px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' }
            },
            scaleUp: {
              '0%': { opacity: '0', transform: 'scale(0.9)' },
              '100%': { opacity: '1', transform: 'scale(1)' }
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: #f0f7ff;
      user-select: none;
    }
    .custom-scroll::-webkit-scrollbar {
      width: 8px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 9999px;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 9999px;
    }
    .custom-scroll::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  </style>
</head>
<body class="font-sans antialiased text-slate-800 min-h-screen flex flex-col">

  <!-- TOP DECORATIVE HEADER -->
  <header class="bg-indigo-600 text-white shadow-md p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b-4 border-indigo-700">
    <div class="flex items-center gap-3">
      <div class="bg-white text-indigo-600 p-2.5 rounded-2xl font-bold text-2xl shadow-inner">🧬</div>
      <div>
        <h1 class="text-xl md:text-2xl font-black tracking-tight font-hand">초등 6학년 과학 | 생물의 구조와 기능</h1>
        <p class="text-xs text-indigo-100 font-medium">우리 몸의 주요 건강 기관 탐구 & 생명 토론 공방</p>
      </div>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      <button onclick="toggleFullscreen()" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1">
        <i data-lucide="maximize" class="w-4 h-4"></i> 전체화면 모드
      </button>
      <button onclick="toggleTeacherMode()" class="px-4 py-2 bg-amber-500 hover:bg-amber-400 font-bold text-xs rounded-xl transition-all shadow-md text-amber-950 flex items-center gap-1 border-b-2 border-amber-600">
        <i data-lucide="graduation-cap" class="w-4 h-4"></i> 교사용 자료실
      </button>
      <button onclick="restartAll()" class="px-4 py-2 bg-rose-500 hover:bg-rose-400 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1 border-b-2 border-rose-600">
        <i data-lucide="refresh-cw" class="w-4 h-4"></i> 다시 시작하기
      </button>
    </div>
  </header>

  <!-- PROGRESS INDICATOR BAR -->
  <div class="bg-indigo-50 border-b border-indigo-100 px-6 py-3 flex justify-center items-center gap-4">
    <div id="prog-step-1" class="flex items-center gap-1.5 text-xs md:text-sm font-bold text-indigo-600 transition-all">
      <span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
      <span>기관 탐구하기</span>
    </div>
    <div class="h-0.5 w-12 bg-slate-300"></div>
    <div id="prog-step-2" class="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400 transition-all">
      <span class="w-6 h-6 rounded-full bg-slate-300 text-white-500 flex items-center justify-center text-xs">2</span>
      <span>기관 월드컵</span>
    </div>
    <div class="h-0.5 w-12 bg-slate-300"></div>
    <div id="prog-step-3" class="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400 transition-all">
      <span class="w-6 h-6 rounded-full bg-slate-300 text-white-500 flex items-center justify-center text-xs">3</span>
      <span>연결과 일치화</span>
    </div>
  </div>

  <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-8">
    
    <!-- TEACHER MODE INTERACTIVE SHELF (HIDDEN BY DEFAULT) -->
    <section id="teacher-shelf" class="hidden bg-white rounded-3xl shadow-xl border-4 border-indigo-400 overflow-hidden mb-8 animate-fade-in">
      <div class="bg-gradient-to-r from-indigo-600 to-indigo-500 p-5 text-white flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="book-open" class="w-6 h-6"></i>
          <div>
            <h3 class="text-lg font-bold font-hand">교사용 활동 안내 & 복습 퀴즈</h3>
            <p class="text-xs text-indigo-100">수업 진도를 매끄럽게 보조하는 6학년 과학 나침반</p>
          </div>
        </div>
        <button onclick="toggleTeacherMode()" class="text-white hover:text-red-200">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
      </div>
      <div class="p-6 space-y-6">
        <div class="grid md:grid-cols-2 gap-5">
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <h4 class="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500"></i> 단원 지도 팁
            </h4>
            <ul class="text-xs space-y-1.5 text-slate-600 list-disc pl-4">
              <li><strong>STEP 1:</strong> 학생들에게 카드 속 자기소개를 소리 내어 읽히고, 조사 질문 3가지를 대답해 보도록 하세요.</li>
              <li><strong>STEP 2 (월드컵):</strong> 칠판에 찬성/반대 표를 그리며 "어느 것이 정말 더 생명 유지에 중요할지" 열렬한 토론을 장려하세요.</li>
              <li><strong>STEP 3 (연결망):</strong> 기관들이 결코 동떨어진 존재가 아니라 연결된 '시스템'임을 강조해 주시면 풍성한 일반화에 도달합니다.</li>
            </ul>
          </div>
          <div class="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-3">
            <h4 class="font-bold text-sm text-amber-950 flex items-center gap-1.5">
              <i data-lucide="award" class="w-4 h-4 text-amber-600"></i> 즉석 6학년 형성평가
            </h4>
            <div id="quiz-box" class="space-y-2 text-xs">
              <p id="quiz-question" class="font-bold text-slate-950"></p>
              <div id="quiz-options" class="grid gap-1.5"></div>
              <p id="quiz-feedback" class="hidden font-bold p-2.5 rounded-lg border text-xs mt-1"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STEP 1: ORGAN EXPLORATION -->
    <section id="step-1-section" class="space-y-8 animate-fade-in">
      <div class="text-center space-y-2">
        <h2 class="text-3xl md:text-4xl font-extrabold text-indigo-900 tracking-tight font-hand">우리 몸 기관 긴급 브리핑 📢</h2>
        <p class="text-slate-600 font-medium text-sm md:text-base">카드를 누르면 각 기관의 목소리로 자기소개와 주요 기능을 들려줍니다.</p>
      </div>

      <!-- GRID OF 8 CARDS -->
      <div id="organs-grid" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>

      <!-- RESEARCH QUESTIONS BOTTOM PANEL -->
      <div class="bg-white rounded-3xl p-6 md:p-8 shadow-md border-2 border-dashed border-indigo-300 max-w-4xl mx-auto space-y-4">
        <div class="flex items-center gap-2 border-b border-indigo-100 pb-3">
          <span class="text-2xl">📝</span>
          <h3 class="text-lg font-bold text-indigo-900">기관 탐구 관찰 질문 (배움 공책에 채워 보아요!)</h3>
        </div>
        <div class="grid md:grid-cols-3 gap-4 text-sm font-semibold text-slate-700">
          <div class="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/40">
            <span class="text-indigo-600 font-black mr-1 block text-lg">① 질문 하나</span>
            <p className="mt-0.5 text-slate-700">이 기관은 주로 어떤 유익한 일을 우리 몸에서 하나요?</p>
          </div>
          <div class="bg-pink-50/50 p-4 rounded-2xl border border-pink-100/40">
            <span class="text-pink-600 font-black mr-1 block text-lg">② 질문 둘</span>
            <p className="mt-0.5 text-slate-700">그 기능은 어떤 신체 작용과 구조로 이루어지나요?</p>
          </div>
          <div class="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/40">
            <span class="text-amber-700 font-black mr-1 block text-lg">③ 질문 셋</span>
            <p className="mt-0.5 text-slate-700">만약 이 기관이 감기에 걸리거나 아예 없다면 몸에 어떤 불상사가 생길까요?</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center pt-4">
        <button onclick="startWorldCup()" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95 text-white font-extrabold text-lg rounded-2xl transition-all shadow-lg flex items-center gap-2 border-b-4 border-indigo-800">
          우리 몸 기관 월드컵 시작하기 🏆 <i data-lucide="chevron-right"></i>
        </button>
      </div>
    </section>

    <!-- STEP 2: TOURNAMENT WORLD CUP -->
    <section id="step-2-section" class="hidden space-y-8 animate-fade-in">
      <div class="text-center space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 border border-rose-200 rounded-full text-rose-700 text-xs font-bold font-hand uppercase">
          Tournament Game
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 font-hand">우리 몸 기관 월드컵 🏆</h2>
        <p class="text-slate-600 text-sm md:text-base">생명 유지와 인류 생존에 더 중요하다고 생각하는 핵심 기관을 토론하여 직접 클릭해 선택하세요!</p>
      </div>

      {/* MATCH PLAYGROUND */}
      <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border-4 border-rose-300 overflow-hidden">
        <div class="bg-rose-500 text-white p-4 text-center font-bold text-sm md:text-base flex justify-between items-center px-6 border-b-4 border-rose-600">
          <div id="match-round-title" class="font-hand text-lg"></div>
          <div class="bg-white/20 px-3 py-1 rounded-full text-xs" id="match-badge">8강 대결</div>
        </div>

        <div class="p-6 md:p-8 flex flex-col md:flex-row items-stretch justify-center gap-6 relative min-h-[350px]">
          
          <!-- LEFT CONTENDER -->
          <div id="left-card" onclick="selectWinner('left')" class="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-rose-50 hover:to-rose-100/30 ring-2 ring-slate-200 hover:ring-rose-400 p-6 md:p-8 rounded-2xl flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none">
            <div id="left-emoji" class="text-7xl mb-4 transition-transform duration-300 transform"></div>
            <div class="space-y-2">
              <h3 id="left-name" class="text-2xl md:text-3xl font-black text-slate-900 font-hand"></h3>
              <p id="left-desc" class="text-xs md:text-sm font-semibold text-rose-600 max-w-xs mt-1 block"></p>
            </div>
            <div class="mt-6 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm tracking-wide">
              이 기관을 다음 라운드로 진출시킵니다! 👍
            </div>
          </div>

          <!-- VS LOGO MIDDLE -->
          <div class="flex items-center justify-center font-black text-4xl text-rose-500 font-hand py-2 select-none">
            VS
          </div>

          <!-- RIGHT CONTENDER -->
          <div id="right-card" onclick="selectWinner('right')" class="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-rose-50 hover:to-rose-100/30 ring-2 ring-slate-200 hover:ring-rose-400 p-6 md:p-8 rounded-2xl flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none">
            <div id="right-emoji" class="text-7xl mb-4 transition-transform duration-300 transform"></div>
            <div class="space-y-2">
              <h3 id="right-name" class="text-2xl md:text-3xl font-black text-slate-900 font-hand"></h3>
              <p id="right-desc" class="text-xs md:text-sm font-semibold text-rose-600 max-w-xs mt-1 block"></p>
            </div>
            <div class="mt-6 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm tracking-wide">
              이 기관을 다음 라운드로 진출시킵니다! 👍
            </div>
          </div>

        </div>

        {/* TOURNAMENT DISCUSSION QUESTIONS */}
        <div class="p-6 bg-slate-50 border-t border-slate-200">
          <div class="max-w-xl mx-auto space-y-3">
            <div class="flex items-center gap-1.5 text-rose-600 font-bold text-sm">
              <i data-lucide="messages-square" class="w-5 h-5"></i>
              <span>친구들과 함께 나누는 월드컵 맞장 토론 질문</span>
            </div>
            <ol class="text-xs text-slate-600 font-semibold space-y-1 list-decimal pl-5">
              <li>더 이상 살아가기 위해 절대 포기할 수 없는 단 하나의 기관은 누구일까요?</li>
              <li>그렇게 생각하는 타당한 이유나 구체적 사례(일상 활동 등)를 발표해 보세요.</li>
              <li>만약 이 두 기관 중 하나만 남아 작동하게 되면 다른 부품 기관들에 어떤 영향이 생길까요?</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- VISUAL TOURNAMENT MAP -->
      <div class="max-w-md mx-auto bg-white/70 p-4 rounded-2xl border border-rose-200/50 flex flex-col gap-2 items-center">
        <h4 class="text-xs font-bold text-rose-850">월드컵 토너먼트 진행 판넬</h4>
        <div id="tournament-track" class="flex justify-center gap-1 flex-wrap"></div>
      </div>
    </section>

    <!-- STEP 3: FINAL DISCUSSION & NETWORK GRAPH -->
    <section id="step-3-section" class="hidden space-y-8 animate-fade-in">
      <div class="text-center space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-xs font-bold font-hand uppercase">
          Final Discovery
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-emerald-950 font-hand">축하합니다! 대망의 우승 기관 탄생 🏆</h2>
        <p class="text-slate-600 text-sm md:text-base">우리 반 토론 결말: 명예의 우승 기관을 확인해 보세요!</p>
      </div>

      <!-- WINNER CARD SHINE -->
      <div class="max-w-md mx-auto bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-900 border-4 border-yellow-300 p-6 md:p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden animate-scale-up">
        <div class="absolute -top-12 -right-12 w-28 h-28 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-28 h-28 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
        <div class="text-7xl mb-3" id="victory-emoji">🧠</div>
        <h3 class="text-3xl font-black font-hand" id="victory-title">우승: 뇌!</h3>
        <p class="text-xs font-extrabold text-amber-950 tracking-wider bg-white/40 mt-1.5 px-3 py-1 rounded-full inline-block" id="victory-oneline"></p>
        
        <div class="bg-white/80 p-4 rounded-xl text-xs font-bold text-slate-800 mt-4 border border-yellow-200">
          <p class="text-emerald-700 font-extrabold text-sm mb-1">📢 정말 우승 기관 하나만 있으면 살아갈 수 있을까요?</p>
          <p className="text-slate-700 leading-relaxed">뇌가 아무리 똑똑해도 산소를 주는 '폐'가 없거나 피를 내뿜는 '심장'이 없으면 작동할 수 없으며, 단백질을 소화할 '위'와 '소장'이 없으면 영양소를 공급받지 못해 무용지물이 됩니다.</p>
        </div>
      </div>

      <!-- INTERACTIVE NETWORK MAP -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-emerald-500">
        <div class="bg-emerald-600 text-white p-4 font-bold text-sm md:text-base flex justify-between items-center px-6">
          <h3 class="font-hand text-lg flex items-center gap-1"><i data-lucide="network"></i> 우리 몸 기관 유기적 연결 관계도</h3>
          <span class="text-xs bg-white/20 px-3 py-1 rounded-full">노드를 클릭해 보세요!</span>
        </div>
        <div class="p-4 md:p-6 grid md:grid-cols-4 gap-6">
          
          <div class="md:col-span-3 flex flex-col items-center justify-center bg-slate-950/5 rounded-2xl p-2 relative h-[500px] border border-slate-200">
            <!-- CANVAS FOR SVG CONNECTION LINES -->
            <svg id="network-svg" class="absolute inset-0 w-full h-full pointer-events-none z-10"></svg>
            
            <!-- FLOATING ORGAN NODES -->
            <div id="network-nodes" class="absolute inset-0 z-20"></div>
          </div>

          <!-- CONNECTIONS DETAIL DRAWER -->
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between h-[500px]">
            <div class="space-y-4">
              <h4 class="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">🧬 연결 설명서</h4>
              <div id="connection-detail" class="text-xs font-semibold text-slate-600 leading-relaxed space-y-3">
                <p class="text-slate-500 italic">왼쪽 관계도의 기관 노드(버튼)를 마우스로 사뿐히 클릭해 보거나, 우리 몸 연결선을 터치해서 기관들이 어떻게 협업하고 힘을 보태는지 직접 관찰해 보세요!</p>
              </div>
            </div>
            
            <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-200/50">
              <p class="text-[11px] text-emerald-800 font-bold leading-normal">
                💡 <strong>뼈 ↔ 근육</strong>처럼 서로가 없으면 움직일 가치를 잃는 밀접한 세트가 가득하답니다.
              </p>
            </div>
          </div>

        </div>
      </div>

      <!-- FINAL CORE TRUTH PANELS -->
      <div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 md:p-8 text-center shadow-lg space-y-4 max-w-4xl mx-auto border-b-4 border-emerald-700">
        <div class="text-3xl">🧩 우리 수업 핵심 일반화 발견</div>
        <p class="text-xl md:text-2xl font-black font-hand leading-snug tracking-tight">
          "우리 몸의 기관은 각각 정말 중요하고 고유한 기능을 수행하며, 결코 홀로 존재하지 않고 항상 긴밀하게 협력하여 생명 활동을 안전하게 구성합니다!"
        </p>
        <div class="text-xs text-emerald-100 font-medium">6학년 과학 | 생물의 구조와 기능 | 탐구 마침</div>
      </div>

      <!-- HISTORY HALL OF FAME -->
      <div id="hall-of-fame-box" class="max-w-xl mx-auto bg-white/70 p-4 rounded-2xl border border-slate-200 hidden">
        <h4 class="text-xs font-bold text-indigo-900 mb-2 border-b pb-1 flex items-center gap-1">
          <i data-lucide="history" class="w-3.5 h-3.5"></i> 우리 반 역대 우승 기록실
        </h4>
        <div id="history-list" class="text-[11px] text-slate-600 space-y-1 max-h-[100px] overflow-y-auto"></div>
      </div>
    </section>

  </main>

  <footer class="bg-slate-900 text-slate-400 text-xs py-6 px-4 border-t border-slate-800 text-center mt-auto space-y-1">
    <p class="font-semibold text-slate-300">초등학교 6학년 과학 디지털 교과서 보조용 웹 애플리케이션</p>
    <p>본 앱은 학생 참여형 프로젝트 학습용 웹 프로그램입니다. 전체 화면과 Standalone 무설치 작동을 완벽 연동합니다.</p>
  </footer>

  <!-- DYNAMIC VIDEO MODAL POPUP -->
  <div id="video-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
    <div class="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden border-4 border-emerald-500 shadow-2xl flex flex-col">
      <div class="bg-emerald-600 text-white p-4 flex justify-between items-center px-6">
        <h4 class="font-bold text-sm md:text-base font-hand" id="modal-video-title"></h4>
        <button onclick="closeVideoModal()" class="text-white hover:text-emerald-100"><i data-lucide="x"></i></button>
      </div>
      <div class="bg-black flex items-center justify-center aspect-video">
        <video id="modal-video-element" controls src="" class="w-full h-full object-contain"></video>
      </div>
      <div class="p-4 bg-slate-50 border-t border-slate-200 text-xs flex justify-between items-center">
        <span>📽️ 관찰하고 관찰 일지에 기록하세요.</span>
        <button onclick="changeMockVideoUrl()" class="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg font-bold">영상 URL 변경</button>
      </div>
    </div>
  </div>

  <script>
    // DATA DECLARATION
    const ORGANS_DATA = [
      { id: 'brain', name: '뇌', emoji: '🧠', bgColor: 'bg-indigo-100 border-indigo-400 text-indigo-700', intro: '안녕하세요! 저는 뇌입니다. 우리 몸의 최고 사령탑이자 컴퓨터예요! 생각하고, 느끼고, 다른 모든 기관을 조절해요.', functions: ['감각 자극을 해석하고 판단해요.', '몸의 움직임을 총괄 명령해요.', '기억, 학습, 감정을 만들어내요.'], oneline: '우리 몸의 최고 사령사로서 생각하고 기관들을 조종함', video: 'https://assets.mixkit.co/videos/preview/mixkit-top-angle-of-a-man-working-on-his-computer-42358-large.mp4' },
      { id: 'heart', name: '심장', emoji: '❤️', bgColor: 'bg-rose-100 border-rose-400 text-rose-700', intro: '안녕하세요! 저는 심장입니다. 저는 강력한 우리 몸의 펌프예요. 쉬지 않고 뛰며 온몸으로 피를 보냅니다.', functions: ['혈액을 온몸으로 순환시키는 펌프 역할을 해요.', '산소와 귀중한 영양소를 공급해요.', '이산화탄소와 노폐물을 수송해요.'], oneline: '온몸으로 혈액을 순환시켜 산소와 영양분을 날라줌', video: 'https://assets.mixkit.co/videos/preview/mixkit-healthy-heart-rate-monitor-glowing-neon-cardiogram-41916-large.mp4' },
      { id: 'lungs', name: '폐', emoji: '🫁', bgColor: 'bg-emerald-100 border-emerald-400 text-emerald-700', intro: '안녕하세요! 저는 폐입니다. 가슴속에 안전히 들어 있는 공기 정화원이에요. 상쾌하게 숨을 쉬지요.', functions: ['공기 중에서 힘차게 산소를 들이마셔요.', '몸속에 쌓인 이산화탄소를 내보내요.', '호흡 운동을 전담해요.'], oneline: '산소를 흡수하고 이산화탄소를 내보내는 호흡을 맡음', video: 'https://assets.mixkit.co/videos/preview/mixkit-waves-on-the-surface-of-water-under-sunlight-41800-large.mp4' },
      { id: 'stomach', name: '위', emoji: '😋', bgColor: 'bg-amber-100 border-amber-400 text-amber-700', intro: '안녕하세요! 저는 위입니다. 신축성 좋은 소화 주머니이자 믹서기로서 음식물을 잘게 부숴요.', functions: ['강한 위산으로 나쁜 세균들을 물리쳐요.', '음식물을 부드럽고 묽직한 죽으로 주물러요.', '단백질 영양소를 소화하기 시작해요.'], oneline: '음식물을 부수며 나쁜 세균을 소독하고 1차 소화를 함', video: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-orange-juice-into-a-glass-from-a-pitcher-41893-large.mp4' },
      { id: 'small_intestine', name: '소장', emoji: '🌀', bgColor: 'bg-orange-100 border-orange-400 text-orange-700', intro: '안녕하세요! 저는 소장입니다. 꼬불꼬불 길게 늘어선 우리 몸 최고의 알짜배기 영양 융카펫이에요.', functions: ['위에서 넘어온 음식물을 완벽하게 다 소화해요.', '안쪽 벽의 수많은 융털로 거의 전 영양소를 흡수해요.', '흡수한 영양분을 피에 실어 전 장기로 배달해요.'], oneline: '대부분의 음식 영양분을 최종 소화 및 융털로 흡수함', video: 'https://assets.mixkit.co/videos/preview/mixkit-water-flowing-through-natural-rocks-and-stream-41846-large.mp4' },
      { id: 'kidney', name: '신장', emoji: '💧', bgColor: 'bg-sky-100 border-sky-400 text-sky-700', intro: '안녕하세요! 저는 신장(콩팥)입니다. 허리 뒤쪽에 있는 우리 몸 최고의 맑은 정밀 정수기예요.', functions: ['피속에 녹아있는 각종 찌꺼기를 필터링해요.', '노폐물을 모아 소변으로 만들어 배출해요.', '수분과 염분 농도를 정밀하게 조절해 줘요.'], oneline: '핏속의 노폐물을 청소해 오줌을 만들어 보내고 청소함', video: 'https://assets.mixkit.co/videos/preview/mixkit-glass-of-water-being-filled-from-a-filtration-pitcher-41885-large.mp4' },
      { id: 'bones', name: '뼈', emoji: '🦴', bgColor: 'bg-stone-100 border-stone-400 text-stone-700', intro: '안녕하세요! 저는 뼈입니다. 매우 단단해서 몸을 당당히 서 있게 지탱해 주는 기둥이에요.', functions: ['우리 몸의 형태를 만들고 골격을 설계해요.', '뇌, 심장, 폐 같은 다치기 쉬운 속살을 지켜내요.', '몸의 뼈대를 제공해 주는 소중한 틀이랍니다.'], oneline: '몸을 단단하게 세팅해주고 내부 중요 장기관을 기가 막히게 세이브함', video: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-making-clay-sculpture-41926-large.mp4' },
      { id: 'muscles', name: '근육', emoji: '💪', bgColor: 'bg-red-100 border-red-400 text-red-700', intro: '안녕하세요! 저는 근육입니다. 부드러운 고무줄 모터처럼 뼈를 잡아 늘이고 줄어들게 하여 기동시켜요.', functions: ['뼈를 정밀하게 끌어당겨 걷고, 날고, 쥐게 만들어요.', '심장이나 위가 살아서 조물조물 움직이도록 보조해요.', '부르르 흔들려 체온을 항상 훈훈하게 유지해 줘요.'], oneline: '수축과 이완을 통해 뼈를 끌어당겨 실제 운동들을 가능하게 함', video: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-with-battle-ropes-at-the-gym-41913-large.mp4' }
    ];

    const COORDINATES = {
      brain: { x: 50, y: 12 }, lungs: { x: 30, y: 38 }, heart: { x: 50, y: 38 }, stomach: { x: 70, y: 38 },
      kidney: { x: 32, y: 64 }, small_intestine: { x: 68, y: 64 }, bones: { x: 25, y: 88 }, muscles: { x: 75, y: 88 }
    };

    const CONNECTIONS = [
      { from: 'lungs', to: 'heart', desc: '폐에서 마신 깨끗한 산소를 피에 가득 실어 심장으로 보냅니다. 심장은 이 고마운 산소 피를 온 세포로 돌립니다.' },
      { from: 'stomach', to: 'small_intestine', desc: '위에서 1차 소독되고 잘게 부서진 걸쭉한 음식물 조각들을 소장으로 보내 마지막 고농축 흡수를 시킵니다.' },
      { from: 'small_intestine', to: 'heart', desc: '소장이 융털로 빨아들인 풍부한 알짜배기 영양소를 혈액에 실어 심장으로 넘기면, 심장은 이를 온몸 세포 보조용으로 뿜어줍니다.' },
      { from: 'brain', to: 'lungs', desc: '뇌가 스스로 가슴 근육을 수축시켜 숨을 쉬게 하므로, 우리가 잠자는 순간에도 멈추지 않고 폐가 기체 교환을 할 수 있게 중재합니다.' },
      { from: 'brain', to: 'heart', desc: '체육 시간에 열심히 달리거나 긴장하면, 뇌령에 의해 심장이 무겁고 신속하게 뛰어 근육 공급을 보좌합니다.' },
      { from: 'brain', to: 'stomach', desc: '마음에 드는 급식을 보면 뇌 속 식욕 중추가 바로 반응하여 미리 침이 고이고 위장을 가동하게 신호를 보냅니다.' },
      { from: 'brain', to: 'muscles', desc: '뇌가 손가락을 구부리고 다리를 구부려 축구공을 발로 정확하게 차도록 운동 명령을 속보로 보냅니다.' },
      { from: 'bones', to: 'muscles', desc: '근육이 강철 뼈 기둥에 단단히 결합되어 늘고 줄며 뼈다귀 기둥을 밀고 당겨 지렛대 운동으로서 큰 보폭을 성사시킵니다.' }
    ];

    // QUIZ DATA
    const QUIZZES = [
      { q: "심장 장기의 핵심 비유 설명으로 알맞은 정수 기기는 무엇인가요?", opts: ["음식물 소화 주머니", "쉬지 않고 뛰며 전신으로 피를 돌려주는 강력 펌프", "피속 유해 물질 거름 필터", "생각 사령탑"], ans: 1, e: "심장은 튼튼한 근육 수축 펌프가 되어 피를 순환시키며, 산소와 영양분을 전달해 주는 필수 장기 세트입니다." },
      { q: "산소를 수확하고 남은 노폐 가스인 이산화탄소를 배출하는 호흡기관은 누구인가요?", opts: ["심장", "신장(콩팥)", "위", "폐(허파)"], ans: 3, e: "폐는 갈비뼈 속에서 미세 허파꽈리로 깨끗한 공기를 거르는 호흡 중재 기수입니다." }
    ];

    let currentStep = 1;
    let currentQuizIdx = 0;
    let selectedQuizOpt = null;

    // TOURNAMENT VARIABLES
    let allMatches = [];
    let currentMatchIndex = 0;
    let tourRound = 8; // 8, 4, 2
    let nextRoundOrgans = [];
    let winnersList = [];

    // INITIALIZE PAGE
    window.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
      renderOrgansGrid();
      initializeQuiz();
      loadHistory();
    });

    // STEP 1 - RENDER CARDS
    function renderOrgansGrid() {
      const parent = document.getElementById('organs-grid');
      parent.innerHTML = '';
      ORGANS_DATA.forEach(org => {
        const div = document.createElement('div');
        div.className = "bg-white p-5 rounded-3xl shadow-sm border-2 " + org.bgColor.split(' ')[1] + " flex flex-col justify-between hover:scale-[1.02] transition-all transform duration-300";
        
        let funcsHtml = '';
        org.functions.forEach(f => {
          funcsHtml += '<li class="flex items-start gap-1.5"><span class="text-indigo-500 mt-0.5">•</span><span>' + f + '</span></li>';
        });

        div.innerHTML = \`
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="text-4xl text-center pr-1">\${org.emoji}</span>
              <div>
                <h4 class="text-xl font-bold font-hand text-slate-900">\${org.name}</h4>
                <p class="text-[10px] text-slate-500 font-extrabold tracking-wide">6학년 과학</p>
              </div>
            </div>
            
            <div class="bg-indigo-50/20 p-3 rounded-2xl border border-slate-100">
              <p class="text-xs text-slate-600 font-semibold leading-relaxed font-hand text-md">\${org.intro}</p>
            </div>

            <div class="space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span class="text-[10px] font-black text-indigo-700 block tracking-wide">주요 작용 기능</span>
              <ul class="text-[11px] text-slate-600 font-semibold space-y-1 leading-normal">
                \${funcsHtml}
              </ul>
            </div>
          </div>

          <button onclick="openVideoModal('\${org.id}')" class="mt-4 w-full py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1">
            <i data-lucide="play" class="w-3.5 h-3.5"></i> 생생 관찰 영상 보기
          </button>
        \`;
        parent.appendChild(div);
      });
      lucide.createIcons();
    }

    // VIDEO POPUP MODULES
    let currentPlayingOrgan = null;
    function openVideoModal(id) {
      const org = ORGANS_DATA.find(x => x.id === id);
      currentPlayingOrgan = org;
      document.getElementById('modal-video-title').innerText = '🧬 ' + org.name + ' 작동 동영상';
      const el = document.getElementById('modal-video-element');
      el.src = org.video;
      document.getElementById('video-modal').classList.remove('hidden');
      el.play().catch(() => {});
    }

    function closeVideoModal() {
      document.getElementById('video-modal').classList.add('hidden');
      document.getElementById('modal-video-element').pause();
    }

    function changeMockVideoUrl() {
      const url = prompt("검색하신 MP4 동영상 주소를 넣어 교실에 보여주세요:", currentPlayingOrgan.video);
      if (url) {
        currentPlayingOrgan.video = url;
        document.getElementById('modal-video-element').src = url;
        document.getElementById('modal-video-element').play().catch(() => {});
      }
    }

    // STEP 2 - TOURNAMENT WORLD CUP ENGINE
    function startWorldCup() {
      currentStep = 2;
      document.getElementById('step-1-section').classList.add('hidden');
      document.getElementById('step-2-section').classList.remove('hidden');
      
      // Update Step progress states
      document.getElementById('prog-step-1').className = "flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400";
      document.getElementById('prog-step-2').className = "flex items-center gap-1.5 text-xs md:text-sm font-bold text-indigo-600";

      // Setup tournament matches: predefined matchups
      // Match 1: brain vs muscles
      // Match 2: heart vs bones
      // Match 3: lungs vs kidney
      // Match 4: stomach vs small_intestine
      tourRound = 8;
      allMatches = [
        { left: ORGANS_DATA.find(x => x.id === 'brain'), right: ORGANS_DATA.find(x => x.id === 'muscles') },
        { left: ORGANS_DATA.find(x => x.id === 'heart'), right: ORGANS_DATA.find(x => x.id === 'bones') },
        { left: ORGANS_DATA.find(x => x.id === 'lungs'), right: ORGANS_DATA.find(x => x.id === 'kidney') },
        { left: ORGANS_DATA.find(x => x.id === 'stomach'), right: ORGANS_DATA.find(x => x.id === 'small_intestine') }
      ];
      currentMatchIndex = 0;
      nextRoundOrgans = [];

      renderMatchup();
    }

    function renderMatchup() {
      if (currentMatchIndex >= allMatches.length) {
        // End of round
        if (tourRound === 8) {
          tourRound = 4;
          // Build matches
          allMatches = [
            { left: nextRoundOrgans[0], right: nextRoundOrgans[1] },
            { left: nextRoundOrgans[2], right: nextRoundOrgans[3] }
          ];
          currentMatchIndex = 0;
          nextRoundOrgans = [];
          renderMatchup();
        } else if (tourRound === 4) {
          tourRound = 2;
          allMatches = [
            { left: nextRoundOrgans[0], right: nextRoundOrgans[1] }
          ];
          currentMatchIndex = 0;
          nextRoundOrgans = [];
          renderMatchup();
        } else {
          // Final Winner decided!
          showFinalWinner(nextRoundOrgans[0]);
          return;
        }
        return;
      }

      const match = allMatches[currentMatchIndex];
      const matchLabel = tourRound === 8 ? "8강 토너먼트" : (tourRound === 4 ? "준결승전 (4강 토론)" : "결승 대결 (🏆 파이널!)");
      const subLabel = tourRound === 8 ? \`대결 \${currentMatchIndex + 1} / 4\` : (tourRound === 4 ? \`대결 \${currentMatchIndex + 1} / 2\` : "마지막 우승 조율");

      document.getElementById('match-round-title').innerText = '⚖️ ' + matchLabel + ' - ' + subLabel;
      document.getElementById('match-badge').innerText = tourRound + '강';

      // Left contender UI
      document.getElementById('left-emoji').innerText = match.left.emoji;
      document.getElementById('left-name').innerText = match.left.name;
      document.getElementById('left-desc').innerText = match.left.oneline;

      // Right contender UI
      document.getElementById('right-emoji').innerText = match.right.emoji;
      document.getElementById('right-name').innerText = match.right.name;
      document.getElementById('right-desc').innerText = match.right.oneline;

      renderTournamentTimeline();
    }

    function renderTournamentTimeline() {
      const container = document.getElementById('tournament-track');
      container.innerHTML = '';
      allMatches.forEach((m, idx) => {
        const span = document.createElement('span');
        span.className = \`px-2.5 py-1 text-[10px] font-bold rounded-lg \${idx === currentMatchIndex ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'}\`;
        span.innerText = \`기행 \${idx + 1}\`;
        container.appendChild(span);
      });
    }

    function selectWinner(side) {
      playSoundEffect();
      const match = allMatches[currentMatchIndex];
      const winner = side === 'left' ? match.left : match.right;
      
      // Visual Feedback cards
      const activeCard = side === 'left' ? document.getElementById('left-card') : document.getElementById('right-card');
      activeCard.classList.add('scale-105', 'bg-emerald-50', 'ring-emerald-500');

      setTimeout(() => {
        activeCard.classList.remove('scale-105', 'bg-emerald-50', 'ring-emerald-500');
        nextRoundOrgans.push(winner);
        currentMatchIndex++;
        renderMatchup();
      }, 500);
    }

    function playSoundEffect() {
      // Simulate clapping or click representation visually
      const spark = document.createElement('div');
      spark.className = "fixed inset-0 bg-white/20 pointer-events-none z-50 flex items-center justify-center font-hand text-5xl font-black text-rose-500 tracking-widest uppercase animate-fade-in";
      spark.innerHTML = "📣 와아아! 진출! 👏👏👏";
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
    }

    // STEP 3 - SHOW FINAL WINNER & NETWORKING GRAPH
    function showFinalWinner(organ) {
      currentStep = 3;
      document.getElementById('step-2-section').classList.add('hidden');
      document.getElementById('step-3-section').classList.remove('hidden');

      // Update Step progress states
      document.getElementById('prog-step-2').className = "flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400";
      document.getElementById('prog-step-3').className = "flex items-center gap-1.5 text-xs md:text-sm font-bold text-indigo-1000 font-extrabold text-emerald-600";

      document.getElementById('victory-emoji').innerText = organ.emoji;
      document.getElementById('victory-title').innerText = '우승: ' + organ.name + '!';
      document.getElementById('victory-oneline').innerText = '🩸 ' + organ.oneline;

      // Save to Record list
      winnersList.unshift({ name: organ.name, emoji: organ.emoji, date: new Date().toLocaleTimeString() });
      if (winnersList.length > 5) winnersList.pop();
      saveHistory();
      renderHistory();

      // Render biology SVG Network
      setTimeout(() => {
        drawNetworkRelations();
      }, 400);
    }

    // BIOLOGICAL SVG NETWORK GRAPHICS
    function drawNetworkRelations() {
      const svg = document.getElementById('network-svg');
      const nodesContainer = document.getElementById('network-nodes');
      svg.innerHTML = '';
      nodesContainer.innerHTML = '';

      const width = nodesContainer.clientWidth || 600;
      const height = nodesContainer.clientHeight || 500;

      // Define coordinates relative to percentage
      const coords = {};
      Object.keys(COORDINATES).forEach(key => {
        const pt = COORDINATES[key];
        coords[key] = {
          x: (pt.x / 100) * width,
          y: (pt.y / 100) * height
        };
      });

      // SVG Arrow markers definitions
      svg.innerHTML += \`
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669" />
          </marker>
        </defs>
      \`;

      // Draw Connection Lines
      CONNECTIONS.forEach((cn, index) => {
        const start = coords[cn.from];
        const end = coords[cn.to];
        if (start && end) {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "line");
          path.setAttribute("x1", start.x);
          path.setAttribute("y1", start.y);
          path.setAttribute("x2", end.x);
          path.setAttribute("y2", end.y);
          path.setAttribute("stroke", "#10b981");
          path.setAttribute("stroke-width", "3.5");
          path.setAttribute("marker-end", "url(#arrow)");
          path.setAttribute("class", "cursor-pointer hover:stroke-amber-400 transition-colors");
          path.setAttribute("id", "line-" + index);
          
          // Click handler for connections
          path.onclick = () => showConnectionDetail(cn);
          svg.appendChild(path);
        }
      });

      // Render Floating Organ Nodes
      ORGANS_DATA.forEach(org => {
        const pt = coords[org.id];
        if (pt) {
          const btn = document.createElement('button');
          btn.className = "absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2.5 rounded-full shadow-lg border-2 border-emerald-400 font-bold font-hand text-sm flex items-center gap-1.5 focus:outline-none transition-all duration-300 transform bg-white hover:scale-110 active:scale-95 text-slate-800 z-30 " + org.id;
          btn.style.left = pt.x + 'px';
          btn.style.top = pt.y + 'px';
          btn.innerHTML = '<span>' + org.emoji + '</span> <span>' + org.name + '</span>';
          btn.onclick = () => highlightRelations(org.id);
          nodesContainer.appendChild(btn);
        }
      });
    }

    function highlightRelations(organId) {
      // Filter connections involving this organ
      const involving = CONNECTIONS.filter(c => c.from === organId || c.to === organId);
      const detailBox = document.getElementById('connection-detail');
      detailBox.innerHTML = '';

      if (involving.length === 0) {
        detailBox.innerHTML = '<p class="text-slate-500">이 장기와 직접 이어진 특별 과학 연결선이 없습니다. 다른 장기들을 클릭해 보세요!</p>';
        return;
      }

      const org = ORGANS_DATA.find(x => x.id === organId);
      let content = '<p class="font-bold text-amber-600 text-sm border-b pb-1">🧪 [' + org.name + '] 협력 관찰</p>';
      involving.forEach(inv => {
        const fromOrg = ORGANS_DATA.find(x => x.id === inv.from);
        const toOrg = ORGANS_DATA.find(x => x.id === inv.to);
        content += \`
          <div class="bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
            <span class="font-extrabold text-blue-800 block text-[10px] mb-0.5">\${fromOrg.emoji}\${fromOrg.name} ➔ \${toOrg.emoji}\${toOrg.name}</span>
            <p className="text-slate-700 leading-normal">\${inv.desc}</p>
          </div>
        \`;
      });
      detailBox.innerHTML = content;
    }

    function showConnectionDetail(cn) {
      const fromOrg = ORGANS_DATA.find(x => x.id === cn.from);
      const toOrg = ORGANS_DATA.find(x => x.id === cn.to);
      const detailBox = document.getElementById('connection-detail');
      detailBox.innerHTML = \`
        <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
          <span class="font-bold text-emerald-800 block text-xs mb-1">💡 [\${fromOrg.name} ➔ \${toOrg.name}] 연결 밀착 탐구</span>
          <p className="text-slate-700 leading-normal">\${cn.desc}</p>
        </div>
      \`;
    }

    // FORMING EVALUATION QUIZ (CLASSROOM CHECKUP)
    function initializeQuiz() {
      currentQuizIdx = 0;
      selectedQuizOpt = null;
      renderCurrentQuiz();
    }

    function renderCurrentQuiz() {
      const q = QUIZZES[currentQuizIdx];
      document.getElementById('quiz-question').innerText = "Q" + (currentQuizIdx + 1) + ". " + q.q;
      const optsCont = document.getElementById('quiz-options');
      optsCont.innerHTML = '';

      q.opts.forEach((o, i) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-2 rounded-xl border font-bold text-[11px] transition-colors " + 
                        (selectedQuizOpt === null ? "bg-white border-slate-300 hover:bg-slate-50" : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed");
        btn.innerText = (i + 1) + ". " + o;
        btn.onclick = () => selectQuizAnswer(i);
        optsCont.appendChild(btn);
      });

      document.getElementById('quiz-feedback').className = "hidden";
    }

    function selectQuizAnswer(idx) {
      if (selectedQuizOpt !== null) return;
      selectedQuizOpt = idx;

      const q = QUIZZES[currentQuizIdx];
      const feedback = document.getElementById('quiz-feedback');
      feedback.classList.remove('hidden');

      if (idx === q.ans) {
        feedback.className = "p-2.5 rounded-lg border text-emerald-800 bg-emerald-50 border-emerald-300 font-bold block";
        feedback.innerHTML = "🎉 정답입니다! " + q.e;
      } else {
        feedback.className = "p-2.5 rounded-lg border text-rose-800 bg-rose-50 border-rose-300 font-bold block";
        feedback.innerHTML = "😢 아쉽네요! 정답은 '" + q.opts[q.ans] + "' 입니다. (" + q.e + ")";
      }

      // Automatically flip next questions or reset
      setTimeout(() => {
        selectedQuizOpt = null;
        currentQuizIdx = (currentQuizIdx + 1) % QUIZZES.length;
        renderCurrentQuiz();
      }, 4500);
    }

    // HISTORY HALL OF FAME STORAGE
    function saveHistory() {
      localStorage.setItem('science_organ_kings', JSON.stringify(winnersList));
    }

    function loadHistory() {
      const raw = localStorage.getItem('science_organ_kings');
      if (raw) {
        winnersList = JSON.parse(raw);
        renderHistory();
      }
    }

    function renderHistory() {
      const box = document.getElementById('hall-of-fame-box');
      const list = document.getElementById('history-list');
      if (winnersList.length > 0) {
        box.classList.remove('hidden');
        list.innerHTML = '';
        winnersList.forEach(w => {
          list.innerHTML += '<p class="flex items-center gap-1 hover:text-indigo-600"><span>🏆 \${w.date}</span> <span class="font-bold text-slate-800">\${w.emoji}\${w.name}</span> 가 최종 우승으로 지지를 받았습니다!</p>';
        });
      }
    }

    // CONTROLLERS
    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {});
      } else {
        document.exitFullscreen();
      }
    }

    function toggleTeacherMode() {
      const shelf = document.getElementById('teacher-shelf');
      shelf.classList.toggle('hidden');
    }

    function restartAll() {
      currentStep = 1;
      document.getElementById('step-1-section').classList.remove('hidden');
      document.getElementById('step-2-section').classList.add('hidden');
      document.getElementById('step-3-section').classList.add('hidden');
      document.getElementById('prog-step-1').className = "flex items-center gap-1.5 text-xs md:text-sm font-bold text-indigo-1000 font-extrabold text-indigo-600";
      document.getElementById('prog-step-2').className = "flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400";
      document.getElementById('prog-step-3').className = "flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400";
      renderOrgansGrid();
    }
  </script>
</body>
</html>`;
}
