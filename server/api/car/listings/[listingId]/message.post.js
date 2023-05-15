import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = Joi.object({
  email: Joi.string().required(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
  message: Joi.string().required().min(20),
});

export default defineEventHandler(async (e) => {
  const body = await readBody(e);
  const { listingId } = e.context.params;

  const { error, value } = schema.validate(body);

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const { message, email, phone, name } = body;

  return prisma.message.create({
    data: {
      message,
      email,
      phone,
      name,
      listingId: parseInt(listingId),
    },
  });
});
