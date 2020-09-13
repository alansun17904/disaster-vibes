import requests
from requests.auth import HTTPBasicAuth
import json

def jprint(obj):
    # create a formatted string of the Python JSON object
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

""" Given a list of locations, it will get the latitude and longitude """
locations = ['Philadelphia, US', 'New York City, US', 'Des Moines, US']

lat_dict = {}
long_dict = {}
master_rain_mm = {}

for location in locations:
    url = 'https://geocode.xyz/' + location + 'US?geoit=json&auth=498370256388433344167x110797'
    geocode = requests.get(url)
    lat_dict[location] = geocode.json()['latt']
    long_dict[location] = geocode.json()['longt']

for loc in lat_dict:
    url = 'https://api.meteomatics.com/2020-09-12T00:00:00Z/precip_24h:mm/' + lat_dict[loc] + ',' + long_dict[loc] + '/json'
    response = requests.get(url,
                            auth=HTTPBasicAuth('columbia_xiao', '45Vcg7owWqZLK'))

    """ Saves the rainfall over 24hrs data into the dictionary master_rain_mm """
    raw_rain_mm = response.json()['data'][0]['coordinates'][0]['dates'][0]['value']
    #print(raw_rain_mm)
    #rain_mm = []
    #for i in range(len(raw_rain_mm)):
    #    rain_mm.append(raw_rain_mm[i]['value'])
    master_rain_mm[loc] = raw_rain_mm
    print(master_rain_mm)
