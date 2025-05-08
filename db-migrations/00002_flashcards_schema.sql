-- Filename: 00001_initial_schema.sql
-- +goose Up
-- +goose StatementBegin
CREATE TABLE flashcards (
    fcid SERIAL PRIMARY KEY,
    catid INTEGER NOT NULL REFERENCES categories(cid) ON DELETE CASCADE,
    type VARCHAR(50),
    progress VARCHAR(20) NOT NULL CHECK (progress IN ('Not Learned', 'Partially Learned', 'Learned')),
    front TEXT NOT NULL,
    back TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_flashcard_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_flashcard_timestamp
BEFORE UPDATE ON flashcards
FOR EACH ROW
EXECUTE FUNCTION update_flashcard_timestamp();

-- Function to update card_count in categories
CREATE OR REPLACE FUNCTION update_card_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE categories 
        SET card_count = card_count + 1 
        WHERE cid = NEW.catid;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE categories 
        SET card_count = card_count - 1 
        WHERE cid = OLD.catid;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers for card count
CREATE TRIGGER trigger_increment_card_count
AFTER INSERT ON flashcards
FOR EACH ROW
EXECUTE FUNCTION update_card_count();

CREATE TRIGGER trigger_decrement_card_count
AFTER DELETE ON flashcards
FOR EACH ROW
EXECUTE FUNCTION update_card_count();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
CREATE TABLE flashcards (
    fcid SERIAL PRIMARY KEY,
    catid INTEGER NOT NULL REFERENCES categories(cid) ON DELETE CASCADE,
    type VARCHAR(50),
    progress VARCHAR(20) NOT NULL CHECK (progress IN ('Not Learned', 'Partially Learned', 'Learned')),
    front TEXT NOT NULL,
    back TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_flashcard_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_flashcard_timestamp
BEFORE UPDATE ON flashcards
FOR EACH ROW
EXECUTE FUNCTION update_flashcard_timestamp();

-- Function to update card_count in categories
CREATE OR REPLACE FUNCTION update_card_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE categories 
        SET card_count = card_count + 1 
        WHERE cid = NEW.catid;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE categories 
        SET card_count = card_count - 1 
        WHERE cid = OLD.catid;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers for card count
CREATE TRIGGER trigger_increment_card_count
AFTER INSERT ON flashcards
FOR EACH ROW
EXECUTE FUNCTION update_card_count();

CREATE TRIGGER trigger_decrement_card_count
AFTER DELETE ON flashcards
FOR EACH ROW
EXECUTE FUNCTION update_card_count();
-- +goose StatementEnd