"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import TiptapEditor from '@/components/ui/tiptapeditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.object({
    mainContent: z.string().min(1, 'Main content is required'),
  }),
  metadata: z.object({
    author: z.string().min(1, 'Author is required'),
    keywords: z.array(z.string()),
    description: z.string().min(1, 'Description is required'),
  }),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  initialData?: ArticleFormData;
  onSubmit: (data: ArticleFormData) => void;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: initialData || {
      title: '',
      content: {
        mainContent: '',
      },
      metadata: {
        author: '',
        keywords: [],
        description: '',
      },
    },
  });

  const handleEditorChange = (content: string) => {
    setValue('content.mainContent', content, { shouldValidate: true });
  };

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

      {/* Main Content */}
      <div>
        <Label>Main Content</Label>
        <div className="mt-1">
          <TiptapEditor
            content={watch('content.mainContent')}
            onChange={handleEditorChange}
          />
        </div>
        {errors.content?.mainContent && (
          <p className="mt-1 text-sm text-red-600">{errors.content.mainContent.message}</p>
        )}
      </div>

      {/* Author */}
      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          type="text"
          id="author"
          {...register('metadata.author')}
          className="mt-1"
        />
        {errors.metadata?.author && (
          <p className="mt-1 text-sm text-red-600">{errors.metadata.author.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          {...register('metadata.description')}
          className="mt-1"
        />
        {errors.metadata?.description && (
          <p className="mt-1 text-sm text-red-600">{errors.metadata.description.message}</p>
        )}
      </div>

      {/* Keywords */}
      <div>
        <Label htmlFor="keywords">Keywords (comma-separated)</Label>
        <Input
          type="text"
          id="keywords"
          onChange={(e) => {
            const keywords = e.target.value.split(',').map(k => k.trim()).filter(Boolean);
            setValue('metadata.keywords', keywords);
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
