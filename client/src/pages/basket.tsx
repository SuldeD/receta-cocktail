import Layout from "@/component/Layout";
import { Section } from "@/component/motionScroll/MotionScroll";
import { Button, Checkbox } from "@chakra-ui/react";
import { HiOutlineCreditCard } from "react-icons/hi";
import { SlPaypal } from "react-icons/sl";
import { Calendar } from "primereact/calendar";
import { useState } from "react";

export default function Basket() {
  const [date, setDate] = useState<any>();
  const [cardCheck, setCard] = useState<any>();
  const [ppCheck, setPP] = useState<any>();

  return (
    <Layout>
      <Section>
        <div className="block p-[40px] md:flex min-h-[80vh] Container py-[40px]">
          <div className="md:w-[68%] py-[30px]">
            <div className="text-[28px] font-bold text-[#000] pb-[30px]">
              Shopping Cart.
            </div>
            <div>data table</div>
          </div>
          <div className="md:w-[32%] py-[30px] px-[20px] bg-[#f7f7f7] rounded-[4px]">
            <div className="text-[26px] font-bold text-[#000] pb-[30px]">
              Your almost there!
            </div>
            <div>
              <p className="text-[14px] text-[#a3a3a3]">Payment Method</p>
              <div className="pt-[10px] pb-[5px]">
                <Checkbox
                  defaultChecked
                  isChecked={cardCheck}
                  onChange={(e: any) => {
                    setPP(false);
                    setCard(e.target.checked);
                  }}
                >
                  <div className="flex ps-[8px]">
                    <HiOutlineCreditCard className="mt-[2px] w-[18px] h-[18px]" />
                    <p className="ms-[6px] text-[14px]">Credit Card</p>
                  </div>
                </Checkbox>
              </div>
              <Checkbox
                isChecked={ppCheck}
                onChange={(e: any) => {
                  setCard(false);
                  setPP(e.target.checked);
                }}
              >
                <div className="flex ps-[8px]">
                  <SlPaypal className="mt-[4px] w-[18px] h-[14px]" />
                  <p className="ms-[6px] text-[14px]">Paypal</p>
                </div>
              </Checkbox>
            </div>
            <div className="pt-[35px]">
              <p className="text-[14px] text-[#a3a3a3]">Name on Card</p>
              <p className="text-[14px] pt-[8px]">{"Mr Leo"}</p>
            </div>
            <div className="pt-[35px]">
              <p className="text-[14px] text-[#a3a3a3]">Card Number</p>
              <p className="text-[14px] pt-[8px]">{"**** **** **** 2153"}</p>
            </div>
            <div className="pt-[35px] w-[90%]">
              <div className=" flex justify-between">
                <p className="text-[14px] text-[#a3a3a3]">Expiration Date:</p>
                <p className="text-[14px] text-[#a3a3a3]">cvv:</p>
              </div>
              <div className="flex w-full justify-between ">
                <Calendar
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  view="month"
                  dateFormat="mm/yy"
                  className="text-[14px] pt-[8px]"
                  inputStyle={{ height: "35px" }}
                  //   disabled
                />
                <p className="text-[14px] pt-[12px]">{"153"}</p>
              </div>
            </div>
            <Button
              colorScheme="blue"
              className="w-full rounded-[0px] border-none font-semibold mt-[35px]"
            >
              Check Out
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
