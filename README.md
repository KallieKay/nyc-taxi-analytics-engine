# NYC Taxi Analytics Engine 🚕

An interactive React analytics dashboard and Medallion Data Pipeline visualizer ported from Python (Streamlit + DuckDB + dbt) into a modern, high-performance React application.

This application replicates and expands upon the analytical models, business metrics, and data visualizations of the NYC Yellow Taxi ELT pipeline (analyzing 3+ million trips from January 2023), featuring diurnal gratuity patterns, rush-hour passenger demand, payment channel distributions, and pipeline data quality testing.

---

## 🎯 Key Features & Graph Metrics

### 1. 📈 Daily Revenue Trends & Instant CSV Export
- **Plotly Express-Style Line Chart**: High-resolution line plot with individual data markers and detailed tooltips (`daily_revenue`, `total_trips`, `avg_trip_distance`, `avg_revenue_per_trip`).
- **Date Range Filters**: Granular filter chips for the entire month of January, individual weeks (Jan 1–7, Jan 8–14, Jan 15–21, Jan 22–31), or weekends only.
- **Contextual CSV Export**: Dedicated `"Download CSV"` button directly in the chart toolbar that exports the currently filtered daily revenue slice with clean headers.

### 2. 🕒 Diurnal & Hourly Gratuity Marts (24 Hours: 0–23)
- **Peak Tipping Hours**: Bar chart with a continuous **Viridis color gradient** (`#440154` to `#fde725`), highlighting peak gratuity hours (peaking at **21.75% at 9:00 PM**).
- **Demand by Hour**: Bar chart with a continuous **Blues color gradient** (`#c6dbef` to `#084594`), tracking commuter volume surges (peaking at **225,000+ trips at 6:00 PM**).
- **Avg Trip Distance by Hour**: Continuous **Amber-Flame scale** demonstrating how light early morning traffic and airport runs yield longer journeys (**4.35 miles at 5:00 AM**) compared to dense mid-day city trips (~3.1 miles).

### 3. 👥 Fleet Demographics & Weekly Dynamics
- **Trips & Fare by Passenger Count**: Analyzes party sizes (1 to 6 riders) and enforces the Silver-layer `COALESCE(passenger_count, 1)` rule. Confirms that **72.0% of trips are solo passengers**, while group trips (5–6 riders) average $25.00+ fares.
- **Payment Method & Electronic Tip Share**: Breaks down volume and revenue across payment types (`Credit Card`, `Cash`, `No Charge`, `Dispute`), highlighting that cards account for **81.1% of transactions** with a 21.65% digital tip average.
- **Day of Week Revenue**: Compares weekly rhythms from Sunday through Saturday, showcasing Friday's revenue peak (**$13.4M across 485k trips**).

### 4. 🥇 Gold & 🥈 Silver Data Explorer
- Complete search, column sorting, and instant CSV export across 6 distinct tables:
  - `main.fct_daily_revenue` (Gold mart: 31 daily rows)
  - `main.fct_peak_hours_tipping` (Gold mart: 24 hourly rows)
  - `main.passenger_distribution` (Party size aggregations)
  - `main.payment_breakdown` (Payment type volume and tip shares)
  - `main.day_of_week_revenue` (Weekly revenue distributions)
  - `main.stg_taxi_trips` (Cleaned Silver layer sample trips with route zones)

### 5. 🏗️ Medallion Pipeline Architecture & dbt Test Suite
- **Visual Data Flow**:
  ```
  NYC TLC Parquet  ──►  Bronze (raw)  ──►  Silver (stg_taxi_trips)  ──►  Gold (marts)
     (download)          (DuckDB)              (cleaned)                (aggregated)
  ```
- **Execution Console**: Interactive runner simulating the 4-step ELT process (`extract.py` → `stg_taxi_trips.sql` → `marts/` → `dbt test`).
- **Data Quality Validator**: Real-time pass/fail status for dbt schema tests:
  - `vendor_id`: `not_null` (PASS, 0 null records)
  - `pickup_datetime`: `not_null` (PASS, 0 null timestamps)
  - `passenger_count`: `not_null` (PASS, `COALESCE(passenger_count, 1)` enforced)
  - `payment_type`: `not_null` & `accepted_values` in `[1, 2, 3, 4, 5, 6]` (PASS, 100% compliance)

### 6. 🔍 SQL Models & Schema Inspector
- Interactive viewer and one-click clipboard copy for the actual dbt transformation SQL models:
  - `models/staging/stg_taxi_trips.sql`
  - `models/marts/fct_daily_revenue.sql`
  - `models/marts/fct_peak_hours_tipping.sql`
  - `models/staging/schema.yml`

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 6 (configured for cloud sandbox hosting with `allowedHosts: true`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Charts & Visualization**: Recharts with custom continuous color scales (Viridis, Blues, Amber Flame)
- **Icons**: Lucide React

---

## 🚀 Development & Reproduction

### Prerequisites
- Node.js 20+
- npm

### Installation & Run
```bash
# Install dependencies
npm install

# Start local development server on port 3000
npm run dev

# Run type checker
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📜 Attribution

- **Data Source**: [NYC Taxi & Limousine Commission (TLC) Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) — Yellow Taxi January 2023 public dataset.
- **Original Project**: Local Data Engineering Medallion pipeline using DuckDB and dbt.