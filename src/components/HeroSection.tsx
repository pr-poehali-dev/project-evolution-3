import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const slides = [
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Yevtushenko_1961.jpg/800px-Yevtushenko_1961.jpg',
    quote: 'Людей неинтересных в мире нет.',
    src: '«Людей неинтересных в мире нет», 1961',
    accent: '#f59e0b',
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Yevgeny_Yevtushenko_1991.jpg/800px-Yevgeny_Yevtushenko_1991.jpg',
    quote: 'Поэт в России — больше, чем поэт.',
    src: '«Братская ГЭС», 1965',
    accent: '#e879f9',
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Evtushenko.jpg/800px-Evtushenko.jpg',
    quote: 'Хотят ли русские войны? Спросите вы у тишины...',
    src: '«Хотят ли русские войны?», 1961',
    accent: '#34d399',
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/ru/thumb/2/22/Evtushenko_Evgeniy_Aleksandrovich.jpg/800px-Evtushenko_Evgeniy_Aleksandrovich.jpg',
    quote: 'Со мною вот что происходит: ко мне мой старый друг не ходит...',
    src: '«Со мною вот что происходит», 1957',
    accent: '#60a5fa',
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Yevtushenko_1961.jpg/800px-Yevtushenko_1961.jpg',
    quote: 'Я разный — я натруженный и праздный, я целе­устремлённый и без­дельный...',
    src: '«Пролог», 1955',
    accent: '#fb923c',
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Yevgeny_Yevtushenko_1991.jpg/800px-Yevgeny_Yevtushenko_1991.jpg',
    quote: 'Граждане, послушайте меня...',
    src: '«Граждане, послушайте меня», 1989',
    accent: '#f472b6',
  },
];

const facts = [
  { year: '1932', text: 'Родился в Зиме, Иркутская область' },
  { year: '1949', text: 'Переезд в Москву, поступление в Литературный институт' },
  { year: '1952', text: 'Первый сборник стихов «Разведчики грядущего»' },
  { year: '1955', text: 'Поэма «Пролог» — гимн молодого поколения' },
  { year: '1961', text: 'Поэма «Бабий Яр» — голос против антисемитизма' },
  { year: '1963', text: 'Выступление в Мэдисон-сквер-гарден на 14 000 человек' },
  { year: '1965', text: 'Поэма «Братская ГЭС» — вершина творчества' },
  { year: '1991', text: 'Профессор университета Талсы, США' },
  { year: '2017', text: 'Ушёл из жизни, оставив более 150 книг' },
];

const poems = [
  {
    title: 'Бабий Яр',
    year: '1961',
    lines: 'Над Бабьим Яром памятников нет. Крутой обрыв, как грубое надгробье.',
    desc: 'Поэма против антисемитизма, потрясшая СССР и мир',
    color: 'from-amber-500/20 to-transparent',
    border: 'border-amber-500/40',
  },
  {
    title: 'Хотят ли русские войны?',
    year: '1961',
    lines: 'Хотят ли русские войны? Спросите вы у тишины над ширью пашен и полей...',
    desc: 'Антивоенный гимн, ставший народной песней',
    color: 'from-emerald-500/20 to-transparent',
    border: 'border-emerald-500/40',
  },
  {
    title: 'Людей неинтересных в мире нет',
    year: '1961',
    lines: 'Людей неинтересных в мире нет. Их судьбы — как истории планет.',
    desc: 'Гимн человечеству и уникальности каждой личности',
    color: 'from-violet-500/20 to-transparent',
    border: 'border-violet-500/40',
  },
  {
    title: 'Братская ГЭС',
    year: '1965',
    lines: 'Поэт в России — больше, чем поэт. В ней суждено поэтами рождаться...',
    desc: 'Монументальная поэма о судьбе России и поэта',
    color: 'from-blue-500/20 to-transparent',
    border: 'border-blue-500/40',
  },
  {
    title: 'Пролог',
    year: '1955',
    lines: 'Я разный — я натруженный и праздный, я целеустремлённый и бездельный...',
    desc: 'Манифест поколения шестидесятников',
    color: 'from-rose-500/20 to-transparent',
    border: 'border-rose-500/40',
  },
  {
    title: 'Идут белые снеги',
    year: '1965',
    lines: 'Идут белые снеги, как по нитке скользя... Жить и жить бы на свете, но, наверно, нельзя.',
    desc: 'Лирическое размышление о жизни и смерти',
    color: 'from-sky-500/20 to-transparent',
    border: 'border-sky-500/40',
  },
];

