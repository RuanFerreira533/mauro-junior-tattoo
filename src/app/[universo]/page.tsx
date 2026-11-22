import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUniverse, universes } from "@/universes";
import { UniverseNav } from "@/components/universe/UniverseNav";
import { Hero } from "@/components/universe/Hero";
import { UniverseGallery } from "@/components/universe/UniverseGallery";
import { Info } from "@/components/universe/Info";
import { Budget } from "@/components/universe/Budget";
import { HubFooter } from "@/components/hub/HubFooter";

type Props = { params: Promise<{ universo: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return universes.map((u) => ({ universo: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = getUniverse((await params).universo);
  return u ? { title: `${u.name} · Mauro Junior`, description: u.description } : {};
}

export default async function UniversePage({ params }: Props) {
  const u = getUniverse((await params).universo);
  if (!u) notFound();
  return (
    <>
      <UniverseNav slug={u.slug} />
      <main id="conteudo" tabIndex={-1}>
        <Hero u={u} />
        <UniverseGallery u={u} />
        <Info u={u} />
        <Budget u={u} />
      </main>
      <HubFooter />
    </>
  );
}
