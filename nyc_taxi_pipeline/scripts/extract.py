import urllib.request
import os

def fetch_taxi_data(year, month):
    # Format month to always be two digits (e.g., '01')
    month_str = f"{month:02d}"
    file_name = f"yellow_tripdata_{year}-{month_str}.parquet"
    url = f"https://d37ci6vzurychx.cloudfront.net/trip-data/{file_name}"
    
    # Use relative paths so this script works on both Windows and Linux
    save_dir = os.path.join(os.getcwd(), "data", "raw")
    save_path = os.path.join(save_dir, file_name)
    
    print(f"Downloading ~3 million rows for {year}-{month_str}...")
    urllib.request.urlretrieve(url, save_path)
    print(f"Successfully saved to {save_path}")

if __name__ == "__main__":
    # Fetch January 2023 data
    fetch_taxi_data(2023, 1)