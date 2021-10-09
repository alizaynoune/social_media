import mongoose from 'mongoose';




export const connectToDB = async () => {
    const URL = process.env.DB_URL;
    const USER = process.env.DB_USER;
    const PASS = process.env.DB_PWD;
    await mongoose.connect(URL, {
        // "auth": { "authSource": "admin" },
        "user": USER,
        "pass": PASS,
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to DB');
    }).catch(err => {
        console.log(err);
        process.exit(1);
    });
}




