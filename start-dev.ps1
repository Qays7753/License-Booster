# أوقف جميع عمليات node أولاً
Write-Host "Stopping all Node processes..." -ForegroundColor Yellow
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# انتقل للمجلد الصحيح
Set-Location -Path $PSScriptRoot

# شغّل الخادم
Write-Host "Starting dev server..." -ForegroundColor Green
npx pnpm --filter "@workspace/formalization-landing" run dev
