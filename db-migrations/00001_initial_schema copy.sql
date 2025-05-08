-- Filename: 00001_initial_schema.sql
-- +goose Up
-- +goose StatementBegin
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    desc TEXT,
    card_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_category_timestamp()
RETURNS AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_category_timestamp
BEFORE UPDATE ON category
FOR EACH ROW
EXECUTE FUNCTION update_category_timestamp();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TRIGGER IF EXISTS trigger_update_category_timestamp ON category;
DROP TABLE IF EXISTS category;
DROP FUNCTION IF EXISTS update_category_timestamp;
-- +goose StatementEnd