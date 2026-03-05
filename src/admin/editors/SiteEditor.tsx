import { useContent } from "@/content/ContentContext";
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

export default function SiteEditor() {
    const { content, updateSection } = useContent();
    const g = content.global;
    const update = (data: Partial<SiteContent["global"]>) => updateSection("global", data);

    return (
        <div className="space-y-6">
            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Marca</h2>
                <label className="font-body text-xs text-foreground/40 block">Nome da marca</label>
                <TextInput value={g.brandName} onChange={(v) => update({ brandName: v })} placeholder="Moma Cookie Lab" />
            </div>

            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Redes Sociais</h2>
                <label className="font-body text-xs text-foreground/40 block">Número do WhatsApp (com código do país)</label>
                <TextInput value={g.whatsappNumber} onChange={(v) => update({ whatsappNumber: v })} placeholder="5571999999999" />
                <label className="font-body text-xs text-foreground/40 block">@ do Instagram</label>
                <TextInput value={g.instagramHandle} onChange={(v) => update({ instagramHandle: v })} placeholder="@momacookielab" />
                <label className="font-body text-xs text-foreground/40 block">URL do Instagram</label>
                <TextInput value={g.instagramUrl} onChange={(v) => update({ instagramUrl: v })} placeholder="https://instagram.com/momacookielab" />
            </div>

            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Rodapé</h2>
                <label className="font-body text-xs text-foreground/40 block">Descrição do footer</label>
                <TextArea value={g.footerDescription} onChange={(v) => update({ footerDescription: v })} rows={3} />
            </div>

            <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
                <Save size={16} className="text-green-600" />
                <p className="font-body text-sm text-green-700">As alterações são salvas automaticamente.</p>
            </div>
        </div>
    );
}
