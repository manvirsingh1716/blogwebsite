import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().min(1, 'Image URL is required'),
  info: z.string().min(1, 'Info is required'),
});

const aboutPageSchema = z.object({
  hero: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
  }),
  mission: z.string().min(1, 'Mission statement is required'),
  veterans: z.array(teamMemberSchema),
  coreMembers: z.array(teamMemberSchema),
  metadata: z.object({
    lastUpdated: z.string().optional(),
    teamSize: z.number().optional(),
  }),
});

type AboutPageFormData = z.infer<typeof aboutPageSchema>;

interface AboutPageFormProps {
  initialData?: AboutPageFormData;
  onSubmit: (data: AboutPageFormData) => void;
}

export const AboutPageForm: React.FC<AboutPageFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutPageFormData>({
    resolver: zodResolver(aboutPageSchema),
    defaultValues: initialData || {
      hero: { title: '', description: '' },
      mission: '',
      veterans: [],
      coreMembers: [],
      metadata: {},
    },
  });

  const { fields: veteransFields, append: appendVeteran, remove: removeVeteran } = useFieldArray({
    control,
    name: 'veterans',
  });

  const { fields: coreMembersFields, append: appendCoreMember, remove: removeCoreMember } = useFieldArray({
    control,
    name: 'coreMembers',
  });

  const handleFormSubmit = (data: AboutPageFormData) => {
    // Create a structured object with proper types
    const formattedData = {
      hero: {
        title: data.hero.title,
        description: data.hero.description,
      },
      mission: data.mission,
      veterans: data.veterans.map(v => ({
        name: v.name,
        image: v.image,
        info: v.info,
      })),
      coreMembers: data.coreMembers.map(m => ({
        name: m.name,
        image: m.image,
        info: m.info,
      })),
      metadata: {
        lastUpdated: new Date().toISOString(),
        teamSize: data.metadata.teamSize || data.veterans.length + data.coreMembers.length,
      },
    };
    
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Hero Section</h2>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            {...register('hero.title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.hero?.title && (
            <p className="mt-1 text-sm text-red-600">{errors.hero.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register('hero.description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.hero?.description && (
            <p className="mt-1 text-sm text-red-600">{errors.hero.description.message}</p>
          )}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Mission Statement</h2>
        <div>
          <textarea
            {...register('mission')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={4}
          />
          {errors.mission && (
            <p className="mt-1 text-sm text-red-600">{errors.mission.message}</p>
          )}
        </div>
      </div>

      {/* Veterans Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Veterans Team</h2>
        {veteransFields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                {...register(`veterans.${index}.name`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <input
                type="text"
                {...register(`veterans.${index}.image`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Info</label>
              <textarea
                {...register(`veterans.${index}.info`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => removeVeteran(index)}
              className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendVeteran({ name: '', image: '', info: '' })}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Veteran
        </button>
      </div>

      {/* Core Members Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Core Team</h2>
        {coreMembersFields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                {...register(`coreMembers.${index}.name`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <input
                type="text"
                {...register(`coreMembers.${index}.image`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Info</label>
              <textarea
                {...register(`coreMembers.${index}.info`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => removeCoreMember(index)}
              className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendCoreMember({ name: '', image: '', info: '' })}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Core Member
        </button>
      </div>

      {/* Metadata Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Metadata</h2>
        <div>
          <label className="block text-sm font-medium">Last Updated</label>
          <input
            type="date"
            {...register('metadata.lastUpdated')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Team Size</label>
          <input
            type="number"
            {...register('metadata.teamSize', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};
