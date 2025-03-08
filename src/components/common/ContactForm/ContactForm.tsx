'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('');

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', mobile: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-md mx-auto shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
        Get Free UPSC Study Material
      </h2>

      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Thank you! We&apos;ll contact you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {(['name', 'email', 'mobile', 'message'] as (keyof FormData)[]).map((field) => (
          <div key={field}>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 text-base transition-all duration-200 ease-in-out focus:outline-none focus:border-gray-400 focus:ring-0 placeholder-gray-400 ${errors[field] ? 'border-red-500' : ''}`}
              disabled={isSubmitting}
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-[#ffc107] hover:bg-[#ffb300] text-black font-medium rounded-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;