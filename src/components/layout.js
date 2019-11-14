import Header from "./header";
import Footer from "./footer";
import "../style.css";

function Layout(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto p-4 md:px-8 md:py-16 w-full">
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
