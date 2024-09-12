import { Navbar } from "@/components/navbar";


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div>
    <section className="flex flex-col items-center justify-center">
       {/* <Navbar /> */}
      <div className="inline-block">
        {children}
      </div>
      
    </section>
    </div>
  );
}
