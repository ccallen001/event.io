'use server';

import { connectToDb } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import Event from '@/lib/database/models/event.model';
import Category from '@/lib/database/models/category.model';

import {
  CreateEventParams,
  Event as EventType,
  GetAllEventsParams
} from '@/types';

import { handleError } from '@/lib/utils';
import { Query } from 'mongoose';

async function populateEvent(query: Query<unknown, unknown>) {
  return query
    .populate({
      path: 'organizer',
      model: User,
      select: '_id firstName lastName'
    })
    .populate({ path: 'category', model: Category, select: '_id name' });
}

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

export async function getEvent(id: string) {
  try {
    await connectToDb();

    const event = await populateEvent(Event.findById(id));

    if (!event) {
      throw new Error('Event not found');
    }

    return JSON.parse(JSON.stringify(event)) as EventType;
  } catch (error) {
    handleError(error);
  }
}

export async function getAllEvents({
  query,
  limit = 6,
  page,
  category
}: GetAllEventsParams) {
  try {
    await connectToDb();

    const conditions = {};

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(0)
      .limit(limit);

    const events = await populateEvent(eventsQuery);

    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)) as EventType[],
      totalPages: Math.ceil(eventsCount / limit)
    };
  } catch (error) {
    handleError(error);
  }
}
