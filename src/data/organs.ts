/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Organ } from '../types';

export const ORGANS: Organ[] = [
  {
    id: 'brain',
    name: '뇌',
    emoji: '🧠',
    bgColor: 'bg-indigo-100 hover:bg-indigo-200 border-indigo-400',
    textColor: 'text-indigo-700',
    selfIntroTitle: '우리 몸의 최고 사령탑, 스마트 컴퓨터!',
    introduction: '안녕하세요! 저는 뇌입니다. 여러분이 생각하고, 느끼고, 운동팀에 명령을 내릴 수 있는 것은 다 제 덕분이에요. 우리 몸이 생명을 유지하도록 모든 기관을 1초도 쉬지 않고 조절하고 통제한답니다!',
    keyFunctions: [
      '감각 기관(눈, 코, 귀 등)이 전달해 주는 주변 자극을 빠르게 알아차리고 올바르게 해석해요.',
      '근육과 뼈에 신호를 보내 걷거나 뛰고 손을 뻗어 물건을 잡을 수 있도록 행동을 직접 명령해요.',
      '여러분이 경험한 것들을 기억하고, 새로운 지식을 학습하며, 기쁨과 슬픔 등 소중한 감정을 만들어내요.'
    ],
    oneLineFunction: '우리 몸의 사령탑으로서 생각하고 온몸의 활동을 지휘하고 조절함',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-angle-of-a-man-working-on-his-computer-42358-large.mp4'
  },
  {
    id: 'heart',
    name: '심장',
    emoji: '❤️',
    bgColor: 'bg-rose-100 hover:bg-rose-200 border-rose-400',
    textColor: 'text-rose-700',
    selfIntroTitle: '쿵쾅쿵쾅! 지치지 않는 우리 몸의 원동력 펌프!',
    introduction: '안녕하세요! 저는 심장입니다. 주먹만 한 크기이지만, 아주 든든하고 강력한 근육 주머니예요. 평생 동안 단 한 번도 쉬지 않고 쿵코쿵코 뛰면서 혈액을 온몸 구석구석으로 보내 생명력을 뿜어낸답니다!',
    keyFunctions: [
      '쉬지 않는 펌프 작용을 통해 혈액을 뿜어내며 온몸 구석구석으로 강하게 순환시켜요.',
      '혈액 속의 생명 에너지원인 맑은 산소와 에너지가 되는 풍부한 영양소를 각 세포로 안전하게 실어 보내요.',
      '각 세포들이 이산화탄소와 각종 찌꺼기를 원활하게 내보낼 수 있도록 혈관 순환을 전담해요.'
    ],
    oneLineFunction: '혈액을 온몸으로 뿜어내어 산소와 영양분을 구석구석 공급함',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-healthy-heart-rate-monitor-glowing-neon-cardiogram-41916-large.mp4'
  },
  {
    id: 'lungs',
    name: '폐',
    emoji: '🫁',
    bgColor: 'bg-emerald-100 hover:bg-emerald-200 border-emerald-400',
    textColor: 'text-emerald-700',
    selfIntroTitle: '가슴속에서 상쾌하게 숨 쉬는 산소 발전소!',
    introduction: '안녕하세요! 저는 폐(허파)입니다. 갈비뼈로 보호받으며 가슴속 안쪽에 든든하게 자리 잡고 있어요. 제 안에는 수많은 작은 허파꽈리가 가득 차 있어, 여러분이 영양분을 에너지로 태울 때 필요한 소중한 산소를 상쾌하게 들이마셔 준답니다.',
    keyFunctions: [
      '여러분이 코로 들이마신 맑은 공기에서 진짜 필요한 생명 요소인 산소를 분리해 쏙 흡수해요.',
      '우리 몸속 세포들이 숨을 쉬며 쓰고 남긴 이산화탄소 찌꺼기를 모아 입 밖으로 후- 하고 내보내요.',
      '공기가 들어오고 나갈 때 가슴속 풍선처럼 부풀었다 줄어들며 몸 안의 깨끗한 기체 균형을 맞춰 준답니다.'
    ],
    oneLineFunction: '산소를 들이마시고 이산화탄소를 내보내는 호흡을 담당함',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-on-the-surface-of-water-under-sunlight-41800-large.mp4'
  },
  {
    id: 'stomach',
    name: '위',
    emoji: '😋',
    bgColor: 'bg-amber-100 hover:bg-amber-200 border-amber-400',
    textColor: 'text-amber-700',
    selfIntroTitle: '맛있는 음식은 다 나에게로! 튼튼 소독 믹서기!',
    introduction: '안녕하세요! 저는 위입니다. 식도에서 이어진 신축성 넘치는 튼튼한 주머니 모양을 하고 있어요. 여러분이 맛있는 밥을 먹으면 제가 다 받아서 염산처럼 강력한 위액과 섞어 잘게 부수고 소독해 준답니다!',
    keyFunctions: [
      '매우 강력한 산성의 위액을 뿜어내어 몸 밖에서 묻어 들어온 다양한 유해 세균을 완벽하게 소독해요.',
      '음식물을 이리저리 뒤섞고 주물러 죽처럼 아주 묽고 부드러운 형태로 만들어 소장이 소화하기 쉽게 다듬어요.',
      '음식물 속에 포함된 영양소들 중 필수 활력소인 단백질을 일차적으로 가위질해 분해를 시작해요.'
    ],
    oneLineFunction: '강력한 위액으로 유해 세균을 없애고 음식물을 소화 가능하게 잘게 부숨',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-orange-juice-into-a-glass-from-a-pitcher-41893-large.mp4'
  },
  {
    id: 'small_intestine',
    name: '소장',
    emoji: '🌀',
    bgColor: 'bg-orange-100 hover:bg-orange-200 border-orange-400',
    textColor: 'text-orange-700',
    selfIntroTitle: '몸속 길쭉한 미로! 알짜배기 영양분 해결사 영양소 스폰지!',
    introduction: '안녕하세요! 저는 소장(작은창자)입니다. 우리 뱃속에 꼬불꼬불 아주 긴 6m짜리 긴 관 형태로 들어 있어요. 영양분을 아낌없이 쏙쏙 흡수하기 위해서 아주 넓은 안쪽 표면적과 정밀한 시스템인 융털을 가지고 있답니다.',
    keyFunctions: [
      '이자액, 쓸개즙 등 소화 효소들을 모아 위에서 넘어온 죽 형태의 음식을 완벽하게 마무리지어 분해해요.',
      '안쪽 벽면에 융단처럼 깔려 있는 무수한 미세 융털들을 통해 수분과 필수 영양소의 90% 이상을 쫙 빨아들여요.',
      '흡수 완료한 고농축 영양소들을 모세혈관 속 혈액으로 실어 보내 온몸의 근육과 세포에 펄펄 힘이 솟구치게 해줘요.'
    ],
    oneLineFunction: '음식물을 완벽히 분해하고 영양소를 융털로 거의 다 흡수하여 혈액으로 보냄',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-water-flowing-through-natural-rocks-and-stream-41846-large.mp4'
  },
  {
    id: 'kidney',
    name: '신장',
    emoji: '💧',
    bgColor: 'bg-sky-100 hover:bg-sky-200 border-sky-400',
    textColor: 'text-sky-700',
    selfIntroTitle: '허리 양쪽의 등대수수! 우리 몸 최고의 특급 정수기!',
    introduction: '안녕하세요! 저는 신장(콩팥)입니다. 등 뒤 허리 부근 좌우에 강낭콩 모양과 붉은 색을 띠고 든든히 지키고 있어요. 우리 몸을 가득 채운 피가 깨끗한 정화 필터인 저를 통과하며 맑은 에너지를 유지한답니다.',
    keyFunctions: [
      '혈관 속을 힘차게 순환하며 쌓여 온 찌꺼기와 수많은 화학 노폐물들을 체처럼 빈틈없이 걸러내 소독해요.',
      '걸러낸 쓸모없는 불순물을 수분과 섞어 맑은 소변으로 만들어 밖으로 잘 배출될 수 있게 방광으로 보내요.',
      '몸속 수분 비율과 소금기 정밀 수치를 항상 쾌적하게 조절해서 몸이 퉁퉁 붓거나 약해지지 않게 관리해요.'
    ],
    oneLineFunction: '혈액 속 노폐물을 깨끗하게 필터링하여 오줌으로 모아 배설함',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-glass-of-water-being-filled-from-a-filtration-pitcher-41885-large.mp4'
  },
  {
    id: 'bones',
    name: '뼈',
    emoji: '🦴',
    bgColor: 'bg-amber-50 hover:bg-amber-100 border-amber-300',
    textColor: 'text-amber-800',
    selfIntroTitle: '우리 몸의 든든한 강철 기둥, 안전 철갑 프레임!',
    introduction: '안녕하세요! 저는 뼈입니다. 매우 단단한 칼슘과 무기질 성분으로 다져진 우리 몸의 전체 기둥이에요. 사람에게 뼈가 없다면 문어나 아메바처럼 흐물흐물 바닥에 납작하게 무너져서 조금도 일어설 수 없겠죠!',
    keyFunctions: [
      '단단하고 안정감 있는 뼈대 기둥이 되어 우리 몸의 형태를 바르게 세우고 흐려지지 않게 보호해요.',
      '충격을 받으면 치명적인 머리(뇌), 가슴(심장, 폐) 등 연약한 장기들을 단단하게 감싸 철벽처럼 보호해 줘요.',
      '움직일 수 있는 견고한 지렛대 관절이 되어 주어 근육이 뼈를 당길 때 발을 내딛고 힘차게 달리게 해요.'
    ],
    oneLineFunction: '몸의 형태를 유지하며 서게 하고 뇌, 심장, 폐 같은 연약한 속살 기관을 보호함',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-making-clay-sculpture-41926-large.mp4'
  },
  {
    id: 'muscles',
    name: '근육',
    emoji: '💪',
    bgColor: 'bg-red-100 hover:bg-red-200 border-red-400',
    textColor: 'text-red-700',
    selfIntroTitle: '으랏차차! 몸을 직접 설계하고 당기는 힘의 엔진!',
    introduction: '안녕하세요! 저는 근육입니다. 우리 몸 전체 단단한 뼈를 묵직하게 둘러싸서 보호하는 활력 물질이에요. 질기고 부드러운 고무줄 모터처럼 주름져 있어 고무줄처럼 조였다 늘였다 하면서 힘을 생산하고 행동을 만듭니다.',
    keyFunctions: [
      '뼈와 협동하여 긴밀하게 수축(오그라듦)하고 이완(늘어남)함으로써 팔과 다리를 구부리고 걷고 뛸 수 있게 해줘요.',
      '여러분이 잠을 잘 때도 심장의 튼튼한 펌프질이나 위장의 조물조물 소화 주무르기 모터를 열심히 작동시켜 줘요.',
      '우리 몸의 든든한 단열 방한 패딩이 되어 추울 때 부르르 떨어 열을 만들고 적정 체온을 항상 지킵니다.'
    ],
    oneLineFunction: '수축과 이완을 통해 뼈를 끌어당겨 실제 움직임을 조종하고 보호막이 됨',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-with-battle-ropes-at-the-gym-41913-large.mp4'
  }
];

