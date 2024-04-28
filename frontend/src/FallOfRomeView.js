import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const FallOfRomeView = ({
    switchToTimelineView,
    switchToRiseofRomeView,
    switchToPunicWarsView,
    switchToFallofRomeView,
    switchToStudentView,
    switchToInventoryView
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
        const crisisButton = document.getElementById("crisisFunFactButton");
        const riseButton = document.getElementById("riseFunFactButton");
        const fallButton = document.getElementById("fallFunFactButton");

        crisisButton.addEventListener("mouseover", handleMouseOver);
        crisisButton.addEventListener("mouseleave", handleMouseLeave);

        riseButton.addEventListener("mouseover", handleMouseOver);
        riseButton.addEventListener("mouseleave", handleMouseLeave);

        fallButton.addEventListener("mouseover", handleMouseOver);
        fallButton.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            crisisButton.removeEventListener("mouseover", handleMouseOver);
            crisisButton.removeEventListener("mouseleave", handleMouseLeave);

            riseButton.removeEventListener("mouseover", handleMouseOver);
            riseButton.removeEventListener("mouseleave", handleMouseLeave);

            fallButton.removeEventListener("mouseover", handleMouseOver);
            fallButton.removeEventListener("mouseleave", handleMouseLeave);
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
            imge.innerHTML = `<img src=${img}  alt=${title} height="300" style="margin-top: 100px; margin-left:30px"></img>`;

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
            <div style={{ backgroundColor: "rgb(33, 37, 41)", display: "flex", justifyContent: "center", height: "80px" }}>
                <button
                    className="text-white text-sm p-1 focus:outline-none"
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
                    className="text-white text-sm p-1 focus:outline-none"
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
                    className="text-white text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px" }}
                    onClick={switchToStudentView}
                >
                    Information about the Students
                </button>
                <button
                    className="text-white text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px" }}
                    onClick={switchToInventoryView}
                >
                    Inventory
                </button>
            </div>

            <br></br>

            <div className="header" style={{ padding: "20px" }}>
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                    <font size="+20"><u>The Fall of Rome</u></font>
                </h1>
                <br></br>
                <h2 className="lead" style={{ fontSize: "30px", maxWidth: "1000px", margin: "0 auto" }}>
                On this webpage, it will go over some of the key events that lead to the collapse of the Roman
                    Empire, such as:
                    <ul>
                        <li>The Crisis of the Third Century</li>
                        <li>The Rise of the Eastern Empire</li>
                        <li>The Fall of Rome</li>
                    </ul>
                    While reading through the page, there will be a fun fact button at the end of each event description
                    to make learning about the collapse
                    the Roman Empire a little more interesting. There will also be a quiz at the end of the webpage to
                    test your understanding of the events
                    that lead to the demise of Rome.
                </h2>
            </div>

            <br></br>
            <br></br>

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
                    <button
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
                    <button
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
                    <button
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
                                <u>The Fall of Rome Quiz</u>
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

export default FallOfRomeView;