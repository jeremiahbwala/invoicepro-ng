import { useState } from "react";
import { Send } from "lucide-react";

export default function Feedback() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-white px-6 md:px-[6%] py-20">
      
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Send Feedback</h1>
        <p className="text-slate-500 mt-3">
          Help us improve InvoicePro NG. Your feedback matters.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="max-w-md mx-auto mt-8 p-4 bg-emerald-50 text-emerald-700 rounded-lg text-center">
          ✅ Your message has been sent successfully!
        </div>
      )}

      {/* Form */}
      {!success && (
        <form
          action="https://formspree.io/f/xgonbver"
          method="POST"
          onSubmit={() => {
            setLoading(true);
            setTimeout(() => {
              setSuccess(true);
            }, 1500);
          }}
          className="max-w-2xl mx-auto mt-10 space-y-6"
        >
          
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 font-medium">Your Message</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Write your feedback here..."
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Feedback"}
            {!loading && <Send className="w-4 h-4" />}
          </button>

        </form>
      )}
    </div>
  );
}