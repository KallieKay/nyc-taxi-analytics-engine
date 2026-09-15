Write-Host "Starting NYC Taxi Data Pipeline Setup..." -ForegroundColor Green

Write-Host "`n1. Setting up virtual environment..." -ForegroundColor Cyan
python -m venv .venv
# Activate the environment
& .\.venv\Scripts\Activate.ps1

Write-Host "`n2. Installing dependencies..." -ForegroundColor Cyan
pip install -r requirements.txt

Write-Host "`n3. Extracting Raw Bronze Data..." -ForegroundColor Cyan
python scripts\extract.py

Write-Host "`n4. Running dbt transformations (Silver & Gold)..." -ForegroundColor Cyan
cd transform_dbt
dbt run
dbt test
cd ..

Write-Host "`nPipeline execution complete! Your Medallion architecture is fully built inside transform_dbt/data/analytics.duckdb." -ForegroundColor Green