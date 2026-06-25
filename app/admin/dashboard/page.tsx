"use client";

import { useEffect, useState, useMemo, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Donation } from "@/lib/supabase";

const ICONS: Record<string, ReactNode> = {
  donations: (
    <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  ),
  trees: (
    <path d="M12 22V9m0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0c0-3-2-5-5-5 0 3 2 5 5 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  amount: (
    <path d="M7 5h9M7 9h9M7 9c5 0 5 7 0 7l5 4M9 5c4 0 4 4 0 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch donations (server enforces admin auth; 401 → redirect to login)
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/donations");
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const d = await res.json().catch(() => ({}));
        if (res.ok && d.donations) setDonations(d.donations as Donation[]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.replace("/admin/login");
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return donations;
    return donations.filter(
      (d) =>
        d.donor_name.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q)
    );
  }, [donations, search]);

  const totalTrees = donations.reduce((s, d) => s + d.trees, 0);
  const totalAmount = donations.reduce((s, d) => s + d.amount, 0);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-100 shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Nature & Farmers Sustainability Foundation"
            width={150}
            height={45}
            priority
            className="h-9 w-auto"
          />
          <span className="hidden sm:inline text-sm text-gray-400 border-l border-gray-200 pl-3">
            Admin Dashboard
          </span>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 text-sm font-medium min-h-[44px] px-4 rounded-lg border border-gray-200 text-gray-600 hover:border-forest-300 hover:text-forest-700 transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
            <path d="M6 14H3V2h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Logout
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard
            icon={ICONS.donations}
            label="Total Donations"
            value={donations.length.toString()}
          />
          <SummaryCard
            icon={ICONS.trees}
            label="Trees Planted"
            value={totalTrees.toLocaleString("en-IN")}
          />
          <SummaryCard
            icon={ICONS.amount}
            label="Amount Raised"
            value={`₹${totalAmount.toLocaleString("en-IN")}`}
          />
        </div>

        {/* Table section */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <h2 className="font-semibold text-gray-800 text-lg">All Donations</h2>
            <input
              type="search"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-400 text-sm">Loading donations…</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">No donations found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    <th className="px-4 py-3 text-left font-medium">Donor Name</th>
                    <th className="px-4 py-3 text-left font-medium">Email</th>
                    <th className="px-4 py-3 text-right font-medium">Trees</th>
                    <th className="px-4 py-3 text-right font-medium">Amount</th>
                    <th className="px-4 py-3 text-left font-medium">Certificate ID</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-center font-medium">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                        {d.donor_name}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.email}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{d.trees}</td>
                      <td className="px-4 py-3 text-right text-gray-700 whitespace-nowrap">
                        ₹{d.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs whitespace-nowrap">
                        {d.certificate_id}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {formatDate(d.created_at)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <a
                          href={`/verify/${d.certificate_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-xs px-3 py-1 rounded-full bg-forest-50 text-forest-700 hover:bg-forest-100 border border-forest-200 transition-colors font-medium"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
              Showing {filtered.length} of {donations.length} donation{donations.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 px-6 py-5 flex items-center gap-4">
      <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
          {icon}
        </svg>
      </span>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</p>
        <p className="text-2xl font-bold text-forest-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
