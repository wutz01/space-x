"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import ItemCardHeader from "./item-card-header";
import ItemCardContent from "./item-card-content";

const getSpaceXlaunches = async (search: string, page: number) => {

  const queryBody: any = {
    options:{
      limit: 10,
      page
    }
   }

  if (search.trim()) {
    queryBody.query = {
      "$text": {
        "$search": search
      }
    };
  }
  const response = await fetch('https://api.spacexdata.com/v4/launches/query', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody)
  })
  return response.json();
}

export default function ItemCard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [tempQuery, setTempQuery] = useState('');

  useEffect(() => {
    // This useEffect will trigger the data fetch when page changes.
    setSpaceXlaunchesData(tempQuery, page);
  }, [page, tempQuery]);

  const setSpaceXlaunchesData = async (search: string, currentPage: number) => {
    setLoading(true);
    const data: any = await getSpaceXlaunches(search, currentPage)
    const mappedData = data.docs.map((d: any) => {
      return {
        imgSrc: d.links.patch.small,
        name: d.name,
        flightNumber: d.flight_number,
        dateLaunch: d.date_utc,
        description: d.details
      }
    })

    setList((prevList) => {
      return page > 1 ? [...prevList, ...mappedData] : mappedData;
    });
    setLoading(false);
  }

  const nextPage = () => {
    setPage((prev) => prev+1);
  };

  const resetFilter = async (search: string) => {
    setTempQuery(search);
    setPage(1);
  }

  return (
    <Card className="w-1/2 shadow-lg">
      <ItemCardHeader onSearch={resetFilter} />
      <ItemCardContent spaceX={list} loading={loading} fetchNextPage={nextPage} />
    </Card>
  );
}
