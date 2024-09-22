from flask import Flask, render_template, request
import requests
import pandas as pd
from fetch_race_results import fetch_race_results, parse_race_results, fetch_all_races, fetch_all_seasons

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    seasons = fetch_all_seasons()
    season_options = []
    if seasons:
        season_options = [season['season'] for season in seasons['MRData']['SeasonTable']['Seasons']]
    
    selected_season = request.form.get('season', season_options[-1])
    races = fetch_all_races(selected_season)
    race_options = []
    if races:
        race_options = [(race['round'], race['raceName']) for race in races['MRData']['RaceTable']['Races']]
    
    selected_round = request.form.get('round', 1)
    data = fetch_race_results(selected_season, selected_round)
    race_name, date, df = None, None, None
    if data:
        race_name, date, df = parse_race_results(data)
        df.drop(df.columns[0], axis=1, inplace=True)  # Drop the first column

    return render_template('index.html', race_name=race_name, date=date, tables=[df.to_html(classes='data') if df is not None else None], titles=df.columns.values if df is not None else None, season_options=season_options, selected_season=selected_season, race_options=race_options, selected_round=selected_round)

if __name__ == "__main__":
    app.run(debug=True)
