# PoX Operations Guide
**Monday Morning Manual: How to Actually Run This**

*Pragmatic guide for deploying, monitoring, and maintaining PoX in production*

---

## 🚨 Quick Start (5 Minutes)

### Prerequisites Check

```bash
# Verify installations
node --version    # Should be 20+
npm --version     # Should be 10+
forge --version   # Should be latest
python3 --version # Should be 3.9+

# Check environment variables
cat .env | grep -E "FILECOIN_CLOUD_RPC|PRIVATE_KEY|REGISTRY_ADDRESS"
```

###Start Dashboard (Local)

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter-new
npm run dev

# Should see:
# ✓ Ready on http://localhost:3000
# Open: http://localhost:3000/experiments
```

### Upload Test Experiment

```bash
# Option A: Air Quality (if RPi5 connected)
cd ~/ETHGlobalBuenosAires/rpi5
./demo-upload.sh

# Option B: NMR (synthetic)
cd ~/ETHGlobalBuenosAires/packages/nmr-experiments
npm run generate 2000 moderate
cd ../../rpi5
node upload-nmr.mjs ../packages/nmr-experiments/output/NMR-002000.json
```

### Verify Upload

1. Check terminal output for CID and tx hash
2. Open dashboard → Should see new experiment within 30s
3. Open explorer: `https://calibration.filscan.io/tx/<TX_HASH>`

---

## 📋 System Health Checks

### Daily Monitoring

```bash
# 1. Check dashboard is running
curl -s http://localhost:3000/api/experiments | jq '.stats'

# 2. Check contract state
cast call $REGISTRY_ADDRESS "totalExperiments()" --rpc-url $FILECOIN_CLOUD_RPC

# 3. Check wallet balance
cast balance $WALLET_ADDRESS --rpc-url $FILECOIN_CLOUD_RPC --ether

# 4. Check latest experiment
cast call $REGISTRY_ADDRESS "getExperiment(uint256)" $(cast call $REGISTRY_ADDRESS "totalExperiments()" --rpc-url $FILECOIN_CLOUD_RPC | cast --to-dec | awk '{print $1-1}') --rpc-url $FILECOIN_CLOUD_RPC
```

### Weekly Tasks

- [ ] Review experiment uploads (any failed?)
- [ ] Check gas prices (are we overpaying?)
- [ ] Backup `.env` file (encrypted)
- [ ] Review logs for errors
- [ ] Test fraud proof flow (manual)

### Monthly Tasks

- [ ] Rotate wallet keys (if needed)
- [ ] Update dependencies (`npm update`, `forge update`)
- [ ] Review contract events
- [ ] Generate usage report
- [ ] Plan capacity scaling

---

## 🔧 Common Operations

### Upload Bulk Experiments

**Scenario**: You want to seed the network with 50 HPLC experiments

```bash
# 1. Generate experiments
cd ~/ETHGlobalBuenosAires/packages/experiments
for i in {1..50}; do
  npx tsx src/pox.ts $i > output/exp_$i.json
done

# 2. Create batch upload script
cat > upload_batch.sh << 'EOF'
#!/bin/bash
for file in output/exp_*.json; do
  echo "Uploading $file..."
  node ../../../rpi5/upload-air-quality.mjs "$file"
  sleep 5  # Rate limiting
done
EOF
chmod +x upload_batch.sh

# 3. Run batch upload
./upload_batch.sh
```

### Generate More NMR Experiments

**Scenario**: Dashboard looks empty, need more NMR data

```bash
cd ~/ETHGlobalBuenosAires/packages/nmr-experiments
npm run batch 20  # Generates 20 experiments

# Upload all at once
cd output
for file in *.json; do
  echo "Uploading $file..."
  node ../../../rpi5/upload-nmr.mjs "$file"
  sleep 3
done
```

### Check Experiment Details On-Chain

**Scenario**: User reports experiment #42 looks wrong

```bash
# Fetch experiment data
cast call $REGISTRY_ADDRESS \
  "getExperiment(uint256)" 42 \
  --rpc-url $FILECOIN_CLOUD_RPC

# Decode result (returns tuple)
# [id, submitter, cid, dataHash, metricsHash, difficulty, initialRV, submittedAt]

# Download from Filecoin (requires Node.js)
node << 'EOF'
const { downloadFromFilecoin } = require('./blockchain-status-plotter-new/lib/filecoin-storage.ts');
downloadFromFilecoin('bafkzcib...').then(data => {
  console.log(JSON.stringify(data, null, 2));
});
EOF
```

### Recompute Hash (Fraud Proof Verification)

