import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { getApprovedReviews, submitReview, type Review } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

const ProductReviews = ({ productId }: { productId: string }) => {
  const { t } = useLang();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ reviewer_name: "", reviewer_email: "", rating: 5, comment: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getApprovedReviews(productId).then(setReviews).catch(() => {});
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitReview({
        product_id: productId,
        reviewer_name: form.reviewer_name,
        reviewer_email: form.reviewer_email || undefined,
        rating: form.rating,
        comment: form.comment,
      });
      toast({ title: "✓", description: t("review_pending") });
      setForm({ reviewer_name: "", reviewer_email: "", rating: 5, comment: "" });
      setShowForm(false);
    } catch (err) {
      toast({ title: "Error", variant: "destructive" });
    }
    setSending(false);
  };

  return (
    <div className="mt-12 bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-display font-bold text-foreground">
          {t("reviews")} ({reviews.length})
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          {t("leave_review")}
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="mb-6 p-5 bg-secondary/50 rounded-xl space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              required
              value={form.reviewer_name}
              onChange={e => setForm(f => ({ ...f, reviewer_name: e.target.value }))}
              placeholder={t("your_name")}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-sm focus:border-primary focus:outline-none"
            />
            <input
              type="email"
              value={form.reviewer_email}
              onChange={e => setForm(f => ({ ...f, reviewer_email: e.target.value }))}
              placeholder={t("your_email")}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">{t("rating")}</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, rating: n }))}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${n <= form.rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <textarea
            required
            value={form.comment}
            onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
            placeholder={t("your_review")}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-sm focus:border-primary focus:outline-none resize-none"
          />
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {sending ? t("sending") : t("submit_review")}
          </button>
        </motion.form>
      )}

      {reviews.length === 0 ? (
        <p className="text-center text-muted-foreground py-10 text-sm">{t("no_reviews")}</p>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-secondary/40 rounded-xl border border-border"
            >
              <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                <p className="font-semibold text-foreground">{r.reviewer_name}</p>
                <span className="text-xs text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map(n => (
                  <Star
                    key={n}
                    className={`w-4 h-4 ${n <= r.rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{r.comment}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
