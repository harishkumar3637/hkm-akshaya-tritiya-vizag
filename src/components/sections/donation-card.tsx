"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Heart, IndianRupee } from "lucide-react";

import { donationAmounts } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const donationSchema = z.object({
  amount: z.coerce.number().min(108, "Minimum donation is ₹108"),
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Phone number contains invalid characters"),
  email: z.string().email("Please enter a valid email address"),
});

type DonationValues = z.infer<typeof donationSchema>;
type DonationFormInput = z.input<typeof donationSchema>;

export function DonationCard({ className }: { className?: string }) {
  const [selectedAmount, setSelectedAmount] = useState<number>(2100);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DonationFormInput, undefined, DonationValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 2100,
      name: "",
      phone: "",
      email: "",
    },
  });

  const currentAmount = useWatch({ control, name: "amount" });
  const amountOptions = [...donationAmounts, 10000];

  const onSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setValue("amount", amount, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (values: DonationValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setSelectedAmount(values.amount);
    reset({
      amount: values.amount,
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <Card
      id="donation-form"
      className={cn(
        "overflow-hidden border-[#f3dfbf] bg-[linear-gradient(180deg,rgba(255,252,245,0.98)_0%,rgba(255,245,226,0.98)_100%)]",
        className,
      )}
    >
      <div className="bg-[linear-gradient(120deg,rgba(137,31,15,0.98)_0%,rgba(190,83,22,0.95)_55%,rgba(240,175,60,0.95)_100%)] p-6 text-white">
        <div className="mb-3 flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-white/80">
          <Heart className="h-4 w-4 fill-current" />
          Sacred Offering
        </div>
        <h3 className="font-serif text-3xl leading-tight">Offer your Seva and receive divine blessings</h3>
        <p className="mt-3 text-sm text-white/85">
          Secure your Akshaya Tritiya sankalpa with a guided donation form and instant mock confirmation.
        </p>
      </div>

      <CardContent className="space-y-5 p-6">
        <div className="rounded-[24px] border border-[#f2e1c8] bg-white/80 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a1672e]">Choose amount</p>
            <span className="rounded-full bg-[#fff0cf] px-3 py-1 text-xs font-semibold text-[#9a4c1b]">
              Min ₹108
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {amountOptions.map((amount) => {
              const isSelected = selectedAmount === amount && Number(currentAmount) === amount;

              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => onSelectAmount(amount)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left transition-all duration-300",
                    isSelected
                      ? "border-[#cf781f] bg-[linear-gradient(135deg,#fff4dc_0%,#ffe1a8_100%)] text-[#7b2d17] shadow-[0_16px_36px_rgba(184,104,29,0.18)]"
                      : "border-[#f1dcc0] bg-white/90 text-[#7f4528] hover:-translate-y-0.5 hover:border-[#ddb16b] hover:bg-[#fff7e9]",
                  )}
                >
                  <div className="flex items-center gap-1 text-xs uppercase tracking-[0.24em] text-[#b16d35]">
                    <IndianRupee className="h-3 w-3" />
                    Donation
                  </div>
                  <div className="mt-1 text-lg font-bold">₹{amount.toLocaleString("en-IN")}</div>
                </button>
              );
            })}
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#7d3519]">Custom amount</label>
            <Input
              type="number"
              min={108}
              placeholder="Enter custom amount"
              {...register("amount")}
              onChange={(event) => {
                const amount = Number(event.target.value);
                setSelectedAmount(amount);
                setValue("amount", amount, { shouldValidate: true, shouldDirty: true });
              }}
            />
            {errors.amount ? <p className="mt-2 text-sm text-[#b42318]">{errors.amount.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#7d3519]">Full name</label>
            <Input placeholder="Your full name" {...register("name")} />
            {errors.name ? <p className="mt-2 text-sm text-[#b42318]">{errors.name.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#7d3519]">Phone number</label>
            <Input placeholder="+91 98765 43210" {...register("phone")} />
            {errors.phone ? <p className="mt-2 text-sm text-[#b42318]">{errors.phone.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#7d3519]">Email address</label>
            <Input type="email" placeholder="name@example.com" {...register("email")} />
            {errors.email ? <p className="mt-2 text-sm text-[#b42318]">{errors.email.message}</p> : null}
          </div>

          <Button type="submit" size="lg" className="w-full rounded-2xl" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Donate Now"}
          </Button>
        </form>

        <div className="rounded-[24px] border border-[#f2dfbf] bg-[#fffaf1] p-4 text-sm text-[#7f4426]">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#ca7b1f]" />
            <div>
              <p className="font-semibold text-[#7b2d17]">Blessing assurance</p>
              <p className="mt-1">Your seva supports temple worship, annadan, and sacred festival offerings.</p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-[22px] border border-[#d4e8b6] bg-[#f5fde8] p-4 text-sm text-[#476129]">
            Mock donation submitted for <span className="font-semibold">₹{selectedAmount.toLocaleString("en-IN")}</span>.
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
