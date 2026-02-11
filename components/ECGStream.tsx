
import React, { useEffect, useRef } from 'react';
import { Vitals } from '../types';

interface ECGStreamProps {
  vitals: Vitals;
}

const ECGStream: React.FC<ECGStreamProps> = ({ vitals }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;
    let phase = 0;
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Core signal
      ctx.beginPath();
      ctx.strokeStyle = '#00d2ff';
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      
      // Outer glow layer
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(0, 210, 255, 0.8)';

      const hrFactor = vitals.heartRate / 72;
      phase += 0.045 * hrFactor;

      for (let i = 0; i < width; i++) {
        const localPhase = phase - (i * 0.04);
        let y = midY;

        const cycle = (localPhase % 6.28);
        
        // Atrial P-Wave
        y += Math.sin(cycle * 2.5) * 5 * Math.exp(-Math.pow(cycle - 1.2, 2) * 15);
        
        // Ventricular QRS Complex
        if (cycle > 2.9 && cycle < 3.25) {
           y -= Math.sin((cycle - 2.9) * 8.97) * 75;
        }

        // T-Wave Repolarization
        y += Math.sin(cycle * 2) * 8 * Math.exp(-Math.pow(cycle - 4.8, 2) * 5);

        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // Second thinner pass for "sharpness"
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#ffffff';
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1.0;
      
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [vitals.heartRate]);

  return (
    <div className="w-full h-full p-2">
      <canvas ref={canvasRef} className="w-full h-full" width={1200} height={400} />
    </div>
  );
};

export default ECGStream;
