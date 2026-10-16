export interface DailyRevenue {
  pickup_date: string;
  total_trips: number;
  daily_revenue: number;
  avg_trip_distance: number;
  avg_revenue_per_trip: number;
}

export interface PeakHoursTipping {
  hour_of_day: number;
  total_trips: number;
  total_revenue: number;
  avg_tip_percentage: number;
  avg_trip_distance: number;
}

export interface PassengerDistribution {
  passenger_count: number;
  total_trips: number;
  trip_percentage: number;
  avg_fare: number;
  avg_tip: number;
}

export interface PaymentBreakdown {
  payment_type: number;
  payment_name: string;
  total_trips: number;
  trip_percentage: number;
  total_revenue: number;
  avg_tip_percentage: number;
}

export interface DayOfWeekMetric {
  day_name: string;
  day_index: number;
  total_trips: number;
  total_revenue: number;
  avg_fare: number;
  avg_tip_percentage: number;
}

export interface StagingTrip {
  vendor_id: number;
  vendor_name: string;
  pickup_datetime: string;
  dropoff_datetime: string;
  passenger_count: number;
  trip_distance: number;
  pickup_location_id: number;
  pickup_zone: string;
  dropoff_location_id: number;
  dropoff_zone: string;
  payment_type: number;
  payment_name: string;
  fare_amount: number;
  tip_amount: number;
  total_amount: number;
}

export interface DbtTest {
  model: string;
  column: string;
  test_type: 'not_null' | 'accepted_values' | 'unique' | 'custom_expression';
  parameters?: string;
  status: 'passed' | 'failed';
  message: string;
}

export interface PipelineStage {
  name: string;
  tier: 'bronze' | 'silver' | 'gold';
  description: string;
  tool: string;
  input: string;
  output: string;
  rowCount: string;
  status: 'completed' | 'idle' | 'running';
  executionTime: string;
}
