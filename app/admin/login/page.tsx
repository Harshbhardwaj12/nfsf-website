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
    <div className="min-h-screen bg-forest-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / title */}
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="Nature & Farmers Sustainability Foundation"
            width={160}
            height={48}
            className="mx-auto"
          />
          <h1 className="mt-3 text-2xl font-serif font-bold text-white">NFSF Admin</h1>
          <p className="mt-1 text-sm text-forest-300">Nature & Farmer Sustainability Foundation</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg backdrop-blur"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-forest-200 mb-1.5">
                Username
              </label>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-200 mb-1.5">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-forest-600 hover:bg-forest-500 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
