const testEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      description: "Annual tech conference focusing on the latest in software development.",
      location: "London, UK",
      date_created: new Date(),
      date_start: new Date("2024-04-10"),
      date_end: new Date("2024-04-12"),
      price: 299,
      image: "https://example.com/events/tech-conference-2024",
      category: "Technology",
      url: "https://example.com/events/tech-conference-2024",
      slots: 500,
      attendees: []
    },
    {
      id: 2,
      title: "Local Art Exhibition",
      description: "Explore the latest in contemporary art from local artists.",
      location: "Edinburgh, Scotland",
      date_created: new Date(),
      date_start: new Date("2024-05-15"),
      date_end: new Date("2024-05-20"),
      price: 0,
      image: "https://images.pexels.com/photos/354939/pexels-photo-354939.jpeg",
      category: "Art",
      url: "https://example.com/events/art-exhibition-2024",
      slots: 200,
      attendees: []
    },
    {
      id: 3,
      title: "Marathon 2024",
      description: "Join us for the annual city marathon and run for a good cause.",
      location: "Birmingham, UK",
      date_created: new Date(),
      date_start: new Date("2024-09-05"),
      date_end: new Date("2024-09-05"),
      price: 50,
      image: "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg",
      category: "Sports",
      url: "https://example.com/events/marathon-2024",
      slots: 1000,
      attendees: []
    },
    {
      id: 4,
      title: "Cooking Workshop",
      description: "Learn to cook delicious meals with our expert chefs in this weekend workshop.",
      location: "Hull, UK",
      date_created: new Date(),
      date_start: new Date("2024-07-21"),
      date_end: new Date("2024-07-22"),
      price: 150,
      image: "https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg",
      category: "Food",
      url: "",
      slots: 50,
      attendees: []
    },
    {
      id: 5,
      title: "DIY Home Decor",
      description: "Create beautiful home decor items in our DIY workshop.",
      location: "Leeds, UK",
      date_created: new Date(),
      date_start: new Date("2024-08-12"),
      date_end: new Date("2024-08-12"),
      price: 75,
      image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
      category: "Lifestyle",
      url: "https://example.com/events/diy-home-decor",
      slots: 100,
      attendees: []
    }
    ];
  
    module.exports = testEvents;