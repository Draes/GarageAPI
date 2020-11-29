#!/usr/bin/env python
import RPi.GPIO as GPIO
import time

TRIGGER_PIN = 2  # pin on the board connected to the relay
TRIGGER_SLEEP_TIME = 1  # sleep time in seconds between turning the relay on and off

# set TRIGGER_PIN on as default
GPIO.setmode(GPIO.BCM)
GPIO.setup(TRIGGER_PIN, GPIO.OUT)

# turn off TRIGGER_PIN and restores it after TRIGGER_SLEEP_TIME
try:
    GPIO.output(TRIGGER_PIN, GPIO.LOW)
    time.sleep(TRIGGER_SLEEP_TIME)
    GPIO.cleanup()
except:
    GPIO.cleanup()
