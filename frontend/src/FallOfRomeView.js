import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const FallOfRomeView = ({
    switchToTimelineView,
    switchToRiseofRomeView,
    switchToPunicWarsView,
    switchToFallofRomeView,
    switchToStudentView,
    switchToInventoryView,
    theEvents
}) => {
    // hooks used to keep track of collapsed sections of events
    const [isFirstSectionCollapsed, setIsFirstSectionCollapsed] = useState(true);
    const [isSecondSectionCollapsed, setIsSecondSectionCollapsed] = useState(true);
    const [isThirdSectionCollapsed, setIsThirdSectionCollapsed] = useState(true);

    // hooks used for managing the quiz
    const [isQuizCollapsed, setIsQuizCollapsed] = useState(true);
    const [score, setScore] = useState(null);

    // functions that determine which sections are collasped or not
    const toggleFirstSectionCollapse = () => {
        setIsFirstSectionCollapsed(!isFirstSectionCollapsed);
        setIsSecondSectionCollapsed(true); // Collapse the second section
        setIsThirdSectionCollapsed(true); //Collapse the third section
    };

    const toggleSecondSectionCollapse = () => {
        setIsSecondSectionCollapsed(!isSecondSectionCollapsed);
        setIsFirstSectionCollapsed(true); // Collapse the first section
        setIsThirdSectionCollapsed(true); //Collapse the third section
    };

    const toggleThirdSectionCollapse = () => {
        setIsThirdSectionCollapsed(!isThirdSectionCollapsed);
        setIsFirstSectionCollapsed(true); // Collapse the first section
        setIsSecondSectionCollapsed(true); // Collapse the second section
    };

    useEffect(() => {
        fetch("./data.json")
            .then(response => response.json())
            .then(imageResult => load(imageResult))
            .catch(error => console.error('Error fetching data:', error));

        // Event listener setup for styling the various buttons
        const crisisButton = document.getElementById("crisisFunFactButton");
        const riseButton = document.getElementById("riseFunFactButton");
        const fallButton = document.getElementById("fallFunFactButton");
        const addEventButton1 = document.getElementById("addEventButton1");
        const addEventButton2 = document.getElementById("addEventButton2");
        const addEventButton3 = document.getElementById("addEventButton3");

        crisisButton.addEventListener("mouseover", handleMouseOver);
        crisisButton.addEventListener("mouseleave", handleMouseLeave);

        riseButton.addEventListener("mouseover", handleMouseOver);
        riseButton.addEventListener("mouseleave", handleMouseLeave);

        fallButton.addEventListener("mouseover", handleMouseOver);
        fallButton.addEventListener("mouseleave", handleMouseLeave);

        addEventButton1.addEventListener("mouseover", handleMouseOver2);
        addEventButton1.addEventListener("mouseleave", handleMouseLeave);

        addEventButton2.addEventListener("mouseover", handleMouseOver2);
        addEventButton2.addEventListener("mouseleave", handleMouseLeave);

        addEventButton3.addEventListener("mouseover", handleMouseOver2);
        addEventButton3.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            crisisButton.removeEventListener("mouseover", handleMouseOver);
            crisisButton.removeEventListener("mouseleave", handleMouseLeave);

            riseButton.removeEventListener("mouseover", handleMouseOver);
            riseButton.removeEventListener("mouseleave", handleMouseLeave);

            fallButton.removeEventListener("mouseover", handleMouseOver);
            fallButton.removeEventListener("mouseleave", handleMouseLeave);

            addEventButton1.removeEventListener("mouseover", handleMouseOver2);
            addEventButton1.removeEventListener("mouseleave", handleMouseLeave);

            addEventButton2.removeEventListener("mouseover", handleMouseOver2);
            addEventButton2.removeEventListener("mouseleave", handleMouseLeave);

            addEventButton3.removeEventListener("mouseover", handleMouseOver2);
            addEventButton3.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // inputting all data for the Fall of Rome webpage from the JSON file
    function load(imageResult) {
        // crisis of the third century elements
        let img1 = document.getElementById("crisisofThirdCenImg");
        let text1 = document.getElementById("crisisofThirdCenImgDescription");
        let title1 = document.getElementById("crisisofThirdCenImgTitle");

        // rise of the eastern empire elements
        let img2 = document.getElementById("riseOfEasternEmpireImg");
        let text2 = document.getElementById("riseOfEasternEmpireImgDescription");
        let title2 = document.getElementById("riseOfEasternEmpireImgTitle");

        // fall of rome elements
        let img3 = document.getElementById("fallOfRomeImg");
        let text3 = document.getElementById("fallOfRomeImgDescription");
        let title3 = document.getElementById("fallOfRomeImgTitle");

        // Clear existing content
        img1.innerHTML = "";
        text1.innerHTML = "";
        title1.innerHTML = "";

        img2.innerHTML = "";
        text2.innerHTML = "";
        title2.innerHTML = "";

        img3.innerHTML = "";
        text3.innerHTML = "";
        title3.innerHTML = "";

        for (var i = 0; i < imageResult.fallOfRome.length; i++) {
            let img = imageResult.fallOfRome[i].image;
            let textt = imageResult.fallOfRome[i].text;
            let title = imageResult.fallOfRome[i].titleImg;

            // get the image and put into a div element
            let imge = document.createElement("div");
            imge.innerHTML = `<img src=${img}  alt=${title} height="250" style="margin-top: 100px; margin-left:30px"></img>`;

            // get text information from the JSON file and put into a p element
            let txt = document.createElement("p");
            txt.innerHTML = `<p class="lead">${textt}</p>`;

            // get title information from the JSON file and put into a h2 element
            let subject = document.createElement("h2");
            subject.innerHTML = `<h2 class="featurette-heading fw-normal lh-1"><strong>${title}</strong></h2>`;

            // place images, text, and descriptions onto webpages
            if (imageResult.fallOfRome[i].imageId === "crisis") {
                img1.appendChild(imge);
                text1.appendChild(txt);
                title1.appendChild(subject);
            }
            else if (imageResult.fallOfRome[i].imageId === "rise") {
                img2.appendChild(imge);
                text2.appendChild(txt);
                title2.appendChild(subject);
            }
            else if (imageResult.fallOfRome[i].imageId === "fall") {
                img3.appendChild(imge);
                text3.appendChild(txt);
                title3.appendChild(subject);
            }

        }
    }

    // when a fun fact button is clicked, it will display an alert message containing a fun fact
    function displayFunFact(event) {
        if (event === 'crisis') {
            alert("Emperor Alexander Severus was well known for his love of philosophy and intellectual pursuits. He was one of the youngest emperors in Roman history, having succeeded to the throne at the age of 13. He was known for his quest of wisdom and intellectual curiosity, even though he was still a young man. He surrounded himself with smart philosophers and advisors and had a strong interest in philosophy. But difficulties and disputes dogged his reign, which finally resulted in his death at the age of 26.");
        }
        if (event === 'rising') {
            alert("The Eastern Empire of Rome was called the Byzantine Empire. It continued for more than a millennium until the collapse of the Western Roman Empire in 476 AD.  The Byzantine Empire left a lasting legacy that still has an impact on Eastern Europe and the Mediterranean region today. It made major contributions to literature, art, architecture, and law.");
        }
        if (event === 'fall') {
            alert("The Visigoths were one of the two main branches of the Goths, who played a significant role in the downfall of the Western Roman Empire. Following their victory over the armies of the Western Roman Empire in the Battle of Adrianople in 378 AD, the Visigoths went on to found their own kingdom in the Iberian Peninsula (present-day Spain and Portugal). They dominated this area for several centuries, having a profound effect on Spanish history and culture.");
        }
    }

    // defining the event handlers for the buttons
    const handleMouseOver = (event) => {
        event.target.style.background = "red";
    };

    const handleMouseOver2 = (event) => {
        event.target.style.background = "yellow";
    };

    const handleMouseLeave = (event) => {
        event.target.style.background = "rgb(228, 224, 224)";
    };

    // if quiz submitted, color correct and incorrect questions and give the user a final score
    const handleQuizSubmission = () => {
        let answerDiv = document.querySelectorAll('.answers');
        let questionSelected = document.querySelectorAll('.questiondiv');
        let counter = 0;

        questions.forEach((q, num) => {
            let selectedRadioButton = answerDiv[num].querySelector(`input[name=questiondiv${num}]:checked`);

            // if this questions hasn't been answered, count it wrong
            if (!selectedRadioButton) {
                questionSelected[num].style.fontWeight = '900';
                questionSelected[num].style.color = 'red';
                return;
            }

            let selectedAns = (answerDiv[num].querySelector(`input[name=questiondiv${num}]:checked`)).value;

            if (selectedAns === q.solution) {
                questionSelected[num].style.fontWeight = '900';
                questionSelected[num].style.color = 'lightgreen';
                counter = counter + 1;
            } else {
                questionSelected[num].style.fontWeight = '900';
                questionSelected[num].style.color = 'red';
            }
        });

        setScore(counter);
    };

    // array containing the quiz questions
    let questions = [
        {
            question: "1. What was the cause of death for Emperor Alexander Severus?",
            answers: {
                a: "Illness",
                b: "Died while in war",
                c: "Killed by his own troops"
            },
            solution: "c"
        },
        {
            question: "2. What solution did Emperor Diocletian come up with to solve the issues the Roman Empire were facing?",
            answers: {
                a: "Split the Roman Empire into the Western Empire and Eastern Empire",
                b: "Hire more troops",
                c: "Raid the Goths"
            },
            solution: "a"
        },
        {
            question: "3. What group of people caused major damage to the city of Rome?",
            answers: {
                a: "The Ottoman Empire",
                b: "The Visigoths",
                c: "The Eastern Roman Empire"
            },
            solution: "b"
        },
        {
            question: "4. Which emporer was killed by the plague?",
            answers: {
                a: "Diocletian",
                b: "Alexander Severus",
                c: "Claudis II"
            },
            solution: "c"
        },
        {
            question: "5. What year did the complete destruction of the Roman empire take place?",
            answers: {
                a: "476 AD",
                b: "395 AD",
                c: "410 AD"
            },
            solution: "a"
        }
    ];

    // add a new event to the database when one of the "Learn More About This Event" button has been clicked
    function addEvent(event) {
        let newEvent;

        if (event === 'crisis') {
            // Construct a new event
            newEvent = {
                "id": 7,
                "title": "The Crisis of the Third Century",
                "description": "If you would like to learn more about the Crisis of the Third Century, these sites go into more depth about this event:",
                "sites": [
                    {
                        "name": "The Collector",
                        "url": "https://www.thecollector.com/what-was-the-crisis-of-the-third-century/"
                    },
                    {
                        "name": "World History Encyclopedia",
                        "url": "https://www.worldhistory.org/Crisis_of_the_Third_Century/"
                    },
                    {
                        "name": "Wikipedia",
                        "url": "https://en.wikipedia.org/wiki/Crisis_of_the_Third_Century"
                    }
                ],
                "image": "./images/crisis_of_third_empire.jpg",
                "category": "Fall of Rome",
                "notes": "none"
            };
        }

        if (event === 'rising') {
            // Construct a new event
            newEvent = {
                "id": 8,
                "title": "The Rise of the Eastern Empire",
                "description": "If you would like to learn more about the rise of the eastern empire, these sites go into more depth about this event:",
                "sites": [
                    {
                        "name": "Core Knowledge",
                        "url": "https://www.coreknowledge.org/wp-content/uploads/2017/02/CKHG-G3-U2-about-constantine-eastern-empre-sack-of-rome.pdf"
                    },
                    {
                        "name": "History.com",
                        "url": "https://www.history.com/topics/ancient-middle-east/byzantine-empire"
                    },
                    {
                        "name": "Encyclopedia Britannica",
                        "url": "https://www.britannica.com/place/Byzantine-Empire"
                    }
                ],
                "image": "./images/byzantine_empire.jpg",
                "category": "Fall of Rome",
                "notes": "none"
            };
        }

        if (event === 'fall') {
            // Construct a new event
            newEvent = {
                "id": 9,
                "title": "The Fall of Rome",
                "description": "If you would like to learn more about the Fall of Rome, these sites go into more depth about this event:",
                "sites": [
                    {
                        "name": "Wikipedia",
                        "url": "https://en.wikipedia.org/wiki/Fall_of_the_Western_Roman_Empire"
                    },
                    {
                        "name": "History.com",
                        "url": "https://www.history.com/news/8-reasons-why-rome-fell"
                    },
                    {
                        "name": "Encyclopedia Britannica",
                        "url": "https://www.britannica.com/place/Roman-Empire/Height-and-decline-of-imperial-Rome"
                    }
                ],
                "image": "./images/fall_of_rome.jpg",
                "category": "Fall of Rome",
                "notes": "none"
            };
        }

        // Make the POST request
        fetch("http://localhost:8081/addEvent", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
        })
            .then(response => {
                if (response.status != 200) {
                    return response.json()
                        .then(errData => {
                            throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                        })
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Event added successfully!'); // Display alert with success message
            })
            .catch(error => {
                console.error('Error adding event:', error);
                alert('Error adding event:' + error.message); // Display alert if there's an error
            });
    }

    return (
        <div>
            {/* The navigational bar */}
            <div style={{ backgroundColor: "rgb(0, 128, 255)", display: "flex", justifyContent: "center", height: "80px" }}>
                <button
                    className="text-black text-sm p-1 focus:outline-none"
                    style={{ height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px" }}
                    onClick={switchToTimelineView}
                >
                    Timeline
                </button>
                <button
                    className="text-black text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px" }}
                    onClick={switchToRiseofRomeView}
                >
                    Rise Of Rome
                </button>
                <button
                    className="text-black text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px" }}
                    onClick={switchToPunicWarsView}
                >
                    Punic Wars
                </button>
                <button
                    className="text-white text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px" }}
                    onClick={switchToFallofRomeView}
                >
                    Fall of Rome
                </button>
                <button
                    className="text-black text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px" }}
                    onClick={switchToStudentView}
                >
                    Information about the Students
                </button>
                <button
                    className="text-black text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px" }}
                    onClick={switchToInventoryView}
                >
                    Learn More
                </button>
            </div>

            <br></br>

            {/* The header and description of the view */}
            <div className="header" style={{ padding: "20px" }}>
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                    <font size="+20"><u>The Fall of Rome</u></font>
                </h1>
                <br></br>
                <h2 className="lead" style={{ fontSize: "30px", maxWidth: "1000px", margin: "0 auto" }}>
                    In this view, it will go over some of the key events that lead to the collapse of the Roman
                    Empire, such as:
                    <ul>
                        <li>The Crisis of the Third Century</li>
                        <li>The Rise of the Eastern Empire</li>
                        <li>The Fall of Rome</li>
                    </ul>
                    While reading through the page, there will be a <b> fun fact button </b> at the end of each event description
                    to make learning about the collapse the Roman Empire a little more interesting. There will also be a <b>quiz</b> at the end of the webpage to
                    test your understanding of the events that lead to the demise of Rome. If you want to learn more about a specific event, click the
                    <b> Learn More About This Event </b> button to add it to a queue. If you go to the <b> Learn More </b> page, you'll find that
                    event and resources to learn more about that event.
                </h2>
            </div>

            <br></br>
            <br></br>

            {/* The first collapsible event */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="button" className="collapsib" onClick={toggleFirstSectionCollapse} style={{ fontSize: "24px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                Section 1: The Crisis of the Third Century
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", backgroundColor: "rgb(224, 224, 224)" }} className={`content ${isFirstSectionCollapsed ? 'collapse' : ''}`}>
                <div className="row featurette justify-content-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1" id="crisisofThirdCenImgTitle"></h2>
                        <p className="lead" id="crisisofThirdCenImgDescription"></p>
                    </div>
                    <div className="col-md-5" id="crisisofThirdCenImg">
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="text-center">
                    <button // button for adding a new event
                        id="addEventButton1"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => addEvent('crisis')}
                    >
                        Learn More About This Event
                    </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button // fun fact button
                        id="crisisFunFactButton"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => displayFunFact('crisis')}
                    >
                        Click me for a fun fact
                    </button>
                </div>
                <br></br>
            </div>

            <br></br>
            <br></br>

            {/* The second collapsible event */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="button" className="collapsib" onClick={toggleSecondSectionCollapse} style={{ fontSize: "24px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                Section 2: The Rise of the Eastern Empire
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", backgroundColor: "rgb(224, 224, 224)" }} className={`content ${isSecondSectionCollapsed ? 'collapse' : ''}`}>
                <div className="row featurette justify-content-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1" id="riseOfEasternEmpireImgTitle"></h2>
                        <p className="lead" id="riseOfEasternEmpireImgDescription"></p>
                    </div>
                    <div className="col-md-5" id="riseOfEasternEmpireImg">
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="text-center">
                    <button // button for adding a new event
                        id="addEventButton2"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => addEvent('rising')}
                    >
                        Learn More About This Event
                    </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button // fun fact button
                        id="riseFunFactButton"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => displayFunFact('rising')}
                    >
                        Click me for a fun fact
                    </button>
                </div>
                <br></br>
            </div>

            <br></br>
            <br></br>

            {/* The third collapsible event */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="button" className="collapsib" onClick={toggleThirdSectionCollapse} style={{ fontSize: "24px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                Section 3: The Fall of Rome
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", backgroundColor: "rgb(224, 224, 224)" }} className={`content ${isThirdSectionCollapsed ? 'collapse' : ''}`}>
                <div className="row featurette justify-content-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1" id="fallOfRomeImgTitle"></h2>
                        <p className="lead" id="fallOfRomeImgDescription"></p>
                    </div>
                    <div className="col-md-5" id="fallOfRomeImg">
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="text-center">
                    <button // button for adding a new event
                        id="addEventButton3"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => addEvent('fall')}
                    >
                        Learn More About This Event
                    </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button // fun fact button
                        id="fallFunFactButton"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => displayFunFact('fall')}
                    >
                        Click me for a fun fact
                    </button>
                </div>
                <br></br>
            </div>

            <br></br>
            <br></br>

            {/* Quiz for more user interaction */}
            <div className="col" style={{ marginLeft: "20px" }}>
                <button
                    id="toggleCardButton3"
                    type="button"
                    class="btn btn-primary mb-2 quiz-button"
                    style={{ marginLeft: "auto", backgroundColor: "rgb(175, 129, 76)", fontSize: "20px", padding: "10px 20px" }}
                    onClick={() => setIsQuizCollapsed(!isQuizCollapsed)}
                >
                    Click to Take Quiz
                </button>
                <div style={{ border: "1px solid black", padding: "10px" }} className={`content ${isQuizCollapsed ? "collapse" : ""}`}>
                    <h3 class="featurette-heading fw-normal lh-1" style={{ textAlign: "center" }}>
                        <pre>
                            <u>The Fall of Rome Quiz</u>
                        </pre>
                    </h3>
                    <div id="quizdiv" className="quiz" style={{ marginTop: "20px" }}>
                        {questions.map((q, num) => (
                            <div key={num}>
                                <div className="questiondiv">{q.question}</div>
                                <div className="answers">
                                    {Object.keys(q.answers).map((key) => (
                                        <p key={key}>
                                            <input type="radio" name={`questiondiv${num}`} value={key} />
                                            <em>{key}. </em>
                                            {q.answers[key]}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleQuizSubmission} style={{ marginTop: "20px" }}>Submit Quiz</button>
                    <div id="score" style={{ display: "flex", justifyContent: "center", fontSize: "25px" }}>
                        {score !== null && <p className="quizAnswer">You got <strong>{score} out of 5</strong> correct</p>}
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>

            {/* Footer */}
            <footer class="b-footer">
                <div>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "20px",
                            backgroundColor: "rgb(224, 224, 224)"
                        }}
                    >
                        &copy; Caden Otis and Brandon Rau 2024
                    </p>
                </div>
            </footer>

        </div>
    );
}

export default FallOfRomeView;
