import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

/* ─── Данные ─────────────────────────────── */
const PHONE     = "+7 938 438-03-17";
const PHONE_RAW = "tel:+79384380317";
const ADDRESS   = "Геленджик, ул. Горная, 4";
const INSTA     = "https://instagram.com/aleksandra_v_beauty";

const IMG = {
  hero:      "https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/7b8f025e-d53a-410e-97c2-b0bdd2907f1a.jpg",
  services:  "https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/f14a358c-e3f5-4dd2-933d-a49c070c1fa4.jpg",
  result:    "https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/df8bff23-47a9-43b0-8457-e10d9332eb35.jpg",
};

const NAV = [
  { label: "О студии",    id: "about"    },
  { label: "Направления", id: "services" },
  { label: "Цены",        id: "price"    },
  { label: "Контакты",    id: "contacts" },
];

const SERVICES = [
  {
    icon: "Zap",
    tag: "Лазер",
    title: "Лазерная эпиляция",
    desc: "Современный диодный лазер. Безопасное и стойкое удаление волос на любом участке тела. Минимум дискомфорта, максимум эффекта.",
    detail: "С 1-й процедуры",
    color: "from-rose-50 to-orange-50",
    accent: "#C9957E",
  },
  {
    icon: "Sparkles",
    tag: "Брови",
    title: "Ламинирование бровей",
    desc: "Долгосрочная укладка и питание волосков. Красивая форма и объём на 6–8 недель без ежедневного ухода.",
    detail: "Эффект до 8 недель",
    color: "from-amber-50 to-yellow-50",
    accent: "#C8A97A",
  },
  {
    icon: "Activity",
    tag: "Омоложение",
    title: "Микронидлинг",
    desc: "Стимуляция выработки коллагена и эластина. Лечение шрамов, пигментации и возрастных изменений кожи.",
    detail: "Видимый результат после курса",
    color: "from-pink-50 to-rose-50",
    accent: "#C9957E",
  },
  {
    icon: "Wind",
    tag: "Инновация",
    title: "Холодная плазма",
    desc: "Безинъекционное омоложение. Подтяжка кожи, сужение пор, лечение акне. Безопасно и без реабилитации.",
    detail: "Без уколов и хирургии",
    color: "from-purple-50 to-indigo-50",
    accent: "#8B7CB3",
  },
];

const PRICES = [
  {
    category: "Лазерная эпиляция",
    items: [
      { name: "Верхняя губа",    price: "от 600 ₽"  },
      { name: "Подмышки",        price: "от 900 ₽"  },
      { name: "Зона бикини",     price: "от 1 500 ₽" },
      { name: "Голени",          price: "от 2 200 ₽" },
      { name: "Полные ноги",     price: "от 3 800 ₽" },
    ],
  },
  {
    category: "Брови и ресницы",
    items: [
      { name: "Ламинирование бровей",     price: "от 1 800 ₽" },
      { name: "Коррекция + окрашивание",  price: "от 1 200 ₽" },
    ],
  },
  {
    category: "Аппаратная косметология",
    items: [
      { name: "Микронидлинг лицо",        price: "от 3 500 ₽" },
      { name: "Микронидлинг + сыворотка", price: "от 4 500 ₽" },
      { name: "Холодная плазма лицо",     price: "от 4 000 ₽" },
      { name: "Холодная плазма — зона",   price: "от 2 000 ₽" },
    ],
  },
];

const REVIEWS = [
  {
    name: "Анна К.",
    stars: 5,
    text: "Делала лазерную эпиляцию — результат потрясающий! Александра очень профессиональный мастер, объяснила каждый шаг. Буду возвращаться.",
  },
  {
    name: "Мария С.",
    stars: 5,
    text: "Ламинирование бровей — это что-то невероятное! Теперь не трачу по утрам время на брови. Всем советую!",
  },
  {
    name: "Елена Т.",
    stars: 5,
    text: "Курс микронидлинга просто преобразил кожу. После двух процедур пигментные пятна заметно посветлели. Очень благодарна!",
  },
];

