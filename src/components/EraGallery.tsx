import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const eras = [
  {
    period: '1950-е',
    title: 'Начало пути',
    color: '#f59e0b',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Yevtushenko_1961.jpg/800px-Yevtushenko_1961.jpg',
    desc: 'Молодой поэт врывается в советскую литературу. Первые сборники, первые скандалы, первая слава. Евтушенко — голос нового поколения, рождённого после войны.',
    works: ['«Разведчики грядущего»', '«Третий снег»', '«Пролог»'],
  },
  {
    period: '1960-е',
    title: 'Эпоха оттепели',
    color: '#34d399',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Yevgeny_Yevtushenko_1991.jpg/800px-Yevgeny_Yevtushenko_1991.jpg',
    desc: 'Пик славы. Стадионы, зарубежные турне, Мэдисон-сквер-гарден. «Бабий Яр» гремит на весь мир. Он путешествует по 40 странам как неофициальный посол советской поэзии.',
    works: ['«Бабий Яр»', '«Братская ГЭС»', '«Хотят ли русские войны?»'],
  },
  {
    period: '1970-е',
    title: 'Зрелость и проза',
    color: '#818cf8',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Evtushenko.jpg/800px-Evtushenko.jpg',
    desc: 'Евтушенко пробует себя в прозе и кинорежиссуре. Роман «Ягодные места», фильм «Детский сад». Поэзия становится глубже и философичнее.',
    works: ['«Ягодные места»', '«Голубь в Сантьяго»', '«Талант есть чудо неслучайное»'],
  },
  {
    period: '1980–2017',
    title: 'Мировое признание',
    color: '#f472b6',
    img: 'https://upload.wikimedia.org/wikipedia/ru/thumb/2/22/Evtushenko_Evgeniy_Aleksandrovich.jpg/800px-Evtushenko_Evgeniy_Aleksandrovich.jpg',
    desc: 'Профессор американского университета. Составляет знаменитую антологию русской поэзии. До последних дней пишет стихи и выступает на публике.',
    works: ['«Последняя попытка»', '«Антология русской поэзии»', '«Нет лет»'],
  },
];

export default function EraGallery() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const era = eras[active];

  return (
    <section ref={ref} className="py-28 bg-zinc-950 overflow-hidden">
      <div className={cn('container mx-auto px-8 md:px-16 max-w-6xl transform transition-all duration-1000', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12')}>

        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: era.color }}>Эпохи</p>
          <h2 className="text-5xl md:text-6xl font-extralight text-white">
            Путь длиной в <span className="font-black" style={{ color: era.color }}>65 лет</span>
          </h2>
        </div>

        {/* Era tabs */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
          {eras.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'flex-shrink-0 px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 border',
                active === i
                  ? 'text-black border-transparent'
                  : 'text-white/40 border-white/10 hover:border-white/30 hover:text-white/70'
              )}
              style={active === i ? { backgroundColor: e.color, borderColor: e.color } : {}}
            >
              {e.period}
            </button>
          ))}
        </div>

        {/* Era content */}
        <div className="grid md:grid-cols-2 gap-0 border border-white/10">
          {/* Photo */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {eras.map((e, i) => (
              <div
                key={i}
                className={cn('absolute inset-0 transition-all duration-700', active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105')}
              >
                <img src={e.img} alt={e.title} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ))}
            <div
              className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500"
              style={{ backgroundColor: era.color, boxShadow: `0 0 20px ${era.color}` }}
            />
          </div>

          {/* Text */}
          <div className="p-10 md:p-14 flex flex-col justify-center bg-zinc-900">
            <div key={active} style={{ animation: 'fadeSlideIn 0.5s ease both' }}>
              <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }`}</style>
              <p className="text-xs uppercase tracking-[0.4em] mb-3 font-bold" style={{ color: era.color }}>{era.period}</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{era.title}</h3>
              <p className="text-white/55 leading-relaxed text-base mb-8">{era.desc}</p>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/30 mb-3">Ключевые работы</p>
                <ul className="space-y-2">
                  {era.works.map((w, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/65 text-sm">
                      <span className="w-4 h-px" style={{ backgroundColor: era.color }} />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
