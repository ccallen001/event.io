'use server';

import { connectToDb } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import Event from '@/lib/database/models/event.model';

import { CreateEventParams } from '@/types';
import { handleError } from '../utils';

export async function createEvent({ event, userId, path }: CreateEventParams) {
  try {
    await connectToDb();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error('Organizer not found');
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}
