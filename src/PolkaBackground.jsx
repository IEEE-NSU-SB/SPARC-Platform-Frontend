import React, { useEffect, useMemo } from 'react';

const STYLE_ID = 'sparc-polka-bg-styles';

const POLKA_BG_CSS = `
.sparc-polka-bg {
  position: relative;
  width: 100%;
  isolation: isolate;
  box-sizing: border-box;
}

.sparc-polka-bg__clip {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}

.sparc-polka-bg__layer {
  position: absolute;
  top: -48px;
  bottom: -48px;
  left: -56px;
  right: -56px;
  background-color: var(--pb-dot-color);

  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='24' viewBox='0 0 28 24'%3E%3Ccircle cx='7' cy='6' r='3.5' fill='none' stroke='%23000' stroke-width='1.85'/%3E%3Ccircle cx='21' cy='18' r='3.5' fill='none' stroke='%23000' stroke-width='1.85'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='24' viewBox='0 0 28 24'%3E%3Ccircle cx='7' cy='6' r='3.5' fill='none' stroke='%23000' stroke-width='1.85'/%3E%3Ccircle cx='21' cy='18' r='3.5' fill='none' stroke='%23000' stroke-width='1.85'/%3E%3C/svg%3E");
  -webkit-mask-repeat: repeat;
  mask-repeat: repeat;
  -webkit-mask-size: 28px 24px;
  mask-size: 28px 24px;

  will-change: transform;
  animation: sparcPolkaMove var(--pb-speed, 4s) linear infinite;
}

@keyframes sparcPolkaMove {
  0% {
    transform: translate3d(0px, 0px, 0);
  }
  100% {
    transform: translate3d(var(--pb-dx, 28px), var(--pb-dy, 0px), 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sparc-polka-bg__layer {
    animation: none;
  }
}
`;

const DIRECTION_VECTORS = {
  right: ['28px', '0px'],
  left: ['-28px', '0px'],
  down: ['0px', '24px'],
  up: ['0px', '-24px'],
  'bottom-right': ['28px', '24px'],
  diagonal: ['28px', '24px'],
  'bottom-left': ['-28px', '24px'],
  'top-right': ['28px', '-24px'],
  'top-left': ['-28px', '-24px'],
};

function parseRgb(color) {
  if (!color || typeof color !== 'string') return null;
  const trimmed = color.trim();

  // Hex: #RGB, #RGBA, #RRGGBB, #RRGGBBAA
  const hexMatch = trimmed.match(/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length <= 4) {
      hex = hex
        .slice(0, 3)
        .split('')
        .map((c) => c + c)
        .join('');
    }
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  // rgb() or rgba()
  const rgbMatch = trimmed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
    };
  }

  return null;
}

function getComplementaryDotColor(bgColor) {
  const rgb = parseRgb(bgColor);
  if (!rgb) return 'rgba(153, 1, 40, 0.14)';

  const { r, g, b } = rgb;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Dark background -> soft luminous tint
  if (luminance < 0.45) {
    const isWarmMaroon = r > g + 12 && r > b + 12;
    return isWarmMaroon
      ? 'rgba(255, 224, 232, 0.15)'
      : 'rgba(255, 255, 255, 0.15)';
  }

  // Light background -> subtle crimson or slate contrast
  const isNeutralOrWarm = r >= b;
  return isNeutralOrWarm
    ? 'rgba(153, 1, 40, 0.12)'
    : 'rgba(18, 24, 38, 0.11)';
}

export default function PolkaBackground({
  bgColor = '#120306',
  dotColorOverride = undefined,
  direction = 'right',
  speed = '4s',
  dotColor,
  as: Tag = 'div',
  children,
  className = '',
  style = {},
}) {
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = STYLE_ID;
      tag.textContent = POLKA_BG_CSS;
      document.head.appendChild(tag);
    }
  }, []);

  const resolvedDotColor = useMemo(
    () => dotColor || getComplementaryDotColor(bgColor),
    [bgColor, dotColor]
  );

  const [dx, dy] =
    DIRECTION_VECTORS[direction?.toLowerCase()] || DIRECTION_VECTORS.right;

  return (
    <Tag
      className={`sparc-polka-bg ${className}`.trim()}
      style={{
        backgroundColor: bgColor,
        '--pb-dot-color': dotColorOverride || resolvedDotColor,
        '--pb-dx': dx,
        '--pb-dy': dy,
        '--pb-speed': typeof speed === 'number' ? `${speed}s` : speed,
        ...style,
      }}
    >
      <span aria-hidden="true" className="sparc-polka-bg__clip">
        <span className="sparc-polka-bg__layer" />
      </span>

      {children}
    </Tag>
  );
}