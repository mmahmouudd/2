import { useEffect, useRef, useState, type ReactNode } from "react";

type IconName =
  | "arrow-up-left"
  | "arrow-left"
  | "check"
  | "clock"
  | "close"
  | "instagram"
  | "menu"
  | "minus"
  | "plus"
  | "quote"
  | "sparkle"
  | "star"
  | "truck"
  | "whatsapp"
  | "chevron-down";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow-up-left":
      return <svg {...common}><path d="M5 19 19 5" /><path d="M7 5h12v12" /></svg>;
    case "arrow-left":
      return <svg {...common}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></svg>;
    case "close":
      return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
    case "instagram":
      return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.5" /><path d="M17.5 6.5h.01" /></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "minus":
      return <svg {...common}><path d="M5 12h14" /></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    case "quote":
      return <svg {...common}><path d="M9 11H5.8A2.8 2.8 0 0 0 3 13.8v.4A2.8 2.8 0 0 0 5.8 17H6a3 3 0 0 0 3-3v-3Zm0 0V7.5A2.5 2.5 0 0 1 11.5 5M21 11h-3.2a2.8 2.8 0 0 0-2.8 2.8v.4a2.8 2.8 0 0 0 2.8 2.8h.2a3 3 0 0 0 3-3v-3Zm0 0V7.5A2.5 2.5 0 0 1 23.5 5" /></svg>;
    case "sparkle":
      return <svg {...common}><path d="m12 3 1.35 5.65L19 10l-5.65 1.35L12 17l-1.35-5.65L5 10l5.65-1.35L12 3Z" /><path d="m19 16 .5 2.5L22 19l-2.5.5L19 22l-.5-2.5L16 19l2.5-.5L19 16Z" /></svg>;
    case "star":
      return <svg {...common} fill="currentColor" stroke="none"><path d="m12 3 2.7 5.48 6.05.88-4.38 4.27 1.03 6.03L12 16.8l-5.4 2.86 1.03-6.03-4.38-4.27 6.05-.88L12 3Z" /></svg>;
    case "truck":
      return <svg {...common}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.5" /><circle cx="18" cy="18" r="1.5" /></svg>;
    case "whatsapp":
      return <svg {...common}><path d="M20 11.5a8 8 0 0 1-11.85 7.02L4 20l1.48-4.02A8 8 0 1 1 20 11.5Z" /><path d="M8.6 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .35.1.45.4l.7 1.6c.1.25.05.45-.1.62l-.55.65c-.14.16-.13.3-.04.5.48.94 1.22 1.67 2.16 2.16.2.1.35.1.5-.04l.65-.55c.18-.15.37-.2.62-.1l1.6.7c.3.1.4.25.4.45v.5c0 .3 0 .5-.4.7-.4.2-1.4.25-2.6-.25-1.2-.5-2.3-1.35-3.15-2.2-.85-.85-1.7-1.95-2.2-3.15-.5-1.2-.45-2.2-.25-2.6Z" /></svg>;
    case "chevron-down":
      return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
  }
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

const products = [
  { number: "01", name: "كرواسون الزبدة", description: "طبقات خفيفة، زبدة حقيقية، وقرمشة تسمعها قبل ما تدوقها.", price: "من ٥٥ ج", image: "/images/croissant-detail.jpg", tag: "الأكثر طلبا" },
  { number: "02", name: "صندوق اللمة", description: "تشكيلة مخبوزة صباحا تكفي الحكايات الطويلة والناس اللي بتحبهم.", price: "٤٢٠ ج", image: "/images/box-of-pastries.jpg", tag: "للهدايا واللمة" },
  { number: "03", name: "رغيف اليوم", description: "خبز ساوردو بطعم عميق، قشرة مقرمشة، ووقت تخمير يستاهل الانتظار.", price: "من ٧٥ ج", image: "/images/hero-bakery.jpg", tag: "يُخبز كل صباح" },
];

