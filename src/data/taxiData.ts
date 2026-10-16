import {
  DailyRevenue,
  PeakHoursTipping,
  StagingTrip,
  DbtTest,
  PipelineStage,
  PassengerDistribution,
  PaymentBreakdown,
  DayOfWeekMetric,
} from '../types';

// January 2023 Daily Revenue Fact Data (Aggregated from ~3.06 million trips)
export const DAILY_REVENUE_DATA: DailyRevenue[] = [
  { pickup_date: '2023-01-01', total_trips: 78420, daily_revenue: 1984210.50, avg_trip_distance: 3.42, avg_revenue_per_trip: 25.30 },
  { pickup_date: '2023-01-02', total_trips: 69210, daily_revenue: 1723289.00, avg_trip_distance: 3.25, avg_revenue_per_trip: 24.90 },
  { pickup_date: '2023-01-03', total_trips: 84310, daily_revenue: 2158336.00, avg_trip_distance: 3.38, avg_revenue_per_trip: 25.60 },
  { pickup_date: '2023-01-04', total_trips: 92450, daily_revenue: 2422190.00, avg_trip_distance: 3.45, avg_revenue_per_trip: 26.20 },
  { pickup_date: '2023-01-05', total_trips: 99180, daily_revenue: 2658024.00, avg_trip_distance: 3.51, avg_revenue_per_trip: 26.80 },
  { pickup_date: '2023-01-06', total_trips: 104520, daily_revenue: 2842944.00, avg_trip_distance: 3.58, avg_revenue_per_trip: 27.20 },
  { pickup_date: '2023-01-07', total_trips: 101890, daily_revenue: 2710274.00, avg_trip_distance: 3.32, avg_revenue_per_trip: 26.60 },
  { pickup_date: '2023-01-08', total_trips: 88410, daily_revenue: 2316342.00, avg_trip_distance: 3.39, avg_revenue_per_trip: 26.20 },
  { pickup_date: '2023-01-09', total_trips: 89630, daily_revenue: 2321417.00, avg_trip_distance: 3.40, avg_revenue_per_trip: 25.90 },
  { pickup_date: '2023-01-10', total_trips: 96840, daily_revenue: 2537208.00, avg_trip_distance: 3.46, avg_revenue_per_trip: 26.20 },
  { pickup_date: '2023-01-11', total_trips: 99420, daily_revenue: 2624688.00, avg_trip_distance: 3.48, avg_revenue_per_trip: 26.40 },
  { pickup_date: '2023-01-12', total_trips: 105630, daily_revenue: 2830884.00, avg_trip_distance: 3.55, avg_revenue_per_trip: 26.80 },
  { pickup_date: '2023-01-13', total_trips: 108920, daily_revenue: 2984408.00, avg_trip_distance: 3.61, avg_revenue_per_trip: 27.40 },
  { pickup_date: '2023-01-14', total_trips: 103210, daily_revenue: 2776349.00, avg_trip_distance: 3.36, avg_revenue_per_trip: 26.90 },
  { pickup_date: '2023-01-15', total_trips: 89450, daily_revenue: 2370425.00, avg_trip_distance: 3.42, avg_revenue_per_trip: 26.50 },
  { pickup_date: '2023-01-16', total_trips: 75340, daily_revenue: 1958840.00, avg_trip_distance: 3.31, avg_revenue_per_trip: 26.00 },
  { pickup_date: '2023-01-17', total_trips: 97890, daily_revenue: 2574507.00, avg_trip_distance: 3.47, avg_revenue_per_trip: 26.30 },
  { pickup_date: '2023-01-18', total_trips: 101230, daily_revenue: 2682595.00, avg_trip_distance: 3.49, avg_revenue_per_trip: 26.50 },
  { pickup_date: '2023-01-19', total_trips: 106450, daily_revenue: 2863505.00, avg_trip_distance: 3.56, avg_revenue_per_trip: 26.90 },
  { pickup_date: '2023-01-20', total_trips: 109840, daily_revenue: 3020600.00, avg_trip_distance: 3.63, avg_revenue_per_trip: 27.50 },
  { pickup_date: '2023-01-21', total_trips: 105430, daily_revenue: 2846610.00, avg_trip_distance: 3.38, avg_revenue_per_trip: 27.00 },
  { pickup_date: '2023-01-22', total_trips: 91220, daily_revenue: 2426452.00, avg_trip_distance: 3.41, avg_revenue_per_trip: 26.60 },
  { pickup_date: '2023-01-23', total_trips: 92410, daily_revenue: 2430383.00, avg_trip_distance: 3.44, avg_revenue_per_trip: 26.30 },
  { pickup_date: '2023-01-24', total_trips: 98760, daily_revenue: 2617140.00, avg_trip_distance: 3.48, avg_revenue_per_trip: 26.50 },
  { pickup_date: '2023-01-25', total_trips: 102140, daily_revenue: 2737352.00, avg_trip_distance: 3.52, avg_revenue_per_trip: 26.80 },
  { pickup_date: '2023-01-26', total_trips: 107380, daily_revenue: 2910098.00, avg_trip_distance: 3.57, avg_revenue_per_trip: 27.10 },
  { pickup_date: '2023-01-27', total_trips: 112450, daily_revenue: 3114865.00, avg_trip_distance: 3.65, avg_revenue_per_trip: 27.70 },
  { pickup_date: '2023-01-28', total_trips: 108390, daily_revenue: 2948208.00, avg_trip_distance: 3.40, avg_revenue_per_trip: 27.20 },
  { pickup_date: '2023-01-29', total_trips: 92840, daily_revenue: 2469544.00, avg_trip_distance: 3.43, avg_revenue_per_trip: 26.60 },
  { pickup_date: '2023-01-30', total_trips: 93560, daily_revenue: 2470084.00, avg_trip_distance: 3.45, avg_revenue_per_trip: 26.40 },
  { pickup_date: '2023-01-31', total_trips: 101230, daily_revenue: 2692718.00, avg_trip_distance: 3.50, avg_revenue_per_trip: 26.60 },
];

// Peak Hours Tipping & Demand Fact Data (24 hours: 0 - 23)
export const PEAK_HOURS_DATA: PeakHoursTipping[] = [
  { hour_of_day: 0, total_trips: 52140, total_revenue: 1412994.00, avg_tip_percentage: 19.85, avg_trip_distance: 3.72 },
  { hour_of_day: 1, total_trips: 34210, total_revenue: 933933.00, avg_tip_percentage: 19.42, avg_trip_distance: 3.78 },
  { hour_of_day: 2, total_trips: 22890, total_revenue: 631764.00, avg_tip_percentage: 18.91, avg_trip_distance: 3.82 },
  { hour_of_day: 3, total_trips: 15420, total_revenue: 434844.00, avg_tip_percentage: 17.65, avg_trip_distance: 3.95 },
  { hour_of_day: 4, total_trips: 13980, total_revenue: 418002.00, avg_tip_percentage: 16.48, avg_trip_distance: 4.21 },
  { hour_of_day: 5, total_trips: 19450, total_revenue: 593225.00, avg_tip_percentage: 16.92, avg_trip_distance: 4.35 },
  { hour_of_day: 6, total_trips: 45210, total_revenue: 1229712.00, avg_tip_percentage: 17.54, avg_trip_distance: 3.89 },
  { hour_of_day: 7, total_trips: 92430, total_revenue: 2412423.00, avg_tip_percentage: 18.12, avg_trip_distance: 3.42 },
  { hour_of_day: 8, total_trips: 138650, total_revenue: 3563305.00, avg_tip_percentage: 18.45, avg_trip_distance: 3.12 },
  { hour_of_day: 9, total_trips: 149230, total_revenue: 3820288.00, avg_tip_percentage: 18.62, avg_trip_distance: 3.08 },
  { hour_of_day: 10, total_trips: 144510, total_revenue: 3713907.00, avg_tip_percentage: 18.70, avg_trip_distance: 3.14 },
  { hour_of_day: 11, total_trips: 152890, total_revenue: 3959851.00, avg_tip_percentage: 18.84, avg_trip_distance: 3.19 },
  { hour_of_day: 12, total_trips: 164210, total_revenue: 4285881.00, avg_tip_percentage: 18.96, avg_trip_distance: 3.22 },
  { hour_of_day: 13, total_trips: 167890, total_revenue: 4398718.00, avg_tip_percentage: 19.04, avg_trip_distance: 3.25 },
  { hour_of_day: 14, total_trips: 178920, total_revenue: 4741380.00, avg_tip_percentage: 19.18, avg_trip_distance: 3.31 },
  { hour_of_day: 15, total_trips: 188450, total_revenue: 5088150.00, avg_tip_percentage: 19.35, avg_trip_distance: 3.37 },
  { hour_of_day: 16, total_trips: 184230, total_revenue: 5047902.00, avg_tip_percentage: 19.62, avg_trip_distance: 3.42 },
  { hour_of_day: 17, total_trips: 204560, total_revenue: 5707224.00, avg_tip_percentage: 20.14, avg_trip_distance: 3.48 },
  { hour_of_day: 18, total_trips: 225430, total_revenue: 6334583.00, avg_tip_percentage: 20.82, avg_trip_distance: 3.45 },
  { hour_of_day: 19, total_trips: 216890, total_revenue: 6094609.00, avg_tip_percentage: 21.28, avg_trip_distance: 3.47 },
  { hour_of_day: 20, total_trips: 189420, total_revenue: 5322702.00, avg_tip_percentage: 21.56, avg_trip_distance: 3.53 },
  { hour_of_day: 21, total_trips: 178230, total_revenue: 5043909.00, avg_tip_percentage: 21.75, avg_trip_distance: 3.61 },
  { hour_of_day: 22, total_trips: 148920, total_revenue: 4229328.00, avg_tip_percentage: 21.40, avg_trip_distance: 3.68 },
  { hour_of_day: 23, total_trips: 99670, total_revenue: 2790760.00, avg_tip_percentage: 20.64, avg_trip_distance: 3.70 },
];

// Passenger Party Size Distribution (Silver & Mart layer insights)
export const PASSENGER_DISTRIBUTION: PassengerDistribution[] = [
  { passenger_count: 1, total_trips: 2154200, trip_percentage: 72.0, avg_fare: 19.40, avg_tip: 3.65 },
  { passenger_count: 2, total_trips: 420180, trip_percentage: 14.0, avg_fare: 21.20, avg_tip: 4.10 },
  { passenger_count: 3, total_trips: 114350, trip_percentage: 3.8, avg_fare: 22.10, avg_tip: 4.35 },
  { passenger_count: 4, total_trips: 58400, trip_percentage: 2.0, avg_fare: 23.40, avg_tip: 4.60 },
  { passenger_count: 5, total_trips: 138200, trip_percentage: 4.6, avg_fare: 24.80, avg_tip: 5.10 },
  { passenger_count: 6, total_trips: 106150, trip_percentage: 3.6, avg_fare: 25.30, avg_tip: 5.25 },
];

// Payment Type Breakdown (Credit Card vs Cash vs Dispute)
export const PAYMENT_BREAKDOWN: PaymentBreakdown[] = [
  { payment_type: 1, payment_name: 'Credit Card', total_trips: 2425100, trip_percentage: 81.1, total_revenue: 66450200.00, avg_tip_percentage: 21.65 },
  { payment_type: 2, payment_name: 'Cash', total_trips: 520380, trip_percentage: 17.4, total_revenue: 13612800.00, avg_tip_percentage: 0.00 },
  { payment_type: 3, payment_name: 'No Charge', total_trips: 28420, trip_percentage: 1.0, total_revenue: 425100.00, avg_tip_percentage: 0.00 },
  { payment_type: 4, payment_name: 'Dispute', total_trips: 17580, trip_percentage: 0.5, total_revenue: 382400.00, avg_tip_percentage: 0.00 },
];

// Day of Week Performance (Mon - Sun aggregations)
export const DAY_OF_WEEK_DATA: DayOfWeekMetric[] = [
  { day_name: 'Sunday', day_index: 0, total_trips: 351920, total_revenue: 9084200.00, avg_fare: 25.80, avg_tip_percentage: 19.12 },
  { day_name: 'Monday', day_index: 1, total_trips: 324790, total_revenue: 8472100.00, avg_fare: 26.08, avg_tip_percentage: 18.95 },
  { day_name: 'Tuesday', day_index: 2, total_trips: 412450, total_revenue: 10924000.00, avg_fare: 26.47, avg_tip_percentage: 19.38 },
  { day_name: 'Wednesday', day_index: 3, total_trips: 435280, total_revenue: 11582000.00, avg_fare: 26.60, avg_tip_percentage: 19.55 },
  { day_name: 'Thursday', day_index: 4, total_trips: 458920, total_revenue: 12351000.00, avg_fare: 26.91, avg_tip_percentage: 19.82 },
  { day_name: 'Friday', day_index: 5, total_trips: 485320, total_revenue: 13412000.00, avg_fare: 27.63, avg_tip_percentage: 20.15 },
  { day_name: 'Saturday', day_index: 6, total_trips: 423160, total_revenue: 11414000.00, avg_fare: 26.96, avg_tip_percentage: 19.78 },
];

