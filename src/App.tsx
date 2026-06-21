/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  HelpCircle, 
  Sparkles, 
  Navigation, 
  RotateCcw, 
  BookOpen, 
  Volume2, 
  Maximize2,
  Download,
  AlertCircle,
  Play,
  ArrowRight
} from 'lucide-react';
import { ORGANS } from './data/organs';
import { Organ, Matchup } from './types';
import TeacherMode from './components/TeacherMode';
import ConnectionNetwork from './components/ConnectionNetwork';
import { exportToStandaloneHTML } from './components/OfflineExporter';
import { 
  getLiveOrgans, 
  saveOrganToCloud, 
  deleteOrganFromCloud, 
  resetOrgansToDefault 
} from './lib/firebase';

interface HistoryRecord {
  id: string;
  winnerName: string;
  winnerEmoji: string;
  date: string;
}

const getOrganColorTheme = (id: string) => {
  switch (id) {
    case 'brain': return { border: 'border-orange-500', badge: 'bg-orange-100 text-orange-700', text: 'text-orange-850' };
    case 'heart': return { border: 'border-red-500', badge: 'bg-red-100 text-red-700', text: 'text-red-850' };
    case 'lungs': return { border: 'border-sky-500', badge: 'bg-sky-100 text-sky-700', text: 'text-sky-850' };
    case 'stomach': return { border: 'border-amber-500', badge: 'bg-amber-100 text-amber-700', text: 'text-amber-850' };
    case 'small_intestine': return { border: 'border-emerald-500', badge: 'bg-emerald-100 text-emerald-700', text: 'text-emerald-850' };
    case 'kidney': return { border: 'border-yellow-500', badge: 'bg-yellow-105 text-yellow-800', text: 'text-yellow-850' };
    case 'bones': return { border: 'border-zinc-400', badge: 'bg-zinc-100 text-zinc-700', text: 'text-zinc-850' };
    case 'muscles': return { border: 'border-purple-500', badge: 'bg-purple-100 text-purple-700', text: 'text-purple-850' };
    default: return { border: 'border-indigo-500', badge: 'bg-indigo-100 text-indigo-700', text: 'text-indigo-850' };
  }
};

