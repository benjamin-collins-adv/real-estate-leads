# Database Migrations

## Update Properties Status Enum

The Properties collection requires these status values: "for-sale", "for-rent", "sold", "rented", and "pending".

**The database enums are currently missing these values**, causing errors when creating properties.

**Important:** Since drafts are enabled, Payload creates TWO separate enums that both need to be updated:

1. `enum_properties_status` - for the main properties table
2. `enum__properties_v_version_status` - for the version/draft table

### Step 1: Check Current Enum Values (Optional)

Run this first to see what values currently exist:

```bash
psql -d your_database_name -f migrations/check_enum_values.sql
```

Or run in your database client:

```sql
SELECT enumlabel as status_value
FROM pg_enum
WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_properties_status')
ORDER BY enumsortorder;
```

### Step 2: Run the Migration

Run this SQL migration to add all required status values:

```bash
# Option 1: Using psql
psql -d your_database_name -f migrations/update_properties_status_enum.sql

# Option 2: Using your database client
# Open migrations/update_properties_status_enum.sql and run it in your database client
```

**Important Notes:**

- PostgreSQL enums can only have values added, not removed or renamed
- The migration safely checks if each value exists before adding it
- You may need to restart your Next.js dev server after running the migration
- If you have existing data with invalid status values, you'll need to update those records first

### Troubleshooting

If you get errors about enum values not existing:

1. Make sure you're connected to the correct database
2. Verify the enum type name is `enum_properties_status` (check with the check script)
3. Restart your dev server after running the migration
