SELECT 
  ROUND(AVG(hh_member_covered_health_insurance_pct), 1) as avg_health_insurance,
  ROUND(AVG(hh_use_improved_sanitation_pct), 1) as avg_sanitation,
  ROUND(AVG(hh_improved_water_pct), 1) as avg_water_access,
  ROUND(AVG(women_age_15_49_who_are_literate_pct), 1) as avg_female_literacy,
  COUNT(DISTINCT state_ut) as total_states,
  COUNT(DISTINCT district_name) as total_districts
FROM databricks_virtue_foundation_dataset_dais_2026.virtue_foundation_dataset.nfhs_5_district_health_indicators