**Scenario**: Someone challenges experiment #42, you need to verify

```bash
# 1. Download experiment from Filecoin
# (Use dashboard or Synapse SDK)

# 2. Recompute hashes
node << 'EOF'
const ethers = require('ethers');
const experiment = require('./experiment_42.json');

// Stable stringify (sorted keys)
function stableStringify(obj) {
  if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
  if (Array.isArray(obj)) return '[' + obj.map(v => stableStringify(v)).join(',') + ']';
  const keys = Object.keys(obj).sort();
  const entries = keys.map(k => `"${k}":${stableStringify(obj[k])}`);
  return `{${entries.join(',')}}`;
}

const dataHash = ethers.keccak256(ethers.toUtf8Bytes(stableStringify({
  metadata: experiment.metadata,
  dataPoints: experiment.dataPoints
})));

const metricsHash = ethers.keccak256(ethers.toUtf8Bytes(stableStringify(experiment.metrics)));

console.log('dataHash:', dataHash);
console.log('metricsHash:', metricsHash);
EOF

# 3. Compare to on-chain values
cast call $REGISTRY_ADDRESS "getExperiment(uint256)" 42 --rpc-url $FILECOIN_CLOUD_RPC | grep -E "dataHash|metricsHash"
```

---

## 🐛 Troubleshooting

### Issue: Dashboard won't start

**Symptoms**: `npm run dev` fails with port error

**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue: Upload fails with "insufficient balance"

**Symptoms**: Transaction reverts with "insufficient funds"

**Solution**:
```bash
# Check balance
cast balance $WALLET_ADDRESS --rpc-url $FILECOIN_CLOUD_RPC --ether

# Get test tFIL from faucet
open https://faucet.calibration.fildev.network/

# Or use backup wallet
export PRIVATE_KEY=$BACKUP_PRIVATE_KEY
```

### Issue: Synapse upload hangs

**Symptoms**: `synapse.storage.upload()` never resolves

**Solution**:
```bash
# Check Filecoin RPC is responsive
curl -X POST $FILECOIN_CLOUD_RPC \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# If timeout, try different RPC
export FILECOIN_CLOUD_RPC="https://api.calibration.node.glif.io/rpc/v1"

# Or add timeout to upload script
# (see DEVELOPERS.md for timeout config)
```

### Issue: Dashboard shows wrong experiment count

**Symptoms**: "Total: 20" but only 18 experiments visible

**Solution**:
```bash
# Clear Next.js cache
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter-new
rm -rf .next
npm run dev

# Force browser refresh
# Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)
```

### Issue: NMR generation fails with "module not found"

**Symptoms**: `npm run generate` crashes

**Solution**:
```bash
cd ~/ETHGlobalBuenosAires/packages/nmr-experiments
rm -rf node_modules package-lock.json
npm install
npm run generate 1000 moderate
```

### Issue: RPi5 sensors not detected

**Symptoms**: `read_sensors.py` exits with I²C error

**Solution**:
```bash
# Enable I²C on RPi5
sudo raspi-config
# → Interface Options → I2C → Enable

# Check I²C devices
i2cdetect -y 1

# Should see:
# 0x40 (HM3301)
# 0x5D (SFA30)

# If missing, check wiring
# Or use demo mode (fallback to simulated data)
python3 read_sensors.py 2>/dev/null > /tmp/air.json
```

---

## 📊 Monitoring & Alerts

### Grafana Dashboard (Future)

**Metrics to track**:
- Total experiments over time
- Experiments per type (HPLC/Air Quality/NMR)
- Upload success rate
- Gas costs per upload
- Challenge rate
- Reputation distribution

**Setup** (when you have time):
```bash
# Install Prometheus + Grafana
docker-compose up -d prometheus grafana

# Configure data source (Filecoin RPC)
# Import dashboard template (coming soon)
```

### Simple Log Monitoring

**Current approach** (no infra needed):

```bash
# Watch dashboard logs
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter-new
npm run dev 2>&1 | tee logs/dashboard_$(date +%Y%m%d).log

# Watch upload logs
cd ~/ETHGlobalBuenosAires/rpi5
./demo-upload.sh 2>&1 | tee -a logs/uploads_$(date +%Y%m%d).log

# Grep for errors
grep -i "error\|fail" logs/*.log
```

### Alert Script (Cron Job)

