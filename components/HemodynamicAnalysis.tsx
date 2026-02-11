
import React, { useEffect, useRef } from 'react';
import { Vitals } from '../types';

const HemodynamicAnalysis: React.FC<{ vitals: Vitals }> = ({ vitals }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    const numParticles = 100;
    
    for(let i=0; i<numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        v: 1 + Math.random() * 2,
        size: 1 + Math.random() * 2
      });
    }

    let frame: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 7, 10, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const pulseFactor = 1 + (Math.sin(Date.now() * 0.01) * 0.2);

      particles.forEach(p => {
        p.x += p.v * (vitals.heartRate / 60) * pulseFactor;
        if (p.x > canvas.width) p.x = 0;

        ctx.fillStyle = '#00f2ff';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#00f2ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, [vitals.heartRate]);

  return <canvas ref={canvasRef} className="w-full h-full" width={600} height={150} />;
};

export default HemodynamicAnalysis;
