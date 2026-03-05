import { useContent } from "@/content/ContentContext";
import ImageUpload from "../components/ImageUpload";
import { Plus, Trash2, Save } from "lucide-react";
import type { SiteContent } from "@/content/defaultContent";

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
    return (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
    );
}

function TextArea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
    return (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
            className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" />
    );
}

export default function SaboresEditor() {
    const { content, updateSection } = useContent();
    const s = content.sabores;
    const update = (data: Partial<SiteContent["sabores"]>) => updateSection("sabores", data);

    return (
        <div className="space-y-6">
            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Cabeçalho da Página</h2>
                <TextInput value={s.pageLabel} onChange={(v) => update({ pageLabel: v })} placeholder="Label" />
                <TextInput value={s.pageTitle} onChange={(v) => update({ pageTitle: v })} placeholder="Título" />
                <TextArea value={s.pageDescription} onChange={(v) => update({ pageDescription: v })} rows={2} />
            </div>

            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Sabores</h2>
                {s.flavors.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-secondary/50 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="font-body text-xs font-semibold text-foreground/40">Sabor {i + 1}</span>
                            <button onClick={() => { const arr = [...s.flavors]; arr.splice(i, 1); update({ flavors: arr }); }}
                                className="p-1 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={14} className="text-red-400" />
                            </button>
                        </div>
                        <TextInput value={f.name} onChange={(v) => { const arr = [...s.flavors]; arr[i] = { ...arr[i], name: v }; update({ flavors: arr }); }} placeholder="Nome" />
                        <TextArea value={f.description} onChange={(v) => { const arr = [...s.flavors]; arr[i] = { ...arr[i], description: v }; update({ flavors: arr }); }} rows={2} />
                        <TextInput value={f.tag || ""} onChange={(v) => { const arr = [...s.flavors]; arr[i] = { ...arr[i], tag: v || null }; update({ flavors: arr }); }} placeholder="Tag (ex: Mais Pedido)" />
                        <ImageUpload value={f.image} onChange={(v) => { const arr = [...s.flavors]; arr[i] = { ...arr[i], image: v }; update({ flavors: arr }); }} label="Imagem" />
                    </div>
                ))}
                <button onClick={() => update({ flavors: [...s.flavors, { name: "", description: "", tag: null, image: "" }] })}
                    className="btn-outline text-sm py-2 px-4 inline-flex items-center gap-2">
                    <Plus size={14} /> Adicionar sabor
                </button>
            </div>

            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">CTA Personalizado</h2>
                <TextInput value={s.customCtaLabel} onChange={(v) => update({ customCtaLabel: v })} placeholder="Label" />
                <TextInput value={s.customCtaTitle} onChange={(v) => update({ customCtaTitle: v })} placeholder="Título" />
                <TextArea value={s.customCtaDescription} onChange={(v) => update({ customCtaDescription: v })} rows={2} />
                <TextInput value={s.customCtaButton} onChange={(v) => update({ customCtaButton: v })} placeholder="Texto do botão" />
            </div>

            <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
                <Save size={16} className="text-green-600" />
                <p className="font-body text-sm text-green-700">As alterações são salvas automaticamente.</p>
            </div>
        </div>
    );
}
