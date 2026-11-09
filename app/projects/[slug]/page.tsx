import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, MapPin, Calendar, Maximize2, Clock, User } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { projectsData } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — ${project.location}`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Related projects
  const related = projectsData.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#08080a] text-[#fafafa]">
      <Navbar />

      {/* Hero Cover Banner */}
      <section className="relative w-full h-[70vh] min-h-[550px] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/40 to-black/60" />

        {/* Back Link */}
        <div className="absolute top-28 left-6 md:left-16 z-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/15 text-xs text-[#fafafa] hover:text-[#c5a880] backdrop-blur-md transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Hero Title Info */}
        <div className="absolute bottom-12 left-0 right-0 z-20">
          <div className="velqon-container space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-[9px] tracking-[0.25em] uppercase rounded-full bg-[#c5a880]/20 border border-[#c5a880]/40 text-[#c5a880]">
                {project.category}
              </span>
              <span className="text-xs text-[#a3a3a3] tracking-widest font-mono">
                {project.location} · {project.year}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#fafafa] tracking-tight">
              {project.title}
            </h1>

            <p className="text-sm md:text-base text-[#d4d4d4] font-light max-w-2xl">
              {project.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Specs Strip */}
      <section className="py-8 bg-[#0c0c10] border-y border-white/[0.08]">
        <div className="velqon-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#737373] uppercase block mb-1">
                Location
              </span>
              <span className="text-[#fafafa] font-light">{project.location}</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#737373] uppercase block mb-1">
                Spatial Footprint
              </span>
              <span className="text-[#fafafa] font-mono">{project.area}</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#737373] uppercase block mb-1">
                Client Profile
              </span>
              <span className="text-[#fafafa] font-light">{project.client}</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#737373] uppercase block mb-1">
                Timeline / Delivery
              </span>
              <span className="text-[#fafafa] font-light">{project.duration}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Concept */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="velqon-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase">
                The Narrative
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#fafafa] leading-snug">
                An architectural dialogue between light, stone, and silence.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm text-[#a3a3a3] font-light leading-relaxed">
              <p>{project.overview}</p>
              <p>{project.concept}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Material Palette Breakdown */}
      <section className="py-20 bg-[#0c0c10] border-b border-white/[0.06]">
        <div className="velqon-container space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.3em] text-[#c5a880] uppercase">
              Materiality & Spec
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#fafafa]">
              Tactile Palette & Finishes
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {project.materials.map((mat) => (
              <div
                key={mat.name}
                className="p-5 bg-[#08080a] border border-white/[0.06] rounded-sm space-y-3"
              >
                <div
                  className="w-full h-12 rounded border border-white/10"
                  style={{ backgroundColor: mat.color }}
                />
                <div>
                  <h4 className="font-serif text-base text-[#fafafa]">{mat.name}</h4>
                  <p className="text-[10px] text-[#737373] uppercase tracking-wider">
                    {mat.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Image Gallery */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="velqon-container space-y-12">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.3em] text-[#737373] uppercase">
              Project Gallery ({project.gallery.length} Plates)
            </span>
            <span className="text-xs text-[#c5a880] tracking-widest font-mono">
              VELQON PHOTOGRAPHIC ARCHIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className={`relative rounded-sm overflow-hidden border border-white/10 shadow-2xl ${
                  i === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[16/11]"
                }`}
              >
                <Image
                  src={img}
                  alt={`${project.title} Plate ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Inquiry Section */}
      <section className="py-24 bg-[#0c0c10] text-center border-b border-white/[0.06]">
        <div className="velqon-container max-w-2xl space-y-6">
          <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase">
            Start Your Commission
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#fafafa]">
            Inspired by {project.title}?
          </h2>
          <p className="text-sm text-[#888888] font-light">
            Contact our principals to discuss architectural requirements, site visits, and conceptual feasibility for your upcoming project.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href={`/contact?project=${encodeURIComponent(project.title)}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#fafafa] text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#c5a880] transition-colors"
            >
              <span>Enquire For Similar Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-24">
        <div className="velqon-container space-y-12">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl md:text-3xl text-[#fafafa]">
              Next In Archive
            </h3>
            <Link
              href="/projects"
              className="text-xs text-[#c5a880] hover:text-[#fafafa] tracking-[0.2em] uppercase transition-colors"
            >
              View All Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/projects/${rel.slug}`}
                className="group block bg-[#0c0c10] border border-white/[0.06] hover:border-[#c5a880]/40 transition-all rounded-sm overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={rel.coverImage}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-2xl text-[#fafafa] group-hover:text-[#c5a880] transition-colors">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-[#737373] tracking-widest font-mono">
                      {rel.location} · {rel.category}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#888888] group-hover:text-[#c5a880]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

