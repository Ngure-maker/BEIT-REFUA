import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { volunteerFields } from '@/data/get-involved';

const volunteerSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  profession: z.string().min(2, 'Please enter your profession'),
  skills: z.string().min(10, 'Please describe your skills and experience'),
  availability: z.string().min(1, 'Please select your availability'),
  motivation: z.string().min(10, 'Please tell us why you want to volunteer'),
  experience: z.string().optional(),
  references: z.string().optional(),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
  });

  const onSubmit = async (data: VolunteerFormValues) => {
    setIsSubmitting(true);
    // Simulate API call - will be replaced with real backend integration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Volunteer application submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="size-12 text-green-600" aria-hidden="true" />
        <h3 className="text-xl font-display text-forest">Application received!</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Thank you for offering your time and skills. Our team will review your application and be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-name" className="label">Full Name</label>
          <input id="vol-name" type="text" className="input" {...register('name')} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="vol-email" className="label">Email Address</label>
          <input id="vol-email" type="email" className="input" {...register('email')} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-phone" className="label">Phone Number</label>
          <input id="vol-phone" type="tel" className="input" {...register('phone')} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="vol-profession" className="label">Profession / Role</label>
          <input id="vol-profession" type="text" className="input" placeholder="e.g. Nurse, Teacher, Builder" {...register('profession')} />
          {errors.profession && <p className="mt-1 text-sm text-red-600">{errors.profession.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="vol-skills" className="label">Skills & Experience</label>
        <textarea id="vol-skills" className="textarea" placeholder="Describe your skills, training and experience..." {...register('skills')} />
        {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>}
      </div>

      <div>
        <label htmlFor="vol-availability" className="label">Availability</label>
        <select id="vol-availability" className="input" {...register('availability')}>
          <option value="">Select availability...</option>
          {volunteerFields.find((f) => f.name === 'availability')?.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.availability && <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>}
      </div>

      <div>
        <label htmlFor="vol-motivation" className="label">Why do you want to volunteer with Beit-Refuah?</label>
        <textarea id="vol-motivation" className="textarea" {...register('motivation')} />
        {errors.motivation && <p className="mt-1 text-sm text-red-600">{errors.motivation.message}</p>}
      </div>

      <div>
        <label htmlFor="vol-experience" className="label">Previous Volunteer/Mission Experience (optional)</label>
        <textarea id="vol-experience" className="textarea" {...register('experience')} />
      </div>

      <div>
        <label htmlFor="vol-references" className="label">References (optional)</label>
        <textarea id="vol-references" className="textarea" placeholder="Names and contact details of references..." {...register('references')} />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          'Apply to Volunteer'
        )}
      </button>
    </form>
  );
}