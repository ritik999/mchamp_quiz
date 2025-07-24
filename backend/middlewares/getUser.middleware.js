import { v4 as uuidv4 } from 'uuid';
import { connection } from '../dbConnection.js';

export const createOrFetchUser = async (req, res, next) => {
    try {        
        const user = req.cookies && req.cookies?.id;

        console.log(req.cookies);
        console.log('user cookie', user);
        
        if (user) {
            // Fetch existing user by unq_id (use parameterized query for safety)
            const [rows] = await connection.query('SELECT * FROM quiz_user_profile WHERE unq_id = ?', [user]);

            if (rows.length > 0) {
                req.userId = rows[0]?.user_id;
                console.log(rows[0]?.user_id);
                
                return next();
            } else {
                // Create a new user
                const uniqueId = uuidv4();
                const uniqueName = uniqueId.slice(0, 10);

                const [insertRows] = await connection.query('INSERT INTO quiz_user_profile (unq_id, display_name) VALUES(?, ?)', [uniqueId, uniqueName]);

                // Set the cookie only when a new user is created
                res.cookie('id', uniqueId, { maxAge: 1000 * 60 * 60 * 24 * 90 });
                req.userId = insertRows?.insertId;
                return next();
            }
        } else {
            // If no user cookie, create a new user
            const uniqueId = uuidv4();
            const uniqueName = uniqueId.slice(0, 10);

            const [insertRows] = await connection.query('INSERT INTO quiz_user_profile (unq_id, display_name) VALUES(?, ?)', [uniqueId, uniqueName]);

            // Set the cookie for the new user

            // res.cookie('x-auth', 'garv', {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV !== 'dev', 
            //     sameSite: process.env.NODE_ENV !== 'dev' ? 'none' : false,
            //     // maxAge: 1000 * 60 * 60 * 24 * 90,  // 90 days
            // });
            res.cookie('id', uniqueId, {
                maxAge: 1000 * 60 * 60 * 24 * 90, 
                httpOnly: true,
                secure: false, 
                sameSite: 'Lax'
            });

            req.userId = insertRows?.insertId;
            return next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong. Please try again later.");
    }
};
