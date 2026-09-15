# NYC Taxi Analytics Engine 🚕

A local, end-to-end Data Engineering pipeline demonstrating modern ELT practices, data quality testing, and a Medallion architecture — all without cloud computing costs.

In simple terms: it automatically downloads millions of NYC Taxi trip records, cleans up messy data, and calculates business insights (like daily revenue and peak tipping hours) — entirely on your own computer.

---

## 🛑 Prerequisites (Read This First)

If you are completely new to coding, don't worry — you only need two standard tools installed:

1. **Python (version 3.8 or newer):** The programming language that runs the engine. Download it from [python.org](https://www.python.org/downloads/).
   * *⚠️ Crucial note for Windows users: When the installer opens, make sure to check the box at the very bottom that says **"Add Python to PATH"** before clicking Install.*
2. **Git:** A tool used to download this project to your machine. Get it from [git-scm.com](https://git-scm.com/downloads).

> **Verify your installation** by opening a terminal and running:
> ```bash
> python --version
> git --version
> ```
> Both commands should print a version number. If not, revisit the installers above.

---

## 🚀 How to Reproduce (Step-by-Step)

### Step 1: Download the Project

1. Open your computer's terminal:
   * **Windows:** Click the Start menu, type `PowerShell`, and press Enter.
   * **Mac:** Press `Cmd + Space`, type `Terminal`, and press Enter.
   * **Linux:** Press `Ctrl + Alt + T`.

2. Clone the repository (replace `YOUR_USERNAME` with the actual GitHub username hosting this project):

   ```bash
   git clone https://github.com/YOUR_USERNAME/nyc-taxi-analytics-engine.git
   ```

3. Move into the project folder:

   ```bash
   cd nyc-taxi-analytics-engine
   ```

### Step 2: Run the Automation Script

A single command does all the heavy lifting for you: it creates an isolated virtual environment, installs dependencies, downloads the raw data, and runs the full transformation pipeline.

**For Windows (PowerShell):**

```powershell
.\run_pipeline.ps1
```

> **Troubleshooting:** If Windows returns a red error about *"running scripts is disabled on this system"*, run the following command once, then retry:
> ```powershell
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```

**For Mac and Linux:**

```bash
chmod +x run_pipeline.sh
./run_pipeline.sh
```

> **Note:** The first run may take several minutes — it downloads multi-million row Parquet files from the NYC TLC public dataset.

---

## 🎯 What Problem Does This Solve?

Raw public datasets are often massive, poorly formatted, and riddled with missing or impossible values. This pipeline automatically extracts multi-million row Parquet files, cleans them, and builds optimized analytical tables that answer business questions like:

* What is our total daily revenue?
* How does demand fluctuate by hour of the day?
* When are drivers earning the highest tip percentages?

---

## 🏗️ Architecture & Tech Stack

This project implements a strict **Medallion Architecture** (Bronze → Silver → Gold):

| Layer | Purpose | Tool |
|-------|---------|------|
| **🥉 Bronze** — Ingestion | Fetches raw NYC TLC Parquet files | Python |
| **🥈 Silver** — Cleaning | Renames columns, casts types, coalesces nulls, filters invalid records | dbt (`stg_taxi_trips`) |
| **🥇 Gold** — Business Logic | Aggregates cleaned data into fact tables for daily revenue and hourly tipping trends | dbt (`marts`) |

**Supporting stack:**

* **Storage & Compute:** [DuckDB](https://duckdb.org/) — an embedded, high-performance analytical database (no server required).
* **Data Quality:** [dbt tests](https://docs.getdbt.com/docs/build/tests) enforce strict constraints (`not_null`, `accepted_values`) to guarantee downstream analytical accuracy.

### Data Flow

```
NYC TLC Parquet  ──►  Bronze (raw)  ──►  Silver (stg_taxi_trips)  ──►  Gold (marts)
   (download)          (DuckDB)              (cleaned)                (aggregated)
```

---

## 📁 Project Structure

```
nyc-taxi-analytics-engine/
├── scripts/
│   └── extract.py              # Ingests raw Parquet data into Bronze
├── transform_dbt/
│   ├── models/
│   │   ├── staging/            # Silver layer (cleaning)
│   │   └── marts/              # Gold layer (business logic)
│   ├── data/                   # Local DuckDB database storage
│   └── dbt_project.yml
├── run_pipeline.ps1            # Windows reproduction script
├── run_pipeline.sh             # Mac/Linux reproduction script
└── requirements.txt
```

---

## 🔍 Verifying the Output

After a successful run, you can explore the generated tables using DuckDB's CLI:

```bash
duckdb transform_dbt/data/nyc_taxi.duckdb
```

Then, inside the DuckDB prompt:

```sql
SHOW TABLES;
SELECT * FROM main_marts.daily_revenue LIMIT 10;
SELECT * FROM main_marts.hourly_tips LIMIT 10;
```

*(Table names may vary slightly — run `SHOW TABLES;` to confirm.)*

---

## 🛠️ Troubleshooting

| Symptom | Fix |
|---------|-----|
| `python: command not found` | Reinstall Python and ensure "Add Python to PATH" is checked (Windows) or `python3` is available (Mac/Linux). |
| `Permission denied` on `run_pipeline.sh` | Run `chmod +x run_pipeline.sh` first. |
| `running scripts is disabled` (Windows) | Run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in the same PowerShell session. |
| Download fails midway | Re-run the script — the ingestion step is idempotent and will skip files already present. |

---

## 📜 License & Attribution

Data source: [NYC Taxi & Limousine Commission (TLC) Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) — publicly available.

Built as a Data Engineering elective project.