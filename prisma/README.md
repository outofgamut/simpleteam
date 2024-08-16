## Create migrations after changes in schema.prisma

So you have made changes to the schema.prisma file and you want to apply those changes to the database.

Chances are you are getting this error from Prisma after running `npx prisma migrate dev`:

```txt
Drift detected: Your database schema is not in sync with your migration history.
...
Do you want to continue? All data will be lost.
```

### Requirements

1. Local prisma

```bash
npm install -g prisma
# npx prisma won't work
```

2. shadow database, otherwise you overwrite your local db

### Steps

- Create a new migration folder

```bash
mkdir -p prisma/migrations/20240816000000_fix_user_team_relationships
```

- Generate the migration

```bash
prisma migrate diff --from-migrations prisma/migrations --to-schema-datamodel prisma/schema.prisma --shadow-database-url "postgresql://postgres.{SENSITIVE_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:5432/postgres" --script > prisma/migrations/20240816000000_fix_user_team_relationships/migration.sql
```

- Apply the migration

```bash
prisma migrate resolve --applied 20240816000000_fix_user_team_relationships
```

- Regenerate Prisma Client:
After applying the migration, you need to regenerate the Prisma Client to reflect the new schema changes:

```bash
npx prisma generate
```

This command updates the generated Prisma Client code, including any new models.