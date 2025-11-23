# 🎯 DEMO DAY CHEAT SHEET

**2-MINUTE SETUP** • **7-MINUTE DEMO** • **EVERYTHING YOU NEED**

---

## 🚀 PRE-DEMO SETUP (10 min before)

### 1. Start Dashboard
```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter-new
npm run dev
```
**Wait for**: `✓ Ready on http://localhost:3000`

### 2. Open Browser Tabs
- **Demo tab**: http://localhost:3000/experiments
- **Backup tab**: https://calibration.filscan.io/address/0xA6Fa61924F06DB9A84B92182B69F5C08F3176554

### 3. Prepare Terminal
```bash
cd ~/ETHGlobalBuenosAires/rpi5
# OR on RPi5: cd ~/pox
```

---

## 🎬 DEMO SCRIPT (7 minutes)

### **Slide 1: Problem** (30 sec)
- "Scientific data is siloed and non-verifiable"
- "Labs can't trust each other's results"  
- "No reputation system for data quality"

### **Slide 2: Solution** (30 sec)
- "PoX: Proof-of-Experiment on Filecoin"
- "Decentralized storage + Smart contract verification"
- "Works with ANY sensor or instrument"

### **DEMO PART 1: Show Existing Data** (2 min)

**Switch to browser** → http://localhost:3000/experiments

**Say while pointing**:
> "We already have 17 experiments on-chain:
> - 16 HPLC chromatography traces (ORANGE badges)
> - 1 Air Quality reading from our Raspberry Pi (GREEN badge)
> 
> Each has:
> - Difficulty score (based on data complexity)
> - Filecoin CID (immutable storage)
> - On-chain verification
>
> Dashboard auto-refreshes every 30 seconds"

**Scroll** through experiments, show mix of types

### **DEMO PART 2: LIVE UPLOAD** (3 min)

**Switch to terminal**

**Say**:
> "Now watch us upload a NEW air quality experiment in real-time"

**Run**:
```bash
./demo-upload.sh
```

**Narrate while it runs** (~30 seconds):
> "Reading three sensors:
> - Formaldehyde (toxin monitoring)
> - PM2.5 particulates (air quality)
> - Light sensor
>
> Formatting 60 data points as JSON...
> Uploading to Filecoin... [CID appears]
> Computing verification hashes...
> Calculating difficulty from AQI...
> Registering on smart contract... [TX hash appears]
> Confirmed!"

**Point out**:
- CID (bafkz...)
- Transaction hash (0x...)
- Difficulty score
- Block number

### **DEMO PART 3: Live Dashboard Update** (1 min)

**Switch back to browser**

**Click refresh button** (or wait 30s)

**Say**:
> "And there it is - experiment just appeared!
> 
> Total experiments: 17 → 18
> Air Quality count: 1 → 2
>
> Same pipeline works for:
> - HPLC, GC-MS, NMR
> - Environmental sensors
> - Any scientific instrument"

### **Slide 3: Architecture** (30 sec)

**Show diagram or explain**:
> "Three layers:
> 1. Filecoin - decentralized storage
> 2. Smart contracts - fraud-proof verification
> 3. Reputation - quality scoring
>
> Data is immutable and verifiable by anyone"

### **Slide 4: What's Next** (30 sec)
- "Partnership with Causality Network for real lab data"
- "Multi-modal experiments (NMR, spectroscopy)"
- "DAO-governed fraud challenges"
- "ZK proofs for private data"

---

## 🔧 IF THINGS BREAK

### Dashboard won't load?
```bash
# Restart
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter-new
killall node
npm run dev
```

### Upload fails?
**Use Mac demo mode** (works 100% offline):
```bash
cd ~/ETHGlobalBuenosAires/rpi5
python3 read_sensors.py 2>/dev/null > /tmp/air.json
node upload-air-quality.mjs /tmp/air.json
```

### No internet?
- Show **screenshots** (take these beforehand!)
- Show **Filecoin explorer** (open tab with experiments already loaded)

---

## 💬 KEY TALKING POINTS

