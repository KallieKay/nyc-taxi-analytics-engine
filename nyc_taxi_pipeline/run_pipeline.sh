#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting NYC Taxi Data Pipeline Setup...${NC}"

echo -e "\n${CYAN}1. Setting up virtual environment...${NC}"
python3 -m venv .venv
# Activate the environment (Mac/Linux syntax)
source .venv/bin/activate

echo -e "\n${CYAN}2. Installing dependencies...${NC}"
pip install -r requirements.txt

echo -e "\n${CYAN}3. Extracting Raw Bronze Data...${NC}"
# Use forward slashes for paths in Mac/Linux
python scripts/extract.py

echo -e "\n${CYAN}4. Running dbt transformations (Silver & Gold)...${NC}"
cd transform_dbt || exit
dbt run
dbt test
cd ..

echo -e "\n${GREEN}Pipeline execution complete! Your Medallion architecture is fully built inside transform_dbt/data/analytics.duckdb.${NC}"