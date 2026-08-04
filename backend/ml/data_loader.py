"""
Load training data from the SQLite database.
"""

import sqlite3
import pandas as pd
from config import DATABASE_PATH

def load_training_data():
    """
    Load and join electricity and weather observations.

    Returns
    -------
    pandas.DataFrame
        Joined dataset used for machine learning.
    """

    conn = sqlite3.connect(DATABASE_PATH)

    query = """
    SELECT

        d.date,

        d.year,
        d.month,
        d.weekday,
        d.season,

        l.location_id,
        l.place,

        e.demand_gwh,

        t.temp_mean,
        t.temp_max,
        t.temp_min,

        r.precipitation,
        r.rain,

        w.wind_speed,
        w.humidity

    FROM electricity_observations e

    JOIN dates d
        ON e.date_id = d.date_id

    JOIN locations l
        ON e.location_id = l.location_id

    JOIN temperature_observations t
        ON
            e.date_id = t.date_id
            AND
            e.location_id = t.location_id

    JOIN rainfall_observations r
        ON
            e.date_id = r.date_id
            AND
            e.location_id = r.location_id

    JOIN wind_humidity_observations w
        ON
            e.date_id = w.date_id
            AND
            e.location_id = w.location_id
    """

    df = pd.read_sql_query(query, conn)
    conn.close()
    return df

if __name__ == "__main__":
    dataframe = load_training_data()
    print(dataframe.head())
    print()
    print("Rows:", len(dataframe))
    print("Columns:", len(dataframe.columns))