import Container from "@/components/common/container";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-10 text-sm text-muted">
        <div className="flex flex-col gap-2">
          <p className="text-text font-medium">Technical Service Company</p>
          <p>Engineering • Fire Systems • HVAC • Electrical • Automation</p>
          <p className="text-muted">© {new Date().getFullYear()} technicalservice.ge</p>
        </div>
      </Container>
    </footer>
  );
}