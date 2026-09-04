import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';

const prayerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  request: z.string().min(10, 'Please share your prayer request (at least 10 characters)'),
  isAnonymous: z.boolean().default(false),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Please consent to sharing your request with the prayer team',
  }),
});

type PrayerFormValues = z.infer<typeof prayerSchema>;

export function PrayerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PrayerFormValues>({
    resolver: zodResolver(prayerSchema),
    defaultValues: {
      isAnonymous: false,
      consent: false,
    },
  });

  const onSubmit = async (data: PrayerFormValues) => {
    setIsSubmitting(true);
    // Simulate API call - will be replaced with real backend integration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Prayer request submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="size-12 text-green-600" aria-hidden="true" />
        <h3 className="text-xl font-display text-forest">Your prayer request has been received.</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Our prayer team will be praying for you. Beit-Refuah began as a prayer — we take this seriously.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="prayer-name" className="label">Name (optional)</label>
          <input id="prayer-name" type="text" className="input" placeholder="Your name" {...register('name')} />
        </div>
        <div>
          <label htmlFor="prayer-email" className="label">Email (for updates)</label>
          <input id="prayer-email" type="email" className="input" placeholder="you@example.com" {...register('email')} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="prayer-request" className="label">Prayer Request</label>
        <textarea
          id="prayer-request"
          className="textarea"
          placeholder="Share what we can be praying for..."
          {...register('request')}
        />
        {errors.request && <p className="mt-1 text-sm text-red-600">{errors.request.message}</p>}
      </div>

      <label className="flex items-center gap-3 text-sm text-muted-foreground">
        <input type="checkbox" className="size-4 rounded border-border" {...register('isAnonymous')} />
        Keep my request anonymous
      </label>

      <div>
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" className="mt-0.5 size-4 rounded border-border" {...register('consent')} />
          <span>I consent to my request being shared with the prayer team</span>
        </label>
        {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          'Submit Prayer Request'
        )}
      </button>
    </form>
  );
}