"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8">
      <div className="text-xs text-slate-400">
        Page <span className="font-semibold text-slate-200">{currentPage}</span> of{" "}
        <span className="font-semibold text-slate-200">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        {currentPage > 1 ? (
          <Link
            href={createPageURL(currentPage - 1)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-colors"
          >
            &larr; Previous
          </Link>
        ) : (
          <span className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-800 bg-slate-950 text-slate-600 cursor-not-allowed">
            &larr; Previous
          </span>
        )}

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            return (
              <Link
                key={page}
                href={createPageURL(page)}
                className={`w-7 h-7 flex items-center justify-center text-xs font-semibold rounded-lg transition-colors ${
                  isActive
                    ? "bg-cyan-500 text-slate-950"
                    : "border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </Link>
            );
          })}
        </div>

        {currentPage < totalPages ? (
          <Link
            href={createPageURL(currentPage + 1)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-colors"
          >
            Next &rarr;
          </Link>
        ) : (
          <span className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-800 bg-slate-950 text-slate-600 cursor-not-allowed">
            Next &rarr;
          </span>
        )}
      </div>
    </div>
  );
}
