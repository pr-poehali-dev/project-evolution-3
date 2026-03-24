import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const facts = [
  { icon: '🌍', number: '72', label: 'языка перевода', desc: 'Стихи Евтушенко переводились на 72 языка мира — рекорд среди советских поэтов' },
  { icon: '🎤', number: '14 000', label: 'зрителей за раз', desc: 'В 1963 году выступил в Мэдисон-сквер-гарден перед 14 000 человек — небывалое для поэта' },
  { icon: '📚', number: '150+', label: 'книг и сборников', desc: 'За 65 лет творчества издал более 150 книг поэзии, прозы и публицистики' },
  { icon: '✈️', number: '94', label: 'страны посетил', desc: 'Объездил почти весь мир, будучи неофициальным культурным послом СССР' },
  { icon: '🎬', number: '2', label: 'фильма снял', desc: 'Режиссировал художественные фильмы «Детский сад» и «Похороны Сталина»' },
  { icon: '🏆', number: '1963', label: 'номинация на Нобелевку', desc: 'Был выдвинут на Нобелевскую премию по литературе в 1963 году' },
];

const worldFacts = [
  'Дружил с Робертом Кеннеди и Мэрилин Монро',
  'Лично знал Фиделя Кастро и Сальвадора Альенде',
  'Его стихи читали на похоронах Пастернака',
  'КГБ вёл за ним постоянную слежку',
  'Написал либретто к 13-й симфонии Шостаковича («Бабий Яр»)',
  'До последних дней жизни давал публичные чтения',
  'Фотографировал — его снимки выставлялись в галереях',
  'Преподавал в университете Талсы 24 года',
];

function Counter({ target, visible }: { target: string; visible: boolean }) {
  const isNum = /^\d+$/.test(target.replace(/\s/g, ''));
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!visible || !isNum) { setDisplay(target); return; }
    const num = parseInt(target.replace(/\s/g, ''));
    let start = 0;
    const duration = 1800;
    const step = 16;
    const steps = duration / step;
    const inc = num / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= num) { setDisplay(target); clearInterval(timer); }
      else setDisplay(Math.floor(start).toLocaleString('ru'));
    }, step);
    return () => clearInterval(timer);
  }, [visible, target, isNum]);

  return <>{isNum ? display : target}</>;
}

export default function FactsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-28 bg-zinc-900/40 overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 max-w-6xl">

        <div className={cn('text-center mb-20 transform transition-all duration-1000', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
          <p className="text-xs uppercase tracking-[0.4em] text-amber-400 mb-4">Цифры и факты</p>
          <h2 className="text-5xl md:text-6xl font-extralight text-white">
            Масштаб <span className="font-black text-amber-400">личности</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 mb-20">
          {facts.map((f, i) => (
            <div
              key={i}
              className={cn(
                'bg-zinc-950 p-8 md:p-10 group hover:bg-zinc-900 transition-all duration-300 transform',
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${i * 100}ms`, transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, background 0.3s ease` }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <div className="text-4xl md:text-5xl font-black text-amber-400 mb-2 tabular-nums">
                <Counter target={f.number} visible={visible} />
              </div>
              <div className="text-white/50 text-xs uppercase tracking-widest mb-4">{f.label}</div>
              <div className="text-white/30 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                {f.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Fun facts list */}
        <div className={cn('transform transition-all duration-1000 delay-500', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-8 text-center">Интересные факты</p>
          <div className="grid md:grid-cols-2 gap-4">
            {worldFacts.map((fact, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 border border-white/5 hover:border-amber-400/30 transition-colors duration-300 group"
              >
                <span className="text-amber-400 font-mono text-xs mt-1 flex-shrink-0 group-hover:text-amber-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-white/55 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
