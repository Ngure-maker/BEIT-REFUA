import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { storiesContent } from '@/data/stories';
import { useSiteContent } from '@/data/SiteContentContext';
import { formatDate } from '@/utils/format';
import { cn } from '@/utils/cn';

export function StoriesPage() {
  useSEO({
    title: 'Stories | Beit-Refuah',
    description: 'Stories of healing, hope and transformation from Beit-Refuah in Western Kenya.',
    url: '/stories',
  });

  const { content } = useSiteContent();
  const { hero, featuredStory, stories } = storiesContent;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(stories.map((s) => s.category)))];

  const filteredStories = activeCategory === 'All'
    ? stories
    : stories.filter((s) => s.category === activeCategory);

  return (
    <>
      <PageHero
        eyebrow="Stories"
        title={hero.title}
        description={hero.description}
      />

      {/* Featured Story */}
      {featuredStory && (
        <section className="container-x py-20">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="card grid overflow-hidden lg:grid-cols-2"
          >
            <div className="relative h-64 lg:h-full">
              <img
                src={content.finalCta.image}
                alt={content.finalCta.imageAlt}
                width="1200"
                height="700"
                loading="lazy"
                className="h-full w-full object-contain"
              />
              <span className="absolute left-4 top-4 rounded-sm bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-foreground">
                Featured Story
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="eyebrow text-gold">{featuredStory.category}</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-display text-forest">{featuredStory.title}</h2>
              <p className="mt-4 text-muted-foreground">{featuredStory.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <User className="size-4 text-gold" aria-hidden="true" />
                  {featuredStory.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-4 text-gold" aria-hidden="true" />
                  {formatDate(featuredStory.publishedAt)}
                </span>
              </div>
              <Button to={`/stories/${featuredStory.slug}`} variant="secondary" className="mt-6 self-start">
                Read Full Story
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </motion.article>
        </section>
      )}

      {/* All Stories */}
      <section className="bg-cream">
        <div className="container-x py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-display text-forest">All Stories</h2>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter stories by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                    activeCategory === category
                      ? 'border-forest bg-forest text-forest-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-forest/40'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <Link to={`/stories/${story.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={content.finalCta.image}
                      alt={content.finalCta.imageAlt}
                      width="1000"
                      height="700"
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="eyebrow text-[0.65rem] text-gold">{story.category}</p>
                    <h3 className="mt-2 text-lg font-display text-forest">{story.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{story.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="size-3.5 text-gold" aria-hidden="true" />
                        {story.author}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-gold" aria-hidden="true" />
                        {formatDate(story.publishedAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}