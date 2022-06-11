import Joi from 'joi';

export const eventSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    dateTime: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    status: Joi.string().required(),
    description: Joi.string().empty(''),
    duration: Joi.number().required(),
    meetingLink: Joi.string().empty(''),
    location: Joi.string().empty(''),
    importance: Joi.string().empty(''),
    participants: Joi.alternatives(Joi.array(), Joi.object()),
    userId: Joi.string(),
    recurringId: Joi.string(),
});

export const eventPropsSchema = Joi.object({
    name: Joi.string(),
    dateTime: Joi.alternatives().try(Joi.string(), Joi.date()),
    status: Joi.string(),
    description: Joi.string().empty(''),
    duration: Joi.number(),
    meetingLink: Joi.string().empty(''),
    location: Joi.string().empty(''),
    importance: Joi.string().empty(''),
    // participants: Joi.alternatives(Joi.array(), Joi.object()),
    participants: Joi.array(),
    userId: Joi.string(),
});

export const participantSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
});