function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function AnimSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={cn(
        'transform transition-all duration-1000 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [textKey, setTextKey] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        setTextKey((k) => k + 1);
        return (c + 1) % slides.length;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <div className="bg-zinc-950 text-white" style={{ fontFamily: 'Georgia, serif' }}>

      {/* ── HERO SLIDER ── */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* BG slides with Ken Burns */}
        <style>{`
          @keyframes kenburns {
            0%   { transform: scale(1.08) translateX(0px); }
            100% { transform: scale(1.0) translateX(-20px); }
          }
          @keyframes kenburns2 {
            0%   { transform: scale(1.0) translateX(-20px); }
            100% { transform: scale(1.08) translateX(0px); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-32px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          @keyframes lineGrow {
            from { width: 0; }
            to   { width: 100%; }
          }
          .anim-fadeinup { animation: fadeInUp 0.9s ease both; }
          .anim-fadeinleft { animation: fadeInLeft 0.9s ease both; }
          .anim-glow { animation: pulseGlow 3s ease-in-out infinite; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-600 { animation-delay: 0.6s; }
          .delay-800 { animation-delay: 0.8s; }
          .kenburns-active { animation: kenburns 5s ease-out both; }
          .kenburns-prev   { animation: kenburns2 5s ease-out both; }
        `}</style>

        {slides.map((s, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-0 transition-opacity duration-[1400ms] ease-in-out',
              i === current ? 'opacity-100 z-10' : i === prev ? 'opacity-0 z-0' : 'opacity-0 z-0'
            )}
          >
            <img
              src={s.img}
              alt=""
              className={cn(
                'h-full w-full object-cover object-top',
                i === current ? 'kenburns-active' : ''
              )}
            />
          </div>
        ))}

        {/* Gradients */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/95 via-black/65 to-black/10" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

        {/* Colored accent glow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 z-30 transition-all duration-1000"
          style={{ backgroundColor: slide.accent, boxShadow: `0 0 60px 8px ${slide.accent}55` }}
        />

        {/* Content */}
        <div className="relative z-30 flex h-full items-center">
          <div className="container mx-auto px-10 md:px-20">
            <div className="max-w-3xl">

              {/* Label */}
              <div
                key={`label-${textKey}`}
                className="anim-fadeinleft mb-6"
                style={{ animationDelay: '0s' }}
              >
                <span
                  className="text-xs uppercase tracking-[0.4em] font-bold px-3 py-1 rounded-sm"
                  style={{ color: slide.accent, border: `1px solid ${slide.accent}55`, background: `${slide.accent}18` }}
                >
                  Великий русский поэт
                </span>
              </div>

              {/* Name */}
              <div key={`name-${isLoaded}`} className={cn('transform transition-all duration-[1200ms] ease-out', isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
                <h1 className="text-7xl md:text-[9rem] font-extralight text-white leading-none tracking-tight">
                  Евгений
                </h1>
                <h1
                  className="text-7xl md:text-[9rem] font-black leading-none tracking-tight"
                  style={{ color: slide.accent, textShadow: `0 0 80px ${slide.accent}88` }}
                >
                  Евтушенко
                </h1>
                <p className="text-white/40 text-lg mt-4 font-light tracking-widest">1932 — 2017</p>
              </div>

              {/* Quote */}
              <div
                key={`quote-${textKey}`}
                className="mt-12 anim-fadeinup delay-400"
              >
                <div className="flex gap-4 items-start">
                  <span className="text-6xl font-serif leading-none mt-1" style={{ color: slide.accent }}>"</span>
                  <div>
                    <p className="text-2xl md:text-3xl text-white/90 font-light italic leading-relaxed">
                      {slide.quote}
                    </p>
                    <p className="mt-3 text-sm tracking-widest uppercase" style={{ color: `${slide.accent}bb` }}>
                      {slide.src}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3 items-center">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => { setPrev(current); setCurrent(i); setTextKey((k) => k + 1); }}
              className="transition-all duration-300"
              style={{
                height: i === current ? 4 : 4,
                width: i === current ? 40 : 20,
                background: i === current ? s.accent : 'rgba(255,255,255,0.25)',
                boxShadow: i === current ? `0 0 10px ${s.accent}` : 'none',
                borderRadius: 2,
              }}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-8 right-10 z-40 text-white/30 text-sm font-mono tracking-widest">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </section>

      {/* ── О ПОЭТЕ ── */}
      <section className="py-28 px-8 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <AnimSection>
              <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-6">О поэте</p>
              <h2 className="text-5xl md:text-6xl font-extralight text-white mb-8 leading-tight">
                Голос целого <span className="font-black text-amber-400">поколения</span>
              </h2>
              <p className="text-white/55 leading-relaxed text-lg mb-5">
                Евгений Евтушенко — символ «оттепели» и шестидесятничества. Его стихи собирали стадионы, переводились на 72 языка мира.
              </p>
              <p className="text-white/55 leading-relaxed text-lg mb-8">
                Поэт, прозаик, режиссёр, публицист — он прожил жизнь на виду у всего мира, говоря правду, когда это было опасно.
              </p>
              <div className="flex gap-8">
                {[['150+', 'книг'], ['72', 'языка'], ['40+', 'лет на сцене']].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-3xl font-black text-amber-400">{n}</p>
                    <p className="text-white/40 text-sm mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection className="delay-200">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Yevgeny_Yevtushenko_1991.jpg/800px-Yevgeny_Yevtushenko_1991.jpg"
                    alt="Евгений Евтушенко"
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 border border-amber-400/30" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-amber-400/30" />
                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm px-5 py-4 border-l-2 border-amber-400">
                  <p className="text-white/80 italic text-sm">«Поэт в России — больше, чем поэт»</p>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── ХРОНОЛОГИЯ ── */}
      <section className="py-28 px-8 md:px-16 bg-zinc-900/60">
        <div className="container mx-auto max-w-4xl">
          <AnimSection>
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4 text-center">Хронология</p>
            <h2 className="text-5xl md:text-6xl font-extralight text-white mb-20 text-center">
              Жизнь и <span className="font-black text-amber-400">творчество</span>
            </h2>
          </AnimSection>

          <div className="relative">
            <div className="absolute left-[88px] top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/60 via-amber-400/20 to-transparent" />
            <div className="space-y-10">
              {facts.map((fact, i) => (
                <AnimSection key={i} className={`delay-${Math.min(i * 100, 700)}`}>
                  <div className="flex gap-8 items-start group">
                    <div className="w-20 text-right flex-shrink-0 pt-1">
                      <span className="text-amber-400 font-black text-base">{fact.year}</span>
                    </div>
                    <div className="relative pl-8 flex-1">
                      <div
                        className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-amber-400 bg-zinc-950 -translate-x-1.5 group-hover:bg-amber-400 transition-colors duration-300"
                      />
                      <p className="text-white/70 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                        {fact.text}
                      </p>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── СТИХИ-КАРТОЧКИ ── */}
      <section className="py-28 px-8 md:px-16">
        <div className="container mx-auto max-w-6xl">
          <AnimSection>
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4 text-center">Поэзия</p>
            <h2 className="text-5xl md:text-6xl font-extralight text-white mb-20 text-center">
              Строки, ставшие <span className="font-black text-amber-400">историей</span>
            </h2>
          </AnimSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poems.map((poem, i) => (
              <AnimSection key={i}>
                <div
                  className={cn(
                    'relative border p-8 h-full bg-gradient-to-br transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-default group',
                    poem.color, poem.border
                  )}
                >
                  <div className="flex justify-between items-start mb-5">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-tight">
                      {poem.title}
                    </h3>
                    <span className="text-amber-400/50 text-xs font-mono ml-4 flex-shrink-0">{poem.year}</span>
                  </div>
                  <p className="text-white/45 italic text-sm leading-relaxed mb-5">«{poem.lines}»</p>
                  <p className="text-white/35 text-xs">{poem.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ФИНАЛЬНАЯ ЦИТАТА ── */}
      <section className="relative py-40 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Evtushenko.jpg/800px-Evtushenko.jpg"
            alt=""
            className="w-full h-full object-cover object-center opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950" />
        </div>
        <AnimSection className="relative z-10 text-center">
          <div className="container mx-auto max-w-3xl">
            <p className="text-9xl font-serif text-amber-400/15 leading-none mb-0 select-none">"</p>
            <blockquote className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed italic -mt-6">
              Поэт в России — больше, чем поэт.<br />
              В ней суждено поэтами рождаться<br />
              лишь тем, в ком бродит гордый дух гражданства,<br />
              кому уюта нет, покоя нет.
            </blockquote>
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-amber-400/40" />
              <p className="text-amber-400 text-xs uppercase tracking-[0.4em]">Евгений Евтушенко</p>
              <div className="h-px w-16 bg-amber-400/40" />
            </div>
          </div>
        </AnimSection>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-8 border-t border-white/5 text-center">
        <p className="text-white/20 text-sm tracking-widest uppercase">Евгений Александрович Евтушенко · 1932 – 2017</p>
      </footer>
    </div>
  );
}
