from sqlalchemy import create_engine, text
import os

# Copying the string exactly as in database.py
SQLALCHEMY_DATABASE_URL = r"mssql+pyodbc://H3LL\SQLSERVER22/PokedexDB?driver=ODBC+Driver+18+for+SQL+Server&trusted_connection=yes&TrustServerCertificate=yes"

print(f"Connecting to: {SQLALCHEMY_DATABASE_URL}")

try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("Integration Check: SUCCESS - Database connection established.")
        print(f"Result: {result.fetchone()}")
except Exception as e:
    print("Integration Check: FAILED")
    print(e)
