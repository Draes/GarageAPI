#!/usr/bin/env python
import RPi.GPIO as GPIO, sys

STATUS_PIN = 10 # pin on board connected to switch

# setup STATUS_PIN
GPIO.setmode(GPIO.BCM)
GPIO.setup(STATUS_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

if GPIO.input(STATUS_PIN):
    sys.exit('CLOSED')
else :
    sys.exit('OPEN')