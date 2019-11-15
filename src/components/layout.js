import Header from "./header";
import Footer from "./footer";
import "../style.css";

function Layout(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-gray-100 flex-1 mx-auto p-4 md:px-8 md:py-16 w-full">
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
