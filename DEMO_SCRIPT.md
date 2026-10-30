# 🚕 NYC Taxi Analytics Engine — Technical Demo Script & Oral Presentation Guide

A comprehensive, 5-to-8 minute oral presentation script and live demonstration guide designed for **data engineering coursework evaluations, professors, teaching assistants, and technical peers**.

---

## 📋 Executive Presentation Overview

| Item | Details |
| :--- | :--- |
| **Project Title** | NYC Taxi Analytics Engine |
| **Architecture** | Medallion Architecture (Bronze Ingestion → Silver Cleaning & Testing → Gold Business Marts) |
| **Core Stack** | Python (Extraction), DuckDB (Vectorized OLAP Compute), dbt (Data Transformation & Contracts), React/Vite (Serving Layer) |
| **Target Audience** | Technical (Professors, TAs, Data Engineering peers) |
| **Total Duration** | **5 to 8 Minutes** (Paced for clarity, rigor, and live interaction) |
| **Goal** | Demonstrate practical mastery of modern ELT patterns, zero-copy columnar analytical processing, automated schema testing, and data contract enforcement at multi-million row scale. |

---

## ⏱️ Stopwatch Timeline & Section Breakdown

| Time Elapsed | Segment | Focus Area | Live UI Action |
| :--- | :--- | :--- | :--- |
| **0:00 - 1:00** | 1. The Hook & The Problem | The problem with public Big Data & why local ELT matters | Show Analytics Dashboard top KPIs |
| **1:00 - 2:30** | 2. Architecture & Tech Stack | Medallion Pattern, DuckDB vectorized compute, dbt | Switch to **Medallion Architecture & Tests** tab |
| **2:30 - 4:00** | 3. Live Pipeline & Quality Gate | Ingestion, filtering dirty records, dbt tests (`not_null`, `accepted_values`) | Click **Re-run ELT Pipeline & Tests** button |
| **4:00 - 5:30** | 4. Analytical Marts & Findings | Peak tipping hours, airport dawn runs, Friday demand climax | Switch to **Analytics Dashboard** & filter metrics |
| **5:30 - 6:30** | 5. Data Tables & SQL Models | Code inspection, `NULLIF()` zero-division guard, RFC-4180 CSV export | Switch to **SQL Models** tab, then **Data Tables** |
| **6:30 - 7:30+**| 6. Wrap-up & Q&A Defense | Cost efficiency, production scalability roadmap, open floor | Open floor for Professor / TA questions |

---

## 🎤 Verbatim Speaking Script & UI Demonstration Guide

---

### Segment 1: The Hook & The Problem Statement
**⏱️ Time: 0:00 – 1:00 (1 Minute)**  
**Screen to Show:** Start on the default **"Analytics Dashboard"** tab.

#### 🖱️ Action:
*Have the dashboard open. Gesture to the top KPI cards showing **$79.88M Revenue**, **2.99M Cleaned Trips**, and **19.8% Average Tip**.*

#### 🗣️ Spoken Script:
> "Hello everyone. Today I'm presenting the **NYC Taxi Analytics Engine**, an end-to-end modern Data Engineering pipeline.
>
> In data engineering, public datasets like the New York City Taxi & Limousine Commission are legendary—they contain hundreds of millions of trip records. But in the real world, raw data is messy: it has null values, corrupted timestamps, zero-dollar passenger fares, and negative trip distances.
>
> Historically, processing a dataset of this magnitude required spinning up an expensive cloud cluster like AWS EMR, Snowflake, or Databricks, incurring substantial cloud costs.
>
> For this project, my goal was to build a production-grade, local **ELT pipeline** using a strict **Medallion Architecture**—leveraging **DuckDB** for in-process vectorized columnar compute, and **dbt** for declarative SQL modeling and automated data quality testing. The pipeline ingests over **3 million raw trip records** from January 2023, purges invalid data, runs automated quality tests, and generates analytics marts answering key operational and revenue questions—all with zero cloud infrastructure bills."

