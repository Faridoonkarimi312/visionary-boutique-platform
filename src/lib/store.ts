import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  price: number;
  price_afn?: number | null;
  category: string;
  image_url: string | null;
  description: string | null;
  featured: boolean | null;
  created_at?: string;
}

export const categories = ["الکترونیک", "اکسسوری", "مد و فشن", "کفش", "زیبایی", "خانه و زندگی"];

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Product[]) || [];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Product;
};

export const addProduct = async (product: {
  name: string;
  price: number;
  price_afn: number | null;
  category: string;
  image_url: string | null;
  description: string;
  featured: boolean;
}): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();
  if (error) throw error;
  return data as Product;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
};

export const uploadProductImage = async (file: File): Promise<string> => {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, { contentType: file.type, upsert: true });
  if (error) throw error;
  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);
  return urlData.publicUrl;
};

export const sendMessage = async (msg: {
  product_id: string;
  sender_name: string;
  sender_email?: string;
  sender_phone?: string;
  message: string;
}) => {
  const { error } = await supabase.from("messages").insert(msg);
  if (error) throw error;
};

export const getMessages = async () => {
  const { data, error } = await supabase
    .from("messages")
    .select("*, products(name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
};

// Format price - removes any "+" sign and formats nicely
export const formatPrice = (n: number, currency: "USD" | "AFN" = "USD") => {
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return currency === "USD" ? `$${formatted}` : `${formatted} ؋`;
};
