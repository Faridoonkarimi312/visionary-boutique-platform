
-- Reviews table with admin moderation
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a review (will be unapproved by default)
CREATE POLICY "Anyone can submit reviews"
  ON public.reviews FOR INSERT
  TO public
  WITH CHECK (
    reviewer_name IS NOT NULL AND reviewer_name <> ''
    AND comment IS NOT NULL AND comment <> ''
    AND approved = false
  );

-- Public can read only approved reviews
CREATE POLICY "Anyone can read approved reviews"
  ON public.reviews FOR SELECT
  TO public
  USING (approved = true);

-- Admins can view, update, delete all reviews
CREATE POLICY "Admins can view all reviews"
  ON public.reviews FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update reviews"
  ON public.reviews FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete reviews"
  ON public.reviews FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX idx_reviews_approved ON public.reviews(approved);
