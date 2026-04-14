'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CalendarDays, ChevronDown, Copy, Info, Mail, MessageCircle } from 'lucide-react';
import axios from 'axios';

type ActiveTab = 'indian' | 'non-indian';

type FormData = {
  seva: string;
  amount: string;
  fullName: string;
  whatsapp: string;
  pincode: string;
  email: string;
  dateOfBirth: string;
  donorIdentity: string;
  sankalp: boolean;
};

type CopyField = 'account' | 'account-num' | 'bank' | 'ifsc' | 'email';

export function DonationForm() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('indian');
  const [formData, setFormData] = useState<FormData>({
    seva: '',
    amount: '',
    fullName: '',
    whatsapp: '', 
    pincode: '',
    email: '',
    dateOfBirth: '',
    donorIdentity: '',
    sankalp: false,
  });
  const [copied, setCopied] = useState<CopyField | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCopy = (text: string, field: CopyField) => {
    void navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.seva || !formData.amount || !formData.fullName || !formData.whatsapp || !formData.pincode) {
      setSubmitMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setIsLoading(true);
    setSubmitMessage(null);

    try {
      const response = await axios.post('https://your-api-endpoint.com/donations', {
        seva: formData.seva,
        amount: parseFloat(formData.amount),
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        pincode: formData.pincode,
        sankalp: formData.sankalp,
        currency: activeTab,
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitMessage({ type: 'success', text: 'Donation submitted successfully! Thank you for your seva.' });
        // Reset form
        setFormData({
          seva: '',
          amount: '',
          fullName: '',
          whatsapp: '',
          pincode: '',
          email: '',
          dateOfBirth: '',
          donorIdentity: '',
          sankalp: false,
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      setSubmitMessage({ type: 'error', text: 'Failed to submit donation. Please try again or contact support.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="donation-form"
      className="bg-[linear-gradient(180deg,#fffaf2_0%,#fff3df_42%,#fff8ef_100%)] px-4 py-12"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-[#8b3a1f] sm:text-4xl">
          Offer your Seva and receive the blessings of Sri Radha Krishna
        </h2>

        <div className="mx-auto mb-6 flex max-w-3xl gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('indian')}
            className={`flex-1 rounded-lg px-5 py-3 font-semibold transition-colors ${
              activeTab === 'indian'
                ? 'bg-[#8b3a1f] text-white'
                : 'border-2 border-gray-300 bg-white text-gray-700'
            }`}
          >
            Indian Currency
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('non-indian')}
            className={`flex-1 rounded-lg px-5 py-3 font-semibold transition-colors ${
              activeTab === 'non-indian'
                ? 'bg-[#8b3a1f] text-white'
                : 'border-2 border-gray-300 bg-white text-gray-700'
            }`}
          >
            Non-Indian Currency
          </button>
        </div>

        <div className={`mx-auto max-w-6xl rounded-3xl ${activeTab === 'non-indian' ? 'bg-[#fdf0ee] p-0 shadow-none' : 'bg-white p-6'}`}>
          {activeTab === 'non-indian' ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="seva" className="mb-2 block text-sm font-semibold text-[#39180f]">
                      Select Seva
                    </label>
                    <div className="relative">
                      <select
                        id="seva"
                        value={formData.seva}
                        onChange={(e) => setFormData({ ...formData, seva: e.target.value })}
                        className="w-full appearance-none rounded-2xl border border-[#c18372] bg-white px-5 py-4 pr-12 text-lg text-[#39180f] focus:border-[#8b3a1f] focus:outline-none"
                      >
                        <option value="">Akshaya Tritiya Seva</option>
                        <option value="akshaya-tritiya">Akshaya Tritiya Seva</option>
                        <option value="gau-seva">Gau Seva</option>
                        <option value="mandir">Mandir Nirman Seva</option>
                        <option value="annadana">Annadana Seva</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b3a1f]" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="amount" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#39180f]">
                      Amount
                      <Info className="h-4 w-4 text-[#8b3a1f]" />
                    </label>
                    <input
                      id="amount"
                      type="number"
                      placeholder="Enter Amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full rounded-2xl border border-[#c18372] bg-white px-5 py-4 text-lg text-[#39180f] focus:border-[#8b3a1f] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {['10000', '5100', '3100', '2100', '1100', '501'].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setFormData({ ...formData, amount })}
                      className={`rounded-2xl border px-3 py-3 text-center text-lg font-semibold transition-colors ${
                        formData.amount === amount
                          ? 'border-[#8b3a1f] bg-[#8b3a1f] text-white'
                          : 'border-[#b86d5f] bg-white text-[#8b3a1f] hover:bg-[#fff7f5]'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                <div className="rounded-[28px] bg-[#f3d482] p-6 sm:p-7">
                  <div>
                    <label htmlFor="donorIdentity" className="mb-2 block text-sm font-semibold text-[#39180f]">
                      I am
                    </label>
                    <div className="relative max-w-[320px]">
                      <select
                        id="donorIdentity"
                        value={formData.donorIdentity}
                        onChange={(e) => setFormData({ ...formData, donorIdentity: e.target.value })}
                        className="w-full appearance-none rounded-2xl border border-transparent bg-white/75 px-4 py-3 pr-11 text-lg text-[#39180f] focus:border-[#8b3a1f] focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="individual">Individual</option>
                        <option value="family">Family</option>
                        <option value="organization">Organization</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b3a1f]" />
                    </div>
                  </div>

                  <p className="mt-5 max-w-xl text-lg leading-8 text-[#5a3625]">
                    *For donating in foreign currency, to comply with government regulations you need to identify yourself.
                  </p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-[#39180f]">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Your Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-2xl border border-transparent bg-white/75 px-4 py-3 text-lg text-[#39180f] focus:border-[#8b3a1f] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-[#39180f]">
                        WhatsApp Number
                      </label>
                      <div className="flex gap-3">
                        <div className="flex items-center rounded-2xl bg-white/80 px-3 text-xl">
                          <span aria-hidden="true">🇮🇳</span>
                        </div>
                        <input
                          id="whatsapp"
                          type="tel"
                          placeholder="+91"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="min-w-0 flex-1 rounded-2xl border border-transparent bg-white/75 px-4 py-3 text-lg text-[#39180f] focus:border-[#8b3a1f] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#39180f]">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-2xl border border-transparent bg-white/75 px-4 py-3 text-lg text-[#39180f] focus:border-[#8b3a1f] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="dateOfBirth" className="mb-2 block text-sm font-semibold text-[#39180f]">
                        Date of Birth (Optional)
                      </label>
                      <div className="relative">
                        <input
                          id="dateOfBirth"
                          type="text"
                          placeholder="dd/mm/yyyy"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="w-full rounded-2xl border border-transparent bg-white/75 px-4 py-3 pr-12 text-lg text-[#39180f] focus:border-[#8b3a1f] focus:outline-none"
                        />
                        <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9d5f4f]" />
                      </div>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#39180f]">
                        Sankalp and Aarti will be performed for you on your birthday.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="min-w-[220px] rounded-2xl bg-[#8b0003] px-8 py-4 text-xl font-bold text-white shadow-[0_10px_18px_rgba(139,0,3,0.18)] transition-colors hover:bg-[#6e0002] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? 'Submitting...' : 'Donate'}
                    </button>
                  </div>

                  {submitMessage && (
                    <div
                      className={`mt-4 rounded-2xl p-3 text-sm font-medium ${
                        submitMessage.type === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {submitMessage.text}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[28px] bg-[#f3d482] p-6 sm:p-7">
                <div className="space-y-7 text-[#39180f]">
                  <div className="space-y-6 text-xl font-semibold leading-9">
                    <p>
                      *By proceeding, you are agreeing to our{' '}
                      <a href="#" className="font-bold text-[#7a1e13] hover:underline">
                        Terms & Conditions
                      </a>{' '}
                      &amp;{' '}
                      <a href="#" className="font-bold text-[#7a1e13] hover:underline">
                        Privacy Policy
                      </a>
                    </p>
                    <p>
                      *Under the Foreign Contribution (Regulation) Act, 2010, Registered under Section 11 (1).
                    </p>
                    <p>
                      Registration Number: <span className="font-bold text-[#a12a1c]">125560332</span>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-[#a04d42]">Support</h3>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-4 text-lg">
                      <span>For more information please contact :</span>
                      <a
                        href="tel:9196600716666"
                        className="inline-flex items-center gap-3 font-medium text-[#39180f] hover:text-[#7a1e13]"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-[#b4574a]">
                          <MessageCircle className="h-5 w-5" />
                        </span>
                        9196600716666
                      </a>
                      <a
                        href="mailto:dmt@hkmjaipur.org"
                        className="inline-flex items-center gap-3 font-medium text-[#39180f] hover:text-[#7a1e13]"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-[#b4574a]">
                          <Mail className="h-5 w-5" />
                        </span>
                        dmt@hkmjaipur.org
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
              <div className="mb-6">
                <label htmlFor="seva" className="mb-3 block text-sm font-semibold text-gray-800">
                  Select Seva
                </label>
                <select
                  id="seva"
                  value={formData.seva}
                  onChange={(e) => setFormData({ ...formData, seva: e.target.value })}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#8b3a1f] focus:outline-none"
                >
                  <option value="">Choose a Seva</option>
                  <option value="akshaya-tritiya">Akshaya Tritiya Seva</option>
                  <option value="gau-seva">Gau Seva</option>
                  <option value="mandir">Mandir Nirman Seva</option>
                  <option value="annadana">Annadana Seva</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="amount" className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                  Amount
                  <Info className="h-4 w-4 text-gray-500" />
                </label>
                <input
                  id="amount"
                  type="number"
                  placeholder="Enter Amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#8b3a1f] focus:outline-none"
                />
              </div>

              <div className="mb-6 rounded-lg bg-[#fde9bf] p-6">
                <div className="mb-5">
                  <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-gray-800">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Your Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 focus:border-[#8b3a1f] focus:outline-none"
                  />
                </div>

                <div className="mb-5 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-gray-800">
                      WhatsApp Number
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 rounded-lg border-2 border-gray-300 bg-white px-3">
                        <span aria-hidden="true" className="text-lg">IN</span>
                        <span className="text-gray-700">+91</span>
                      </div>
                      <input
                        id="whatsapp"
                        type="tel"
                        placeholder="98765 43210"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 focus:border-[#8b3a1f] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="pincode" className="mb-2 block text-sm font-semibold text-gray-800">
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    placeholder="City Pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 focus:border-[#8b3a1f] focus:outline-none"
                  />
                </div>

                <div className="mb-6 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="sankalp"
                    checked={formData.sankalp}
                    onChange={(e) => setFormData({ ...formData, sankalp: e.target.checked })}
                    className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-[#8b3a1f]"
                  />
                  <label htmlFor="sankalp" className="text-sm text-gray-700">
                    I would like to receive Sankalp and Aarti video on my birthday.
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full rounded-lg bg-[#8b3a1f] py-3 font-bold text-white transition-colors hover:bg-[#6b2a15] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Submitting...' : 'Donate'}
                </button>

                {submitMessage && (
                  <div className={`mt-4 rounded-lg p-3 text-sm font-medium ${
                    submitMessage.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-[#fde9bf] p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 font-bold text-[#8b3a1f]">For UPI & QR</h3>
                  <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-white p-4">
                    <div className="relative h-32 w-32 overflow-hidden rounded bg-gray-200">
                      <Image
                        src="/Akshaya_Tritiya_seva.png"
                        alt="QR code placeholder"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-[#8b3a1f]">
                    For Bank Transfer
                    <Copy className="h-4 w-4" />
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Account Name: <span className="font-bold text-[#8b3a1f]">Hare Krishna Movement Jaipur</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('Hare Krishna Movement Jaipur', 'account')}
                        className="text-gray-500 hover:text-[#8b3a1f]"
                      >
                        {copied === 'account' ? 'Copied' : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Account Number: <span className="font-bold text-[#8b3a1f]">677501700696</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('677501700696', 'account-num')}
                        className="text-gray-500 hover:text-[#8b3a1f]"
                      >
                        {copied === 'account-num' ? 'Copied' : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Bank Name: <span className="font-bold text-[#8b3a1f]">ICICI Bank</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('ICICI Bank', 'bank')}
                        className="text-gray-500 hover:text-[#8b3a1f]"
                      >
                        {copied === 'bank' ? 'Copied' : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        IFSC Code: <span className="font-bold text-[#8b3a1f]">ICIC0007299</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('ICIC0007299', 'ifsc')}
                        className="text-gray-500 hover:text-[#8b3a1f]"
                      >
                        {copied === 'ifsc' ? 'Copied' : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Email: <span className="font-bold text-[#8b3a1f]">daan.augp@eubank</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('daan.augp@eubank', 'email')}
                        className="text-gray-500 hover:text-[#8b3a1f]"
                      >
                        {copied === 'email' ? 'Copied' : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-center text-xs italic text-gray-700">
                  (Kindly send us a screenshot for your seva entry)
                </p>

                <p className="text-center text-xs text-gray-800">
                  <span className="font-bold">By proceeding, you are agreeing to our</span>{' '}
                  <a href="#" className="font-bold text-[#8b3a1f] hover:underline">
                    Terms & Conditions
                  </a>{' '}
                  &amp;{' '}
                  <a href="#" className="font-bold text-[#8b3a1f] hover:underline">
                    Privacy Policy
                  </a>
                </p>

                <div className="border-t border-gray-300 pt-4">
                  <h4 className="mb-3 font-bold text-[#8b3a1f]">Support</h4>
                  <p className="mb-3 text-xs text-gray-700">For more information please contact:</p>
                  <div className="mb-2 flex items-center gap-2 text-sm">
                    <span aria-hidden="true">Phone</span>
                    <a href="tel:9196600716666" className="font-semibold text-[#8b3a1f] hover:underline">
                      9196600716666
                    </a>
                  </div>
                  <div className="mb-4 flex items-center gap-2 text-sm">
                    <span aria-hidden="true">Email</span>
                    <a href="mailto:dmt@hkmjaipur.org" className="font-semibold text-[#8b3a1f] hover:underline">
                      dmt@hkmjaipur.org
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-orange-500 px-3 py-1 text-xs font-bold text-white">Assured</span>
                    <span className="text-xs">Payment Methods Accepted</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
