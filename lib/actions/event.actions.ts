'user server';

import { connectToDb } from '@/lib/database';
import User from '@/lib/database/models/user.model';

import { CreateEventParams } from '@/types';

export async function CreateEvent({ event, userId, path }: CreateEventParams) {
  try {
    await connectToDb();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error('Organizer not found');
    }
  } catch (error) {}
}
