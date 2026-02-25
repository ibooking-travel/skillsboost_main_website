"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  coursePrice: number;
  originalPrice: number;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  experience: string;
  message?: string;
}

export default function EnrollModal({ isOpen, onClose, courseTitle, coursePrice, originalPrice }: EnrollModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    // 🔴 Change this to your WhatsApp number (country code + number)
    const whatsappNumber = "918168037096";

    // Build the message
    const message = `
New Enrollment Submission:

Course: ${courseTitle}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Experience: ${data.experience}
Message: ${data.message || "N/A"}
    `;

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappURL, "_blank");
      setLoading(false);
      setSubmitted(true);
      reset();
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); reset(); }, 300);
  };

  const discount = Math.round(((originalPrice - coursePrice) / originalPrice) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 modal-overlay"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-glass-xl overflow-hidden"
            >
              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="relative p-6 pb-4 bg-gradient-to-br from-brand-50 to-teal-50 border-b border-slate-100">
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/80 text-slate-400 hover:text-slate-600 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs font-700 text-brand-600 uppercase tracking-widest mb-2">Enroll Now</p>
                    <h3 className="font-display text-xl font-700 text-slate-900 pr-8">{courseTitle}</h3>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="font-display text-2xl font-800 gradient-text-blue">
                        ₹{coursePrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-slate-400 line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
                      <span className="badge badge-teal text-xs">{discount}% OFF</span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-600 text-slate-600 mb-1.5">Full Name *</label>
                        <input
                          {...register("name", { required: "Required" })}
                          placeholder="Your name"
                          className={`input-field ${errors.name ? "border-red-400" : ""}`}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-600 text-slate-600 mb-1.5">Phone *</label>
                        <input
                          {...register("phone", { required: "Required", pattern: { value: /^[0-9]{10}$/, message: "Valid 10-digit number" } })}
                          placeholder="10-digit number"
                          className={`input-field ${errors.phone ? "border-red-400" : ""}`}
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-600 text-slate-600 mb-1.5">Email Address *</label>
                      <input
                        {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Valid email required" } })}
                        type="email"
                        placeholder="you@email.com"
                        className={`input-field ${errors.email ? "border-red-400" : ""}`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-600 text-slate-600 mb-1.5">Your Experience Level *</label>
                      <select
                        {...register("experience", { required: "Required" })}
                        className={`input-field ${errors.experience ? "border-red-400" : ""}`}
                      >
                        <option value="">Select level...</option>
                        <option value="complete-beginner">Complete Beginner</option>
                        <option value="some-basics">Know the basics</option>
                        <option value="intermediate">Intermediate developer</option>
                        <option value="professional">Working professional</option>
                      </select>
                      {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-600 text-slate-600 mb-1.5">Questions or Comments (Optional)</label>
                      <textarea
                        {...register("message")}
                        rows={2}
                        placeholder="Anything you'd like us to know..."
                        className="input-field resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                      ) : (
                        <><ArrowRight className="w-4 h-4" /> Send to WhatsApp</>
                      )}
                    </button>
                    <p className="text-xs text-center text-slate-400">
                      🔒 Secure enrollment · 30-day money-back guarantee
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle2 className="w-8 h-8 text-teal-500" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-700 text-slate-900 mb-3">You&apos;re Enrolled! 🎉</h3>
                  <p className="text-slate-500 mb-6">
                    Welcome to <strong>{courseTitle}</strong>. WhatsApp chat has been opened with your details.
                  </p>
                  <button onClick={handleClose} className="btn-primary mx-auto">
                    Enroll Another Course
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}