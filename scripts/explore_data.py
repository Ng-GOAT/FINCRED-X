from pathlib import Path

import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = PROJECT_ROOT / "data" / "raw" / "default of credit card clients.xls"
TARGET = "default payment next month"


def main() -> None:
    # The spreadsheet uses its second row for column names.
    data = pd.read_excel(DATA_FILE, header=1)
    outcomes = data[TARGET]

    if data.empty or not outcomes.isin([0, 1]).all():
        raise ValueError("Expected customer records with a default label of 0 or 1.")

    # ID identifies the customer. The target is the answer our model will predict.
    features = data.drop(columns=["ID", TARGET])

    customer_count = len(data)
    default_count = int((outcomes == 1).sum())
    default_rate = default_count / customer_count

    print(f"Customer records: {customer_count:,}")
    print(f"Input features: {len(features.columns)}")
    print(f"Missing cells: {data.isna().sum().sum()}")
    print(f"Repeated customer IDs: {data['ID'].duplicated().sum()}")
    print(f"Customers who defaulted: {default_count:,}")
    print(f"Customers who did not default: {customer_count - default_count:,}")
    print(f"Default rate: {default_rate:.2%}")


if __name__ == "__main__":
    main()