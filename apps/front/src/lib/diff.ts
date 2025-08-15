export type DiffRow = { type: "same" | "add" | "del"; text: string };

/**
 * Compute line-based diff.
 * Args:
 *   a: original text
 *   b: proposed text
 * Returns:
 *   Array of rows with change type and text
 */
export function diffLines(a: string, b: string): DiffRow[] {
    const A = a.split("\n");
    const B = b.split("\n");
    const max = Math.max(A.length, B.length);
    const rows: DiffRow[] = [];
    for (let i = 0; i < max; i++) {
        const al = A[i] ?? "";
        const bl = B[i] ?? "";
        if (al === bl) rows.push({ type: "same", text: bl });
        else {
            if (al) rows.push({ type: "del", text: al });
            if (bl) rows.push({ type: "add", text: bl });
        }
    }
    return rows;
}
