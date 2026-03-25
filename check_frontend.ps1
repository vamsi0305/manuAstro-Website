Write-Host "--- BUILD ---"
npm run build
Write-Host "--- LINT ---"
npm run lint
Write-Host "--- TSC ---"
npx tsc --noEmit
Write-Host "--- NPM LS ---"
npm ls --depth=0
Write-Host "--- GIT HUB ---"
git status
git log --oneline -10
Write-Host "--- LOCAL SERVERS ---"
$health = curl.exe -s http://localhost:8000/health
Write-Host "Backend: $health"
$front = curl.exe -s http://localhost:5173 | Select-Object -First 20
Write-Host "Frontend response: $front"
