import { Carousel, CarouselContent, CarouselDotButton, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "@/components/ui/image";
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
        width={800}
        height={800}
      />
    </div>
  ) : (
    <Carousel>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              src={image}
              alt="위스키 이미지"
              width={800}
              height={800}
              quality={100}
              className="aspect-square h-full object-cover"
              placeholder="blur"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute" />
      <CarouselNext />
      <CarouselDotButton className="absolute bottom-4 right-4" />
    </Carousel>
  );
}

export default NoteImage;