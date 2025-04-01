import { redirect } from 'next/navigation';

export default function FreeStudyMaterialPage() {
  redirect('/#'); // Redirect to home page
  return null; // This will never be reached
}