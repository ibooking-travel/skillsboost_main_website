"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    const whatsappNumber = "918168037096"; // 🔴 Replace with your number

    const formattedMessage =
`*New Contact Form Submission*

*Name:* ${data.name.trim()}
*Email:* ${data.email.trim()}
*Phone:* ${data.phone.trim()}
*Subject:* ${data.subject}

*Message:*
${data.message.trim()}`;

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp (works on mobile and desktop)
    window.location.href = whatsappURL;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      reset();
    }, 1000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-teal-500" />
        </div>

        <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
        <p className="text-slate-500 mb-6">
          WhatsApp chat has been opened with your details.
        </p>

        <button
          onClick={() => setSubmitted(false)}
          className="btn-outline"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name & Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold mb-2">
            Full Name *
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
            })}
            className={`input-field ${errors.name ? "border-red-400 focus:ring-red-100" : ""}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold mb-2">Email *</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
            })}
            className={`input-field ${errors.email ? "border-red-400 focus:ring-red-100" : ""}`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Phone & Subject */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold mb-2">Phone *</label>
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9+\s-]{8,15}$/,
                message: "Enter a valid phone number",
              },
            })}
            className={`input-field ${errors.phone ? "border-red-400 focus:ring-red-100" : ""}`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold mb-2">Subject *</label>
          <select
            {...register("subject", { required: "Please select a subject" })}
            className={`input-field ${errors.subject ? "border-red-400 focus:ring-red-100" : ""}`}
          >
            <option value="">Select topic...</option>
            <option value="Course Guidance">Course Guidance</option>
            <option value="Enrollment Help">Enrollment Help</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Partnership">Partnership</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-bold mb-2">Message *</label>
        <textarea
          rows={5}
          {...register("message", {
            required: "Message is required",
            minLength: { value: 20, message: "Minimum 20 characters" },
          })}
          className={`input-field resize-none ${errors.message ? "border-red-400 focus:ring-red-100" : ""}`}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message on WhatsApp
          </>
        )}
      </button>
    </form>
  );
}