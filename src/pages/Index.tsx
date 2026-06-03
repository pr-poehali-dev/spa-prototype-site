import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const PHONE = "+7‒937‒102‒19‒99";
const PHONE_HREF = "tel:+79371021999";

const NAV_ITEMS = [
  { label: "О нас", href: "#about" },
  { label: "Программы", href: "#programs" },
  { label: "Прайс", href: "#price" },
  { label: "Вопросы", href: "#faq" },
];

const PROGRAMS = [
  {
    icon: "Sparkles",
    title: "Антистресс",
    desc: "Полное расслабление тела и ума. Ароматерапия, горячие камни, релакс-массаж.",
    duration: "90 мин",
    badge: "Хит",
  },
  {
    icon: "Flower2",
    title: "Королева",
    desc: "Уход для лица и тела: очищение, питание, лифтинг. Для сияющей кожи.",
    duration: "120 мин",
    badge: "",
  },
  {
    icon: "Droplets",
    title: "Морская свежесть",
    desc: "Обёртывание с морскими водорослями, пилинг, увлажняющий массаж.",
    duration: "100 мин",
    badge: "",
  },
  {
    icon: "Heart",
    title: "Для двоих",
    desc: "Романтическая программа для пары: синхронный массаж, ванна с лепестками, шампанское.",
    duration: "120 мин",
    badge: "Для пары",
  },
  {
    icon: "Sun",
    title: "Геленджик Детокс",
    desc: "Программа очищения после солнца и моря. Охлаждающие обёртывания, лёгкий массаж.",
    duration: "80 мин",
    badge: "",
  },
  {
    icon: "Star",
    title: "VIP Клубная",
    desc: "Эксклюзивная программа для членов Закрытого Клуба с персональным подбором процедур.",
    duration: "150 мин",
    badge: "Клуб",
  },
];

const PRICES = [
  { name: "Релакс-массаж", duration: "60 мин", price: "2 500 ₽" },
  { name: "Горячие камни", duration: "90 мин", price: "3 800 ₽" },
  { name: "Обёртывание", duration: "60 мин", price: "3 200 ₽" },
  { name: "Уход для лица", duration: "60 мин", price: "2 800 ₽" },
  { name: "Антистресс (полная программа)", duration: "90 мин", price: "5 500 ₽" },
  { name: "Королева (полная программа)", duration: "120 мин", price: "7 200 ₽" },
  { name: "Программа для двоих", duration: "120 мин", price: "12 000 ₽" },
  { name: "VIP Клубная (для членов клуба)", duration: "150 мин", price: "от 9 000 ₽" },
];

const GALLERY = [
  {
    src: "https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/272deb7c-f2dc-4f65-9087-99b3fdfb9812.jpg",
    alt: "Интерьер SPA",
  },
  {
    src: "https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/093f5573-e360-468a-9273-ead2eb115a5f.jpg",
    alt: "Процедуры SPA",
  },
  {
    src: "https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/012a412b-410d-4b3a-89f1-7abb59b8de74.jpg",
    alt: "Геленджик",
  },
];

