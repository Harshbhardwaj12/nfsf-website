"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.replace("/admin/dashboard");
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Invalid username or password.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-forest-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / title */}
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="Nature & Farmers Sustainability Foundation"
            width={170}
            height={50}
            className="mx-auto h-11 w-auto"
          />
          <h1 className="mt-4 text-2xl font-bold text-forest-800">Admin Sign In</h1>
          <p className="mt-1 text-sm text-gray-500">Nature &amp; Farmers Sustainability Foundation</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">
                Username
              </label>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-forest-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm min-h-[44px]"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-forest-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm min-h-[44px]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-sm py-3 min-h-[44px] disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
