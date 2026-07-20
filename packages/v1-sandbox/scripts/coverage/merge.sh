#!/usr/bin/env bash

set -euo pipefail

coverage_dir="artifacts/coverage"
tmp_dir="$coverage_dir/.tmp"
merged_report="$coverage_dir/merged/coverage-final.json"

mkdir -p "$tmp_dir" "$(dirname "$merged_report")"

cp "$coverage_dir/vitest/coverage-final.json" "$tmp_dir/vitest.json"
cp "$coverage_dir/vitest-browser/coverage-final.json" "$tmp_dir/vitest-browser.json"

nyc merge "$tmp_dir" "$merged_report"
