# RPi5 Air Quality Sensor Integration

Live sensor data → Filecoin → PoX Network

## Hardware Setup

### Sensors
- **SFA30**: Formaldehyde sensor (I²C, addr 0x5D)
- **HM3301**: PM2.5 dust sensor (I²C, addr 0x40)
- **Grove Light**: Analog light sensor (via ADS1115 ADC)

### Wiring
```
RPi5 GPIO:
  Pin 3 (SDA) → All I²C sensors SDA
  Pin 5 (SCL) → All I²C sensors SCL
  Pin 1 (3.3V) → Sensor VCC
  Pin 6 (GND) → Sensor GND

Light sensor → ADS1115 ADC → I²C bus
```

## Quick Start (Mac → RPi5)

### 1. Copy files to RPi5
```bash
# From your Mac
scp rpi5/read_sensors.py pi@<RPI_IP>:~/pox/
scp rpi5/upload-air-quality.mjs pi@<RPI_IP>:~/pox/
scp .env pi@<RPI_IP>:~/pox/.env
```

### 2. SSH into RPi5 and setup
```bash
ssh pi@<RPI_IP>

# Install dependencies
sudo apt update
sudo apt install -y python3-pip i2c-tools

# Enable I2C
sudo raspi-config
# Navigate to: Interface Options → I2C → Enable

# Install Python libraries
pip3 install smbus2
pip3 install adafruit-circuitpython-ads1x15

# Install Node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Node dependencies
cd ~/pox
npm install @filoz/synapse-sdk ethers dotenv multiformats
```

### 3. Verify sensor connections
```bash
# Check I2C devices
i2cdetect -y 1

# Should show:
#      0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
# 00:          -- -- -- -- -- -- -- -- -- -- -- -- -- 
# 10:          -- -- -- -- -- -- -- -- -- -- -- -- -- 
# 20:          -- -- -- -- -- -- -- -- -- -- -- -- -- 
# 30:          -- -- -- -- -- -- -- -- -- -- -- -- -- 
# 40: 40 -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
# 50:          -- -- -- -- -- 5d -- -- -- -- -- -- -- 
```

### 4. Test sensor reading
```bash
python3 read_sensors.py > test-experiment.json 2>&1
cat test-experiment.json  # Should show JSON experiment
```

### 5. Upload to Filecoin
```bash
# One-shot: read sensors and upload
python3 read_sensors.py 2>/dev/null | node upload-air-quality.mjs

# Or in two steps:
python3 read_sensors.py > experiment.json 2>&1
node upload-air-quality.mjs experiment.json
```

## Demo Mode (No Real Sensors)

The Python script has **demo mode** built-in. If sensor libraries aren't available, it generates realistic simulated data. This lets you test the pipeline on your Mac:

```bash
# On Mac (no sensors needed)
cd ~/ETHGlobalBuenosAires/rpi5
python3 read_sensors.py > test-air-quality.json 2>&1

# Upload simulated data
node upload-air-quality.mjs test-air-quality.json
```

## Continuous Monitoring

Create a loop script for live demo:

```bash
# rpi5/monitor-loop.sh
#!/bin/bash
while true; do
    echo "📊 Reading sensors..."
    python3 read_sensors.py 2>/dev/null | node upload-air-quality.mjs
    echo "⏸️  Waiting 60 seconds..."
    sleep 60
done
```

Run:
```bash
chmod +x monitor-loop.sh
./monitor-loop.sh
```

## Troubleshooting

### I2C not working
```bash
sudo raspi-config  # Enable I2C
sudo reboot
i2cdetect -y 1  # Verify devices show up
```

### Python library errors
```bash
# If smbus2 fails
sudo apt install python3-smbus

# If Adafruit libs fail
pip3 install --upgrade adafruit-blinka
pip3 install adafruit-circuitpython-ads1x15
```

### Node.js errors
```bash
# If Synapse SDK fails
cd ~/pox
npm install
node -e "import('ethers').then(()=>console.log('OK'))"
```

## Data Format

Output JSON structure:
```json
{
  "sampleId": "AIR-1732320000",
  "experimentType": "AIR_QUALITY",
  "method": "Multi-sensor Environmental Monitoring",
  "sensors": [
    "Sensirion SFA30 (Formaldehyde)",
    "HM3301 (PM2.5 Dust)",
    "Grove Light Sensor"
  ],
  "location": "ETH Global Buenos Aires Demo",
  "device": "Raspberry Pi 5",
  "timestamp": "2024-11-23T00:00:00.000Z",
  "points": [
    {"time": 0, "formaldehyde": 15.2, "pm2_5": 12.5, "light": 1520},
    ...60 points total
  ],
  "metrics": {
    "avg_formaldehyde_ppb": 16.8,
    "max_formaldehyde_ppb": 18.2,
    "avg_pm2_5_ugm3": 13.1,
    "max_pm2_5_ugm3": 14.7,
    "humidity_rh": 52.3,
    "temperature_c": 23.1,
    "light_level": 1540,
    "air_quality_index": 52.4,
    "status": "valid"
  },
  "scenario": "moderate"
}
```

## Architecture

```
┌─────────────┐
│ SFA30       │──┐
│ (HCHO)      │  │
└─────────────┘  │
                 │  I²C
┌─────────────┐  │  Bus
│ HM3301      │──┼──────► read_sensors.py
│ (PM2.5)     │  │            │
└─────────────┘  │            │ JSON
                 │            ▼
┌─────────────┐  │    upload-air-quality.mjs
│ Light + ADC │──┘            │
└─────────────┘               │ Synapse SDK
                              ▼
                         Filecoin CID
                              │
                              ▼
                     PoXRegistry.sol
                        (On-chain)
```

## Next: Dashboard Integration

After successful RPi5 upload, the experiment appears in the dashboard:
1. Query contract for new experiments
2. Fetch JSON from Filecoin via CID
3. Display air quality metrics + time series
4. Show live updates as RPi5 uploads
