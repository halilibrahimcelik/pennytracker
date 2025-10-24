'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const DatePicker: React.FC = () => {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (date) {
      setOpen((prev) => !prev);
    }
  }, [date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          data-empty={!date}
          className='data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal'
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={setDate} />
      </PopoverContent>
      <input type='hidden' name='date' value={date?.toISOString() ?? ''} />{' '}
    </Popover>
  );
};
export default DatePicker;
