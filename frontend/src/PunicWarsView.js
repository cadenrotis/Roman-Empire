import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const PunicWarsView = ({
    switchToTimelineView,
    switchToRiseofRomeView,
    switchToPunicWarsView,
    switchToFallofRomeView,
    switchToStudentView,
    switchToInventoryView,
    theEvents
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
        const firstButton = document.getElementById("firstFunFactButton");
        const secondButton = document.getElementById("secondFunFactButton");
        const thirdButton = document.getElementById("thirdFunFactButton");

        firstButton.addEventListener("mouseover", handleMouseOver);
        firstButton.addEventListener("mouseleave", handleMouseLeave);

        secondButton.addEventListener("mouseover", handleMouseOver);
        secondButton.addEventListener("mouseleave", handleMouseLeave);

        thirdButton.addEventListener("mouseover", handleMouseOver);
        thirdButton.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            firstButton.removeEventListener("mouseover", handleMouseOver);
            firstButton.removeEventListener("mouseleave", handleMouseLeave);

            secondButton.removeEventListener("mouseover", handleMouseOver);
            secondButton.removeEventListener("mouseleave", handleMouseLeave);

            thirdButton.removeEventListener("mouseover", handleMouseOver);
            thirdButton.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // inputting all data for the Punic Wars webpage from the JSON file
    function load(imageResult) {
        // first punic war elements
        let img1 = document.getElementById("firstPunicWarMapImg");
        let text1 = document.getElementById("firstPunicWarMapImgDescription");
        let title1 = document.getElementById("firstPunicWarMapImgTitle");

        // second punic war elements
        let img2 = document.getElementById("secondPunicWarMapImg");
        let text2 = document.getElementById("secondPunicWarMapImgDescription");
        let title2 = document.getElementById("secondPunicWarMapImgTitle");

        // third punic war elements
        let img3 = document.getElementById("thirdPunicWarMapImg");
        let text3 = document.getElementById("thirdPunicWarMapImgDescription");
        let title3 = document.getElementById("thirdPunicWarMapImgTitle");

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

        for (var i = 0; i < imageResult.punicWars.length; i++) {
            let img = imageResult.punicWars[i].image;
            let textt = imageResult.punicWars[i].text;
            let title = imageResult.punicWars[i].titleImg;

            // get the image and put into a div element
            let imge = document.createElement("div");
            imge.innerHTML = `<img src=${img}  alt=${title} height="300" style="margin-top: 100px; margin-left:30px"></img>`;

            // get text information from the JSON file and put into a p element
            let txt = document.createElement("p");
            txt.innerHTML = `<p class="lead">${textt}</p>`;

            // get title information from the JSON file and put into a h2 element
            let subject = document.createElement("h2");
            subject.innerHTML = `<h2 class="featurette-heading fw-normal lh-1"><strong>${title}</strong></h2>`;

            // place images, text, and descriptions onto webpages
            if (imageResult.punicWars[i].imageId === "first") {
                img1.appendChild(imge);
                text1.appendChild(txt);
                title1.appendChild(subject);
            }
            else if (imageResult.punicWars[i].imageId === "second") {
                img2.appendChild(imge);
                text2.appendChild(txt);
                title2.appendChild(subject);
            }
            else if (imageResult.punicWars[i].imageId === "third") {
                img3.appendChild(imge);
                text3.appendChild(txt);
                title3.appendChild(subject);
            }

        }
    }

    // when a fun fact button is clicked, it will display an alert message containing a fun fact
    function displayFunFact(event) {
        if (event === 'first') {
            alert("The Romans modeled their ships after the Carthaginians after one of their ships washed up on the shore of Rome.");
        }
        if (event === 'second') {
            alert("The elephants the Carthaginians used in the war were an extinct elephant species known as Syrian elephants, that were twice the size of modern African elephants.");
        }
        if (event === 'third') {
            alert("During this war Scipio became the youngest Roman Consul ever and they actually lifted the age restriction for him.");
        }
    }

    const handleMouseOver = (event) => {
        event.target.style.background = "red";
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
                question: "1. Where did a Majority of the fighting take place?",
                answers: {
                    a: "Rome",
                    b: "Carthage",
                    c: "Sicily"
                },
                solution: "c"
            },
            {
                question: "2. Who was the Carthanginian commander?",
                answers: {
                    a: "Hannibal",
                    b: "Scipio",
                    c: "Julius Ceaser"
                },
                solution: "a"
            },
            {
                question: "3. What land did Rome gain from this war?",
                answers: {
                    a: "Iberia",
                    b: "Africa",
                    c: "Italy"
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
                    className="text-black text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px"  }}
                    onClick={switchToRiseofRomeView}
                >
                    Rise Of Rome
                </button>
                <button
                    className="text-white text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px"  }}
                    onClick={switchToPunicWarsView}
                >
                    Punic Wars
                </button>
                <button
                    className="text-black text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px"  }}
                    onClick={switchToFallofRomeView}
                >
                    Fall of Rome
                </button>
                <button
                    className="text-black text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px"  }}
                    onClick={switchToStudentView}
                >
                    Information about the Students
                </button>
                <button
                    className="text-black text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px"  }}
                    onClick={switchToInventoryView}
                >
                    Learn More
                </button>
            </div>

            <br></br>

            <div className="header" style={{ padding: "20px" }}>
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                    <font size="+20"><u>The Punic Wars</u></font>
                </h1>
                <br></br>
                <h2 className="lead" style={{ fontSize: "30px", maxWidth: "1000px", margin: "0 auto" }}>
                    In this view, it will go over some of the key events of The Punic Wars, such as:
                    <ul>
                        <li>The First Punic War</li>
                        <li>The Second Punic War</li>
                        <li>The Third Punic War</li>
                    </ul>
                    While reading through the page, there will be a <b> fun fact </b> button at the end of each event description
                    to make learning about the Punic wars a little more interesting. There will also be a <b> quiz </b> at the end of the webpage to
                    test your understanding of the events that happened during the punic wars. If you want to learn more about a specific event, click the 
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
                                Section 1: The First Punic War
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", backgroundColor: "rgb(224, 224, 224)" }} className={`content ${isFirstSectionCollapsed ? 'collapse' : ''}`}>
                <div className="row featurette justify-content-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1" id="firstPunicWarMapImgTitle"></h2>
                        <p className="lead" id="firstPunicWarMapImgDescription"></p>
                    </div>
                    <div className="col-md-5" id="firstPunicWarMapImg">
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="text-center">
                    <button
                        id="firstFunFactButton"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => displayFunFact('first')}
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
                                Section 2: The Second Punic War
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", backgroundColor: "rgb(224, 224, 224)" }} className={`content ${isSecondSectionCollapsed ? 'collapse' : ''}`}>
                <div className="row featurette justify-content-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1" id="secondPunicWarMapImgTitle"></h2>
                        <p className="lead" id="secondPunicWarMapImgDescription"></p>
                    </div>
                    <div className="col-md-5" id="secondPunicWarMapImg">
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="text-center">
                    <button
                        id="secondFunFactButton"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => displayFunFact('second')}
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
                                Section 3: The Third Punic War
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", backgroundColor: "rgb(224, 224, 224)" }} className={`content ${isThirdSectionCollapsed ? 'collapse' : ''}`}>
                <div className="row featurette justify-content-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1" id="thirdPunicWarMapImgTitle"></h2>
                        <p className="lead" id="thirdPunicWarMapImgDescription"></p>
                    </div>
                    <div className="col-md-5" id="thirdPunicWarMapImg">
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="text-center">
                    <button
                        id="thirdFunFactButton"
                        style={{ backgroundColor: "rgb(228, 224, 224)", borderRadius: "10px" }}
                        onClick={() => displayFunFact('third')}
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
                                <u>The Punic Wars Quiz</u>
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

export default PunicWarsView;