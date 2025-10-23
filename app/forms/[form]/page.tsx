import { notFound } from 'next/navigation';
import type { FormsResponse, FormData } from '@/types/forms';
import { ButtonGroup } from '@/components/ui/button-group';
import { ButtonLink } from '@/components/ui/buttonLink';

async function getForms(): Promise<FormsResponse> {
  const res = await fetch('https://api.briflify.com/forms/', {
    cache: 'force-cache', // <- обязательно для SSG
  });

  if (!res.ok) throw new Error('Failed to fetch forms');
  return res.json();
}

async function getFormById(id: string): Promise<FormData | null> {
  const data = await getForms();
  return data.forms.find((f) => f.id === id) ?? null;
}

// --- Генерация параметров для SSG
export async function generateStaticParams() {
  const data = await getForms();
  return data.forms.map((form) => ({
    form: form.id,
  }));
}

export default async function FormPage({
  params: paramsPromise,
}: {
  params: Promise<{ form: string }>;
}) {
  const params = await paramsPromise;
  const form = await getFormById(params.form);

  if (!form) notFound();

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center p-8'>
      <ButtonGroup className='absolute bottom-10'>
        <ButtonLink href='/'>Home</ButtonLink>
        <ButtonLink href='/forms'>All Forms</ButtonLink>
      </ButtonGroup>
      <h1 className='mb-4 text-5xl font-bold'>{form.title}</h1>
      <div className='mt-10 w-full max-w-2xl'>
        {form.pages.map((page) => (
          <div key={page.pageNumber} className='mb-8'>
            <h2 className='mb-2 text-xl font-semibold'>
              Page {page.pageNumber}
            </h2>
            <ul className='space-y-3'>
              {page.questions.map((q) => (
                <li key={q.id} className='rounded-md border p-3'>
                  <p className='font-medium'>
                    {q.text}{' '}
                    {q.required && <span className='text-red-500'>*</span>}
                  </p>
                  <p className='text-sm text-gray-500'>Type: {q.type}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
