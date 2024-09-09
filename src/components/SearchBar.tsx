import React, { useState, useCallback, useEffect } from 'react'
import { Input, InputGroup } from '@chakra-ui/react'
import { debounce } from 'lodash'

type SearchBarProps = {
  onSearch: (query: string) => void
}

const DEBOUNCE_TIME = 300

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  const debouncedSearch = useCallback(
    debounce((q: string) => {
      onSearch(q)
    }, DEBOUNCE_TIME),
    [onSearch, DEBOUNCE_TIME]
  )

  useEffect(() => {
    debouncedSearch(query)

    return () => {
      debouncedSearch.cancel()
    }
  }, [query, debouncedSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <InputGroup size="lg">
      <Input
        placeholder="Type something to search news..."
        value={query}
        onChange={handleInputChange}
      />
    </InputGroup>
  )
}

export default SearchBar