export default function App() {
  const [phase, setPhase] = useState<'explore' | 'worldcup' | 'generalize'>('explore');
  const [isTeacherModeOpen, setIsTeacherModeOpen] = useState<boolean>(false);
  const [selectedOrganId, setSelectedOrganId] = useState<string>('brain');
  const [organs, setOrgans] = useState<Organ[]>(ORGANS);
  const [isDbLoading, setIsDbLoading] = useState<boolean>(true);
  
  // Tournament state
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
  const [round, setRound] = useState<number>(8); // 8 for quarterfinals, 4 for semifinals, 2 for finals
  const [nextRoundOrgans, setNextRoundOrgans] = useState<Organ[]>([]);
  const [winnerOrgan, setWinnerOrgan] = useState<Organ | null>(null);
  
  // Audio & Visual celebratory notification state
  const [clappingMessage, setClappingMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    // Load live organs from Firebase
    async function loadOrgansFromDB() {
      try {
        setIsDbLoading(true);
        const data = await getLiveOrgans();
        setOrgans(data);
        if (data.length > 0) {
          // If the previously selected organ is no longer in the list, set to the first organ
          setSelectedOrganId(prev => data.some(o => o.id === prev) ? prev : data[0].id);
        }
      } catch (err) {
        console.error("Firebase load error, using default fallback:", err);
      } finally {
        setIsDbLoading(false);
      }
    }
    loadOrgansFromDB();
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem('science_organ_winners');
    if (raw) {
      try {
        setHistory(JSON.parse(raw));
      } catch (e) {
        setHistory([]);
      }
    }
  }, []);

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  const handleDownloadStandalone = () => {
    const content = exportToStandaloneHTML();
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `우리_몸의_기관과_기능_탐구_단일파일.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRestart = () => {
    setPhase('explore');
    setMatchups([]);
    setCurrentMatchIndex(0);
    setRound(8);
    setNextRoundOrgans([]);
    setWinnerOrgan(null);
    setClappingMessage(null);
  };

  const startWorldCup = () => {
    // Exact quarterfinal pairs from active organs
    const findLive = (id: string, defaultBackup: typeof ORGANS[0]) => {
      return organs.find(o => o.id === id) || defaultBackup;
    };

    const match1: Matchup = {
      id: 'm1',
      round: 8,
      left: findLive('brain', ORGANS.find(o => o.id === 'brain')!),
      right: findLive('muscles', ORGANS.find(o => o.id === 'muscles')!)
    };
    const match2: Matchup = {
      id: 'm2',
      round: 8,
      left: findLive('heart', ORGANS.find(o => o.id === 'heart')!),
      right: findLive('bones', ORGANS.find(o => o.id === 'bones')!)
    };
    const match3: Matchup = {
      id: 'm3',
      round: 8,
      left: findLive('lungs', ORGANS.find(o => o.id === 'lungs')!),
      right: findLive('kidney', ORGANS.find(o => o.id === 'kidney')!)
    };
    const match4: Matchup = {
      id: 'm4',
      round: 8,
      left: findLive('stomach', ORGANS.find(o => o.id === 'stomach')!),
      right: findLive('small_intestine', ORGANS.find(o => o.id === 'small_intestine')!)
    };

    setMatchups([match1, match2, match3, match4]);
    setCurrentMatchIndex(0);
    setRound(8);
    setNextRoundOrgans([]);
    setWinnerOrgan(null);
    setPhase('worldcup');
  };

  const selectWinner = (winner: Organ) => {
    // Show visual celebratory clapping notification (school game atmosphere!)
    setClappingMessage(`👏👏 ${winner.emoji} ${winner.name} 다음 부전승/라운드 진출! 👏👏`);
    setTimeout(() => {
      setClappingMessage(null);
    }, 1500);

    const updatedNext = [...nextRoundOrgans, winner];

    if (currentMatchIndex < matchups.length - 1) {
      setNextRoundOrgans(updatedNext);
      setCurrentMatchIndex(prev => prev + 1);
    } else {
      // Completed current round!
      if (round === 8) {
        // 8강 -> 4강 (Semifinals)
        const nextMatch1: Matchup = {
          id: 'm_sf1',
          round: 4,
          left: updatedNext[0],
          right: updatedNext[1]
        };
        const nextMatch2: Matchup = {
          id: 'm_sf2',
          round: 4,
          left: updatedNext[2],
          right: updatedNext[3]
        };
        setMatchups([nextMatch1, nextMatch2]);
        setRound(4);
        setCurrentMatchIndex(0);
        setNextRoundOrgans([]);
      } else if (round === 4) {
        // 4강 -> 결승 (2) (Finals)
        const finalMatch: Matchup = {
          id: 'm_f',
          round: 2,
          left: updatedNext[0],
          right: updatedNext[1]
        };
        setMatchups([finalMatch]);
        setRound(2);
        setCurrentMatchIndex(0);
        setNextRoundOrgans([]);
      } else {
        // Grand Winner Decided!
        setWinnerOrgan(winner);
        
        // Save to win history
        const newRecord: HistoryRecord = {
          id: Date.now().toString(),
          winnerName: winner.name,
          winnerEmoji: winner.emoji,
          date: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        const updatedHistory = [newRecord, ...history].slice(0, 5);
        localStorage.setItem('science_organ_winners', JSON.stringify(updatedHistory));
        setHistory(updatedHistory);
        
        setPhase('generalize');
      }
    }
  };

  const handleAddOrgan = async (newOrgan: Organ) => {
    try {
      await saveOrganToCloud(newOrgan);
      const updated = await getLiveOrgans();
      setOrgans(updated);
    } catch (err) {
      console.error("Add organ failed:", err);
      throw err;
    }
  };

  const handleEditOrgan = async (updatedOrgan: Organ) => {
    try {
      await saveOrganToCloud(updatedOrgan);
      const updated = await getLiveOrgans();
      setOrgans(updated);
    } catch (err) {
      console.error("Edit organ failed:", err);
      throw err;
    }
  };

  const handleDeleteOrgan = async (id: string) => {
    try {
      await deleteOrganFromCloud(id);
      const updated = await getLiveOrgans();
      setOrgans(updated);
      if (selectedOrganId === id && updated.length > 0) {
        setSelectedOrganId(updated[0].id);
      }
    } catch (err) {
      console.error("Delete organ failed:", err);
      throw err;
    }
  };

  const handleResetOrgansToDefault = async () => {
    try {
      const data = await resetOrgansToDefault();
      setOrgans(data);
      if (data.length > 0) {
        setSelectedOrganId(data[0].id);
      }
    } catch (err) {
      console.error("Reset organs failed:", err);
      throw err;
    }
  };

  const currentMatch = matchups[currentMatchIndex];

  return (
    <div id="science-app-canvas" className="min-h-screen bg-sky-50 flex flex-col font-sans select-none pb-12">
      
      {/* 1. APPMBAR / HEADER DESIGN */}
      <header className="bg-indigo-600 text-white px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-white text-indigo-600 font-black rounded-lg w-10 h-10 flex items-center justify-center text-xl shadow-inner select-none">
            🔬
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              우리 몸 기관 긴급 브리핑 <span className="text-indigo-200 text-base md:text-lg font-medium ml-2 underline decoration-sky-400">생물의 구조와 기능</span>
            </h1>
          </div>
        </div>

        {/* STEP PROGRESS PILLS INDICATOR */}
        <div className="flex gap-2 bg-indigo-750/50 p-1 rounded-full border border-indigo-400/20 shadow-inner">
          <button 
            onClick={() => setPhase('explore')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              phase === 'explore' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-200 hover:text-white'
            }`}
          >
            STEP 1: 탐구
          </button>
          <button 
            onClick={startWorldCup}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              phase === 'worldcup' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-200 hover:text-white'
            }`}
          >
            STEP 2: 월드컵
          </button>
          <button 
            onClick={() => winnerOrgan && setPhase('generalize')}
            disabled={!winnerOrgan}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              !winnerOrgan ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
            } ${
              phase === 'generalize' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-200 hover:text-white'
            }`}
          >
            STEP 3: 연결
          </button>
        </div>

        {/* UTILITY BUTTONS RAIL */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            id="download-html-button"
            onClick={handleDownloadStandalone}
            className="bg-indigo-500 hover:bg-indigo-400 text-white text-xs px-3 py-1.5 rounded border border-indigo-400 font-bold transition-colors uppercase cursor-pointer"
            title="인터랙티브 single html 다운로드"
          >
            <Download size={13} className="inline mr-1" />
            단일 HTML 저장
          </button>

          <button 
            id="toggle-teacher-mode-btn"
            onClick={() => setIsTeacherModeOpen(!isTeacherModeOpen)}
            className={`text-xs px-3 py-1.5 rounded border font-bold transition-colors cursor-pointer ${
              isTeacherModeOpen 
                ? 'bg-amber-400 border-amber-500 text-slate-900 hover:bg-amber-300' 
                : 'bg-indigo-500 hover:bg-indigo-400 text-white border-indigo-400'
            }`}
          >
            <BookOpen size={13} className="inline mr-1" />
            교사용 자료실
          </button>

          <button 
            id="app-fullscreen-toggle"
            onClick={handleFullscreenToggle}
            className="bg-indigo-500 hover:bg-indigo-400 text-white text-xs px-3 py-1.5 rounded border border-indigo-400 font-bold transition-colors cursor-pointer"
            title="Fullscreen"
          >
            <Maximize2 size={13} className="inline mr-1" />
            전체화면
          </button>

          <button 
            id="restart-app-top-btn"
            onClick={handleRestart}
            className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded border border-white/30 font-bold transition-colors cursor-pointer"
          >
            <RotateCcw size={13} className="inline mr-1" />
            다시 시작
          </button>
        </div>
      </header>

      {/* CLAPPING POPUP NOTIFICATION overlay (school game aura!) */}
      {clappingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none animate-scale-up">
          <div className="bg-teal-500 text-white px-8 py-5 rounded-3xl shadow-2xl border-4 border-teal-300 flex items-center gap-3 font-hand text-2xl md:text-3xl font-black">
            <Volume2 className="w-8 h-8 animate-bounce" />
            <span>{clappingMessage}</span>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Render interactive Teacher Mode material */}
        {isTeacherModeOpen && (
          <TeacherMode 
            organs={organs}
            onAddOrgan={handleAddOrgan}
            onEditOrgan={handleEditOrgan}
            onDeleteOrgan={handleDeleteOrgan}
            onResetOrgans={handleResetOrgansToDefault}
          />
        )}

        {/* PHASE 1: EXPLORING ORGANS */}
        {phase === 'explore' && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            
            {/* Bento Grid layout */}
            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: 8 Organ Cards (col-span-8) */}
              <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {organs.map((organ) => {
                  const isSelected = selectedOrganId === organ.id;
                  
                  // Maps beautiful soft colors matching the bento template spec
                  const getBentoBorderClass = (id: string, active: boolean) => {
                    switch (id) {
                      case 'brain': return active ? 'border-orange-400 ring-4 ring-orange-100 scale-[1.02]' : 'border-orange-200 hover:border-orange-400';
                      case 'heart': return active ? 'border-red-400 ring-4 ring-red-105 scale-[1.02]' : 'border-red-200 hover:border-red-400';
                      case 'lungs': return active ? 'border-sky-400 ring-4 ring-sky-100 scale-[1.02]' : 'border-sky-200 hover:border-sky-400';
                      case 'stomach': return active ? 'border-amber-400 ring-4 ring-amber-100 scale-[1.02]' : 'border-amber-200 hover:border-amber-400';
                      case 'small_intestine': return active ? 'border-emerald-400 ring-4 ring-emerald-100 scale-[1.02]' : 'border-emerald-200 hover:border-emerald-400';
                      case 'kidney': return active ? 'border-yellow-400 ring-4 ring-yellow-100 scale-[1.02]' : 'border-yellow-200 hover:border-yellow-400';
                      case 'bones': return active ? 'border-gray-400 ring-4 ring-gray-100 scale-[1.02]' : 'border-gray-200 hover:border-gray-400';
                      case 'muscles': return active ? 'border-purple-400 ring-4 ring-purple-100 scale-[1.02]' : 'border-purple-200 hover:border-purple-400';
                      default: return active ? 'border-indigo-400 ring-4 ring-indigo-100 scale-[1.02]' : 'border-indigo-200 hover:border-indigo-400';
                    }
                  };

                  return (
                    <div 
                      key={organ.id} 
                      id={`organ-card-${organ.id}`}
                      onClick={() => setSelectedOrganId(organ.id)}
                      className={`bg-white rounded-2xl p-5 shadow-sm border-2 ${getBentoBorderClass(organ.id, isSelected)} flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all duration-300 h-full group select-none min-h-[145px]`}
                    >
                      <div className="text-5xl mb-2.5 group-hover:scale-110 transition-transform">
                        {organ.emoji}
                      </div>
                      <div className="font-extrabold text-gray-800 text-sm md:text-base">
                        {organ.name}
                      </div>
                      <p className="text-[10px] text-gray-400 leading-tight mt-1.5 line-clamp-2">
                        {organ.oneLineFunction}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Detailed Profile & Actions (col-span-4) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {(() => {
                  const selectedOrgan = organs.find(o => o.id === selectedOrganId) || organs[0] || ORGANS[0];
                  const colorTheme = getOrganColorTheme(selectedOrgan.id);
                  return (
                    <div className={`bg-white rounded-3xl p-6 shadow-xl border-t-8 ${colorTheme.border} flex-1 relative overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[380px]`}>
                      <div className="relative z-10 space-y-4">
                        <span className={`${colorTheme.badge} px-3 py-1 rounded-full text-xs font-extrabold tracking-wide`}>
                          선택한 기관 프로필 🔬
                        </span>
                        
                        <h2 className="text-4xl font-black text-gray-900 mt-4 flex items-center gap-2">
                          {selectedOrgan.name} <span className="text-2xl">{selectedOrgan.emoji}</span>
                        </h2>

                        <div className="space-y-4 pt-2">
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-sm italic text-slate-600 leading-relaxed font-semibold font-hand text-[15px]">
                              "{selectedOrgan.introduction}"
                            </p>
                          </div>

                          <div>
                            <h3 className="font-bold text-gray-700 text-xs mb-2 flex items-center gap-1 uppercase tracking-wide">
                              ⭐️ 대대표 핵심 기능
                            </h3>
                            <ul className="text-xs text-gray-600 space-y-2 ml-4 list-disc font-semibold leading-relaxed">
                              {selectedOrgan.keyFunctions.map((kf, i) => (
                                <li key={i} className="pl-0.5">
                                  {kf}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Decorative BG element */}
                      <div className="absolute -bottom-10 -right-10 text-[180px] opacity-[0.08] select-none pointer-events-none">
                        {selectedOrgan.emoji}
                      </div>
                    </div>
                  );
                })()}

                <button 
                  id="worldcup-start-stage-bento-btn"
                  onClick={startWorldCup}
                  className="group bg-amber-500 hover:bg-amber-600 text-white rounded-2xl py-6 flex flex-col items-center justify-center shadow-lg transform transition-all hover:scale-[1.02] active:scale-95 text-center px-4 cursor-pointer"
                >
                  <span className="text-sm font-bold opacity-80 mb-1">탐구 완료! 다음 단계로</span>
                  <span className="text-2xl font-black flex items-center gap-2">
                    기관 월드컵 시작하기 🏆
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom: Investigation Questions Panel */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6 shadow-sm">
              <div className="flex flex-col shrink-0 text-center lg:text-left">
                <span className="text-indigo-600 font-black text-xl mb-1 font-hand">조사 질문 📝</span>
                <p className="text-xs text-slate-400 font-semibold">오늘의 탐구 목표를 확인해요</p>
              </div>
              <div className="flex-1 w-full grid md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex items-center gap-3">
                  <div className="bg-white w-8 h-8 rounded-lg shadow-sm flex items-center justify-center font-bold text-slate-400 shrink-0">1</div>
                  <p className="text-sm font-bold text-slate-700 leading-snug">이 기관은 어떤 일을 하나요?</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex items-center gap-3">
                  <div className="bg-white w-8 h-8 rounded-lg shadow-sm flex items-center justify-center font-bold text-slate-400 shrink-0">2</div>
                  <p className="text-sm font-bold text-slate-700 leading-snug">그 기능은 어떻게 이루어지나요?</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex items-center gap-3">
                  <div className="bg-white w-8 h-8 rounded-lg shadow-sm flex items-center justify-center font-bold text-slate-400 shrink-0">3</div>
                  <p className="text-sm font-bold text-slate-700 leading-snug">이 기관이 없다면 어떤 일이 생길까요?</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 2: ORGAN TOURNAMENT WORLD CUP */}
        {phase === 'worldcup' && currentMatch && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 border border-rose-200 rounded-full text-rose-700 text-xs font-bold font-hand uppercase">
                Tournament Debate Game
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-hand">
                우리 몸 기관 월드컵 🏆
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
                "만약 우리 몸에서 이 둘 중 하나의 장기만 아아주 건강하게 작동할 수 있다면, 무엇을 진출시키는 게 더 타당할까?" 치열하게 토론해 보고 카드를 클릭하세요!
              </p>
            </div>

            {/* ACTIVE ARENA */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border-4 border-rose-300 overflow-hidden">
              <div className="bg-rose-500 text-white p-4 text-center font-bold text-sm md:text-base flex justify-between items-center px-6 border-b-4 border-rose-600">
                <div className="font-hand text-lg md:text-xl">
                  {round === 8 ? '⚖️ 8강 토너먼트' : round === 4 ? '🔥 준결승전 (4강 토론)' : '👑 영광의 최종 결승전'}
                  {' '} - 대결 ({currentMatchIndex + 1} / {matchups.length})
                </div>
                <div className="bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-extrabold select-none">
                  현재 {round}강
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col md:flex-row items-stretch justify-center gap-6 relative min-h-[350px]">
                
                {/* CONTENDER 1: LEFT */}
                <button
                  id={`left-contender-${currentMatch.left.id}`}
                  onClick={() => selectWinner(currentMatch.left)}
                  className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100/50 hover:from-rose-50 hover:to-rose-100/30 ring-2 ring-slate-200 hover:ring-rose-400 p-6 md:p-8 rounded-2xl flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none focus:ring-4 focus:ring-rose-200"
                >
                  <div className="text-8xl mb-4 transform hover:scale-110 transition-transform">
                    {currentMatch.left.emoji}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-hand">
                      {currentMatch.left.name}
                    </h3>
                    <div className="px-3.5 py-1.5 bg-rose-50 border border-rose-100 rounded-xl">
                      <p className="text-xs md:text-sm font-semibold text-rose-700">
                        {currentMatch.left.oneLineFunction}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm tracking-wide">
                    이 기관의 손을 들어줍니다! 👍
                  </div>
                </button>

                {/* HEART VS SEPARATOR */}
                <div className="flex items-center justify-center font-black text-4xl text-rose-500 font-hand py-2 select-none md:px-2 animate-pulse">
                  VS
                </div>

                {/* CONTENDER 2: RIGHT */}
                <button
                  id={`right-contender-${currentMatch.right.id}`}
                  onClick={() => selectWinner(currentMatch.right)}
                  className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100/50 hover:from-rose-50 hover:to-rose-100/30 ring-2 ring-slate-200 hover:ring-rose-400 p-6 md:p-8 rounded-2xl flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none focus:ring-4 focus:ring-rose-200"
                >
                  <div className="text-8xl mb-4 transform hover:scale-110 transition-transform">
                    {currentMatch.right.emoji}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-hand">
                      {currentMatch.right.name}
                    </h3>
                    <div className="px-3.5 py-1.5 bg-rose-50 border border-rose-100 rounded-xl">
                      <p className="text-xs md:text-sm font-semibold text-rose-700">
                        {currentMatch.right.oneLineFunction}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm tracking-wide">
                    이 기관의 손을 들어줍니다! 👍
                  </div>
                </button>

              </div>

              {/* TOURNAMENT DEBATE INSTRUCTIONS FOR CLASS */}
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <div className="max-w-xl mx-auto space-y-3">
                  <div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm">
                    <HelpCircle size={16} />
                    <span>모둠 토론 질문 안내</span>
                  </div>
                  <ol className="text-xs text-slate-600 font-semibold space-y-1.5 list-decimal pl-5 leading-relaxed">
                    <li>이 기관들은 실제로 각각 우리 몸에서 어떤 결정적인 일들을 완수하나요?</li>
                    <li>한 곳이 심각하게 아프거나 작동을 멈추면 우리의 온몸 시스템에는 어떤 연쇄 충격이 발생할지 상상해 이야기해 봅시다.</li>
                    <li>한쪽만 다음 토너먼트로 올리는 것이 왜 타당하다고 생각하는지 반 친구들에게 논리적으로 자랑해 보세요!</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* PROGRESS MATCH FLOW TRACKBAR */}
            <div className="max-w-md mx-auto bg-white/75 p-4 rounded-2xl border border-rose-200/50 flex flex-col gap-2.5 items-center shadow-sm">
              <h4 className="text-xs font-bold text-rose-900">
                토너먼트 {round}강 진행 형세
              </h4>
              <div className="flex justify-center gap-1.5 flex-wrap">
                {matchups.map((m, idx) => (
                  <span 
                    key={idx}
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${
                      idx === currentMatchIndex 
                        ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-200 scale-102' 
                        : idx < currentMatchIndex 
                        ? 'bg-emerald-100 text-emerald-700 line-through' 
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    대결 {idx + 1} {idx < currentMatchIndex ? '✓' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PHASE 3: FINAL DISCOVERY & NETWORK */}
        {phase === 'generalize' && winnerOrgan && (
          <div className="space-y-10 animate-fade-in text-slate-800">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-xs font-bold font-hand uppercase">
                CHAMPION REVEALED
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-950 font-hand">
                대망의 우승 기관 탄생! {winnerOrgan.emoji} {winnerOrgan.name}
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
                우리 교실 생명 토론의 결과, 가장 큰 지지를 얻은 {winnerOrgan.name}입니다!
              </p>
            </div>

            {/* GOLD WINNER SHINE */}
            <div className="max-w-xl mx-auto bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-500 text-slate-900 border-4 border-yellow-200 p-6 md:p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden animate-scale-up">
              <span className="text-7xl mb-3 block animate-bounce-slow">
                {winnerOrgan.emoji}
              </span>
              <h3 className="text-3xl font-black font-hand text-slate-950">
                영예의 우승: {winnerOrgan.name}!
              </h3>
              <p className="text-xs font-extrabold text-amber-950 bg-white/40 mt-2 px-4 py-1.5 rounded-full inline-block">
                {winnerOrgan.oneLineFunction}
              </p>
              
              <div className="bg-white/90 p-4 rounded-2xl text-xs font-bold text-slate-800 mt-5 shadow-sm border border-yellow-200 text-left space-y-2">
                <p className="text-emerald-700 font-extrabold text-sm flex items-center gap-1">
                  💡 정말 <strong>{winnerOrgan.name}</strong> 이 장기 하나만 건강하게 살아 있으면 몸에 무리가 안 생길까요?
                </p>
                <p className="text-slate-600 leading-relaxed font-semibold">
                  뇌가 아무리 훌륭하고 위대해도 산소를 들여오는 <strong>'폐'</strong>가 숨쉬지 못하거나 기중기가 되는 <strong>'심장'</strong>이 펌프질을 멈추면 곧바로 뇌 역시 행동을 정지합니다. 
                  우리가 걷게 해주는 <strong>'뼈'</strong>와 <strong>'근육'</strong>이 없으면 영양을 구하러 갈 수조차 없습니다. 
                  즉, 우리 몸의 기관들은 각각 아주 소중한 직무가 있으며 서로 징검다리처럼 꽉 연계되어 행동한답니다!
                </p>
              </div>
            </div>

            {/* BIOLOGICAL diagram network maps */}
            <ConnectionNetwork />

            {/* FINAL CORE LEARNING GENERALIZATION BOX */}
            <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white rounded-3xl p-6 md:p-8 text-center shadow-lg space-y-3 max-w-4xl mx-auto border-b-4 border-emerald-700">
              <span className="text-2xl font-bold font-hand block text-emerald-100 tracking-wider">
                🧪 단원 핵심 원리 일반화 도출
              </span>
              <h4 className="text-xl md:text-2xl font-black font-hand leading-relaxed tracking-tight">
                "우리 몸의 기관은 각각 정말 중요하고도 고유한 생명 기능을 수행하며, 결코 각각 단독으로 놀지 않고 항상 서로의 힘을 모으고 연결되어 조화롭게 함께 작동합니다!"
              </h4>
              <p className="text-xs text-emerald-100 font-semibold italic">6학년 과학 | 생물의 구조와 기능 | 탐구 일지 최종 장식</p>
            </div>

            {/* WIN HISTORY HALL OF FAME RECORD PANEL */}
            {history.length > 0 && (
              <div id="school-results-board" className="max-w-2xl mx-auto bg-white/70 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-xs font-extrabold text-indigo-900 border-b border-indigo-100 pb-1.5 flex items-center gap-1">
                  📋 우리 반 역사적 월드컵 탐구 방지록 (저장된 교실 점수)
                </h4>
                <div className="text-[11px] text-slate-600 space-y-1.5 max-h-[120px] overflow-y-auto custom-scroll pr-1 font-semibold">
                  {history.map((h) => (
                    <p key={h.id} className="flex justify-between items-center bg-slate-50/70 p-2 rounded-lg border border-slate-100 hover:text-indigo-600">
                      <span>🏆 {h.date} - 우리 모둠은 최종 생명 사령탑으로 이 기관을 선정했습니다:</span>
                      <span className="font-black text-slate-800">{h.winnerEmoji} {h.winnerName}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 px-4 border-t border-slate-800 text-center mt-auto space-y-2">
        <p className="font-semibold text-slate-300">초등학교 6학년 과학 디지털 교과서 보조용 인터랙티브 웹앱</p>
        <p className="text-slate-500">본 어플리케이션은 학생들의 참여를 이끌어 내는 플립러닝과 프로젝트 토론 수업에 최적화하여 설계되었습니다.</p>
        <div className="flex justify-center gap-4 text-[10px] text-slate-600">
          <span>제작단원: 생물의 구조와 기능 (기관의 소중한 협업 구조)</span>
          <span>•</span>
          <span>버전: v1.50 Standard Standalone compatible</span>
        </div>
      </footer>

    </div>
  );
}