const faqs = [
  { question: "بتوصلوا لفين؟", answer: "بنوصّل داخل الزقازيق يوميا، وبنرتب شحنات مختارة لمعظم محافظات مصر. ابعتلنا لو مش متأكدين إن منطقتك ضمن خط التوصيل." },
  { question: "المخبوزات بتتخبز إمتى؟", answer: "كل طلب بيتجهز على دفعات صغيرة طوال اليوم، وأغلب الأوردرات بتطلع من الفرن من ٨ صباحا لحد ٦ مساء. عشان كده الطعم دايما طازة." },
  { question: "أقدر أطلب لمناسبة أو شركة؟", answer: "أكيد. عندنا بوكسات مناسبات واشتراكات للمكاتب، وبنساعدك تختار الكمية والتغليف المناسبين من أول رسالة." },
  { question: "إزاي أطلب؟", answer: "اختار البوكس المناسب واضغط اطلب الآن، أو كلمنا مباشرة على واتساب. هنأكد العنوان والموعد خلال دقائق." },
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className={`brand-mark ${light ? "brand-mark--light" : ""}`} aria-label="رغيف، العودة للرئيسية">
      <span className="brand-mark__symbol">ر</span>
      <span className="brand-mark__text"><strong>رَغيف</strong><small>BAKERY STUDIO</small></span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main dir="rtl" className="site-shell" id="home">
      <header className="site-header">
        <div className="container nav-wrap">
          <BrandMark light />
          <nav className="desktop-nav" aria-label="التنقل الرئيسي"><a href="#story">حكايتنا</a><a href="#menu">المخبوزات</a><a href="#experience">ليه رغيف؟</a><a href="#faq">الأسئلة الشائعة</a></nav>
          <div className="nav-actions"><a className="nav-whatsapp" href="https://wa.me/201000000000" aria-label="اطلب عبر واتساب"><Icon name="whatsapp" size={17} /><span>اطلب الآن</span></a><button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen}><Icon name={menuOpen ? "close" : "menu"} size={22} /></button></div>
        </div>
        <div className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}><a href="#story" onClick={closeMenu}>حكايتنا</a><a href="#menu" onClick={closeMenu}>المخبوزات</a><a href="#experience" onClick={closeMenu}>ليه رغيف؟</a><a href="#faq" onClick={closeMenu}>الأسئلة الشائعة</a><a className="mobile-nav__cta" href="https://wa.me/201000000000" onClick={closeMenu}>اطلب بوكسك <Icon name="arrow-left" size={17} /></a></div>
      </header>

      <section className="hero-section" aria-labelledby="hero-title"><div className="hero-overlay" /><div className="hero-grain" /><div className="container hero-content"><Reveal className="hero-copy"><p className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> مخبوزات تتعمل بحب في الزقازيق</p><h1 id="hero-title">طعم <em>يفضل</em><br /> في الذاكرة.</h1><p className="hero-lead">من أول كسرة لآخر فتفوتة، بنخبز لحظات صغيرة تخلي يومك أحلى. طازة، دافية، ومصنوعة عشان تتشارك.</p><div className="hero-actions"><a className="button button--primary" href="#menu">اكتشف المخبوزات <Icon name="arrow-left" size={18} /></a><a className="button button--ghost" href="#story">اعرف حكايتنا <Icon name="arrow-up-left" size={17} /></a></div><div className="hero-note"><span className="live-dot" /> بنخبز على دفعات صغيرة كل يوم · التوصيل داخل الزقازيق</div></Reveal><div className="hero-side-note" aria-hidden="true"><span>R / 01</span><span className="hero-side-line" /><span>BAKED DAILY</span></div></div><a href="#proof" className="scroll-cue" aria-label="انتقل للمزيد"><span>انزل وشوف</span><span className="scroll-cue__line" /></a></section>

      <section className="proof-section" id="proof" aria-label="ثقة عملائنا"><div className="container proof-inner"><Reveal className="proof-label"><span>موجودين في تفاصيل يومك</span></Reveal><Reveal delay={80} className="proof-marquee"><span>طلبات الجمعة</span><i /><span>بوكسات الشركات</span><i /><span>لمة العيلة</span><i /><span>قهوة بعد الظهر</span><i /><span>أول لقمة</span></Reveal></div></section>

      <section className="story-section section-pad" id="story"><div className="container story-grid"><Reveal className="section-intro"><p className="eyebrow"><span className="eyebrow-number">01</span> الحكاية بدأت من فرن صغير</p><h2>مش مجرد<br /><em>مخبوزات.</em></h2><p className="section-copy">رغيف هو حبنا للخبز لما يتحول لطقس يومي. بنختار مكوناتنا بهدوء، ندي العجين وقته، ونسيب النتيجة تتكلم بدلنا.</p><a className="text-link" href="#experience">اكتشف الفرق <Icon name="arrow-left" size={17} /></a></Reveal><Reveal delay={150} className="story-visual"><div className="story-image" role="img" aria-label="مخبوزات طازجة على طاولة خشبية" /><div className="story-stamp"><span>EST.</span><strong>٢٠٢٤</strong><small>ZAGAZIG, EGYPT</small></div><span className="visual-caption">مخبوزة النهارده<br />عشان يومك</span></Reveal></div></section>

      <section className="experience-section section-pad" id="experience"><div className="container"><Reveal className="section-heading section-heading--center"><p className="eyebrow"><span className="eyebrow-number">02</span> الفرق في التفاصيل</p><h2>كل حاجة عندنا<br /><em>لها سبب.</em></h2></Reveal><div className="feature-list"><Reveal delay={60} className="feature-item"><span className="feature-number">01</span><div className="feature-icon"><Icon name="sparkle" size={24} /></div><div><h3>مكونات على قد المقام</h3><p>زبدة حقيقية، دقيق مختار، وتفاصيل مش بنعديها عشان النتيجة تبان في الطعم.</p></div><span className="feature-arrow"><Icon name="arrow-up-left" size={18} /></span></Reveal><Reveal delay={130} className="feature-item"><span className="feature-number">02</span><div className="feature-icon"><Icon name="clock" size={24} /></div><div><h3>الوقت هو المكوّن السري</h3><p>تخمير براحته، ودفعات صغيرة تخرج من الفرن في وقتها عشان توصلك بأحسن شكل.</p></div><span className="feature-arrow"><Icon name="arrow-up-left" size={18} /></span></Reveal><Reveal delay={200} className="feature-item"><span className="feature-number">03</span><div className="feature-icon"><Icon name="truck" size={24} /></div><div><h3>من عندنا لحد بابك</h3><p>تغليف يحافظ على الدفا، وتوصيل دقيق داخل الزقازيق، وخطة عشان نوصل مصر كلها قريب.</p></div><span className="feature-arrow"><Icon name="arrow-up-left" size={18} /></span></Reveal></div></div></section>

      <section className="menu-section section-pad" id="menu"><div className="container"><Reveal className="menu-head"><div><p className="eyebrow"><span className="eyebrow-number">03</span> من الفرن للبوكس</p><h2>اختار مزاجك<br /><em>النهارده.</em></h2></div><a className="text-link text-link--light" href="https://wa.me/201000000000">شوف المنيو كاملة <Icon name="arrow-left" size={17} /></a></Reveal><div className="product-grid">{products.map((product, index) => <Reveal delay={index * 90} className="product-item" key={product.number}><a href="https://wa.me/201000000000" className="product-image-wrap" aria-label={`اطلب ${product.name}`}><img src={product.image} alt={product.name} className="product-image" /><span className="product-tag">{product.tag}</span><span className="product-add"><Icon name="arrow-up-left" size={20} /></span></a><div className="product-meta"><span>{product.number}</span><span>{product.price}</span></div><h3>{product.name}</h3><p>{product.description}</p></Reveal>)}</div></div></section>

      <section className="benefit-section section-pad"><div className="container benefit-grid"><Reveal className="benefit-quote"><Icon name="quote" size={36} /><blockquote>الطعم الحلو<br /><em>بيجمع الناس.</em></blockquote><span>وده بالضبط اللي بنحاول نعمله كل يوم.</span></Reveal><Reveal delay={130} className="benefit-copy"><p className="eyebrow"><span className="eyebrow-number">04</span> معمول عشان يتعاش</p><h2>بوكس يوصل،<br /><em>وفرحة توصل أسرع.</em></h2><p className="section-copy">سواء هدية، فطار مكتب، أو لحظة كده لنفسك، كل بوكس من رغيف بيتجهز بنفس الاهتمام اللي كنا هنعمله لحد من بيتنا.</p><ul className="check-list"><li><span><Icon name="check" size={15} /></span> تغليف دافي وأنيق يليق بالمناسبة</li><li><span><Icon name="check" size={15} /></span> إمكانية كتابة كارت صغير مع الطلب</li><li><span><Icon name="check" size={15} /></span> طلبات الشركات والمناسبات الكبيرة</li></ul><a className="button button--dark" href="https://wa.me/201000000000">كلّمنا على واتساب <Icon name="whatsapp" size={18} /></a></Reveal></div></section>

      <section className="testimonials-section section-pad"><div className="container"><Reveal className="section-heading section-heading--split"><div><p className="eyebrow"><span className="eyebrow-number">05</span> كلام من قلب الناس</p><h2>أول لقمة<br /><em>بتتكلم.</em></h2></div><div className="rating"><span className="rating-stars"><Icon name="star" size={17} /><Icon name="star" size={17} /><Icon name="star" size={17} /><Icon name="star" size={17} /><Icon name="star" size={17} /></span><strong>+٤.٩</strong><small>من أكتر من ٣٠٠ تجربة</small></div></Reveal><div className="testimonial-list"><Reveal delay={70} className="testimonial-item"><div className="testimonial-avatar">س</div><div className="testimonial-text"><p>"بجد أحلى كرواسون دوقته في الزقازيق. وصل دافي والتغليف لوحده يفرّح."</p><strong>سارة محمد</strong><span>عميلة من الزقازيق</span></div><div className="testimonial-stars"><Icon name="star" size={14} /> ٥.٠</div></Reveal><Reveal delay={140} className="testimonial-item"><div className="testimonial-avatar testimonial-avatar--terracotta">م</div><div className="testimonial-text"><p>"طلبنا بوكسات للمكتب، كل الناس سألت جايبينها منين. طعم وشكل وتسليم في المعاد."</p><strong>محمد عادل</strong><span>صاحب مشروع، الزقازيق</span></div><div className="testimonial-stars"><Icon name="star" size={14} /> ٥.٠</div></Reveal><Reveal delay={210} className="testimonial-item"><div className="testimonial-avatar testimonial-avatar--olive">ن</div><div className="testimonial-text"><p>"بقى عندنا عادة الجمعة. رغيف، قهوة، ووقت حلو مع البيت. ربنا يباركلكم."</p><strong>ندى السيد</strong><span>عميلة من مصر الجديدة</span></div><div className="testimonial-stars"><Icon name="star" size={14} /> ٥.٠</div></Reveal></div></div></section>

      <section className="pricing-section section-pad" id="pricing"><div className="container"><Reveal className="section-heading section-heading--center section-heading--light"><p className="eyebrow eyebrow--light"><span className="eyebrow-number">06</span> خليها عادة حلوة</p><h2>بوكسات لكل<br /><em>لحظة.</em></h2></Reveal><div className="pricing-grid"><Reveal delay={80} className="price-card"><p className="price-kicker">لما تحب تدلع نفسك</p><h3>بوكس الصباح</h3><p className="price-description">٤ مخبوزات مختارة + قهوة اليوم</p><div className="price"><strong>٢٤٠</strong><span>جنيه</span></div><a href="https://wa.me/201000000000" className="price-button">اطلب البوكس <Icon name="arrow-left" size={17} /></a></Reveal><Reveal delay={150} className="price-card price-card--featured"><span className="popular-label">الأكثر حبا</span><p className="price-kicker">للّمة اللي بتكبر</p><h3>بوكس اللمة</h3><p className="price-description">١٢ قطعة متنوعة تكفي ٤ أشخاص</p><div className="price"><strong>٤٢٠</strong><span>جنيه</span></div><a href="https://wa.me/201000000000" className="price-button">اختار اللمة <Icon name="arrow-left" size={17} /></a></Reveal><Reveal delay={220} className="price-card"><p className="price-kicker">لما المكتب يبقى بيت</p><h3>اشتراك المكتب</h3><p className="price-description">بوكس طازة كل أسبوع لمدة شهر</p><div className="price"><strong>٨٩٠</strong><span>جنيه</span></div><a href="https://wa.me/201000000000" className="price-button">كلّمنا للتفاصيل <Icon name="arrow-left" size={17} /></a></Reveal></div></div></section>

      <section className="faq-section section-pad" id="faq"><div className="container faq-grid"><Reveal className="faq-intro"><p className="eyebrow"><span className="eyebrow-number">07</span> قبل ما تطلب</p><h2>عندك سؤال؟<br /><em>إحنا جاهزين.</em></h2><p className="section-copy">ولو سؤالك مش هنا، ابعتلنا على واتساب وهنرد عليك بسرعة.</p><a className="text-link" href="https://wa.me/201000000000">اسألنا مباشرة <Icon name="arrow-left" size={17} /></a></Reveal><Reveal delay={120} className="faq-list">{faqs.map((faq, index) => { const open = activeFaq === index; return <div className={`faq-item ${open ? "faq-item--open" : ""}`} key={faq.question}><button onClick={() => setActiveFaq(open ? null : index)} aria-expanded={open} className="faq-question"><span>{faq.question}</span><span className="faq-icon"><Icon name={open ? "minus" : "plus"} size={18} /></span></button><div className="faq-answer"><p>{faq.answer}</p></div></div>; })}</Reveal></div></section>

      <section className="final-cta" id="order"><div className="final-cta__glow" /><div className="container final-cta__inner"><Reveal><p className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> الفرن شغال</p><h2>جاهز تخلي يومك<br /><em>أحلى بشوية؟</em></h2><p>اطلب أول بوكس من رغيف وخلي الطعم ياخد الباقي.</p><a className="button button--cream" href="https://wa.me/201000000000">اطلب على واتساب <Icon name="whatsapp" size={18} /></a></Reveal><Reveal delay={120} className="final-cta__mark"><span>ر</span><small>RAGHEEF<br />BAKERY STUDIO</small></Reveal></div></section>

      <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><BrandMark /><p>مخبوزات طازة، معمولة بحب<br />من الزقازيق لكل مصر.</p></div><div className="footer-links"><div><span>اكتشف</span><a href="#story">حكايتنا</a><a href="#menu">المخبوزات</a><a href="#pricing">البوكسات</a></div><div><span>تواصل</span><a href="https://wa.me/201000000000">واتساب</a><a href="mailto:hello@ragheef.eg">hello@ragheef.eg</a><a href="https://instagram.com">انستجرام</a></div></div><div className="footer-follow"><span>تابع الريحة وهي طالعة</span><a href="https://instagram.com" aria-label="انستجرام رغيف"><Icon name="instagram" size={21} /></a><a href="https://wa.me/201000000000" aria-label="واتساب رغيف"><Icon name="whatsapp" size={21} /></a></div></div><div className="container footer-bottom"><span>© ٢٠٢٤ رغيف. معمول بحب في مصر.</span><span>الزقازيق · مصر</span><a href="#home" aria-label="العودة للأعلى"><Icon name="arrow-up-left" size={16} /> للأعلى</a></div></footer>
    </main>
  );
}

export default App;