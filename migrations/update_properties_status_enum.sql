-- Migration to add ALL status values to properties_status enums
-- Run this migration manually in your PostgreSQL database
-- This will add all required status values: for-sale, for-rent, sold, rented, pending
-- 
-- When drafts are enabled, Payload creates TWO enums:
-- 1. enum_properties_status - for the main properties table
-- 2. enum__properties_v_version_status - for the version table (drafts)

-- Add values directly to each enum
DO $$
BEGIN
    -- Add values to main properties enum
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_properties_status') THEN
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'for-sale' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_properties_status')) THEN
            ALTER TYPE enum_properties_status ADD VALUE 'for-sale';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'for-rent' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_properties_status')) THEN
            ALTER TYPE enum_properties_status ADD VALUE 'for-rent';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'sold' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_properties_status')) THEN
            ALTER TYPE enum_properties_status ADD VALUE 'sold';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'rented' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_properties_status')) THEN
            ALTER TYPE enum_properties_status ADD VALUE 'rented';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'pending' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_properties_status')) THEN
            ALTER TYPE enum_properties_status ADD VALUE 'pending';
        END IF;
    END IF;

    -- Add values to version enum (for drafts)
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__properties_v_version_status') THEN
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'for-sale' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__properties_v_version_status')) THEN
            ALTER TYPE enum__properties_v_version_status ADD VALUE 'for-sale';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'for-rent' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__properties_v_version_status')) THEN
            ALTER TYPE enum__properties_v_version_status ADD VALUE 'for-rent';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'sold' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__properties_v_version_status')) THEN
            ALTER TYPE enum__properties_v_version_status ADD VALUE 'sold';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'rented' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__properties_v_version_status')) THEN
            ALTER TYPE enum__properties_v_version_status ADD VALUE 'rented';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'pending' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__properties_v_version_status')) THEN
            ALTER TYPE enum__properties_v_version_status ADD VALUE 'pending';
        END IF;
    END IF;
END $$;

-- Verify the enum values
SELECT 'Main Properties Enum' as enum_name, enumlabel as status_value 
FROM pg_enum 
WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_properties_status')
ORDER BY enumsortorder;

SELECT 'Version Enum' as enum_name, enumlabel as status_value 
FROM pg_enum 
WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__properties_v_version_status')
ORDER BY enumsortorder;

