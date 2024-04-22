const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");
const { seed } = require("../Data/seed");
const users = require("../Data/testData/usersData");
const events = require("../Data/testData/eventsData");
const { User } = require("../Schemas/userSchema");
const { Event } = require("../Schemas/eventSchema");
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DATABASE_URL);
    return seed(users, events);
  });
  
  afterAll(() => {
    mongoose.connection.close();
  });

describe("USERS", () => {

    describe("GET /users", () => {

      test("200: responds with an array of all users", () => {
        return request(app)
          .get("/users")
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body)).toBe(true);
            expect(body.length).toBe(users.length);
          });
      });

      test("200: returns all users, with the following properties: id, username, firstName, lastName, email, password, eventData, isStaff", () => {
        return request(app)
                .get("/users")
                .expect(200)
                .then(({ body }) => {
                  body.forEach((user) => {
                    expect(user).toMatchObject({
                      _id: expect.any(String),
                      username: expect.any(String),
                      firstName: expect.any(String),
                      lastName: expect.any(String),
                      email: expect.any(String),
                      password: expect.any(String),
                      eventData: expect.any(Array),
                      isStaff: expect.any(Boolean),
                    });
                  });
                });
      });

      describe("GET /users/:email", () => {
        test("200: returns the corresponding user by its email", () => {
                      return request(app)
                            .get("/users/alice.johnson@example.com")
                            .expect(200)
                            .then(({body}) => {
                              expect(body.email = "alice.johnson@example.com")
                              });
        })
        test("404: returns an error message if email is not found", () => {
          return request(app)
                  .get("/users/hello@hello")
                  .expect(404)
                  .then(({body}) => {
                    expect(body.msg = "Email not found")
                    });
        })
      })
    });

    describe("POST /user", () => {

      test("201: adds a user to the database", () => {
        const newUser = {
          username: "andrai",
          email: "andra@andra.com",
          password: "12345",
          };
      
        return request(app)
              .post("/user")
              .send(newUser)
              .expect(201)
              .then(({ body }) => {
                const { addedUser } = body;
                expect(addedUser).toMatchObject({...newUser});
              });
        });
      });  

    describe("PATCH /users/:email", () => {
      test("200: updates the user staff status", () => {
        const testPatch = { isStaff: true };
        return request(app)
            .patch("/users/alice.johnson@example.com")
            .send(testPatch)
            .expect(200)
            .then(({ body }) => {
              const updatedUser = body;
              expect(updatedUser.isStaff).toBe(true);
            });
        });
        test("404: returns an error message if user does not exist", () => {
          const testPatch = { isStaff: true };
          return request(app)
            .patch("/users/noUser")
            .send(testPatch)
            .expect(404)
            .then(( { body } ) => {
              expect(body.message).toBe("User Not Found");
            });
        });
      });

      describe("PATCH /users/:email/bookevent", () => {
        test("200: updates the user with the booked event", () => {
          return request(app)
              .patch("/users/alice.johnson@example.com/bookevent")
              .send({eventID: 3})
              .expect(200)
              .then(({ body }) => {
                const updatedUser = body;
                expect(updatedUser.eventData[0]).toStrictEqual({"eventID": 3});
              });
          });
        })
    
});

    
describe("EVENTS", () => {

    describe("GET /events", () => {
      test("200: returns an array with all events", () => {
            return request(app)
                    .get("/events")
                    .expect(200)
                    .then(({ body }) => {
                      expect(Array.isArray(body)).toBe(true);
                      expect(body.length).toBe(events.length);
                    });
            });

      test("200: returns all events, with the following properties: id, title, description, location, date_created, date_start, date_end, price, image, category, url, slots, attendees", () => {
            return request(app)
                    .get("/events")
                    .expect(200)
                    .then(({ body }) => {
                      body.forEach((event) => {
                        expect(event).toMatchObject({
                          id: expect.any(Number),
                          title: expect.any(String),
                          location: expect.any(String),
                          date_created: expect.any(String),
                          date_start: expect.any(String),
                          date_end: expect.any(String),
                          price: expect.any(Number),
                          image: expect.any(String),
                          category: expect.any(String),
                          url: expect.any(String),
                          slots: expect.any(Number),
                          attendees: expect.any(Array),
                        });
                      });
                    });
      });
    });

    describe("GET /events/:eventID", () => {
      test("200: returns the corresponding event by its ID", () => {
                    return request(app)
                          .get("/events/1")
                          .expect(200)
                          .then(({body}) => {
                            expect(body.id = 1)
                            expect(body.title = "Tech Conference 2024")
                            expect(body.description = "Annual tech conference focusing on the latest in software development.")
                            });
      })
      test("400: returns an error message if ID is invalid", () => {
                  return request(app)
                          .get("/events/errorID")
                          .expect(400)
                          .then(({body}) => {
                            expect(body.msg = "ID invalid")
                            });
      })
      test("404: returns an error message if ID is valid but not found", () => {
        return request(app)
                .get("/events/999")
                .expect(404)
                .then(({body}) => {
                  expect(body.msg = "ID not found")
                  });
      })
    })


    describe("POST /event", () => {
      test("201: creates a new event on the database", () => {
                const newEvent = {
                      title: "Art deco exposition",
                      description: "Explore new art.",
                      location: "Swansea, UK",
                      date_created: new Date(),
                      date_start: "2024-05-12",
                      date_end: "2024-06-12",
                      price: 199,
                      image: "art_deco.img",
                      category: "Art",
                      url: "",
                      slots: 10,
                    };
              
                return request(app)
                      .post("/event")
                      .send(newEvent)
                      .expect(201)
                      .then(({ body }) => {
                        const { addedEvent } = body;
                        expect(addedEvent).toHaveProperty('id', expect.any(Number))
                        expect(addedEvent).toHaveProperty('title', "Art deco exposition")
                        expect(addedEvent).toHaveProperty('description', "Explore new art.")
                        expect(addedEvent).toHaveProperty('location', "Swansea, UK")
                        expect(new Date(addedEvent.date_created)).toBeInstanceOf(Date)
                        expect(addedEvent.date_start).toMatch(/2024-05-12/)
                        expect(addedEvent.date_end).toMatch(/2024-06-12/)
                        expect(addedEvent).toHaveProperty('price', 199)
                        expect(addedEvent).toHaveProperty('image', "art_deco.img")
                        expect(addedEvent).toHaveProperty('category', "Art")
                        expect(addedEvent).toHaveProperty('url', "")
                        expect(addedEvent).toHaveProperty('slots', 10)
                        expect(addedEvent).toHaveProperty('attendees', expect.any(Array))
                      });
      });
    });

    describe(("DELETE /events/:eventID"), ()=> {
      test(("204: deletes an event by its ID"), () => {
                return request(app)           
                      .delete("/events/5")
                      .expect(204)
                      .then(() => {
                        return Event.find({id: 5}).then((result) => {
                          expect(result).toEqual([]);
                        })
                      })

      })
      test(("404: returns an error message if ID is not found"), () => {
        return request(app)           
              .delete("/events/99")
              .expect(404)
              .then(({body}) => {
                  expect(body.message = "ID Not Found");
                })
              })

})

})    