export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  featured: boolean;
}

const ADMIN_EMAIL = "faridoonkarimi@gmial.com";
const ADMIN_PASS = "khan123";

export const authenticateAdmin = (email: string, password: string): boolean => {
  return email === ADMIN_EMAIL && password === ADMIN_PASS;
};

export const isAdminLoggedIn = (): boolean => {
  return sessionStorage.getItem("karimi_admin") === "true";
};

export const loginAdmin = () => {
  sessionStorage.setItem("karimi_admin", "true");
};

export const logoutAdmin = () => {
  sessionStorage.removeItem("karimi_admin");
};

const defaultProducts: Product[] = [
  { id: "1", name: "iPhone Pro Max", price: 1299, category: "الکترونیک", image: "/products/phone.jpg", description: "آخرین مدل آیفون با دوربین حرفه‌ای و طراحی لوکس", featured: true },
  { id: "2", name: "ساعت لوکس کریمی", price: 899, category: "اکسسوری", image: "/products/watch.jpg", description: "ساعت مچی لوکس با طراحی کلاسیک و بند استیل", featured: true },
  { id: "3", name: "هدفون پریمیوم", price: 349, category: "الکترونیک", image: "/products/headphones.jpg", description: "هدفون بی‌سیم با کیفیت صدای استودیویی", featured: true },
  { id: "4", name: "عینک آفتابی طلایی", price: 259, category: "اکسسوری", image: "/products/sunglasses.jpg", description: "عینک آفتابی دیزاینر با فریم طلایی", featured: true },
  { id: "5", name: "کیف چرم اصل", price: 599, category: "مد و فشن", image: "/products/bag.jpg", description: "کیف دستی چرم طبیعی با طراحی ایتالیایی", featured: true },
  { id: "6", name: "کتانی اسپرت نقره‌ای", price: 199, category: "کفش", image: "/products/shoes.jpg", description: "کفش ورزشی سبک با تکنولوژی کوشن پیشرفته", featured: true },
  { id: "7", name: "لپ‌تاپ حرفه‌ای", price: 2499, category: "الکترونیک", image: "/products/laptop.jpg", description: "لپ‌تاپ قدرتمند برای حرفه‌ای‌ها و طراحان", featured: false },
  { id: "8", name: "عطر لوکس کریمی", price: 189, category: "زیبایی", image: "/products/perfume.jpg", description: "عطر فرانسوی با رایحه‌ای منحصر به فرد و ماندگار", featured: true },
];

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem("karimi_products");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("karimi_products", JSON.stringify(defaultProducts));
  return defaultProducts;
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem("karimi_products", JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, "id">): Product => {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now().toString() };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
};

export const categories = ["الکترونیک", "اکسسوری", "مد و فشن", "کفش", "زیبایی", "خانه و زندگی"];