```bash
# Create alert script
cat > ~/check_pox.sh << 'EOF'
#!/bin/bash
REGISTRY_ADDRESS="0xA6Fa61924F06DB9A84B92182B69F5C08F3176554"
RPC_URL="https://api.calibration.node.glif.io/rpc/v1"

# Check total experiments
TOTAL=$(cast call $REGISTRY_ADDRESS "totalExperiments()" --rpc-url $RPC_URL | cast --to-dec)

# Check if stale (no uploads in 24 hours)
LAST_EXP=$(cast call $REGISTRY_ADDRESS "getExperiment(uint256)" $((TOTAL - 1)) --rpc-url $RPC_URL)
TIMESTAMP=$(echo "$LAST_EXP" | grep -oP 'submittedAt: \K[0-9]+')
NOW=$(date +%s)
AGE=$((NOW - TIMESTAMP))

if [ $AGE -gt 86400 ]; then
  echo "🚨 ALERT: No experiments uploaded in 24 hours!"
  # Send notification (add your webhook here)
fi
EOF
chmod +x ~/check_pox.sh

# Add to cron (runs every hour)
(crontab -l ; echo "0 * * * * ~/check_pox.sh") | crontab -
```

---

## 🔒 Security Best Practices

### Private Key Management

**DO**:
- ✅ Store in `.env` (gitignored)
- ✅ Use hardware wallet for mainnet
- ✅ Rotate keys quarterly
- ✅ Backup encrypted (GPG or KeePass)

**DON'T**:
- ❌ Never commit to git
- ❌ Never share in chat
- ❌ Never log to console
- ❌ Never hardcode in scripts

**Backup procedure**:
```bash
# Encrypt backup
gpg --encrypt --recipient your@email.com .env
mv .env.gpg ~/Dropbox/PoX_Backups/env_$(date +%Y%m%d).gpg

# Restore
gpg --decrypt ~/Dropbox/PoX_Backups/env_20241123.gpg > .env
```

### Environment Variables Checklist

```bash
# Required for upload scripts
FILECOIN_CLOUD_RPC="https://api.calibration.node.glif.io/rpc/v1"
PRIVATE_KEY="0x..."  # 64 hex chars
REGISTRY_ADDRESS="0xA6Fa61924F06DB9A84B92182B69F5C08F3176554"

# Optional
BACKUP_PRIVATE_KEY="0x..."  # Emergency wallet
FILSCAN_API_KEY="..."  # For contract verification
SENTRY_DSN="..."  # Error tracking (future)
```

### Access Control

**Who has what access?**
- **Registry contract**: Public (anyone can register experiments)
- **Reputation contract**: Only Registry + ChallengeManager
- **ChallengeManager**: Only owner can resolve (roadmap: DAO)
- **Dashboard**: Read-only (no auth needed)
- **Upload scripts**: Requires private key

---

## 📦 Backup & Recovery

### Full System Backup

```bash
#!/bin/bash
# backup_pox.sh

BACKUP_DIR=~/PoX_Backups/$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# 1. Environment variables (encrypted)
gpg --encrypt --recipient your@email.com .env -o $BACKUP_DIR/env.gpg

# 2. Contract addresses
echo "REGISTRY=$REGISTRY_ADDRESS" > $BACKUP_DIR/contracts.txt

# 3. Generated experiments (last 7 days)
find ~/ETHGlobalBuenosAires/packages -name "*.json" -mtime -7 -exec cp {} $BACKUP_DIR/ \;

# 4. Dashboard config
cp ~/ETHGlobalBuenosAires/blockchain-status-plotter-new/.env $BACKUP_DIR/dashboard.env

# 5. Logs
tar -czf $BACKUP_DIR/logs.tar.gz logs/

# 6. Upload to cloud
# rsync -avz $BACKUP_DIR your@server:/backups/pox/
# Or: rclone sync $BACKUP_DIR remote:pox-backups
```

### Disaster Recovery

**Scenario**: Laptop dies, need to rebuild from scratch

```bash
# 1. Restore environment
gpg --decrypt env.gpg > .env
source .env

# 2. Clone repo
git clone <REPO_URL> PoX
cd PoX

# 3. Install dependencies
npm install  # Dashboard
cd packages/nmr-experiments && npm install  # NMR generator
cd ../experiments && npm install  # HPLC generator

# 4. Verify contracts still accessible
cast call $REGISTRY_ADDRESS "totalExperiments()" --rpc-url $FILECOIN_CLOUD_RPC

# 5. Restart dashboard
cd blockchain-status-plotter-new
npm run dev

# Done! System recovered.
```

---

## 🚀 Scaling Up

### When You Hit Limits

