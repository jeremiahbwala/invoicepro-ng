import { useState } from 'react';

interface AuthProps {
  onAuthSuccess: () => void;
  onBack: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function Auth({ onAuthSuccess, onBack, initialMode = 'signin' }: AuthProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [form, setForm] = useState({ fullName: '', businessName: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      // Validation
      if (!form.fullName.trim()) return setError('Full name is required.');
      if (!form.businessName.trim()) return setError('Business name is required.');
      if (!form.email.trim()) return setError('Email is required.');
      if (form.password.length < 6) return setError('Password must be at least 6 characters.');

      // Check if email already exists
      const existing = localStorage.getItem('invoicepro_user');
      if (existing) {
        const user = JSON.parse(existing);
        if (user.email === form.email) return setError('An account with this email already exists.');
      }

      // Save user
      localStorage.setItem('invoicepro_user', JSON.stringify({
        fullName: form.fullName,
        businessName: form.businessName,
        email: form.email,
        password: form.password,
      }));

      // Pre-fill business info
      localStorage.setItem('invoicepro_business', JSON.stringify({
        name: form.businessName,
        address: '',
        phone: '',
        email: form.email,
      }));

      localStorage.setItem('invoicepro_session', 'true');
      onAuthSuccess();

    } else {
      // Sign in
      if (!form.email.trim() || !form.password.trim()) return setError('Email and password are required.');

      const existing = localStorage.getItem('invoicepro_user');
      if (!existing) return setError('No account found. Please sign up first.');

      const user = JSON.parse(existing);
      if (user.email !== form.email || user.password !== form.password) {
        return setError('Incorrect email or password.');
      }

      localStorage.setItem('invoicepro_session', 'true');
      onAuthSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Top bar */}
      <nav className="bg-white border-b px-6 md:px-[6%] py-4 flex items-center justify-between">
        <button onClick={onBack} className="text-emerald-600 font-bold text-xl">InvoicePro NG</button>
        <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-700">← Back to Home</button>
      </nav>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white border rounded-2xl shadow-sm w-full max-w-md p-8">

          {/* Toggle tabs */}
          <div className="flex rounded-xl border overflow-hidden mb-8">
            <button
              onClick={() => { setMode('signin'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${mode === 'signin' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${mode === 'signup' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-1">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {mode === 'signin' ? 'Sign in to access your dashboard.' : 'Get started for free today.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                  <input
                    name="businessName"
                    type="text"
                    placeholder="My Business Ltd"
                    value={form.businessName}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-4 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold text-sm mt-2"
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
              className="text-emerald-600 font-semibold hover:underline"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}