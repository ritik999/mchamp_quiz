import { v4 as uuidv4 } from 'uuid';
import { connection } from '../dbConnection.js';

export const createOrFetchUser = async (req, res) => {
    try {
        const user = req.cookies?.id;

        if (!user) {
            console.log('no cookie');
        }
        const [rows] = await connection.query(`SELECT * FROM quiz_user_profile WHERE unq_id='${user}'`)
        if (rows.length > 0) {
            // req.user=rows[0]
            console.log(rows[0]);
            req.userId = rows[0].unq_id;
            // console.log(true);
            res.send('done');
        } else {
            const uniqueId = uuidv4();
            const uniqueName = uniqueId.slice(0, 10);
            console.log(uniqueId);
            console.log(uniqueName);

            const a = await connection.query(`INSERT INTO quiz_user_profile (unq_id,display_name) VALUES('${uniqueId}','${uniqueName}')`)
            console.log(a);
            
            res.cookie('id', uniqueId, { maxAge: 1000 * 60 * 60 * 24 * 90 })
            res.userId = uniqueId;
            res.send('cookie set')
        }
        // next();
    } catch (error) {
        res.send(error)
    }
}