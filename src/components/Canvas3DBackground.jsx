import { useEffect, useRef } from 'react';

export default function Canvas3DBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle nodes in 3D perspective
    const PARTICLE_COUNT = 65;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1000 + 100, // depth
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: -0.8 - Math.random() * 0.8, // move forward
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(0, 242, 254,' : 'rgba(168, 85, 247,',
      });
    }

    const fov = 400; // field of view

    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const offsetX = (mouse.x - width / 2) * 0.08;
      const offsetY = (mouse.y - height / 2) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Radial ambient glow behind everything
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 10,
        mouse.x, mouse.y, 450
      );
      gradient.addColorStop(0, 'rgba(0, 242, 254, 0.06)');
      gradient.addColorStop(0.5, 'rgba(121, 40, 202, 0.03)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and project particles
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.z += p.vz;
        p.x += p.vx;
        p.y += p.vy;

        // Reset if behind camera
        if (p.z <= 10) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        // 3D perspective projection
        const scale = fov / (fov + p.z);
        const projX = (p.x - offsetX) * scale + width / 2;
        const projY = (p.y - offsetY) * scale + height / 2;
        const alpha = Math.min(1, Math.max(0, (1 - p.z / 1000) * 0.85));

        projected.push({ x: projX, y: projY, scale, alpha, color: p.color, size: p.size * scale });
      }

      // Draw constellation connections between close nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.25 * projected[i].alpha;
            ctx.strokeStyle = `rgba(0, 242, 254, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particle dots with glow
      for (const p of projected) {
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
