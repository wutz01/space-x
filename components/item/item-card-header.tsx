import { useCallback, useEffect, useState } from "react";
import { CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import debounce from 'lodash/debounce';

type ItemCardHeaderProps = {
  onSearch: (search: string) => void;
}
export default function ItemCardHeader({ onSearch }: ItemCardHeaderProps) {
  const [search, setSearch] = useState('');

  const debouncedOnSearch = useCallback(debounce((search: string) => {
    onSearch(search);
  }, 500), [onSearch]);

  useEffect(() => {
    debouncedOnSearch(search);
    return () => {
      debouncedOnSearch.cancel();
    };
  }, [search]);

  return (
    <CardHeader>
      <CardTitle>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter Keywords"/>
      </CardTitle>
    </CardHeader>
  )
}
