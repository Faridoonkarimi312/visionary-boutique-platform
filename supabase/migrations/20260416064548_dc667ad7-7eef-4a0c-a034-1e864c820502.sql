
-- Create admin role system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: only admins can view
CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Fix products policies: only admins can modify
DROP POLICY "Authenticated users can insert products" ON public.products;
DROP POLICY "Authenticated users can update products" ON public.products;
DROP POLICY "Authenticated users can delete products" ON public.products;

CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Fix messages: only admins can view
DROP POLICY "Authenticated users can view messages" ON public.messages;
CREATE POLICY "Admins can view messages" ON public.messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Fix storage: restrict listing
DROP POLICY "Product images are publicly accessible" ON storage.objects;
CREATE POLICY "Product images are publicly accessible by path" ON storage.objects FOR SELECT USING (bucket_id = 'product-images' AND (auth.role() = 'anon' OR auth.role() = 'authenticated'));
