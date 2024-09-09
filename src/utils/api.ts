import axios from 'axios'

const NEWSAPI_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY
const GUARDIAN_KEY = process.env.NEXT_PUBLIC_GUARDIAN_KEY
const NYTIMES_KEY = process.env.NEXT_PUBLIC_NYTIMES_KEY

interface NewsItem {
  id: string
  title: string
  description: string
  imageUrl: string
  source: string
  date: string
  url: string
}

async function fetchNewsAPI(query: string): Promise<NewsItem[]> {
  const response = await axios.get(`https://newsapi.org/v2/everything`, {
    params: {
      q: query,
      // this api doesn't contain any categorys
      apiKey: NEWSAPI_KEY,
    },
  })

  return response.data.articles.map((article: any) => ({
    id: article.url,
    title: article.title,
    description: article.description,
    imageUrl: article.urlToImage,
    source: article.source.name,
    date: article.publishedAt,
    url: article.url,
  }))
}

async function fetchGuardian(
  query: string,
  section: string
): Promise<NewsItem[]> {
  const response = await axios.get(`https://content.guardianapis.com/search`, {
    params: {
      q: query,
      section: section,
      'api-key': GUARDIAN_KEY,
      'show-fields': 'thumbnail,trailText',
    },
  })

  return response.data.response.results.map((article: any) => ({
    id: article.id,
    title: article.webTitle,
    description: article.fields.trailText,
    imageUrl: article.fields.thumbnail,
    source: 'The Guardian',
    date: article.webPublicationDate,
    url: article.webUrl,
  }))
}

async function fetchNYTimes(
  query: string,
  section: string
): Promise<NewsItem[]> {
  const response = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    {
      params: {
        q: query,
        fq: section ? `news_desk:("${section}")` : '',
        'api-key': NYTIMES_KEY,
      },
    }
  )

  return response.data.response.docs.map((article: any) => ({
    id: article._id,
    title: article.headline.main,
    description: article.abstract || article.lead_paragraph,
    imageUrl:
      article.multimedia.length > 0
        ? `https://www.nytimes.com/${article.multimedia[0].url}`
        : null,
    source: 'The New York Times',
    date: article.pub_date,
    url: article.web_url,
  }))
}

export async function fetchNews(
  query: string,
  filters: { category: string; source: string }
): Promise<NewsItem[]> {
  let results: NewsItem[] = []

  if (filters.source === 'all' || filters.source === 'newsapi') {
    const newsApiResults = await fetchNewsAPI(query)
    results = [...results, ...newsApiResults]
  }

  if (filters.source === 'all' || filters.source === 'guardian') {
    const guardianResults = await fetchGuardian(query, filters.category)
    results = [...results, ...guardianResults]
  }

  if (filters.source === 'all' || filters.source === 'nytimes') {
    const nyTimesResults = await fetchNYTimes(query, filters.category)
    results = [...results, ...nyTimesResults]
  }

  // Sort results by date
  results.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return results
}
