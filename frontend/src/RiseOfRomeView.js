import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const RiseOfRomeView = ({
    switchToTimelineView,
    switchToRiseofRomeView,
    switchToPunicWarsView,
    switchToFallofRomeView,
    switchToStudentView,
    switchToInventoryView,
}) => {
    const [isFirstSectionCollapsed, setIsFirstSectionCollapsed] = useState(true);
    const [isSecondSectionCollapsed, setIsSecondSectionCollapsed] = useState(true);
    const [isThirdSectionCollapsed, setIsThirdSectionCollapsed] = useState(true);
    const [isQuizCollapsed, setIsQuizCollapsed] = useState(true);

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

        // Event listener setup
        const foundingButton = document.getElementById("foundingFunFactButton");
        const startRomeButton = document.getElementById("startFunFactButton");
        const settlementButton = document.getElementById("settlementFunFactButton");
        const addEventButton1 = document.getElementById("addEventButton1");
        const addEventButton2 = document.getElementById("addEventButton2");
        const addEventButton3 = document.getElementById("addEventButton3");

        foundingButton.addEventListener("mouseover", handleMouseOver1);
        foundingButton.addEventListener("mouseleave", handleMouseLeave);

        startRomeButton.addEventListener("mouseover", handleMouseOver1);
        startRomeButton.addEventListener("mouseleave", handleMouseLeave);

        settlementButton.addEventListener("mouseover", handleMouseOver1);
        settlementButton.addEventListener("mouseleave", handleMouseLeave);

        addEventButton1.addEventListener("mouseover", handleMouseOver2);
        addEventButton1.addEventListener("mouseleave", handleMouseLeave);

        addEventButton2.addEventListener("mouseover", handleMouseOver2);
        addEventButton2.addEventListener("mouseleave", handleMouseLeave);

        addEventButton3.addEventListener("mouseover", handleMouseOver2);
        addEventButton3.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            foundingButton.removeEventListener("mouseover", handleMouseOver1);
            foundingButton.removeEventListener("mouseleave", handleMouseLeave);

            startRomeButton.removeEventListener("mouseover", handleMouseOver1);
            startRomeButton.removeEventListener("mouseleave", handleMouseLeave);

            settlementButton.removeEventListener("mouseover", handleMouseOver1);
            settlementButton.removeEventListener("mouseleave", handleMouseLeave);

            addEventButton1.removeEventListener("mouseover", handleMouseOver2);
            addEventButton1.removeEventListener("mouseleave", handleMouseLeave);

            addEventButton2.removeEventListener("mouseover", handleMouseOver2);
            addEventButton2.removeEventListener("mouseleave", handleMouseLeave);

            addEventButton3.removeEventListener("mouseover", handleMouseOver2);
            addEventButton3.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // inputting all data for the Rise of Rome view from the JSON file
    function load(imageResult) {
        // founding of rome elements
        let img1 = document.getElementById("foundingOfRomeImg");
        let text1 = document.getElementById("foundingOfRomeImgDescription");
        let title1 = document.getElementById("foundingOfRomeImgTitle");

        // roman republic elements
        let img2 = document.getElementById("romanRepublicImg");
        let text2 = document.getElementById("romanRepublicImgDescription");
        let title2 = document.getElementById("romanRepublicImgTitle");

        // latin war elements
        let img3 = document.getElementById("latinWarImg");
        let text3 = document.getElementById("latinWareImgDescription");
        let title3 = document.getElementById("latinWarImgTitle");

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

        for (var i = 0; i < imageResult.riseOfRome.length; i++) {
            let img = imageResult.riseOfRome[i].image;
            let textt = imageResult.riseOfRome[i].text;
            let title = imageResult.riseOfRome[i].titleImg;

            // get the image and put into a div element
            let imge = document.createElement("div");
            imge.innerHTML = `<img src=${img}  alt=${title} height="300" style="margin-top: 100px; margin-left:30px"></img>`;

            // get text information from the JSON file and put into a p element
            let txt = document.createElement("p");
            txt.innerHTML = `<p class="lead">${textt}</p>`;

            // get title information from the JSON file and put into a h2 element
            let subject = document.createElement("h2");
            subject.innerHTML = `<h2 style="font-size: 50px"><strong>${title}</strong></h2>`;

            // place images, text, and descriptions onto webpages
            if (imageResult.riseOfRome[i].imageId === "founding") {
                img1.appendChild(imge);
                text1.appendChild(txt);
                title1.appendChild(subject);
                console.log(img1);
            }
            else if (imageResult.riseOfRome[i].imageId === "republic") {
                img2.appendChild(imge);
                text2.appendChild(txt);
                title2.appendChild(subject);
            }
            else if (imageResult.riseOfRome[i].imageId === "latin") {
                img3.appendChild(imge);
                text3.appendChild(txt);
                title3.appendChild(subject);
            }

        }
    }

    // when a fun fact button is clicked, it will display an alert message containing a fun fact
    function displayFunFact(event) {
        if (event === 'founding') {
            alert("When Rome was founded it was just a small village on the Tiber river.");
        }
        if (event === 'republic') {
            alert("The Roman republic lasted over 500 years making it and the Roman empire one of the longest lasting empires ever.");
        }
        if (event === 'latin') {
            alert("Despite all of the territory being taken over by Rome many of the towns were still allowed to keep local governments.");
        }
    }

    const handleMouseOver1 = (event) => {
        event.target.style.background = "red";
    };

    const handleMouseOver2 = (event) => {
        event.target.style.background = "yellow";
    };

    const handleMouseLeave = (event) => {
        event.target.style.background = "rgb(228, 224, 224)";
    };

    let quizDiv;
    let scoreSpot;
    let scoreTxt;
    let quizArr;
    let questions;

    function showQuiz() {
        setIsQuizCollapsed(!isQuizCollapsed); // uncollaspes the quiz

        // array containing the quiz questions
        questions = [
            {
                question: "1. Who founded Rome?",
                answers: {
                    a: "Julius Ceaser",
                    b: "Scipio",
                    c: "Romulus and Remus"
                },
                solution: "c"
            },
            {
                question: "2. What government was overthrown?",
                answers: {
                    a: "Tyranny",
                    b: "Democracy",
                    c: "Communism"
                },
                solution: "a"
            },
            {
                question: "3. What war provoked the Latins to fight the Romans?",
                answers: {
                    a: "The first Punic war",
                    b: "The first Samnite war",
                    c: "The second Punic war"
                },
                solution: "b"
            }
        ];

        quizArr = [];
        questions.forEach(
            (q, num) => {

                let answers = [];

                for (let i in q.answers) {

                    answers.push(`
          <p>
            <input type="radio" name="questiondiv${num}" value="${i}">
            <em>${i}.</em>
            ${q.answers[i]}
          </p>
          `);
                }

                quizArr.push(`
      <div class="questiondiv"> ${q.question} 
      </div>
      <div class="answers"> ${answers.join('')}
       </div>
        `);
            }
        );

        quizDiv = document.getElementById('quizdiv');
        quizDiv.innerHTML = quizArr.join('');
        console.log(quizDiv.querySelectorAll('.answers'));

        scoreSpot = document.getElementById("score");
        scoreTxt = document.createElement("p");
    }

    // if quiz submitted, color correct and incorrect questions
    const handleQuizSubmit = () => {
        let answerDiv = quizDiv.querySelectorAll('.answers');
        let questionSelected = quizDiv.querySelectorAll('.questiondiv');
        let counter = 0;

        questions.forEach(
            (q, num) => {
                let selectedAns = (answerDiv[num].querySelector(`input[name=questiondiv${num}]:checked`)).value;

                // set questions with the right answer to green
                if (selectedAns === q.solution) {
                    questionSelected[num].style.fontWeight = '900';
                    questionSelected[num].style.color = 'lightgreen';
                    counter = counter + 1;
                }
                // set questions with the wrong answer to red
                else {
                    questionSelected[num].style.fontWeight = '900';
                    questionSelected[num].style.color = 'red';
                }
            });

        // display the number of correct answers that the user got
        scoreTxt.innerHTML = `<p class="quizAnswer" style="text-align: center">You got <strong>${counter} out of 3</strong> correct</p>`;
        scoreSpot.appendChild(scoreTxt);
    };

    // add a new event to the database when one of the "Learn More About This Event" button has been clicked
    function addEvent(event) {
        if (event === 'founding') {
            // Construct a new event
            const newEvent = {
                "id": 1,
                "title": "The Founding of Rome",
                "description": "If you would like to learn more about the founding of Rome, these sites go into more depth about this event:",
                "sites": [
                    {
                        "name": "Wikipedia",
                        "url": "https://en.wikipedia.org/wiki/Founding_of_Rome"
                    },
                    {
                        "name": "History.com",
                        "url": "https://www.history.com/this-day-in-history/rome-founded"
                    },
                    {
                        "name": "Encyclopedia Britannica",
                        "url": "https://www.britannica.com/place/ancient-Rome/Romes-foundation-myth"
                    }
                ],
                "image": "./images/founding_rome.jpg",
                "category": "Rise of Rome"
            };

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
    }

    return (
        <div>
            <div style={{ backgroundColor: "rgb(0, 128, 255)", display: "flex", justifyContent: "center", height: "80px" }}>
                <button
                    className="text-black text-sm p-1 focus:outline-none"
                    style={{ height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px" }}
                    onClick={switchToTimelineView}
                >
                    Timeline
                </button>
                <button
                    className="text-white text-sm p-1 focus:outline-none"
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
                    className="text-black text-sm p-1 focus:outline-none"
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

            <div className="header" style={{ padding: "20px" }}>
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                    <font size="+20"><u>The Rise of Rome</u></font>
                </h1>
                <br></br>
                <h2 className="lead" style={{ fontSize: "30px", maxWidth: "1000px", margin: "0 auto" }}>
                    In this view, it will go over some of the key events that lead to the rise of the Roman
                    Empire, such as:
                    <ul>
                        <li>The Founding Of Rome</li>
                        <li>The Start Of The Roman Republic</li>
                        <li>The Settlement Of The Latin War</li>
                    </ul>
                    While reading through the page, there will be a <b> fun fact </b> button at the end of each event description
                    to make learning about the rise the Roman Empire a little more interesting. There will also be a <b> quiz </b> at the end of the webpage to
                    test your understanding of the events that lead to the demise of Rome. If you want to learn more about a specific event, click the 
                    <b> Learn More About This Event </b> button to add it to a queue. If you go to the <b> Learn More </b> page, you'll find that 
                    event and resources to learn more about that event.
                </h2>
            </div>

            <br></br>
            <br></br>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="button" className="collapsib" onClick={toggleFirstSectionCollapse} style={{ fontSize: "24px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                Section 1: The Founding Of Rome
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", backgroundColor: "rgb(224, 224, 224)" }} className={`content ${isFirstSectionCollapsed ? 'collapse' : ''}`}>
                <div className="row featurette justify-content-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1" id="foundingOfRomeImgTitle"></h2>
                        <p className="lead" id="foundingOfRomeImgDescription"></p>
                    </div>
                    <div className="col-md-5" id="foundingOfRomeImg">
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="text-center">
                    <button // button for adding a new event
                        id="addEventButton1"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => addEvent('founding')}
                    >
                        Learn More About This Event
                    </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        id="foundingFunFactButton"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => displayFunFact('founding')}
                    >
                        Click me for a fun fact
                    </button>
                </div>
                <br></br>
            </div>

            <br></br>
            <br></br>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="button" className="collapsib" onClick={toggleSecondSectionCollapse} style={{ fontSize: "24px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                Section 2: The Start Of The Roman Republic
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", backgroundColor: "rgb(224, 224, 224)" }} className={`content ${isSecondSectionCollapsed ? 'collapse' : ''}`}>
                <div className="row featurette justify-content-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1" id="romanRepublicImgTitle"></h2>
                        <p className="lead" id="romanRepublicImgDescription"></p>
                    </div>
                    <div className="col-md-5" id="romanRepublicImg">
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="text-center">
                    <button // button for adding a new event
                        id="addEventButton2" 
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => addEvent('republic')}
                    >
                        Learn More About This Event
                    </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        id="startFunFactButton"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => displayFunFact('republic')}
                    >
                        Click me for a fun fact
                    </button>
                </div>
                <br></br>
            </div>

            <br></br>
            <br></br>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="button" className="collapsib" onClick={toggleThirdSectionCollapse} style={{ fontSize: "24px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                Section 3: The Settlement Of The Latin War
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", backgroundColor: "rgb(224, 224, 224)" }} className={`content ${isThirdSectionCollapsed ? 'collapse' : ''}`}>
                <div className="row featurette justify-content-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1" id="latinWarImgTitle"></h2>
                        <p className="lead" id="latinWareImgDescription"></p>
                    </div>
                    <div className="col-md-5" id="latinWarImg">
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="text-center">
                    <button // button for adding a new event
                        id="addEventButton3"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => addEvent('latin')}
                    >
                        Learn More About This Event
                    </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        id="settlementFunFactButton"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => displayFunFact('latin')}
                    >
                        Click me for a fun fact
                    </button>
                </div>
                <br></br>
            </div>

            <br></br>
            <br></br>

            <div class="col">
                <button
                    id="toggleCardButton3"
                    type="button"
                    class="btn btn-primary mb-2 quiz-button"
                    style={{ marginLeft: "auto", backgroundColor: "rgb(175, 129, 76)" }}
                    onClick={showQuiz}
                >
                    Click to Take Quiz
                </button>
                <div
                    id="card3"
                    class={`card ${isQuizCollapsed ? "collapse" : "show"} shadow-sm`}
                >
                    <div class="card-body">
                        <h3 class="featurette-heading fw-normal lh-1" style={{ textAlign: "center" }}>
                            <pre>
                                <u>The Rise of Rome Quiz</u>
                            </pre>
                        </h3>
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "30px",
                                backgroundColor: "yellow",
                            }}
                        >
                            Important Disclaimer: the quiz won't be graded until all questions have been answered
                        </div>
                        <br></br>
                        <div id="quizdiv">{quizArr}</div>
                        <div id="score"></div>
                        <button id="submit" onClick={handleQuizSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>


            <br></br>
            <br></br>

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

export default RiseOfRomeView;