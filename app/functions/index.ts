import { SkillBuilders } from 'ask-sdk';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import { ErrorIntentHandler, LaunchRequestHandler, UserIdentificationHandler, UserProblemHandler, RaiseItHandler } from '../intents';

const app = express();
// use of bodyparser to parse text to object
app.use(bodyParser.json());

app.use(cors());

// EXPRESS APP fulfillment route (POST). The entire dialogFlowApp object (incl its handlers) is the callback handler for this route.
app.post('/', (req, res) => {
    try {
        let skill = SkillBuilders.custom()
            .addRequestHandlers(LaunchRequestHandler, UserProblemHandler, RaiseItHandler)
            .addErrorHandlers(ErrorIntentHandler)
            .withSkillId('amzn1.ask.skill.b0ce48ba-1da8-4b5a-9255-171031344ee0')
            .create();

        skill.invoke(req.body)
            .then((responseBody) => {
                res.json(responseBody);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send('Error during the request');
            });
    } catch (error) {
        console.log(error);
    }


});

//  EXPRESS APP test route (GET)
app.get('/', (req, res) => {
    res.send('Working.');
});

// start server
app.listen(8888, () => {
    console.log(chalk.bgRed('server is started on localhost:8888'));
});
