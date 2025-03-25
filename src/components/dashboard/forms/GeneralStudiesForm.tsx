'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TiptapEditor from '@/components/ui/tiptapeditor';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  paper: z.string().min(1, 'Paper is required'),
  topic: z.string().min(2, 'Topic is required'),
  subtopic: z.string().min(2, 'Subtopic is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  importanceLevel: z.string(),
  previousYearQuestions: z.string(),
  keyPoints: z.string().min(10, 'Key points are required'),
  sources: z.string(),
});

export type GeneralStudiesFormValues = z.infer<typeof formSchema>;

interface GeneralStudiesFormProps {
  onSubmit: (data: GeneralStudiesFormValues) => void;
  defaultValues?: Partial<GeneralStudiesFormValues>;
}

export function GeneralStudiesForm({ onSubmit, defaultValues }: GeneralStudiesFormProps) {
  console.log('GeneralStudiesForm rendered with props:', { defaultValues });

  const form = useForm<GeneralStudiesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      paper: '',
      topic: '',
      subtopic: '',
      content: '',
      importanceLevel: 'medium',
      previousYearQuestions: '',
      keyPoints: '',
      sources: '',
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500 font-medium">Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter title" 
                  {...field} 
                  className="border-blue-100 focus:border-blue-300 focus:ring-blue-300 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Paper and Importance Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="paper"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 font-medium">Paper</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-blue-100 focus:border-blue-300 focus:ring-blue-300 rounded-lg">
                      <SelectValue placeholder="Select paper" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="gs1">GS Paper 1</SelectItem>
                    <SelectItem value="gs2">GS Paper 2</SelectItem>
                    <SelectItem value="gs3">GS Paper 3</SelectItem>
                    <SelectItem value="gs4">GS Paper 4</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="importanceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 font-medium">Importance Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-blue-100 focus:border-blue-300 focus:ring-blue-300 rounded-lg">
                      <SelectValue placeholder="Select importance" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Topic and Subtopic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 font-medium">Topic</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter topic" 
                    {...field} 
                    className="border-blue-100 focus:border-blue-300 focus:ring-blue-300 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subtopic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 font-medium">Subtopic</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter subtopic" 
                    {...field} 
                    className="border-blue-100 focus:border-blue-300 focus:ring-blue-300 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Main Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500 font-medium">Content</FormLabel>
              <FormControl>
                <div className="border border-blue-100 rounded-lg overflow-hidden">
                  <TiptapEditor
                    content={form.getValues('content')}
                    onChange={(html) => form.setValue('content', html)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Previous Year Questions */}
        <FormField
          control={form.control}
          name="previousYearQuestions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500 font-medium">Previous Year Questions</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter previous year questions..." 
                  {...field} 
                  className="min-h-[100px] border-blue-100 focus:border-blue-300 focus:ring-blue-300 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Key Points */}
        <FormField
          control={form.control}
          name="keyPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500 font-medium">Key Points</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter key points..." 
                  {...field} 
                  className="min-h-[100px] border-blue-100 focus:border-blue-300 focus:ring-blue-300 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sources */}
        <FormField
          control={form.control}
          name="sources"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500 font-medium">Sources</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter sources..." 
                  {...field} 
                  className="min-h-[100px] border-blue-100 focus:border-blue-300 focus:ring-blue-300 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-2 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-colors duration-200"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