// Coordinate mapping for SVG biological network map (relative percentage 0-100%)
export const ORGAN_COORDINATES: Record<string, { x: number; y: number; label: string }> = {
  brain: { x: 50, y: 12, label: '뇌' },
  lungs: { x: 30, y: 38, label: '폐' },
  heart: { x: 50, y: 38, label: '심장' },
  stomach: { x: 70, y: 38, label: '위' },
  kidney: { x: 32, y: 64, label: '신장' },
  small_intestine: { x: 68, y: 64, label: '소장' },
  bones: { x: 25, y: 88, label: '뼈' },
  muscles: { x: 75, y: 88, label: '근육' }
};

export interface Connection {
  fromId: string;
  toId: string;
  description: string;
  bidirectional?: boolean;
}

export const ORGAN_CONNECTIONS: Connection[] = [
  {
    fromId: 'lungs',
    toId: 'heart',
    description: '폐에서 들이마신 맑은 산소를 가득 머금은 혈액을 심장으로 보내요. 심장은 이 피를 온몸으로 순환시켜요!'
  },
  {
    fromId: 'stomach',
    toId: 'small_intestine',
    description: '위에서 걸쭉하게 부서지고 소독된 음식물 조각들을 소장으로 보내 진짜 우리 몸에 흡수하기 좋은 조각으로 나눠요.'
  },
  {
    fromId: 'small_intestine',
    toId: 'heart',
    description: '소장 융털이 흡수한 알짜 영양소를 모세혈관(혈액)에 태워 심장으로 전달해요. 심장은 이 영양 피를 온몸 세포로 보내 활력을 공급해요.'
  },
  {
    fromId: 'brain',
    toId: 'lungs',
    description: '뇌의 자율신경 조절 중추가 끊임없이 폐 근처 가슴 압력을 조절하게 해서 잠을 잘 때도 절로 호흡을 이어가게 명령해요.'
  },
  {
    fromId: 'brain',
    toId: 'heart',
    description: '긴장하거나 기쁠 때 뇌의 신호에 의해 심장이 더 빨리 쿵광쿵광 뛰게 하여 비상 상황에 맞춰 피를 빨리 돌려줘요.'
  },
  {
    fromId: 'brain',
    toId: 'stomach',
    description: '배에서 쪼르륵 소리가 나거나 음식을 보기만 해도 뇌가 감지해서 위에다 미리 "소화액을 분비하라"고 전보(명령)를 내려요.'
  },
  {
    fromId: 'brain',
    toId: 'muscles',
    description: '뇌가 팔다리 운동 영역을 조종해 근육더러 "지금 당장 수축해서 달려라!"처럼 원하는 행동을 정확하고 빠르게 명령해요.'
  },
  {
    fromId: 'bones',
    toId: 'muscles',
    description: '근육과 뼈는 찰떡궁합! 단단한 뼈 기둥에 붙어있는 근육이 오그라들면서 뼈 기둥을 지렛대 삼아 끌어당겨 정교한 움직임을 만들어내요.',
    bidirectional: true
  }
];
