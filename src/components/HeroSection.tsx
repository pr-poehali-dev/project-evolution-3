import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const bgImages = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Yevtushenko_1961.jpg/800px-Yevtushenko_1961.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Yevgeny_Yevtushenko_1991.jpg/800px-Yevgeny_Yevtushenko_1991.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Evtushenko.jpg/800px-Evtushenko.jpg',
  'https://upload.wikimedia.org/wikipedia/ru/thumb/2/22/Evtushenko_Evgeniy_Aleksandrovich.jpg/800px-Evtushenko_Evgeniy_Aleksandrovich.jpg',
];

const poems = [
  { text: 'Людей неинтересных в мире нет.', poem: '«Людей неинтересных в мире нет», 1961' },
  { text: 'Поэт в России — больше, чем поэт.', poem: '«Братская ГЭС», 1965' },
  { text: 'Со мною вот что происходит: ко мне мой старый друг не ходит...', poem: '«Со мною вот что происходит», 1957' },
  { text: 'Хотят ли русские войны? Спросите вы у тишины...', poem: '«Хотят ли русские войны?», 1961' },
];

const facts = [
  { year: '1932', text: 'Родился в Зиме, Иркутская область' },
  { year: '1952', text: 'Первый сборник стихов «Разведчики грядущего»' },
  { year: '1961', text: 'Поэма «Бабий Яр» — голос против антисемитизма' },
  { year: '1965', text: 'Поэма «Братская ГЭС» — вершина творчества' },
  { year: '1991', text: 'Профессор университета в США' },
  { year: '2017', text: 'Ушёл из жизни, оставив более 150 книг' },
];

