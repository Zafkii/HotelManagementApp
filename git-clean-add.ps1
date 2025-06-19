# Asegura que estamos en una carpeta con Git inicializado
if (!(Test-Path .git)) {
    git init
    Write-Host "Git repo inicializado."
}

# Verifica que .gitignore existe
if (!(Test-Path .gitignore)) {
    Write-Host ".gitignore no encontrado. Por favor, crea uno primero." -ForegroundColor Red
    exit 1
}

# Limpia archivos ya añadidos pero que están en .gitignore
$ignoredFiles = git ls-files --cached --ignored --exclude-standard
if ($ignoredFiles) {
    $ignoredFiles | ForEach-Object { git rm --cached $_ }
    Write-Host "🧹 Archivos ignorados eliminados del staging."
}

# Añade todos los archivos respetando .gitignore
git add .

Write-Host "✅ Archivos añadidos con .gitignore respetado." -ForegroundColor Green
