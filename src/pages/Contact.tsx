import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white px-6 md:px-[6%] py-20">
      
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="text-slate-500 mt-3">
          Have questions, feedback, or need help? We’d love to hear from you.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
        
        {/* Email */}
        <div className="p-6 border rounded-xl text-center hover:shadow-lg transition">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-sm text-slate-500 mb-3">Reach us via email</p>
          <a
            href="mailto:charlesjeremiah204@gmail.com"
            className="text-emerald-600 font-medium hover:underline"
          >
            support@invoiceprong.com
          </a>
        </div>

        {/* Phone */}
        <div className="p-6 border rounded-xl text-center hover:shadow-lg transition">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold mb-1">Phone</h3>
          <p className="text-sm text-slate-500 mb-3">Call us directly</p>
          <a
            href="tel:+2348061751301"
            className="text-emerald-600 font-medium hover:underline"
          >
            +234 000 000 0000
          </a>
        </div>

        {/* WhatsApp */}
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

      {/* Footer Note */}
      <div className="text-center mt-16 text-sm text-slate-400">
        We usually respond within 24 hours.
      </div>

    </div>
  );
}