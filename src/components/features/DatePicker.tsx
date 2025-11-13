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

type DatePickerProps = {
  defaultValue?: Date;
  label?: string;
  onDateChange?: (date: Date) => void;
};
const DatePicker: React.FC<DatePickerProps> = ({
  defaultValue,
  label = 'Pick a date',
  onDateChange,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (date) {
      setOpen((prev) => !prev);
      onDateChange?.(date);
    }
  }, [date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          data-empty={!date}
          className='data-[empty=true]:text-muted-foreground justify-start text-left font-normal'
        >
          <CalendarIcon />
          {date && !onDateChange ? format(date, 'PPP') : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          // defaultMonth={date}
          selected={date}
          onSelect={setDate}
          captionLayout='dropdown'
        />
      </PopoverContent>
      <input
        type='hidden'
        name='date'
        value={date ? format(date, 'yyyy-MM-dd') : ''}
      />{' '}
    </Popover>
  );
};
export default DatePicker;
