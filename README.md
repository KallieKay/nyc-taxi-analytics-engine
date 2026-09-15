# NYC Taxi Analytics Engine 🚕

A local, end-to-end Data Engineering pipeline demonstrating modern ELT practices, data quality testing, and a Medallion architecture without cloud computing costs. 

In simple terms, it automatically downloads millions of records of NYC Taxi trips, cleans up the messy data, and calculates business insights (like daily revenue and peak tipping hours)—all on your own computer.

## 🛑 Prerequisites (Read This First)
If you are completely new to coding, don't worry! You only need two standard tools installed on your computer to run this:

1. **Python (version 3.8 or newer):** The programming language that runs the engine. You can download it from [python.org](https://www.python.org/downloads/). 
   * *⚠️ Crucial note for Windows users: When the installer opens, make sure to check the box at the very bottom that says **"Add Python to PATH"** before clicking Install.*
2. **Git:** A tool used to download this project to your machine. You can get it from [git-scm.com](https://git-scm.com/downloads).

## 🚀 How to Reproduce (Step-by-Step)

### Step 1: Download the Project
1. Open your computer's terminal:
   * **Windows:** Click the Start menu, type `PowerShell`, and hit Enter.
   * **Mac:** Press `Cmd + Space`, type `Terminal`, and hit Enter.
   * **Linux:** Press `Ctrl + Alt + T`.
2. Copy and paste this command into the terminal, then press Enter:
   ```text
   git clone [https://github.com/YOUR_USERNAME/nyc-taxi-analytics-engine.git](https://github.com/YOUR_USERNAME/nyc-taxi-analytics-engine.git)

3. Move into the new project folder by typing this and pressing Enter:

        cd nyc-taxi-analytics-engine

### Step 2: Run the Automation Script

We have created a single command that does all the heavy lifting for you (setting up a safe environment, downloading the data, and processing it). Choose the command for your operating system:

For Windows:
Type the following command and press Enter:
PowerShell

    .\run_pipeline.ps1

(Troubleshooting: If Windows gives you a red error about "running scripts is disabled", type Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass, press Enter, and then try the command above again).

For Mac and Linux:
First, give the script permission to run by typing:

    chmod +x run_pipeline.sh

Then, execute the script by typing:

    ./run_pipeline.sh

### What Problem Does This Solve?

Raw public datasets are often massive, poorly formatted, and riddled with missing or impossible values. This pipeline automatically extracts multi-million row Parquet files, cleans them, and builds optimized analytical tables that answer business questions like:

    What is our total daily revenue?

    How does demand fluctuate by hour?

    When are drivers earning the highest tip percentages?

### Architecture & Tech Stack

This project implements a strict Medallion Architecture (Bronze -> Silver -> Gold):

    Ingestion (Python): Automatically fetches raw NYC TLC Parquet files (Bronze).

    Storage & Compute (DuckDB): An embedded, high-performance analytical database.

    Transformation (dbt):

        Silver Layer (stg_taxi_trips): Cleans column names, casts data types, coalesces null passengers, and filters invalid payment codes.

        Gold Layer (marts): Aggregates cleaned data into business-ready fact tables for daily revenue and hourly tipping trends.

    Data Quality (dbt tests): Enforces strict constraints (not_null, accepted_values) to ensure downstream analytical accuracy.

### Project Structure

    nyc_taxi_pipeline/
    ├── scripts/
    │   └── extract.py              # Ingests raw Parquet data
    ├── transform_dbt/
    │   ├── models/
    │   │   ├── staging/            # Silver layer (cleaning)
    │   │   └── marts/              # Gold layer (business logic)
    │   ├── data/                   # Local DuckDB database storage
    │   └── dbt_project.yml
    ├── run_pipeline.ps1            # Windows reproduction script
    ├── run_pipeline.sh             # Mac/Linux reproduction script
    └── requirements.txt


p