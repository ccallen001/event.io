'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { getAllCategories } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/database/models/category.model';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function CategoryFilter() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSelectCategory(categoryName: string) {
    let newUrl = '';

    if (categoryName && categoryName !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: categoryName
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      });
    }

    router.push(newUrl, { scroll: false });
  }

  useEffect(() => {
    (async () => {
      const allCategories = await getAllCategories();
      setCategories(allCategories);
    })();
  }, []);

  return (
    <Select onValueChange={(value) => handleSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>

        {categories.map((category) => (
          <SelectItem
            value={category.name}
            key={category._id}
            className="select-item p-regular-14"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CategoryFilter;
