import { redirect } from 'next/navigation';

export default function SubmitPage() {
  redirect(
    'https://docs.google.com/forms/d/e/1FAIpQLSefClGcJ1DaitR5w2mwWXS5yiQ-Edwq79idGr7spvxvgtvIzw/viewform?usp=dialog'
  );
}
