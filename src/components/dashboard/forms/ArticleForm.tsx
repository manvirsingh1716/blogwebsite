"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import TiptapEditor from '@/components/ui/tiptapeditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.object({
    mainContent: z.string().min(1, 'Main content is required'),
    image: z.string().optional(),
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
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.content?.image || null
  );

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
        image: '',
      },
    },
  });

  const handleEditorChange = (content: string) => {
    setValue('content.mainContent', content, { shouldValidate: true });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setValue('content.image', result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
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

      {/* Image Upload */}
      <div>
        <Label htmlFor="image">Featured Image</Label>
        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1"
        />
        
        {imagePreview && (
          <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={imagePreview}
              alt="Image preview"
              fill
              className="object-cover"
            />
          </div>
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

      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
};