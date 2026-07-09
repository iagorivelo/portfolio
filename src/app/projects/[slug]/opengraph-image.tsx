import { ImageResponse } from "next/og";
import { getProjectBySlug, projects } from "@/lib/portfolio-data";

export const alt = "Projeto — Iago Rivelo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.name }));
}

const BG = "#0d1117";
const FG = "#f2f4f7";
const MUTED = "#97a1b0";
const LIME = "#bef264";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(190,242,100,0.14), transparent), radial-gradient(ellipse 60% 40% at 90% 110%, rgba(150,120,255,0.12), transparent)`,
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: LIME,
            fontSize: 28,
          }}
        >
          <span>{"// iago.dev"}</span>
          <span style={{ color: MUTED }}>{project?.type ?? "projeto"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, color: FG, fontWeight: 700, letterSpacing: -2 }}>
            {project?.title ?? "Projeto"}
          </div>
          <div
            style={{
              fontSize: 32,
              color: MUTED,
              marginTop: 16,
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            {project?.description ?? ""}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {(project?.stack ?? []).slice(0, 6).map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                fontSize: 24,
                color: FG,
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 10,
                padding: "8px 18px",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
