/**
 * Injeta um bloco de structured data (JSON-LD) na página.
 * Server component — apenas serializa o objeto num <script>.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
