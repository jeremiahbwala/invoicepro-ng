import { useState } from 'react';
import { Check, Zap, Crown, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UpgradeProps {
  onBack: () => void;
  onProceedToPayment: (plan: 'monthly' | 'yearly') => void;
  isPro?: boolean;
}

const proFeatures = [
  'Unlimited invoices',
  'Unlimited clients',
  'PDF without watermark',
  'Analytics dashboard',
  'Priority email support',
  'Pro badge on account',
  'Early access to new features',
];

const freeFeatures = [
  'Unlimited invoices',
  'Unlimited clients',
  'PDF download (with watermark)',
  'Payment tracking',
  'Client management',
];

const freeNotIncluded = [
  'PDF without watermark',
  'Analytics dashboard',
  'Priority support',
];

export default function Upgrade({ onBack, onProceedToPayment, }: UpgradeProps) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const price = billing === 'monthly' ? '$3' : '$32';
  const period = billing === 'monthly' ? '/month' : '/year';
  const saving = billing === 'yearly' ? 'Save $4 vs monthly' : null;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* Header */}
      <div className="bg-white border-b px-6 md:px-[6%] py-4 flex items-center gap-4">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700 flex items-center gap-1 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="font-bold text-slate-900">Upgrade to Pro</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Go Pro, Get Paid Faster</h2>
          <p className="text-slate-500 mt-3 text-lg max-w-xl mx-auto">
            Remove the watermark, unlock analytics, and get priority support — all for less than a cup of coffee a month.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
          <button
            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            className={`w-12 h-6 rounded-full transition-colors relative ${billing === 'yearly' ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${billing === 'yearly' ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-sm font-medium ${billing === 'yearly' ? 'text-slate-900' : 'text-slate-400'}`}>
            Yearly
            <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">Save $4</span>
          </span>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {/* Free Plan */}
          <div className="bg-white border rounded-2xl p-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900">Free</h3>
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">Current Plan</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-1">$0</div>
            <p className="text-slate-400 text-sm mb-6">Forever free</p>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">What's included</p>
            <ul className="space-y-2 mb-4">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 mt-5">Not included</p>
            <ul className="space-y-2">
              {freeNotIncluded.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                  <X className="w-4 h-4 text-slate-300 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8 relative overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3" /> Recommended
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Pro</h3>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-emerald-600">{price}</span>
              <span className="text-slate-400 text-sm mb-1">{period}</span>
            </div>
            {saving && (
              <p className="text-emerald-600 text-xs font-medium mb-6">{saving}</p>
            )}
            {!saving && <div className="mb-6" />}

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Everything in Free, plus</p>
            <ul className="space-y-2">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setShowPaymentModal(true)}
              className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold"
            >
              Upgrade to Pro — {price}{period}
            </Button>
            <p className="text-center text-xs text-slate-400 mt-3">Cancel anytime. No hidden fees.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 text-center mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              {
                q: "What happens to my invoices if I downgrade?",
                a: "All your invoices and client data are always safe. If you downgrade, PDFs will include the InvoicePro NG watermark again.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. You can cancel your Pro subscription at any time. You'll keep Pro access until the end of your billing period.",
              },
              {
                q: "Is the yearly plan better value?",
                a: "Yes — the yearly plan costs $32, which saves you $4 compared to paying $3/month for 12 months.",
              },
              {
                q: "What payment methods are accepted?",
                a: "We accept card payments and bank transfers via Payscribe. More payment options coming soon.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white border rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">{item.q}</p>
                <p className="text-slate-500 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Crown className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold">Complete Your Upgrade</h3>
              <p className="text-slate-500 text-sm mt-1">
                Pro {billing === 'monthly' ? 'Monthly' : 'Yearly'} — {price}{period}
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">InvoicePro NG Pro ({billing})</span>
                <span className="font-medium">{price}</span>
              </div>
              {billing === 'yearly' && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Annual discount</span>
                  <span>-$4</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-emerald-600">{price}{period}</span>
              </div>
            </div>

            {/* Payment options placeholder */}
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center mb-6">
              <p className="text-slate-400 text-sm font-medium">Payment gateway</p>
              <p className="text-slate-300 text-xs mt-1">Payscribe integration coming soon</p>
            </div>

            <Button
              onClick={() => {
                onProceedToPayment(billing);
                setShowPaymentModal(false);
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold"
            >
              Proceed to Payment
            </Button>
            <p className="text-center text-xs text-slate-400 mt-3">
              Secured by Payscribe · Cancel anytime
            </p>
          </div>
        </div>
      )}
    </div>
  );
}