---

### Segment 2: Architecture & Tech Stack Deep-Dive
**⏱️ Time: 1:00 – 2:30 (1.5 Minutes)**  
**Screen to Show:** Click on the **"Medallion Architecture & Tests"** tab in the top navigation.

#### 🖱️ Action:
*Point to the three architecture cards on screen: **🥉 Bronze Ingestion**, **🥈 Silver Cleaning**, and **🥇 Gold Business Marts**.*

#### 🗣️ Spoken Script:
> "Let's examine the architectural pipeline design. We follow the industry-standard **Medallion Architecture**:
>
> **1. First, the Bronze Layer (Raw Ingestion):**
> Our Python ingestion script extracts the raw Yellow Taxi Parquet files from the NYC TLC Cloudfront mirror. We store it exactly as it arrives in binary Parquet format with Snappy compression—preserving the immutable source of truth.
>
> **2. Second, the Silver Layer (Cleaning & Conformance):**
> This is orchestrated through **dbt** in `stg_taxi_trips.sql`. We use DuckDB's native `read_parquet()` function, which executes zero-copy memory-mapped reads. Here, we enforce schema types, rename legacy vendor columns into clean snake_case, apply fallback coalesce rules—replacing null passenger counts with 1—and filter out impossible physical records like zero-mile trips and negative fares. Out of 3.06 million raw rows, this stage filters out approximately 75,000 corrupt records.
>
> **3. Third, the Gold Layer (Business Marts):**
> Downstream models aggregate the clean Silver data into specialized analytical marts: `fct_daily_revenue` for executive tracking and `fct_peak_hours_tipping` for driver dispatch optimization.
>
> Why DuckDB and dbt? DuckDB gives us columnar vectorization similar to Apache Arrow, executing analytical aggregations across millions of rows in milliseconds, while dbt provides software engineering best practices: version-controlled transformations, lineage tracking, and automated testing."

---

### Segment 3: Live Pipeline Execution & Data Quality Gate
**⏱️ Time: 2:30 – 4:00 (1.5 Minutes)**  
**Screen to Show:** Stay on **"Medallion Architecture & Tests"**.

#### 🖱️ Action:
*Click the **"Re-run ELT Pipeline & Tests"** button in the top right. Watch the console log output roll in, and point out the green **"5/5 Passed"** badge on the right.*

#### 🗣️ Spoken Script:
> "Now, let's watch the pipeline run live. I'm going to trigger a complete pipeline execution.
>
> *(Click the button)*
>
> Look at the terminal console on the left:
> - First, the Bronze layer validates the Parquet stream—3,066,762 raw records.
> - Second, dbt compiles and executes `stg_taxi_trips`. Notice the log: 75,282 invalid rows dropped due to zero-distance or non-positive fares.
> - Third, the Gold marts materialize: `fct_daily_revenue` and `fct_peak_hours_tipping`.
> - And fourth—this is critical for production data engineering—**dbt tests**.
>
> Look at the right panel: our data contracts are enforced via `schema.yml`. We test that `vendor_id`, `pickup_datetime`, and `passenger_count` are strictly `not_null`. Furthermore, we run an `accepted_values` test on `payment_type` ensuring every record strictly matches TLC payment codes 1 through 6.
>
> If a vendor submits unexpected payment codes or corrupted null timestamps, dbt fails the build immediately, preventing downstream dashboard corruption. All 5 tests passed with 100% compliance."

---

### Segment 4: Analytical Marts, Visualizations & Real-World Findings
**⏱️ Time: 4:00 – 5:30 (1.5 Minutes)**  
**Screen to Show:** Switch back to the **"Analytics Dashboard"** tab.

