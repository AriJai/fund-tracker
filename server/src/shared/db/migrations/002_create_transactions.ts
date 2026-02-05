import client from '../db';

/**
 * Creates the Transactions table.
 */
export async function up() {
    const query = `
        CREATE TABLE IF NOT EXISTS transactions (
            id BIGSERIAL PRIMARY KEY,
            creator_user_id INT NOT NULL REFERENCES users(id),
            target_type TEXT NOT NULL CHECK (target_type IN ('user', 'team')),
            target_id INT NOT NULL,
            amount NUMERIC NOT NULL CHECK (amount > 0),
            status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'rejected')),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            confirmed_at TIMESTAMPTZ,
            rejected_at TIMESTAMPTZ,
            reason TEXT,
            refund_of_id INT REFERENCES transactions(id)
        );
    `;

    await client.query(query);
    console.log('Transactions table created');
}