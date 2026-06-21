/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Check, 
  Award, 
  AlertCircle, 
  RefreshCw, 
  ChevronRight, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  Save, 
  Undo, 
  Sparkles 
} from 'lucide-react';
import { ORGANS } from '../data/organs';
import { Organ } from '../types';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface TeacherModeProps {
  organs: Organ[];
  onAddOrgan: (organ: Organ) => Promise<void>;
  onEditOrgan: (organ: Organ) => Promise<void>;
  onDeleteOrgan: (id: string) => Promise<void>;
  onResetOrgans: () => Promise<void>;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "심장의 가장 주된 역할은 무엇일까요?",
    options: ["음식물을 작게 쪼갠다", "우리 몸 전체에 피를 뿜어서 돌려준다", "생각하고 기억한다", "숨을 쉬어 산소를 공급한다"],
    correctIndex: 1,
    explanation: "심장은 튼튼한 근육 펌프가 되어 피를 순환시키며, 산소와 영양분을 전달합니다."
  },
  {
    id: 2,
    question: "우리가 음식을 통째로 먹었을 때, 이를 죽처럼 분해하고 유해 세균을 소독해 주는 일차 소독기 역할의 장기는 무엇인가요?",
    options: ["뇌", "폐", "위", "뼈"],
    correctIndex: 2,
    explanation: "위는 강력한 위산(위액)을 분비해서 세균을 소독하고 음식물을 잘게 부숴 줍니다."
  },
  {
    id: 3,
    question: "뼈가 단독으로 움직일 수 없기 때문에 수축과 이완(늘어나고 줄어듦)으로 뼈를 직접 당겨주는 동반지 역할의 장기는 무엇인가요?",
    options: ["근육", "신장", "소장", "뇌"],
    correctIndex: 0,
    explanation: "근육은 단독으로 서 있기 힘든 뼈에 붙어 수축과 이완을 하며 우리 몸을 실제로 기동해 줍니다."
  },
  {
    id: 4,
    question: "온몸의 핏속 노폐물을 미세 체로 말끔히 거른 뒤 소변으로 배출하는 정수기 역할의 기관은?",
    options: ["소장", "신장(콩팥)", "위", "심장"],
    correctIndex: 1,
    explanation: "신장은 허리 양쪽에 있는 콩팥으로, 피속 노폐물을 필터로 정밀 정화해서 소변을 만들어 냅니다."
  }
];

