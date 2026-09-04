import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { donationPresets } from '@/data/get-involved';
import { formatCurrency } from '@/utils/format';
import { cn } from '@/utils/cn';

const donationSchema = z.object({
  amount: z.number().min(1, 'Please select or enter an amount'),
  customAmount: z.number().min(1, 'Minimum donation is KES 1').optional(),
  frequency: z.enum(['one-time', 'monthly']),
  donorName: z.string().min(2, 'Please enter your name'),
  donorEmail: z.string().email('Please enter a valid email'),
  donorPhone: z.string().optional(),
  paymentMethod: z.enum(['mpesa', 'stripe', 'bank-transfer']),
  isAnonymous: z.boolean().default(false),
  note: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export function DonationForm() {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 1000,
      frequency: 'one-time',
      paymentMethod: 'mpesa',
      isAnonymous: false,
    },
  });

  const frequency = watch('frequency');
  const amount = watch('amount');

  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);
    // Simulate API call - will be replaced with real backend integration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Donation submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="size-12 text-green-600" aria-hidden="true" />
        <h3 className="text-xl font-display text-forest">Thank you for your generosity!</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Your {frequency === 'monthly' ? 'monthly' : 'one-time'} gift of {formatCurrency(amount)} will help us continue healing people and restoring hope in Kakamega County.
        </p>
        <p className="text-xs text-muted-foreground">
          A confirmation has been sent to your email. Our team will follow up with payment instructions.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Frequency */}
      <div>
        <span className="label">Giving Frequency</span>
        <div className="grid grid-cols-2 gap-3">
          {(['one-time', 'monthly'] as const).map((freq) => (
            <button
              key={freq}
              type="button"
              onClick={() => setValue('frequency', freq)}
              className={cn(
                'rounded-md border px-4 py-3 text-sm font-medium transition-colors',
                frequency === freq
                  ? 'border-gold bg-gold/10 text-forest'
                  : 'border-border text-muted-foreground hover:border-gold/50'
              )}
            >
              {freq === 'one-time' ? 'One-Time Gift' : 'Monthly Partner'}
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div>
        <span className="label">Amount (KES)</span>
        <div className="grid grid-cols-3 gap-3">
          {donationPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setSelectedPreset(preset);
                setValue('amount', preset);
              }}
              className={cn(
                'rounded-md border px-4 py-3 text-sm font-medium transition-colors',
                selectedPreset === preset
                  ? 'border-gold bg-gold/10 text-forest'
                  : 'border-border text-muted-foreground hover:border-gold/50'
              )}
            >
              {formatCurrency(preset)}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <label htmlFor="customAmount" className="label">Custom Amount (KES)</label>
          <input
            id="customAmount"
            type="number"
            min="1"
            placeholder="Enter custom amount"
            className="input"
            {...register('customAmount', { valueAsNumber: true })}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val > 0) {
                setSelectedPreset(null);
                setValue('amount', val);
              }
            }}
          />
          {errors.customAmount && <p className="mt-1 text-sm text-red-600">{errors.customAmount.message}</p>}
        </div>
      </div>

      {/* Donor details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="donorName" className="label">Full Name</label>
          <input id="donorName" type="text" className="input" {...register('donorName')} />
          {errors.donorName && <p className="mt-1 text-sm text-red-600">{errors.donorName.message}</p>}
        </div>
        <div>
          <label htmlFor="donorEmail" className="label">Email Address</label>
          <input id="donorEmail" type="email" className="input" {...register('donorEmail')} />
          {errors.donorEmail && <p className="mt-1 text-sm text-red-600">{errors.donorEmail.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="donorPhone" className="label">Phone Number (optional)</label>
        <input id="donorPhone" type="tel" className="input" {...register('donorPhone')} />
      </div>

      {/* Payment method */}
      <div>
        <span className="label">Payment Method</span>
        <div className="grid gap-3 sm:grid-cols-3">
          {([
            { value: 'mpesa', label: 'M-Pesa' },
            { value: 'stripe', label: 'Card (Stripe)' },
            { value: 'bank-transfer', label: 'Bank Transfer' },
          ] as const).map((method) => (
            <label
              key={method.value}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-md border px-4 py-3 text-sm font-medium transition-colors',
                watch('paymentMethod') === method.value
                  ? 'border-gold bg-gold/10 text-forest'
                  : 'border-border text-muted-foreground hover:border-gold/50'
              )}
            >
              <input
                type="radio"
                value={method.value}
                className="sr-only"
                {...register('paymentMethod')}
              />
              {method.label}
            </label>
          ))}
        </div>
      </div>

      {/* Anonymous */}
      <label className="flex items-center gap-3 text-sm text-muted-foreground">
        <input type="checkbox" className="size-4 rounded border-border" {...register('isAnonymous')} />
        Keep my donation anonymous
      </label>

      {/* Note */}
      <div>
        <label htmlFor="note" className="label">Note (optional)</label>
        <textarea id="note" className="textarea" placeholder="Tell us how you'd like your gift used..." {...register('note')} />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Processing...
          </>
        ) : (
          `Give ${formatCurrency(amount)} ${frequency === 'monthly' ? '/ month' : ''}`
        )}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Your gift is stewarded through our audit and stewardship team. No payment credentials are stored on this site.
      </p>
    </form>
  );
}