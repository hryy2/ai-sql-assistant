"""
Data preprocessing for machine learning.
"""

import pandas as pd

def preprocess_data(df):
    """
    Clean the dataset and prepare features.

    Parameters
    ----------
    df : pandas.DataFrame

    Returns
    -------
    X : pandas.DataFrame
        Feature matrix.

    y : pandas.Series
        Target variable.
    """

    # Remove missing values
    df = df.dropna().copy()

    # One-Hot Encoding
    categorical_columns = [
        "season",
        "weekday",
        "place",
    ]

    df = pd.get_dummies(
        df,
        columns=categorical_columns,
        drop_first=True,
    )

    # Features
    X = df.drop(
    columns=[
        "date",
        "location_id",
        "demand_gwh",
    ]
)

    # Target
    y = df["demand_gwh"]
    return X, y