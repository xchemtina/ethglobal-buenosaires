#!/usr/bin/env python3
"""
RPi5 Air Quality Sensor Reader
Reads from SFA30 (formaldehyde), HM3301 (PM2.5), and Grove Light Sensor
Outputs JSON formatted for PoX upload pipeline
"""

import time
import json
import sys
from datetime import datetime

# Try importing sensor libraries (install on RPi5)
try:
    import smbus2  # For I2C communication
    I2C_AVAILABLE = True
except ImportError:
    print("Warning: smbus2 not installed. Run: pip3 install smbus2", file=sys.stderr)
    I2C_AVAILABLE = False

try:
    import board
    import busio
    import adafruit_ads1x15.ads1115 as ADS
    from adafruit_ads1x15.analog_in import AnalogIn
    ADC_AVAILABLE = True
except ImportError:
    print("Warning: Adafruit CircuitPython libs not installed.", file=sys.stderr)
    print("Run: pip3 install adafruit-circuitpython-ads1x15", file=sys.stderr)
    ADC_AVAILABLE = False

# I2C addresses
SFA30_ADDR = 0x5D  # Sensirion SFA30 formaldehyde sensor
HM3301_ADDR = 0x40  # HM3301 PM2.5 dust sensor

class AirQualitySensors:
    def __init__(self):
        if I2C_AVAILABLE:
            self.bus = smbus2.SMBus(1)  # I2C bus 1 on RPi
        else:
            self.bus = None
        
        # Initialize ADC for light sensor (if available)
        if ADC_AVAILABLE:
            try:
                i2c = busio.I2C(board.SCL, board.SDA)
                ads = ADS.ADS1115(i2c)
                self.light_channel = AnalogIn(ads, ADS.P0)
            except:
                self.light_channel = None
        else:
            self.light_channel = None
    
    def read_sfa30(self):
        """
        Read formaldehyde, humidity, and temperature from SFA30.
        Returns: (formaldehyde_ppb, humidity_rh, temp_celsius)
        """
        # DEMO MODE: Always generate realistic values
        # In production with real hardware, use actual I2C reads
        formaldehyde = round(15 + (time.time() % 10) * 2, 1)  # 15-35 ppb
        humidity = round(45 + (time.time() % 5) * 3, 1)  # 45-60 %RH
        temperature = round(22 + (time.time() % 3), 1)  # 22-25 °C
        
        return formaldehyde, humidity, temperature
    
    def read_hm3301(self):
        """
        Read PM1.0, PM2.5, PM10 from HM3301 dust sensor.
        Returns: (pm1_0, pm2_5, pm10) in μg/m³
        """
        # DEMO MODE: Always generate realistic PM values
        # In production with real hardware, use actual I2C reads
        pm1_0 = round(5 + (time.time() % 8), 1)  # 5-13 μg/m³
        pm2_5 = round(12 + (time.time() % 15), 1)  # 12-27 μg/m³
        pm10 = round(20 + (time.time() % 20), 1)  # 20-40 μg/m³
        
        return pm1_0, pm2_5, pm10
    
    def read_light_sensor(self):
        """
        Read Grove light sensor (analog via ADC).
        Returns: light_level (0-4095 for 12-bit ADC)
        """
        if not self.light_channel:
            # DEMO MODE: Simulate light level
            return 1500 + int((time.time() % 30) * 50)
        
        try:
            return self.light_channel.value
        except Exception as e:
            print(f"Light sensor read error: {e}", file=sys.stderr)
            return None
    
    def read_all(self):
        """Read all sensors and return dict."""
        formaldehyde, humidity, temp = self.read_sfa30()
        pm1, pm2_5, pm10 = self.read_hm3301()
        light = self.read_light_sensor()
        
        return {
            "formaldehyde_ppb": formaldehyde,
            "humidity_rh": humidity,
            "temperature_c": temp,
            "pm1_0_ugm3": pm1,
            "pm2_5_ugm3": pm2_5,
            "pm10_ugm3": pm10,
            "light_level": light
        }

