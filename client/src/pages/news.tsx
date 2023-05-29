import Header from "@/component/Header";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/component/motionScroll/MotionScroll";
import { NewsType } from "@/util/Types";
import { GetStaticProps } from "next";
import axios from "axios";
import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export default function Shop({
  newsData,
}: {
  newsData: NewsType[];
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedData, setSelectedData] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div>
        <Header />
        <Section>
          <div className="relative Container">
            <div className="w-full Container flex flex-wrap card-container relative">
              {newsData
                .map((item: NewsType, index: number) => (
                  <motion.div
                    layoutId={item._id}
                    key={index}
                    onClick={() => {
                      !selectedData && setSelectedData(item);
                      onOpen();
                    }}
                    className="card"
                  >
                    <motion.div className="news-card-container">
                      <Image
                        className="motion-card-image"
                        src={item.image_url}
                        fill={true}
                        alt={`${item.name} image`}
                      />
                    </motion.div>
                    <div className="flex flex-col justify-end h-full p-8">
                      <motion.h2 className="font-normal text-[16px] news-category ">
                        {item.category}
                      </motion.h2>
                      <motion.h5 className="text-lg font-bold text-[24px] news-title z-10 py-">
                        {item.title}
                      </motion.h5>
                    </div>
                  </motion.div>
                ))
                .reverse()}
            </div>
            <Modal
              isOpen={isOpen}
              onClose={() => {
                onClose(), setSelectedData(null);
              }}
              size={"5xl"}
              isCentered
            >
              <ModalOverlay backdropFilter="blur(3px)" />
              <ModalContent className="">
                <ModalHeader className="text-[#0f342d]">
                  receta news
                </ModalHeader>
                <ModalCloseButton onClick={onClose} />
                <ModalBody className="mb-5">
                  {selectedData && (
                    <motion.div>
                      <Image
                        src={selectedData.image_url}
                        alt={`${selectedData.name} image`}
                        width={1000}
                        height={1000}
                        className="object-cover w-[100%] max-h-[500px]"
                      />
                      <motion.div>
                        <motion.h3 className="text-[24px] font-bold selected-title">
                          {selectedData.name}
                        </motion.h3>
                        <motion.p className="selected-desc">
                          {selectedData.description}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </Section>
      </div>
    </>
  );
}

interface Props {
  newsData: NewsType[];
}
export const getStaticProps: GetStaticProps<Props> = async () => {
  const newsData = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/news/all`)
    .then((res) => res.data);

  return {
    props: {
      newsData: newsData,
    },
  };
};
