"use client";

// import { Navbar } from "@/components/navbar";
import React from "react";
import {Button, Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function App() {
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    
    <div >
        
    <div className=" gap-6 grid grid-cols-2 sm:grid-cols-3">
      {list.map((item, index) => (
        <Card
        isFooterBlurred
        radius="lg"
        className="border-none"
      >
          <Image
          alt={item.title}
          className="object-cover"
          height={200}
          src={item.img}
          width={200}
        />
        <CardBody className="px-3 py-3 text-small text-default-400">
        <p className="py-3">
          Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
        </p>
        
      </CardBody>
       
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">Available soon.</p>
          <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
            Notify me
          </Button>
        </CardFooter>
      </Card>
      ))}
    </div>
    </div>
  );
}
