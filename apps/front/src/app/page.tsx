"use client";

import { useMemo, useState } from "react";
import Field from "@/components/field";
import DiffView from "@/components/diff-view";
import { diffLines } from "@/lib/diff";
import { ImproveResponse } from "@/lib/validation";

const prompts = [
    "Улучши этот системный промпт.",
    "Сделай промпт так, чтобы он был более эффективным.",
    "Перепиши промпт так, чтобы модели ИИ была понятна моя задача.",
    "Сделай этот промпт более конкретным и по делу.",
];

export default function Page() {
    const [userRequest, setUserRequest] = useState(
        prompts[Math.floor(Math.random() * prompts.length)]
    );
    const [systemPrompt, setSystemPrompt] = useState("");
    const [proposal, setProposal] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const rows = useMemo(
        () => (proposal ? diffLines(systemPrompt, proposal) : []),
        [systemPrompt, proposal]
    );



    async function optimize() {
        if (!userRequest.trim()) return;
        setLoading(true);
        try {
            const r = await fetch("/api/improve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userRequest, systemPrompt }),
            });
            const json = await r.json();
            const parsed = ImproveResponse.safeParse(json);
            if (parsed.success) setProposal(parsed.data.improvedSystemPrompt);
        } finally {
            setLoading(false);
        }
    }

    function accept() { if (proposal) setSystemPrompt(proposal); setProposal(null); setUserRequest(""); }
    function rollback() { setProposal(null); }

    const canRun = userRequest.trim().length > 0 && systemPrompt.trim().length > 0 && !loading;

    return (
        <section className="mx-auto w-[80%]">
            <div className="flex flex-col justify-center gap-5">
                <div
                    className="flex justify-center mx-auto items-center w-[40%] border py-5 border-foreground/20 bg-background/70">
                    <h2 className="text-2xl font-bold opacity-80">Форма оптимизации</h2>
                </div>
                <div className="flex justify-between bg-background/70 shadow-sm">
                    <Field
                        id="user-request"
                        label="Запрос / изменения"
                        value={userRequest}
                        onChange={setUserRequest}
                        rows={4}
                        mono
                        placeholder="Опиши, что улучшить/добавить/ограничить…"
                    />

                    <Field
                        id="system-prompt"
                        label="Системный промпт"
                        value={systemPrompt}
                        onChange={setSystemPrompt}
                        rows={5}
                        mono
                        placeholder="Текущий системный промпт"
                    />
                </div>
                <div>
                    <div className="flex items-center flex-col justify-center gap-10 bg-background/70 shadow-sm overflow-hidden">
                        <div>
                            <button
                                onClick={optimize}
                                disabled={!canRun}
                                className="rounded-md bg-foreground px-3 py-4 text-background text-xl font-semibold transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? "Оптимизация…" : "Оптимизировать"}
                            </button>
                        </div>
                        {proposal && (
                            <div className="flex gap-4">
                                <button
                                    onClick={accept}
                                    className="rounded-md border border-foreground px-3 py-4 text-lg font-semibold hover:bg-gray-600 cursor-pointer"
                                >
                                    Принять
                                </button>
                                <button
                                    onClick={rollback}
                                    className="rounded-md border border-foreground/40 px-3 py-4 text-lg font-semibold hover:bg-gray-600 cursor-pointer"
                                >
                                    Отклонить
                                </button>
                            </div>
                        )}
                    </div>
                    {proposal && <DiffView rows={rows}/>}
                </div>
            </div>
        </section>
    );
}
