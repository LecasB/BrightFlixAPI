const mongoose = require('mongoose')

const url = `mongodb+srv://admin:admin@brightflix.nbuznmy.mongodb.net/?retryWrites=true&w=majority&appName=BrightFlix`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })