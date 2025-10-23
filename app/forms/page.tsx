import type { FormsResponse } from '@/types/forms';
import { ButtonGroup } from '@/components/ui/button-group';
import { ButtonLink } from '@/components/ui/buttonLink';

export default async function Froms() {
  const res = await fetch('https://api.briflify.com/forms/');
  if (!res.ok) {
    throw new Error('Failed to fetch forms');
  }

  const formsData: FormsResponse = await res.json();

  return (
    <div className='relative flex h-screen w-screen flex-col items-center justify-center'>
      <ButtonGroup className='absolute bottom-10'>
        <ButtonLink href={'/'}>Home</ButtonLink>
        {formsData.forms.map((form) => (
          <ButtonLink key={form.id} href={`/forms/${form.id}/`}>
            {form.title}
          </ButtonLink>
        ))}
      </ButtonGroup>
      <h1 className='mb-4 text-6xl font-bold'>Forms page</h1>
      <p className='mb-4 max-w-[450px]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );
}
