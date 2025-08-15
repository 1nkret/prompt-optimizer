"use client";

type Props = {
    id?: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    rows?: number;
    mono?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
};

export default function Field({
                                  id, label, value, onChange, rows = 4, mono, placeholder, autoFocus,
                              }: Props) {
    return (
        <div className="space-y-1.5 w-[800px] y-[600px]">
            <div className="flex items-center">
                <label htmlFor={id} className="text-xl font-semibold">{label}</label>
            </div>
            <textarea
                id={id}
                className={`block w-full y-full min-w-0 box-border
              rounded-md border border-foreground/20 bg-transparent p-2 text-md ${mono ? "font-mono" : ""}  min-h-[300px] max-h-[550px]`}
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoFocus={autoFocus}
            />
        </div>
    );
}
