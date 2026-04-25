import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/app/admin/admin-login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (isAuthenticated) {
    redirect("/admin");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f8f6] px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-[rgba(255,193,7,0.14)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[rgba(15,23,42,0.08)] blur-3xl" />
      </div>
      <AdminLoginForm />
    </main>
  );
}
