import client from '../db';
// Import migrations
import { up as createUsers } from './001_create_users';

/**
 * Run migrations for creating database.
 */
async function runMigrations() {
    try {
        // Start
        console.log('Running migrations...');

        // Run migrations
        await createUsers();

        // End
        console.log('Migrations complete');
    } catch (err) {
        console.log('Migrations failed to complete: ', err);
    } finally {
        await client.end();
    }
}

runMigrations();