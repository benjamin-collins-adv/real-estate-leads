-- Script to check current enum values in the database
-- Run this first to see what values currently exist

SELECT 
    enumlabel as status_value,
    enumsortorder as sort_order
FROM pg_enum 
WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_properties_status')
ORDER BY enumsortorder;

