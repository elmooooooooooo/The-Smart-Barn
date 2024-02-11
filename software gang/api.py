from flask import Flask,request
import main
import json

app = Flask(__name__)

lijst = []

@app.route('/leb', methods=['GET'])
def The_Smart_Barn():
   

   naam = request.args.get('GOAT', 'BRON')
   lijst.append(naam)

   return lijst, 200
     



    

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)