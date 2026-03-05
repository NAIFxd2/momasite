import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (base64: string) => void;
    label?: string;
}

const MAX_SIZE = 800; // max width or height in pixels
const QUALITY = 0.7; // JPEG compression quality

/** Resize and compress image to keep base64 small enough for localStorage */
function compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(url);
            let { width, height } = img;
            // Scale down if needed
            if (width > MAX_SIZE || height > MAX_SIZE) {
                if (width > height) {
                    height = Math.round((height * MAX_SIZE) / width);
                    width = MAX_SIZE;
                } else {
                    width = Math.round((width * MAX_SIZE) / height);
                    height = MAX_SIZE;
                }
            }
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) { reject(new Error("Canvas not supported")); return; }
            ctx.drawImage(img, 0, 0, width, height);
            const base64 = canvas.toDataURL("image/jpeg", QUALITY);
            resolve(base64);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Failed to load image"));
        };
        img.src = url;
    });
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith("image/")) return;
        setLoading(true);
        try {
            const base64 = await compressImage(file);
            onChange(base64);
        } catch (err) {
            console.error("Image compression failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="font-body text-xs font-semibold text-foreground/60 uppercase tracking-wider block">
                    {label}
                </label>
            )}
            <div
                className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-colors cursor-pointer ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
            >
                {loading ? (
                    <div className="py-8 flex flex-col items-center gap-2 text-foreground/40">
                        <Loader2 size={24} className="animate-spin" style={{ color: "hsl(var(--primary))" }} />
                        <p className="font-body text-xs">Processando imagem...</p>
                    </div>
                ) : value ? (
                    <div className="relative group">
                        <img src={value} alt="Preview" className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <span className="font-body text-xs text-white font-medium">Trocar imagem</span>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); onChange(""); }}
                                className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                            >
                                <X size={14} className="text-white" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 flex flex-col items-center gap-2 text-foreground/30">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--rose-light))" }}>
                            {dragOver ? <Upload size={18} style={{ color: "hsl(var(--primary))" }} /> : <ImageIcon size={18} style={{ color: "hsl(var(--primary))" }} />}
                        </div>
                        <p className="font-body text-xs">Clique ou arraste uma imagem</p>
                    </div>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                        e.target.value = "";
                    }}
                />
            </div>
        </div>
    );
}

