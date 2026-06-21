/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, HelpCircle, Network } from 'lucide-react';
import { Connection, ORGAN_COORDINATES, ORGAN_CONNECTIONS, ORGANS } from '../data/organs';
import { Organ } from '../types';

export default function ConnectionNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 500 });
  const [selectedOrganId, setSelectedOrganId] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // Provide reasonable fallback heights
        setDimensions({
          width: Math.max(width, 300),
          height: Math.max(height, 450)
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const getAbsoluteCoords = (orgId: string) => {
    const pt = ORGAN_COORDINATES[orgId];
    if (!pt) return { x: 0, y: 0 };
    return {
      x: (pt.x / 100) * dimensions.width,
      y: (pt.y / 100) * dimensions.height
    };
  };

  const handleOrganClick = (id: string) => {
    setSelectedConnection(null);
    if (selectedOrganId === id) {
      setSelectedOrganId(null);
    } else {
      setSelectedOrganId(id);
    }
  };

  const handleConnectionClick = (conn: Connection) => {
    setSelectedOrganId(null);
    if (selectedConnection === conn) {
      setSelectedConnection(null);
    } else {
      setSelectedConnection(conn);
    }
  };

  // Find relationships involving the selected organ
  const activeConnections = selectedOrganId
    ? ORGAN_CONNECTIONS.filter(c => c.fromId === selectedOrganId || c.toId === selectedOrganId)
    : selectedConnection
    ? [selectedConnection]
    : [];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-emerald-500 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-emerald-600 text-white p-5 font-bold text-base md:text-lg flex flex-col sm:flex-row justify-between items-center px-6 gap-2">
        <h3 className="font-hand text-xl md:text-2xl flex items-center gap-2">
          <Network className="w-6 h-6 animate-pulse" />
          <span>우리 몸 장기 상호 협력 연결선</span>
        </h3>
        <span className="text-xs bg-white/20 px-3.5 py-1.5 rounded-full font-semibold border border-white/10">
          💡 동그라미나 초록색 화살표 선을 직접 눌러봐요!
        </span>
      </div>

      <div className="p-4 md:p-6 grid lg:grid-cols-4 gap-6">
        {/* Connection diagram view (3/4 width) */}
        <div className="lg:col-span-3 bg-slate-950/5 rounded-2xl p-2 relative min-h-[450px] md:min-h-[500px] border border-slate-200 overflow-hidden" ref={containerRef}>
          {/* SVG Canvas for lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-auto z-10">
            <defs>
              <marker
                id="network-arrow"
                viewBox="0 0 10 10"
                refX="23" // adjusted to align exactly at node border
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
              </marker>
              <marker
                id="network-arrow-active"
                viewBox="0 0 10 10"
                refX="23"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* DRAWING CONNECTIONS */}
            {ORGAN_CONNECTIONS.map((conn, idx) => {
              const startVal = getAbsoluteCoords(conn.fromId);
              const endVal = getAbsoluteCoords(conn.toId);
              
              const isHighlighted = selectedOrganId 
                ? (conn.fromId === selectedOrganId || conn.toId === selectedOrganId)
                : selectedConnection === conn;
              
              const strokeColor = isHighlighted ? '#f59e0b' : '#10b981';
              const strokeWidth = isHighlighted ? '5' : '3';
              const markerId = isHighlighted ? 'url(#network-arrow-active)' : 'url(#network-arrow)';

              return (
                <g key={idx} className="cursor-pointer" onClick={() => handleConnectionClick(conn)}>
                  {/* Invisible thick line for easier touch target */}
                  <line
                    x1={startVal.x}
                    y1={startVal.y}
                    x2={endVal.x}
                    y2={endVal.y}
                    stroke="transparent"
                    strokeWidth="20"
                    className="hover:stroke-amber-400/10"
                  />
                  {/* Visual Line */}
                  <line
                    x1={startVal.x}
                    y1={startVal.y}
                    x2={endVal.x}
                    y2={endVal.y}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    markerEnd={markerId}
                    className="transition-colors duration-200"
                  />
                </g>
              );
            })}
          </svg>

          {/* FLOATING ORGAN NODES */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {ORGANS.map((org) => {
              const pt = getAbsoluteCoords(org.id);
              const isSelected = selectedOrganId === org.id;
              
              // Let find if it is connected to a selected organ
              const isRelated = selectedOrganId 
                ? ORGAN_CONNECTIONS.some(c => (c.fromId === selectedOrganId && c.toId === org.id) || (c.toId === selectedOrganId && c.fromId === org.id))
                : false;

              let borderStyle = "border-emerald-400";
              if (isSelected) {
                borderStyle = "border-amber-500 scale-105 shadow-amber-200 ring-4 ring-amber-400/35 bg-amber-50";
              } else if (isRelated) {
                borderStyle = "border-indigo-400 scale-102 ring-2 ring-indigo-200 shadow-md bg-indigo-50/70";
              }

              return (
                <button
                  key={org.id}
                  onClick={() => handleOrganClick(org.id)}
                  style={{ left: `${pt.x}px`, top: `${pt.y}px` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full shadow-lg border-2 font-bold font-hand text-base md:text-lg flex items-center gap-1.5 focus:outline-none pointer-events-auto transition-all duration-300 transform hover:scale-110 active:scale-95 bg-white ${borderStyle}`}
                >
                  <span className="text-xl">{org.emoji}</span>
                  <span className="text-slate-800">{org.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Panel explaining cooperation */}
        <div className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-200 flex flex-col justify-between h-auto lg:h-[500px]">
          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-1 custom-scroll">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-1.5">
              <span className="text-lg">⚙️</span>
              <span>상호 협력 과학 가이드</span>
            </h4>

            {activeConnections.length > 0 ? (
              <div className="space-y-3">
                {selectedOrganId && (
                  <p className="text-xs font-bold text-emerald-800">
                    💡 <strong>{ORGANS.find(o => o.id === selectedOrganId)?.name}</strong>와 연결된 생명 통로입니다:
                  </p>
                )}
                {activeConnections.map((conn, idx) => {
                  const fromOrg = ORGANS.find(o => o.id === conn.fromId);
                  const toOrg = ORGANS.find(o => o.id === conn.toId);
                  return (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-indigo-100 shadow-sm space-y-1.5 animate-slide-up">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-700">
                        <span>{fromOrg?.emoji} {fromOrg?.name}</span>
                        <ArrowRight size={12} className="text-slate-400" />
                        <span>{toOrg?.emoji} {toOrg?.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                        {conn.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic space-y-3">
                <p>왼쪽 관계 모형에서 아무 기관 버튼이나 결선 화살표를 마우스로 살며시 클릭해 보세요.</p>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/50 text-slate-700 not-italic">
                  <span className="font-bold text-amber-900 block mb-0.5">예시 질문:</span>
                  "뇌 🧠 와 근육 💪은 서로 어떤 긴밀한 명령을 주고받고 있을까요?"
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 bg-emerald-50/50 p-3 rounded-xl">
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              * 폐로 숨쉬고 마신 산소 피가 전신으로 뿜어져 각 오장육부에 영양이 돌며, 뇌의 명령을 얻어 단단한 뼈와 탄탄한 근육이 뛰놉니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
