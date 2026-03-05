import { useContent } from "@/content/ContentContext";
import ImageUpload from "../components/ImageUpload";
import { Save } from "lucide-react";
import type { SiteContent } from "@/content/defaultContent";

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
    return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />;
}
function TextArea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
    return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
        className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" />;
}

export default function SobreEditor() {
    const { content, updateSection, removeField } = useContent();
    const s = content.sobre;
    const update = (data: Partial<SiteContent["sobre"]>) => updateSection("sobre", data);

    return (
        <div className="space-y-6">
            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Hero</h2>
                <TextInput value={s.heroLabel} onChange={(v) => update({ heroLabel: v })} placeholder="Label" />
                <TextInput value={s.heroTitle} onChange={(v) => update({ heroTitle: v })} placeholder="Título" />
                <TextInput value={s.heroHighlight} onChange={(v) => update({ heroHighlight: v })} placeholder="Destaque" />
                {s.heroParagraphs.map((p, i) => (
                    <div key={i}>
                        <label className="font-body text-xs text-foreground/40 mb-1 block">Parágrafo {i + 1}</label>
                        <TextArea value={p} onChange={(v) => {
                            const arr = [...s.heroParagraphs];
                            arr[i] = v;
                            update({ heroParagraphs: arr });
                        }} rows={3} />
                    </div>
                ))}
                <ImageUpload value={s.heroImage} onChange={(v) => {
                    if (v === "") { removeField("sobre.heroImage"); }
                    else { update({ heroImage: v }); }
                }} label="Imagem hero" />
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="font-body text-xs text-foreground/40 mb-1 block">Ano de fundação</label>
                        <TextInput value={s.foundedYear} onChange={(v) => update({ foundedYear: v })} />
                    </div>
                    <div>
                        <label className="font-body text-xs text-foreground/40 mb-1 block">Local</label>
                        <TextInput value={s.foundedLocation} onChange={(v) => update({ foundedLocation: v })} />
                    </div>
                </div>
            </div>

            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Valores</h2>
                <TextInput value={s.valuesLabel} onChange={(v) => update({ valuesLabel: v })} placeholder="Label" />
                <TextInput value={s.valuesTitle} onChange={(v) => update({ valuesTitle: v })} placeholder="Título" />
                {s.values.map((val, i) => (
                    <div key={i} className="p-4 rounded-xl bg-secondary/50 space-y-3">
                        <span className="font-body text-xs font-semibold text-foreground/40">Valor {i + 1}</span>
                        <TextInput value={val.title} onChange={(v) => { const arr = [...s.values]; arr[i] = { ...arr[i], title: v }; update({ values: arr }); }} placeholder="Título" />
                        <TextArea value={val.desc} onChange={(v) => { const arr = [...s.values]; arr[i] = { ...arr[i], desc: v }; update({ values: arr }); }} rows={2} />
                    </div>
                ))}
            </div>

            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Filosofia</h2>
                <TextInput value={s.philosophyLabel} onChange={(v) => update({ philosophyLabel: v })} placeholder="Label" />
                <TextArea value={s.philosophyQuote} onChange={(v) => update({ philosophyQuote: v })} rows={3} />
                <TextArea value={s.philosophyDescription} onChange={(v) => update({ philosophyDescription: v })} rows={2} />
                <ImageUpload value={s.philosophyImage} onChange={(v) => {
                    if (v === "") { removeField("sobre.philosophyImage"); }
                    else { update({ philosophyImage: v }); }
                }} label="Imagem" />
            </div>


            <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
                <Save size={16} className="text-green-600" />
                <p className="font-body text-sm text-green-700">As alterações são salvas automaticamente.</p>
            </div>
        </div>
    );
}
