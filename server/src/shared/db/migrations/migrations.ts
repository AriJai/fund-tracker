import client from '../db';
// Import migrations
import { up as createUsers } from './001_create_users';
import { up as createTransactions } from './002_create_transactions';
import { up as createTeams } from './003_create_teams';
import { up as createMemberships } from './004_create_memberships';

/**
 * Run migrations for creating database.
 */
async function runMigrations() {
    try {
        // Start
        console.log('Running migrations...');

        // Run migrations
        await createUsers();
        await createTransactions();
        await createTeams();
        await createMemberships();

        // End
        console.log('Migrations complete');
    } catch (err) {
        console.log('Migrations failed to complete: ', err);
    } finally {
        await client.end();
    }
}

runMigrations();