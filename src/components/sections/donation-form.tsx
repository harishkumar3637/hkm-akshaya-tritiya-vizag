'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Check, Copy, Mail, MessageCircle } from 'lucide-react';

import type { DonationFormContent } from '@/data/events/types';

type CopyField = 'account' | 'bank' | 'account-number' | 'ifsc' | 'upi';

type DonationFormProps = {
  content: DonationFormContent;
};

type InfoRowProps = {
  label: string;
  value: string;
  copyField: CopyField;
  copied: CopyField | '';
  onCopy: (value: string, field: CopyField) => void;
};

type CopyButtonProps = {
  value: string;
  field: CopyField;
  copied: CopyField | '';
  onCopy: (value: string, field: CopyField) => void;
  className?: string;
};

function CopyButton({ value, field, copied, onCopy, className = '' }: CopyButtonProps) {
  const isCopied = copied === field;

  return (
    <button
      type="button"
      onClick={() => onCopy(value, field)}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--borderSubtle)] bg-white text-[var(--buttonPrimary)] transition-colors hover:bg-[var(--buttonPrimary)] hover:text-[var(--textOnAccent)] focus:outline-none focus:ring-2 focus:ring-[var(--focusRing)] focus:ring-offset-2 ${className}`}
      aria-label={`Copy ${value}`}
    >
      {isCopied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}

function InfoRow({ label, value, copyField, copied, onCopy }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--borderSubtle)] py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[var(--textMuted)]">{label}</p>
        <p className="mt-1 break-words text-base font-bold text-[var(--textHeading)] sm:text-lg">{value}</p>
      </div>
      <CopyButton value={value} field={copyField} copied={copied} onCopy={onCopy} />
    </div>
  );
}

export function DonationForm({ content }: DonationFormProps) {
  const [copied, setCopied] = useState<CopyField | ''>('');

  const bankRows: InfoRowProps[] = [
    {
      label: 'Beneficiary Name',
      value: content.bank.fields.beneficiaryName,
      copyField: 'account',
      copied,
      onCopy: handleCopy,
    },
    {
      label: 'Bank Name',
      value: content.bank.fields.bankName,
      copyField: 'bank',
      copied,
      onCopy: handleCopy,
    },
    {
      label: 'Account Number',
      value: content.bank.fields.accountNumber,
      copyField: 'account-number',
      copied,
      onCopy: handleCopy,
    },
    {
      label: 'IFSC Code',
      value: content.bank.fields.ifscCode,
      copyField: 'ifsc',
      copied,
      onCopy: handleCopy,
    },
  ];

  function handleCopy(value: string, field: CopyField) {
    void navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  }

  return (
    <section
      id="donation-form"
      className="bg-[linear-gradient(180deg,var(--sectionBackground)_0%,var(--sectionAltBackground)_42%,var(--cardRaisedBackground)_100%)] px-4 py-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mx-auto max-w-7xl whitespace-nowrap text-center text-[clamp(1.45rem,3vw,2.25rem)] font-bold text-[var(--buttonPrimary)]">
          {content.heading}
        </h2>

        <div className="mx-auto mt-6 max-w-6xl rounded-2xl bg-[var(--textHeading)] px-5 py-4 text-center text-sm font-semibold leading-6 text-[var(--textOnAccent)] shadow-[0_10px_24px_color-mix(in_srgb,var(--shadowColor)_55%,transparent)] sm:text-base">
          <span className="font-bold">{content.notice.title}</span>{' '}
          {content.notice.text}{' '}
          <a href={`tel:${content.support.phone}`} className="underline underline-offset-4 hover:text-[var(--decorativeAccent)]">
            {content.support.phone}
          </a>{' '}
          or email{' '}
          <a href={`mailto:${content.support.email}`} className="underline underline-offset-4 hover:text-[var(--decorativeAccent)]">
            {content.support.email}
          </a>
          .
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-3xl bg-[var(--cardBackground)] p-5 shadow-[0_16px_40px_color-mix(in_srgb,var(--shadowColor)_38%,transparent)] sm:p-6">
            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--buttonSecondary)]">
                {content.bank.tag}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[var(--textHeading)] sm:text-3xl">
                {content.bank.title}
              </h3>
            </div>

            <div className="rounded-2xl bg-[var(--decorativeSoft)] px-5 py-2">
              {bankRows.map((row) => (
                <InfoRow
                  key={row.copyField}
                  label={row.label}
                  value={row.value}
                  copyField={row.copyField}
                  copied={copied}
                  onCopy={handleCopy}
                />
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-xl font-bold text-[var(--buttonPrimary)]">{content.upi.buttonLabel}</h4>
              <button
                type="button"
                onClick={() => handleCopy(content.upi.upiId, 'upi')}
                className="mt-4 flex w-full items-center justify-between gap-4 rounded-full bg-[var(--decorativeAccent)] px-5 py-4 text-left text-base font-bold text-[var(--textHeading)] shadow-[0_8px_18px_color-mix(in_srgb,var(--shadowColor)_32%,transparent)] transition-colors hover:bg-[var(--buttonSecondary)] hover:text-[var(--textOnAccent)] focus:outline-none focus:ring-2 focus:ring-[var(--focusRing)] focus:ring-offset-2 sm:text-lg"
                aria-label={`Copy UPI ID ${content.upi.upiId}`}
              >
                <span className="min-w-0 truncate">{content.upi.upiId}</span>
                {copied === 'upi' ? <Check className="h-5 w-5 shrink-0" aria-hidden="true" /> : <Copy className="h-5 w-5 shrink-0" aria-hidden="true" />}
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--borderSubtle)] bg-white px-5 py-4">
              <p className="text-sm font-semibold leading-6 text-[var(--textMuted)]">
                {content.screenshotNote}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-[var(--textHeading)]">
                <a href={`tel:${content.support.phone}`} className="inline-flex items-center gap-2 hover:text-[var(--buttonPrimary)]">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {content.support.phone}
                </a>
                <a href={`mailto:${content.support.email}`} className="inline-flex items-center gap-2 hover:text-[var(--buttonPrimary)]">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {content.support.email}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--cardBackground)] p-5 shadow-[0_16px_40px_color-mix(in_srgb,var(--shadowColor)_38%,transparent)] sm:p-6">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--buttonSecondary)]">
                {content.upi.tag}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[var(--textHeading)] sm:text-3xl">
                {content.upi.qrTitle}
              </h3>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-[280px] rounded-3xl bg-[var(--decorativeSoft)] p-5">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white p-4">
                  <Image
                    src={content.upi.qrImage}
                    alt="QR code for donation payment"
                    fill
                    sizes="(max-width: 640px) 70vw, 280px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <p className="mx-auto mt-5 max-w-sm text-center text-sm font-semibold leading-6 text-[var(--textMuted)]">
              {content.upi.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
