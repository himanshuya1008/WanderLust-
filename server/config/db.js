import {neon} from '@neondatabase/serverless';

let sql;
if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "") {
    sql = neon(process.env.DATABASE_URL);
} else {
    console.warn("⚠️ DATABASE_URL is not configured in server/.env. Neon DB queries will require a valid DATABASE_URL.");
    sql = async () => {
        throw new Error("DATABASE_URL is not configured in server/.env");
    };
}

export default sql;