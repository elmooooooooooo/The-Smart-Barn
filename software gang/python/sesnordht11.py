from gpiozero import DigitalInputDevice
from time import sleep

DHT11_PIN = 17  # Change this to the actual GPIO pin you are using
dht11 = DigitalInputDevice(DHT11_PIN)

def read_dht11_data():
   
    data = []
    for _ in range(40):
        data.append(dht11.value)
    print(data)
    humidity = int("".join(map(str, data[:16])), 2)
    temperature = int("".join(map(str, data[16:])), 2)
    
    return humidity, temperature

try:
    while True:
        humidity, temperature = read_dht11_data()
        print(f"Temperature: {temperature / 10.0}°C, Humidity: {humidity / 10.0}%")
        sleep(2)

except KeyboardInterrupt:
    print("Program terminated by user")
finally:
    dht11.close()