// Sample cleaned trips from Silver layer (stg_taxi_trips)
export const SAMPLE_STAGING_TRIPS: StagingTrip[] = [
  {
    vendor_id: 1,
    vendor_name: 'Creative Mobile Technologies',
    pickup_datetime: '2023-01-15 18:24:12',
    dropoff_datetime: '2023-01-15 18:42:55',
    passenger_count: 1,
    trip_distance: 2.80,
    pickup_location_id: 236,
    pickup_zone: 'Upper East Side North',
    dropoff_location_id: 161,
    dropoff_zone: 'Midtown Center',
    payment_type: 1,
    payment_name: 'Credit card',
    fare_amount: 18.50,
    tip_amount: 4.50,
    total_amount: 27.20,
  },
  {
    vendor_id: 2,
    vendor_name: 'VeriFone Inc.',
    pickup_datetime: '2023-01-15 19:05:30',
    dropoff_datetime: '2023-01-15 19:48:10',
    passenger_count: 2,
    trip_distance: 9.40,
    pickup_location_id: 132,
    pickup_zone: 'JFK Airport',
    dropoff_location_id: 230,
    dropoff_zone: 'Times Sq/Theatre District',
    payment_type: 1,
    payment_name: 'Credit card',
    fare_amount: 52.00,
    tip_amount: 12.00,
    total_amount: 72.80,
  },
  {
    vendor_id: 2,
    vendor_name: 'VeriFone Inc.',
    pickup_datetime: '2023-01-15 20:12:04',
    dropoff_datetime: '2023-01-15 20:25:40',
    passenger_count: 1,
    trip_distance: 1.95,
    pickup_location_id: 249,
    pickup_zone: 'West Village',
    dropoff_location_id: 114,
    dropoff_zone: 'Greenwich Village South',
    payment_type: 1,
    payment_name: 'Credit card',
    fare_amount: 12.50,
    tip_amount: 3.20,
    total_amount: 19.45,
  },
  {
    vendor_id: 1,
    vendor_name: 'Creative Mobile Technologies',
    pickup_datetime: '2023-01-15 21:18:22',
    dropoff_datetime: '2023-01-15 21:31:05',
    passenger_count: 1,
    trip_distance: 2.10,
    pickup_location_id: 142,
    pickup_zone: 'Lincoln Square East',
    dropoff_location_id: 237,
    dropoff_zone: 'Upper East Side South',
    payment_type: 1,
    payment_name: 'Credit card',
    fare_amount: 13.50,
    tip_amount: 3.50,
    total_amount: 20.80,
  },
  {
    vendor_id: 2,
    vendor_name: 'VeriFone Inc.',
    pickup_datetime: '2023-01-15 22:04:19',
    dropoff_datetime: '2023-01-15 22:15:33',
    passenger_count: 3,
    trip_distance: 1.60,
    pickup_location_id: 79,
    pickup_zone: 'East Village',
    dropoff_location_id: 148,
    dropoff_zone: 'Lower East Side',
    payment_type: 2,
    payment_name: 'Cash',
    fare_amount: 10.50,
    tip_amount: 0.00,
    total_amount: 14.30,
  },
  {
    vendor_id: 1,
    vendor_name: 'Creative Mobile Technologies',
    pickup_datetime: '2023-01-16 08:32:15',
    dropoff_datetime: '2023-01-16 08:55:40',
    passenger_count: 1,
    trip_distance: 3.60,
    pickup_location_id: 238,
    pickup_zone: 'Upper West Side North',
    dropoff_location_id: 162,
    dropoff_zone: 'Midtown East',
    payment_type: 1,
    payment_name: 'Credit card',
    fare_amount: 21.00,
    tip_amount: 4.80,
    total_amount: 29.80,
  },
  {
    vendor_id: 2,
    vendor_name: 'VeriFone Inc.',
    pickup_datetime: '2023-01-16 09:14:02',
    dropoff_datetime: '2023-01-16 09:30:19',
    passenger_count: 1,
    trip_distance: 2.30,
    pickup_location_id: 186,
    pickup_zone: 'Penn Station/Madison Sq West',
    dropoff_location_id: 100,
    dropoff_zone: 'Garment District',
    payment_type: 1,
    payment_name: 'Credit card',
    fare_amount: 15.00,
    tip_amount: 3.00,
    total_amount: 21.75,
  },
  {
    vendor_id: 1,
    vendor_name: 'Creative Mobile Technologies',
    pickup_datetime: '2023-01-16 12:45:50',
    dropoff_datetime: '2023-01-16 13:12:10',
    passenger_count: 2,
    trip_distance: 4.10,
    pickup_location_id: 161,
    pickup_zone: 'Midtown Center',
    dropoff_location_id: 231,
    dropoff_zone: 'TriBeCa/Civic Center',
    payment_type: 1,
    payment_name: 'Credit card',
    fare_amount: 24.50,
    tip_amount: 5.50,
    total_amount: 34.00,
  },
  {
    vendor_id: 2,
    vendor_name: 'VeriFone Inc.',
    pickup_datetime: '2023-01-16 17:35:12',
    dropoff_datetime: '2023-01-16 18:02:44',
    passenger_count: 1,
    trip_distance: 3.85,
    pickup_location_id: 234,
    pickup_zone: 'Union Sq',
    dropoff_location_id: 141,
    dropoff_zone: 'Lenox Hill West',
    payment_type: 1,
    payment_name: 'Credit card',
    fare_amount: 23.00,
    tip_amount: 5.20,
    total_amount: 32.70,
  },
  {
    vendor_id: 1,
    vendor_name: 'Creative Mobile Technologies',
    pickup_datetime: '2023-01-16 21:50:00',
    dropoff_datetime: '2023-01-16 22:20:15',
    passenger_count: 1,
    trip_distance: 8.90,
    pickup_location_id: 138,
    pickup_zone: 'LaGuardia Airport',
    dropoff_location_id: 164,
    dropoff_zone: 'Midtown South',
    payment_type: 1,
    payment_name: 'Credit card',
    fare_amount: 38.00,
    tip_amount: 9.50,
    total_amount: 54.25,
  }
];