const FAQS = [
  {
    q: "Нужна ли предварительная запись?",
    a: "Да, мы работаем только по предварительной записи, чтобы гарантировать вам полное внимание и лучший сервис. Запишитесь по телефону или в нашей группе ВКонтакте.",
  },
  {
    q: "Что такое Закрытый Клуб?",
    a: "Это наше особое сообщество постоянных гостей. Члены клуба получают эксклюзивные скидки, первыми узнают об акциях, тестируют новые процедуры бесплатно и получают приятные сюрпризы в день рождения.",
  },
  {
    q: "Как стать членом Закрытого Клуба?",
    a: "Вступление бесплатно! Напишите нам в группу ВКонтакте или позвоните, и мы расскажем все детали. Мест ограниченное количество.",
  },
  {
    q: "Есть ли у вас подарочные сертификаты?",
    a: "Конечно! Подарочные сертификаты на любую программу или на определённую сумму. Отличный подарок для близких.",
  },
  {
    q: "Где вы находитесь?",
    a: "Мы находимся в Геленджике. Точный адрес и схему проезда мы отправим при подтверждении записи. Для гостей предусмотрена бесплатная парковка.",
  },
  {
    q: "Можно ли прийти с ребёнком?",
    a: "Наш салон создан для взрослых гостей, чтобы обеспечить атмосферу полного расслабления. Мы будем рады принять вас без детей.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`section-reveal ${className}`}>
      {children}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="gold-border rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-6 py-5 gap-4">
        <span className="font-cormorant text-lg font-semibold text-spa-plum leading-snug">{q}</span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          <Icon name="Plus" size={16} className="text-spa-plum-dark" />
        </span>
      </div>
      {open && (
        <div className="px-6 pb-5 text-spa-plum/75 font-golos text-sm leading-relaxed border-t border-spa-gold/20 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-spa-cream">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-spa-plum/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-cormorant text-xl font-semibold tracking-wide text-spa-cream">
            7 <span className="text-gradient-gold">Кругов</span> Рая
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="nav-link font-golos text-sm tracking-wide text-spa-cream/80 hover:text-spa-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a
              href={PHONE_HREF}
              className="ml-4 flex items-center gap-2 bg-gradient-gold text-spa-plum-dark font-semibold text-sm px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <Icon name="Phone" size={14} />
              {PHONE}
            </a>
          </nav>

          <button className="md:hidden text-spa-cream" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-spa-plum/98 backdrop-blur-md border-t border-spa-gold/20 px-6 py-6 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-left font-cormorant text-xl text-spa-cream hover:text-spa-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a href={PHONE_HREF} className="mt-2 flex items-center gap-2 text-spa-gold font-semibold">
              <Icon name="Phone" size={16} />
              {PHONE}
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/272deb7c-f2dc-4f65-9087-99b3fdfb9812.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-spa-plum-dark/70 via-spa-plum/60 to-spa-plum-dark/80" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-spa-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-spa-terracotta/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
          <p className="font-golos text-spa-gold tracking-[0.3em] text-xs uppercase mb-6">
            Геленджик · Закрытый клуб
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl font-light text-spa-cream leading-tight mb-6">
            7 Кругов
            <br />
            <em className="text-gradient-gold not-italic">Рая</em>
          </h1>
          <p className="font-golos text-spa-cream/75 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
            Место, где рождается SPA-магия. Ваш личный оазис отдыха и красоты на берегу Чёрного моря.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("#programs")}
              className="bg-gradient-gold text-spa-plum-dark font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-all hover:scale-105 text-sm tracking-wide"
            >
              Смотреть программы
            </button>
            <a
              href={PHONE_HREF}
              className="border border-spa-gold/50 text-spa-cream px-8 py-4 rounded-full hover:bg-spa-gold/10 transition-all text-sm tracking-wide flex items-center gap-2 justify-center"
            >
              <Icon name="Phone" size={16} />
              Записаться
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-spa-cream/40 animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <p className="font-golos text-spa-gold tracking-[0.25em] text-xs uppercase mb-4">О нас</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light text-spa-plum leading-tight mb-6">
                Анна и Андрей —<br />
                <em className="text-spa-terracotta">сердце клуба</em>
              </h2>
              <p className="font-golos text-spa-plum/70 text-base leading-relaxed mb-5">
                Мы, супруги Анна и Андрей, основатели салона «7 Кругов Рая», создали это место с одной целью — подарить вам настоящее расслабление и красоту в атмосфере уюта и доверия.
              </p>
              <p className="font-golos text-spa-plum/70 text-base leading-relaxed mb-8">
                Наш Закрытый Клуб — это уютное пространство для самых близких гостей. Здесь вы не просто клиент — вы часть нашей семьи. Эксклюзивные предложения, тестирование новых процедур первыми и личное общение с нами.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                {[
                  { icon: "Users", label: "Закрытый клуб", sub: "Для своих" },
                  { icon: "Award", label: "Эксклюзив", sub: "Спецпредложения" },
                  { icon: "Heart", label: "С любовью", sub: "Каждая деталь" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-spa-plum-dark" />
                    </div>
                    <div>
                      <div className="font-cormorant font-semibold text-spa-plum text-sm">{item.label}</div>
                      <div className="font-golos text-xs text-spa-plum/50">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection>
              <div className="relative">
                <img
                  src="https://cdn.poehali.dev/projects/5c118990-e6c1-42e3-ba4b-946dfd069591/files/093f5573-e360-468a-9273-ead2eb115a5f.jpg"
                  alt="SPA процедуры"
                  className="w-full h-[480px] object-cover rounded-3xl"
                />
                <div className="absolute -bottom-5 -left-5 bg-spa-plum text-spa-cream rounded-2xl px-6 py-4 shadow-xl">
                  <div className="font-cormorant text-3xl font-semibold text-spa-gold">7+</div>
                  <div className="font-golos text-xs text-spa-cream/60 mt-0.5">лет опыта</div>
                </div>
                <div className="absolute -top-5 -right-5 bg-spa-gold text-spa-plum-dark rounded-2xl px-5 py-3 shadow-xl">
                  <div className="font-cormorant text-2xl font-semibold">★ 4.9</div>
                  <div className="font-golos text-xs mt-0.5">Рейтинг</div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CLUB BENEFITS */}
      <section className="py-20 bg-gradient-plum">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-12">
            <p className="font-golos text-spa-gold tracking-[0.25em] text-xs uppercase mb-3">Закрытый клуб</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-spa-cream">
              Привилегии <em className="text-gradient-gold">участников</em>
            </h2>
          </RevealSection>
          <RevealSection>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "Bell", title: "Первые узнают", desc: "Новинки, акции и спецпредложения — для вас раньше всех" },
                { icon: "FlaskConical", title: "Тест бесплатно", desc: "Новые процедуры и продукты — только для членов клуба" },
                { icon: "MessageCircle", title: "Личное общение", desc: "Прямой контакт с Анной и Андреем, ваши идеи важны" },
                { icon: "Gift", title: "Бонусы и призы", desc: "Розыгрыши, сюрпризы в день рождения и приятные подарки" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="gold-border rounded-2xl p-6 bg-white/5 backdrop-blur-sm card-hover text-center"
                >
                  <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} size={20} className="text-spa-plum-dark" />
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-spa-cream mb-2">{item.title}</h3>
                  <p className="font-golos text-spa-cream/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-24 md:py-32 bg-spa-cream-dark">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="font-golos text-spa-gold tracking-[0.25em] text-xs uppercase mb-3">Программы</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-spa-plum">
              Выберите <em className="text-spa-terracotta">своё</em> расслабление
            </h2>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((p) => (
              <RevealSection key={p.title}>
                <div className="card-hover bg-white rounded-3xl p-7 h-full flex flex-col gold-border shadow-sm">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 bg-gradient-gold rounded-2xl flex items-center justify-center">
                      <Icon name={p.icon} size={20} className="text-spa-plum-dark" />
                    </div>
                    {p.badge && (
                      <span
                        className={`text-xs font-golos font-semibold px-3 py-1 rounded-full ${
                          p.badge === "Клуб"
                            ? "bg-spa-plum text-spa-gold"
                            : p.badge === "Для пары"
                            ? "bg-spa-rose/30 text-spa-terracotta"
                            : "bg-spa-gold/20 text-spa-plum"
                        }`}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-cormorant text-2xl font-semibold text-spa-plum mb-3">{p.title}</h3>
                  <p className="font-golos text-spa-plum/65 text-sm leading-relaxed flex-1 mb-5">{p.desc}</p>
                  <div className="flex items-center gap-2 text-spa-gold">
                    <Icon name="Clock" size={14} />
                    <span className="font-golos text-sm">{p.duration}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="py-24 md:py-32 bg-spa-cream">
        <div className="max-w-5xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="font-golos text-spa-gold tracking-[0.25em] text-xs uppercase mb-3">Прайс-лист</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-spa-plum">
              Стоимость <em className="text-spa-terracotta">процедур</em>
            </h2>
          </RevealSection>
          <RevealSection>
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm gold-border">
              {PRICES.map((item, i) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between px-8 py-5 ${
                    i !== PRICES.length - 1 ? "border-b border-spa-gold/15" : ""
                  } hover:bg-spa-cream-dark/50 transition-colors`}
                >
                  <div>
                    <div className="font-cormorant text-lg font-semibold text-spa-plum">{item.name}</div>
                    <div className="font-golos text-xs text-spa-plum/50 flex items-center gap-1 mt-0.5">
                      <Icon name="Clock" size={11} />
                      {item.duration}
                    </div>
                  </div>
                  <div className="font-cormorant text-2xl font-semibold text-gradient-gold whitespace-nowrap ml-4">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center font-golos text-xs text-spa-plum/50 mt-4">
              * Члены Закрытого Клуба получают эксклюзивные скидки. Уточняйте при записи.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 md:py-32 bg-spa-cream-dark">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="font-golos text-spa-gold tracking-[0.25em] text-xs uppercase mb-3">Галерея</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-spa-plum">
              Атмосфера <em className="text-spa-terracotta">рая</em>
            </h2>
          </RevealSection>
          <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 md:row-span-2">
                <img
                  src={GALLERY[0].src}
                  alt={GALLERY[0].alt}
                  className="w-full h-64 md:h-full min-h-[300px] object-cover rounded-3xl"
                />
              </div>
              <div>
                <img
                  src={GALLERY[1].src}
                  alt={GALLERY[1].alt}
                  className="w-full h-64 object-cover rounded-3xl"
                />
              </div>
              <div>
                <img
                  src={GALLERY[2].src}
                  alt={GALLERY[2].alt}
                  className="w-full h-64 object-cover rounded-3xl"
                />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-spa-cream">
        <div className="max-w-3xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="font-golos text-spa-gold tracking-[0.25em] text-xs uppercase mb-3">Вопросы</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-spa-plum">
              Часто <em className="text-spa-terracotta">спрашивают</em>
            </h2>
          </RevealSection>
          <RevealSection>
            <div className="flex flex-col gap-3">
              {FAQS.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-plum relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-spa-gold/8 rounded-full blur-3xl pointer-events-none" />
        <RevealSection>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <p className="font-golos text-spa-gold tracking-[0.25em] text-xs uppercase mb-4">Запись</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-spa-cream mb-6">
              Подарите себе <em className="text-gradient-gold">рай</em>
            </h2>
            <p className="font-golos text-spa-cream/65 text-base mb-10 leading-relaxed">
              Позвоните нам или напишите в ВКонтакте — подберём идеальную программу именно для вас.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={PHONE_HREF}
                className="bg-gradient-gold text-spa-plum-dark font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2 justify-center text-sm tracking-wide"
              >
                <Icon name="Phone" size={16} />
                {PHONE}
              </a>
              <a
                href="https://vk.com/7krugovraya"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-spa-gold/40 text-spa-cream px-8 py-4 rounded-full hover:bg-spa-gold/10 transition-all flex items-center gap-2 justify-center text-sm tracking-wide"
              >
                <Icon name="MessageCircle" size={16} />
                ВКонтакте
              </a>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* FOOTER */}
      <footer className="bg-spa-plum-dark py-12 border-t border-spa-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-cormorant text-2xl font-semibold text-spa-cream mb-1">
                7 <span className="text-gradient-gold">Кругов</span> Рая
              </div>
              <div className="font-golos text-xs text-spa-cream/40">SPA-салон · Геленджик</div>
            </div>
            <nav className="flex flex-wrap gap-6 justify-center">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="font-golos text-sm text-spa-cream/50 hover:text-spa-gold transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <a
              href={PHONE_HREF}
              className="font-golos text-sm text-spa-gold hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <Icon name="Phone" size={14} />
              {PHONE}
            </a>
          </div>
          <div className="border-t border-spa-gold/10 mt-8 pt-6 text-center">
            <p className="font-golos text-xs text-spa-cream/25">© 2024 7 Кругов Рая. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}