#### 🖱️ Action:
*1. Scroll down to the **Daily Revenue Trends** chart.*  
*2. Click the date filter buttons: show **All Month**, then click **Weekends**, then click **Jan 15-21**.*  
*3. Click the **"Download CSV"** button next to the filters and show the instant download confirmation.*  
*4. Use the category selector below to switch between **"Hourly Patterns"** and **"Fleet & Passengers"**.*

#### 🗣️ Spoken Script:
> "Now let's examine the analytical insights produced by our Gold marts.
>
> On the top chart, we have **Daily Revenue Trends**. You can see the revenue cadence across January 2023. Notice Friday, January 27—it generated the monthly revenue peak of **$3.11 million** across 112,000 trips.
>
> We also implemented dynamic serving-layer filtering. I can filter exclusively to **Weekends** or specific 7-day intervals, and click **Download CSV** to immediately export an RFC-4180 compliant CSV of the active data slice for downstream reporting.
>
> Scrolling down, we have our multi-metric analytical marts:
> - **Peak Tipping Hours (Viridis Scale):** Calculated as `AVG(tip_amount / NULLIF(fare_amount, 0)) * 100`. Notice that tipping percentages peak late at night—hitting **21.75% at 9:00 PM (21:00)**—predominantly driven by evening dining and entertainment routes in Manhattan.
> - **Demand by Hour (Blues Scale):** Commuter volume peaks sharply at **6:00 PM (18:00)** with over 225,000 trips.
> - **Average Trip Distance by Hour:** In the early morning hours between 4:00 AM and 5:00 AM, average trip distance spikes to **4.35 miles**. Why? Because morning outbound airport runs to JFK and LaGuardia dominate light dawn highway traffic.
> - **Passenger & Payment Distributions:** 72% of all trips are solo riders, and credit card payments account for **81.1% of transactions**."

---

### Segment 5: SQL Engineering & Code Inspection
**⏱️ Time: 5:30 – 6:30 (1 Minute)**  
**Screen to Show:** Click on the **"SQL Models & Schema"** tab.

#### 🖱️ Action:
*Toggle between `stg_taxi_trips.sql`, `fct_peak_hours_tipping.sql`, and `schema.yml`. Point out the `NULLIF` clause in the SQL.*

#### 🗣️ Spoken Script:
> "Let's look at the underlying SQL engineering under the **SQL Models** tab.
>
> In `stg_taxi_trips.sql`, notice how we use common table expressions (CTEs) to isolate the raw ingestion from our business transformations. We use `COALESCE(CAST(passenger_count AS INTEGER), 1)` so that trips with missing passenger numbers aren't discarded if their payment and coordinates are valid.
>
> In `fct_peak_hours_tipping.sql`, observe this specific clause:
> `ROUND(AVG(tip_amount / NULLIF(fare_amount, 0)) * 100, 2) AS avg_tip_percentage`
>
> In production data pipelines, dividing by zero crashes pipelines. Using `NULLIF(fare_amount, 0)` ensures that any zero-fare trip returns `NULL` rather than throwing a runtime floating-point exception during aggregation.
>
> Finally, our `schema.yml` serves as the declarative testing manifest that verifies these models on every dbt run."

---

### Segment 6: Conclusion & Technical Q&A Defense
**⏱️ Time: 6:30 – 7:30+ (1 Minute)**  
**Screen to Show:** Switch to **"Gold & Silver Data Tables"** tab to show the raw data tables ready for inspection.

#### 🗣️ Spoken Script:
> "To summarize:
> We took over 3 million raw, uncleaned public transportation records, built an automated Medallion data engineering pipeline using DuckDB and dbt, enforced rigorous schema validation tests, and surfaced the resulting marts through an interactive serving layer with sub-second query times—all running locally without external server costs.
>
> Thank you, and I would be happy to take any questions on the pipeline architecture, SQL models, or data quality framework."

---

## 🛡️ Professor & TA Q&A Defense Cheat Sheet

Be ready for these common technical questions:

