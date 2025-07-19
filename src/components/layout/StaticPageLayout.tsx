interface StaticPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function StaticPageLayout({ title, children }: StaticPageLayoutProps) {
  return (
    <div className="bg-white">
      <main className="py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
            <div className="prose lg:prose-xl">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
