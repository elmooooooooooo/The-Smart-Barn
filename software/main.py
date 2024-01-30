import csv, random, datetime, json, os

# importeer rpi modules
DHT11aangesloten = True # TODO verander naam
try:
    import gpiozero
    import Adafruit_DHT
except ModuleNotFoundError:
    print("Kon gpiozero niet inladen. Waarschijnlijk Windows.")
    DHT11aangesloten = False

# libraries voor api
from flask import Flask, jsonify
from flask_cors import CORS

APP = Flask(__name__)

CORS(APP, resources={r"/*": {"origins": "*"}})

# Pad verschilled op semetic en op wondows
if os.path.isfile("software/setup.json"):
    JSONFILEPATH = "software/setup.json" # Windows 
else:
    JSONFILEPATH = "setup.json" # semetic

if os.path.isfile(JSONFILEPATH) is False:
    raise FileNotFoundError("JSON setup file not found in app directory")

class JsonFileIsEmpty(Exception): ...
if os.path.getsize(JSONFILEPATH) < 10:
    raise JsonFileIsEmpty("The Setup file seem to be empty")


def randomAlgorithm(previousNumber):
    for i in range(random.randint(1,20)):
        choice = random.randint(-10, 10)
        if i == random.randint(1 ,20):
            break
    newNumber = previousNumber + choice
    if not newNumber in range(0, 101):
       newNumber = previousNumber
    return newNumber     

def returnDHT11():
    vocht, temp = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, 4)
    print(f"Huidige vocht / temp: {vocht}/{temp}")
    return vocht, temp



temp = 0
vocht = 90

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

class CSVfileDateChecker():
    def __init__(self) -> None:
        pass
    
    def checkMostRecentCSVFilePath(self):
        with open(JSONFILEPATH) as filepath:
            self.setupFileData = json.load(filepath)
        
        self.creationTime = self.setupFileData["creationTime"]

        date_time = str(datetime.datetime.now()).split(" ")
        self.date = date_time[0].split("-")
        self.time = date_time[1].split(":")
        
        return self.checkIfCSVFileIsOutdated()

    def checkIfCSVFileIsOutdated(self):
        if self.creationTime["date"][1] != self.date[1]: # check als recentste CSV file van deze maand is
            CSVdataPath = self.makeNewCSVFileAndPath()
        else:
            CSVdataPath = f"data_{self.date[0]}-{self.date[1]}.csv"
        return CSVdataPath
        
    def makeNewCSVFileAndPath(self):
        newCSVdataPath = f"data_{self.date[0]}-{self.date[1]}.csv"
        self.creationTime["date"] = self.date
        self.creationTime["time"] = self.time
        self.setupFileData["creationTime"] = self.creationTime
        
        open(newCSVdataPath, "w") # maak bestand aan door te openen in schrijfmodus
        with open(JSONFILEPATH, 'w') as json_file:
            json.dump(self.setupFileData, json_file, indent = 4, separators=(',',': '))
        return newCSVdataPath

csvFileDateChecker = CSVfileDateChecker()

# minuten in dag 1440

###############################################
# verstuur data naar api met Flask API module #
###############################################

@APP.route("/", methods=["GET"])
def index():
    global temp, vocht
    CSVdataPath = csvFileDateChecker.checkMostRecentCSVFilePath()
    
    with open(CSVdataPath, "a", newline='') as file:
        writer = csv.writer(file)
        
        # tijdelijk worden random getallen gegenereerd
        # for i in range(1440 * 31): # simuleer 31 dagen
        # temp = random.randint(1, 100)
        # vocht = random.randint(1, 100)

        if DHT11aangesloten:
            vocht, temp = returnDHT11()
        else:
            vocht = randomAlgorithm(temp)
            temp = randomAlgorithm(vocht)

        if vocht == None:
            vocht = -1
            
        if temp == None:
            temp = -1

        fanOn = True if temp > 20 else False
        fanOn = True if vocht > 20 else False
        if fanOn:
            fanSpeed = random.randint(1, 100)
        else:
            fanSpeed = 0
    
            
        newData = (datetime.datetime.now(), temp, vocht, fanOn, fanSpeed)
        # writer.writerow(newData)
    return jsonify(newData), 200

if __name__ == "__main__":
    APP.run(host="0.0.0.0")