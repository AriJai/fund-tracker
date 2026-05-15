import client from '../db';

/**
 * Creates the Transactions table.
 */
export async function up() {
    // ENUMS
    await client.query(`
        DO $$
        BEGIN
            IF NOT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'transaction_status') THEN
                CREATE TYPE transaction_status as ENUM ('pending', 'confirmed', 'rejected');
            END IF;
        END$$;
    `);
    const query = `
        CREATE TABLE IF NOT EXISTS transactions (
            id BIGSERIAL PRIMARY KEY,
            creator_user_id INT NOT NULL REFERENCES users(id),
            target_type TEXT NOT NULL CHECK (target_type IN ('user', 'team')),
            target_id INT NOT NULL,
            amount NUMERIC NOT NULL CHECK (amount > 0),
            status transaction_status NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            confirmed_at TIMESTAMPTZ,
            rejected_at TIMESTAMPTZ,
            reason TEXT,
            external_id TEXT NOT NULL,
            refund_of_id INT REFERENCES transactions(id),
            CONSTRAINT transactions_user_external_unique
                UNIQUE (creator_user_id, external_id),
            CONSTRAINT status_timestamp_consistency CHECK (
                (status = 'confirmed' AND confirmed_at IS NOT NULL AND rejected_at IS NULL) OR
                (status = 'rejected' AND rejected_at IS NOT NULL AND confirmed_at IS NULL) OR
                (status = 'pending' AND confirmed_at IS NULL AND rejected_at IS NULL)
            )
        );
    `;

    await client.query(query);
    console.log('Transactions table created');
}