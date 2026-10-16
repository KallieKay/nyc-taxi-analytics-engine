# NYC Taxi Analytics Engine 🚕

An interactive React analytics dashboard and Medallion Data Pipeline visualizer ported from Python/Streamlit/dbt into a modern React application.

This application reproduces the analytical models, business metrics, and data visualizations of the NYC Yellow Taxi ELT pipeline (analyzing 3+ million trips from January 2023), including daily revenue trends, hourly tipping patterns, and peak passenger demand.

---

## 🎯 Features

1. **📈 Daily Revenue Trends**
   - High-fidelity line chart with markers matching Plotly Express aesthetics.
   - Interactive tooltips with revenue, total trips, average trip distance, and average revenue per trip.
   - Filterable by week or weekend presets.

2. **🕒 Peak Tipping Hours**
   - Hourly bar chart (0–23) styled with a continuous **Viridis color gradient** (`#440154` to `#fde725`).
   - Visualizes peak gratuity rates (peaking at **21.75% at 9:00 PM**).

3. **🚕 Demand by Hour**
   - Hourly bar chart (0–23) styled with a continuous **Blues color gradient** (`#c6dbef` to `#084594`).
   - Highlights commuter rush hours (peaking at **225,000+ trips at 6:00 PM**).

4. **🥇 Gold & 🥈 Silver Data Tables**
   - Explore and search the fact tables (`main.fct_daily_revenue`, `main.fct_peak_hours_tipping`) and cleaned trip records (`main.stg_taxi_trips`).
   - Column sorting and instant CSV export.

5. **🏗️ Medallion Architecture & dbt Tests**
   - Interactive pipeline visualizer tracking Bronze (Ingestion) → Silver (Cleaning) → Gold (Business Marts).
   - Live pipeline execution console with step-by-step logs and dbt schema validation tests (`not_null`, `accepted_values`).

6. **🔍 SQL Models & Schema Inspector**
   - Syntax-highlighted view and copy tool for `stg_taxi_trips.sql`, `fct_daily_revenue.sql`, `fct_peak_hours_tipping.sql`, and `schema.yml`.

---

## 🏗️ Architecture & Medallion Pipeline

```
NYC TLC Parquet  ──►  Bronze (raw)  ──►  Silver (stg_taxi_trips)  ──►  Gold (marts)
   (download)          (DuckDB)              (cleaned)                (aggregated)
```

| Layer | Purpose | Logic |
|-------|---------|-------|
| **🥉 Bronze** — Ingestion | Raw NYC TLC Parquet dataset | 3,066,762 raw records |
| **🥈 Silver** — Cleaning | Schema casting, coalesce null passengers to 1, filter invalid fares/distances | `stg_taxi_trips.sql` |
| **🥇 Gold** — Business Logic | Aggregates daily revenue trends and hourly tipping demand fact tables | `fct_daily_revenue.sql`, `fct_peak_hours_tipping.sql` |

---

## 🚀 Development & Reproduction

### Prerequisites
- Node.js 20+
- npm

### Setup & Run
```bash
# Install dependencies
npm install

# Start the dev server on port 3000
npm run dev

# Build for production
npm run build
```

---

## 📜 Attribution

Data source: [NYC Taxi & Limousine Commission (TLC) Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page).
Originally developed as a local Data Engineering pipeline with DuckDB and dbt.