#!/usr/bin/python3
# -*- coding: utf-8 -*-
import mraa
import sys
import os
import time


greenLed0 = "/sys/class/leds/user-led0-green/brightness"
redLed0 = "/sys/class/leds/user-led0-red/brightness"
greenLed1 = "/sys/class/leds/user-led1-green/brightness"
redLed1 = "/sys/class/leds/user-led1-red/brightness"

file = open(greenLed0, "w")
file.write("1")
file.close()
time.sleep(1)

file = open(greenLed1, "w")
file.write("1")
file.close()
time.sleep(1)

file = open(redLed0, "w")
file.write("1")
file.close()
time.sleep(1)

file = open(redLed1, "w")
file.write("1")
file.close()
time.sleep(1)

file = open(greenLed0, "w")
file.write("0")
file.close()
time.sleep(1)

file = open(greenLed1, "w")
file.write("0")
file.close()
time.sleep(1)

file = open(redLed0, "w")
file.write("0")
file.close()
time.sleep(1)

file = open(redLed1, "w")
file.write("0")
file.close()
time.sleep(1)