**Upload Rate Limit** (current: ~1 exp/5 seconds):
```bash
# Option A: Use multiple wallets
export WALLET_1=$PRIVATE_KEY_1
export WALLET_2=$PRIVATE_KEY_2

# Option B: Batch uploads (future feature)
# Option C: Use queue system (RabbitMQ/Redis)
```

**Dashboard Performance** (current: 20 experiments loads in ~2s):
```bash
# Option A: Add pagination
# Option B: Use virtual scrolling
# Option C: Move to server-side rendering only
```

**Filecoin Storage Costs**:
- Calibration testnet: Free (test tFIL)
- Mainnet: ~$0.01 per GB per year (varies)
- Budget for 1000 experiments (~600KB each) = ~$6/year

---

## 📈 Growth Roadmap

### Week 1: Stabilize
- [ ] Run for 7 days without crashes
- [ ] Upload 100+ experiments
- [ ] Document all issues
- [ ] Set up monitoring

### Month 1: Optimize
- [ ] Reduce upload time to <10s
- [ ] Add batch operations
- [ ] Implement caching
- [ ] Deploy to Vercel

### Month 3: Scale
- [ ] Partner with 3 labs
- [ ] 1000+ experiments on-chain
- [ ] DAO governance live
- [ ] Mainnet migration

### Month 6: Production
- [ ] 10+ partner labs
- [ ] Multi-chain support
- [ ] Reputation marketplace
- [ ] ZK proof system

---

## 🎯 Quick Reference

### Essential Commands

```bash
# Dashboard
npm run dev                     # Start dashboard
npm run build                   # Build for production
npm run lint                    # Check code style

# Upload
./demo-upload.sh                # Upload air quality
node upload-nmr.mjs <file>      # Upload NMR

# Generate
npm run generate [seed] [type]  # Single NMR
npm run batch [count]           # Batch NMR

# Contracts
cast call $REGISTRY_ADDRESS "totalExperiments()"  # Get count
cast call $REGISTRY_ADDRESS "getExperiment(uint256)" <ID>  # Get experiment
forge test -vvv                 # Run contract tests
```

### Key Files

```
.env                           # Environment variables (DO NOT COMMIT!)
blockchain-status-plotter-new/ # Next.js dashboard
rpi5/                          # Upload scripts
packages/nmr-experiments/      # NMR generator
contracts/                     # Smart contracts
WARP.md                        # Full documentation
```

### Important URLs

- **Dashboard**: http://localhost:3000/experiments
- **Explorer**: https://calibration.filscan.io/address/0xA6Fa61924F06DB9A84B92182B69F5C08F3176554
- **Faucet**: https://faucet.calibration.fildev.network/
- **Filecoin Docs**: https://docs.filecoin.io

---

## 💡 Pro Tips

1. **Always test uploads on testnet first** - Mainnet gas is expensive
2. **Keep a backup wallet** - In case primary runs out of tFIL
3. **Use tmux/screen for long-running processes** - Dashboard won't die when you close terminal
4. **Monitor gas prices** - Filecoin Calibration can get congested
5. **Document everything** - Future you will thank present you
6. **Automate boring tasks** - Write scripts, not commands
7. **Set up alerts before problems** - Don't wait for downtime
8. **Test fraud proofs manually** - Make sure the system actually works
9. **Keep dependencies updated** - Security patches matter
10. **Have fun** - You're building the future of scientific data!

---

## 🆘 Emergency Contacts

**When things break badly:**

1. **Check logs first** - 90% of issues are in logs
2. **Search closed issues** - Someone probably hit this before
3. **Ask in Discord** - Community can help
4. **File GitHub issue** - For novel bugs

**Escalation path**:
- Level 1: Check OPERATIONS.md (this file)
- Level 2: Check DEVELOPERS.md (technical details)
- Level 3: Read contract source code
- Level 4: Post in Discord/Telegram
- Level 5: Open GitHub issue

---

## ✅ Pre-Flight Checklist (Before Demo/Production)

**5 Minutes Before Demo**:
- [ ] Dashboard running at http://localhost:3000/experiments
- [ ] Browser tabs open (dashboard + explorer)
- [ ] Terminal ready in `rpi5/` directory
- [ ] Test upload works (`./demo-upload.sh`)
- [ ] Auto-refresh enabled (check every 30s)

**Before Mainnet**:
- [ ] Smart contracts audited
- [ ] Private keys secured (hardware wallet)
- [ ] Monitoring set up (Grafana/Sentry)
- [ ] Backup procedures tested
- [ ] DAO governance implemented
- [ ] Insurance fund funded
- [ ] Partner labs onboarded
- [ ] Legal review complete

---

**Fortis est Veritas** ⚡

*Keep calm and upload experiments.*
