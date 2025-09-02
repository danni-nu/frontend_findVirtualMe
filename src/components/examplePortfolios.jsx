import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

export default function ExamplePortfolios() {
  const location = useLocation();
  const portfolios = [
    {
      title: "Project Manager",
      summary: "Porftolio showcasing Project Manager's Resume",
      location: "/portfolios/project-manager/example/689b833c90c7ecc042b7b2ac",
    },

    {
      title: "Software Engineer",
      summary: "Porftolio showcasing Sofware Engineer's Resume",
    },

    {
      title: "Data Scientist",
      summary: "Porftolio showcasing Data Scientist's Resume",
      location: "/portfolios/data-scientist",
    },

    {
      title: "Local Food Vendor",
      summary: "Porftolio showcasing a Local Food Vendor",
      location: "/portfolios/localVendor",
    },

    {
      title: "Photographer",
      summary: "Porftolio showcasing Photography Portfolio",
      location: "/portfolios/photographer",
    },

    {
      title: "Handyman/Local Repair Services",
      summary: "Porftolio showcasing Handyman and Repair services",
      location: "/portfolios/handyman",
    },
  ];

  const navigate = useNavigate();
  const handleCardClick = (portfolio) => {
    portfolio.location ? navigate(portfolio.location) : toast("Coming Soon!");
  };

  // Determine which portfolios to show based on navigation source
  let displayPortfolios = portfolios;
  if (location.state?.from === "about") {
    displayPortfolios = portfolios.slice(0, 3);
  } else if (location.state?.from === "occupations") {
    displayPortfolios = portfolios.slice(-3);
  }

  return (
    <>
      <main className="min-h-screen bg-slate-50 pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-slate-800">
            Portfolios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {displayPortfolios.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:bg-slate-200 cursor-pointer"
                onClick={() => handleCardClick(p)}
              >
                {/* PortfolioCard content here */}
                <div className="font-semibold text-slate-800 mb-2">
                  {p.title}
                </div>
                <div className="text-slate-600">{p.summary}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
