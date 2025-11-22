#!/usr/bin/env bash
# Copy HPLC trace JSON files to Next.js public directory

set -e

SOURCE_DIR="../data/traces"
DEST_DIR="./public/traces"

echo "📋 Copying HPLC traces to public directory..."

mkdir -p "$DEST_DIR"

# Copy all JSON files
cp -v "$SOURCE_DIR"/*.json "$DEST_DIR/"

echo "✅ Traces copied successfully!"
echo "📁 Files available at: $DEST_DIR"
echo ""
echo "💡 To use real data, edit lib/data-service.ts:"
echo "   Uncomment the fetchHplcTraceFile() lines in fetchHplcData()"
