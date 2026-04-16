import { useState } from "react";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[InvoicePro NG] ${form.subject}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:invoicepro.ng@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white px-6 md:px-[6%] py-20">

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="text-slate-500 mt-3">
          Have questions, feedback, or need help? We'd love to hear from you.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">

        <div className="p-6 border rounded-xl text-center hover:shadow-lg transition">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-sm text-slate-500 mb-3">Reach us via email</p>
          <a href="mailto:support@invoiceprong.com" className="text-emerald-600 font-medium hover:underline">
            support@invoiceprong.com
          </a>
        </div>

        <div className="p-6 border rounded-xl text-center hover:shadow-lg transition">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold mb-1">Phone</h3>
          <p className="text-sm text-slate-500 mb-3">Call us directly</p>
          <a href="tel:+2348061751301" className="text-emerald-600 font-medium hover:underline">
            +234 000 000 0000
          </a>
        </div>

        <div className="p-6 border rounded-xl text-center hover:shadow-lg transition">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold mb-1">WhatsApp</h3>
          <p className="text-sm text-slate-500 mb-3">Chat with us instantly</p>
          <a
            href="https://wa.me/2348061751301"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 font-medium hover:underline"
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto mt-16">
        <div className="bg-slate-50 border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-1">Send us a message</h2>
          <p className="text-slate-500 text-sm mb-8">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>

          {submitted ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
              <p className="text-slate-500 text-sm">
                Thanks for reaching out. We'll respond to your email within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-6 text-emerald-600 font-medium hover:underline text-sm"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <select
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-slate-700"
                >
                  <option value="">Select a topic</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Billing & Pricing">Billing & Pricing</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe your issue or question in detail..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>

            </form>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-12 text-sm text-slate-400">
        We usually respond within 24 hours. For urgent issues, use WhatsApp.
      </div>

    </div>
  );
}