import { useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';

export default function OrderForm() {
  const { t } = useLang();
  const formRef = useRef(null);

  // toast: { show, title, message } | null
  const [toast, setToast] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const name = (data.get('name') || '').toString().trim() || '—';
    const message = t.feedback.toastThanks(name);

    setToast({ show: true, title: t.feedback.toastTitle, message });
    formRef.current?.reset();
    setRating(0);
    setHover(0);

    window.clearTimeout(handleSubmit._timer);
    handleSubmit._timer = window.setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, show: false } : null));
    }, 5000);
  };

  const closeToast = () => setToast((prev) => (prev ? { ...prev, show: false } : null));

  return (
    <section id="pesan" className="py-24 md:py-32 relative overflow-hidden">
      <div className="glow-orb w-96 h-96 bg-gold top-0 right-0 opacity-30" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <span className="tag bg-primary/10 text-primary mb-5">{t.feedback.tag}</span>
          <h2 className="font-display font-black text-5xl md:text-6xl text-content leading-tight">
            {t.feedback.titlePre}{' '}
            <span className="text-primary italic">{t.feedback.titleHighlight}</span>
          </h2>
          <p className="text-content-soft text-lg leading-relaxed mt-6">
            {t.feedback.description}
          </p>
        </div>

        <div className="max-w-3xl mx-auto reveal">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-surface-3 rounded-3xl p-8 md:p-10 border border-border/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-content-muted mb-2">
                  {t.feedback.form.name}
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder={t.feedback.form.namePlaceholder}
                  className="form-input w-full px-4 py-3 rounded-xl"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-content-muted mb-2">
                  {t.feedback.form.email}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t.feedback.form.emailPlaceholder}
                  className="form-input w-full px-4 py-3 rounded-xl"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-content-muted mb-2">
                  {t.feedback.form.rating}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      aria-label={`${star} ${t.feedback.form.stars}`}
                      className="text-3xl transition-transform hover:scale-110"
                    >
                      <i
                        className={`fa-star ${
                          (hover || rating) >= star ? 'fas text-gold' : 'far text-content-muted/40'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-content-muted mb-2">
                  {t.feedback.form.message}
                </label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder={t.feedback.form.messagePlaceholder}
                  className="form-input w-full px-4 py-3 rounded-xl resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-7 py-4 rounded-xl font-bold inline-flex items-center justify-center gap-3 text-sm uppercase tracking-wider"
            >
              {t.feedback.form.submit}
              <i className="fas fa-paper-plane text-xs" />
            </button>
            <p className="text-xs text-content-muted text-center mt-4">
              {t.feedback.form.consent}
            </p>
          </form>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${toast?.show ? 'show' : ''}`} role="status" aria-live="polite">
        {toast && (
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-check text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-display font-bold text-content">{toast.title}</div>
              <div className="text-sm text-content-soft mt-1">{toast.message}</div>
            </div>
            <button
              type="button"
              onClick={closeToast}
              className="text-content-muted hover:text-content"
              aria-label={t.nav.closeToast}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}