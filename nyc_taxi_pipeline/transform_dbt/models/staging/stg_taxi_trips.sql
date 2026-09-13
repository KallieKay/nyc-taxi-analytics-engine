WITH raw_taxi AS (
    -- DuckDB reads the Parquet file directly from your raw data folder
    SELECT * FROM read_parquet('../data/raw/*.parquet')
)

SELECT
    VendorID AS vendor_id,
    tpep_pickup_datetime AS pickup_datetime,
    tpep_dropoff_datetime AS dropoff_datetime,
    CAST(passenger_count AS INTEGER) AS passenger_count,
    CAST(trip_distance AS DOUBLE) AS trip_distance,
    PULocationID AS pickup_location_id,
    DOLocationID AS dropoff_location_id,
    payment_type,
    fare_amount,
    tip_amount,
    total_amount
FROM raw_taxi
-- Basic data quality filters: remove impossible trips
WHERE trip_distance > 0 
  AND fare_amount > 0