import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const quotes = [
  { text: 'Людей неинтересных в мире нет. Их судьбы — как истории планет.', year: '1961', size: 'large', color: '#f59e0b' },
  { text: 'Поэт в России — больше, чем поэт.', year: '1965', size: 'huge', color: '#e879f9' },
  { text: 'Со мною вот что происходит: ко мне мой старый друг не ходит.', year: '1957', size: 'medium', color: '#34d399' },
  { text: 'Хотят ли русские войны? Спросите вы у тишины.', year: '1961', size: 'large', color: '#60a5fa' },
  { text: 'Я разный — я натруженный и праздный, я целеустремлённый и бездельный.', year: '1955', size: 'medium', color: '#fb923c' },
  { text: 'Не надо бояться высоких слов. Не надо бояться высоких чувств.', year: '1970', size: 'small', color: '#f472b6' },
  { text: 'Границы мне мешают... Мне неловко не знать Буэнос-Айреса, Нью-Йорка.', year: '1959', size: 'small', color: '#a78bfa' },
  { text: 'Жить и жить бы на свете, но, наверно, нельзя.', year: '1965', size: 'medium', color: '#2dd4bf' },
];

const sizeMap = { small: 'text-base', medium: 'text-lg md:text-xl', large: 'text-xl md:text-2xl', huge: 'text-2xl md:text-4xl font-bold' };
const paddingMap = { small: 'p-6', medium: 'p-8', large: 'p-10', huge: 'p-10 md:p-14' };
const spanMap = { small: '', medium: '', large: 'md:col-span-2', huge: 'md:col-span-2 lg:col-span-2' };

export default function QuoteWall() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-28 bg-black overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 max-w-6xl">
        <div className={cn('text-center mb-16 transform transition-all duration-1000', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
          <p className="text-xs uppercase tracking-[0.4em] text-amber-400 mb-4">Бессмертные строки</p>
          <h2 className="text-5xl md:text-6xl font-extralight text-white">
            Стена <span className="font-black text-amber-400">цитат</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {quotes.map((q, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                spanMap[q.size as keyof typeof spanMap],
                paddingMap[q.size as keyof typeof paddingMap],
                'relative bg-zinc-950 cursor-default transition-all duration-500 overflow-hidden',
                hovered === i ? 'bg-zinc-900' : '',
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                'transform transition-all duration-700'
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Glow bg on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${q.color}15 0%, transparent 70%)`,
                  opacity: hovered === i ? 1 : 0,
                }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
                style={{ backgroundColor: q.color, opacity: hovered === i ? 1 : 0.3 }}
              />

              <p
                className={cn('font-light italic leading-relaxed text-white/70 transition-colors duration-300 relative z-10', sizeMap[q.size as keyof typeof sizeMap])}
                style={{ color: hovered === i ? 'rgba(255,255,255,0.95)' : undefined }}
              >
                «{q.text}»
              </p>
              <p
                className="mt-4 text-xs uppercase tracking-widest relative z-10 transition-all duration-300"
                style={{ color: hovered === i ? q.color : 'rgba(255,255,255,0.2)' }}
              >
                {q.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
