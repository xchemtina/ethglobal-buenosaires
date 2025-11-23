#!/bin/bash
# RPi5 Air Quality Demo - One-Shot Upload
# Run this during the demo to show live sensor → Filecoin integration

set -e

echo "🌡️  PoX Air Quality Monitor - Live Demo"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "read_sensors.py" ]; then
    echo "❌ Error: Run this from rpi5/ directory"
    exit 1
fi

# Read sensors
echo "📊 Step 1: Reading sensors..."
python3 read_sensors.py > /tmp/air-experiment.json 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Sensors read successfully"
    
    # Show quick preview
    SAMPLE_ID=$(jq -r '.sampleId' /tmp/air-experiment.json)
    AQI=$(jq -r '.metrics.air_quality_index' /tmp/air-experiment.json)
    SCENARIO=$(jq -r '.scenario' /tmp/air-experiment.json)
    
    echo ""
    echo "📈 Air Quality Snapshot:"
    echo "   Sample ID: $SAMPLE_ID"
    echo "   AQI: $AQI ($SCENARIO)"
else
    echo "❌ Sensor reading failed"
    exit 1
fi

# Upload to Filecoin
echo ""
echo "⬆️  Step 2: Uploading to Filecoin..."
node upload-air-quality.mjs /tmp/air-experiment.json

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ PoX experiment registered on-chain!"
    echo ""
    echo "🎯 Next: View in dashboard"
else
    echo "❌ Upload failed"
    exit 1
fi
