WITH trips AS (
    SELECT * FROM {{ ref('stg_taxi_trips') }}
)

SELECT
    CAST(pickup_datetime AS DATE) AS pickup_date,
    COUNT(*) AS total_trips,
    ROUND(SUM(total_amount), 2) AS daily_revenue,
    ROUND(AVG(trip_distance), 2) AS avg_trip_distance,
    ROUND(AVG(total_amount), 2) AS avg_revenue_per_trip
FROM trips
GROUP BY 1
ORDER BY pickup_date