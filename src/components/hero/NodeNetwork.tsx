import React, { useEffect, useRef } from 'react';

const NodeNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const time = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let rafId: number;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      const rect = parent.getBoundingClientRect();
      // Setup retina scaling
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // If reduced motion, draw once after resize
      if (isReducedMotion) {
        draw();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(parent);

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to canvas center
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const nodes = [
      { label: 'IG',  angle: 315, dist: 160, color: '#E1306C' },
      { label: 'in',  angle: 0,   dist: 170, color: '#0077B5' },
      { label: 'YT',  angle: 45,  dist: 160, color: '#FF0000' },
      { label: 'X',   angle: 135, dist: 165, color: '#ffffff' },
      { label: '@',   angle: 180, dist: 170, color: '#FF3CAC' },
      { label: 'P',   angle: 225, dist: 158, color: '#E60023' }
    ];

    const draw = () => {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // 1. BACKGROUND GRADIENT
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.65;
      const cy = height * 0.5;
      
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.8);
      gradient.addColorStop(0, 'rgba(20,10,28,1)');
      gradient.addColorStop(1, 'rgba(5,5,10,1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Mobile check
      const isMobile = width < 768;

      // MOUSE PARALLAX offsets
      const parallaxMouseX = isMobile ? 0 : mousePos.current.x;
      const parallaxMouseY = isMobile ? 0 : mousePos.current.y;

      const gridShiftX = parallaxMouseX * 0.015;
      const gridShiftY = parallaxMouseY * 0.015;

      const nodeShiftX = parallaxMouseX * 0.04;
      const nodeShiftY = parallaxMouseY * 0.04;

      // 2. ISOMETRIC GRID
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 0.5;
      
      const gridSpacing = 32;
      ctx.beginPath();
      // Horizontal lines
      for (let y = -height; y < height * 2; y += gridSpacing) {
        ctx.moveTo(-width, y + gridShiftY);
        ctx.lineTo(width * 2, y + gridShiftY);
      }
      
      // Add diagonal lines for true isometric feel (30 degrees and 150 degrees)
      const dx = Math.cos(Math.PI / 6) * gridSpacing * 2;
      for (let x = -width * 2; x < width * 2; x += dx) {
        ctx.moveTo(x + gridShiftX, -height);
        ctx.lineTo(x + gridShiftX + height * 2, height);
        ctx.moveTo(x + gridShiftX, height);
        ctx.lineTo(x + gridShiftX + height * 2, -height);
      }
      ctx.stroke();
      ctx.restore();

      const hubX = width * 0.64;
      const hubY = height * 0.50;

      // 3. FLOW LINES
      ctx.save();
      nodes.forEach((node, i) => {
        const angleRad = node.angle * Math.PI / 180;
        const nx = hubX + Math.cos(angleRad) * node.dist + nodeShiftX;
        const ny = hubY + Math.sin(angleRad) * node.dist * 0.55 + nodeShiftY;

        // Quadratic curve with control point offset 20px perpendicular
        const diffX = nx - hubX;
        const diffY = ny - hubY;
        const len = Math.sqrt(diffX*diffX + diffY*diffY);
        const px = -diffY / len * 20;
        const py = diffX / len * 20;
        
        const cxPoint = hubX + diffX * 0.5 + px;
        const cyPoint = hubY + diffY * 0.5 + py;

        ctx.beginPath();
        ctx.moveTo(hubX, hubY);
        ctx.quadraticCurveTo(cxPoint, cyPoint, nx, ny);

        ctx.strokeStyle = i % 2 === 0 ? '#FF3CAC' : '#784BA0';
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 14]);
        ctx.lineDashOffset = -(time.current * 30);
        ctx.stroke();
        ctx.setLineDash([]); // reset

        // Glowing dot
        const p = ((time.current * 0.4 + i * (3/6)) % 3) / 3;
        if (p >= 0 && p <= 1) {
          const dotX = Math.pow(1-p, 2) * hubX + 2*(1-p)*p * cxPoint + Math.pow(p, 2) * nx;
          const dotY = Math.pow(1-p, 2) * hubY + 2*(1-p)*p * cyPoint + Math.pow(p, 2) * ny;
          
          ctx.beginPath();
          ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
          ctx.fillStyle = ctx.strokeStyle;
          ctx.shadowColor = ctx.strokeStyle as string;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      ctx.restore();

      // 4. HEX NODES
      ctx.save();
      nodes.forEach((node, i) => {
        const angleRad = node.angle * Math.PI / 180;
        const nx = hubX + Math.cos(angleRad) * node.dist + nodeShiftX;
        const ny = hubY + Math.sin(angleRad) * node.dist * 0.55 + nodeShiftY;

        let radius = 28;
        const phaseOffset = i * (Math.PI / 3);
        radius *= (0.92 + Math.sin(time.current * 0.6 + phaseOffset) * 0.08);

        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const hexAngle = j * Math.PI / 3 - Math.PI / 6;
          const hx = nx + Math.cos(hexAngle) * radius;
          const hy = ny + Math.sin(hexAngle) * radius;
          if (j === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();

        ctx.fillStyle = 'rgba(20,20,28,0.92)';
        ctx.fill();

        ctx.strokeStyle = node.color;
        ctx.globalAlpha = 0.7;
        ctx.lineWidth = 1;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 16;
        ctx.stroke();

        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
        ctx.fillStyle = node.color;
        ctx.font = '500 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, nx, ny);
      });
      ctx.restore();

      // 5. CENTRAL HUB
      ctx.save();
      // Outer rings
      for (let i = 0; i < 3; i++) {
        const r = 52 + 18 * (i + 1);
        ctx.beginPath();
        ctx.arc(hubX, hubY, r, 0, Math.PI * 2);
        ctx.strokeStyle = '#FF3CAC';
        ctx.lineWidth = 0.5;
        const pulse = Math.sin(time.current * 0.8 + i);
        ctx.globalAlpha = 0.05 + pulse * 0.02;
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Radial glow
      const hubGlow = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, 120);
      hubGlow.addColorStop(0, 'rgba(255,60,172,0.15)');
      hubGlow.addColorStop(0.5, 'rgba(120,75,160,0.05)');
      hubGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = hubGlow;
      ctx.beginPath();
      ctx.arc(hubX, hubY, 120, 0, Math.PI * 2);
      ctx.fill();

      // Main circle
      ctx.beginPath();
      ctx.arc(hubX, hubY, 52, 0, Math.PI * 2);
      ctx.fillStyle = '#0f0f14';
      ctx.fill();
      ctx.strokeStyle = '#FF3CAC';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#FF3CAC';
      ctx.shadowBlur = 24;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.font = '500 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CREATOR', hubX, hubY - 7);
      ctx.fillText('OS', hubX, hubY + 8);
      ctx.restore();
    };

    const loop = () => {
      time.current += 0.016;
      draw();
      if (!isReducedMotion) {
        rafId = requestAnimationFrame(loop);
      }
    };

    handleResize(); // Initial resize and draw
    if (!isReducedMotion) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default NodeNetwork;
