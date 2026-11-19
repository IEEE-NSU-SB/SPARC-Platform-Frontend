import { useEffect } from 'react';
import StarSky from './StarSky';
import TimelineObj from './TimelineObj';


export default function Timeline() {
  useEffect(() => {
    document.title = `Timeline · SPARC 2026 · IEEE NSU SB`;
  }, []);
  
  
  const scheduleData = [
    {
      title: "Participant Reporting & Registration",
      time: "8:30 AM - 9:00 AM",
      description: "Show your QR Code (sent-via-mail) at the booth",
    },
    {
      title: "Breakfast and Orientation",
      time: "9:00 AM - 9:30 AM",
      description: "Network with fellow attendees and enjoy refreshments",
    },
    {
      title: "Inaugural ceremony",
      time: "9:30 AM - 10:00 AM",
    },
    {
      title: `Harnessing Solar Energy:
        Powering a Clean and
        Sustainable Future`,
      time: "10:00 AM - 10:40 AM",
    },
    {
      title: `Creating Your Own Market: A
        Guide to Innovative
        Entrepreneurship`,
      time: "10:40 AM - 11:20 AM",
    },
    {
      title: `Sustainable Energy
        Technologies for Bangladesh’s
        Future: Opportunities,
        Challenges, and Global
        Perspectives`,
      time: "11:20 AM - 12:00 PM",
    },
    {
      title: `Engineering High
        Performance Connectivity
        (MDE & IoT) Solutions
        `,
      time: "12:00 PM - 12:40 PM",
    },
    {
      title: `Lunch And Prayer Break`,
      time: "12:40 PM - 2:00 PM",
    },
    {
      title: `Panel Discussion
  “AI in the Enterprise: Hype,
  Reality, and Engineering
  Challenges”`,
      time: "2:00 PM - 3:20 PM",
    },
    {
      title: `The Journey Toward Localized
  Hardware Manufacturing in
  Bangladesh`,
      time: "3:20 PM - 4:00 PM",
    },
    {
      title: `Competition`,
      time: "4:20 PM - 5:45 PM",
    },
    {
      title: `Break and Evening Snacks`,
      time: "5:45 PM - 6:00 PM",
    },
    {
      title: `Diversity and Inclusion for
  Women
  Empowerment;Retention and
  Advancement
  `,
      time: "6:00 PM - 7:00 PM",
    },
    {
      title: `Closing Ceremony with Prize
  Giving
  `,
      time: "7:00 PM - 8:00 PM",
    },
    {
      title: `Cultural and Dinner
  `,
      time: "8:00 PM - 9:00 PM",
    }
  ];

  
  return (
    <>
      <section style={{minHeight: "50vh"}} className="page-hero" aria-labelledby="page-title">
        <StarSky />
        <div className="in">
          <h1 id="page-title" data-star-avoid>Event Timeline</h1>
          <p data-star-avoid>December 30, 2026 | North South University</p>
        </div>
      </section>
      
      <section style={{ backgroundColor: "#FFFAFB", padding: "3rem 0" }}>
        <div className="in">
          <TimelineObj
            events={scheduleData} 
          />
        </div>
      </section>
    </>
  );
}
