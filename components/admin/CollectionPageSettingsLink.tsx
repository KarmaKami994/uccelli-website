import type { BeforeListServerProps } from "payload";

const settingsByCollection: Record<string, { href: string; label: string }> = {
  projects: {
    href: "/admin/globals/projects-page",
    label: "Projektseite einstellen",
  },
  "community-items": {
    href: "/admin/globals/community-page",
    label: "Community-Seite einstellen",
  },
};

export default function CollectionPageSettingsLink({
  collectionSlug,
}: BeforeListServerProps) {
  const settings = settingsByCollection[collectionSlug];

  if (!settings) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "1rem",
      }}
    >
      <a
        href={settings.href}
        style={{
          alignItems: "center",
          border: "1px solid var(--theme-elevation-250)",
          borderRadius: "4px",
          color: "var(--theme-text)",
          display: "inline-flex",
          fontSize: "13px",
          fontWeight: 600,
          gap: "0.45rem",
          padding: "0.65rem 0.85rem",
          textDecoration: "none",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "17px", lineHeight: 1 }}>
          ⚙
        </span>
        {settings.label}
      </a>
    </div>
  );
}
