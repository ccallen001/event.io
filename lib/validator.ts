import * as zod from 'zod';

export const eventFormSchema = zod.object({
  title: zod.string().min(3, {
    message: 'Title must be at least 3 characters long'
  }),
  description: zod
    .string()
    .min(3, { message: 'Description must be at least 3 characters long' })
    .max(4000, {
      message: 'Description must be less than 4000 characters long'
    }),
  location: zod
    .string()
    .min(3, {
      message: 'Location must be at least 3 characters long'
    })
    .max(400, { message: 'Location must be less than 400 characters long' }),
  imageUrl: zod.string().url({ message: 'Image URL must be a valid URL' }),
  startDateTime: zod.date(),
  endDateTime: zod.date(),
  categoryId: zod.string(),
  price: zod.string(),
  isFree: zod.boolean(),
  url: zod.string().url({ message: 'URL must be a valid URL' })
});
