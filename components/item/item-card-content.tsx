import { useEffect, useRef } from "react";
import { CardContent } from "../ui/card";
import ItemContainer from "./item-container";

type ItemCardContentProps = {
  spaceX: any;
  loading: boolean;
  fetchNextPage: () => void;
}
export default function ItemCardContent({ spaceX, loading, fetchNextPage }: ItemCardContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const { current } = contentRef;
    if (!current) {
      return;
    }
    if (current.scrollTop + current.clientHeight >= current.scrollHeight) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const { current } = contentRef;
    if (current) {
      current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (current) {
        current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); 
  
  if (spaceX.length > 0) {
    return (
      <CardContent ref={contentRef} className="max-h-96 overflow-y-auto">
        {
          spaceX.map((launch: any, key: any) => {
            return (
              <ItemContainer key={key} launch={launch} loading={loading} />
            )
          })
        }
      </CardContent>
    )
  } else {
    return (
      <CardContent className="max-h-96 text-center align-center justify-center">
        <h3 className="text-lg">No data found</h3>
      </CardContent>
    )
  }
  
}
