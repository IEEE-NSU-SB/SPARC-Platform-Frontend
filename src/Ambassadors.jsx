import { useEffect } from 'react';
import StarSky from './StarSky';
import AmbassadorsObj from './AmbassadorsObj';
import PolkaBackground from './PolkaBackground';

import amb1 from '/assets/why-37.jpg';

export default function Ambassadors() {

  const ambassadors = [
    { name: "Nuren Tasnim Risha", university: "American International University - Bangladesh", image: amb1 },
    { name: "MD. Nahiduzzaman", university: "American International University - Bangladesh", image: amb1 },
    { name: "Sanjida Islam Shaila", university: "Ahsanullah University of Science and Technology", image: amb1 },
    { name: "SADAB BIN ZAFAR", university: "Ahsanullah University of Science and Technology", image: amb1 },
    { name: "Jannatul masruk Mukta", university: "Bangladesh University of Business and Technology", image: amb1 },
    { name: "Md. Sadik Mahmud Adive", university: "Bangladesh University of Business and Technology", image: amb1 },
    { name: "Pulak Bhowmik", university: "Chittagong University of Engineering and Technology", image: amb1 },
    { name: "Shah Mohammad Tahsin", university: "Chittagong University of Engineering and Technology", image: amb1 },
    { name: "Arman Hossain", university: "Daffodil International University", image: amb1 },
    { name: "Tanvir Mahamud", university: "Daffodil International University", image: amb1 },
    { name: "Anmona Khan", university: "Dhaka University", image: amb1 },
    { name: "Anika Tabassum Nafisa", university: "East West University", image: amb1 },
    { name: "MD. SHAKIB AL HASAN", university: "East West University", image: amb1 },
    { name: "Md. Abu Rayhan Imran", university: "GREEN UNIVERSITY", image: amb1 },
    { name: "Shahadat Hosen Nishan", university: "GREEN UNIVERSITY", image: amb1 },
    { name: "Mohammad Asaduzzaman", university: "International Islamic University Chittagong", image: amb1 },
    { name: "Masud Talukder Sakil", university: "International Islamic University Chittagong", image: amb1 },
    { name: "Sameer Amin", university: "Independent University", image: amb1 },
    { name: "Rohit Kamble", university: "Jain Institute of Technology (Maharastra, India)", image: amb1 },
    { name: "Vaishnavi Padmakar Kurve", university: "Jain Institute of Technology (Maharastra, India)", image: amb1 },
    { name: "Iftiar Rahman Emon", university: "Jashore University of Sciene and Technology", image: amb1 },
    { name: "Masud Rana", university: "Jashore University of Sciene and Technology", image: amb1 },
    { name: "Muntasir Mohammad", university: "MANARAT INTERNATIONAL UNIVERSITY", image: amb1 },
    { name: "Susmoy Barua", university: "Premier University", image: amb1 },
    { name: "Sawrab Sarker", university: "Southeast University", image: amb1 },
    { name: "Aflatul Kawsar", university: "Stamford University", image: amb1 },
    { name: "Nusrat Jahan", university: "Stamford University", image: amb1 },
    { name: "Yeasir Ramim", university: "United International University", image: amb1 },
    { name: "Md Ashfaqur Rahman", university: "United International University", image: amb1 },
    { name: "Mahir Rahman", university: "University of Asia Pacific", image: amb1 },
    { name: "Golam Moursalin", university: "North South University", image: amb1 },
    { name: "Md REDWAN ISLAM", university: "North South University", image: amb1 },
    { name: "Raisa Juairia", university: "North South University", image: amb1 }
  ];

  useEffect(() => {
    document.title = `Ambassadors · SPARC 2026 · IEEE NSU SB`;
  }, []);

  return (
    <>
      <section style={{minHeight: "50vh"}} className="page-hero" aria-labelledby="page-title">
        <StarSky />
        <div className="in">
          <h1 id="page-title" data-star-avoid>SPARC 2026 Ambassadors</h1>
          <p data-star-avoid>Student Leaders Driving Innovation</p>
        </div>
      </section>
      
      <PolkaBackground as="section" bgColor="#fffafb" dotColorOverride="rgba(185, 14, 44, 0.05)" direction="bottom-right" style={{ padding: "3rem 0" }}>
        <div className="in">
          <AmbassadorsObj
            ambassadors={ambassadors}
          />
        </div>
      </PolkaBackground>
    </>
  );
}