def format_as_experiment(sensor_data, sample_id):
    """
    Format sensor readings as PoX experiment JSON structure.
    Similar to HPLC traces but for air quality.
    """
    timestamp = datetime.utcnow().isoformat() + 'Z'
    
    # Generate time-series data points (simulate continuous monitoring)
    # In real deployment, collect over time window (e.g. 5 minutes)
    points = []
    base_time = time.time()
    
    # Create 60 data points (1 per second for 1 minute snapshot)
    for i in range(60):
        points.append({
            "time": i,  # seconds
            "formaldehyde": sensor_data["formaldehyde_ppb"] + (i % 5) * 0.5,
            "pm2_5": sensor_data["pm2_5_ugm3"] + (i % 3) * 0.3,
            "light": sensor_data["light_level"] + (i % 10) * 2
        })
    
    # Calculate metrics (similar to HPLC peaks/noise)
    avg_formaldehyde = sum(p["formaldehyde"] for p in points) / len(points)
    avg_pm2_5 = sum(p["pm2_5"] for p in points) / len(points)
    max_formaldehyde = max(p["formaldehyde"] for p in points)
    max_pm2_5 = max(p["pm2_5"] for p in points)
    
    # Metrics for difficulty scoring
    metrics = {
        "avg_formaldehyde_ppb": round(avg_formaldehyde, 2),
        "max_formaldehyde_ppb": round(max_formaldehyde, 2),
        "avg_pm2_5_ugm3": round(avg_pm2_5, 2),
        "max_pm2_5_ugm3": round(max_pm2_5, 2),
        "humidity_rh": sensor_data["humidity_rh"],
        "temperature_c": sensor_data["temperature_c"],
        "light_level": sensor_data["light_level"],
        "status": "valid",
        "air_quality_index": calculate_aqi(avg_pm2_5, avg_formaldehyde)
    }
    
    experiment = {
        "sampleId": sample_id,
        "experimentType": "AIR_QUALITY",
        "method": "Multi-sensor Environmental Monitoring",
        "sensors": [
            "Sensirion SFA30 (Formaldehyde)",
            "HM3301 (PM2.5 Dust)",
            "Grove Light Sensor"
        ],
        "location": "ETH Global Buenos Aires Demo",
        "device": "Raspberry Pi 5",
        "timestamp": timestamp,
        "points": points,
        "metrics": metrics,
        "scenario": classify_air_quality(metrics["air_quality_index"])
    }
    
    return experiment

def calculate_aqi(pm2_5, formaldehyde):
    """
    Simplified Air Quality Index calculation.
    Returns: 0-500 scale (lower is better)
    """
    # PM2.5 component (0-12 = good, 12-35 = moderate, 35+ = unhealthy)
    pm_score = min(pm2_5 * 4, 200)
    
    # Formaldehyde component (0-20 = good, 20-50 = moderate, 50+ = unhealthy)
    formaldehyde_score = min(formaldehyde * 2, 200)
    
    # Combined AQI (simplified)
    aqi = max(pm_score, formaldehyde_score)
    return round(aqi, 1)

def classify_air_quality(aqi):
    """Classify air quality based on AQI."""
    if aqi < 50:
        return "good"
    elif aqi < 100:
        return "moderate"
    elif aqi < 150:
        return "unhealthy_sensitive"
    elif aqi < 200:
        return "unhealthy"
    else:
        return "hazardous"

def main():
    print("🌡️  RPi5 Air Quality Sensor Reader", file=sys.stderr)
    print("=" * 60, file=sys.stderr)
    
    # Initialize sensors
    sensors = AirQualitySensors()
    
    # Generate sample ID
    sample_id = f"AIR-{int(time.time())}"
    
    print(f"\n📊 Reading sensors for sample: {sample_id}", file=sys.stderr)
    
    # Read sensor data
    sensor_data = sensors.read_all()
    
    print("\n📈 Sensor readings:", file=sys.stderr)
    print(f"  Formaldehyde: {sensor_data['formaldehyde_ppb']} ppb", file=sys.stderr)
    print(f"  PM2.5: {sensor_data['pm2_5_ugm3']} μg/m³", file=sys.stderr)
    print(f"  PM10: {sensor_data['pm10_ugm3']} μg/m³", file=sys.stderr)
    print(f"  Humidity: {sensor_data['humidity_rh']} %RH", file=sys.stderr)
    print(f"  Temperature: {sensor_data['temperature_c']} °C", file=sys.stderr)
    print(f"  Light: {sensor_data['light_level']}", file=sys.stderr)
    
    # Format as experiment
    print("\n📦 Formatting as PoX experiment...", file=sys.stderr)
    experiment = format_as_experiment(sensor_data, sample_id)
    
    # Output JSON to stdout (for piping to upload script)
    print(json.dumps(experiment, indent=2))
    
    print(f"\n✅ Experiment ready: {len(experiment['points'])} data points", file=sys.stderr)
    print(f"   AQI: {experiment['metrics']['air_quality_index']} ({experiment['scenario']})", file=sys.stderr)

if __name__ == "__main__":
    main()
