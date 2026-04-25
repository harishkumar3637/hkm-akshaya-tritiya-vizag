"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const defaultError = "Use the provided admin email and password to continue.";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setErrorMessage(payload?.message ?? defaultError);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setErrorMessage("Unable to sign in right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-[500px] rounded-[26px] border border-[rgba(215,215,215,0.95)] bg-white px-5 py-7 shadow-[0_10px_26px_rgba(15,23,42,0.16)] sm:px-8 sm:py-9">
      <div className="mx-auto max-w-[420px]">
        <div className="text-center">
          <h1 className="text-[clamp(1.9rem,3.2vw,2.7rem)] font-extrabold tracking-[-0.04em] text-[#0f172a]">
            Access Campaign Dashboard
          </h1>
          <p className="mt-2 text-base text-[#667085] sm:text-lg">
            Access your campaigns and donation details
          </p>
        </div>

        <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
          <label className="grid gap-2.5">
            <span className="text-base font-semibold text-[#101828] sm:text-lg">Email</span>
            <span className="flex h-12 items-center gap-3 rounded-[12px] border border-[#d0d5dd] bg-white px-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] sm:h-14">
              <Mail className="h-5 w-5 text-[#7a7a7a]" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-[#101828] outline-none placeholder:text-[#7a7a7a]"
                autoComplete="email"
                required
              />
            </span>
          </label>

          <label className="grid gap-2.5">
            <span className="text-base font-semibold text-[#101828] sm:text-lg">Password</span>
            <span className="flex h-12 items-center gap-3 rounded-[12px] border border-[#d0d5dd] bg-white px-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] sm:h-14">
              <Lock className="h-5 w-5 text-[#7a7a7a]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-[#101828] outline-none placeholder:text-[#7a7a7a]"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#7a7a7a] transition hover:bg-[#f4f4f5] hover:text-[#344054]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </span>
          </label>

          {errorMessage ? <p className="text-sm font-medium text-[#b42318] sm:text-base">{errorMessage}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 h-12 rounded-[12px] bg-[#ffc107] text-base font-extrabold text-white shadow-[0_12px_24px_rgba(255,193,7,0.35)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 sm:h-14 sm:text-lg"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#667085] sm:text-base">
          Hare Krishna | Safe &amp; secure login
        </p>
      </div>
    </div>
  );
}
