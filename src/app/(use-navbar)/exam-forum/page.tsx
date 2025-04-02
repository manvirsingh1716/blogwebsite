import { redirect } from 'next/navigation';

export default function ExamForumPage() {
  redirect('/#'); // Redirect to home page
  return null; // This will never be reached
}