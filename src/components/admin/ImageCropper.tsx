import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { RotateCw, ZoomIn, ZoomOut, Check, X } from 'lucide-react';

interface ImageCropperProps {
  imageSrc: string;
  aspect?: number;
  onCrop: (dataUrl: string) => void;
  onCancel: () => void;
}

export function ImageCropper({ imageSrc, aspect = 16 / 9, onCrop, onCancel }: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [imgLoaded, setImgLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const container = containerRef.current;
    if (!canvas || !img || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerRect = container.getBoundingClientRect();
    canvas.width = containerRect.width;
    canvas.height = containerRect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2 + offset.x, canvas.height / 2 + offset.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'white';
    ctx.fillRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
    ctx.restore();

    ctx.strokeStyle = '#D4A853';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);

    const hs = 12;
    ctx.fillStyle = '#D4A853';
    ctx.fillRect(cropBox.x - hs / 2, cropBox.y - hs / 2, hs, hs);
    ctx.fillRect(cropBox.x + cropBox.width - hs / 2, cropBox.y - hs / 2, hs, hs);
    ctx.fillRect(cropBox.x - hs / 2, cropBox.y + cropBox.height - hs / 2, hs, hs);
    ctx.fillRect(cropBox.x + cropBox.width - hs / 2, cropBox.y + cropBox.height - hs / 2, hs, hs);

    ctx.strokeStyle = 'rgba(212, 168, 83, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(cropBox.x + (cropBox.width * i) / 3, cropBox.y);
      ctx.lineTo(cropBox.x + (cropBox.width * i) / 3, cropBox.y + cropBox.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cropBox.x, cropBox.y + (cropBox.height * i) / 3);
      ctx.lineTo(cropBox.x + cropBox.width, cropBox.y + (cropBox.height * i) / 3);
      ctx.stroke();
    }
  }, [scale, rotation, offset, cropBox]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
      const container = containerRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const imgAspect = img.naturalWidth / img.naturalHeight;
        let dw: number, dh: number;
        if (imgAspect > containerRect.width / containerRect.height) {
          dw = containerRect.width;
          dh = containerRect.width / imgAspect;
        } else {
          dh = containerRect.height;
          dw = containerRect.height * imgAspect;
        }
        setScale(Math.min(dw / img.naturalWidth, dh / img.naturalHeight) * 0.9);
        const cropW = containerRect.width * 0.8;
        const cropH = aspect ? cropW / aspect : containerRect.height * 0.8;
        setCropBox({
          x: (containerRect.width - cropW) / 2,
          y: (containerRect.height - cropH) / 2,
          width: cropW,
          height: cropH,
        });
      }
    };
    img.src = imageSrc;
  }, [imageSrc, aspect]);

  useEffect(() => {
    if (imgLoaded) drawCanvas();
  }, [imgLoaded, scale, rotation, offset, cropBox, drawCanvas]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setDragging(false);

  const handleCrop = () => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const containerRect = container.getBoundingClientRect();

    // Draw the full transformed image onto an intermediate canvas
    // using the same transform as the preview (handles rotation correctly)
    const intermediate = document.createElement('canvas');
    intermediate.width = containerRect.width;
    intermediate.height = containerRect.height;
    const ictx = intermediate.getContext('2d');
    if (!ictx) return;

    ictx.translate(containerRect.width / 2 + offset.x, containerRect.height / 2 + offset.y);
    ictx.rotate((rotation * Math.PI) / 180);
    ictx.scale(scale, scale);
    ictx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    // Extract the crop region from the intermediate canvas
    const output = document.createElement('canvas');
    output.width = cropBox.width;
    output.height = cropBox.height;
    const octx = output.getContext('2d');
    if (!octx) return;

    octx.drawImage(
      intermediate,
      cropBox.x, cropBox.y, cropBox.width, cropBox.height,
      0, 0, cropBox.width, cropBox.height,
    );

    onCrop(output.toDataURL('image/jpeg', 0.9));
  };

  if (!imgLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent mx-auto" />
          <p className="mt-3 text-sm text-muted-foreground">Loading image...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onCancel}>
      <div className="bg-white rounded-xl max-w-3xl w-full mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-border">
          <h3 className="font-display text-lg font-semibold text-forest">Crop & Adjust Image</h3>
          <p className="text-sm text-muted-foreground">Drag to position, use buttons to rotate and zoom</p>
        </div>
        <div
          ref={containerRef}
          className="relative bg-gray-900 cursor-move select-none"
          style={{ height: '400px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setScale(s => Math.max(0.2, s - 0.1))} title="Zoom out">
              <ZoomOut className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground w-12 text-center">{Math.round(scale * 100)}%</span>
            <Button variant="outline" size="icon" onClick={() => setScale(s => Math.min(3, s + 0.1))} title="Zoom in">
              <ZoomIn className="size-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button variant="outline" size="icon" onClick={() => setRotation(r => (r + 90) % 360)} title="Rotate">
              <RotateCw className="size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onCancel}><X className="size-4 mr-1" /> Cancel</Button>
            <Button onClick={handleCrop}><Check className="size-4 mr-1" /> Apply Crop</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
