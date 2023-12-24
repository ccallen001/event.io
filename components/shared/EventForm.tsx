'use client';

import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import DropDown from '@/components/shared/DropDown';
import { eventFormSchema } from '@/lib/validator';
import { eventDefaultValues } from '@/constants';

type EventFormProps = { userId: string; type: 'Create' | 'Update' };

const defaultValues = eventDefaultValues;

function EventForm({ userId, type }: EventFormProps) {
  const form = useForm<zod.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues
  });

  function onSubmit(values: zod.infer<typeof eventFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="input-field"
                    placeholder="Event title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DropDown
                    value={field.value}
                    onChange={field.onChange}
                  ></DropDown>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default EventForm;
