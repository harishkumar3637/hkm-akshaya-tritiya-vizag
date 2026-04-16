'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CalendarDays, ChevronDown, Copy, Info, Mail, MessageCircle } from 'lucide-react';
import axios from 'axios';

import type { DonationFormContent } from '@/data/events/types';

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

type DonationFormProps = {
  content: DonationFormContent;
};

export function DonationForm({ content }: DonationFormProps) {
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
    if (!formData.seva || !formData.amount || !formData.fullName || !formData.whatsapp || !formData.pincode) {
      setSubmitMessage({ type: 'error', text: content.messages.requiredFields });
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
        setSubmitMessage({ type: 'success', text: content.messages.success });
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
      setSubmitMessage({ type: 'error', text: content.messages.failure });
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
          {content.heading}
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
            {content.tabs.indian}
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
            {content.tabs.nonIndian}
          </button>
        </div>

        <div className={`mx-auto max-w-6xl rounded-3xl ${activeTab === 'non-indian' ? 'bg-[#fdf0ee] p-0 shadow-none' : 'bg-white p-6'}`}>
          {activeTab === 'non-indian' ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="seva" className="mb-2 block text-sm font-semibold text-[#39180f]">
                      {content.selects.sevaLabel}
                    </label>
                    <div className="relative">
                      <select
                        id="seva"
                        value={formData.seva}
                        onChange={(e) => setFormData({ ...formData, seva: e.target.value })}
                        className={`w-full appearance-none rounded-2xl border border-[#c18372] bg-white px-5 py-4 pr-12 text-lg focus:border-[#8b3a1f] focus:outline-none ${
                          'text-[#6e2918]'
                        }`}
                      >
                        {content.sevaOptions.map((option) => (
                          <option key={option.value || option.label} value={option.value} className="text-[#6e2918]">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b3a1f]" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="amount" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#39180f]">
                      {content.selects.amountLabel}
                      <Info className="h-4 w-4 text-[#8b3a1f]" />
                    </label>
                    <input
                      id="amount"
                      type="number"
                      placeholder={content.placeholders.amount}
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full rounded-2xl border border-[#c18372] bg-white px-5 py-4 text-lg text-[#6e2918] placeholder:text-[#6e2918] focus:border-[#8b3a1f] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {content.amountSuggestions.map((amount) => (
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
                      {content.selects.donorIdentityLabel}
                    </label>
                    <div className="relative max-w-[320px]">
                      <select
                        id="donorIdentity"
                        value={formData.donorIdentity}
                        onChange={(e) => setFormData({ ...formData, donorIdentity: e.target.value })}
                        className="w-full appearance-none rounded-2xl border border-transparent bg-white/75 px-4 py-3 pr-11 text-lg text-[#6e2918] focus:border-[#8b3a1f] focus:outline-none"
                      >
                        {content.donorIdentityOptions.map((option) => (
                          <option key={option.value || option.label} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b3a1f]" />
                    </div>
                  </div>

                  <p className="mt-5 max-w-xl text-lg leading-8 text-[#5a3625]">
                    {content.nonIndian.complianceNote}
                  </p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-[#39180f]">
                        {content.labels.fullName}
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder={content.placeholders.fullName}
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-2xl border border-transparent bg-white/75 px-4 py-3 text-lg text-[#6e2918] placeholder:text-[#6e2918] focus:border-[#8b3a1f] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-[#39180f]">
                        {content.labels.whatsapp}
                      </label>
                      <div className="flex gap-3">
                        <div className="flex items-center rounded-2xl bg-white/80 px-3 text-xl">
                          <span aria-hidden="true">{"\u{1F1EE}\u{1F1F3}"}</span>
                        </div>
                        <input
                          id="whatsapp"
                          type="tel"
                          placeholder={content.placeholders.whatsappInternational}
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="min-w-0 flex-1 rounded-2xl border border-transparent bg-white/75 px-4 py-3 text-lg text-[#6e2918] placeholder:text-[#6e2918] focus:border-[#8b3a1f] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#39180f]">
                        {content.labels.email}
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder={content.placeholders.email}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-2xl border border-transparent bg-white/75 px-4 py-3 text-lg text-[#6e2918] placeholder:text-[#6e2918] focus:border-[#8b3a1f] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="dateOfBirth" className="mb-2 block text-sm font-semibold text-[#39180f]">
                        {content.labels.dateOfBirth}
                      </label>
                      <div className="relative">
                        <input
                          id="dateOfBirth"
                          type="text"
                          placeholder={content.placeholders.dateOfBirth}
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="w-full rounded-2xl border border-transparent bg-white/75 px-4 py-3 pr-12 text-lg text-[#6e2918] placeholder:text-[#6e2918] focus:border-[#8b3a1f] focus:outline-none"
                        />
                        <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9d5f4f]" />
                      </div>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#39180f]">
                        {content.nonIndian.birthdayNote}
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
                      {isLoading ? content.submitLabels.donating : content.submitLabels.donate}
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
                      {content.labels.termsLead}{' '}
                      <a href="#" className="font-bold text-[#7a1e13] hover:underline">
                        {content.labels.termsLabel}
                      </a>{' '}
                      &amp;{' '}
                      <a href="#" className="font-bold text-[#7a1e13] hover:underline">
                        {content.labels.privacyLabel}
                      </a>
                    </p>
                    <p>{content.nonIndian.legalCopy[1]}</p>
                    <p>
                      {content.nonIndian.registrationNumberLabel}{' '}
                      <span className="font-bold text-[#a12a1c]">{content.nonIndian.registrationNumber}</span>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-[#a04d42]">{content.labels.supportTitle}</h3>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-4 text-lg">
                      <span>{content.labels.supportDescription}</span>
                      <a
                        href={`tel:${content.support.phone}`}
                        className="inline-flex items-center gap-3 font-medium text-[#39180f] hover:text-[#7a1e13]"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-[#b4574a]">
                          <MessageCircle className="h-5 w-5" />
                        </span>
                        {content.support.phone}
                      </a>
                      <a
                        href={`mailto:${content.support.email}`}
                        className="inline-flex items-center gap-3 font-medium text-[#39180f] hover:text-[#7a1e13]"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-[#b4574a]">
                          <Mail className="h-5 w-5" />
                        </span>
                        {content.support.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-lg bg-[#fde9bf] p-6">
                  <div className="mb-6">
                    <label htmlFor="seva" className="mb-3 block text-sm font-semibold text-gray-800">
                      {content.selects.sevaLabel}
                    </label>
                    <select
                      id="seva"
                      value={formData.seva}
                      onChange={(e) => setFormData({ ...formData, seva: e.target.value })}
                      className={`w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 focus:border-[#8b3a1f] focus:outline-none ${
                        'text-[#6e2918]'
                      }`}
                    >
                      {content.sevaOptions.map((option, index) => (
                        <option key={`${option.value || option.label}-${index}`} value={option.value} className="text-[#6e2918]">
                          {index === 0 ? 'Choose a Seva' : option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="amount" className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                      {content.selects.amountLabel}
                      <Info className="h-4 w-4 text-gray-500" />
                    </label>
                    <input
                      id="amount"
                      type="number"
                      placeholder={content.placeholders.amount}
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-[#6e2918] placeholder:text-[#6e2918] focus:border-[#8b3a1f] focus:outline-none"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-gray-800">
                      {content.labels.fullName}
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder={content.placeholders.fullName}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-[#6e2918] placeholder:text-[#6e2918] focus:border-[#8b3a1f] focus:outline-none"
                    />
                  </div>

                  <div className="mb-5 grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-gray-800">
                        {content.labels.whatsapp}
                      </label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1 rounded-lg border-2 border-gray-300 bg-white px-3">
                          <span aria-hidden="true" className="text-lg">IN</span>
                          <span className="text-gray-700">{content.labels.currencyBadge}</span>
                        </div>
                        <input
                          id="whatsapp"
                          type="tel"
                          placeholder={content.placeholders.whatsappIndian}
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-[#6e2918] placeholder:text-[#6e2918] focus:border-[#8b3a1f] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="pincode" className="mb-2 block text-sm font-semibold text-gray-800">
                      {content.labels.pincode}
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      placeholder={content.placeholders.pincode}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-[#6e2918] placeholder:text-[#6e2918] focus:border-[#8b3a1f] focus:outline-none"
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
                      {content.labels.sankalp}
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full rounded-lg bg-[#8b3a1f] py-3 font-bold text-white transition-colors hover:bg-[#6b2a15] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? content.submitLabels.donating : content.submitLabels.donate}
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
                  <h3 className="mb-4 font-bold text-[#8b3a1f]">{content.labels.upiTitle}</h3>
                  <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-white p-4">
                    <div className="relative h-32 w-32 overflow-hidden rounded bg-gray-200">
                      <Image
                        src={content.bankDetails.qrImage}
                        alt="QR code"
                        fill
                        sizes="8rem"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-[#8b3a1f]">
                    {content.labels.bankTitle}
                    <Copy className="h-4 w-4" />
                  </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">
                          Account Name: <span className="font-bold text-[#8b3a1f]">{content.bankDetails.accountName}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(content.bankDetails.accountName, 'account')}
                          className="text-gray-500 hover:text-[#8b3a1f]"
                        >
                          {copied === 'account' ? 'Copied' : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">
                          Account Number: <span className="font-bold text-[#8b3a1f]">{content.bankDetails.accountNumber}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(content.bankDetails.accountNumber, 'account-num')}
                          className="text-gray-500 hover:text-[#8b3a1f]"
                        >
                          {copied === 'account-num' ? 'Copied' : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">
                          Bank Name: <span className="font-bold text-[#8b3a1f]">{content.bankDetails.bankName}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(content.bankDetails.bankName, 'bank')}
                          className="text-gray-500 hover:text-[#8b3a1f]"
                        >
                          {copied === 'bank' ? 'Copied' : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">
                          IFSC Code: <span className="font-bold text-[#8b3a1f]">{content.bankDetails.ifsc}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(content.bankDetails.ifsc, 'ifsc')}
                          className="text-gray-500 hover:text-[#8b3a1f]"
                        >
                          {copied === 'ifsc' ? 'Copied' : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">
                          Email: <span className="font-bold text-[#8b3a1f]">{content.bankDetails.email}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(content.bankDetails.email, 'email')}
                          className="text-gray-500 hover:text-[#8b3a1f]"
                        >
                          {copied === 'email' ? 'Copied' : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-xs italic text-gray-700">
                    {content.labels.screenshotNote}
                  </p>

                  <p className="text-center text-xs text-gray-800">
                    <span className="font-bold">{content.labels.termsLead}</span>{' '}
                    <a href="#" className="font-bold text-[#8b3a1f] hover:underline">
                      {content.labels.termsLabel}
                    </a>{' '}
                    &amp;{' '}
                    <a href="#" className="font-bold text-[#8b3a1f] hover:underline">
                      {content.labels.privacyLabel}
                    </a>
                  </p>

                  <div className="border-t border-gray-300 pt-4">
                    <h4 className="mb-3 font-bold text-[#8b3a1f]">{content.labels.supportTitle}</h4>
                    <p className="mb-3 text-xs text-gray-700">{content.labels.supportDescription}</p>
                    <div className="mb-2 flex items-center gap-2 text-sm">
                      <span aria-hidden="true">Phone</span>
                      <a href={`tel:${content.support.phone}`} className="font-semibold text-[#8b3a1f] hover:underline">
                        {content.support.phone}
                      </a>
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-sm">
                      <span aria-hidden="true">Email</span>
                      <a href={`mailto:${content.support.email}`} className="font-semibold text-[#8b3a1f] hover:underline">
                        {content.support.email}
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-orange-500 px-3 py-1 text-xs font-bold text-white">Assured</span>
                      <span className="text-xs">{content.labels.paymentMethods}</span>
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
