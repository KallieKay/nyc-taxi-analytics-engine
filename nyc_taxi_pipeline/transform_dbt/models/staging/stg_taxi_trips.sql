WITH raw_taxi AS (
    SELECT * FROM read_parquet('../data/raw/*.parquet')
)

SELECT
    VendorID AS vendor_id,
    tpep_pickup_datetime AS pickup_datetime,
    tpep_dropoff_datetime AS dropoff_datetime,
    -- COALESCE replaces NULL values with 1
    COALESCE(CAST(passenger_count AS INTEGER), 1) AS passenger_count,
    CAST(trip_distance AS DOUBLE) AS trip_distance,
    PULocationID AS pickup_location_id,
    DOLocationID AS dropoff_location_id,
    payment_type,
    fare_amount,
    tip_amount,
    total_amount
FROM raw_taxi
WHERE trip_distance > 0 
  AND fare_amount > 0
  -- Filter out the invalid payment type codes
  AND payment_type IN (1, 2, 3, 4, 5, 6)