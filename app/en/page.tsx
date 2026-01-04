import Container from "@/components/common/container";

export default function HomeEn() {
  return (
    <div>
      <section className="py-20">
        <Container>
          <p className="text-sm text-muted">Technical Service Company • Georgia</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
            Engineering-grade systems for fire safety, HVAC, electrical and automation.
          </h1>
          <p className="mt-5 max-w-2xl text-muted text-lg leading-relaxed">
            Design, installation, integration and maintenance for residential and commercial buildings —
            delivered with real engineering discipline.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full px-5 py-2.5 bg-accent text-bg font-medium">
              Request a Quote
            </button>
            <button className="rounded-full px-5 py-2.5 border border-border text-text hover:bg-surface transition">
              View Portfolio
            </button>
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border">
        <Container>
          <h2 className="text-2xl font-semibold">Services</h2>
          <p className="mt-2 text-muted max-w-2xl">
            Core technical services delivered by experienced engineers and field teams.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Fire Systems", "HVAC", "Electrical", "Automation", "CCTV & Security", "Maintenance"].map((x) => (
              <div key={x} className="rounded-2xl border border-border bg-surface p-6">
                <p className="font-medium">{x}</p>
                <p className="mt-2 text-sm text-muted">
                  Short description placeholder — we’ll replace with real copy from the old admin panel.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}