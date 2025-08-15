import { NextRequest, NextResponse } from "next/server";

const API_BASE =
    process.env.API_BASE ||
    process.env.NEXT_PUBLIC_API_BASE ||
    (process.env.DOCKER ? "http://api:8000" : "http://localhost:8000");

export async function POST(req: NextRequest) {
    const r = await fetch(`${API_BASE}/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: await req.text(),
    });
    const json = await r.json();
    return NextResponse.json(json, { status: r.status });
}
