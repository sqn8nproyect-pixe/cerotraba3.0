#!/bin/bash
# Genera las 8 imágenes de servicios de CeroTraba (estilo morado/cian de marca).
# Resumible: salta las imágenes que ya existen en public/servicios/.
set -u

OUT="/home/z/my-project/public/servicios"
TMP="/home/z/my-project/scripts/tmp-servicios"
mkdir -p "$OUT" "$TMP"

BASE=", fotografía profesional premium, ambiente tecnológico moderno, iluminación ambiental en tonos morado y cian, composición limpia y ordenada, sin texto ni letras ni números legibles, alta calidad, muy detallada"

declare -A PROMPTS=(
  [automatizacion]="Flujo de automatización digital en una oficina moderna: monitor grande con diagrama de nodos y conexiones brillantes, líneas de luz que conectan aplicaciones flotantes${BASE}"
  [cctv]="Cámara de seguridad CCTV moderna de diseño blanco elegante montada en el techo interior de un local comercial luminoso, la cámara como protagonista del encuadre${BASE}"
  [web]="Laptop moderna sobre escritorio minimalista mostrando el diseño de una página web con secciones y botones claros, maqueta limpia en pantalla${BASE}"
  [redes]="Escritorio de gestión de redes sociales con smartphone y gráficos de crecimiento flotantes, iconos abstractos de interacciones y gráficas ascendentes brillantes${BASE}"
  [soporte]="Técnico de soporte informático con auriculares reparando una computadora de escritorio abierta en un taller tecnológico ordenado y luminoso${BASE}"
  [cableado]="Rack de red perfectamente organizado con cables ethernet de colores ordenados y etiquetados, switches con luces LED cian encendidas${BASE}"
  [interconexion]="Dos edificios de oficinas modernos conectados de noche por un enlace de luz brillante entre sus azoteas, red luminosa morada y cian cruzando la ciudad${BASE}"
  [wifi]="Router WiFi moderno blanco con antenas sobre una mesa de oficina, ondas de señal inalámbrica visibles irradiando en luz cian y morada${BASE}"
)

FAIL=0
for name in automatizacion cctv web redes soporte cableado interconexion wifi; do
  jpg="$OUT/$name.jpg"
  if [ -s "$jpg" ]; then
    echo "== $name: ya existe, se omite"
    continue
  fi
  echo "== Generando $name ..."
  if z-ai image -p "${PROMPTS[$name]}" -o "$TMP/$name.png" -s 1152x864; then
    # Redimensionar a 832px de ancho y comprimir a JPG para web
    ffmpeg -y -loglevel error -i "$TMP/$name.png" -vf scale=832:-2 -q:v 4 "$jpg" \
      && echo "   OK -> $jpg ($(du -h "$jpg" | cut -f1))" \
      || { echo "   ERROR convirtiendo $name"; FAIL=1; }
  else
    echo "   ERROR generando $name"
    FAIL=1
  fi
done

echo "---"
ls -la "$OUT"
exit $FAIL
