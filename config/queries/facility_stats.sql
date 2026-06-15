SELECT 
  COUNT(*) as total_facilities,
  COUNT(DISTINCT address_stateOrRegion) as states_covered,
  COUNT(DISTINCT address_city) as cities_covered
FROM databricks_virtue_foundation_dataset_dais_2026.virtue_foundation_dataset.facilities
WHERE address_country = 'India'
