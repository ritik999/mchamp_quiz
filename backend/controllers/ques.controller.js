import { client } from "../client.js";
import { connection } from "../dbConnection.js"


// let startTime = 0;
// let completeTime = 0;

export const getAllQue = async (req, res) => {
    try {
        // const [rows] = await connection.query('SELECT * FROM kbc_quiz_question LIMIT 2');

        const qData = await client.get('ques')
        const aData = await client.get('ans')

        const qDataParse = JSON.parse(qData);
        const aDataParse = JSON.parse(aData);
        console.log('qData', qData);



        let ansString = '';
        aDataParse.forEach((ele) => {
            ansString += `${ele.id},`;
        })

        res.end();
        // res.status(200).json({ data: qDataParse, success: true });
    } catch (error) {
        res.status(404).json({ message: error.message, success: false });
    }
}

export const getAllQueOptandAns = async (req, res) => {
    try {
        // const userAddress= req.params;
        const [rows] = await connection.query('SELECT Q.ques_id AS id,Q.ques_txt AS ques,Q.image_url AS image,A.answer_txt AS answer, O.option_txt AS options FROM (SELECT * FROM kbc_quiz_question ORDER BY RAND() LIMIT 10) Q JOIN kbc_quiz_question_answer A ON (A.ques_id=Q.ques_id) JOIN kbc_quiz_question_option O ON(O.ques_id=Q.ques_id)');

        const mergedData = rows.reduce((acc, item) => {
            const existing = acc.find(q => q.id === item.id);
            if (existing) {
                existing.options.push(item.options);
            } else {
                const { image, ...rest } = item
                console.log(image);

                if (image) {
                    acc.push({
                        id: item.id,
                        ques: item.ques,
                        answer: item.answer,
                        options: [item.options],
                        image: image
                    });
                } else {
                    acc.push({
                        id: item.id,
                        ques: item.ques,
                        answer: item.answer,
                        options: [item.options]
                    });
                }
            }
            return acc;
        }, []);

        let quesDetailsArray = {
            questions: [],
            answers: [],
            completeTime: 0
        }


        mergedData.forEach(element => {
            quesDetailsArray.answers.push({ id: element.id, answer: element.answer, isCorrect: false, selectedOption: null });
            quesDetailsArray.questions.push({ id: element.id, question: element.ques, options: element.options, image: element?.image })
        });

        quesDetailsArray.completeTime = Date.now();

        // await client.set(`dataDetails:${req.userId}`, JSON.stringify(quesDetailsArray));
        console.log(req.userId);
        // console.log('data', quesDetailsArray);
        const redisSet = await client.set(`dataDetails:${req.userId}`, JSON.stringify(quesDetailsArray), { EX: 3600 }).catch((err) => {
            console.error(err)
        })

        console.log('redisSet', redisSet);
        res.status(200).json({ data: quesDetailsArray.questions, success: true });
    } catch (error) {
        res.status(404).json({ message: error.message, success: false });
    }
}


export const evaluateSelectedOption = async (req, res) => {
    try {
        const { selectedOption } = req.body;
        const { id } = req.params;

        if (!selectedOption || !id) {
            return res.status(400).send('Invalid input');
        }

        console.log('user id', req.userId);
        // Fetch and parse data from Redis
        const data = await client.get(`dataDetails:${req.userId}`);

        const dataParse = JSON.parse(data);

        // Find the matching record and update its correctness
        const record = dataParse?.answers.find(e => e.id == id);
        if (record) {
            record.isCorrect = record.answer === selectedOption;
            record.selectedOption = selectedOption;
        }
        console.log('record', record);
        // Save the updated data back to Redis
        await client.set(`dataDetails:${req.userId}`, JSON.stringify(dataParse), { EX: 3600 }).catch((err) => {
            console.error(err)
        });

        res.send('done');
    } catch (error) {
        console.error('Error evaluating selected option:', error);
        res.status(500).send('Internal server error');
    }
};


export const sendFinalResult = async (req, res) => {
    try {
        let score = 0;
        let queSet = '';
        let inputAns = '';

        const data = await client.get(`dataDetails:${req.userId}`)
        const dataParse = JSON.parse(data);
        console.log(dataParse);

        dataParse?.answers.forEach((e) => {
            if (e.isCorrect) {
                score += 1;
            }
            queSet += `${e.id},`;
            console.log(e.selectedOption.charCodeAt(0) - 65);

            inputAns += `${e.selectedOption.charCodeAt(0) - 65}|`;
        })

        dataParse.completeTime = Date.now() - dataParse?.completeTime;
        console.log(dataParse?.completeTime);

        // console.log('queSet',queSet);
        // console.log('inputGiven',inputAns);
        // console.log('cmpTime',dataParse?.completeTime);
        // console.log(score);

        const [rows] = await connection.query(
            `INSERT INTO tbl_contest_played(user_id, ques_id, correct_count, ques_attempted, skip_ques, answer_given, total_ques, coins_earned, done, time_taken) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.userId,queSet,score,10,0,inputAns.substring(0, inputAns.length - 1),10,5,1,dataParse?.completeTime
            ]
        );

        await client.del(`dataDetails:${req.userId}`);

        res.status(200).json({ score: score });
    } catch (error) {
        console.log(error.message);
        res.send(error)
    }
}


export const Test = (req, res) => {
    res.cookie('garv', 'garv', { sameSite: false, httpOnly: true, secure: false })
    res.send('abc');
}