export default function TeacherMode({ 
  organs, 
  onAddOrgan, 
  onEditOrgan, 
  onDeleteOrgan, 
  onResetOrgans 
}: TeacherModeProps) {
  const displayOrgans = organs && organs.length > 0 ? organs : ORGANS;
  const [activeTab, setActiveTab] = useState<'guide' | 'summary' | 'quiz' | 'admin'>('guide');
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Admin form state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingOrganId, setEditingOrganId] = useState<string | null>(null); // null means adding a new one
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [formId, setFormId] = useState<string>('');
  const [formName, setFormName] = useState<string>('');
  const [formEmoji, setFormEmoji] = useState<string>('');
  const [formIntroduction, setFormIntroduction] = useState<string>('');
  const [formOneLine, setFormOneLine] = useState<string>('');
  const [formKf1, setFormKf1] = useState<string>('');
  const [formKf2, setFormKf2] = useState<string>('');
  const [formKf3, setFormKf3] = useState<string>('');

  const handleOptionClick = (idx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === QUIZ_QUESTIONS[currentQuizIndex].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  const openAddForm = () => {
    setEditingOrganId(null);
    setFormId(`organ_${Math.random().toString(36).substring(2, 7)}`);
    setFormName('');
    setFormEmoji('🪐');
    setFormIntroduction('');
    setFormOneLine('');
    setFormKf1('');
    setFormKf2('');
    setFormKf3('');
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (organ: Organ) => {
    setEditingOrganId(organ.id);
    setFormId(organ.id);
    setFormName(organ.name);
    setFormEmoji(organ.emoji);
    setFormIntroduction(organ.introduction);
    setFormOneLine(organ.oneLineFunction);
    setFormKf1(organ.keyFunctions[0] || '');
    setFormKf2(organ.keyFunctions[1] || '');
    setFormKf3(organ.keyFunctions[2] || '');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanId = formId.trim().toLowerCase();
    const cleanName = formName.trim();
    const cleanEmoji = formEmoji.trim();
    const cleanIntro = formIntroduction.trim();
    const cleanOneLine = formOneLine.trim();
    const cleanKf1 = formKf1.trim();
    const cleanKf2 = formKf2.trim();
    const cleanKf3 = formKf3.trim();

    if (!cleanId || !cleanName || !cleanEmoji || !cleanIntro || !cleanOneLine || !cleanKf1 || !cleanKf2 || !cleanKf3) {
      setFormError('모든 빈칸과 항목을 성실하게 기입해 주세요!');
      return;
    }

    setIsSaving(true);
    try {
      const keyFunctionsArray = [cleanKf1, cleanKf2, cleanKf3];
      const nextBgColor = 'bg-indigo-50/70 border-indigo-200';
      const nextTextColor = 'text-indigo-900';

      const organData: Organ = {
        id: cleanId,
        name: cleanName,
        emoji: cleanEmoji,
        bgColor: nextBgColor,
        textColor: nextTextColor,
        selfIntroTitle: `생명을 보조하는 ${cleanName}`,
        introduction: cleanIntro,
        oneLineFunction: cleanOneLine,
        keyFunctions: keyFunctionsArray,
        videoUrl: '' // Empty since we removed video features
      };

      if (editingOrganId) {
        await onEditOrgan(organData);
      } else {
        // Prevent duplicate custom IDs
        if (displayOrgans.some(o => o.id === cleanId)) {
          setFormError('중복된 영어 식별코드(ID)가 이미 존재합니다!');
          setIsSaving(false);
          return;
        }
        await onAddOrgan(organData);
      }

      setIsFormOpen(false);
      setEditingOrganId(null);
    } catch {
      setFormError('클라우드 데이터 저장에 실패했습니다. 연결을 확인해 주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`진짜로 우리 몸에서 [ ${name} ] 기관 데이터를 온전히 영구 삭제하시겠습니까? ⚠️`)) {
      try {
        await onDeleteOrgan(id);
      } catch (err) {
        alert('데이터 삭제 실패! 다시 시도해 주세요.');
      }
    }
  };

  const handleResetToDefaults = async () => {
    if (confirm('주의: 모든 수정 데이터 및 가가장 최근에 학생들과 추가한 기관을 모두 지우고 교과서 표준 8가지 장기로 완전히 복원할까요? 🔄')) {
      try {
        await onResetOrgans();
        setIsFormOpen(false);
        alert('성공적으로 기본 표준값으로 되돌려 놓았습니다!');
      } catch (err) {
        alert('초기화 도중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border-4 border-indigo-500 overflow-hidden mb-8 animate-fade-in">
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-550 to-purple-600 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">수업 지원용 [교사용 특별 관리소]</h2>
            <p className="text-sm text-indigo-150 font-medium">초등 6학년 과학 「생물의 구조와 기능」 단원 실시간 편집 도구</p>
          </div>
        </div>
        <div className="bg-white/20 px-3 py-1.5 rounded-full text-xs font-semibold select-none">
          📡 클라우드 실시간 동기화 중
        </div>
      </div>

      {/* Tabs list with ADMIN tab */}
      <div className="flex flex-wrap border-b-2 border-indigo-100 bg-indigo-50/50">
        <button
          onClick={() => setActiveTab('guide')}
          className={`flex-1 min-w-[120px] py-4 text-center font-bold text-xs md:text-sm lg:text-base border-b-4 transition-all ${
            activeTab === 'guide'
              ? 'border-indigo-600 text-indigo-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/30'
          }`}
        >
          📖 수업 지도 가이드
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 min-w-[120px] py-4 text-center font-bold text-xs md:text-sm lg:text-base border-b-4 transition-all ${
            activeTab === 'summary'
              ? 'border-indigo-600 text-indigo-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/30'
          }`}
        >
          📑 기관 정보 요약표
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 min-w-[120px] py-4 text-center font-bold text-xs md:text-sm lg:text-base border-b-4 transition-all ${
            activeTab === 'quiz'
              ? 'border-indigo-600 text-indigo-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/30'
          }`}
        >
          ❓ 복습 형성 평가
        </button>
        <button
          id="teacher-admin-tab-btn"
          onClick={() => setActiveTab('admin')}
          className={`flex-1 min-w-[120px] py-4 text-center font-bold text-xs md:text-sm lg:text-base border-b-4 transition-all ${
            activeTab === 'admin'
              ? 'border-indigo-600 text-indigo-700 bg-white'
              : 'border-transparent text-amber-600 hover:text-amber-700 hover:bg-indigo-50/30'
          }`}
        >
          ⚙️ 기관 데이터 실시간 편집실 (관리자)
        </button>
      </div>

      <div className="p-6 md:p-8">
        {/* TAB 1: Guide */}
        {activeTab === 'guide' && (
          <div className="space-y-6 animate-fade-in leading-relaxed text-slate-700">
            <div>
              <h3 className="text-lg font-bold text-slate-900 border-l-4 border-indigo-500 pl-3 mb-2">1. 단원 개요 및 목표</h3>
              <p className="text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium">
                본 단원은 학생들이 우리 몸 기관의 기능과 특징뿐 아니라, 각 기관들이 유기적으로 연결되어 생명을 유지한다는{' '}
                <strong className="text-indigo-600">"상호 연결성과 상호 작용"</strong>의 일반화에 도달하는 데 주안점을 둡니다. 
                이 교사용 관리 전광판에서 실시간으로 장기 구조를 교정하고 추가할 수 있습니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm mb-3">1</div>
                  <h4 className="font-semibold text-slate-900 mb-1">STEP 1 - 자기 이해 기반 탐구</h4>
                  <p className="text-xs text-slate-600">
                    학생들에게 각 기관 카드를 자유롭게 누르고 제공되는 '조사 질문 3가지'를 필기 공책에 적게끔 지도 유도합니다.
                  </p>
                </div>
                <div className="text-[11px] text-indigo-600 mt-2 font-medium">활동 시간: 10-15분</div>
              </div>

              <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm mb-3">2</div>
                  <h4 className="font-semibold text-slate-900 mb-1">STEP 2 - 모둠별 토리 및 월드컵</h4>
                  <p className="text-xs text-slate-600">
                    대결 카드가 뜰 때마다 짝꿍 혹은 모둠별로 "어느 기관이 먼저 없어지면 더 위험할까?" 등을 열정적으로 토론하게 유도합니다.
                  </p>
                </div>
                <div className="text-[11px] text-pink-600 mt-2 font-medium">활동 시간: 15-20분</div>
              </div>

              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm mb-3">3</div>
                  <h4 className="font-semibold text-slate-900 mb-1">STEP 3 - 기동 지도로 일반화</h4>
                  <p className="text-xs text-slate-600">
                    우승한 단 하나만 있으면 살 수 있을지 반대로 질문을 던지고, 유기적인 연결 맵을 짚어내 협동 원리를 이해하게 합니다.
                  </p>
                </div>
                <div className="text-[11px] text-emerald-600 mt-2 font-medium">활동 시간: 10분</div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-amber-950 mb-0.5">교수용 꿀팁</h4>
                <p className="text-xs text-amber-900">
                  교실 대형 TV에 화면을 띄워 놓고 모둠 대표 학생을 앞으로 불러 직접 "대결 선택" 클릭을 시키면 적극적인 참여를 도모할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Summary table */}
        {activeTab === 'summary' && (
          <div className="animate-fade-in overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-4">기관</th>
                  <th className="p-4">자기소개 비유</th>
                  <th className="p-4">핵심 한 줄 기능</th>
                  <th className="p-4">주요 학습 특징</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {displayOrgans.map(organ => (
                  <tr key={organ.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-2xl" role="img" aria-label={organ.name}>{organ.emoji}</span>
                      {organ.name}
                    </td>
                    <td className="p-4 italic max-w-xs truncate md:max-w-none text-xs">{organ.introduction}</td>
                    <td className="p-4 text-xs font-semibold text-indigo-600 bg-indigo-50/20">{organ.oneLineFunction}</td>
                    <td className="p-4 text-xs">
                      <ul className="list-disc pl-4 space-y-1">
                        {organ.keyFunctions.slice(0, 3).map((kf, i) => (
                          <li key={i}>{kf}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: Quiz */}
        {activeTab === 'quiz' && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            {!quizFinished ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                  <span>문제 {currentQuizIndex + 1} / {QUIZ_QUESTIONS.length}</span>
                  <span>현재 맞춘 수: {score}개</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-2.5 transition-all duration-300" 
                    style={{ width: `${((currentQuizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-1 block">형성 평가 퀴즈</span>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900">{QUIZ_QUESTIONS[currentQuizIndex].question}</h4>
                </div>

                <div className="grid gap-3">
                  {QUIZ_QUESTIONS[currentQuizIndex].options.map((opt, idx) => {
                    let btnStyle = "border-slate-300 bg-white hover:bg-indigo-50 hover:border-indigo-300";
                    
                    if (selectedOption !== null) {
                      if (idx === QUIZ_QUESTIONS[currentQuizIndex].correctIndex) {
                        btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400";
                      } else if (idx === selectedOption) {
                        btnStyle = "border-rose-400 bg-rose-50 text-rose-800";
                      } else {
                        btnStyle = "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        disabled={selectedOption !== null}
                        className={`w-full p-4 text-left rounded-xl border-2 font-semibold text-sm transition-all focus:outline-none flex justify-between items-center ${btnStyle}`}
                      >
                        <span>{idx + 1}. {opt}</span>
                        {selectedOption !== null && idx === QUIZ_QUESTIONS[currentQuizIndex].correctIndex && (
                          <Check className="w-5 h-5 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-200 animate-slide-up">
                    <div className="flex gap-2 items-start">
                      <HelpCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-indigo-950">
                          {selectedOption === QUIZ_QUESTIONS[currentQuizIndex].correctIndex ? '🎉 정답입니다!' : '😢 아쉬워요! 다시 한번 기억해 볼까요?'}
                        </p>
                        <p className="text-xs text-indigo-900 mt-1">
                          {QUIZ_QUESTIONS[currentQuizIndex].explanation}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleNextQuiz}
                      className="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1 ml-auto shadow-sm"
                    >
                      다음 문제로 이동
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-6 animate-scale-up">
                <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Award className="w-12 h-12" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">퀴즈 완료!</h4>
                  <p className="text-slate-600 mt-2">수고하셨습니다. 모든 기관 복습 퀴즈를 해결했습니다.</p>
                  <p className="text-indigo-600 font-extrabold text-3xl mt-4">
                    정답 점수: {score} / {QUIZ_QUESTIONS.length}
                  </p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 mx-auto hover:scale-105 active:scale-95"
                >
                  <RefreshCw className="w-4 h-4" />
                  첫 문제부터 다시 풀기
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ADMIN MODE */}
        {activeTab === 'admin' && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  실시간 클라우드 DB 연동 편집실
                </h3>
                <p className="text-xs text-slate-500 leading-normal">
                  교수용으로 추가된 장기 정보는 Google Cloud Firestore 서버에 즉시 업데이트되어 교실 내 학생들의 단말기나 메인 전광판에 <strong>동시에 무리없이 영구 보관</strong>됩니다. (수정을 해도 무한 리셋되지 않습니다)
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={openAddForm}
                  className="px-3.5 py-1.8 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow transition-all hover:scale-103 cursor-pointer"
                >
                  <PlusCircle size={14} />
                  기관 추가하기
                </button>
                <button
                  onClick={handleResetToDefaults}
                  className="px-3.5 py-1.8 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow transition-all hover:scale-103 cursor-pointer"
                  title="모든 정보를 초기 교과서 표준으로 되돌리기"
                >
                  <RefreshCw size={14} />
                  원래대로 복원
                </button>
              </div>
            </div>

            {/* Custom Edit/Add Form Box */}
            {isFormOpen && (
              <form onSubmit={handleFormSubmit} className="bg-indigo-50/50 rounded-2xl p-5 border-2 border-indigo-200 mt-2 space-y-4 animate-slide-up">
                <div className="flex justify-between items-center border-b border-indigo-200/60 pb-2">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    {editingOrganId ? '✏️ 기존 기관 정보 수정' : '➕ 새 기관 새로 등록'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs font-extrabold cursor-pointer"
                  >
                    닫기
                  </button>
                </div>

                {formError && (
                  <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200 font-bold flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    {formError}
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 mb-1">식별코드 (영어소문자 ID)</label>
                    <input
                      type="text"
                      disabled={!!editingOrganId}
                      value={formId}
                      onChange={(e) => setFormId(e.target.value)}
                      placeholder="예: liver, gall_bladder"
                      className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 font-medium disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 mb-1">기관 한글 이름</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="예: 이름 (예: 위, 심장...)"
                      className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 mb-1">대표 이모지</label>
                    <input
                      type="text"
                      value={formEmoji}
                      onChange={(e) => setFormEmoji(e.target.value)}
                      placeholder="예: 🧠, 🫁, 🫀, 🎒"
                      className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 font-medium text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 mb-1">기관의 친근한 자기소개 ("~" 들어갈 대사)</label>
                  <textarea
                    rows={2}
                    value={formIntroduction}
                    onChange={(e) => setFormIntroduction(e.target.value)}
                    placeholder="예: 나는 몸 속 유해독소를 해독하고 수많은 영양소를 가두어 저장하는 소수정예 화학공장이지!"
                    className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 font-medium leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 mb-1">대표 한 줄 핵심 기능</label>
                  <input
                    type="text"
                    value={formOneLine}
                    onChange={(e) => setFormOneLine(e.target.value)}
                    placeholder="예: 노폐물을 여과해 해독하고 쓸개즙을 만들어 냅니다"
                    className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-black text-slate-700">대대표 3가지 핵심 기능 상세 (각 칸 기재)</label>
                  <div className="grid gap-2">
                    <input
                      type="text"
                      value={formKf1}
                      onChange={(e) => setFormKf1(e.target.value)}
                      placeholder="기능 ① 예: 단백질이나 약물 등의 대사 처리와 유해물질 해독을 전담합니다."
                      className="w-full px-3 py-1.8 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 font-medium"
                    />
                    <input
                      type="text"
                      value={formKf2}
                      onChange={(e) => setFormKf2(e.target.value)}
                      placeholder="기능 ② 예: 여분의 당분을 글리코겐으로 전환해 창고처럼 조화롭게 저장합니다."
                      className="w-full px-3 py-1.8 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 font-medium"
                    />
                    <input
                      type="text"
                      value={formKf3}
                      onChange={(e) => setFormKf3(e.target.value)}
                      placeholder="기능 ③ 예: 간세포에서 지방 소화력을 높이는 쓸개즙을 항시 합성합니다."
                      className="w-full px-3 py-1.8 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 font-medium"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1 border-t border-indigo-200/60">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Save size={13} />
                    {isSaving ? '클라우드 저장 중...' : '💾 최종 데이터베이스 저장하기'}
                  </button>
                </div>
              </form>
            )}

            {/* Live list of organs with action buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              {displayOrgans.map((organ) => (
                <div key={organ.id} className="bg-white border border-slate-250 p-4 rounded-xl shadow-sm flex items-center justify-between gap-3 hover:border-slate-350 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl shrink-0" role="img" aria-label={organ.name}>{organ.emoji}</span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-extrabold text-slate-900 truncate">
                        {organ.name} <span className="text-[10px] text-slate-400 font-mono">({organ.id})</span>
                      </h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                        {organ.oneLineFunction}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => openEditForm(organ)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all cursor-pointer hover:scale-105"
                      title="데이터 수정"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(organ.id, organ.name)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all cursor-pointer hover:scale-105"
                      title="데이터 영구 삭제"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
