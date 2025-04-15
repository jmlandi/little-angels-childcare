import React, { useState } from "react";
import Link from "next/link";

const AdminSidebar: React.FC = () => {
  const [isCMSDropdownOpen, setCMSDropdownOpen] = useState(false);

  return (
    <aside className="bg-white text-baby-blue w-64 p-5">
      <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/contacts">
            <a className="hover:underline">Contacts</a>
          </Link>
        </li>
        <li>
          <button
            onClick={() => setCMSDropdownOpen(!isCMSDropdownOpen)}
            className="hover:underline"
          >
            CMS
          </button>
          {isCMSDropdownOpen && (
            <ul className="pl-4 mt-2 space-y-1">
              <li>
                <Link href="/admin/cms/philosophy">
                  <a className="hover:underline">Philosophy</a>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a
            href="https://analytics.google.com/analytics/web"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Google Analytics
          </a>
        </li>
        <li>
          <a
            href="https://console.cloudinary.com/pm/c-aec437e1a6fc6d693d3d009c5c2698/media-explorer/LittleAngels"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Cloudinary
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;