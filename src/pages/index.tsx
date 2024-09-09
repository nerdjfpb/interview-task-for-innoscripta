import { useState } from 'react'
import { Box, Container, Heading, VStack } from '@chakra-ui/react'
import SearchBar from '../components/SearchBar'
import NewsFeed from '../components/NewsFeed'
import FilterPanel from '../components/FilterPanel'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    date: 'today',
    category: 'business',
    source: 'all',
  })

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Demo News Searching for innoscripta
        </Heading>

        <SearchBar onSearch={setSearchQuery} />

        <Box display={{ md: 'flex' }}>
          <Box flexBasis={{ md: '25%' }} mr={{ md: 8 }} mb={8}>
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </Box>

          <Box flexBasis={{ md: '75%' }}>
            <NewsFeed searchQuery={searchQuery} filters={filters} />
          </Box>
        </Box>
      </VStack>
    </Container>
  )
}

export default App
