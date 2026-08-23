import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — The Ocean Perfumes",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 pb-24 pt-32">
      <div className="glass-deep w-full max-w-md rounded-[28px] p-8 shadow-deep sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-bold tracking-[0.3em] text-gold-300 uppercase">
            The Ocean Perfumes
          </p>
          <h1 className="mt-3 font-serif text-3xl text-pearl">Admin Panel</h1>
          <p className="mt-2 text-sm text-mist">
            Sign in to manage orders and products.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
