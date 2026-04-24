import { Suspense } from "react";
import Allmenu from "./_components/Allmenu/Allmenu";
import Ourmenu from "./_components/Ourmenu/Ourmenu";
import Details from "./_components/Details/Details";
import ShopSelector from "./_components/ShopSelector/ShopSelector";

export default function ShopCoffeeBeans() {
  return (
    <>
      <Ourmenu />
      <Suspense fallback={<div>Loading...</div>}>
        <ShopSelector />
      </Suspense>
      <Allmenu />
      <Details />
    </>
  );
}