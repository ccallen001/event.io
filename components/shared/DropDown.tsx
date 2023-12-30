import { startTransition, useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import { ICategory } from '@/lib/database/models/category.model';
import { Input } from '../ui/input';
import {
  createCategory,
  getAllCategories
} from '@/lib/actions/category.actions';

type DropDownProps = {
  value?: string;
  onChange?: () => void;
};

function DropDown({ value, onChange }: DropDownProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    (async () => {
      const allCategories = await getAllCategories();
      setCategories(allCategories);
    })();
  }, []);

  function handleAddCategory() {
    createCategory({
      categoryName: newCategory.trim()
    }).then((createdCategory) =>
      setCategories((prev) => [...prev, createdCategory])
    );
  }

  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            className="select-item p-regular-14"
            key={category._id}
            value={category._id}
          >
            {category.name}
          </SelectItem>
        ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add New Category
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  className="input-field mt-3"
                  type="text"
                  placeholder="New Category"
                  onChange={(ev) => setNewCategory(ev.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
}

export default DropDown;
