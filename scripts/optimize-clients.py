"""Optimiza las capturas de los clientes chilenos para public/clientes/."""
from PIL import Image
import os

os.makedirs("public/clientes", exist_ok=True)

jobs = [
    ("shots/cliente-sepulturas.png", "public/clientes/sepulturas-en-oferta.jpg"),
    ("shots/sg-thumio2.jpg", "public/clientes/funeraria-san-gabriel.jpg"),
]

for src, dst in jobs:
    im = Image.open(src).convert("RGB")
    # recorte 16:10 centrado al ancho
    w, h = im.size
    target_h = int(w * 10 / 16)
    if h > target_h:
        top = max(0, (h - target_h) // 3)  # conserva más la parte superior (nav + hero)
        im = im.crop((0, top, w, top + target_h))
    im = im.resize((900, int(900 * im.size[1] / im.size[0])), Image.LANCZOS)
    im.save(dst, "JPEG", quality=80, optimize=True, progressive=True)
    print(f"{dst}: {im.size[0]}x{im.size[1]} — {os.path.getsize(dst)//1024} KB")
