import { useContent } from "@/content/ContentContext";
import { Plus, Trash2, Save } from "lucide-react";
import type { SiteContent } from "@/content/defaultContent";

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
    return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />;
}
function TextArea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
    return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
        className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" />;
}

export default function ContatoEditor() {
    const { content, updateSection } = useContent();
    const c = content.contato;
    const update = (data: Partial<SiteContent["contato"]>) => updateSection("contato", data);

    return (
        <div className="space-y-6">
            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Cabeçalho</h2>
                <TextInput value={c.pageLabel} onChange={(v) => update({ pageLabel: v })} placeholder="Label" />
                <TextInput value={c.pageTitle} onChange={(v) => update({ pageTitle: v })} placeholder="Título" />
                <TextArea value={c.pageDescription} onChange={(v) => update({ pageDescription: v })} rows={2} />
            </div>

            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Canais</h2>
                <label className="font-body text-xs text-foreground/40 block">WhatsApp — descrição</label>
                <TextArea value={c.whatsappDescription} onChange={(v) => update({ whatsappDescription: v })} rows={2} />
                <label className="font-body text-xs text-foreground/40 block">Instagram — descrição</label>
                <TextArea value={c.instagramDescription} onChange={(v) => update({ instagramDescription: v })} rows={2} />
            </div>

            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Informações</h2>
                <TextInput value={c.deliveryTitle} onChange={(v) => update({ deliveryTitle: v })} placeholder="Título entrega" />
                <TextArea value={c.deliveryDescription} onChange={(v) => update({ deliveryDescription: v })} rows={2} />
                <TextInput value={c.hoursTitle} onChange={(v) => update({ hoursTitle: v })} placeholder="Título horários" />
                {c.hours.map((h, i) => (
                    <div key={i} className="flex gap-2">
                        <TextInput value={h} onChange={(v) => { const arr = [...c.hours]; arr[i] = v; update({ hours: arr }); }} />
                    </div>
                ))}
            </div>

            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">FAQ</h2>
                {c.faqs.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-secondary/50 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="font-body text-xs font-semibold text-foreground/40">Pergunta {i + 1}</span>
                            <button onClick={() => { const arr = [...c.faqs]; arr.splice(i, 1); update({ faqs: arr }); }}
                                className="p-1 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} className="text-red-400" /></button>
                        </div>
                        <TextInput value={f.q} onChange={(v) => { const arr = [...c.faqs]; arr[i] = { ...arr[i], q: v }; update({ faqs: arr }); }} placeholder="Pergunta" />
                        <TextArea value={f.a} onChange={(v) => { const arr = [...c.faqs]; arr[i] = { ...arr[i], a: v }; update({ faqs: arr }); }} rows={2} />
                    </div>
                ))}
                <button onClick={() => update({ faqs: [...c.faqs, { q: "", a: "" }] })}
                    className="btn-outline text-sm py-2 px-4 inline-flex items-center gap-2"><Plus size={14} /> Adicionar FAQ</button>
            </div>

            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">CTA Final</h2>
                <TextInput value={c.ctaTitle} onChange={(v) => update({ ctaTitle: v })} placeholder="Título" />
                <TextArea value={c.ctaDescription} onChange={(v) => update({ ctaDescription: v })} rows={2} />
                <TextInput value={c.ctaButton} onChange={(v) => update({ ctaButton: v })} placeholder="Texto do botão" />
            </div>

            <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
                <Save size={16} className="text-green-600" />
                <p className="font-body text-sm text-green-700">As alterações são salvas automaticamente.</p>
            </div>
        </div>
    );
}
