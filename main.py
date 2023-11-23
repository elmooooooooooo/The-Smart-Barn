import csv, random, datetime, json, os

# libraries voor api
from flask import Flask
from flask_cors import CORS

APP = Flask(__name__)

CORS(APP, resources={r"/*": {"origins": "*"}})

JSONFILEPATH = "setup.json"
if os.path.isfile(JSONFILEPATH) is False:
    raise Exception("JSON setup file not found in app directory")

def randomAlgorithm(previousNumber):
    for i in range(random.randint(1,20)):
        choice = random.randint(-10, 10)
        if i == random.randint(1 ,20):
            break
    newNumber = previousNumber + choice
    if not newNumber in range(0, 101):
       newNumber = previousNumber
    return newNumber     
    

randomTemp = 20
randomMoist = 15

##################################################################################
"""
lees json bestand met de setup uit
opbouw: 
        creationTime:
            {
                date: ['jaar', 'maand', 'dag'],
                time: ['uur', 'minuut', seconden + millisseconden]
            }
"""
##################################################################################

class CSVkeeper():
    def __init__(self) -> None:
        pass
    
    def checkMostRecentCSVFile(self):
        with open(JSONFILEPATH) as filepath:
            self.setupFileData = json.load(filepath)
        
        self.creationTime = self.setupFileData["creationTime"]

        date_time = str(datetime.datetime.now()).split(" ")
        self.date = date_time[0].split("-")
        self.time = date_time[1].split(":")
        return self.checkIfCSVFileIsOutdated()

    def checkIfCSVFileIsOutdated(self):
        if self.creationTime["date"][1] != self.date[1]: # check als recentste CSV file van deze maand is
            CSVdataPath = self.makeNewCSVFile()
        else:
            CSVdataPath = f"data_{self.date[0]}-{self.date[1]}.csv"
        return CSVdataPath
        
    def makeNewCSVFile(self):
        newCSVdataPath = f"data_{self.date[0]}-{self.date[1]}.csv"
        self.creationTime["date"] = self.date
        self.creationTime["time"] = self.time
        self.setupFileData["creationTime"] = self.creationTime
        
        open(newCSVdataPath, "w") # maak bestand aan door te openen in schrijfmodus
        with open(JSONFILEPATH, 'w') as json_file:
            json.dump(self.setupFileData, json_file, indent = 4, separators=(',',': '))
        return newCSVdataPath

CSVKEEPER = CSVkeeper()

# #     minuten in dag 1440

###############################################
# verstuur data naar api met Flask API module #
###############################################

@APP.route("/", methods=["GET"])
def index():
    global randomTemp, randomMoist
    CSVdataPath = CSVKEEPER.checkMostRecentCSVFile()
    
    with open(CSVdataPath, "a", newline='') as file:
        writer = csv.writer(file)
        
        # tijdelijk worden random getallen gegenereerd
        # for i in range(1440 * 31): # simuleer 31 dagen
        # randomTemp = random.randint(1, 100)
        # randomMoist = random.randint(1, 100)
        randomTemp = randomAlgorithm(randomTemp)
        randomMoist = randomAlgorithm(randomMoist)
        fanOn = True if randomTemp > 20 else False
        fanOn = True if randomMoist > 20 else False
        if fanOn:
            fanSpeed = random.randint(1, 100)
        else:
            fanSpeed = 0
    
            
        newData = [datetime.datetime.now(), randomTemp, randomMoist, fanOn, fanSpeed]
        # writer.writerow(newData)
    return newData, 200

if __name__ == "__main__":
    
    APP.run(host="0.0.0.0")