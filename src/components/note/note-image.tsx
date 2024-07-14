import Image from "next/image";

import { Carousel, CarouselContent, CarouselDotButton, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Note } from "@/types/entity/note";

interface NoteImageProps {
  images: Note["images"];
}

function NoteImage({ images }: NoteImageProps) {
  return images.length === 0 ? (
    <div className="size-full">
      <Image
        src="/whisky-placeholder.png"
        alt="빈 위스키 이미지"
        width={400}
        height={400}
      />
    </div>
  ) : (
    <Carousel>
      <CarouselPrevious className="absolute" />
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              src={image}
              alt="위스키 이미지"
              width={400}
              height={400}
              className="aspect-auto size-auto rounded-l-sm object-contain"
              placeholder="blur"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselDotButton className="absolute bottom-4 right-4" />
    </Carousel>
  );
}

export default NoteImage;