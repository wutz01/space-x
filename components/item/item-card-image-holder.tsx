import { Skeleton } from "../ui/skeleton";
import Image from 'next/image';

type ItemCardImageHolderProps = {
  imageSrc: string
}

export default function ItemCardImageHolder({ imageSrc }: ItemCardImageHolderProps) {
  if (imageSrc) {
    return (
      <div className="border p-5 w-24 h-24 rounded-md overflow-hidden flex justify-center items-center">
        <Image src={imageSrc} alt="image" width={96} height={96} className="object-cover" />
      </div>
    )
  } else {
    return (
      <Skeleton className="h-12 w-12 rounded-full" />
    )
  }
}
