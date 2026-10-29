#!/bin/bash
# Imagen Open Graph de CeroTraba: fondo AI 1440x720 -> recorte 1200x630 + texto de marca
set -e
TMP="/home/z/my-project/scripts"
OUT="/home/z/my-project/public/og-cerotraba.jpg"

if [ ! -s "$TMP/og-raw.png" ]; then
  # La API exige dimensiones múltiplos de 32 (720 no lo es) -> 1440x704, fallback 1344x768
  z-ai image -p "Fondo tecnológico abstracto premium para portada de marca: red de nodos luminosos y líneas de circuito brillantes, paleta morada oscura y cian, gradiente profundo, composición con zona despejada en la mitad inferior, sin texto ni letras ni números legibles, alta calidad, muy detallada" -o "$TMP/og-raw.png" -s 1440x704 \
  || z-ai image -p "Fondo tecnológico abstracto premium para portada de marca: red de nodos luminosos y líneas de circuito brillantes, paleta morada oscura y cian, gradiente profundo, composición con zona despejada en la mitad inferior, sin texto ni letras ni números legibles, alta calidad, muy detallada" -o "$TMP/og-raw.png" -s 1344x768
fi

FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
ffmpeg -y -loglevel error -i "$TMP/og-raw.png" -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630,\
drawtext=fontfile=$FONT:text='CeroTraba':fontcolor=white:fontsize=96:x=64:y=h-240:box=1:boxcolor=0x0b1230@0.72:boxborderw=26,\
drawtext=fontfile=$FONT:text='Tecnología sin trabas · CCTV · Redes · Web · Soporte':fontcolor=0xBFD9FF:fontsize=33:x=66:y=h-98:box=1:boxcolor=0x0b1230@0.72:boxborderw=18" \
  -q:v 4 "$OUT"

echo "OK -> $OUT ($(du -h "$OUT" | cut -f1))"
