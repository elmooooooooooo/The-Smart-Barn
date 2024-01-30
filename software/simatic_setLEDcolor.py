#!/usr/bin/python3

import sys
import os

def greenled0(state):
 greenLed0File = "/sys/class/leds/user-led0-green/brightness"
 if(not os.path.isfile(greenLed0File)):
  print("Green LED0 not available")
  return
 file = open(greenLed0File,'w')
 if(1==state):
  file.write("1")
 else:
  file.write("0")
 file.close()

def redled0(state):
 redLed0File = "/sys/class/leds/user-led0-red/brightness"
 if(not os.path.isfile(redLed0File)):
  print ("Red LED0 not available")
  return
 file = open(redLed0File, 'w')
 if(1==state):
  file.write('1')
 else:
  file.write('0')
 file.close()

def greenled1(state):
 greenLed1File = "/sys/class/leds/user-led1-green/brightness"
 if(not os.path.isfile(greenLed1File)):
  print ("Green LED1 not available")
  return
 file = open(greenLed1File, 'w')
 if(1==state):
  file.write('1')
 else:
  file.write('0')
 file.close()

def redled1(state):
 redLed1File = "/sys/class/leds/user-led1-red/brightness"
 if(not os.path.isfile(redLed1File)):
  print ("Red LED1 not available")
  return
 file = open(redLed1File, 'w')
 if(1==state):
  file.write('1')
 else:
  file.write('0')
 file.close()

if(len(sys.argv)!=2):
 print ('\n' + 'Usage: '+ sys.argv[0] + ' <color>')
 print ('color:')
 print ('9\t\tboth LED out')
 print ('0\t\tLED0 out')
 print ('1\t\tLED0 green')
 print ('2\t\tLED0 red')
 print ('3\t\tLED0 orange')
 print ('10\t\tLED1 out')
 print ('11\t\tLED1 green')
 print ('12\t\tLED1 red')
 print ('13\t\tLED1 orange')
 sys.exit()

x = int(sys.argv[1])

if(x == 9):
 greenled0(0)
 redled0(0)
 greenled1(0)
 redled1(0)
elif(x == 0):
 greenled0(0)
 redled0(0)
elif(x == 1):
 greenled0(1)
 redled0(0)
elif(x == 2):
 greenled0(0)
 redled0(1)
elif(x == 3):
 greenled0(1)
 redled0(1)
elif(x == 10):
 greenled1(0)
 redled1(0)
elif(x == 11):
 greenled1(1)
 redled1(0)
elif(x == 12):
 greenled1(0)
 redled1(1)
elif(x == 13):
 greenled1(1)
 redled1(1)
else: 
 print ('\ninvalid <color>')
 print ('\n' + 'Usage: '+ sys.argv[0] + ' <color>')
 print ('color:')
 print ('9\t\tboth LED out')
 print ('0\t\tLED0 out')
 print ('1\t\tLED0 green')
 print ('2\t\tLED0 red')
 print ('3\t\tLED0 orange')
 print ('10\t\tLED1 out')
 print ('11\t\tLED1 green')
 print ('12\t\tLED1 red')
 print ('13\t\tLED1 orange')
 sys.exit()

     
