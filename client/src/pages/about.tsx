import Layout from "../component/Layout";
import { Section } from "../component/motionScroll/MotionScroll";

export default function about(): JSX.Element {
  return (
    <Layout>
      <Section>
        <section className="about relative bg-[#121212]">
          <h1 className="about-title absolute top-[300px] text-center w-full">
            About us
          </h1>
          <picture>
            <img
              className="object-cover w-full h-[672px]"
              src="../aboutBgg.webp"
              alt="about"
            />
          </picture>
          <div className="about-div-cont">
            <div className="flex about-div first">
              <div className="about-div-text left">
                In the late 19th and early 20th century, bars went from being
                seedy spots hidden in alleyways to popular gathering spots.
                Bartenders began dressing up to work and following set recipes.
              </div>
              <img
                className="w-[50%] about-div-img"
                src="../aboutBg3.webp"
                alt="about"
              />
            </div>
            <div className="flex about-div">
              <img
                className="w-[50%] about-div-img"
                src="../aboutBg1.webp"
                alt="about"
              />
              <div className="about-div-text right">
                In the late 19th and early 20th century, bars went from being
                seedy spots hidden in alleyways to popular gathering spots.
                Bartenders began dressing up to work and following set recipes.
              </div>
            </div>
          </div>
          <div className="block relative w-full place-items-center ">
            <picture>
              <img
                className="w-[100%] object-cover h-[50vh]"
                src="../aboutBg2.webp"
                alt="about"
              />
            </picture>
            <div className="absolute top-1/2 lg:px-[300px] text-center">
              In the late 19th and early 20th century, bars went from being
              seedy spots hidden in alleyways to popular gathering spots.
              Bartenders began dressing up to work and following set recipes.
            </div>
          </div>
          <div className="Container border-x-[0.5px] border-[#424242] py-[60px] ">
            <div className="w-full flex justify-between relative mb-[60px]">
              <h2 className="about-last-div-title">WE ARE</h2>
              <div className="flex about-last-div-subtitle">
                receta<p className="font-bold">team.</p>
              </div>
              <p className="absolute w-full h-[0.5px] border-b-[0.5px] bottom-6 border-[#424242]" />
            </div>
            <picture>
              <img src="../aboutBg4.webp" alt="bg" />
            </picture>
          </div>{" "}
          <div className="about-last-text">
            <p className="text-white Container">
              Many bartenders teach themselves to mix drinks, or learn on the
              job. Aspiring bartenders have the option of going to bartending
              school to obtain a state-issued license, but few states require
              certification and drink standards vary from bar to bar. The best
              way to become a bartender is through experience. Bartender Kenji
              Magrann-Wells previously told Business Insider that new bartenders
              must get experience before getting into large venues. Many
              bartenders start as waiters or bartending assistants before
              getting a gig themselves. Experience is key, especially when going
              for the giant mega-clubs where the atmosphere is tense and the
              payout is ridiculous, Magrann-Well said. So take the jobs where
              you can get them.
            </p>
          </div>
        </section>
      </Section>
    </Layout>
  );
}
