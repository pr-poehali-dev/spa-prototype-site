import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

/* ── Константы ─────────────────────────────── */
const PHONE     = "+7 937 102-19-99";
const PHONE_RAW = "tel:+79371021999";
const VK_URL    = "https://vk.com/7krugovraya";

const IMG = {
  hero:    "https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/146e080e-a7f1-4a2d-8995-5c0795c6161d.jpg",
  about:   "https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/d68e837d-4665-478a-bac4-fdc3043e293d.jpg",
  flatlay: "https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/1ec58c04-4bd5-4f85-81ce-8d6fba135ced.jpg",
};

const NAV = [
  { label: "О нас",     id: "about"    },
  { label: "Программы", id: "programs" },
  { label: "Прайс",     id: "price"    },
  { label: "Вопросы",   id: "faq"      },
];

const PROGRAMS = [
  { icon: "Sparkles", title: "Антистресс",       time: "90 мин",  hot: true,
    desc: "Ароматерапия, горячие камни и релакс-массаж. Полное отключение от мира." },
  { icon: "Flower2",  title: "Королева",          time: "120 мин", hot: false,
    desc: "Комплексный уход для лица и тела — очищение, питание, лифтинг-эффект." },
  { icon: "Droplets", title: "Морская свежесть",  time: "100 мин", hot: false,
    desc: "Обёртывание с водорослями, пилинг и глубокое увлажнение кожи." },
  { icon: "Heart",    title: "Для двоих",         time: "120 мин", hot: false,
    desc: "Синхронный массаж, ванна с лепестками и бокал шампанского." },
  { icon: "Sun",      title: "Геленджик Детокс",  time: "80 мин",  hot: false,
    desc: "Охлаждающие обёртывания и лёгкий массаж после солнца и моря." },
  { icon: "Star",     title: "VIP Клубная",       time: "150 мин", hot: false,
    desc: "Персональная программа для членов Закрытого Клуба — всё включено." },
];

const PRICES = [
  { name: "Релакс-массаж",               time: "60 мин",  price: "2 500 ₽" },
  { name: "Горячие камни",               time: "90 мин",  price: "3 800 ₽" },
  { name: "Обёртывание",                 time: "60 мин",  price: "3 200 ₽" },
  { name: "Уход для лица",               time: "60 мин",  price: "2 800 ₽" },
  { name: "Антистресс (полная программа)", time: "90 мин",  price: "5 500 ₽" },
  { name: "Королева",                    time: "120 мин", price: "7 200 ₽" },
  { name: "Для двоих",                   time: "120 мин", price: "12 000 ₽" },
  { name: "VIP Клубная",                 time: "150 мин", price: "от 9 000 ₽" },
];

const FAQS = [
  { q: "Нужна ли предварительная запись?",
    a: "Да, мы принимаем только по записи — чтобы подготовить пространство лично для вас. Оставьте заявку на сайте или позвоните нам." },
  { q: "Что такое Закрытый Клуб?",
    a: "Это камерное сообщество наших постоянных гостей. Эксклюзивные скидки, бесплатное тестирование новых процедур, прямое общение с Анной и Андреем." },
  { q: "Как стать членом Закрытого Клуба?",
    a: "Просто оставьте заявку или напишите нам — вступление бесплатно. Количество мест ограничено." },
  { q: "Есть ли подарочные сертификаты?",
    a: "Есть! На любую программу или произвольную сумму. Это наш самый популярный подарок." },
  { q: "Где вы находитесь?",
    a: "Геленджик. Точный адрес и маршрут пришлём при подтверждении записи. Рядом — бесплатная парковка." },
];

const CLUB_PERKS = [
  { icon: "Bell",         title: "Первые узнают",    desc: "Акции и новинки — для вас раньше всех" },
  { icon: "FlaskConical", title: "Тест бесплатно",   desc: "Новые процедуры — только для участников" },
  { icon: "MessageCircle",title: "Прямой контакт",   desc: "Общайтесь с нами лично, влияйте на салон" },
  { icon: "Gift",         title: "Бонусы",           desc: "Призы, сюрпризы в день рождения, подарки" },
];

