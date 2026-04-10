import heroImage from "../assets/hero-image.png";
import invoiceAction from "../assets/invoice-action.png";
import { Receipt } from 'lucide-react';
import { FileText, Users, LayoutDashboard, Download, Smartphone, ShieldCheck, Facebook, Twitter, Linkedin } from 'lucide-react';


interface HomeProps {
  businessName?: string;
  onGetStarted: () => void;
  onLogin: () => void;
  onAbout: () => void;
  onContact: () => void;
  onFeedback: () => void;
}

export default function Home({ businessName, onGetStarted, onContact, onFeedback }: HomeProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b flex justify-between items-center px-6 md:px-[6%] py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Receipt className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-emerald-800 text-sm leading-tight">InvoicePro NG</h1>
            <p className="text-xs text-gray-500 truncate max-w-[120px]">{businessName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-7">
          <a href="#features" className="hidden md:block font-medium text-slate-700 hover:text-emerald-600 text-sm">Features</a>
          <a href="#pricing" className="hidden md:block font-medium text-slate-700 hover:text-emerald-600 text-sm">Pricing</a>
          <a href="#about" className="hidden md:block font-medium text-slate-700 hover:text-emerald-600 text-sm">About</a>
          <button onClick={onGetStarted} className="border border-emerald-500 text-emerald-600 px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 text-sm">Login</button>
          <button onClick={onGetStarted} className="bg-emerald-500 text-white px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-emerald-600 text-sm">Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-[6%] py-20 bg-slate-50">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Create Professional Invoices in Seconds
          </h1>
          <p className="mt-5 text-lg text-slate-500">
            InvoicePro NG helps freelancers and businesses create invoices, track payments and manage clients easily.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <button onClick={onGetStarted} className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600">Start Free</button>
            <button onClick={onGetStarted} className="border border-emerald-500 text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50">View Demo</button>
          </div>
        </div>
        <div className="flex-1 min-w-[300px]">
          <img
            src={heroImage}
            alt="InvoicePro NG Dashboard"
            className="w-full rounded-2xl shadow-xl border border-slate-200"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 md:px-[6%] py-20 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">About InvoicePro NG</h2>
          <p className="text-slate-500 mt-4 text-lg">
            Helping freelancers and businesses in Nigeria create professional invoices with ease.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-5 text-slate-600 text-lg leading-relaxed">
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
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
            <p className="text-slate-500">
              To empower freelancers and businesses with simple tools that make invoicing easy, professional, and accessible to everyone.
            </p>
          </div>
          <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Why InvoicePro NG?</h3>
            <p className="text-slate-500">
              Built with simplicity in mind, InvoicePro NG works on any device, requires no complicated setup, and keeps your data in your control.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-[6%] py-20 bg-slate-50 text-center">
        <h2 className="text-3xl font-bold">How InvoicePro Works</h2>
        <p className="text-slate-500 mt-3 text-lg">Get up and running in minutes</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-12">
          {[
            { n: 1, title: "Create Account", desc: "Sign up and access your dashboard instantly." },
            { n: 2, title: "Add Clients", desc: "Store and organize client contact information." },
            { n: 3, title: "Create Invoice", desc: "Add services, pricing and generate professional invoices." },
            { n: 4, title: "Download PDF", desc: "Export clean, professional invoices as PDF." },
            { n: 5, title: "Send & Track", desc: "Share invoices with clients and monitor payment status." },
          ].map((s) => (
            <div key={s.n} className="p-6 bg-white border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">{s.n}</div>
              <h4 className="font-semibold mb-1">{s.title}</h4>
              <p className="text-slate-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU CAN DO */}
      <section id="features" className="px-6 md:px-[6%] py-20 text-center">
        <h2 className="text-3xl font-bold">What You Can Do with InvoicePro</h2>
        <p className="text-slate-500 mt-3 text-lg">Everything built for Nigerian freelancers and businesses</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: FileText, title: "Professional Invoices", desc: "Create branded invoices with your business name, itemized services and totals in seconds." },
            { icon: Users, title: "Client Management", desc: "Store client profiles, contact details and view their full invoice history in one place." },
            { icon: LayoutDashboard, title: "Payment Dashboard", desc: "Get a clear overview of paid, pending and overdue invoices at a glance." },
            { icon: Download, title: "PDF Export", desc: "Download and share polished PDF invoices your clients will trust." },
            { icon: Smartphone, title: "Works on Any Device", desc: "Fully responsive — use InvoicePro on your phone, tablet or desktop." },
            { icon: ShieldCheck, title: "Your Data, Your Device", desc: "All data is stored locally on your device. No cloud, no subscription required." },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="p-7 border rounded-xl bg-white hover:shadow-lg transition-shadow text-left">
                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="px-6 md:px-[6%] py-20 text-center">
        <h2 className="text-3xl font-bold">See InvoicePro in Action</h2>
        <div className="mt-12">
          <img
            src={invoiceAction}
            alt="InvoicePro NG Product Preview"
            className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl border border-slate-200"
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-[6%] py-20 bg-slate-50 text-center">
        <h2 className="text-3xl font-bold">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { quote: "InvoicePro made invoicing extremely simple.", name: "Freelance Developer" },
            { quote: "Perfect invoicing tool for my business.", name: "Business Owner" },
            { quote: "Clean interface and powerful features.", name: "Designer" },
          ].map((t) => (
            <div key={t.name} className="bg-white p-6 rounded-xl border">
              <p className="text-slate-600 italic">"{t.quote}"</p>
              <p className="mt-4 font-semibold text-slate-800">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 md:px-[6%] py-20 text-center">
        <h2 className="text-3xl font-bold">Simple Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-3xl mx-auto">
          <div className="border rounded-2xl p-9 bg-white">
            <h3 className="text-xl font-bold">Free</h3>
            <div className="text-5xl font-bold my-4">$0</div>
            <ul className="text-slate-500 space-y-2 mb-8">
              <li>Basic invoicing</li>
              <li>Client management</li>
              <li>PDF invoices</li>
            </ul>
            <button onClick={onGetStarted} className="w-full border border-emerald-500 text-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-50">Get Started</button>
          </div>
          <div className="border-2 border-emerald-500 rounded-2xl p-9 bg-white">
            <h3 className="text-xl font-bold">Pro</h3>
            <div className="text-5xl font-bold my-4">$9</div>
            <ul className="text-slate-500 space-y-2 mb-8">
              <li>Unlimited invoices</li>
              <li>Payment tracking</li>
              <li>Analytics dashboard</li>
            </ul>
            <button onClick={onGetStarted} className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600">Upgrade</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-emerald-500 text-white px-6 md:px-[6%] py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                <Receipt className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-white font-semibold">InvoicePro NG</h4>
            </div>
            <p className="text-sm text-emerald-100">Built by <span className="text-white font-medium">StratosCore</span></p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/profile.php?id=61578772844034" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-md flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="https://x.com/charl11428" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-md flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="https://linkedin.com/company/stratos-core" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-md flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Product</h4>
            <a href="#features" className="block text-sm mb-2 text-emerald-100 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="block text-sm mb-2 text-emerald-100 hover:text-white transition-colors">Pricing</a>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <a href="#about" className="block text-sm mb-2 text-emerald-100 hover:text-white transition-colors">About</a>
            <button onClick={onContact} className="block text-sm mb-2 text-emerald-100 hover:text-white transition-colors">Contact</button>
            <button onClick={onFeedback} className="block text-sm mb-2 text-emerald-100 hover:text-white transition-colors">Feedback</button>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <a href="#" className="block text-sm mb-2 text-emerald-100 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="block text-sm mb-2 text-emerald-100 hover:text-white transition-colors">Terms</a>
          </div>

        </div>

        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-emerald-100">
          <p>© 2026 InvoicePro NG</p>
          <p>Powered by StratosCore</p>
        </div>
      </footer>

    </div>
  );
}