// components/LighthouseArticles.tsx
interface Article {
  title: string;
  link: string;
  snippet: string;
  image?: string;
}

interface LighthouseArticlesProps {
  lighthouseName: string;
}

// Server Component in Next.js 13+
export default async function LighthouseArticles1({ lighthouseName }: LighthouseArticlesProps) {
  if (!lighthouseName) {
    return <p className="p-4">No lighthouse name provided.</p>;
  }

  // Encode the search query
  const query = encodeURIComponent(lighthouseName + " lighthouse in Ireland");

  try {
    // Call Google Custom Search API
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${query}&num=5`,
      { cache: "no-store" } // SSR always fresh
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Google API error: ${text}`);
    }

    const data = await res.json();
    // console.log("Google API response data:", data);

    const articles: Article[] = (data.items || []).map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      image: item.pagemap?.cse_image?.[0]?.src,
    }));

    if (!articles.length) {
      return <p className="p-4">No recent articles found for {lighthouseName}.</p>;
    }

    return (
      <div className="space-y-4">
        {articles.map((a, i) => (
          <div key={i} className="border p-3 rounded-lg shadow-sm flex gap-4">
            {a.image && <img src={a.image} alt="" className="w-24 h-16 object-cover rounded" />}
            <div>
              <a
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                {a.title}
              </a>
              {a.snippet && <p className="text-gray-700 text-sm mt-1">{a.snippet}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  } catch (err: any) {
    return <p className="p-4 text-red-500">Error fetching articles: {err.message}</p>;
  }
}
