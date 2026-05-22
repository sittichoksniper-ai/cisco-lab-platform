'use client';

import React, { useEffect, useRef } from 'react';

interface TopologyPanelProps {
  devices: any[];
  onDeviceSelect?: (deviceId: string) => void;
}

export const TopologyPanel: React.FC<TopologyPanelProps> = ({ devices, onDeviceSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || devices.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw devices
    const deviceWidth = 80;
    const deviceHeight = 60;
    const spacing = 150;

    devices.forEach((device, index) => {
      const x = 50 + (index % 3) * spacing;
      const y = 50 + Math.floor(index / 3) * spacing;

      // Draw device box
      ctx.fillStyle = device.type === 'Switch' ? '#4CAF50' : '#2196F3';
      ctx.fillRect(x, y, deviceWidth, deviceHeight);

      // Draw border
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, deviceWidth, deviceHeight);

      // Draw label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(device.deviceName, x + deviceWidth / 2, y + deviceHeight / 2);

      // Draw type
      ctx.font = '10px Arial';
      ctx.fillText(device.type, x + deviceWidth / 2, y + deviceHeight / 2 + 15);
    });
  }, [devices]);

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="text-lg font-bold mb-4">Network Topology</h3>
      <canvas
        ref={canvasRef}
        className="w-full border border-gray-300 rounded cursor-pointer"
        style={{ minHeight: '400px' }}
        onClick={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          // Simple click detection for device selection
          console.log('Clicked at', x, y);
        }}
      />
    </div>
  );
};

export default TopologyPanel;
