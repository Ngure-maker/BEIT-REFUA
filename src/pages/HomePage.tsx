import { useSEO } from '@/hooks/useSEO';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { WholePersonHealing } from '@/components/sections/home/WholePersonHealing';
import { MissionSection } from '@/components/sections/home/MissionSection';
import { HealthcarePreview } from '@/components/sections/home/HealthcarePreview';
import { ProgramsPreview } from '@/components/sections/home/ProgramsPreview';
import { ImpactSection } from '@/components/sections/home/ImpactSection';
import { FinalCTA } from '@/components/sections/home/FinalCTA';

export function HomePage() {
  useSEO({
    title: 'Beit-Refuah | Healing People, Restoring Hope in Kenya',
    description: 'Beit-Refuah offers Christ-centered healthcare, discipleship and practical support for vulnerable communities in Kakamega County, Western Kenya.',
    url: '/',
  });

  return (
    <>
      <HeroSection />
      <WholePersonHealing />
      <MissionSection />
      <HealthcarePreview />
      <ProgramsPreview />
      <ImpactSection />
      <FinalCTA />
    </>
  );
}