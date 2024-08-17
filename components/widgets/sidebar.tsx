import Link from "next/link";
import { Button } from "@/components/ui/button";

const defaultItems = [
  { path: "/", name: "Overview" },
  { path: "/bids", name: "Bids" },
];

const Item = ({
  item,
}: {
  item: {
    path: string;
    name: string;
  };
}) => {
  return (
    <Link href={item.path} className="">
      <Button className="w-20">{item.name}</Button>
    </Link>
  );
};

export const Sidebar = () => {
  return (
    <aside className="h-screen flex sticky border-r pr-4 top-0 ml-4 pb-4 items-center justify-between">
      <nav className="flex flex-col gap-1">
        {defaultItems.map((item, i) => (
          <Item item={item} key={i} />
        ))}
      </nav>
    </aside>
  );
};