### Q1: "Why did you choose DuckDB over a traditional relational database like PostgreSQL or a distributed engine like Spark?"
> **Your Answer:**  
> *"PostgreSQL is a row-oriented OLTP database designed for transactional integrity (ACID) with high concurrency writes, not large analytical aggregations. Querying 3 million rows in Postgres requires scanning row-by-row, which is memory-intensive and slow without extensive indexing.  
> On the other hand, Apache Spark is designed for distributed computing across multiple nodes. For 3 million rows (around 150MB compressed Parquet), Spark introduces massive JVM overhead, network serialization, and cluster spin-up lag.  
> DuckDB is the 'SQLite for Analytics'—it is an in-process, columnar, vectorized execution engine. It can read Parquet files directly using memory-mapped zero-copy operations and executes SIMD vector instructions, allowing us to aggregate 3 million rows in less than a second on a laptop."*

### Q2: "Why ELT instead of traditional ETL?"
> **Your Answer:**  
> *"In legacy ETL, data was transformed by an external tool (like Python scripts or an ETL server) before being loaded into the database. This meant data loss if the transformation logic changed, and limited scalability.  
> In modern ELT, we extract and load the raw Parquet directly into Bronze storage without alteration. Then, we use dbt and the database's own query engine (DuckDB) to perform transformations in SQL. This preserves the immutable raw data, allows idempotent rebuilds, and leverages the database's optimized columnar engine for transformations."*

### Q3: "How does the pipeline handle nulls and dirty data?"
> **Your Answer:**  
> *"We handle dirty data in three specific defensive layers:  
> 1. **Schema Standardization:** Explicit type casting (`CAST(passenger_count AS INTEGER)`).  
> 2. **Fallback Imputation:** `COALESCE(passenger_count, 1)` replaces missing values with the realistic default of 1 passenger.  
> 3. **Defensive Filtering:** `trip_distance > 0 AND fare_amount > 0` removes test trips, odometer errors, and voids.  
> 4. **Runtime Math Guards:** `NULLIF(fare_amount, 0)` prevents division-by-zero errors when calculating tip percentages."*

### Q4: "How would this pipeline scale if we went from 1 month (3M rows) to 10 years (500M+ rows) in a production company?"
> **Your Answer:**  
> *"The beauty of this dbt design is that our transformation SQL code does not need to change. To scale to 500 million rows:  
> 1. **Storage:** We would partition the Parquet files in an object store (like Amazon S3 or Google Cloud Storage) by `year=YYYY/month=MM`.  
> 2. **Compute:** We could point dbt from DuckDB to a cloud data warehouse like Snowflake, BigQuery, or Databricks simply by switching the `profiles.yml` adapter.  
> 3. **Incremental Models:** We would configure dbt to run as `incremental` rather than `table`, using `is_incremental()` macros so the pipeline only processes new daily partitions rather than scanning the entire 10-year history on every run."*

### Q5: "What is an `accepted_values` test and why is it important?"
> **Your Answer:**  
> *"It's a categorical data contract test in dbt. In the NYC TLC dataset, the `payment_type` column is an integer code where 1 is Credit Card, 2 is Cash, 3 is No Charge, 4 is Dispute, 5 is Unknown, and 6 is Voided. The `accepted_values` test acts as a gatekeeper: if a taxi meter vendor introduces an undocumented code (like 9 or 99), dbt immediately flags an error in CI/CD before bad data leaks into financial reports."*

---

## 💡 Quick Tips for High Marks

1. **Speak with confidence about numbers:** Mention **3,066,762 raw records**, **75,282 filtered records**, and **$79.88M total January 2023 revenue**.
2. **Use Data Engineering keywords:** Say *"Medallion architecture"*, *"idempotent runs"*, *"vectorized execution"*, *"schema contracts"*, and *"zero-copy Parquet scans"*.
3. **Show, don't just tell:** When you mention dbt tests, actually click the **Re-run Pipeline** button and let the evaluators see the green pass badges and live logs.
