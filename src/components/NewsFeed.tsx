import { useEffect, useState } from 'react'
import { VStack, Box, Heading, Text, Image, Link } from '@chakra-ui/react'
import { fetchNews } from '../utils/api'

type NewsItem = {
  id: string
  title: string
  description: string
  imageUrl: string
  source: string
  date: string
  url: string
}

type NewsFeedProps = {
  searchQuery: string
  filters: {
    date: string
    category: string
    source: string
  }
}

const NewsFeed = ({ searchQuery, filters }: NewsFeedProps) => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNewsData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const results = await fetchNews(searchQuery, filters)
        setNews(results)
      } catch (err) {
        setError('Failed to fetch news. Please try again later.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (searchQuery.length > 0) fetchNewsData()
  }, [searchQuery, filters])

  if (isLoading) {
    return <Box>Loading...</Box>
  }

  if (error) {
    return <Box color="red.500">{error}</Box>
  }

  if (news?.length === 0 && !isLoading && searchQuery?.length > 1)
    return (
      <Box>
        <Text mb={4}>No search result found...</Text>
      </Box>
    )

  return (
    <VStack spacing={8} align="stretch">
      {news.map((item) => (
        <Box key={item.id} borderWidth={1} borderRadius="lg" overflow="hidden">
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt={item.title}
              objectFit="cover"
              height="200px"
              width="100%"
            />
          )}
          <Box p={6}>
            <Heading as="h3" size="md" mb={2}>
              <Link href={item.url} isExternal>
                {item.title}
              </Link>
            </Heading>

            <Text mb={4}>{item.description}</Text>

            <Text fontSize="sm" color="gray.500">
              {item.source} - {new Date(item.date).toLocaleDateString()}
            </Text>
          </Box>
        </Box>
      ))}
    </VStack>
  )
}

export default NewsFeed
