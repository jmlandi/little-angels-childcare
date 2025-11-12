import React, { useEffect, useMemo, useState, ChangeEvent } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { readCookie, verifyToken } from "@infrastructure/auth";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface ContactsPageProps {
  initialContacts: Contact[];
}

const ContactsPage: React.FC<ContactsPageProps> = ({ initialContacts }) => {
  const router = useRouter();

  // Data
  const [contacts, setContacts] = useState<Contact[]>(() => initialContacts ?? []);

  // Filters & pagination
  const [search, setSearch] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>(""); // yyyy-mm-dd
  const [toDate, setToDate] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  // Refetch (optional) from API
  const handleRefresh = async () => {
    try {
      const res = await fetch("/api/contacts");
      const data = await res.json();
      setContacts(data.contacts ?? []);
      setPage(1);
    } catch (error) {
      console.error("Error refreshing contacts:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
    }
  };

  // Derived: filtered + sorted (latest first)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const from = fromDate ? new Date(`${fromDate}T00:00:00`) : null;
    const to = toDate ? new Date(`${toDate}T23:59:59.999`) : null;

    return contacts
      .filter((c) => {
        const matchesQuery =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.message.toLowerCase().includes(q);

        const created = new Date(c.createdAt);
        const withinFrom = !from || created >= from;
        const withinTo = !to || created <= to;

        return matchesQuery && withinFrom && withinTo;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [contacts, search, fromDate, toDate]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pageItems = filtered.slice(startIdx, endIdx);

  // Reset to page 1 on filter changes that narrow results
  useEffect(() => {
    setPage(1);
  }, [search, fromDate, toDate, pageSize]);

  const onPageSizeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setPageSize(Number(e.target.value));

  return (
    <div className="w-screen h-screen overflow-auto bg-baby-blue text-white">
      <div className="container mx-auto p-4 flex flex-col items-center gap-4">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="bg-white text-baby-blue p-2 rounded"
            >
              Logout
            </button>
            <button
              onClick={() => router.push('/admin/images')}
              className="bg-white text-baby-blue p-2 rounded"
            >
              Images
            </button>
            <button
              onClick={() => router.push('/admin/content')}
              className="bg-white text-baby-blue p-2 rounded"
            >
              Content
            </button>
            <button
              onClick={() => router.push('/admin/reviews')}
              className="bg-white text-baby-blue p-2 rounded"
            >
              Reviews
            </button>
            <button
              onClick={handleRefresh}
              className="bg-white text-baby-blue p-2 rounded"
            >
              Refresh
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or message…"
              className="rounded p-2 text-baby-blue w-fit"
            />
            <label className="text-sm">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded p-2 text-baby-blue"
            />
            <label className="text-sm">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded p-2 text-baby-blue"
            />
            <label className="text-sm">Per page</label>
            <select
              value={pageSize}
              onChange={onPageSizeChange}
              className="rounded p-2 text-baby-blue"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center">Contacts</h1>

        <div className="w-full">
          <div className="mb-2 text-sm opacity-90">
            Showing{" "}
            <span className="font-semibold">
              {total === 0 ? 0 : startIdx + 1}–{Math.min(endIdx, total)}
            </span>{" "}
            of <span className="font-semibold">{total}</span>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white text-baby-blue">
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Message</th>
                  <th className="border p-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td
                      className="border p-4 text-center"
                      colSpan={4}
                    >
                      No contacts found.
                    </td>
                  </tr>
                ) : (
                  pageItems.map((contact) => (
                    <tr key={contact.id} className="align-top">
                      <td className="border p-2">{contact.name}</td>
                      <td className="border p-2">{contact.email}</td>
                      <td className="border p-2 max-w-[520px] whitespace-pre-wrap break-words">
                        {contact.message}
                      </td>
                      <td className="border p-2">
                        {new Date(contact.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-3 flex items-center gap-2">
            <button
              className="bg-white text-baby-blue px-3 py-2 rounded disabled:opacity-50"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="text-sm">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              className="bg-white text-baby-blue px-3 py-2 rounded disabled:opacity-50"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Build a safe base URL for SSR fetch (works locally and in prod)
export const getServerSideProps: GetServerSideProps<ContactsPageProps> = async ({ req }) => {
  try {
    const protoHeader = req.headers["x-forwarded-proto"];
    const protocol = Array.isArray(protoHeader) ? protoHeader[0] : protoHeader || "http";
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/contacts`);
    const data = await res.json();

    return { props: { initialContacts: data.contacts ?? [] } };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return { props: { initialContacts: [] } };
  }
};

export default ContactsPage;