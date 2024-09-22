import requests
import pandas as pd

def fetch_race_results(season, round):
    url = f"http://ergast.com/api/f1/{season}/{round}/results.json"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None



def fetch_all_seasons():
    url = "http://ergast.com/api/f1/seasons.json?limit=100"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def fetch_all_races(season):
    url = f"http://ergast.com/api/f1/{season}.json"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None


def parse_race_results(data):
    race_info = data['MRData']['RaceTable']['Races'][0]
    race_name = race_info['raceName']
    date = race_info['date']
    results = race_info['Results']
    
    parsed_results = []
    for result in results:
        parsed_results.append({
            'position': result['position'],
            'driver': f"{result['Driver']['givenName']} {result['Driver']['familyName']}",
            'constructor': result['Constructor']['name'],
            'grid': result['grid'],
            'laps': result['laps'],
            'status': result['status'],
            'time': result['Time']['time'] if 'Time' in result else None,
            'points': result['points']
        })
    
    return race_name, date, pd.DataFrame(parsed_results)

def fetch_all_races(season):
    url = f"http://ergast.com/api/f1/{season}.json"
    response = requests.get(url)
    if response.status_code == 200:
        races = response.json()['MRData']['RaceTable']['Races']
        return [(race['round'], race['raceName']) for race in races]
    else:
        return None