### Why Filecoin?
> "Decentralized storage - not AWS. Data survives even if our company doesn't."

### How do you prevent fake data?
> "Hash-based fraud proofs. Anyone can download the CID, re-run analysis, compare hashes. If they don't match, open a challenge. Submitter loses reputation."

### Who uses this?
> "Research labs, citizen scientists, IoT sensor networks, anywhere trust in experimental data matters."

### What about privacy?
> "Roadmap includes ZK proofs - prove data is valid without revealing the data itself."

### Why not just use a database?
> "Three reasons: Immutability (can't change history), Verifiability (anyone can check), Incentives (reputation rewards quality)."

---

## 📊 NUMBERS TO REMEMBER

- **17 experiments** on-chain (16 HPLC + 1 Air Quality)
- **Filecoin Calibration** testnet (soon mainnet)
- **30-second** auto-refresh
- **3 sensors**: SFA30, HM3301, Grove Light
- **60 data points** per experiment
- **2 experiment types**: HPLC (orange), Air Quality (green)

---

## 🎨 DEMO AESTHETICS

- **Orange**: HPLC experiments (your brand color)
- **Green**: Air Quality experiments (fresh/environmental)
- **Purple**: Addresses and sync time (tech/crypto)
- **Pulsing green dot**: "SYSTEM ONLINE" (feels alive!)
- **Font**: Monospace (technical/authentic)

---

## 🏆 WHAT MAKES YOU WIN

1. **LIVE DEMO**: Most teams show mock data. You show REAL on-chain data.
2. **NOVEL USE CASE**: Scientific data on blockchain is unique at this hackathon.
3. **DUAL MODALITIES**: HPLC + Air Quality shows system flexibility.
4. **REAL HARDWARE**: Raspberry Pi with actual sensors (or realistic demo mode).
5. **PRODUCTION-READY**: Fraud proofs, reputation, difficulty scoring all working.

---

## ⏰ TIMING GUIDE

```
0:00 - 0:30    Problem slide
0:30 - 1:00    Solution slide
1:00 - 3:00    Show existing dashboard data
3:00 - 6:00    Live upload from RPi5
6:00 - 6:30    Watch dashboard update
6:30 - 7:00    Architecture + next steps
```

**Total**: 7 minutes (perfect for hackathon demos)

---

## 🎤 OPENING LINE

> "Scientists deserve better infrastructure. Today we're showing PoX - Proof-of-Experiment - a decentralized network for verifiable scientific data. Watch us upload a live air quality reading from this Raspberry Pi to Filecoin and verify it on-chain in under a minute."

## 🎤 CLOSING LINE

> "Any sensor, any lab, any scientist can join the network. Data is immutable, verifiable, and reputation-scored. n×(AI+Scientist) is greater than 'AI-Scientist'. Thank you."

---

## 📸 BACKUP MATERIALS (Take Now!)

1. Screenshot: Dashboard showing 17 experiments
2. Screenshot: Terminal during upload (with CID visible)
3. Screenshot: Dashboard showing 18 experiments (after upload)
4. Screenshot: Filecoin explorer with experiments
5. Video: 30-second screen recording of upload → dashboard update

---

## ✅ FINAL CHECKLIST

**30 min before**:
- [ ] Dashboard running (`npm run dev`)
- [ ] Browser tabs open (experiments + explorer)
- [ ] Terminal ready in `rpi5/` directory
- [ ] Screenshots taken
- [ ] Backup plan ready (demo mode tested)

**5 min before**:
- [ ] Close unnecessary apps (reduce lag)
- [ ] Turn off notifications
- [ ] Zoom in browser (Cmd +) for visibility
- [ ] Test upload once to warm up caches

**During demo**:
- [ ] Speak clearly and slowly
- [ ] Point at screen elements
- [ ] Pause after key moments
- [ ] Smile and make eye contact with judges

---

**YOU'VE GOT THIS!** 🚀

The tech works. The demo is ready. The story is compelling. 

Go win this thing.

**Fortis est Veritas** ⚡
