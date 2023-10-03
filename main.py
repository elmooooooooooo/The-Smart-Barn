import csv, random, datetime
from time import sleep
from flask import Flask

data = []

app = Flask(__name__)

import json, os
JSONFILEPATH = "setup.json"
if os.path.isfile(JSONFILEPATH) is False:
    raise Exception("File not found")









"""
lees json bestand met de setup uit
opbouw: 
        maketime:
            {
                date: ['jaar', 'maand', 'dag'],
                time: ['uur', 'minuut', seconden + millisseconden]
            }
"""

def makeNewFile(maketime, setupFile, date, time):
    dataPath = f"data_{date[0]}-{date[1]}.csv"
    maketime["date"] = date
    maketime["time"] = time
    setupFile["maketime"] = maketime
    
    # maak nieuw bestand en sla json file op
    open(dataPath, "w")
    with open(JSONFILEPATH, 'w') as json_file:
        json.dump(setupFile, json_file, indent = 4, separators=(',',': '))
    return dataPath




# #     minuten in dag 1440



# # verstuur data naar api

@app.route("/", methods=["GET"])
def index():
    with open(JSONFILEPATH) as filepath:
        setupFile = json.load(filepath)
    
    maketime = setupFile["maketime"]

    date_time = str(datetime.datetime.now()).split(" ")
    date = date_time[0]
    time = date_time[1]

    date = date.split("-")
    time = time.split(":")
    if maketime["date"][1] != date[1]:
        dataPath = makeNewFile(maketime, setupFile, date, time)

    dataPath = f"data_{date[0]}-{date[1]}.csv"


            
            
    with open(dataPath, "a", newline='') as file:
        writer = csv.writer(file)
        
        
        
        
        # for i in range(1440 * 31):
        randomTemp = random.randint(1, 100)
        randomMoist = random.randint(1, 100)
        fanOn = True if randomTemp > 20 else False
        fanOn = True if randomMoist > 20 else False
        if fanOn:
            fanSpeed = random.randint(1, 100)
        else:
            fanSpeed = 0
            
        newData = [datetime.datetime.now(), randomTemp, randomMoist, fanOn, fanSpeed]
        writer.writerow(newData)
        


    return newData, 200






if __name__ == "__main__":
    
    app.run()