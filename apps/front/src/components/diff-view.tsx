"use client";
import { DiffRow } from "@/lib/diff";

type Props = { rows: DiffRow[] };

/**
 * Render simple line diff
 * Args:
 *   rows: diff rows from diffLines
 * Returns:
 *   JSX element
 */
export default function DiffView({ rows }: { rows: DiffRow[] }) {
    if (!rows.length) return null;
    return (
        <div className="mt-6 rounded-md border border-foreground/20">
            <div className="border-b border-foreground/10 px-4 py-2 text-lg font-semibold mx-auto">
                Diff (current → proposal)
            </div>
            <pre className="max-h-[420px] overflow-auto p-4 text-sm leading-6 font-mono whitespace-pre-wrap break-words">
        {rows.map((r, i) => (
            <div
                key={i}
                className={
                    r.type === "same"
                        ? ""
                        : r.type === "add"
                            ? "bg-green-500/10"
                            : "bg-red-500/10 line-through"
                }
            >
                {r.type === "add" ? "+ " : r.type === "del" ? "- " : "  "}
                {r.text}
            </div>
        ))}
      </pre>
        </div>
    );
}
