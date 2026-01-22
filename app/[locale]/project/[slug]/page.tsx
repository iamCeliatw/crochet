import { notFound } from "next/navigation";
import { projects } from "@/data/project";
import { generateProjectMetadata, generateStructuredData } from "@/lib/seo";
import ProjectDetailPage from "@/components/ProjectDetailPage";
import Header from "@/components/Header";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  
  for (const project of projects) {
    for (const locale of ["zh-TW", "en", "ja"]) {
      params.push({ locale, slug: project.slug });
    }
  }
  
  return params;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    return {};
  }
  
  return generateProjectMetadata(project, locale);
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const structuredData = generateStructuredData(project, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <ProjectDetailPage project={project} />
    </>
  );
}

