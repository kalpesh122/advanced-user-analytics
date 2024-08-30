import Joi from 'joi';

export const eventValidationSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  event_type: Joi.string().valid('page_view', 'button_click').required(),
  user_id: Joi.string().required(),
  page_url: Joi.string().uri().allow(null).optional(),
  button_name: Joi.string().allow(null).when('event_type', {
    is: 'button_click',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  timestamp: Joi.date().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});