/* ── Хук анимации появления ─────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.1 }
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

/* ── FAQ Item ─────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className="border-b border-s-linen/80 cursor-pointer group"
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="font-display text-lg font-medium text-s-ink">{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full border-gold-strong flex items-center justify-center border transition-transform duration-300 ${open ? "rotate-45 bg-s-gold text-white border-s-gold" : "text-s-gold"}`}>
          <Icon name="Plus" size={14} />
        </span>
      </div>
      {open && (
        <div className="pb-5 font-body text-sm text-s-stone leading-relaxed pr-10 animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
}

/* ── Модалка заявки ─────────────────────────── */
function LeadModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-s-ink/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-s-ivory w-full max-w-md rounded-2xl shadow-2xl p-8 relative border-gold animate-fade-up" style={{ animationDuration: "0.45s" }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-s-stone hover:text-s-ink transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {sent ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full grad-gold flex items-center justify-center mx-auto mb-5">
              <Icon name="Check" size={24} className="text-white" />
            </div>
            <h3 className="font-display text-3xl text-s-ink mb-3">Заявка принята</h3>
            <p className="font-body text-s-stone text-sm leading-relaxed">
              Анна или Андрей свяжутся с вами в ближайшее время. Добро пожаловать в наш мир!
            </p>
          </div>
        ) : (
          <>
            <span className="deco-line mb-6 block" />
            <h3 className="font-display text-3xl text-s-ink text-center mb-1">Оставить заявку</h3>
            <p className="font-body text-xs text-s-stone text-center mb-7 tracking-wide uppercase">7 Кругов Рая · Геленджик</p>

            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <label className="font-body text-xs uppercase tracking-widest text-s-stone block mb-1.5">Ваше имя</label>
                <input
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Анна"
                  className="w-full border-b border-s-linen focus:border-s-gold outline-none bg-transparent font-body text-sm text-s-ink py-2 transition-colors placeholder:text-s-stone/40"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-widest text-s-stone block mb-1.5">Телефон</label>
                <input
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+7 000 000-00-00"
                  type="tel"
                  className="w-full border-b border-s-linen focus:border-s-gold outline-none bg-transparent font-body text-sm text-s-ink py-2 transition-colors placeholder:text-s-stone/40"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-widest text-s-stone block mb-1.5">Пожелание (необязательно)</label>
                <input
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Программа, удобное время..."
                  className="w-full border-b border-s-linen focus:border-s-gold outline-none bg-transparent font-body text-sm text-s-ink py-2 transition-colors placeholder:text-s-stone/40"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full grad-gold text-white font-body font-medium text-sm tracking-widest uppercase py-3.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Отправить заявку
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Главная страница ──────────────────────── */
export default function Index() {
  const [modal, setModal]   = useState(false);
  const [menu,  setMenu]    = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-s-ivory font-body">
      {/* ── NAVBAR ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-s-ivory/95 backdrop-blur-md shadow-sm border-b border-s-linen" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Лого */}
          <a href="#" className="font-display text-xl font-medium text-s-ink tracking-wide">
            7 <span className="text-gold">Кругов Рая</span>
          </a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                className="underline-gold font-body text-sm text-s-stone hover:text-s-ink transition-colors tracking-wide">
                {n.label}
              </button>
            ))}
          </nav>

          {/* Телефон + CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a href={PHONE_RAW} className="font-body text-sm text-s-stone hover:text-s-gold transition-colors flex items-center gap-1.5">
              <Icon name="Phone" size={13} />
              {PHONE}
            </a>
            <button onClick={() => setModal(true)}
              className="grad-gold text-white font-body text-xs font-medium tracking-widest uppercase px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
              Оставить заявку
            </button>
          </div>

          {/* Mobile burger */}
          <button className="md:hidden text-s-ink" onClick={() => setMenu(!menu)}>
            <Icon name={menu ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {menu && (
          <div className="md:hidden bg-s-ivory border-t border-s-linen px-6 py-6 flex flex-col gap-5 animate-fade-in">
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                className="text-left font-display text-2xl text-s-ink hover:text-s-gold transition-colors">
                {n.label}
              </button>
            ))}
            <a href={PHONE_RAW} className="font-body text-sm text-s-gold flex items-center gap-2">
              <Icon name="Phone" size={14} /> {PHONE}
            </a>
            <button onClick={() => { setMenu(false); setModal(true); }}
              className="grad-gold text-white font-body text-xs font-medium tracking-widest uppercase px-5 py-3 rounded-full">
              Оставить заявку
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Фото */}
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="SPA интерьер" className="w-full h-full object-cover" />
          <div className="absolute inset-0 grad-hero" />
        </div>

        {/* Декоративные блики */}
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-s-gold/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 left-10 w-48 h-48 rounded-full bg-s-rose/20 blur-2xl pointer-events-none" />

        {/* Контент — прижат к низу */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-28">
          <div className="max-w-2xl">
            <p className="font-body text-xs tracking-[0.35em] uppercase text-s-gold mb-6 animate-fade-in">
              Геленджик · Закрытый SPA-клуб
            </p>

            <h1 className="font-display font-light text-s-ink leading-[1.08] mb-6 animate-fade-up"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
              Это место, где<br />
              <em className="not-italic text-gold">разрешено быть</em><br />
              в контакте с собой
            </h1>

            <p className="font-body text-s-stone text-base md:text-lg leading-relaxed max-w-lg mb-10 animate-fade-up"
              style={{ animationDelay: "120ms" }}>
              7 Кругов Рая — пространство для тех, кто выбирает заботу о себе как ценность,
              а не роскошь.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "220ms" }}>
              <button onClick={() => setModal(true)}
                className="grad-gold text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg">
                Оставить заявку
              </button>
              <button onClick={() => go("programs")}
                className="btn-glass text-s-ink font-body text-sm tracking-wide px-8 py-4 rounded-full">
                Смотреть программы
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 right-8 flex items-center gap-2 text-s-stone/50 text-xs font-body tracking-widest animate-bounce">
          <span>Scroll</span>
          <Icon name="ArrowDown" size={12} />
        </div>
      </section>

      {/* ── О НАС ── */}
      <section id="about" className="py-24 md:py-32 bg-s-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Фото */}
            <Reveal className="relative order-2 md:order-1">
              <div className="relative">
                <img src={IMG.about} alt="SPA процедура"
                  className="w-full h-[520px] object-cover rounded-2xl" />
                {/* Плашка рейтинга */}
                <div className="absolute -top-5 -right-5 bg-white rounded-2xl px-5 py-4 shadow-lg border-gold">
                  <div className="font-display text-3xl font-medium text-s-gold">★ 4.9</div>
                  <div className="font-body text-xs text-s-stone mt-0.5">рейтинг в Яндекс</div>
                </div>
                {/* Плашка опыта */}
                <div className="absolute -bottom-5 -left-5 bg-s-ink rounded-2xl px-5 py-4 shadow-lg">
                  <div className="font-display text-3xl font-medium text-s-gold-l">7+</div>
                  <div className="font-body text-xs text-s-ivory/60 mt-0.5">лет в Геленджике</div>
                </div>
                {/* Вертикальная линия-деко */}
                <div className="absolute left-[-28px] top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-s-gold/40 to-transparent hidden md:block" />
              </div>
            </Reveal>

            {/* Текст */}
            <Reveal className="order-1 md:order-2">
              <span className="deco-line" style={{ margin: "0 0 20px 0" }} />
              <p className="font-body text-xs tracking-[0.3em] uppercase text-s-gold mb-4">О нас</p>
              <h2 className="font-display font-light text-s-ink leading-tight mb-6"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
                Анна и Андрей —<br />
                <em className="not-italic text-gold">основатели клуба</em>
              </h2>
              <p className="font-body text-s-stone leading-relaxed mb-4 text-[15px]">
                Мы создали «7 Кругов Рая» как место, где каждый гость чувствует себя желанным.
                Не просто клиент — а человек, о котором по-настоящему заботятся.
              </p>
              <p className="font-body text-s-stone leading-relaxed mb-8 text-[15px]">
                Наш Закрытый Клуб — это камерное пространство для близких гостей.
                Эксклюзивные условия, первый доступ к новинкам и живое общение с нами лично.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { icon: "Users",  text: "Закрытый клуб с ограниченным числом мест" },
                  { icon: "Shield", text: "Только лицензированные специалисты" },
                  { icon: "Heart",  text: "Каждая деталь — с заботой о вас" },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-s-linen flex items-center justify-center">
                      <Icon name={item.icon} size={14} className="text-s-gold" />
                    </div>
                    <span className="font-body text-sm text-s-stone pt-1.5">{item.text}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── КЛУБНЫЕ ПРИВИЛЕГИИ ── */}
      <section className="py-20 bg-s-pearl">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="deco-line mb-5 block" />
            <p className="font-body text-xs tracking-[0.3em] uppercase text-s-gold mb-3">Закрытый клуб</p>
            <h2 className="font-display font-light text-s-ink" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Привилегии <em className="not-italic text-gold">участников</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CLUB_PERKS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="lift border-gold bg-white rounded-2xl p-7 text-center h-full">
                  <div className="w-11 h-11 rounded-xl grad-gold flex items-center justify-center mx-auto mb-5">
                    <Icon name={p.icon} size={18} className="text-white" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-s-ink mb-2">{p.title}</h3>
                  <p className="font-body text-sm text-s-stone leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-10">
            <button onClick={() => setModal(true)}
              className="grad-gold text-white font-body text-xs font-medium tracking-widest uppercase px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity">
              Вступить в клуб
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── ПРОГРАММЫ ── */}
      <section id="programs" className="py-24 md:py-32 bg-s-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="deco-line mb-5 block" />
            <p className="font-body text-xs tracking-[0.3em] uppercase text-s-gold mb-3">Программы</p>
            <h2 className="font-display font-light text-s-ink" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Выберите <em className="not-italic text-gold">своё расслабление</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="lift border-gold bg-white rounded-2xl p-7 flex flex-col h-full group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-s-linen group-hover:grad-gold transition-all duration-500 flex items-center justify-center">
                      <Icon name={p.icon} size={18} className="text-s-gold group-hover:text-white transition-colors duration-500" />
                    </div>
                    {p.hot && (
                      <span className="text-[10px] font-body font-medium tracking-widest uppercase px-3 py-1 bg-s-gold text-white rounded-full">
                        Хит
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-medium text-s-ink mb-2">{p.title}</h3>
                  <p className="font-body text-sm text-s-stone leading-relaxed flex-1 mb-5">{p.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-s-linen">
                    <div className="flex items-center gap-1.5 text-s-stone">
                      <Icon name="Clock" size={13} />
                      <span className="font-body text-xs tracking-wide">{p.time}</span>
                    </div>
                    <button onClick={() => setModal(true)}
                      className="font-body text-xs text-s-gold tracking-wide hover:underline transition">
                      Записаться →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПРАЙС ── */}
      <section id="price" className="py-24 md:py-32 bg-s-pearl">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="deco-line mb-5 block" />
            <p className="font-body text-xs tracking-[0.3em] uppercase text-s-gold mb-3">Прайс-лист</p>
            <h2 className="font-display font-light text-s-ink" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Стоимость <em className="not-italic text-gold">процедур</em>
            </h2>
          </Reveal>

          <Reveal>
            <div className="bg-white rounded-2xl border-gold overflow-hidden shadow-sm">
              {PRICES.map((item, i) => (
                <div key={item.name}
                  className={`flex items-center justify-between px-7 py-5 hover:bg-s-ivory/60 transition-colors ${
                    i < PRICES.length - 1 ? "border-b border-s-linen" : ""
                  }`}
                >
                  <div>
                    <div className="font-display text-lg font-medium text-s-ink">{item.name}</div>
                    <div className="flex items-center gap-1 text-s-stone mt-0.5">
                      <Icon name="Clock" size={11} />
                      <span className="font-body text-xs">{item.time}</span>
                    </div>
                  </div>
                  <div className="font-display text-xl font-medium text-gold whitespace-nowrap ml-4">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center font-body text-xs text-s-stone/60 mt-4">
              Члены Закрытого Клуба получают эксклюзивные скидки — уточняйте при записи
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── ГАЛЕРЕЯ ── */}
      <section className="py-24 bg-s-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="deco-line mb-5 block" />
            <p className="font-body text-xs tracking-[0.3em] uppercase text-s-gold mb-3">Атмосфера</p>
            <h2 className="font-display font-light text-s-ink" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Пространство <em className="not-italic text-gold">рая</em>
            </h2>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7">
                <img src={IMG.hero} alt="Интерьер SPA"
                  className="w-full h-72 md:h-[460px] object-cover rounded-2xl" />
              </div>
              <div className="md:col-span-5 flex flex-col gap-4">
                <img src={IMG.about} alt="Процедура"
                  className="w-full h-48 md:h-[218px] object-cover rounded-2xl" />
                <img src={IMG.flatlay} alt="Аксессуары"
                  className="w-full h-48 md:h-[218px] object-cover rounded-2xl" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 md:py-32 bg-s-pearl">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="deco-line mb-5 block" />
            <p className="font-body text-xs tracking-[0.3em] uppercase text-s-gold mb-3">Вопросы</p>
            <h2 className="font-display font-light text-s-ink" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Часто <em className="not-italic text-gold">спрашивают</em>
            </h2>
          </Reveal>

          <Reveal>
            <div>
              {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-28 relative overflow-hidden bg-s-ink">
        {/* Текстура */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #D4B483 0, #D4B483 1px, transparent 0, transparent 50%)", backgroundSize: "14px 14px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-s-gold/10 rounded-full blur-3xl" />

        <Reveal>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <span className="deco-line mb-6 block" />
            <p className="font-body text-xs tracking-[0.35em] uppercase text-s-gold mb-4">Запись</p>
            <h2 className="font-display font-light text-s-ivory leading-tight mb-5"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}>
              Подарите себе<br />
              <em className="not-italic text-gold">время для себя</em>
            </h2>
            <p className="font-body text-s-ivory/55 text-base mb-10 leading-relaxed">
              Оставьте заявку — и мы свяжемся с вами, чтобы подобрать идеальную программу.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setModal(true)}
                className="grad-gold text-white font-body font-medium text-sm tracking-widest uppercase px-9 py-4 rounded-full hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg">
                Оставить заявку
              </button>
              <a href={VK_URL} target="_blank" rel="noopener noreferrer"
                className="border border-s-ivory/20 text-s-ivory font-body text-sm tracking-wide px-9 py-4 rounded-full hover:bg-white/5 transition-all flex items-center gap-2 justify-center">
                <Icon name="MessageCircle" size={16} />
                ВКонтакте
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-s-ink border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-display text-xl font-medium text-s-ivory">
                7 <span className="text-gold">Кругов Рая</span>
              </div>
              <div className="font-body text-xs text-s-ivory/35 mt-0.5">SPA-клуб · Геленджик</div>
            </div>

            <nav className="flex flex-wrap gap-6 justify-center">
              {NAV.map(n => (
                <button key={n.id} onClick={() => go(n.id)}
                  className="font-body text-sm text-s-ivory/40 hover:text-s-gold transition-colors">
                  {n.label}
                </button>
              ))}
            </nav>

            <a href={PHONE_RAW} className="font-body text-sm text-s-gold flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Icon name="Phone" size={13} />
              {PHONE}
            </a>
          </div>

          <div className="border-t border-white/5 mt-8 pt-6 text-center">
            <p className="font-body text-xs text-s-ivory/20">© 2024 7 Кругов Рая. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* ── MODAL ── */}
      {modal && <LeadModal onClose={() => setModal(false)} />}
    </div>
  );
}
