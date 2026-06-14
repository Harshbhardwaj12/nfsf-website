"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase, Donation } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Auth guard
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.replace("/admin/login");
    }
  }, [router]);

  // Fetch donations
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setDonations(data as Donation[]);
      setLoading(false);
    }
    load();
  }, []);

  function logout() {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
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
      <header className="bg-forest-900 text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌿</span>
          <div>
            <p className="font-serif font-bold leading-tight">NFSF Admin</p>
            <p className="text-xs text-forest-300">Donation Dashboard</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="text-sm px-4 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
        >
          Logout
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard
            icon="🎗️"
            label="Total Donations"
            value={donations.length.toString()}
          />
          <SummaryCard
            icon="🌳"
            label="Trees Planted"
            value={totalTrees.toLocaleString("en-IN")}
          />
          <SummaryCard
            icon="💰"
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
                          href={`/verify/${d.id}`}
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

function SummaryCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 px-6 py-5 flex items-center gap-4">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</p>
        <p className="text-2xl font-bold text-forest-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
