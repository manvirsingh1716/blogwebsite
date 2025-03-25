"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import TiptapEditor from '@/components/ui/tiptapeditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const studyMaterialSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

type StudyMaterialFormData = z.infer<typeof studyMaterialSchema>;

interface StudyMaterialFormProps {
  initialData?: Partial<StudyMaterialFormData>;
  onSubmit: (data: StudyMaterialFormData) => void;
}

export function StudyMaterialForm({ initialData, onSubmit }: StudyMaterialFormProps) {
  const form = useForm<StudyMaterialFormData>({
    resolver: zodResolver(studyMaterialSchema),
    defaultValues: {
      title: '',
      subject: '',
      content: '',
      ...initialData,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...form.register('title')}
            className="mt-1"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            {...form.register('subject')}
            className="mt-1"
          />
          {form.formState.errors.subject && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.subject.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <TiptapEditor
            content={form.getValues('content')}
            onChange={(html) => form.setValue('content', html)}
          />
          {form.formState.errors.content && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.content.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Study Material
      </Button>
    </form>
  );
}
