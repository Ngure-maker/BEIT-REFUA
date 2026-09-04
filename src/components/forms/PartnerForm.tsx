import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { partnerFields } from '@/data/get-involved';
import { cn } from '@/utils/cn';

const partnerSchema = z.object({
  organizationName: z.string().min(2, 'Please enter your organization name'),
  contactName: z.string().min(2, 'Please enter the contact person name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  organizationType: z.string().min(1, 'Please select an organization type'),
  partnershipInterest: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  message: z.string().min(10, 'Please tell us about your vision for partnership'),
});

type PartnerFormValues = z.infer<typeof partnerSchema>;

export function PartnerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      partnershipInterest: [],
    },
  });

  const selectedInterests = watch('partnershipInterest');

  const toggleInterest = (interest: string) => {
    const current = selectedInterests ?? [];
    const next = current.includes(interest)
      ? current.filter((i) => i !== interest)
      : [...current, interest];
    setValue('partnershipInterest', next, { shouldValidate: true });
  };

  const onSubmit = async (data: PartnerFormValues) => {
    setIsSubmitting(true);
    // Simulate API call - will be replaced with real backend integration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Partner inquiry submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="size-12 text-green-600" aria-hidden="true" />
        <h3 className="text-xl font-display text-forest">Thank you for reaching out!</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          We are excited to explore how we can partner together. Our team will be in touch within a few days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="partner-org" className="label">Organization / Church Name</label>
          <input id="partner-org" type="text" className="input" {...register('organizationName')} />
          {errors.organizationName && <p className="mt-1 text-sm text-red-600">{errors.organizationName.message}</p>}
        </div>
        <div>
          <label htmlFor="partner-contact" className="label">Contact Person</label>
          <input id="partner-contact" type="text" className="input" {...register('contactName')} />
          {errors.contactName && <p className="mt-1 text-sm text-red-600">{errors.contactName.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="partner-email" className="label">Email Address</label>
          <input id="partner-email" type="email" className="input" {...register('email')} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="partner-phone" className="label">Phone Number</label>
          <input id="partner-phone" type="tel" className="input" {...register('phone')} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="partner-type" className="label">Organization Type</label>
        <select id="partner-type" className="input" {...register('organizationType')}>
          <option value="">Select organization type...</option>
          {partnerFields.find((f) => f.name === 'organizationType')?.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.organizationType && <p className="mt-1 text-sm text-red-600">{errors.organizationType.message}</p>}
      </div>

      <div>
        <span className="label">Areas of Partnership Interest</span>
        <div className="grid gap-2 sm:grid-cols-2">
          {partnerFields.find((f) => f.name === 'partnershipInterest')?.options?.map((opt) => (
            <label
              key={opt}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
                selectedInterests?.includes(opt)
                  ? 'border-gold bg-gold/10 text-forest'
                  : 'border-border text-muted-foreground hover:border-gold/50'
              )}
            >
              <input
                type="checkbox"
                checked={selectedInterests?.includes(opt) ?? false}
                onChange={() => toggleInterest(opt)}
                className="size-4 rounded border-border"
              />
              {opt}
            </label>
          ))}
        </div>
        {errors.partnershipInterest && <p className="mt-1 text-sm text-red-600">{errors.partnershipInterest.message}</p>}
      </div>

      <div>
        <label htmlFor="partner-message" className="label">Tell us about your vision for partnership</label>
        <textarea id="partner-message" className="textarea" {...register('message')} />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          'Start a Conversation'
        )}
      </button>
    </form>
  );
}