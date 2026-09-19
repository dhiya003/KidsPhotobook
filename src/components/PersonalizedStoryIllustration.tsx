import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Palette, Eraser, RotateCcw, Download, Printer, Check } from 'lucide-react';

interface StoryIllustrationProps {
  sceneImage: string;
  childName: string;
  gender?: 'boy' | 'girl' | 'neutral';
  isColoringMode?: boolean;
  allowDrawing?: boolean;
  className?: string;
  altText?: string;
  pageNumber?: number;
}

const CRAYON_COLORS = [
  { name: 'Classic Black', hex: '#162032' },
  { name: 'Ruby Red', hex: '#E53E3E' },
  { name: 'Sunny Yellow', hex: '#ECC94B' },
  { name: 'Leaf Green', hex: '#38A169' },
  { name: 'Sky Blue', hex: '#3182CE' },
  { name: 'Royal Purple', hex: '#805AD5' },
  { name: 'Coral Pink', hex: '#ED64A6' },
  { name: 'Warm Orange', hex: '#DD6B20' },
  { name: 'Chocolate Brown', hex: '#7B341E' }
];

export const PersonalizedStoryIllustration: React.FC<StoryIllustrationProps> = ({
  sceneImage,
  childName,
  gender = 'boy',
  isColoringMode = false,
  allowDrawing = true,
  className = '',
  altText = 'Personalized story illustration',
  pageNumber
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentColor, setCurrentColor] = useState('#E53E3E');
  const [brushSize, setBrushSize] = useState(6);
  const [isEraser, setIsEraser] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Resize canvas to match container dimensions
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      // Only resize if actual dimension changed
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        // Save current drawing
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx && canvas.width > 0 && canvas.height > 0) {
          tempCtx.drawImage(canvas, 0, 0);
        }

        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext('2d');
        if (ctx && tempCanvas.width > 0) {
          ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isColoringMode]);

  // Clear drawing on page change or reset
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
    }
  };

  // Drawing event handlers for mouse and touch
  const getCanvasCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isColoringMode || !allowDrawing) return;
    e.preventDefault();
    isDrawingRef.current = true;
    const pos = getCanvasCoordinates(e);
    lastPosRef.current = pos;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !isColoringMode || !allowDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getCanvasCoordinates(e);
    if (!lastPosRef.current) {
      lastPosRef.current = currentPos;
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2.5;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.85; // Crayon-like texture
    }

    ctx.stroke();
    lastPosRef.current = currentPos;
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  // Download coloring sheet
  const handleDownloadSheet = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${childName}'s Coloring Sheet - Page ${pageNumber || 1}</title>
            <style>
              body { font-family: sans-serif; text-align: center; margin: 20px; }
              h1 { font-size: 20px; color: #162032; margin-bottom: 6px; }
              p { font-size: 13px; color: #56647A; margin-bottom: 16px; }
              img { max-width: 90%; height: auto; border: 2px solid #000; filter: grayscale(100%) contrast(250%) invert(0); }
            </style>
          </head>
          <body>
            <h1>${childName}'s Storybook Coloring Page</h1>
            <p>Verve Studio • ${gender === 'girl' ? 'Girl' : 'Boy'} Edition</p>
            <img src="${sceneImage}" alt="Coloring Page" />
            <script>
              window.onload = () => { window.print(); };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full select-none ${
        isColoringMode ? 'bg-white' : 'bg-[#162032]'
      } ${className}`}
    >
      {/* 1. Main Illustrated Scene */}
      <img
        src={sceneImage}
        alt={altText}
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-300 pointer-events-none ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${
          isColoringMode
            ? 'filter grayscale contrast-[280%] brightness-[1.05] invert-0'
            : ''
        }`}
      />

      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-[#162032] animate-pulse flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-[#F5B027] animate-spin opacity-50" />
        </div>
      )}

      {/* 2. Interactive Coloring Canvas Layer */}
      {isColoringMode && (
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none"
        />
      )}

      {/* 3. Coloring Toolbar Overlay when in Coloring Book mode */}
      {isColoringMode && allowDrawing && (
        <div className="absolute bottom-2 left-2 right-2 z-20 bg-white/95 backdrop-blur-md rounded-xl p-2 border border-[#E8DFD1] shadow-lg flex flex-wrap items-center justify-between gap-2">
          {/* Crayon Color Palette */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {CRAYON_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => {
                  setCurrentColor(c.hex);
                  setIsEraser(false);
                }}
                title={c.name}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform shrink-0 border border-black/15 ${
                  !isEraser && currentColor === c.hex
                    ? 'scale-125 ring-2 ring-[#EB5E44] ring-offset-1 shadow-xs'
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          {/* Tools: Eraser, Clear, Print */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsEraser(!isEraser)}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border transition-all ${
                isEraser
                  ? 'bg-[#162032] text-white border-[#162032]'
                  : 'bg-[#FAF7F2] text-[#56647A] border-[#E8DFD1] hover:border-[#162032]'
              }`}
              title="Eraser tool"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Eraser</span>
            </button>

            {hasDrawn && (
              <button
                onClick={clearCanvas}
                className="p-1.5 rounded-lg text-xs font-bold text-[#EB5E44] bg-[#FFF8F5] border border-[#FCD9D0] hover:bg-[#FCE8E2] flex items-center gap-1"
                title="Reset coloring"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            <button
              onClick={handleDownloadSheet}
              className="p-1.5 rounded-lg text-xs font-bold text-[#162032] bg-[#FAF7F2] border border-[#E8DFD1] hover:bg-[#E8DFD1] flex items-center gap-1"
              title="Print coloring sheet"
            >
              <Printer className="w-3.5 h-3.5 text-[#EB5E44]" />
              <span className="hidden sm:inline">Print Sheet</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Badge: Character Tag & Mode */}
      <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 pointer-events-none">
        <span className="bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
          {isColoringMode ? (
            <>
              <Palette className="w-3 h-3 text-[#ECC94B]" />
              <span>{childName}’s Coloring Book</span>
              <span className="opacity-70 text-[9px]">({gender === 'girl' ? 'Girl' : 'Boy'} Edition)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-[#F5B027]" />
              <span>{childName}’s Character</span>
              <span className="opacity-70 text-[9px]">({gender === 'girl' ? 'Girl' : 'Boy'} Edition)</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

// Backward-compatibility export
export const PersonalizedFaceComposite = PersonalizedStoryIllustration;
