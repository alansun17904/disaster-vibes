import requests
from requests.auth import HTTPBasicAuth
import json

def jprint(obj):
    # create a formatted string of the Python JSON object
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

# latitude and longitude of Pennsylvania
lat = str(41.2)
long = str(-77)

response = requests.get('https://api.meteomatics.com/2020-09-12T00:00:00ZP1D:PT24H/precip_24h:mm/40.7,-73.9/json',
                        auth=HTTPBasicAuth('columbia_xiao', '45Vcg7owWqZLK'))
print(response.status_code)
jprint(response.json())

""" Saves the rainfall over 24hrs data into a list called rain_mm """
raw_rain_mm = response.json()['data'][0]['coordinates'][0]['dates']
rain_mm = []
for i in range(len(raw_rain_mm)):
    rain_mm.append(raw_rain_mm[i]['value'])
jprint(rain_mm)
