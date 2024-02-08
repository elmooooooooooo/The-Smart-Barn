import json, csv

with open("data_2024-01.csv") as csvFile:
    csvData = csv.reader(csvFile)

    for row in csvData:
        for index, item in enumerate(row):
            try:
                row[index] = int(item)
            except ValueError: pass
        print(row)
        