export default function HeroSection() {
  const [currentBg, setCurrentBg] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleFacts, setVisibleFacts] = useState<number[]>([]);

  useEffect(() => {
    setIsLoaded(true);

    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000);

    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % poems.length);
    }, 4000);

    facts.forEach((_, i) => {
      setTimeout(() => {
        setVisibleFacts((prev) => [...prev, i]);
      }, 1200 + i * 200);
    });

    return () => {
      clearInterval(bgInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="bg-zinc-950 text-white font-sans">

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          {bgImages.map((src, index) => (
            <div
              key={src}
              className={cn(
                'absolute inset-0 transition-opacity duration-1500 ease-in-out',
                currentBg === index ? 'opacity-100' : 'opacity-0'
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover object-top" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-8 md:px-16">
            <div className="max-w-2xl">
              <div
                className={cn(
                  'transform transition-all duration-1000 ease-out',
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                )}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4 font-medium">
                  Великий русский поэт
                </p>
                <h1 className="text-6xl md:text-8xl font-thin text-white leading-none mb-2">
                  Евгений
                </h1>
                <h1 className="text-6xl md:text-8xl font-bold text-white leading-none mb-8">
                  Евтушенко
                </h1>
                <p className="text-lg text-white/60 font-light mb-2">
                  1932 — 2017
                </p>
              </div>

              <div
                className={cn(
                  'transform transition-all duration-1000 delay-500 ease-out mt-12',
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                )}
              >
                <div className="border-l-2 border-amber-400 pl-6">
                  {poems.map((q, i) => (
                    <div
                      key={i}
                      className={cn(
                        'transition-all duration-700 ease-in-out absolute',
                        currentQuote === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                      )}
                    >
                      <p className="text-xl md:text-2xl text-white/90 font-light italic leading-relaxed">
                        «{q.text}»
                      </p>
                      <p className="text-sm text-amber-400/70 mt-3">{q.poem}</p>
                    </div>
                  ))}
                  <div className="invisible">
                    <p className="text-xl md:text-2xl font-light italic leading-relaxed">placeholder</p>
                    <p className="text-sm mt-3">placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          {bgImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBg(index)}
              className={cn(
                'h-1 transition-all duration-300',
                currentBg === index ? 'w-12 bg-amber-400' : 'w-8 bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* О ПОЭТЕ */}
      <section className="py-24 px-8 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-400 text-sm uppercase tracking-widest mb-4">О поэте</p>
              <h2 className="text-4xl md:text-5xl font-thin text-white mb-8 leading-tight">
                Голос целого <span className="font-bold">поколения</span>
              </h2>
              <p className="text-white/60 leading-relaxed text-lg mb-6">
                Евгений Александрович Евтушенко — один из крупнейших поэтов XX века, символ «оттепели» и шестидесятничества. Его стихи собирали стадионы, переводились на десятки языков мира.
              </p>
              <p className="text-white/60 leading-relaxed text-lg">
                Поэт, прозаик, режиссёр, публицист — он прожил жизнь на виду у всего мира, говоря правду, когда это было опасно.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Yevtushenko_1961.jpg/800px-Yevtushenko_1961.jpg"
                  alt="Евгений Евтушенко"
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-amber-400 text-black px-6 py-4">
                <p className="text-3xl font-bold">150+</p>
                <p className="text-sm font-medium">книг и сборников</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ХРОНОЛОГИЯ */}
      <section className="py-24 px-8 md:px-16 bg-zinc-900">
        <div className="container mx-auto max-w-4xl">
          <p className="text-amber-400 text-sm uppercase tracking-widest mb-4 text-center">Жизнь и творчество</p>
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-16 text-center leading-tight">
            Ключевые <span className="font-bold">даты</span>
          </h2>
          <div className="relative">
            <div className="absolute left-20 top-0 bottom-0 w-px bg-amber-400/20" />
            <div className="space-y-8">
              {facts.map((fact, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex gap-8 items-start transform transition-all duration-600 ease-out',
                    visibleFacts.includes(i) ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  )}
                >
                  <div className="w-16 text-right flex-shrink-0">
                    <span className="text-amber-400 font-bold text-lg">{fact.year}</span>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-amber-400 -translate-x-1.5" />
                    <p className="text-white/80 text-lg leading-relaxed">{fact.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ЗНАМЕНИТЫЕ СТИХИ */}
      <section className="py-24 px-8 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <p className="text-amber-400 text-sm uppercase tracking-widest mb-4 text-center">Поэзия</p>
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-16 text-center leading-tight">
            Строки, ставшие <span className="font-bold">историей</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Бабий Яр',
                year: '1961',
                lines: 'Над Бабьим Яром памятников нет. Крутой обрыв, как грубое надгробье.',
                desc: 'Поэма против антисемитизма, потрясшая СССР и мир'
              },
              {
                title: 'Хотят ли русские войны?',
                year: '1961',
                lines: 'Хотят ли русские войны? Спросите вы у тишины над ширью пашен и полей...',
                desc: 'Антивоенный гимн, ставший народной песней'
              },
              {
                title: 'Людей неинтересных в мире нет',
                year: '1961',
                lines: 'Людей неинтересных в мире нет. Их судьбы — как истории планет.',
                desc: 'Гимн человечеству и уникальности каждой личности'
              },
              {
                title: 'Братская ГЭС',
                year: '1965',
                lines: 'Поэт в России — больше, чем поэт. В ней суждено поэтами рождаться...',
                desc: 'Монументальная поэма о судьбе России и поэта'
              },
            ].map((poem, i) => (
              <div
                key={i}
                className="border border-white/10 p-8 hover:border-amber-400/40 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {poem.title}
                  </h3>
                  <span className="text-amber-400/60 text-sm">{poem.year}</span>
                </div>
                <p className="text-white/50 italic text-sm leading-relaxed mb-4">«{poem.lines}»</p>
                <p className="text-white/40 text-sm">{poem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЦИТАТА-ФИНАЛ */}
      <section className="py-32 px-8 md:px-16 bg-zinc-900 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="text-6xl text-amber-400/20 font-serif mb-4">"</p>
          <blockquote className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed italic mb-8">
            Поэт в России — больше, чем поэт. В ней суждено поэтами рождаться лишь тем, в ком бродит гордый дух гражданства, кому уюта нет, покоя нет.
          </blockquote>
          <p className="text-amber-400 text-sm uppercase tracking-widest">Евгений Евтушенко</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-8 border-t border-white/10 text-center">
        <p className="text-white/30 text-sm">Евгений Александрович Евтушенко · 1932–2017</p>
      </footer>
    </div>
  );
}
