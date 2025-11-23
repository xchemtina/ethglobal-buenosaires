#!/bin/bash
# Cleanup script to remove internal/sensitive docs before public GitHub push
# Run this from the repository root

set -e

echo "🧹 Cleaning up repository for public submission..."
echo ""

# Root directory cleanup - INTERNAL FILES
echo "Removing internal planning/tracking files..."
rm -f PHASE_*.md
rm -f SESSION_*.md
rm -f SPRINT_*.md
rm -f *-HOUR-*.md
rm -f NEXT_STEPS*.md
rm -f OPERATIONS.md
rm -f MERGE_*.md
rm -f MIGRATION_*.md
rm -f PARALLEL_*.md
rm -f METADATA_*.md
rm -f DASHBOARD_*.md

# Root directory cleanup - SENSITIVE FILES
echo "Removing security audit files (keep private!)..."
rm -f SECURITY_AUDIT.md
rm -f AUDIT_SUMMARY.md
rm -f HARDENING_PLAN.md
rm -f GAS_REPORT.md
rm -f RESEARCH_FINDINGS.md

# Root directory cleanup - DEPLOYMENT/TECHNICAL INTERNALS
echo "Removing deployment internals..."
rm -f DEPLOYMENT_STATUS.md
rm -f DEPLOY_*.md
rm -f SECURE_DEPLOYMENT.md
rm -f V2_IMPLEMENTATION_SUMMARY.md
rm -f PEER_REVIEW_ROADMAP.md

# Root directory cleanup - DEMO/STRATEGY FILES
echo "Removing demo/strategy files..."
rm -f DEMO_*.md
rm -f JUDGES.md
rm -f SHARE_WITH_ALLIES.md
rm -f TEST.md

# Root directory cleanup - PERSONAL/CONFIG
echo "Removing personal configuration..."
rm -f WARP.md
rm -f DECISIONS.md
rm -f DEVELOPERS.md
rm -f DOCUMENTATION_INDEX.md
rm -f QUICK_REFERENCE.md
rm -f README_OLD.md

# Subdirectory cleanup - THOUGHTS files
echo "Removing internal reasoning files..."
find . -name "THOUGHTS.md" -type f -not -path "*/node_modules/*" -delete

# Subdirectory cleanup - NEXT_STEPS in subdirs
find . -name "NEXT_STEPS.md" -type f -not -path "*/node_modules/*" -not -path "./NEXT_STEPS.md" -delete

# Specific subdirectory cleanups
echo "Cleaning specific subdirectories..."
rm -f blockchain-status-plotter-current/HARDENING_REPORT.md
rm -f blockchain-status-plotter-current/LLM_*.md
rm -f blockchain-status-plotter-new/INTEGRATION_CHECKLIST.md
rm -f api-bridge/SETUP.md

# Remove the ChimiaDAO long-form description (too detailed?)
rm -f "ChimiaDAO Experiment PoX + Indexing.md"
rm -f GeneralDescription/ChimiaDAO-PoX-Description.md

# Remove submission pitch (keep separate)
rm -f submission/Pitch_OnGoing.md

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📋 Files KEPT (essential for judges):"
echo "  - README.md (main)"
echo "  - contracts/README.md"
echo "  - subgraph/README.md"
echo "  - scripts/README.md"
echo "  - api-bridge/README.md"
echo "  - License files"
echo ""
echo "🔒 Files REMOVED (internal/sensitive):"
echo "  - All internal planning docs (PHASE, SESSION, NEXT_STEPS, etc.)"
echo "  - Security audit reports (keep private!)"
echo "  - Personal config (WARP.md)"
echo "  - Demo/strategy files"
echo "  - All THOUGHTS.md files"
echo ""
echo "⚠️  BEFORE pushing to GitHub:"
echo "  1. Review remaining files: ls -la *.md"
echo "  2. Check README.md is appropriate for public"
echo "  3. Verify no secrets in code (API keys, private keys, etc.)"
echo "  4. Run: git status"
echo ""
