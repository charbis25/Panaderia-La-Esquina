#!/usr/bin/env python3
"""
Script para convertir archivos XCF a PNG usando GIMP
"""

import os
import subprocess
import sys

def crear_script_gimp():
    """Crea un script de GIMP para convertir todos los archivos XCF"""
    
    archivos_xcf = [
        "client/Diseños/Desktop/carrito.xcf",
        "client/Diseños/Desktop/checkout.xcf", 
        "client/Diseños/Desktop/index.xcf",
        "client/Diseños/Desktop/login.xcf",
        "client/Diseños/Desktop/producto.xcf",
        "client/Diseños/Desktop/tienda.xcf"
    ]
    
    script_content = []
    
    for archivo_xcf in archivos_xcf:
        if os.path.exists(archivo_xcf):
            # Crear nombre de salida PNG
            archivo_png = archivo_xcf.replace('.xcf', '.png')
            
            # Agregar comandos de GIMP
            script_content.append(f"""
(let* ((image (car (gimp-file-load RUN-NONINTERACTIVE "{archivo_xcf}" "{archivo_xcf}")))
       (drawable (car (gimp-image-get-active-layer image))))
  (gimp-file-save RUN-NONINTERACTIVE image drawable "{archivo_png}" "{archivo_png}")
  (gimp-image-delete image))
""")
    
    return "".join(script_content)

def main():
    print("🔧 Generando script de conversión XCF a PNG...")
    
    # Crear script de GIMP
    script_gimp = crear_script_gimp()
    
    with open("convertir_xcf.scm", "w", encoding="utf-8") as f:
        f.write(script_gimp)
    
    print("✅ Script creado: convertir_xcf.scm")
    print("\n📋 Para usar el script:")
    print("1. Instala GIMP desde https://www.gimp.org/")
    print("2. Ejecuta el comando:")
    print("   gimp-2.10.exe -i -b \"(load \\\"convertir_xcf.scm\\\")\" -b \"(gimp-quit 0)\"")
    print("\n🎯 O simplemente abre cada archivo .xcf en GIMP y exporta como PNG")

if __name__ == "__main__":
    main() 