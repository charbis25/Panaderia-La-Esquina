@echo off
echo Convirtiendo archivos XCF a PNG...

REM Verificar si GIMP está instalado
where gimp-2.10.exe >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: GIMP no está instalado o no está en el PATH
    echo Por favor instala GIMP desde https://www.gimp.org/
    pause
    exit /b 1
)

REM Crear script de GIMP para conversión
echo (let* ((image (car (gimp-file-load RUN-NONINTERACTIVE "client/Diseños/Desktop/carrito.xcf" "client/Diseños/Desktop/carrito.xcf"))) > convert_script.scm
echo        (drawable (car (gimp-image-get-active-layer image)))) >> convert_script.scm
echo   (gimp-file-save RUN-NONINTERACTIVE image drawable "client/Diseños/Desktop/carrito.png" "client/Diseños/Desktop/carrito.png") >> convert_script.scm
echo   (gimp-image-delete image)) >> convert_script.scm

echo Script de conversión creado. Ejecutando GIMP...
gimp-2.10.exe -i -b "(load \"convert_script.scm\")" -b "(gimp-quit 0)"

echo Conversión completada!
pause 