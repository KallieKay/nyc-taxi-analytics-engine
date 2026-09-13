WITH trips AS (
    SELECT * FROM {{ ref('stg_taxi_trips') }}
)

SELECT
    -- Extract the hour of the day (0-23)
    EXTRACT(HOUR FROM pickup_datetime) AS hour_of_day,
    COUNT(*) AS total_trips,
    ROUND(SUM(total_amount), 2) AS total_revenue,
    -- Calculate tip percentage, using NULLIF to prevent division by zero
    ROUND(AVG(tip_amount / NULLIF(fare_amount, 0)) * 100, 2) AS avg_tip_percentage,
    ROUND(AVG(trip_distance), 2) AS avg_trip_distance
FROM trips
-- Ensure we are only looking at trips that actually had a fare
WHERE fare_amount > 0
GROUP BY 1
ORDER BY hour_of_day