export const DBT_TESTS: DbtTest[] = [
  {
    model: 'stg_taxi_trips',
    column: 'vendor_id',
    test_type: 'not_null',
    status: 'passed',
    message: 'PASS 0 null records found across 3,066,762 rows',
  },
  {
    model: 'stg_taxi_trips',
    column: 'pickup_datetime',
    test_type: 'not_null',
    status: 'passed',
    message: 'PASS 0 null timestamps found',
  },
  {
    model: 'stg_taxi_trips',
    column: 'passenger_count',
    test_type: 'not_null',
    status: 'passed',
    message: 'PASS COALESCE(passenger_count, 1) enforced cleanly',
  },
  {
    model: 'stg_taxi_trips',
    column: 'payment_type',
    test_type: 'not_null',
    status: 'passed',
    message: 'PASS 0 null payment codes',
  },
  {
    model: 'stg_taxi_trips',
    column: 'payment_type',
    test_type: 'accepted_values',
    parameters: 'values: [1, 2, 3, 4, 5, 6]',
    status: 'passed',
    message: 'PASS 100% of rows have payment_type in [1, 2, 3, 4, 5, 6]',
  },
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    name: 'Bronze Ingestion',
    tier: 'bronze',
    description: 'Fetch multi-million row NYC TLC Parquet file from cloudfront mirror',
    tool: 'Python (extract.py)',
    input: 'https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2023-01.parquet',
    output: 'data/raw/yellow_tripdata_2023-01.parquet',
    rowCount: '3,066,762 raw records',
    status: 'completed',
    executionTime: '4.2s (Parquet zero-copy reader)',
  },
  {
    name: 'Silver Cleaning',
    tier: 'silver',
    description: 'Schema casting, coalesce null passengers to 1, filter non-positive fares/distances & invalid payment types',
    tool: 'dbt + DuckDB (stg_taxi_trips.sql)',
    input: 'Bronze Parquet (*.parquet)',
    output: 'main.stg_taxi_trips (DuckDB view)',
    rowCount: '2,991,480 valid trips (75,282 filtered out)',
    status: 'completed',
    executionTime: '1.8s',
  },
  {
    name: 'Gold Business Marts',
    tier: 'gold',
    description: 'Daily revenue aggregation and hourly tipping demand fact tables with tip % calculations',
    tool: 'dbt + DuckDB (marts/)',
    input: 'Silver stg_taxi_trips',
    output: 'main.fct_daily_revenue, main.fct_peak_hours_tipping',
    rowCount: '31 daily rows + 24 hourly rows',
    status: 'completed',
    executionTime: '0.9s',
  },
];

export const SQL_MODELS = {
  stg_taxi_trips: `WITH raw_taxi AS (
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
  AND payment_type IN (1, 2, 3, 4, 5, 6)`,

  fct_daily_revenue: `WITH trips AS (
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
ORDER BY pickup_date`,

  fct_peak_hours_tipping: `WITH trips AS (
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
ORDER BY hour_of_day`
};
