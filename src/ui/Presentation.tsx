'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from '@/components/ui/carousel'
import Image from 'next/image'

interface Image {
    src: string;
    alt: string;
}

interface Props {
    images: Image[];
}

const Presentation = ({ images }: Props) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div id="presentation" className="w-full h-full flex flex-col items-center justify-center">
            <Carousel className="w-full max-w-1/2"
                opts={{
                    align: "start",
                    loop: true,
                }}
                setApi={setApi}
            >
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="justify-center items-center">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={800}
                                    height={450}
                                    className="aspect-video object-cover mx-auto rounded-md"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <div className="text-lg text-black text-center text-muted-foreground pt-2">
                Slide {current} of {count}
            </div>
        </div>
    )
}

export default Presentation