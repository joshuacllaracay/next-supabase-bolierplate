'use client';

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} YTrimmer. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
