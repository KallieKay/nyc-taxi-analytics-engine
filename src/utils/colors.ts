// Color scales matching Plotly Express continuous scales

// Viridis scale stops: Deep purple -> blue -> teal -> green -> yellow
const VIRIDIS_STOPS = [
  { p: 0.0, r: 68, g: 1, b: 84 },     // #440154
  { p: 0.25, r: 59, g: 82, b: 139 },  // #3b528b
  { p: 0.5, r: 33, g: 145, b: 140 },  // #21918c
  { p: 0.75, r: 94, g: 201, b: 98 },  // #5ec962
  { p: 1.0, r: 253, g: 231, b: 37 },  // #fde725
];

// Blues scale stops: Light cyan-blue -> royal blue -> deep navy
const BLUES_STOPS = [
  { p: 0.0, r: 198, g: 219, b: 239 }, // #c6dbef
  { p: 0.3, r: 107, g: 174, b: 214 }, // #6baed6
  { p: 0.6, r: 49, g: 130, b: 189 },  // #3182bd
  { p: 1.0, r: 8, g: 69, b: 148 },    // #084594
];

// Amber-Orange Flame scale stops: soft gold -> amber -> deep burnt orange
const AMBER_STOPS = [
  { p: 0.0, r: 254, g: 243, b: 199 }, // #fef3c7
  { p: 0.35, r: 245, g: 158, b: 11 }, // #f59e0b
  { p: 0.7, r: 217, g: 119, b: 6 },   // #d97706
  { p: 1.0, r: 180, g: 83, b: 9 },    // #b45309
];

// Emerald-Teal scale stops
const EMERALD_STOPS = [
  { p: 0.0, r: 167, g: 243, b: 208 }, // #a7f3d0
  { p: 0.4, r: 52, g: 211, b: 153 },  // #34d399
  { p: 0.7, r: 16, g: 185, b: 129 },  // #10b981
  { p: 1.0, r: 4, g: 120, b: 87 },    // #047857
];

function interpolateColor(
  normalized: number,
  stops: { p: number; r: number; g: number; b: number }[]
): string {
  const t = Math.max(0, Math.min(1, normalized));

  for (let i = 0; i < stops.length - 1; i++) {
    const s1 = stops[i];
    const s2 = stops[i + 1];
    if (t >= s1.p && t <= s2.p) {
      const localT = (t - s1.p) / (s2.p - s1.p);
      const r = Math.round(s1.r + (s2.r - s1.r) * localT);
      const g = Math.round(s1.g + (s2.g - s1.g) * localT);
      const b = Math.round(s1.b + (s2.b - s1.b) * localT);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  const last = stops[stops.length - 1];
  return `rgb(${last.r}, ${last.g}, ${last.b})`;
}

export function getViridisColor(val: number, min: number, max: number): string {
  if (max === min) return '#21918c';
  const norm = (val - min) / (max - min);
  return interpolateColor(norm, VIRIDIS_STOPS);
}

export function getBluesColor(val: number, min: number, max: number): string {
  if (max === min) return '#3182bd';
  const norm = (val - min) / (max - min);
  return interpolateColor(norm, BLUES_STOPS);
}

export function getAmberColor(val: number, min: number, max: number): string {
  if (max === min) return '#f59e0b';
  const norm = (val - min) / (max - min);
  return interpolateColor(norm, AMBER_STOPS);
}

export function getEmeraldColor(val: number, min: number, max: number): string {
  if (max === min) return '#10b981';
  const norm = (val - min) / (max - min);
  return interpolateColor(norm, EMERALD_STOPS);
}
