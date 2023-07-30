import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import graphqlRequestClient from "@/lib/graphql.request";
import { useCollectionsQuery } from "../../../generated/graphql";
import { useRouter } from "next/router";

export function Categories() {
  const { data } = useCollectionsQuery(graphqlRequestClient);

  const router = useRouter();

  return (
    <div className="flex flex-row justify-center w-full mt-12 mb-14">
      <Swiper
        style={{
          padding: "20px",
          paddingRight: "10px",
        }}
        slidesPerView={"auto"}
        pagination={{
          clickable: true,
        }}
      >
        {data?.collections.items.map((item, index) => (
          <SwiperSlide key={index} className="!w-auto last:mr-0 mr-10">
            <div
              onClick={() =>
                router.push({
                  pathname: "/busca",
                  query: {
                    ...router.query,
                    cat: item.slug,
                  },
                })
              }
              className="flex capitalize cursor-pointer hover:scale-105 transition-transform flex-col items-center justify-center gap-2 min-h-[40px] h-full w-full min-w-[122px] max-w-[122px] py-2 shadow-categories rounded-md"
            >
              <Image
                width={50}
                height={50}
                src={item.featuredAsset?.source || "/packaging.png"}
                alt="category icon"
              />
              <span className="text-secondary text-center">{item.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
