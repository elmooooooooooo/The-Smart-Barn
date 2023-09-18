import csv, datetime
dataPath = "data.csv"
data = []

"""
lees json bestand met de setup uit
opbouw: 
        maketime:
            {
                date: ['jaar', 'maand', 'dag'],
                time: ['uur', 'minuut', seconden + millisseconden]
            }
"""

def makeNewFile():
    dataPath = f"data_{date[0]}-{date[1]}.csv"
    maketime["date"] = date
    maketime["time"] = time
    setupFile["maketime"] = maketime
    
    # maak nieuw bestand en sla json file op
    open(dataPath, "w")
    with open(JSONFILEPATH, 'w') as json_file:
        json.dump(setupFile, json_file, indent = 4, separators=(',',': '))
    return dataPath


import json, os
JSONFILEPATH = "setup.json"
if os.path.isfile(JSONFILEPATH) is False:
    raise Exception("File not found")
with open(JSONFILEPATH) as filepath:
    setupFile = json.load(filepath)
    
maketime = setupFile["maketime"]

date_time = str(datetime.datetime.now()).split(" ")
date = date_time[0]
time = date_time[1]

date = date.split("-")
time = time.split(":")
if maketime["date"][1] != date[1]:
    dataPath = makeNewFile()






with open(dataPath) as file:
    reader = csv.reader(file)
    for row in reader:
        data.append(row)
        
        
with open(dataPath, "w", newline='') as file:
    writer = csv.writer(file)
    
    writer.writerows(data)