import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scroll, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

const CHARACTERS = [
  { id: 0, name: '세리아 (유년기/수녀복)' },
  { id: 1, name: '세리아 (유년기/파자마)' },
  { id: 2, name: '세리아 (유년기/외출복)' },
  { id: 3, name: '세리아 (성년기/성녀복)' },
  { id: 4, name: '세리아 (성년기/파자마)' },
  { id: 5, name: '세리아 (성년기/외출복)' },
];

const EXPRESSIONS = [
  "평상 시 대화", "미소", "장난, 엉뚱", "웃음, 신남, 활기", "볼 붉힘, 부끄러움", 
  "극도의 부끄러움", "우울, 슬픔", "울음, 눈물", "삐짐", "격분, 화남", 
  "진지, 결연", "놀람, 당황", "궁금, 의문, 의아", "피로, 졸림, 피곤", "걱정, 초조, 긴장", 
  "경멸", "공포", "비웃음, 혐오", "트라우마, 후회", "체념, 멘탈 붕괴", 
  "공허", "불신, 외면", "패닉, 정신 이상, 얀데레", "쓰다듬어짐", "뽀뽀(입술, 볼, 이마)", 
  "성법의 가호", "식사", "손잡기", "손잡고 끄는 중", "필로우 토크"
];

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'reader' | 'gallery'>('landing');
  const [showWorldSetting, setShowWorldSetting] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-900/50">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-[#0a1215]"
          >
            {/* World Setting Button (Top Right) */}
            <div className="absolute top-6 right-6 z-50">
              <button
                onClick={() => setShowWorldSetting(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/30 text-[#88959b] hover:text-[#c4d0d6]"
              >
                <span className="font-serif text-[11px] md:text-[13px] tracking-[0.15em] uppercase">
                  세계관 설정
                </span>
              </button>
            </div>

            {/* Cinematic Background & Dust Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* Background gradient simulating lighting */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1d333b]/80 via-[#0a1215] to-[#040709]" />
              
              {/* Bottom smoke/fog elements */}
              <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#020304] via-[#040709]/80 to-transparent" />
              <div className="absolute -bottom-[10%] left-0 w-[50%] h-[40%] bg-[#ab916b]/5 blur-[100px]" />
              <div className="absolute -bottom-[10%] right-0 w-[50%] h-[40%] bg-[#ab916b]/5 blur-[100px]" />

              {/* White Dust Particles */}
              {Array.from({ length: 45 }).map((_, i) => {
                const size = Math.random() * 3 + 1; // 1 to 4px
                const left = Math.random() * 100 + "%";
                const top = Math.random() * 100 + "%";
                const duration = Math.random() * 15 + 15; // 15 to 30s
                const delay = Math.random() * -20; // random spawn time
                return (
                  <motion.div
                    key={i}
                    className="absolute bg-[#e2e8ec] rounded-full blur-[0.5px]"
                    style={{ width: size, height: size, left, top }}
                    animate={{
                      y: ["0vh", "-10vh", "-30vh"],
                      x: [0, Math.random() * 40 - 20, Math.random() * 80 - 40],
                      opacity: [0, Math.random() * 0.4 + 0.1, 0],
                    }}
                    transition={{
                      duration: duration,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: delay,
                      ease: "linear",
                    }}
                  />
                );
              })}
            </div>

            {/* Action Buttons (Title Removed) */}
            <div className="z-10 mt-16 w-full max-w-sm mx-auto flex flex-col items-center justify-center space-y-6">
              {/* Central Play Button Concept */}
              <button 
                onClick={() => setCurrentView('reader')}
                className="relative group flex items-center justify-center w-[110px] h-[110px] rounded-full border-[1.5px] border-dashed border-[#ab916b]/30 hover:border-[#ab916b]/70 transition-all duration-700 focus:outline-none"
              >
                {/* Inner solid ring */}
                <div className="absolute inset-[8px] rounded-full border border-[#ab916b]/20 bg-[#0a0a0a]/40 backdrop-blur-[2px] group-hover:bg-[#ab916b]/15 transition-colors duration-500" />
                {/* Play triangle */}
                <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[26px] border-l-[#d1d5d8] group-hover:border-l-[#d4ba94] border-b-[14px] border-b-transparent ml-3 transition-colors duration-300 relative z-10" />
                
                {/* Outer spin on hover effect */}
                <div className="absolute inset-[-10px] rounded-full border border-[#ab916b]/0 group-hover:border-[#ab916b]/20 transition-all duration-700 scale-90 group-hover:scale-100" />
              </button>

              {/* Text Button beneath */}
              <button
                onClick={() => setCurrentView('reader')}
                className="group relative px-16 py-4 bg-[#0a0a0a]/50 backdrop-blur-md border border-[#ab916b]/40 hover:border-[#ab916b]/80 hover:bg-[#0f0f0f]/80 transition-all duration-500 flex items-center justify-center focus:outline-none"
              >
                {/* Corner diamonds */}
                <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-[9px] h-[9px] bg-gradient-to-r from-[#d4ba94] to-[#ab916b] rotate-45 shadow-[0_0_8px_rgba(212,186,148,0.4)] transition-shadow" />
                <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-[9px] h-[9px] bg-gradient-to-r from-[#ab916b] to-[#d4ba94] rotate-45 shadow-[0_0_8px_rgba(212,186,148,0.4)] transition-shadow" />
                
                <span className="font-serif text-[#bda88e] group-hover:text-[#e3caa3] text-sm md:text-base tracking-[0.3em] font-medium transition-colors duration-300">
                  웹툰 감상 시작
                </span>
              </button>

              <button
                 onClick={() => setCurrentView('gallery')}
                 className="mt-4 text-[#88959b] hover:text-[#d4ba94] transition-colors duration-300 flex items-center gap-2 text-sm tracking-widest font-serif border-b border-transparent hover:border-[#d4ba94]/50 pb-1"
              >
                 <ImageIcon className="w-4 h-4" />
                 캐릭터 갤러리
              </button>
            </div>
          </motion.div>
        )}
        
        {currentView === 'reader' && (
          <motion.div
            key="reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#111] pb-24"
          >
            {/* Nav Bar */}
            <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 py-4 px-6 flex justify-end items-center transition-transform">
              <button
                onClick={() => setCurrentView('landing')}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                메인으로 <X className="w-4 h-4" />
              </button>
            </div>

            {/* Webtoon Content */}
            <div className="max-w-3xl mx-auto flex flex-col pt-8">
              {[
                'https://igx.kr/r/6W/7/0',
                'https://igx.kr/r/6W/7/1',
                'https://igx.kr/r/6W/7/2',
                'https://igx.kr/r/6W/7/3'
              ].map((url, idx) => (
                <div key={idx} className="w-full relative flex">
                  <img
                    src={url}
                    alt={`Webtoon panel ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover block bg-[#1a1a1a] min-h-[300px]"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
              <div className="mt-12 text-center text-[#ab916b]/80 font-serif border-t border-[#ab916b]/20 pt-8 pb-12 tracking-[0.5em] text-lg uppercase">
                END
              </div>
            </div>
          </motion.div>
        )}

        {currentView === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#070b0c] pb-24"
          >
            {/* Nav Bar */}
            <div className="sticky top-0 z-50 bg-[#070b0c]/90 backdrop-blur-md border-b border-[#ab916b]/10 py-5 px-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide py-1">
                {CHARACTERS.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharId(char.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-serif transition-colors border ${
                      selectedCharId === char.id
                        ? 'border-[#ab916b] bg-[#ab916b]/10 text-[#d4ba94]'
                        : 'border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    {char.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentView('landing')}
                className="shrink-0 text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1 self-end md:self-auto"
              >
                메인으로 <X className="w-4 h-4" />
              </button>
            </div>

            {/* Gallery Grid (Pre-rendered for zero-lag tab switching) */}
            <div className="max-w-7xl mx-auto p-6 mt-4 relative min-h-[60vh]">
              {CHARACTERS.map((char) => (
                <div 
                  key={char.id}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full"
                  style={{ display: selectedCharId === char.id ? 'grid' : 'none' }}
                >
                  {EXPRESSIONS.map((expr, idx) => (
                    <div 
                      key={idx} 
                      className="group flex flex-col bg-[#0a1215] border border-[#ab916b]/10 rounded overflow-hidden hover:border-[#ab916b]/40 transition-colors"
                    >
                      <div className="relative aspect-square overflow-hidden bg-[#111]">
                        <img
                          src={`https://igx.kr/r/6W/${char.id}/${idx}`}
                          alt={expr}
                          loading="eager"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4 flex flex-col items-center justify-center text-center h-20">
                        <span className="text-[10px] text-[#ab916b]/60 mb-1 font-mono">#{idx}</span>
                        <span className="text-xs md:text-sm text-slate-300 font-serif leading-tight">{expr}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* World Setting Modal */}
      <AnimatePresence>
        {showWorldSetting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-900 w-full max-w-2xl border border-amber-900/30 shadow-2xl relative overflow-hidden rounded-sm"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700" />
              
              <button
                onClick={() => setShowWorldSetting(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-10 space-y-8 max-h-[80vh] overflow-y-auto">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-serif text-amber-500">세계관 정보 요약</h2>
                  <p className="text-sm text-slate-400 font-serif tracking-widest">WORLD SETTING</p>
                </div>

                <div className="space-y-6">
                  <SettingItem
                    title="배경 정보"
                    desc="2025년 대한민국. 마법과 성력이 실존하며 현대 사회 인프라와 병존하고 있습니다."
                  />
                  <SettingItem
                    title="성녀의 역할"
                    desc="성법을 통해 상사병을 포함한 각종 질병을 치료합니다. 질병 치료를 목적으로 외부 의료시설에 정기적으로 파견됩니다."
                  />
                  <SettingItem
                    title="신원 정보 통제"
                    desc="성녀의 신원 및 관련 정보는 비공개 원칙입니다. 세리아가 성녀라는 사실은 민간에 알려지지 않았습니다."
                  />
                  <SettingItem
                    title="현장 특이사항"
                    desc="성녀만 단독으로 출입하는 고해성사실 내부에서 성녀 외의 신원 미상 혼잣말이 새어나온다는 사실이 보고되었습니다."
                  />
                  <SettingItem
                    title="성당의 현주소"
                    desc="성녀들의 기적으로 인해 기관의 위상이 크게 상승했으나, 현재는 종교적 목적보다 물적 수익 창출을 우선시하는 이익 집단으로 기능하고 있습니다."
                  />
                  <SettingItem
                    title="기숙사 제공 규정"
                    desc="성당 소속 제반 업무 종사자에게는 전용 기숙사가 예외 없이 의무적으로 제공됩니다."
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border-l-2 border-amber-800/50 pl-4 py-1 hover:border-amber-500 transition-colors">
      <h4 className="text-lg font-serif text-amber-100 flex items-center gap-2 mb-2">
        <ChevronRight className="w-4 h-4 text-amber-600" />
        {title}
      </h4>
      <p className="text-slate-300 leading-relaxed text-sm md:text-base">
        {desc}
      </p>
    </div>
  );
}
