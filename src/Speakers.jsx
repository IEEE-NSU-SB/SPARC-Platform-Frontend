import { useEffect } from 'react';
import StarSky from './StarSky';
import SpeakersObj from './SpeakersObj';

import a1 from '/assets/why-37.jpg';

export default function Timeline() {
  useEffect(() => {
    document.title = `Speakers · SPARC · IEEE NSU SB`;
  }, []);
  

  const speakersData = [
    {
      name: "Celia",
      title: "Associate Professor",
      image: a1,
      description: `Dr. Nabeel Mohammad is a distinguished academic and researcher with a Bachelor's degree in Computer Science from Monash University, Australia. He began his career as a Software Developer at Editure Ltd., before transitioning into academia to pursue his PhD at Monash University. His doctoral research focused on unsupervised image feature extraction and its applications in content-based image retrieval.
      Dr. Nabeel's current research interests span Computer Vision and Natural Language Processing, with additional expertise in Artificial Intelligence, Robotics, and Signal & Image Processing. He is deeply passionate about industry–academia collaboration and has successfully partnered with organizations such as Apurba Technologies, HeadBlocks, Giga Tech Ltd., and others.
He also leads the Apurba–NSU R&D Lab, which has made significant contributions to AI projects in collaboration with Apurba Technologies—further demonstrating his commitment to bridging the gap between academic research and real-world applications.`
    },
    {
      name: "Dr. Mahmud Abdul Matin Bhuiyan",
      image: a1,
      description: `Dr. Mahmud Abdul Matin Bhuiyan is a distinguished academic, researcher, and institutional leader, currently serving as the Vice-Chancellor of Chittagong University of Engineering & Technology (CUET) and Professor in the Department of Electrical & Electronic Engineering (EEE). Over his academic career, he has held several key leadership positions at CUET, including Head of the Department of EEE, Dean of the Faculty of Electrical & Computer Engineering (ECE), and Director of the Institute`
    },
    {
      name:"MD TOUHIDUR RAHMAN RAD",
      image: a1,
      description: `Md Touhidur Rahman Rad is one of the Youngest Chief Business Officer in Bangladesh, representing a new generation of purpose-driven and innovation-led corporate leadership. He completed both his BSc in IPE and MBA in Finance from Ahsanullah University of Science & Technology (AUST), building a strong academic foundation that combines engineering rigor with strategic business insight.
He is associated with Walton Group for more than 8 years, before that he has worked at MGI. Walton, Bangladesh’s leading technology and manufacturing conglomerate, where he contributes as Senior Executive Director & CBO, leading strategic business growth, product innovation, manufacturing excellence, supply chain ecosystem & sales development. He along with his team has developed locally manufactured laptops, Bangladesh’s first BRTA-approved locally made electric bike, as well as solar energy solutions and IoT-based smart products, supporting national goals of localization, sustainability, and technological self-reliance.
Beyond corporate leadership, Touhid currently serves as an Industry Advisory Member of the Industrial & Production Engineering (IPE) Department at the Military Institute of Science & Technology (MIST), actively contributing to industry–academia collaboration, curriculum relevance, and future workforce development. He is also one of the Fellow of Youth Policy Forum for economical upgradation & Honorary Director of  Nohor Foundation. 
He's been awarded as the Most innovative CBO of Bangladesh 2025 from Global Brands UK. His vision is to position Bangladesh as a global manufacturing and technology hub of Computer, EV & IoT products.`
    },
    {
      name:"Md Shofiul Alam",
      image:a1,
      description:`Md Shofiul Alam is a National AI Strategist and tech entrepreneur with over 18 years of experience in enterprise AI adoption, digital transformation, and GovTech strategy. He has played a key role in shaping Bangladesh’s National AI Strategy, with a strong focus on scalable, ethical, and enterprise ready AI solutions.
His expertise spans enterprise AI integration, cognitive AI systems, AI governance and ethics, data driven decision making, and large scale digital transformation across both government and private sectors. As Managing Director of HyperTAG Solutions Ltd. and Founder of Desh AI, he has led the design and deployment of AI enabled platforms for real world enterprise and public-sector use cases.
Md Shofiul brings hands-on experience in startup to enterprise scaling, AI-powered fintech solutions, workforce upskilling for AI readiness, and policy aligned AI implementation. He is a Member of AAAI and a regular contributor on AI ethics, human centered design, and algorithmic impact, offering a balanced perspective on both the technical and strategic challenges of AI in enterprise environments.`
    },
    {
      name:"Shafqat Asif",
      image:a1,
      description:`Mr. Asif is a highly accomplished technology leader and entrepreneur, currently contributing to the strategic growth and engineering excellence of Vivasoft Limited. His work focuses on building scalable software solutions, leading high-performing engineering teams, and delivering impactful products for global clients.

With extensive professional experience in senior leadership roles, Mr. Asif has served at Pathao in key positions including Vice President of Engineering, Director of Engineering, and Head of Platform Services & Data Engineering. He also gained valuable experience at Widespace in multiple leadership and architectural roles. He holds an academic background in Computer Science from North South University and brings strong expertise in software architecture, agile practices, and engineering leadership.

Mr. Asif’s industry exposure and leadership experience make this seminar a valuable opportunity for participants to gain real-world insights into technology careers, industry expectations, and sustainable professional growth in the global technology industry.

`
    },
    {
      name:"Zuberul",
      image:a1,
      description:`Zuberul is a Team Leader, Principal Engineer & Device-to-Device Connectivity expert in Samsung R&D Institute Bangladesh Ltd.

An 18-year veteran of the tech industry, Zuberul leads a strong team of 120 engineers delivering cutting-edge Innovative Solutions. A specialist in protocol implementation with multiple patents in the Connectivity domain, he excels at bridging the gap between complex connectivity and seamless user experiences.
`
    }
  ];


  
  return (
    <>
      <section style={{minHeight: "50vh"}} className="page-hero" aria-labelledby="page-title">
        <StarSky />
        <div className="in">
          <h1 id="page-title" data-star-avoid>SPARC Speakers</h1>
          <p data-star-avoid>Meet Our Distinguished Speakers</p>
        </div>
      </section>
      
      <section style={{ backgroundColor: "#FFFAFB", padding: "3rem 0" }} className="RyBG">
        <div className="RyIN">
          <SpeakersObj speakers={speakersData} />
        </div>
      </section>
    </>
  );
}
