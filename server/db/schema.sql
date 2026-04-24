-- ============================================================
-- Nature Runner — Supabase Schema
-- Paste this into the Supabase SQL Editor and Run.
-- ============================================================

BEGIN;

-- Enable UUID generation (Supabase has this available by default)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------
-- USERS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    username        TEXT NOT NULL UNIQUE,
    email           TEXT NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    is_admin        BOOLEAN NOT NULL DEFAULT FALSE,
    icon            TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ------------------------------------------------------------
-- EXERCISE TYPES
-- (e.g. Running, Hiking, Cycling, Yoga, Strength)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS exercise_types (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name             TEXT NOT NULL UNIQUE,
    category         TEXT NOT NULL,               -- Cardio | Strength | Yoga
    tracks_distance  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed a few sensible defaults so the app isn't empty on first run
INSERT INTO exercise_types (name, category, tracks_distance) VALUES
    ('Running',   'Cardio',   TRUE),
    ('Hiking',    'Cardio',   TRUE),
    ('Cycling',   'Cardio',   TRUE),
    ('Walking',   'Cardio',   TRUE),
    ('Yoga',      'Yoga',     FALSE),
    ('Strength',  'Strength', FALSE)
ON CONFLICT (name) DO NOTHING;

-- ------------------------------------------------------------
-- ACTIVITIES
-- A single workout/run/session logged by a user.
-- user_id is the ownership column — enforced server-side via JWT.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activities (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_type_id  UUID NOT NULL REFERENCES exercise_types(id) ON DELETE RESTRICT,
    title             TEXT NOT NULL,
    description       TEXT,
    date              DATE NOT NULL,
    location          TEXT,
    duration_minutes  INTEGER NOT NULL CHECK (duration_minutes > 0),
    calories          INTEGER,
    distance_miles    NUMERIC(6,2),               -- nullable; only set when the exercise type tracks distance
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(date);

-- ------------------------------------------------------------
-- FRIENDS
-- Friendship as a request with a status. "Accepted" on either
-- direction = the two users are friends.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS friends (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    addressee_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status         TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'declined')),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT friends_no_self    CHECK (requester_id <> addressee_id),
    CONSTRAINT friends_unique_pair UNIQUE (requester_id, addressee_id)
);

CREATE INDEX IF NOT EXISTS idx_friends_requester ON friends(requester_id);
CREATE INDEX IF NOT EXISTS idx_friends_addressee ON friends(addressee_id);

-- ------------------------------------------------------------
-- Auto-update updated_at on row updates
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_exercise_types_updated_at ON exercise_types;
CREATE TRIGGER trg_exercise_types_updated_at
    BEFORE UPDATE ON exercise_types
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_activities_updated_at ON activities;
CREATE TRIGGER trg_activities_updated_at
    BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_friends_updated_at ON friends;
CREATE TRIGGER trg_friends_updated_at
    BEFORE UPDATE ON friends
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;
