import streamlit as st
import duckdb
import pandas as pd
import plotly.express as px
import os

# Set up the page configuration
st.set_page_config(page_title="NYC Taxi Analytics", page_icon="🚕", layout="wide")

st.title("🚕 NYC Taxi Analytics Engine")
st.markdown("Interactive dashboard powered by a local Medallion Data Pipeline (DuckDB + dbt).")

# 1. Connect to the local DuckDB database
# Using an absolute path approach to ensure it finds the DB no matter where the script is run from
db_path = os.path.join(os.getcwd(), 'data', 'analytics.duckdb')

@st.cache_data
def load_data(query):
    """Connect to DuckDB, run the query, and return a Pandas DataFrame."""
    with duckdb.connect(db_path, read_only=True) as con:
        return con.execute(query).df()

# 2. Load the data from the Gold layer
try:
    df_revenue = load_data("SELECT * FROM main.fct_daily_revenue")
    df_peak_hours = load_data("SELECT * FROM main.fct_peak_hours_tipping")
    
    # 3. Create the layout and visualizations
    st.header("📈 Daily Revenue Trends")
    fig_revenue = px.line(
        df_revenue, 
        x="pickup_date", 
        y="daily_revenue", 
        labels={"pickup_date": "Date", "daily_revenue": "Total Revenue ($)"},
        markers=True
    )
    st.plotly_chart(fig_revenue, use_container_width=True)

    st.markdown("---")

    col1, col2 = st.columns(2)

    with col1:
        st.header("🕒 Peak Tipping Hours")
        fig_tips = px.bar(
            df_peak_hours, 
            x="hour_of_day", 
            y="avg_tip_percentage",
            labels={"hour_of_day": "Hour of Day (0-23)", "avg_tip_percentage": "Average Tip (%)"},
            color="avg_tip_percentage",
            color_continuous_scale="Viridis"
        )
        st.plotly_chart(fig_tips, use_container_width=True)

    with col2:
        st.header("🚕 Demand by Hour")
        fig_demand = px.bar(
            df_peak_hours,
            x="hour_of_day",
            y="total_trips",
            labels={"hour_of_day": "Hour of Day (0-23)", "total_trips": "Total Trips"},
            color="total_trips",
            color_continuous_scale="Blues"
        )
        st.plotly_chart(fig_demand, use_container_width=True)

except Exception as e:
    st.error(f"Error loading data. Make sure the dbt pipeline has been run successfully! Details: {e}")