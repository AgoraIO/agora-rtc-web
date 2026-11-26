// Insert after Build. This is a fragment, not a replacement Jenkinsfile.
// Add parameters: RELEASE_ID, NPM_DIST_TAG (latest/next/hotfix), QA_REPORT_URL,
// RELEASE_TOOLS_COMMIT (reviewed 40-character commit from AgoraIO/agora-rtc-web).
// In Build, AFTER pnpm install and BEFORE restoring a patched lockfile:
// mkdir -p "$WORKSPACE/release-evidence"
// cp pnpm-lock.yaml "$WORKSPACE/release-evidence/pnpm-lock.effective.yaml"
// node --version > "$WORKSPACE/release-evidence/sdk-node-version.txt"
// pnpm --version > "$WORKSPACE/release-evidence/sdk-pnpm-version.txt"
// Preserve actual build commands and source SHA alongside these files.
stage('Pack Final npm Candidate') {
    steps {
        sh '''#!/usr/bin/env bash
set -euo pipefail
source ~/nvm-0.39.5/nvm.sh
nvm use 22.15.0
[[ "$RELEASE_TOOLS_COMMIT" =~ ^[0-9a-f]{40}$ ]]
[[ "$RELEASE_ID" =~ ^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$ ]]
test -s "$WORKSPACE/release-evidence/pnpm-lock.effective.yaml"
test ! -e "$WORKSPACE/npm-release-tools"
git clone --no-checkout https://github.com/AgoraIO/agora-rtc-web.git "$WORKSPACE/npm-release-tools"
git -C "$WORKSPACE/npm-release-tools" checkout --detach "$RELEASE_TOOLS_COMMIT"
cd "$WORKSPACE/npm-release-tools"
npm ci --prefix scripts/npm-release --ignore-scripts \
  --userconfig /dev/null --globalconfig scripts/npm-release/empty.npmrc \
  --registry https://registry.npmjs.org/ --no-audit --no-fund
export SDK_BUILD_NODE="$(cat "$WORKSPACE/release-evidence/sdk-node-version.txt")"
export SDK_BUILD_PNPM="$(cat "$WORKSPACE/release-evidence/sdk-pnpm-version.txt")"
export RELEASE_LOCK_FILE="$WORKSPACE/release-evidence/pnpm-lock.effective.yaml"
node scripts/npm-release/release.mjs pack "$WORKSPACE/rtcn" \
  "$WORKSPACE/npm-candidate/$RELEASE_ID" "$RELEASE_ID" "$NPM_DIST_TAG"
# Candidate QA/verification must consume this directory, without packing again.
node scripts/npm-release/release.mjs plan \
  "$WORKSPACE/npm-candidate/$RELEASE_ID/manifest.json" \
  "$WORKSPACE/npm-candidate/$RELEASE_ID" \
  "$WORKSPACE/release-evidence/npm-plan.json"
'''
        archiveArtifacts artifacts: 'npm-candidate/**/*.tgz,npm-candidate/**/manifest.json,release-evidence/**/*', fingerprint: true
    }
}
// Replace the old NPM Integration Verification pack/install block with:
// scripts/npm-release/node_modules/.bin/playwright install --with-deps chromium
// node scripts/npm-release/consumer.mjs "$WORKSPACE/npm-candidate/$RELEASE_ID/manifest.json" \
//   "$WORKSPACE/npm-candidate/$RELEASE_ID" "$WORKSPACE/release-evidence/consumer.json" candidate
// Execute in npm-release-tools, using Node 22.15.0. Archive reports even on failure.
// On reused Jenkins workspaces, use a fresh per-build checkout/output parent or
// clean only previous generated tool/candidate directories before this stage.
