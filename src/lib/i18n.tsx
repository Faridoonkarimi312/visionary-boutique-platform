import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "fa" | "ps" | "en";

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  fa: {
    home: "خانه",
    products: "محصولات",
    about: "درباره ما",
    contact: "تماس",
    search: "جستجو",
    cart: "سبد خرید",
    language: "زبان",
    admin_dashboard: "داشبورد مدیریت",
    hero_title: "کریمی",
    hero_sub: "تجربه خرید لوکس در سطح جهانی",
    hero_desc: "بهترین محصولات پریمیوم از برندهای معتبر جهان با ضمانت اصالت و کیفیت",
    view_products: "مشاهده محصولات",
    about_karimi: "درباره کریمی",
    featured_products: "محصولات ویژه",
    view_all: "مشاهده همه",
    why_karimi: "چرا کریمی؟",
    customer_reviews: "نظرات مشتریان",
    categories: "دسته‌بندی‌ها",
    all: "همه",
    no_products: "محصولی یافت نشد",
    add_to_cart: "افزودن به سبد",
    buy_now: "خرید محصول",
    message_seller: "پیام / بحث قیمت",
    download_image: "دانلود تصویر",
    back_to_products: "بازگشت به محصولات",
    your_cart: "سبد خرید شما",
    cart_empty: "سبد خرید شما خالی است",
    total: "جمع کل",
    checkout: "تکمیل سفارش",
    remove: "حذف",
    search_placeholder: "نام محصول را جستجو کنید...",
    search_results: "نتایج جستجو",
    made_by: "ساخته شده توسط فریدون کریمی",
    quick_links: "لینک‌های سریع",
    contact_us: "تماس با ما",
    afn: "افغانی",
    usd: "دلار",
    free_shipping: "ارسال رایگان - تضمین اصالت",
    cart_added: "به سبد خرید اضافه شد",
    image_downloaded: "تصویر دانلود شد",
  },
  ps: {
    home: "کور",
    products: "توکي",
    about: "زموږ په اړه",
    contact: "اړیکه",
    search: "لټون",
    cart: "د پیر ټوکرۍ",
    language: "ژبه",
    admin_dashboard: "د مدیر ډشبورډ",
    hero_title: "کریمي",
    hero_sub: "نړیواله لوکس پیرودنه",
    hero_desc: "د نړۍ د معتبرو برنډونو څخه غوره پریمیوم توکي د اصالت او کیفیت تضمین سره",
    view_products: "توکي وګورئ",
    about_karimi: "د کریمي په اړه",
    featured_products: "ځانګړي توکي",
    view_all: "ټول وګورئ",
    why_karimi: "ولې کریمي؟",
    customer_reviews: "د پیرودونکو نظرونه",
    categories: "کټګورۍ",
    all: "ټول",
    no_products: "هیڅ توکی ونه موندل شو",
    add_to_cart: "ټوکرۍ ته اضافه کړئ",
    buy_now: "اوس وپېرئ",
    message_seller: "پیغام / د بیې خبرې",
    download_image: "انځور ډاونلوډ کړئ",
    back_to_products: "توکو ته بیرته",
    your_cart: "ستاسو ټوکرۍ",
    cart_empty: "ستاسو ټوکرۍ خالي ده",
    total: "ټولټال",
    checkout: "د پیر بشپړول",
    remove: "ړنګول",
    search_placeholder: "د توکي نوم ولټوئ...",
    search_results: "د لټون پایلې",
    made_by: "د فریدون کریمي لخوا جوړ شوی",
    quick_links: "چټک لینکونه",
    contact_us: "زموږ سره اړیکه ونیسئ",
    afn: "افغانۍ",
    usd: "ډالر",
    free_shipping: "وړیا لیږد - د اصالت تضمین",
    cart_added: "ټوکرۍ ته اضافه شو",
    image_downloaded: "انځور ډاونلوډ شو",
  },
  en: {
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    search: "Search",
    cart: "Cart",
    language: "Language",
    admin_dashboard: "Admin Dashboard",
    hero_title: "Karimi",
    hero_sub: "World-class luxury shopping experience",
    hero_desc: "The finest premium products from world-renowned brands with guaranteed authenticity and quality",
    view_products: "View Products",
    about_karimi: "About Karimi",
    featured_products: "Featured Products",
    view_all: "View All",
    why_karimi: "Why Karimi?",
    customer_reviews: "Customer Reviews",
    categories: "Categories",
    all: "All",
    no_products: "No products found",
    add_to_cart: "Add to Cart",
    buy_now: "Buy Now",
    message_seller: "Message / Negotiate",
    download_image: "Download Image",
    back_to_products: "Back to Products",
    your_cart: "Your Cart",
    cart_empty: "Your cart is empty",
    total: "Total",
    checkout: "Checkout",
    remove: "Remove",
    search_placeholder: "Search product name...",
    search_results: "Search Results",
    made_by: "Made by Faridoon Karimi",
    quick_links: "Quick Links",
    contact_us: "Contact Us",
    afn: "AFN",
    usd: "USD",
    free_shipping: "Free Shipping - Authenticity Guaranteed",
    cart_added: "Added to cart",
    image_downloaded: "Image downloaded",
  },
};

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LangCtx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("karimi-lang") as Lang;
    return saved || "fa";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("karimi-lang", l);
  };

  const dir: "rtl" | "ltr" = lang === "en" ? "ltr" : "rtl";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const t = (key: string) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be inside LanguageProvider");
  return ctx;
};