const FAQS = [
  { q: "Больно ли делать лазерную эпиляцию?",
    a: "Ощущения индивидуальны, но современный аппарат имеет систему охлаждения кожи. Большинство клиентов описывают процедуру как лёгкое покалывание." },
  { q: "Как подготовиться к процедуре?",
    a: "За 24–48 часов сбрейте волосы в зоне обработки. За 2 недели избегайте загара и солярия. Остальные рекомендации получите на консультации." },
  { q: "Нужна ли консультация перед процедурой?",
    a: "Да, первичная консультация бесплатна. Мы оценим состояние кожи, подберём интенсивность и составим персональный план процедур." },
  { q: "Сколько сеансов потребуется?",
    a: "Для лазерной эпиляции — 6–10 сеансов. Для микронидлинга и холодной плазмы — курс от 3 до 6 процедур. Всё зависит от вашей ситуации." },
  { q: "Есть ли противопоказания?",
    a: "Беременность, активные воспаления в зоне обработки, некоторые кожные заболевания. Полный список обсудим на консультации." },
];

/* ─── Хук reveal ──────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("on"); io.disconnect(); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Звёзды ───────────────────────────────── */
function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#C8A97A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── FAQ item ─────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)}
      className="border-b border-c-petal last:border-0 cursor-pointer group">
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="font-display text-[17px] font-medium text-c-espresso">{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300
          ${open ? "bg-c-rose-d border-c-rose-d text-white rotate-45" : "border-c-rose text-c-rose-d"}`}>
          <Icon name="Plus" size={13} />
        </span>
      </div>
      {open && (
        <div className="pb-5 font-body text-sm text-c-taupe leading-relaxed pr-10 animate-appear">
          {a}
        </div>
      )}
    </div>
  );
}

/* ─── Модалка заявки ─────────────────────── */
function Modal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [name, setName]     = useState("");
  const [phone, setPhone]   = useState("");
  const [service, setService] = useState("");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-c-espresso/35 backdrop-blur-sm animate-appear"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-c-snow w-full max-w-md rounded-3xl shadow-2xl p-8 relative border-petal animate-rise"
        style={{ animationDuration: "0.42s" }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-c-blush flex items-center justify-center text-c-taupe hover:text-c-espresso transition-colors">
          <Icon name="X" size={16} />
        </button>

        {done ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full grad-rose flex items-center justify-center mx-auto mb-5">
              <Icon name="Check" size={26} className="text-white" />
            </div>
            <h3 className="font-display text-3xl text-c-espresso mb-3">Заявка отправлена</h3>
            <p className="font-body text-sm text-c-taupe leading-relaxed">
              Александра свяжется с вами в ближайшее время для подтверждения записи.
            </p>
            <button onClick={onClose}
              className="mt-6 font-body text-sm text-c-rose-d underline underline-offset-4 hover:opacity-70 transition-opacity">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-7">
              <span className="deco mx-auto mb-4 block" />
              <h3 className="font-display text-3xl font-medium text-c-espresso">Записаться</h3>
              <p className="font-body text-xs text-c-taupe mt-1.5 tracking-widest uppercase">
                Студия Александры В · Геленджик
              </p>
            </div>

            <form onSubmit={e => { e.preventDefault(); setDone(true); }} className="flex flex-col gap-5">
              <div>
                <label className="font-body text-[11px] uppercase tracking-widest text-c-taupe block mb-2">Ваше имя</label>
                <input required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Александра"
                  className="w-full border-b border-c-petal focus:border-c-rose-d outline-none bg-transparent font-body text-sm text-c-espresso py-2 transition-colors placeholder:text-c-taupe/40" />
              </div>
              <div>
                <label className="font-body text-[11px] uppercase tracking-widest text-c-taupe block mb-2">Телефон</label>
                <input required value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="+7 000 000-00-00" type="tel"
                  className="w-full border-b border-c-petal focus:border-c-rose-d outline-none bg-transparent font-body text-sm text-c-espresso py-2 transition-colors placeholder:text-c-taupe/40" />
              </div>
              <div>
                <label className="font-body text-[11px] uppercase tracking-widest text-c-taupe block mb-2">Интересующая процедура</label>
                <select value={service} onChange={e => setService(e.target.value)}
                  className="w-full border-b border-c-petal focus:border-c-rose-d outline-none bg-transparent font-body text-sm text-c-espresso py-2 transition-colors">
                  <option value="">Выберите...</option>
                  <option>Лазерная эпиляция</option>
                  <option>Ламинирование бровей</option>
                  <option>Микронидлинг</option>
                  <option>Холодная плазма</option>
                  <option>Консультация</option>
                </select>
              </div>
              <button type="submit"
                className="mt-1 w-full grad-rose text-white font-body font-semibold text-[13px] tracking-widest uppercase py-3.5 rounded-full hover:opacity-90 transition-opacity">
                Отправить заявку
              </button>
              <p className="text-center font-body text-[11px] text-c-taupe/60">
                Или позвоните: <a href={PHONE_RAW} className="text-c-rose-d hover:underline">{PHONE}</a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Главная ──────────────────────────────── */
export default function Index() {
  const [modal,   setModal]   = useState(false);
  const [menu,    setMenu]    = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePrice, setActivePrice] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-c-snow font-body">

      {/* ── NAVBAR ─────────────────────────────── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-c-petal shadow-sm" : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">

          {/* Лого */}
          <a href="#" className="flex flex-col leading-none">
            <span className="font-display text-lg font-medium text-c-espresso tracking-wide">Александра В</span>
            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-c-taupe">Студия косметологии</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                className="nav-ul font-body text-sm text-c-brown/75 hover:text-c-espresso transition-colors tracking-wide">
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href={PHONE_RAW}
              className="font-body text-sm text-c-taupe hover:text-c-rose-d transition-colors flex items-center gap-1.5">
              <Icon name="Phone" size={13} />
              {PHONE}
            </a>
            <button onClick={() => setModal(true)}
              className="grad-rose text-white font-body text-[12px] font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
              Записаться
            </button>
          </div>

          {/* Mobile */}
          <button className="md:hidden text-c-espresso" onClick={() => setMenu(!menu)}>
            <Icon name={menu ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menu && (
          <div className="md:hidden bg-c-snow border-t border-c-petal px-6 py-7 flex flex-col gap-5 animate-appear">
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                className="text-left font-display text-2xl font-medium text-c-espresso hover:text-c-rose-d transition-colors">
                {n.label}
              </button>
            ))}
            <a href={PHONE_RAW} className="font-body text-sm text-c-rose-d flex items-center gap-2">
              <Icon name="Phone" size={14} /> {PHONE}
            </a>
            <button onClick={() => { setMenu(false); setModal(true); }}
              className="grad-rose text-white font-body text-[12px] font-semibold tracking-widest uppercase px-5 py-3 rounded-full">
              Записаться
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Фото на правой части */}
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="Студия косметологии"
            className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 grad-hero-overlay" />
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-24 right-[38%] w-64 h-64 rounded-full bg-c-rose/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-32 right-[25%] w-40 h-40 rounded-full bg-amber-100/40 blur-2xl pointer-events-none" />

        {/* Вертикальная метка слева */}
        <div className="absolute left-7 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-c-rose" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-c-taupe rotate-180"
            style={{ writingMode: "vertical-rl" }}>Геленджик</span>
          <div className="w-px h-16 bg-gradient-to-t from-transparent to-c-rose" />
        </div>

        {/* Основной контент */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 pt-28 pb-20 w-full">
          <div className="max-w-[560px]">
            <Reveal>
              <span className="deco mb-5 block" />
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-c-rose-d mb-5">
                Эстетическая косметология
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display font-medium text-c-espresso leading-[1.1] mb-6"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}>
                Начни путь<br />
                к <em className="not-italic text-rose-grad">совершенству</em>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="font-body text-c-taupe text-base md:text-[17px] leading-relaxed max-w-[440px] mb-10">
                Лазерная эпиляция, ламинирование бровей, микронидлинг
                и холодная плазма — современные технологии для вашей красоты.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setModal(true)}
                  className="grad-rose text-white font-body font-semibold text-[13px] tracking-widest uppercase px-8 py-4 rounded-full hover:opacity-90 transition-all hover:scale-[1.02] shadow-md">
                  Записаться
                </button>
                <button onClick={() => go("services")}
                  className="font-body text-[13px] text-c-brown tracking-wide px-8 py-4 rounded-full border-petal border hover:bg-c-blush transition-colors">
                  Наши направления
                </button>
              </div>
            </Reveal>

            {/* Мини-статистика */}
            <Reveal delay={320}>
              <div className="flex gap-8 mt-12 pt-8 border-t border-c-petal">
                {[
                  { val: "5.0", sub: "Рейтинг на Яндексе" },
                  { val: "4+",  sub: "Направления" },
                  { val: "∞",   sub: "Довольных клиентов" },
                ].map(s => (
                  <div key={s.sub}>
                    <div className="font-display text-3xl font-medium text-c-espresso">{s.val}</div>
                    <div className="font-body text-[11px] text-c-taupe mt-0.5 leading-tight">{s.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-c-taupe/40 animate-float">
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-c-rose" />
        </div>
      </section>

      {/* ── О СТУДИИ ───────────────────────────── */}
      <section id="about" className="py-24 md:py-32 bg-c-snow">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            <Reveal>
              <div className="relative">
                <img src={IMG.result} alt="Результат процедуры"
                  className="w-full h-[500px] object-cover object-top rounded-3xl" />
                {/* Бейдж */}
                <div className="absolute -bottom-5 -right-4 bg-white rounded-2xl px-5 py-4 border-petal shadow-lg">
                  <Stars n={5} />
                  <div className="font-display text-base font-medium text-c-espresso mt-1.5">Яндекс · 5.0</div>
                  <div className="font-body text-[11px] text-c-taupe">более 40 отзывов</div>
                </div>
                {/* Декор-кружок */}
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-rose-m border-2 opacity-40" />
                <div className="absolute top-8 -left-2 w-12 h-12 rounded-full bg-c-rose/30 blur-xl" />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <span className="deco mb-5 block" />
              <p className="font-body text-[11px] tracking-[0.35em] uppercase text-c-rose-d mb-4">О студии</p>
              <h2 className="font-display font-medium text-c-espresso leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                Красота — это<br />
                <em className="not-italic text-rose-grad">точная наука</em>
              </h2>
              <p className="font-body text-c-taupe text-[15px] leading-relaxed mb-4">
                Студия эстетической косметологии Александры В — место, где современные технологии
                встречаются с индивидуальным подходом к каждому клиенту.
              </p>
              <p className="font-body text-c-taupe text-[15px] leading-relaxed mb-8">
                Мы работаем только на сертифицированном оборудовании и используем
                профессиональные препараты. Каждая процедура начинается с консультации —
                потому что ваша кожа уникальна.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "Shield",   text: "Сертифицированное оборудование" },
                  { icon: "UserCheck",text: "Индивидуальный подход"          },
                  { icon: "Award",    text: "Опытный специалист"             },
                  { icon: "Heart",    text: "Безопасные процедуры"           },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-c-petal flex items-center justify-center mt-0.5">
                      <Icon name={item.icon} size={13} className="text-c-rose-d" />
                    </div>
                    <span className="font-body text-[13px] text-c-brown leading-snug pt-1">{item.text}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setModal(true)}
                className="grad-rose text-white font-body font-semibold text-[12px] tracking-widest uppercase px-7 py-3 rounded-full hover:opacity-90 transition-opacity">
                Бесплатная консультация
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── НАПРАВЛЕНИЯ ────────────────────────── */}
      <section id="services" className="py-24 md:py-32 grad-warm">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="deco mx-auto mb-5 block" />
            <p className="font-body text-[11px] tracking-[0.35em] uppercase text-c-rose-d mb-3">Направления</p>
            <h2 className="font-display font-medium text-c-espresso"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Наши <em className="not-italic text-rose-grad">процедуры</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="card-lift bg-white rounded-3xl p-8 border-petal h-full flex flex-col group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${s.accent}22, ${s.accent}44)` }}>
                      <Icon name={s.icon} size={20} style={{ color: s.accent }} />
                    </div>
                    <span className="font-body text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-c-blush text-c-rose-d">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-[22px] font-medium text-c-espresso mb-3">{s.title}</h3>
                  <p className="font-body text-[14px] text-c-taupe leading-relaxed flex-1 mb-5">{s.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-c-petal">
                    <span className="font-body text-[12px] text-c-rose-d flex items-center gap-1.5">
                      <Icon name="CheckCircle" size={13} />
                      {s.detail}
                    </span>
                    <button onClick={() => setModal(true)}
                      className="font-body text-[12px] text-c-brown hover:text-c-rose-d transition-colors flex items-center gap-1">
                      Записаться
                      <Icon name="ArrowRight" size={13} />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Фото-баннер */}
          <Reveal className="mt-8">
            <div className="relative rounded-3xl overflow-hidden h-52 md:h-64">
              <img src={IMG.services} alt="Процедуры" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-c-espresso/70 to-transparent" />
              <div className="absolute inset-0 flex items-center px-10 md:px-14">
                <div>
                  <p className="font-body text-[11px] tracking-[0.35em] uppercase text-c-rose mb-2">Всё включено</p>
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-white mb-4">
                    Первая консультация — бесплатно
                  </h3>
                  <button onClick={() => setModal(true)}
                    className="glass border-petal font-body text-[12px] font-semibold tracking-widest uppercase text-c-espresso px-6 py-2.5 rounded-full hover:bg-white transition-colors">
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ЦЕНЫ ───────────────────────────────── */}
      <section id="price" className="py-24 md:py-32 bg-c-snow">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="deco mx-auto mb-5 block" />
            <p className="font-body text-[11px] tracking-[0.35em] uppercase text-c-rose-d mb-3">Стоимость</p>
            <h2 className="font-display font-medium text-c-espresso"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Цены на <em className="not-italic text-rose-grad">процедуры</em>
            </h2>
          </Reveal>

          <Reveal>
            {/* Табы */}
            <div className="flex gap-2 flex-wrap justify-center mb-8">
              {PRICES.map((cat, i) => (
                <button key={cat.category} onClick={() => setActivePrice(i)}
                  className={`font-body text-[13px] tracking-wide px-5 py-2 rounded-full transition-all ${
                    activePrice === i
                      ? "grad-rose text-white shadow-sm"
                      : "bg-c-blush text-c-taupe hover:text-c-espresso"
                  }`}>
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Таблица */}
            <div className="bg-white rounded-3xl border-petal overflow-hidden shadow-sm">
              {PRICES[activePrice].items.map((item, i) => (
                <div key={item.name}
                  className={`flex items-center justify-between px-7 py-5 hover:bg-c-blush transition-colors ${
                    i < PRICES[activePrice].items.length - 1 ? "border-b border-c-petal" : ""
                  }`}>
                  <div className="font-display text-[17px] font-medium text-c-espresso">{item.name}</div>
                  <div className="font-display text-xl font-medium text-rose-grad whitespace-nowrap ml-4">{item.price}</div>
                </div>
              ))}
            </div>

            <p className="text-center font-body text-[12px] text-c-taupe/60 mt-4">
              Точная стоимость определяется на консультации · Действуют комплексные скидки
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── ОТЗЫВЫ ─────────────────────────────── */}
      <section className="py-24 grad-warm">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="deco mx-auto mb-5 block" />
            <p className="font-body text-[11px] tracking-[0.35em] uppercase text-c-rose-d mb-3">Отзывы</p>
            <h2 className="font-display font-medium text-c-espresso"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Говорят <em className="not-italic text-rose-grad">клиенты</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 80}>
                <div className="card-lift bg-white rounded-3xl p-7 border-petal h-full flex flex-col">
                  <Stars n={r.stars} />
                  <p className="font-body text-[14px] text-c-taupe leading-relaxed flex-1 mt-4 mb-5">
                    «{r.text}»
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-c-petal">
                    <div className="w-8 h-8 rounded-full bg-c-petal flex items-center justify-center">
                      <span className="font-display text-sm font-medium text-c-rose-d">{r.name[0]}</span>
                    </div>
                    <span className="font-body text-[13px] font-medium text-c-brown">{r.name}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────── */}
      <section className="py-24 bg-c-snow">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <span className="deco mx-auto mb-5 block" />
            <p className="font-body text-[11px] tracking-[0.35em] uppercase text-c-rose-d mb-3">Вопросы</p>
            <h2 className="font-display font-medium text-c-espresso"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Часто <em className="not-italic text-rose-grad">спрашивают</em>
            </h2>
          </Reveal>
          <Reveal>
            {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </Reveal>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-c-espresso">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #E8C9BA 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-c-rose/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-200/8 blur-3xl" />

        <Reveal>
          <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
            <span className="deco mx-auto mb-6 block" />
            <p className="font-body text-[11px] tracking-[0.4em] uppercase text-c-rose mb-4">Запись</p>
            <h2 className="font-display font-medium text-white leading-tight mb-5"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}>
              Начни путь<br />
              к <em className="not-italic text-rose-grad">совершенству</em>
            </h2>
            <p className="font-body text-white/50 text-[15px] mb-10 leading-relaxed">
              Оставьте заявку — и я свяжусь с вами для подбора удобного времени и процедуры.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setModal(true)}
                className="grad-rose text-white font-body font-semibold text-[13px] tracking-widest uppercase px-9 py-4 rounded-full hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg">
                Записаться на процедуру
              </button>
              <a href={PHONE_RAW}
                className="border border-white/15 text-white/75 font-body text-[13px] tracking-wide px-9 py-4 rounded-full hover:bg-white/5 transition-all flex items-center gap-2 justify-center">
                <Icon name="Phone" size={15} />
                {PHONE}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── КОНТАКТЫ ───────────────────────────── */}
      <section id="contacts" className="py-20 bg-c-blush">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal>
              <div className="flex flex-col gap-1.5">
                <span className="font-body text-[10px] tracking-widest uppercase text-c-taupe mb-2">Телефон</span>
                <a href={PHONE_RAW} className="font-display text-xl text-c-espresso hover:text-c-rose-d transition-colors">
                  {PHONE}
                </a>
                <span className="font-body text-[13px] text-c-taupe">Позвоните или напишите</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex flex-col gap-1.5">
                <span className="font-body text-[10px] tracking-widest uppercase text-c-taupe mb-2">Адрес</span>
                <span className="font-display text-xl text-c-espresso">{ADDRESS}</span>
                <span className="font-body text-[13px] text-c-taupe">Геленджик, рядом с набережной</span>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="flex flex-col gap-1.5">
                <span className="font-body text-[10px] tracking-widest uppercase text-c-taupe mb-2">Режим работы</span>
                <span className="font-display text-xl text-c-espresso">Пн–Сб: 9:00–20:00</span>
                <span className="font-body text-[13px] text-c-taupe">Воскресенье — по договорённости</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer className="bg-c-espresso py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <div className="font-display text-lg font-medium text-white">Александра В</div>
              <div className="font-body text-[11px] text-white/35 tracking-widest uppercase mt-0.5">
                Студия косметологии · Геленджик
              </div>
            </div>
            <nav className="flex gap-7 flex-wrap justify-center">
              {NAV.map(n => (
                <button key={n.id} onClick={() => go(n.id)}
                  className="font-body text-sm text-white/40 hover:text-c-rose transition-colors">
                  {n.label}
                </button>
              ))}
            </nav>
            <a href={PHONE_RAW}
              className="font-body text-sm text-c-rose hover:opacity-80 transition-opacity flex items-center gap-2">
              <Icon name="Phone" size={13} />
              {PHONE}
            </a>
          </div>
          <div className="border-t border-white/5 mt-7 pt-6 text-center">
            <p className="font-body text-[11px] text-white/20">
              © 2024 Студия косметологии Александры В. Геленджик.
            </p>
          </div>
        </div>
      </footer>

      {modal && <Modal onClose={() => setModal(false)} />}
    </div>
  );
}
