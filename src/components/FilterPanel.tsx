import { VStack, Select, Heading } from '@chakra-ui/react'

type FilterPanelProps = {
  filters: {
    date: string
    category: string
    source: string
  }
  onFilterChange: (filters: {
    date: string
    category: string
    source: string
  }) => void
}

const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const handleFilterChange = (filterType: string, value: string) => {
    onFilterChange({ ...filters, [filterType]: value })
  }

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h2" size="md">
        Filters
      </Heading>

      <Select
        placeholder="Select date"
        value={filters.date}
        onChange={(e) => handleFilterChange('date', e.target.value)}
      >
        <option value="today">Today</option>
        <option value="this_week">This Week</option>
        <option value="this_month">This Month</option>
      </Select>

      <Select
        placeholder="Select category"
        value={filters.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
        <option value="entertainment">Entertainment</option>
      </Select>

      <Select
        placeholder="Select source"
        value={filters.source}
        onChange={(e) => handleFilterChange('source', e.target.value)}
      >
        <option value="all">All Sources</option>
        <option value="newsapi">NewsAPI</option>
        <option value="guardian">The Guardian</option>
        <option value="nytimes">The New York Times</option>
      </Select>
    </VStack>
  )
}

export default FilterPanel
