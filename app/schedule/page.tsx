import { redirect } from 'next/navigation';

export default function SchedulePage() {
  redirect(
    'https://calendar.google.com/calendar/embed?src=d34e8a14ff9475cde9c0033bfd592bfd21145f27f9dac94393197987b5fd8462%40group.calendar.google.com&ctz=America%2FArgentina%2FBuenos_Aires'
  );
}
