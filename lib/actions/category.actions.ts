'use server';

import { CreateCategoryParams } from '@/types';
import { handleError } from '@/lib/utils';
import { connectToDb } from '@/lib/database';
import Category, { ICategory } from '@/lib/database/models/category.model';

export async function createCategory({ categoryName }: CreateCategoryParams) {
  try {
    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllCategories(): Promise<ICategory[]> {
  try {
    await connectToDb();

    const foundCategories = await Category.find({});

    return JSON.parse(JSON.stringify(foundCategories)) || [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
