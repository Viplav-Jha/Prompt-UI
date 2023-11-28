"use client";

import { useUser } from "@clerk/nextjs";
import { styles } from "../utils/style";
import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {};

const Page = (props: Props) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [shopData, setShopDate] = useState({
    name: "",
    description: "",
    shopProductsType: "",
    avatar: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (user) {
      const data = {
        name: shopData.name,
        description: shopData.description,
        shopProductType: shopData.shopProductsType,
        avatar: user?.imageUrl || "",
        userId: user?.id,
      };
      //send on post request

      await axios
        .post("/api/create-shop", data)
        .then((res) => {
          setLoading(false);
          toast.success("Shop created successfully!");
          setShopDate({
            name: "",
            description: "",
            shopProductsType: "",
            avatar: "",
          });
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data);
          setShopDate({
            name: "",
            description: "",
            shopProductsType: "",
            avatar: "",
          });
        });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <div>
        <h1 className={`${styles.heading} text-center font-Monserrat`}>
          Start to selling with us
        </h1>
        <form
          className="2xl:w-[40%] xl:w-[50%] md:w-[70%] w-[90%] m-auto "
          onSubmit={handleSubmit}
        >
          <div className="w-full my-5">
            <label className={`${styles.label} mb-2 block`}>Shop Name</label>
            <Input
              isRequired
              type="name"
              value={shopData.name}
              onChange={(e) =>
                setShopDate({ ...shopData, name: e.target.value })
              }
              label="AIShop"
              variant="bordered"
            />
          </div>

          <div className="w-full my-5">
            <label className={`${styles.label} mb-2 block`}>
              Shop Description (Max 120 letters)
            </label>
            <Input
              isRequired
              type="text"
              label="lorem ipsum"
              size="sm"
              value={shopData.description}
              onChange={(e) =>
                setShopDate({ ...shopData, description: e.target.value })
              }
              variant="bordered"
              maxLength={120}
            />
          </div>
          <div className="w-full my-5">
            <label className={`${styles.label}`}>
              What you wanna sale with us ?
            </label>
            <Textarea
              variant="bordered"
              value={shopData.shopProductsType}
              onChange={(e) =>
                setShopDate({ ...shopData, shopProductsType: e.target.value })
              }
              required
              placeholder="Chatgpt, Midjoureney prompts"
              className="col-span-12 md:col-span-6 md:mb-0"
            />
            <br />
            <Button
              className="mb-3 w-full bg-transparent h-[45px] border border-[#16c252]
                       text-[#16c252] hover:bg-[#16c252] hover:text-black duration-300 transition-opacity font-Inter font-[600]
                       "
              type="submit"
              disabled={loading}
              disableAnimation={loading}
            >
              Create Shop
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
