import { APIGatewayEvent, ProxyResult } from 'aws-lambda'
import querystring from 'querystring'
import PollQuestion from '../model/PollQuestion'
import PollOption from '../model/PollOption'
import responses from './API_Responses'

const mockUserid = 1

// GET /api/v1/poll_question
const get = async (event?: APIGatewayEvent): Promise<ProxyResult> => {
    const params = event?.queryStringParameters

    if (!params?.pollQuestionId) {
        return responses._400({ message: 'Missing pollQuestionId' })
    }

    try {
        const [question, options] = await Promise.all([
            PollQuestion.findOne({
                where: {
                    id: params?.pollQuestionId,
                },
            }),
            PollOption.findAll({
                where: {
                    pollQuestionId: params?.pollQuestionId,
                },
            }),
        ])

        return responses._200({
            question: { ...question, options },
        })
    } catch (error) {
        return responses._400({
            message: error.name || 'Fail to query',
        })
    }
}

// POST /api/v1/poll_question
const create = async (event?: APIGatewayEvent): Promise<ProxyResult> => {
    const body = querystring.parse(event?.body || '')
    const params = event?.queryStringParameters

    if (!params?.pollId) {
        return responses._400({ message: 'Missing folderId parameter' })
    }

    try {
        const result = await PollQuestion.create({
            question: body?.question,
            pollId: params?.pollId,
        })

        return responses._200({
            message: 'Success',
            data: result,
        })
    } catch (error) {
        return responses._400({
            message: error.name || 'Fail to create',
        })
    }
}

// PUT /api/v1/poll_question
const update = async (event?: APIGatewayEvent): Promise<ProxyResult> => {
    const body = querystring.parse(event?.body || '')
    const params = event?.queryStringParameters

    if (!params?.pollQuestionId) {
        return responses._400({ message: 'Missing pollQuestionId parameter' })
    }

    try {
        await PollQuestion.update(
            { question: body.question },
            { where: { id: params?.pollQuestionId } }
        )
        return responses._200({
            message: 'Success',
        })
    } catch (error) {
        return responses._400({
            message: error.name || 'Fail to update',
        })
    }
}

// DELETE /api/v1/poll_question
const remove = async (event?: APIGatewayEvent): Promise<ProxyResult> => {
    const params = event?.queryStringParameters

    if (!params?.pollQuestionId) {
        return responses._400({ message: 'Missing pollQuestionId parameter' })
    }

    try {
        await PollQuestion.destroy({ where: { id: params?.pollQuestionId } })

        return responses._200({
            message: 'Success',
        })
    } catch (error) {
        return responses._400({
            message: error.name || 'Fail to create',
        })
    }
}

export { get, create, update, remove }
