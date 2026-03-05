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
function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="font-body text-xs text-foreground/40 mb-1 block">{label}</label>
            {children}
        </div>
    );
}

export default function LojaEditor() {
    const { content, updateSection } = useContent();
    const s = content.loja;
    const update = (data: Partial<SiteContent["loja"]>) => updateSection("loja", data);

    return (
        <div className="space-y-6">
            {/* Hero */}
            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Hero</h2>
                <TextInput value={s.heroLabel} onChange={(v) => update({ heroLabel: v })} placeholder="Label" />
                <TextInput value={s.heroTitle} onChange={(v) => update({ heroTitle: v })} placeholder="Título" />
                <TextInput value={s.heroHighlight} onChange={(v) => update({ heroHighlight: v })} placeholder="Destaque (rosa)" />
                <TextArea value={s.heroDescription} onChange={(v) => update({ heroDescription: v })} rows={3} />
            </div>

            {/* Video */}
            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Vídeo</h2>
                <FieldGroup label="URL do vídeo (MP4 ou link direto)">
                    <TextInput value={s.videoUrl} onChange={(v) => update({ videoUrl: v })} placeholder="https://..." />
                </FieldGroup>
                <p className="font-body text-xs text-foreground/30">
                    Cole a URL direta de um arquivo .mp4 — o vídeo será reproduzido automaticamente sem som.
                </p>
                <TextInput value={s.videoLabel} onChange={(v) => update({ videoLabel: v })} placeholder="Label" />
                <TextInput value={s.videoTitle} onChange={(v) => update({ videoTitle: v })} placeholder="Título sobre o vídeo" />
                <TextArea value={s.videoDescription} onChange={(v) => update({ videoDescription: v })} rows={3} />
            </div>

            {/* Features */}
            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Destaques</h2>
                {s.features.map((feat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-secondary/50 space-y-3">
                        <span className="font-body text-xs font-semibold text-foreground/40">
                            Destaque {i + 1}
                        </span>
                        <TextInput
                            value={feat.title}
                            onChange={(v) => {
                                const arr = [...s.features];
                                arr[i] = { ...arr[i], title: v };
                                update({ features: arr });
                            }}
                            placeholder="Título"
                        />
                        <TextArea
                            value={feat.description}
                            onChange={(v) => {
                                const arr = [...s.features];
                                arr[i] = { ...arr[i], description: v };
                                update({ features: arr });
                            }}
                            rows={2}
                        />
                        <FieldGroup label="Ícone (cookie, coffee, sparkles)">
                            <TextInput
                                value={feat.icon}
                                onChange={(v) => {
                                    const arr = [...s.features];
                                    arr[i] = { ...arr[i], icon: v };
                                    update({ features: arr });
                                }}
                            />
                        </FieldGroup>
                    </div>
                ))}
            </div>

            {/* Map & Location */}
            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Mapa e Localização</h2>
                <TextInput value={s.mapLabel} onChange={(v) => update({ mapLabel: v })} placeholder="Label" />
                <TextInput value={s.mapTitle} onChange={(v) => update({ mapTitle: v })} placeholder="Título" />
                <TextArea value={s.mapDescription} onChange={(v) => update({ mapDescription: v })} rows={2} />
                <FieldGroup label="URL embed do Google Maps">
                    <TextInput value={s.mapEmbedUrl} onChange={(v) => update({ mapEmbedUrl: v })} placeholder="https://www.google.com/maps/embed?pb=..." />
                </FieldGroup>
                <p className="font-body text-xs text-foreground/30">
                    Para obter a URL: abra Google Maps → pesquise o endereço → clique em "Compartilhar" → "Incorporar mapa" → copie a URL do src.
                </p>
                <FieldGroup label="Endereço">
                    <TextInput value={s.address} onChange={(v) => update({ address: v })} />
                </FieldGroup>
                <FieldGroup label="Detalhes (cidade, CEP)">
                    <TextInput value={s.addressDetails} onChange={(v) => update({ addressDetails: v })} />
                </FieldGroup>
            </div>

            {/* Hours */}
            <div className="card-premium p-6 space-y-4">
                <h2 className="font-editorial text-lg text-primary">Horários da Loja</h2>
                {s.storeHours.map((h, i) => (
                    <div key={i}>
                        <label className="font-body text-xs text-foreground/40 mb-1 block">Linha {i + 1}</label>
                        <TextInput
                            value={h}
                            onChange={(v) => {
                                const arr = [...s.storeHours];
                                arr[i] = v;
                                update({ storeHours: arr });
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
                <Save size={16} className="text-green-600" />
                <p className="font-body text-sm text-green-700">As alterações são salvas automaticamente.</p>
            </div>
        </div>
    );
}
