interface HomeProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function Home({ onGetStarted }: HomeProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b flex justify-between items-center px-6 md:px-[6%] py-4">
        <div className="text-emerald-500 font-bold text-xl">InvoicePro NG</div>
        <div className="hidden md:flex items-center gap-7">
          <a href="#features" className="font-medium text-slate-700 hover:text-emerald-600">Features</a>
          <a href="#pricing" className="font-medium text-slate-700 hover:text-emerald-600">Pricing</a>
          <a href="#about" className="font-medium text-slate-700 hover:text-emerald-600">About</a>
          <button onClick={onGetStarted} className="border border-emerald-500 text-emerald-600 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50">Login</button>
          <button onClick={onGetStarted} className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-600">Get Started</button>
        </div>
        <button onClick={onGetStarted} className="md:hidden bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">Get Started</button>
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
            src="src/assets/hero-image.png"
            alt="InvoicePro NG Dashboard"
            className="w-full rounded-2xl shadow-xl border border-slate-200"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 md:px-[6%] py-20 text-center">
        <h2 className="text-3xl font-bold mb-12">Everything You Need for Invoicing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "Create Invoices", desc: "Generate professional invoices instantly." },
            { title: "Track Payments", desc: "Monitor paid and pending invoices." },
            { title: "Manage Clients", desc: "Store and organize client information." },
            { title: "Download PDF", desc: "Export clean professional invoices." },
          ].map((f) => (
            <div key={f.title} className="p-7 border rounded-xl bg-white hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-[6%] py-20 bg-slate-50 text-center">
        <h2 className="text-3xl font-bold">How InvoicePro Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-12">
          {[
            { n: 1, title: "Create Account", desc: "Sign up and access your dashboard." },
            { n: 2, title: "Add Clients", desc: "Store client contact information." },
            { n: 3, title: "Create Invoice", desc: "Add services and pricing." },
            { n: 4, title: "Send Invoice", desc: "Share invoice with clients." },
            { n: 5, title: "Track Payments", desc: "Monitor paid and pending invoices." },
          ].map((s) => (
            <div key={s.n} className="p-6 bg-white border rounded-xl">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">{s.n}</div>
              <h4 className="font-semibold mb-1">{s.title}</h4>
              <p className="text-slate-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="px-6 md:px-[6%] py-20 text-center">
        <h2 className="text-3xl font-bold">See InvoicePro in Action</h2>
        <div className="mt-12">
          <img
            src="src/assets/invoice-action.png"
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

      {/* CTA BANNER */}
      <section className="bg-emerald-500 px-6 md:px-[6%] py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">Start Creating Invoices Today</h2>
        <button onClick={onGetStarted} className="mt-8 bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50">Get Started Free</button>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 px-6 md:px-[6%] py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-white font-semibold mb-3">InvoicePro NG</h4>
            <p className="text-sm">Built by <span className="text-white font-medium">K&C Legacy Cooperation</span></p>
            <div className="flex gap-3 mt-4">
              {["f", "t", "in"].map((s) => (
                <div key={s} className="w-8 h-8 bg-slate-700 rounded-md flex items-center justify-center text-white text-sm font-bold">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Product</h4>
            <a href="#features" className="block text-sm mb-2 hover:text-white">Features</a>
            <a href="#pricing" className="block text-sm mb-2 hover:text-white">Pricing</a>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <a href="#" className="block text-sm mb-2 hover:text-white">About</a>
            <a href="#" className="block text-sm mb-2 hover:text-white">Contact</a>
            <a href="#" className="block text-sm mb-2 hover:text-white">Feedback</a>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <a href="#" className="block text-sm mb-2 hover:text-white">Privacy</a>
            <a href="#" className="block text-sm mb-2 hover:text-white">Terms</a>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm">
          <p>© 2026 InvoicePro NG</p>
          <p>Powered by K&C Legacy Cooperation</p>
        </div>
      </footer>

    </div>
  );
}