import Image from "next/image";

import heroImage from "../../public/hero.webp";

export default function Hero() {
  return (
    <section>
      <div className="container mx-auto grid items-center gap-8 px-4 md:grid-cols-2">
        <div className="flex flex-col space-y-8">
          <h1 className="text-4xl font-bold">
            위스키 리뷰 커뮤니티 <br/>
            <span
              className="from-primary to-secondary bg-gradient-to-r bg-clip-text font-bold text-transparent"
            >
              SULVIEW
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            <span className="font-bold">테이스팅 노트</span>를 작성하고 다른 사용자들과 공유해보세요.
          </p>
        </div>
        <Image
          src={heroImage}
          width={400}
          height={400}
          alt="Hero Image"
          className="order-first rounded-md object-cover md:order-last"
          priority
        />
      </div>
    </section>
  );
}