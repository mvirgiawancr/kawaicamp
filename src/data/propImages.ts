import type { PhotoItem } from "./items";

/**
 * SVG prop images as data URLs for use on the Fabric.js canvas.
 * Each prop is a cute, kawaii-style vector illustration.
 */

function svgToDataUrl(svg: string): string {
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

const PROP_SVGS: Record<string, string> = {
    // ===== HATS =====
    "neko-ears": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" fill="none">
      <path d="M30 130 L55 20 Q60 10 70 15 L90 80" fill="#FFB6C1" stroke="#FF69B4" stroke-width="3"/>
      <path d="M170 130 L145 20 Q140 10 130 15 L110 80" fill="#FFB6C1" stroke="#FF69B4" stroke-width="3"/>
      <path d="M45 90 L60 35 Q63 28 68 32 L80 75" fill="#FF97B7"/>
      <path d="M155 90 L140 35 Q137 28 132 32 L120 75" fill="#FF97B7"/>
      <ellipse cx="100" cy="130" rx="75" ry="12" fill="#FFB6C1" stroke="#FF69B4" stroke-width="2"/>
    </svg>
  `),

    "pink-beret": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 120" fill="none">
      <ellipse cx="90" cy="100" rx="80" ry="18" fill="#FF85B3" stroke="#E8559E" stroke-width="2"/>
      <path d="M20 100 Q20 40 90 30 Q160 40 160 100" fill="#FF6BB5" stroke="#E8559E" stroke-width="2"/>
      <circle cx="90" cy="32" r="8" fill="#E8559E"/>
      <path d="M50 75 Q70 65 90 68 Q110 65 130 75" stroke="#E8559E" stroke-width="1.5" fill="none" opacity="0.3"/>
    </svg>
  `),

    "crown": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" fill="none">
      <path d="M25 130 L15 50 L55 80 L100 25 L145 80 L185 50 L175 130 Z" fill="#FFD700" stroke="#DAA520" stroke-width="3"/>
      <path d="M25 130 L175 130" stroke="#DAA520" stroke-width="4"/>
      <circle cx="100" cy="50" r="6" fill="#FF6BB5"/>
      <circle cx="55" cy="75" r="5" fill="#E0D7FF"/>
      <circle cx="145" cy="75" r="5" fill="#E0D7FF"/>
      <rect x="25" y="120" width="150" height="15" rx="3" fill="#FFD700" stroke="#DAA520" stroke-width="2"/>
      <circle cx="60" cy="127" r="4" fill="#FF6BB5"/>
      <circle cx="100" cy="127" r="4" fill="#E0D7FF"/>
      <circle cx="140" cy="127" r="4" fill="#FF6BB5"/>
    </svg>
  `),

    "bunny-ears": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180" fill="none">
      <ellipse cx="60" cy="70" rx="22" ry="65" fill="white" stroke="#FFB6C1" stroke-width="3" transform="rotate(-10 60 70)"/>
      <ellipse cx="60" cy="70" rx="12" ry="45" fill="#FFD9EC" transform="rotate(-10 60 70)"/>
      <ellipse cx="140" cy="70" rx="22" ry="65" fill="white" stroke="#FFB6C1" stroke-width="3" transform="rotate(10 140 70)"/>
      <ellipse cx="140" cy="70" rx="12" ry="45" fill="#FFD9EC" transform="rotate(10 140 70)"/>
      <ellipse cx="100" cy="160" rx="55" ry="15" fill="white" stroke="#FFB6C1" stroke-width="2"/>
    </svg>
  `),

    "flower-crown": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 100" fill="none">
      <path d="M20 70 Q110 30 200 70" stroke="#4CAF50" stroke-width="4" fill="none"/>
      <g transform="translate(40,45)"><circle cx="0" cy="0" r="12" fill="#FF6BB5"/><circle cx="0" cy="-10" r="5" fill="#FFD9EC"/><circle cx="9" cy="-3" r="5" fill="#FFD9EC"/><circle cx="6" cy="8" r="5" fill="#FFD9EC"/><circle cx="-6" cy="8" r="5" fill="#FFD9EC"/><circle cx="-9" cy="-3" r="5" fill="#FFD9EC"/><circle cx="0" cy="0" r="4" fill="#FFD700"/></g>
      <g transform="translate(80,35)"><circle cx="0" cy="0" r="10" fill="#E0D7FF"/><circle cx="0" cy="-8" r="4.5" fill="#F0EBFF"/><circle cx="7" cy="-2" r="4.5" fill="#F0EBFF"/><circle cx="5" cy="6" r="4.5" fill="#F0EBFF"/><circle cx="-5" cy="6" r="4.5" fill="#F0EBFF"/><circle cx="-7" cy="-2" r="4.5" fill="#F0EBFF"/><circle cx="0" cy="0" r="3.5" fill="#FFD700"/></g>
      <g transform="translate(120,32)"><circle cx="0" cy="0" r="11" fill="#FFB6C1"/><circle cx="0" cy="-9" r="5" fill="#FFD9EC"/><circle cx="8" cy="-3" r="5" fill="#FFD9EC"/><circle cx="5" cy="7" r="5" fill="#FFD9EC"/><circle cx="-5" cy="7" r="5" fill="#FFD9EC"/><circle cx="-8" cy="-3" r="5" fill="#FFD9EC"/><circle cx="0" cy="0" r="4" fill="#FFD700"/></g>
      <g transform="translate(160,42)"><circle cx="0" cy="0" r="10" fill="#FF6BB5"/><circle cx="0" cy="-8" r="4.5" fill="#FFD9EC"/><circle cx="7" cy="-2" r="4.5" fill="#FFD9EC"/><circle cx="5" cy="6" r="4.5" fill="#FFD9EC"/><circle cx="-5" cy="6" r="4.5" fill="#FFD9EC"/><circle cx="-7" cy="-2" r="4.5" fill="#FFD9EC"/><circle cx="0" cy="0" r="3.5" fill="#FFD700"/></g>
      <circle cx="60" cy="58" r="3" fill="#4CAF50"/><circle cx="100" cy="42" r="2.5" fill="#4CAF50"/><circle cx="140" cy="40" r="3" fill="#4CAF50"/>
    </svg>
  `),

    "witch-hat": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
      <ellipse cx="100" cy="175" rx="85" ry="15" fill="#9370DB" stroke="#7B5EA7" stroke-width="2"/>
      <path d="M30 175 Q35 100 100 15 Q165 100 170 175" fill="#9370DB" stroke="#7B5EA7" stroke-width="2"/>
      <path d="M100 15 Q105 5 115 20 Q108 25 100 15" fill="#9370DB"/>
      <rect x="25" y="165" width="150" height="14" rx="7" fill="#FF6BB5" stroke="#E8559E" stroke-width="1.5"/>
      <circle cx="80" cy="172" r="4" fill="#FFD700"/><circle cx="100" cy="172" r="4" fill="#FFD700"/><circle cx="120" cy="172" r="4" fill="#FFD700"/>
      <path d="M65 120 Q80 110 95 120" stroke="#7B5EA7" stroke-width="1" fill="none" opacity="0.3"/>
    </svg>
  `),

    "unicorn-horn": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200" fill="none">
      <path d="M60 10 L40 150 Q60 160 80 150 Z" fill="url(#rainbow)" stroke="#E8559E" stroke-width="2"/>
      <defs><linearGradient id="rainbow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FF6BB5"/><stop offset="25%" stop-color="#E0D7FF"/>
        <stop offset="50%" stop-color="#87CEEB"/><stop offset="75%" stop-color="#FFD700"/>
        <stop offset="100%" stop-color="#FF6BB5"/>
      </linearGradient></defs>
      <path d="M48 40 L72 40" stroke="white" stroke-width="2" opacity="0.5"/>
      <path d="M46 65 L74 65" stroke="white" stroke-width="2" opacity="0.4"/>
      <path d="M44 90 L76 90" stroke="white" stroke-width="2" opacity="0.3"/>
      <path d="M42 115 L78 115" stroke="white" stroke-width="2" opacity="0.2"/>
      <circle cx="55" cy="25" r="3" fill="white" opacity="0.6"/>
    </svg>
  `),

    "fancy-bow": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 120" fill="none">
      <ellipse cx="50" cy="55" rx="40" ry="30" fill="#FF6BB5" stroke="#E8559E" stroke-width="2"/>
      <ellipse cx="130" cy="55" rx="40" ry="30" fill="#FF6BB5" stroke="#E8559E" stroke-width="2"/>
      <circle cx="90" cy="58" r="14" fill="#E8559E" stroke="#C44A8A" stroke-width="2"/>
      <circle cx="90" cy="58" r="8" fill="#FF6BB5"/>
      <path d="M78 85 Q85 110 90 115 Q95 110 102 85" fill="#FF6BB5" stroke="#E8559E" stroke-width="1.5"/>
      <path d="M30 45 Q45 50 60 45" stroke="#FFD9EC" stroke-width="2" fill="none" opacity="0.5"/>
      <path d="M120 45 Q135 50 150 45" stroke="#FFD9EC" stroke-width="2" fill="none" opacity="0.5"/>
    </svg>
  `),

    // ===== GLASSES =====
    "heart-glass": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 110" fill="none">
      <path d="M35 45 Q35 20 55 20 Q75 20 75 45 Q75 65 55 80 Q35 65 35 45Z" fill="#FF6BB5" fill-opacity="0.4" stroke="#FF6BB5" stroke-width="3"/>
      <path d="M165 45 Q165 20 185 20 Q205 20 205 45 Q205 65 185 80 Q165 65 165 45Z" fill="#FF6BB5" fill-opacity="0.4" stroke="#FF6BB5" stroke-width="3"/>
      <path d="M75 50 L165 50" stroke="#FF6BB5" stroke-width="3"/>
      <line x1="35" y1="45" x2="10" y2="40" stroke="#FF6BB5" stroke-width="3"/>
      <line x1="205" y1="45" x2="230" y2="40" stroke="#FF6BB5" stroke-width="3"/>
    </svg>
  `),

    "star-glasses": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 110" fill="none">
      <polygon points="55,15 63,38 88,38 68,52 75,75 55,62 35,75 42,52 22,38 47,38" fill="#FFD700" fill-opacity="0.4" stroke="#FFD700" stroke-width="2.5"/>
      <polygon points="185,15 193,38 218,38 198,52 205,75 185,62 165,75 172,52 152,38 177,38" fill="#FFD700" fill-opacity="0.4" stroke="#FFD700" stroke-width="2.5"/>
      <path d="M82 45 L158 45" stroke="#FFD700" stroke-width="3"/>
      <line x1="22" y1="42" x2="5" y2="38" stroke="#FFD700" stroke-width="3"/>
      <line x1="218" y1="42" x2="235" y2="38" stroke="#FFD700" stroke-width="3"/>
    </svg>
  `),

    "round-glasses": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 100" fill="none">
      <circle cx="65" cy="50" r="35" fill="rgba(200,220,255,0.2)" stroke="#666" stroke-width="3"/>
      <circle cx="175" cy="50" r="35" fill="rgba(200,220,255,0.2)" stroke="#666" stroke-width="3"/>
      <path d="M100 50 Q120 40 140 50" stroke="#666" stroke-width="3" fill="none"/>
      <line x1="30" y1="45" x2="5" y2="40" stroke="#666" stroke-width="3"/>
      <line x1="210" y1="45" x2="235" y2="40" stroke="#666" stroke-width="3"/>
    </svg>
  `),

    "sunglasses": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100" fill="none">
      <rect x="20" y="25" width="80" height="55" rx="12" fill="#333" fill-opacity="0.7" stroke="#222" stroke-width="3"/>
      <rect x="150" y="25" width="80" height="55" rx="12" fill="#333" fill-opacity="0.7" stroke="#222" stroke-width="3"/>
      <path d="M100 48 Q125 38 150 48" stroke="#222" stroke-width="4" fill="none"/>
      <line x1="20" y1="45" x2="5" y2="40" stroke="#222" stroke-width="3"/>
      <line x1="230" y1="45" x2="245" y2="40" stroke="#222" stroke-width="3"/>
      <path d="M35 35 L60 45" stroke="white" stroke-width="2" opacity="0.3"/>
      <path d="M165 35 L190 45" stroke="white" stroke-width="2" opacity="0.3"/>
    </svg>
  `),

    "blushie": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" fill="none">
      <ellipse cx="45" cy="40" rx="35" ry="22" fill="#FF6BB5" opacity="0.35"/>
      <ellipse cx="155" cy="40" rx="35" ry="22" fill="#FF6BB5" opacity="0.35"/>
      <ellipse cx="45" cy="40" rx="25" ry="15" fill="#FF6BB5" opacity="0.2"/>
      <ellipse cx="155" cy="40" rx="25" ry="15" fill="#FF6BB5" opacity="0.2"/>
    </svg>
  `),

    "mustache": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" fill="none">
      <path d="M100 20 Q60 10 30 35 Q15 50 35 55 Q55 58 75 40 Q90 28 100 35 Q110 28 125 40 Q145 58 165 55 Q185 50 170 35 Q140 10 100 20Z" fill="#4A3728" stroke="#3A2718" stroke-width="2"/>
    </svg>
  `),

    // ===== PROPS =====
    "sparkles": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" fill="none">
      <path d="M75 10 L80 60 L130 75 L80 90 L75 140 L70 90 L20 75 L70 60Z" fill="#FFD700" stroke="#DAA520" stroke-width="1.5"/>
      <path d="M30 25 L33 40 L48 43 L33 46 L30 61 L27 46 L12 43 L27 40Z" fill="#FF6BB5" stroke="#E8559E" stroke-width="1"/>
      <path d="M120 100 L123 112 L135 115 L123 118 L120 130 L117 118 L105 115 L117 112Z" fill="#E0D7FF" stroke="#9370DB" stroke-width="1"/>
      <circle cx="115" cy="30" r="3" fill="#FFD700"/><circle cx="35" cy="110" r="2.5" fill="#FF6BB5"/>
    </svg>
  `),

    "balloon": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200" fill="none">
      <ellipse cx="60" cy="65" rx="45" ry="55" fill="#FF6BB5" stroke="#E8559E" stroke-width="2"/>
      <polygon points="60,120 50,130 70,130" fill="#E8559E"/>
      <path d="M60 130 Q55 160 65 200" stroke="#E8559E" stroke-width="2" fill="none"/>
      <ellipse cx="45" cy="45" rx="12" ry="18" fill="white" opacity="0.25" transform="rotate(-20 45 45)"/>
    </svg>
  `),

    "flower": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160" fill="none">
      <line x1="60" y1="80" x2="60" y2="155" stroke="#4CAF50" stroke-width="4"/>
      <ellipse cx="45" cy="130" rx="18" ry="8" fill="#4CAF50" transform="rotate(-30 45 130)"/>
      <circle cx="60" cy="50" r="18" fill="#FF6BB5"/>
      <circle cx="42" cy="62" r="18" fill="#FFB6C1"/>
      <circle cx="78" cy="62" r="18" fill="#FFB6C1"/>
      <circle cx="45" cy="40" r="18" fill="#FFD9EC"/>
      <circle cx="75" cy="40" r="18" fill="#FFD9EC"/>
      <circle cx="60" cy="50" r="10" fill="#FFD700"/>
    </svg>
  `),

    "speech-hi": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 130" fill="none">
      <rect x="10" y="10" width="160" height="80" rx="20" fill="white" stroke="#FF6BB5" stroke-width="3"/>
      <polygon points="50,90 70,90 55,120" fill="white" stroke="#FF6BB5" stroke-width="3"/>
      <rect x="48" y="85" width="25" height="8" fill="white"/>
      <text x="90" y="62" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="32" fill="#FF6BB5">Hi! ✨</text>
    </svg>
  `),

    "rainbow": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" fill="none">
      <path d="M20 110 Q20 20 100 20 Q180 20 180 110" stroke="#FF4444" stroke-width="8" fill="none"/>
      <path d="M30 110 Q30 32 100 32 Q170 32 170 110" stroke="#FF9944" stroke-width="8" fill="none"/>
      <path d="M40 110 Q40 44 100 44 Q160 44 160 110" stroke="#FFDD44" stroke-width="8" fill="none"/>
      <path d="M50 110 Q50 56 100 56 Q150 56 150 110" stroke="#44BB44" stroke-width="8" fill="none"/>
      <path d="M60 110 Q60 68 100 68 Q140 68 140 110" stroke="#4488FF" stroke-width="8" fill="none"/>
      <path d="M70 110 Q70 80 100 80 Q130 80 130 110" stroke="#9966FF" stroke-width="8" fill="none"/>
    </svg>
  `),

    "candy": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200" fill="none">
      <circle cx="50" cy="50" r="38" fill="#FF6BB5" stroke="#E8559E" stroke-width="2"/>
      <path d="M25 30 Q50 50 75 30" stroke="white" stroke-width="6" fill="none" opacity="0.4"/>
      <path d="M20 50 Q50 75 80 50" stroke="#FFD9EC" stroke-width="6" fill="none" opacity="0.5"/>
      <path d="M25 70 Q50 90 75 70" stroke="white" stroke-width="6" fill="none" opacity="0.3"/>
      <rect x="47" y="88" width="6" height="100" rx="3" fill="white" stroke="#ddd" stroke-width="1"/>
    </svg>
  `),

    "magic-wand": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200" fill="none">
      <rect x="44" y="50" width="12" height="140" rx="3" fill="#333" stroke="#222" stroke-width="1.5" transform="rotate(-15 50 120)"/>
      <rect x="41" y="45" width="18" height="20" rx="4" fill="#FFD700" stroke="#DAA520" stroke-width="1.5" transform="rotate(-15 50 55)"/>
      <path d="M50 5 L53 18 L66 21 L53 24 L50 37 L47 24 L34 21 L47 18Z" fill="#FFD700" stroke="#DAA520" stroke-width="1"/>
      <circle cx="35" cy="10" r="2" fill="#FF6BB5"/><circle cx="65" cy="15" r="1.5" fill="#E0D7FF"/>
      <circle cx="30" cy="30" r="1.5" fill="#FFD700"/>
    </svg>
  `),

    "cherry": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" fill="none">
      <path d="M75 15 Q60 50 50 90" stroke="#4CAF50" stroke-width="3" fill="none"/>
      <path d="M75 15 Q90 50 100 90" stroke="#4CAF50" stroke-width="3" fill="none"/>
      <ellipse cx="55" cy="110" rx="28" ry="26" fill="#E8559E" stroke="#C44A8A" stroke-width="2"/>
      <ellipse cx="100" cy="105" rx="28" ry="26" fill="#FF6BB5" stroke="#E8559E" stroke-width="2"/>
      <ellipse cx="45" cy="100" rx="8" ry="10" fill="white" opacity="0.25"/>
      <ellipse cx="90" cy="95" rx="8" ry="10" fill="white" opacity="0.25"/>
      <path d="M75 15 Q78 8 85 12" stroke="#4CAF50" stroke-width="2" fill="none"/>
    </svg>
  `),

    // ===== STICKERS =====
    "heart": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <path d="M50 85 Q15 60 15 35 Q15 15 35 15 Q50 15 50 30 Q50 15 65 15 Q85 15 85 35 Q85 60 50 85Z" fill="#FF6BB5" stroke="#E8559E" stroke-width="2"/>
      <path d="M35 30 Q35 22 42 22 Q48 22 48 30" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
    </svg>
  `),

    "star": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <polygon points="50,8 61,35 90,38 68,57 74,86 50,72 26,86 32,57 10,38 39,35" fill="#FFD700" stroke="#DAA520" stroke-width="2"/>
      <polygon points="50,22 56,38 73,40 60,50 63,67 50,59 37,67 40,50 27,40 44,38" fill="#FFED4A" opacity="0.5"/>
    </svg>
  `),

    "kiss": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <path d="M30 40 Q30 15 50 30 Q70 15 70 40 Q70 55 50 65 Q30 55 30 40Z" fill="#FF1744" stroke="#D50000" stroke-width="2"/>
      <path d="M42 35 Q42 28 48 32" stroke="white" stroke-width="2" fill="none" opacity="0.4"/>
      <path d="M45 70 Q40 80 50 90 Q55 80 60 75 Q55 80 48 78 Q44 75 45 70Z" fill="#FF1744" stroke="#D50000" stroke-width="1.5"/>
    </svg>
  `),

    "fire": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 110" fill="none">
      <path d="M40 5 Q55 30 60 50 Q65 65 55 80 Q50 88 40 90 Q30 88 25 80 Q15 65 20 50 Q25 30 40 5Z" fill="#FF9800" stroke="#F57C00" stroke-width="2"/>
      <path d="M40 25 Q50 40 52 55 Q55 65 48 75 Q44 80 40 80 Q36 80 32 75 Q25 65 28 55 Q30 40 40 25Z" fill="#FFEB3B"/>
      <path d="M40 45 Q46 55 46 62 Q46 70 40 72 Q34 70 34 62 Q34 55 40 45Z" fill="#FFF9C4"/>
    </svg>
  `),

    "butterfly": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" fill="none">
      <ellipse cx="40" cy="45" rx="32" ry="28" fill="#E0D7FF" stroke="#9370DB" stroke-width="2" transform="rotate(-15 40 45)"/>
      <ellipse cx="120" cy="45" rx="32" ry="28" fill="#E0D7FF" stroke="#9370DB" stroke-width="2" transform="rotate(15 120 45)"/>
      <ellipse cx="50" cy="75" rx="22" ry="18" fill="#FFD9EC" stroke="#FF6BB5" stroke-width="2" transform="rotate(-10 50 75)"/>
      <ellipse cx="110" cy="75" rx="22" ry="18" fill="#FFD9EC" stroke="#FF6BB5" stroke-width="2" transform="rotate(10 110 75)"/>
      <ellipse cx="80" cy="60" rx="4" ry="30" fill="#9370DB"/>
      <path d="M80 30 Q70 15 65 10" stroke="#9370DB" stroke-width="2" fill="none"/>
      <path d="M80 30 Q90 15 95 10" stroke="#9370DB" stroke-width="2" fill="none"/>
      <circle cx="65" cy="10" r="3" fill="#FF6BB5"/><circle cx="95" cy="10" r="3" fill="#FF6BB5"/>
      <circle cx="40" cy="42" r="8" fill="#9370DB" opacity="0.3"/>
      <circle cx="120" cy="42" r="8" fill="#9370DB" opacity="0.3"/>
    </svg>
  `),

    "moon": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <path d="M70 15 Q50 15 38 30 Q25 48 30 68 Q35 85 55 90 Q40 80 38 60 Q38 35 70 15Z" fill="#FFD700" stroke="#DAA520" stroke-width="2"/>
      <circle cx="50" cy="35" r="2" fill="#DAA520" opacity="0.4"/>
      <circle cx="40" cy="55" r="1.5" fill="#DAA520" opacity="0.3"/>
      <circle cx="55" cy="65" r="2.5" fill="#DAA520" opacity="0.3"/>
    </svg>
  `),

    "cloud": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" fill="none">
      <ellipse cx="80" cy="60" rx="55" ry="28" fill="white" stroke="#E0D7FF" stroke-width="2"/>
      <circle cx="55" cy="45" r="28" fill="white" stroke="#E0D7FF" stroke-width="2"/>
      <circle cx="95" cy="42" r="32" fill="white" stroke="#E0D7FF" stroke-width="2"/>
      <ellipse cx="80" cy="60" rx="55" ry="28" fill="white"/>
      <circle cx="55" cy="45" r="26" fill="white"/><circle cx="95" cy="42" r="30" fill="white"/>
      <ellipse cx="65" cy="38" rx="10" ry="6" fill="#F0EBFF" opacity="0.5"/>
    </svg>
  `),

    "diamond": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" fill="none">
      <polygon points="50,10 85,40 50,110 15,40" fill="#87CEEB" stroke="#5BA3D9" stroke-width="2"/>
      <polygon points="50,10 85,40 50,40" fill="#A8DAFF"/>
      <polygon points="50,10 15,40 50,40" fill="#B8E0FF"/>
      <line x1="15" y1="40" x2="85" y2="40" stroke="#5BA3D9" stroke-width="2"/>
      <line x1="50" y1="10" x2="50" y2="40" stroke="#5BA3D9" stroke-width="1" opacity="0.5"/>
      <polygon points="50,40 30,40 50,110" fill="#6BB5E0" opacity="0.3"/>
    </svg>
  `),
};

/**
 * Get the SVG data URL for a prop item.
 * Returns undefined if no SVG exists for the item.
 */
export function getPropImage(item: PhotoItem): string | undefined {
    return PROP_SVGS[item.id];
}
