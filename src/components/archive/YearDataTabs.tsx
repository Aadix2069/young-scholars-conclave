"use client";

import { useState } from "react";
import type { SheetTable } from "@/lib/archiveSheets";

type TabKey = "registrations" | "abstracts" | "papers";

const TABS: { key: TabKey; label: string }[] = [
  { key: "registrations", label: "Registrations" },
  { key: "abstracts", label: "Abstracts" },
  { key: "papers", label: "Papers" },
];

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsv({ headers, rows }: SheetTable): string {
  const lines = [headers, ...rows].map((row) => row.map(csvEscape).join(","));
  return lines.join("\r\n");
}

function downloadCsv(table: SheetTable, filename: string) {
  const blob = new Blob([toCsv(table)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function DataTable({ table }: { table: SheetTable }) {
  if (table.headers.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
        No submissions yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {table.headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.rows.map((row, rowIndex) => (
            // Sheet row order is stable and rows have no unique ID column,
            // so the row's position is the only available key.
            // eslint-disable-next-line react/no-array-index-key
            <tr key={rowIndex}>
              {table.headers.map((header, cellIndex) => {
                const value = row[cellIndex] ?? "";
                return (
                  <td key={header} className="px-4 py-3 text-gray-700">
                    {value.startsWith("http") ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-blue underline hover:text-brand-green-dark"
                      >
                        View
                      </a>
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function YearDataTabs({
  year,
  registrations,
  abstracts,
  papers,
}: {
  year: number;
  registrations: SheetTable;
  abstracts: SheetTable;
  papers: SheetTable;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("registrations");
  const tables: Record<TabKey, SheetTable> = { registrations, abstracts, papers };
  const activeTable = tables[activeTab];

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
        <div className="flex gap-1">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              aria-current={activeTab === key ? "page" : undefined}
              className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors duration-200 ease-[var(--ease-smooth)] ${
                activeTab === key
                  ? "border-brand-blue text-brand-blue"
                  : "border-transparent text-gray-500 hover:text-brand-blue"
              }`}
            >
              {label} ({tables[key].rows.length})
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => downloadCsv(activeTable, `${year}-${activeTab}.csv`)}
          disabled={activeTable.headers.length === 0}
          className="mb-2 inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 ease-[var(--ease-smooth)] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Download CSV
        </button>
      </div>

      <div className="mt-6">
        <DataTable table={activeTable} />
      </div>
    </div>
  );
}
