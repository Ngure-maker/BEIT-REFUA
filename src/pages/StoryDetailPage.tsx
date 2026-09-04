import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { storiesContent } from '@/data/stories';
import { useSiteContent } from '@/data/SiteContentContext';
import { formatDate } from '@/utils/format';

export function StoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { content } = useSiteContent();
  const { stories, featuredStory } = storiesContent;

  const allStories = [featuredStory, ...stories].filter(Boolean);
  const story = allStories.find((s) => s.slug === slug) ?? allStories[0];

  useSEO({
    title: `${story?.title ?? 'Story'} | Beit-Refuah`,
    description: story?.excerpt ?? 'A story of healing and hope from Beit-Refuah.',
    url: `/stories/${slug}`,
    type: 'article',
    publishedTime: story?.publishedAt,
    author: story?.author,
    section: story?.category,
    tags: story?.tags,
  });

  if (!story) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-3xl font-display text-forest">Story not found</h1>
        <p className="mt-4 text-muted-foreground">The story you're looking for doesn't exist.</p>
        <Button to="/stories" variant="secondary" className="mt-8">
          <ArrowLeft aria-hidden="true" />
          Back to Stories
        </Button>
      </div>
    );
  }

  const relatedStories = allStories.filter((s) => s.id !== story.id).slice(0, 3);

  return (
    <>
      {/* Story Header */}
      <section className="bg-forest-deep text-forest-foreground">
        <div className="container-x py-16 md:py-20">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 text-sm text-forest-foreground/70 transition-colors hover:text-gold"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Stories
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <p className="eyebrow text-gold">{story.category}</p>
            <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl font-display">{story.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-forest-foreground/80">
              <span className="inline-flex items-center gap-1.5">
                <User className="size-4 text-gold" aria-hidden="true" />
                {story.author}
                {story.authorRole && ` — ${story.authorRole}`}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4 text-gold" aria-hidden="true" />
                {formatDate(story.publishedAt)}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Image */}
      <section className="container-x py-12">
        <motion.img
          src={content.finalCta.image}
          alt={content.finalCta.imageAlt}
          width="1200"
          height="700"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-h-[28rem] w-full rounded-sm object-contain shadow-lg"
        />
      </section>

      {/* Story Content */}
      <section className="container-x pb-20">
        <div className="mx-auto max-w-3xl">
          <div
            className="prose prose-lg prose-forest max-w-none"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          {/* Tags */}
          {story.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <Tag className="size-4 text-gold" aria-hidden="true" />
              {story.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-cream px-3 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-sm bg-forest p-8 text-center text-forest-foreground">
            <h2 className="text-2xl font-display">Be part of the next story.</h2>
            <p className="mt-3 text-forest-foreground/85">
              Your support helps us continue healing people and restoring hope in Western Kenya.
            </p>
            <Button to="/get-involved#give" variant="primary" className="mt-6">
              Get Involved
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="bg-cream">
          <div className="container-x py-20">
            <h2 className="text-3xl font-display text-forest">Related Stories</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedStories.map((related) => (
                <Link
                  key={related.id}
                  to={`/stories/${related.slug}`}
                  className="card group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={content.finalCta.image}
                      alt={content.finalCta.imageAlt}
                      width="1000"
                      height="700"
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="eyebrow text-[0.65rem] text-gold">{related.category}</p>
                    <h3 className="mt-2 text-base font-display text-forest">{related.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{related.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}