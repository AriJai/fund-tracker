import client from '../db';

/**
 * Creates the Memberships table.
 */
export async function up() {
    const query = `
        CREATE TABLE IF NOT EXISTS memberships (
            user_id INT NOT NULL REFERENCES users(id),
            team_id INT NOT NULL REFERENCES teams(id),
            role TEXT NOT NULL DEFAULT 'member',
            joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            PRIMARY KEY(user_id, team_id)
        );
    `

    await client.query(query);
    console.log('Memberships table created');
}