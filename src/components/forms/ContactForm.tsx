import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Please enter a subject'),
  message: z.string().min(10, 'Please enter your message (at least 10 characters)'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Simulate API call - will be replaced with real backend integration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Contact message submitted:', data);
      setIsSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="size-12 text-green-600" aria-hidden="true" />
        <h3 className="text-xl font-display text-forest">Message sent!</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Thank you for reaching out. Our team will respond to your message as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label">Name</label>
          <input id="contact-name" type="text" className="input" {...register('name')} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="label">Email</label>
          <input id="contact-email" type="email" className="input" {...register('email')} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="label">Phone (optional)</label>
          <input id="contact-phone" type="tel" className="input" {...register('phone')} />
        </div>
        <div>
          <label htmlFor="contact-subject" className="label">Subject</label>
          <input id="contact-subject" type="text" className="input" {...register('subject')} />
          {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="label">Message</label>
        <textarea id="contact-message" className="textarea" {...register('message')} />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}