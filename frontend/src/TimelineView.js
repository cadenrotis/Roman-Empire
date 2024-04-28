import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const TimelineView = ({
    switchToTimelineView,
    switchToRiseofRomeView,
    switchToPunicWarsView,
    switchToFallofRomeView,
    switchToStudentView,
    switchToInventoryView
}) => {

    useEffect(() => {
        fetch("./data.json")
            .then(response => response.json())
            .then(imageResult => load(imageResult))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // inputting all data for the timeline webpage from the JSON file
    function load(imageResult) {
        // elements of the summary the founding of rome
        let img1 = document.getElementById("foundingTimelineImg");
        let text1 = document.getElementById("foundingTimelineText");
        let title1 = document.getElementById("foundingTimelineTitle");
        img1.innerHTML = "";
        text1.innerHTML = "";
        title1.innerHTML = "";

        // elements of the summary of the start of the roman republic
        let img2 = document.getElementById("startTimelineImg");
        let text2 = document.getElementById("startTimelineText");
        let title2 = document.getElementById("startTimelineTitle");
        img2.innerHTML = "";
        text2.innerHTML = "";
        title2.innerHTML = "";

        // elements of the summary of the settlement of the latin war
        let img3 = document.getElementById("settlementTimelineImg");
        let text3 = document.getElementById("settlementTimelineText");
        let title3 = document.getElementById("settlementTimelineTitle");
        img3.innerHTML = "";
        text3.innerHTML = "";
        title3.innerHTML = "";

        // elements of the summary of the first punic war
        let img4 = document.getElementById("firstPunicWarTimelineImg");
        let text4 = document.getElementById("firstPunicWarTimelineText");
        let title4 = document.getElementById("firstPunicWarTimelineTitle");
        img4.innerHTML = "";
        text4.innerHTML = "";
        title4.innerHTML = "";

        // elements of the summary of the second punic war
        let img5 = document.getElementById("secondPunicWarTimelineImg");
        let text5 = document.getElementById("secondPunicWarTimelineText");
        let title5 = document.getElementById("secondPunicWarTimelineTitle");
        img5.innerHTML = "";
        text5.innerHTML = "";
        title5.innerHTML = "";

        // elements of the summary of the third punic war
        let img6 = document.getElementById("thirdPunicWarTimelineImg");
        let text6 = document.getElementById("thirdPunicWarTimelineText");
        let title6 = document.getElementById("thirdPunicWarTimelineTitle");
        img6.innerHTML = "";
        text6.innerHTML = "";
        title6.innerHTML = "";

        // elements of the summary of the crisis of the third century
        let img7 = document.getElementById("crisisTimelineImg");
        let text7 = document.getElementById("crisisTimelineText");
        let title7 = document.getElementById("crisisTimelineTitle");
        img7.innerHTML = "";
        text7.innerHTML = "";
        title7.innerHTML = "";

        // elements of the summary of the rise of the eastern empire
        let img8 = document.getElementById("riseTimelineImg");
        let text8 = document.getElementById("riseTimelineText");
        let title8 = document.getElementById("riseTimelineTitle");
        img8.innerHTML = "";
        text8.innerHTML = "";
        title8.innerHTML = "";

        // elements of the summary of the fall of rome
        let img9 = document.getElementById("fallTimelineImg");
        let text9 = document.getElementById("fallTimelineText");
        let title9 = document.getElementById("fallTimelineTitle");
        img9.innerHTML = "";
        text9.innerHTML = "";
        title9.innerHTML = "";

        for (var i = 0; i < imageResult.timeline.length; i++) {
            let img = imageResult.timeline[i].image;
            let textt = imageResult.timeline[i].text;
            let title = imageResult.timeline[i].titleImg;
            //let url = imageResult.timeline[i].link;

            // get the image and put into a div element
            let imge = document.createElement("div");
            //imge.innerHTML = `<a href=${url}> <img src=${img}  alt=${title} height="300" style="margin-top: 100px; margin-left:30px"></a>`;
            imge.innerHTML = `<img src=${img}  alt=${title} height="300" style="margin-top: 100px; margin-left:30px">`;

            // get text information from the JSON file and put into a p element
            let txt = document.createElement("p");
            txt.innerHTML = `<p class="lead" style="font-size: 40px">${textt}</p>`;

            // get title information from the JSON file and put into a h2 element
            let subject = document.createElement("h2");
            subject.innerHTML = `<h2 class="featurette-heading fw-normal lh-1"><strong>${title}</strong></h2>`;

            // place images, text, and descriptions onto webpages
            if (imageResult.timeline[i].imageId === "foundingTime") {
                img1.appendChild(imge);
                text1.appendChild(txt);
                title1.appendChild(subject);
            }
            else if (imageResult.timeline[i].imageId === "startOfRepublicTime") {
                img2.appendChild(imge);
                text2.appendChild(txt);
                title2.appendChild(subject);
            }
            else if (imageResult.timeline[i].imageId === "settlementLatinWarTime") {
                img3.appendChild(imge);
                text3.appendChild(txt);
                title3.appendChild(subject);
            }
            else if (imageResult.timeline[i].imageId === "firstpunicwarTime") {
                img4.appendChild(imge);
                text4.appendChild(txt);
                title4.appendChild(subject);
            }
            else if (imageResult.timeline[i].imageId === "secondpunicwarTime") {
                img5.appendChild(imge);
                text5.appendChild(txt);
                title5.appendChild(subject);
            }
            else if (imageResult.timeline[i].imageId === "thirdpunicwarTime") {
                img6.appendChild(imge);
                text6.appendChild(txt);
                title6.appendChild(subject);
            }
            else if (imageResult.timeline[i].imageId === "crisisTime") {
                img7.appendChild(imge);
                text7.appendChild(txt);
                title7.appendChild(subject);
            }
            else if (imageResult.timeline[i].imageId === "riseEasternEmpireTime") {
                img8.appendChild(imge);
                text8.appendChild(txt);
                title8.appendChild(subject);
            }
            else if (imageResult.timeline[i].imageId === "fallTime") {
                img9.appendChild(imge);
                text9.appendChild(txt);
                title9.appendChild(subject);
            }
        }
    }

    return (
        <div>
            <div style={{ backgroundColor: "rgb(0, 128, 255)", display: "flex", justifyContent: "center", height: "80px" }}>
                <button
                    className="text-white text-sm p-1 focus:outline-none"
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
                    className="text-black text-sm p-1 focus:outline-none"
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
                    <font size="+20"><u>Timeline of the Roman Empire</u></font>
                </h1>
                <br></br>
                <h2 className="lead" style={{ fontSize: "30px", maxWidth: "1000px", margin: "0 auto" }}>
                    In this view, it will show the timeline of important events that took place during the existence of the Roman Empire. As you navigate through
                    the timeline, you can <strong>click on the visual of a particular event </strong> to get redirected to the webpage that contains information
                    about that event.
                </h2>
            </div>

            <div>
                <div id="foundingTimelineImg" style={{ textAlign: "center" }}></div>
                <div id="foundingTimelineTitle" style={{ textAlign: "center" }}></div>
                <div id="foundingTimelineText" style={{ textAlign: "center" }}></div>

                <h1 style={{ textAlign: "center", fontSize: "90px" }}>↓</h1>

                <div id="startTimelineImg" style={{ textAlign: "center" }}></div>
                <div id="startTimelineTitle" style={{ textAlign: "center" }}></div>
                <div id="startTimelineText" style={{ textAlign: "center" }}></div>

                <h1 style={{ textAlign: "center", fontSize: "90px" }}>↓</h1>

                <div id="settlementTimelineImg" style={{ textAlign: "center" }}></div>
                <div id="settlementTimelineTitle" style={{ textAlign: "center" }}></div>
                <div id="settlementTimelineText" style={{ textAlign: "center" }}></div>

                <h1 style={{ textAlign: "center", fontSize: "90px" }}>↓</h1>

                <div id="firstPunicWarTimelineImg" style={{ textAlign: "center" }}></div>
                <div id="firstPunicWarTimelineTitle" style={{ textAlign: "center" }}></div>
                <div id="firstPunicWarTimelineText" style={{ textAlign: "center" }}></div>

                <h1 style={{ textAlign: "center", fontSize: "90px" }}>↓</h1>

                <div id="secondPunicWarTimelineImg" style={{ textAlign: "center" }}></div>
                <div id="secondPunicWarTimelineTitle" style={{ textAlign: "center" }}></div>
                <div id="secondPunicWarTimelineText" style={{ textAlign: "center" }}></div>

                <h1 style={{ textAlign: "center", fontSize: "90px" }}>↓</h1>

                <div id="thirdPunicWarTimelineImg" style={{ textAlign: "center" }}></div>
                <div id="thirdPunicWarTimelineTitle" style={{ textAlign: "center" }}></div>
                <div id="thirdPunicWarTimelineText" style={{ textAlign: "center" }}></div>

                <h1 style={{ textAlign: "center", fontSize: "90px" }}>↓</h1>

                <div id="crisisTimelineImg" style={{ textAlign: "center" }}></div>
                <div id="crisisTimelineTitle" style={{ textAlign: "center" }}></div>
                <div id="crisisTimelineText" style={{ textAlign: "center" }}></div>

                <h1 style={{ textAlign: "center", fontSize: "90px" }}>↓</h1>

                <div id="riseTimelineImg" style={{ textAlign: "center" }}></div>
                <div id="riseTimelineTitle" style={{ textAlign: "center" }}></div>
                <div id="riseTimelineText" style={{ textAlign: "center" }}></div>

                <h1 style={{ textAlign: "center", fontSize: "90px" }}>↓</h1>

                <div id="fallTimelineImg" style={{ textAlign: "center" }}></div>
                <div id="fallTimelineTitle" style={{ textAlign: "center" }}></div>
                <div id="fallTimelineText" style={{ textAlign: "center" }}></div>
            </div>

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

export default TimelineView;