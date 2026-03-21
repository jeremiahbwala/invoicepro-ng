import { Receipt } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white px-6 md:px-[6%] py-20">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Receipt className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">About InvoicePro NG</h1>
        <p className="text-slate-500 mt-4">
          Helping freelancers and businesses in Nigeria create professional invoices with ease.
        </p>
      </div>

      {/* Story Section */}
      <div className="max-w-3xl mx-auto mt-12 space-y-6 text-slate-600 text-lg leading-relaxed">
        <p>
          InvoicePro NG was created to solve a simple but common problem — many freelancers and small businesses struggle to create clean, professional invoices and track payments effectively.
        </p>

        <p>
          Existing tools are often too expensive, too complex, or not tailored for the Nigerian market. InvoicePro NG provides a simple, fast, and reliable way to create invoices without stress.
        </p>

        <p>
          Whether you're a developer, designer, marketer, or small business owner, InvoicePro NG helps you stay organized, look professional, and get paid faster.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-2 gap-10">
        
        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
          <p className="text-slate-500">
            To empower freelancers and businesses with simple tools that make invoicing easy, professional, and accessible to everyone.
          </p>
        </div>

        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold text-lg mb-2">Why InvoicePro NG?</h3>
          <p className="text-slate-500">
            Built with simplicity in mind, InvoicePro NG works on any device, requires no complicated setup, and keeps your data in your control.
          </p>
        </div>

      </div>

      {/* Closing CTA */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">Start Creating Invoices Today</h2>
        <p className="text-slate-500 mt-2">
          Join freelancers already using InvoicePro NG to manage their business better.
        </p>
        <button className="mt-6 bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600">
          Get Started
        </button>
      </div>

    </div>
  );
}