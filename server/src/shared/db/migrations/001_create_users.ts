import client from '../db';

/**
 * Creates the Users table.
 */
export async function up() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id bigserial PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    `

    await client.query(query);
    console.log('Users table created');
}