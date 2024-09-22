from flask import Flask, render_template, request
import requests
import pandas as pd
from fetch_race_results import fetch_race_results, parse_race_results, fetch_all_races

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    season = 2023
    races = fetch_all_races(season)
    selected_race = None
    race_name = None
    date = None
    df = None

    if request.method == 'POST':
        round = request.form.get('race')
        data = fetch_race_results(season, round)
        if data:
            race_name, date, df = parse_race_results(data)

    return render_template('index.html', races=races, race_name=race_name, date=date, tables=[df.to_html(classes='data')] if df is not None else None, titles=df.columns.values if df is not None else None)

if __name__ == "__main__":
    app.run(debug=True)
