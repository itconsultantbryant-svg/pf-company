#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$ROOT/src/assets/product-thumbs" "$ROOT/public/product-datasheets"

# id|relative path from repo root
while IFS='|' read -r id relpath; do
  [[ -z "$id" || "$id" == \#* ]] && continue
  pdf="$ROOT/$relpath"
  if [[ ! -f "$pdf" ]]; then
    echo "MISSING: $id -> $relpath" >&2
    continue
  fi
  qlmanage -t -s 900 -o "$TMP" "$pdf" >/dev/null 2>&1 || true
  base=$(basename "$pdf" .pdf)
  png="$TMP/${base}.pdf.png"
  if [[ -f "$png" ]]; then
    mv "$png" "$ROOT/src/assets/product-thumbs/${id}.png"
  else
    echo "NO THUMB for $id ($base)" >&2
  fi
  cp "$pdf" "$ROOT/public/product-datasheets/${id}.pdf"
done <<'MAPLIST'
eos-15kwh|src/assets/Product Data Sheet/SRNE_EOS series_15kWh_Solar Storage Battery_Datasheet_V1.2.pdf
se-5-15kwh|src/assets/Product Data Sheet/SRNE_SE series_5~15kWh_Solar Storage Battery_Datasheet_V1.4.pdf
sr-ket130b|src/assets/Product Data Sheet/SR-Ket130B_V1.0-2025726.pdf
sr-ket210c|src/assets/Product Data Sheet/SR-Ket210C_V1.0-2025826.pdf
hespsp-36-6kw-sp|src/assets/Product Data Sheet/SRNE_HESP series_EU_48V_3.6~6kW_230V_Single-Phase_Hybrid_Solar Storage Inverter_Datasheet_V1.1.pdf
hespsp-8-12kw-230v|src/assets/Product Data Sheet/SRNE_HESP series_EU_48V_8~12kW_230V_Solar Storage Inverter_datasheet_1.1.pdf
hespsp-8-12kw-3ph|src/assets/Product Data Sheet/SRNE_HESP 8-12kW series_EU_ Three-phase_Datasheet_V1.0.pdf
hespsp-8-12kw-sh3|src/assets/Product Data Sheet/Datasheet_SRNE_HESP Series_8-12kW SH3_EU_Three-Phase_ Solar Hybrid Inverter_V1.1.pdf
hespsp-16-20kw-3ph|src/assets/Product Data Sheet/Datasheet_SRNE_HESP Series_EU_16-20kW_English_Three-Phase_Hybrid_Solar Storage Inverter_V1.0.pdf
iesp-50-60kw|src/assets/Product Data Sheet/SRNE_IESP Series_EU_50-60kW_High-voltage three-phase_Hybrid_Solar Storage Inverter_Datasheet_V00[20250718].pdf
sr-box-112c-55k|src/assets/Product Data Sheet/SR-Box112C-55K - Specification Sheet.pdf
sun-3-6k|src/assets/Product Data Sheet/Other Brands/BDatasheetSUN-3-6K-SG04LP1-SM220260424en.pdf
sun-3-12k|src/assets/Product Data Sheet/Other Brands/BDatasheetSUN-3-12K-SG05LP3-EU-SM220260424en.pdf
sun-14-20k-sm|src/assets/Product Data Sheet/Other Brands/BDatasheetSUN-14-20K-SG05LP3-EU-SM220260424en.pdf
sun-25-30k|src/assets/Product Data Sheet/Other Brands/【B】Datasheet_SUN-25-30K-SG02HP3-EU-AM3_20260114_en.pdf
sun-29-50k|src/assets/Product Data Sheet/Other Brands/【b】datasheet_sun-29.9-50k-sg01hp3-eu-bm4_30240102200952_20250520_en-1.pdf
sun-5-25k|src/assets/Product Data Sheet/Other Brands/【b】datasheet_sun-5-25k-sg01hp3-eu_30240102201075_20250520_en-1.pdf
sun-60-80k-sg01|src/assets/Product Data Sheet/Other Brands/datasheet_sun-60-80k-sg01hp3-eu-bm4_241021_en.pdf
sun-60-80k-sg02|src/assets/Product Data Sheet/Other Brands/【b】datasheet_sun-60-80k-sg02hp3-eu-em6_30240102201760_20250520_en-1.pdf
sun-100-125k|src/assets/Product Data Sheet/Other Brands/BDatasheetSUN-100-125K-SG02HP3-EU-GM1020260423en.pdf
sun-14-20k-sg05|src/assets/Product Data Sheet/Other Brands/【b】datasheet_sun-14-20k-sg05lp3-eu-sm2_30240102201762_20250520_en.pdf
bimax-580-590|src/assets/Product Data Sheet/Other Brands/BiMAX-5N-580-590W-182mm-16BB-144Cells.pdf
bimax-605-635|src/assets/Product Data Sheet/Other Brands/BiMAX5N-TOPCON-156-Half-Cells-BifacialDual-Glass-Solar-Module-605-635W.pdf
himax-675-700|src/assets/Product Data Sheet/Other Brands/HiMAX6-132Cell-675-700W-SP700M-66H-Monofacial-1.pdf
powerpal-y5|src/assets/Product Data Sheet/Other Brands/PowerPal-Y5-51.2V-314Ah-16kwh.pdf
MAPLIST

echo "Thumbnails: $(ls -1 "$ROOT/src/assets/product-thumbs" | wc -l | tr -d ' ')"
echo "Datasheets: $(ls -1 "$ROOT/public/product-datasheets" | wc -l | tr -d ' ')"
