import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function YTrimmer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Trim YouTube Videos with Ease
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            YTrimmer lets you extract and download specific portions of YouTube videos.
            Simply paste your video link, set the start and end times, and get your
            perfectly trimmed video in seconds.
          </p>
          <div className="mt-10">
            <a
              href="#"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Get Started
            </a>
          </div>
          
          <div className="mt-16 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="mb-2 text-xl font-medium">1. Paste Link</div>
                <p className="text-muted-foreground">Enter your YouTube video URL</p>
              </div>
              <div>
                <div className="mb-2 text-xl font-medium">2. Set Times</div>
                <p className="text-muted-foreground">Choose start and end timestamps</p>
              </div>
              <div>
                <div className="mb-2 text-xl font-medium">3. Download</div>
                <p className="text-muted-foreground">Get your trimmed video instantly</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
