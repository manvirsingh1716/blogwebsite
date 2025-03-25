import React, { useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import TiptapEditor from '@/components/ui/tiptapeditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const currentAffairsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  content: z.string().min(1, 'Main content is required'),
  metadata: z.object({
    category: z.string().min(1, 'Category is required'),
    tags: z.array(z.string()),
    source: z.string().min(1, 'Source is required'),
  }),
});

type CurrentAffairsFormData = z.infer<typeof currentAffairsSchema>;

interface CurrentAffairsFormProps {
  initialData?: CurrentAffairsFormData;
  onSubmit: (data: CurrentAffairsFormData) => void;
}

export const CurrentAffairsForm: React.FC<CurrentAffairsFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<CurrentAffairsFormData>({
    resolver: zodResolver(currentAffairsSchema),
    defaultValues: initialData || {
      title: '',
      date: '',
      content: '',
      metadata: {
        category: '',
        tags: [],
        source: '',
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          {...register('title')}
          className="mt-1"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          {...register('date')}
          className="mt-1"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      {/* Main Content */}
      <div>
        <Label>Main Content</Label>
        <div className="mt-1">
          <TiptapEditor
            content={getValues('content')}
            onChange={(html) => setValue('content', html)}
          />
        </div>
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          type="text"
          id="category"
          {...register('metadata.category')}
          className="mt-1"
        />
        {errors.metadata?.category && (
          <p className="mt-1 text-sm text-red-600">{errors.metadata.category.message}</p>
        )}
      </div>

      {/* Source */}
      <div>
        <Label htmlFor="source">Source</Label>
        <Input
          type="text"
          id="source"
          {...register('metadata.source')}
          className="mt-1"
        />
        {errors.metadata?.source && (
          <p className="mt-1 text-sm text-red-600">{errors.metadata.source.message}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          type="text"
          id="tags"
          onChange={(e) => {
            const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
            setValue('metadata.tags', tags);
          }}
          className="mt-1"
        />
      </div>

      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
};
