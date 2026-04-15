import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  authenticateAdmin, isAdminLoggedIn, loginAdmin, logoutAdmin,
  getProducts, addProduct, deleteProduct, categories,
  type Product
} from "@/lib/store";
import { Trash2, Plus, LogOut, LayoutDashboard, Package, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, category: categories[0], image: "", description: "", featured: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) setProducts(getProducts());
  }, [loggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticateAdmin(email, password)) {
      loginAdmin();
      setLoggedIn(true);
      setError("");
    } else {
      setError("ایمیل یا رمز عبور اشتباه است");
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setLoggedIn(false);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProduct);
    setProducts(getProducts());
    setShowForm(false);
    setNewProduct({ name: "", price: 0, category: categories[0], image: "", description: "", featured: false });
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getProducts());
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 px-4 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-xl p-8 w-full max-w-md"
          >
            <div className="text-center mb-6">
              <LayoutDashboard className="w-12 h-12 text-accent mx-auto mb-3" />
              <h1 className="text-2xl font-display font-bold text-foreground">پنل مدیریت</h1>
              <p className="text-foreground/50 text-xs mt-1">برای ورود به داشبورد وارد شوید</p>
            </div>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-xs text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ایمیل"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
              />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="رمز عبور"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                ورود به داشبورد
              </button>
            </form>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-silver-gradient">داشبورد مدیریت</h1>
              <p className="text-foreground/50 text-xs mt-1">مدیریت محصولات و محتوای وبسایت</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-secondary rounded-lg text-foreground/70 text-xs font-semibold flex items-center gap-2 hover:bg-secondary/80 transition-colors"
              >
                <Eye className="w-4 h-4" />
                مشاهده سایت
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                محصول جدید
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-destructive/20 text-destructive rounded-lg text-xs font-semibold flex items-center gap-2 hover:bg-destructive/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                خروج
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "کل محصولات", value: products.length, icon: Package },
              { label: "محصولات ویژه", value: products.filter(p => p.featured).length, icon: Package },
              { label: "دسته‌بندی‌ها", value: categories.length, icon: Package },
              { label: "بازدید امروز", value: "۱,۲۴۵", icon: Eye },
            ].map(s => (
              <div key={s.label} className="glass-card rounded-xl p-4">
                <s.icon className="w-6 h-6 text-accent mb-2" />
                <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
                <p className="text-foreground/50 text-xs">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Add Product Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-6 mb-8"
            >
              <h2 className="font-display font-bold text-foreground mb-4">افزودن محصول جدید</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    value={newProduct.name}
                    onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))}
                    placeholder="نام محصول"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none"
                  />
                  <input
                    required
                    type="number"
                    value={newProduct.price || ""}
                    onChange={e => setNewProduct(p => ({ ...p, price: Number(e.target.value) }))}
                    placeholder="قیمت ($)"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none"
                  />
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:border-accent focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <input
                    value={newProduct.image}
                    onChange={e => setNewProduct(p => ({ ...p, image: e.target.value }))}
                    placeholder="لینک عکس محصول (URL)"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none"
                  />
                </div>
                <textarea
                  value={newProduct.description}
                  onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))}
                  placeholder="توضیحات محصول"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none resize-none"
                />
                <label className="flex items-center gap-2 text-foreground/70 text-sm">
                  <input
                    type="checkbox"
                    checked={newProduct.featured}
                    onChange={e => setNewProduct(p => ({ ...p, featured: e.target.checked }))}
                    className="accent-accent"
                  />
                  محصول ویژه
                </label>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    افزودن
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-secondary text-foreground/70 rounded-lg font-semibold text-sm hover:bg-secondary/80 transition-colors"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Products Table */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-display font-bold text-foreground">لیست محصولات</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-foreground/50 text-xs">
                    <th className="p-4 text-right">نام</th>
                    <th className="p-4 text-right">دسته‌بندی</th>
                    <th className="p-4 text-right">قیمت</th>
                    <th className="p-4 text-right">ویژه</th>
                    <th className="p-4 text-right">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-4 text-sm text-foreground font-medium">{product.name}</td>
                      <td className="p-4 text-xs text-foreground/60">{product.category}</td>
                      <td className="p-4 text-sm text-accent font-bold">${product.price}</td>
                      <td className="p-4 text-xs">
                        {product.featured ? (
                          <span className="px-2 py-1 bg-accent/20 text-accent rounded-full text-[10px]">ویژه</span>
                        ) : (
                          <span className="text-foreground/30">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
