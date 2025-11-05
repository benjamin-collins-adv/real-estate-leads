-- Fix Properties schema to match Payload configuration
-- This migration ensures the database schema matches when drafts are enabled

-- First, make sure all enum values exist
DO $$
BEGIN
    -- Add values to main properties enum if they don't exist
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

    -- Add values to version enum if it exists
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

