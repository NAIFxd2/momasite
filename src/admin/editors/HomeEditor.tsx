import { useContent } from "@/content/ContentContext";
import ImageUpload from "../components/ImageUpload";
import { Save, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { SiteContent } from "@/content/defaultContent";

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <h3 className="font-body text-xs font-semibold text-foreground/60 uppercase tracking-wider">{label}</h3>
            {children}
        </div>
    );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
    );
}

function TextArea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
        />
    );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <div className="card-premium overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
                <h2 className="font-editorial text-lg text-primary">{title}</h2>
                <span className="font-body text-xs text-foreground/40">{open ? "▲" : "▼"}</span>
            </button>
            {open && <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">{children}</div>}
        </div>
    );
}

export default function HomeEditor() {
    const { content, updateSection } = useContent();
    const home = content.home;

    const update = (data: Partial<SiteContent["home"]>) => updateSection("home", data);

    return (
        <div className="space-y-6">
            {/* Hero */}
            <SectionCard title="Hero (textos sobre a animação)">
                <FieldGroup label="Label">
                    <TextInput value={home.heroLabel} onChange={(v) => update({ heroLabel: v })} />
                </FieldGroup>
                <FieldGroup label="Título">
                    <TextInput value={home.heroTitle} onChange={(v) => update({ heroTitle: v })} />
                </FieldGroup>
                <FieldGroup label="Destaque (rosa)">
                    <TextInput value={home.heroHighlight} onChange={(v) => update({ heroHighlight: v })} />
                </FieldGroup>
                <FieldGroup label="Final do título">
                    <TextInput value={home.heroTitleEnd} onChange={(v) => update({ heroTitleEnd: v })} />
                </FieldGroup>
                <FieldGroup label="Descrição">
                    <TextArea value={home.heroDescription} onChange={(v) => update({ heroDescription: v })} />
                </FieldGroup>
                <FieldGroup label="Social proof">
                    <TextInput value={home.socialProofText} onChange={(v) => update({ socialProofText: v })} />
                </FieldGroup>
            </SectionCard>

            {/* Featured Flavors */}
            <SectionCard title="Sabores em Destaque">
                <FieldGroup label="Label da seção">
                    <TextInput value={home.flavorsLabel} onChange={(v) => update({ flavorsLabel: v })} />
                </FieldGroup>
                <FieldGroup label="Título da seção">
                    <TextInput value={home.flavorsTitle} onChange={(v) => update({ flavorsTitle: v })} />
                </FieldGroup>
                {home.featuredFlavors.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-secondary/50 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="font-body text-xs font-semibold text-foreground/40">Sabor {i + 1}</span>
                            <button
                                onClick={() => {
                                    const arr = [...home.featuredFlavors];
                                    arr.splice(i, 1);
                                    update({ featuredFlavors: arr });
                                }}
                                className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 size={14} className="text-red-400" />
                            </button>
                        </div>
                        <TextInput
                            value={f.name}
                            onChange={(v) => {
                                const arr = [...home.featuredFlavors];
                                arr[i] = { ...arr[i], name: v };
                                update({ featuredFlavors: arr });
                            }}
                            placeholder="Nome"
                        />
                        <TextArea
                            value={f.description}
                            onChange={(v) => {
                                const arr = [...home.featuredFlavors];
                                arr[i] = { ...arr[i], description: v };
                                update({ featuredFlavors: arr });
                            }}
                            rows={2}
                        />
                        <ImageUpload
                            value={f.image}
                            onChange={(v) => {
                                const arr = [...home.featuredFlavors];
                                arr[i] = { ...arr[i], image: v };
                                update({ featuredFlavors: arr });
                            }}
                            label="Imagem"
                        />
                    </div>
                ))}
                <button
                    onClick={() => update({ featuredFlavors: [...home.featuredFlavors, { name: "", description: "", image: "" }] })}
                    className="btn-outline text-sm py-2 px-4 inline-flex items-center gap-2"
                >
                    <Plus size={14} /> Adicionar sabor
                </button>
            </SectionCard>

            {/* Craftsmanship */}
            <SectionCard title="Nosso Processo">
                <FieldGroup label="Label">
                    <TextInput value={home.craftsmanshipLabel} onChange={(v) => update({ craftsmanshipLabel: v })} />
                </FieldGroup>
                <FieldGroup label="Título">
                    <TextInput value={home.craftsmanshipTitle} onChange={(v) => update({ craftsmanshipTitle: v })} />
                </FieldGroup>
                {home.craftsmanship.map((c, i) => (
                    <div key={i} className="p-4 rounded-xl bg-secondary/50 space-y-3">
                        <TextInput
                            value={c.title}
                            onChange={(v) => {
                                const arr = [...home.craftsmanship];
                                arr[i] = { ...arr[i], title: v };
                                update({ craftsmanship: arr });
                            }}
                            placeholder="Título"
                        />
                        <TextArea
                            value={c.desc}
                            onChange={(v) => {
                                const arr = [...home.craftsmanship];
                                arr[i] = { ...arr[i], desc: v };
                                update({ craftsmanship: arr });
                            }}
                            rows={2}
                        />
                    </div>
                ))}
            </SectionCard>

            {/* Testimonials */}
            <SectionCard title="Depoimentos">
                <FieldGroup label="Label">
                    <TextInput value={home.testimonialsLabel} onChange={(v) => update({ testimonialsLabel: v })} />
                </FieldGroup>
                <FieldGroup label="Título">
                    <TextInput value={home.testimonialsTitle} onChange={(v) => update({ testimonialsTitle: v })} />
                </FieldGroup>
                {home.testimonials.map((t, i) => (
                    <div key={i} className="p-4 rounded-xl bg-secondary/50 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="font-body text-xs font-semibold text-foreground/40">Depoimento {i + 1}</span>
                            <button
                                onClick={() => {
                                    const arr = [...home.testimonials];
                                    arr.splice(i, 1);
                                    update({ testimonials: arr });
                                }}
                                className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 size={14} className="text-red-400" />
                            </button>
                        </div>
                        <TextInput
                            value={t.name}
                            onChange={(v) => {
                                const arr = [...home.testimonials];
                                arr[i] = { ...arr[i], name: v };
                                update({ testimonials: arr });
                            }}
                            placeholder="Nome"
                        />
                        <TextArea
                            value={t.text}
                            onChange={(v) => {
                                const arr = [...home.testimonials];
                                arr[i] = { ...arr[i], text: v };
                                update({ testimonials: arr });
                            }}
                            rows={2}
                        />
                        <TextInput
                            value={t.location}
                            onChange={(v) => {
                                const arr = [...home.testimonials];
                                arr[i] = { ...arr[i], location: v };
                                update({ testimonials: arr });
                            }}
                            placeholder="Localização"
                        />
                    </div>
                ))}
                <button
                    onClick={() => update({ testimonials: [...home.testimonials, { name: "", text: "", rating: 5, location: "" }] })}
                    className="btn-outline text-sm py-2 px-4 inline-flex items-center gap-2"
                >
                    <Plus size={14} /> Adicionar depoimento
                </button>
            </SectionCard>

            {/* CTA */}
            <SectionCard title="CTA Final">
                <FieldGroup label="Label">
                    <TextInput value={home.ctaLabel} onChange={(v) => update({ ctaLabel: v })} />
                </FieldGroup>
                <FieldGroup label="Título">
                    <TextInput value={home.ctaTitle} onChange={(v) => update({ ctaTitle: v })} />
                </FieldGroup>
                <FieldGroup label="Destaque (rosa)">
                    <TextInput value={home.ctaHighlight} onChange={(v) => update({ ctaHighlight: v })} />
                </FieldGroup>
                <FieldGroup label="Final do título">
                    <TextInput value={home.ctaTitleEnd} onChange={(v) => update({ ctaTitleEnd: v })} />
                </FieldGroup>
                <FieldGroup label="Descrição">
                    <TextArea value={home.ctaDescription} onChange={(v) => update({ ctaDescription: v })} />
                </FieldGroup>
                <FieldGroup label="Texto do botão">
                    <TextInput value={home.ctaButtonText} onChange={(v) => update({ ctaButtonText: v })} />
                </FieldGroup>
            </SectionCard>

            <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
                <Save size={16} className="text-green-600" />
                <p className="font-body text-sm text-green-700">As alterações são salvas automaticamente.</p>
            </div>
        </div>
    );
}
