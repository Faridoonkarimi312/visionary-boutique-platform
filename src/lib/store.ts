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

export interface Review {
  id: string;
  product_id: string;
  reviewer_name: string;
  reviewer_email: string | null;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
}

// Category keys (used to look up i18n translation)
export const categoryKeys = [
  "cat_electronics",
  "cat_accessories",
  "cat_fashion",
  "cat_shoes",
  "cat_beauty",
  "cat_home",
] as const;

// Map between i18n key and the actual db category string (Persian, kept for backward compat with seeded data)
export const categoryDbValues: Record<typeof categoryKeys[number], string> = {
  cat_electronics: "الکترونیک",
  cat_accessories: "اکسسوری",
  cat_fashion: "مد و فشن",
  cat_shoes: "کفش",
  cat_beauty: "زیبایی",
  cat_home: "خانه و زندگی",
};

export const dbValueToKey = (val: string): string => {
  const entry = Object.entries(categoryDbValues).find(([, v]) => v === val);
  return entry ? entry[0] : val;
};

export const categories = Object.values(categoryDbValues);

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

// Reviews
export const submitReview = async (review: {
  product_id: string;
  reviewer_name: string;
  reviewer_email?: string;
  rating: number;
  comment: string;
}) => {
  const { error } = await supabase.from("reviews").insert({ ...review, approved: false });
  if (error) throw error;
};

export const getApprovedReviews = async (productId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .eq("approved", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Review[]) || [];
};

export const getAllReviews = async () => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, products(name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
};

export const approveReview = async (id: string) => {
  const { error } = await supabase.from("reviews").update({ approved: true }).eq("id", id);
  if (error) throw error;
};

export const deleteReview = async (id: string) => {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw error;
};

// Format price
export const formatPrice = (n: number, currency: "USD" | "AFN" = "USD") => {
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return currency === "USD" ? `$${formatted}` : `${formatted} ؋`;
};
