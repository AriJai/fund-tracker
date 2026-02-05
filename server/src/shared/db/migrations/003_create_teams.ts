import client from '../db';

/**
 * Creates the Teams table.
 */
export async function up() {
    const query = `
        CREATE TABLE IF NOT EXISTS teams (
            id BIGSERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            owner_user_id INT NOT NULL REFERENCES users(id),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            disbanded_at TIMESTAMPTZ
    );
    `

    await client.query(query);
    console.log('Teams table created');
}