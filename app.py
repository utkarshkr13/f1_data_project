from flask import Flask, render_template
import requests
import pandas as pd
from fetch_race_results import fetch_race_results, parse_race_results

app = Flask(__name__)

@app.route('/')
def index():
    season = 2023
    round = 1
    data = fetch_race_results(season, round)
    if data:
        race_name, date, df = parse_race_results(data)
        return render_template('index.html', race_name=race_name, date=date, tables=[df.to_html(classes='data')], titles=df.columns.values)
    else:
        return "Failed to fetch data"

if __name__ == "__main__":
    app.run(debug=True)
