SELECT 
  state_ut as state,
  ROUND(AVG(hh_member_covered_health_insurance_pct), 1) as health_insurance_pct,
  ROUND(AVG(hh_use_improved_sanitation_pct), 1) as sanitation_pct,
  ROUND(AVG(hh_improved_water_pct), 1) as water_access_pct,
  ROUND(AVG(hh_electricity_pct), 1) as electricity_pct
FROM databricks_virtue_foundation_dataset_dais_2026.virtue_foundation_dataset.nfhs_5_district_health_indicators
WHERE state_ut IS NOT NULL
GROUP BY state_ut
ORDER BY health_insurance_pct DESC
LIMIT 15
