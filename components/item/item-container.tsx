import Image from "next/image"
import { ItemSkeleton } from "./item-skeleton"
import ItemCardImageHolder from "./item-card-image-holder"

type ItemContainerProps = {
  loading: boolean,
  launch: {
    imgSrc: string,
    flightNumber: number,
    dateLaunch: string,
    name: string,
    description: string
  }
}

export default function ItemContainer({ loading, launch }: ItemContainerProps) {
  if (loading) {
    return <ItemSkeleton />  
  } else {
    return (
      <div className="flex items-center space-x-4 my-2">
        <ItemCardImageHolder imageSrc={launch.imgSrc} />
        <div className="my-2">
          <p className="text-lg font-bold">{launch.flightNumber}: {launch.name} ({new Date(launch.dateLaunch).getFullYear()})</p>
          <p className="text-slate-500 mt-0">Details: {launch.description}</p>
        </div>
      </div>
    )
  }
}
