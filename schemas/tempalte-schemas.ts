import Joi from 'joi';

export const templateSchema: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().empty(''),
    importance: Joi.number().required(),
    userId: Joi.string().required(),
});

export const templatePropsSchema: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string(),
    description: Joi.string().empty(''),
    importance: Joi.number(),
    userId: Joi.string(),
});
