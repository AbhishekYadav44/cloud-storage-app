import Header from "@/components/ui/drive/header";
import Sidebar from "@/components/ui/drive/sidebar";

export default function Drive() {
  return (
    <div className="flex flex-col min-h-screen">

      <Header />

      <div className="flex flex-1">

        <aside className="w-64 border-r">
          <Sidebar/>
        </aside>

        <main className="flex-1">
         
        </main>

      </div>

    </div>
  );
}