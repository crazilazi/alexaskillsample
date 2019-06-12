import { ErrorHandler, HandlerInput, RequestHandler } from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import axios from 'axios';
import chalk from 'chalk';

class LaunchRequestIntentHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    }

    handle(handlerInput: HandlerInput): Response {
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(`Welcome to castleton home service solution.
             How may i help you today!`)
            .reprompt('')
            .getResponse();
    }
}

class UserIdentificationIntentHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        console.log(request);
        return request.type === 'IntentRequest' && request.intent.name === 'userIdentification';
    }

    handle(handlerInput: HandlerInput): Response {
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(`Hi Rajeev, How may i help you today?`)
            .reprompt('')
            .getResponse();
    }
}

class UserProblemIntentHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        console.log(request);
        return request.type === 'IntentRequest' && request.intent.name === 'userproblem';
    }

    handle(handlerInput: HandlerInput): Response {
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(`Sorry to hear, Do you want to raise complaint?`)
            .reprompt('')
            .getResponse();
    }
}

class RaiseItIntentHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        console.log(request);
        return request.type === 'IntentRequest' && request.intent.name === 'raiseit';
    }

    handle(handlerInput: HandlerInput): Response {
        const responseBuilder = handlerInput.responseBuilder;
        const request = handlerInput.requestEnvelope.request;
        if (request.type === 'IntentRequest' && request.intent.slots !== undefined) {
            if (request.intent.slots['yesno'].value === 'yes') {
                return responseBuilder
                    .speak(`Complaint raised, Thank you for choosing castleton home service solution.`)
                    .getResponse();
            } else {
                return responseBuilder
                    .speak(`Thank you for choosing castleton home service solution.`)
                    .getResponse();
            }
        }
        return responseBuilder
            .speak(`Sorry to hear, Do you want to raise complaint?`)
            .reprompt('')
            .getResponse();
    }
}

class ErrorRequestIntentHandler implements ErrorHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        return true;
    }
    handle(handlerInput: HandlerInput, error: Error) {
        console.log(`Error handled: ${error}`);
        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    }
}
export const ErrorIntentHandler = new ErrorRequestIntentHandler();
export const LaunchRequestHandler = new LaunchRequestIntentHandler();
export const UserIdentificationHandler = new UserIdentificationIntentHandler();
export const UserProblemHandler = new UserProblemIntentHandler();
export const RaiseItHandler = new RaiseItIntentHandler();
