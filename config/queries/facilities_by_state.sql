SELECT 
  address_stateOrRegion as state,
  COUNT(*) as facility_count
FROM databricks_virtue_foundation_dataset_dais_2026.virtue_foundation_dataset.facilities
WHERE address_country = 'India' 
  AND address_stateOrRegion IS NOT NULL
GROUP BY address_stateOrRegion
ORDER BY facility_count DESC
LIMIT 15
