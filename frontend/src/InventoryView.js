import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const InventoryView = ({
    switchToTimelineView,
    switchToRiseofRomeView,
    switchToPunicWarsView,
    switchToFallofRomeView,
    switchToStudentView,
    switchToInventoryView,
    theEvents
}) => {
    const [index, setIndex] = useState(0);

    // Function to review products like carousel
    function getOneByOneEventNext() {
        if (theEvents.length > 0) {
            if (index === theEvents.length - 1) setIndex(0);
            else setIndex(index + 1);
        }
    }

    // Function to review products like carousel
    function getOneByOneEventPrev() {
        if (theEvents.length > 0) {
            if (index === 0) setIndex(theEvents.length - 1);
            else setIndex(index - 1);
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
                    className="text-white text-sm p-1 focus:outline-none"
                    style={{ marginLeft: "90px", height: "35px", marginTop: "20px", background: "none", border: "none", fontSize: "20px" }}
                    onClick={switchToInventoryView}
                >
                    Learn More
                </button>
            </div>

            <br></br>

            <div className="header" style={{ padding: "20px" }}>
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                    <font size="+20"><u>Your Inventory</u></font>
                </h1>
                <br></br>
                <h2 className="lead" style={{ fontSize: "30px", maxWidth: "1000px", margin: "0 auto" }}>
                    In this view, you'll be able to see the events that you added into your "cart" so that you can learn more about them. Click the 
                    <b> Next </b> and <b> Previous </b> buttons to cycle through all of the events that you added. If you don't want to learn anymore
                    about an event, click the <b> Delete </b> button to remove it from your queue. If you want to update the text of a product, then
                    click the <b> Update </b> after inputting the change that you want to make.
                </h2>
            </div>

            <br></br>
            <br></br>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => getOneByOneEventNext()}>Next</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => getOneByOneEventPrev()}>Prev</button>
            </div>

            <br></br>
            <br></br>

            <div className="container mt-3">
                <div className="row justify-content-center">
                    {theEvents.length > 0 && ( // don't render the event card if there is nothing in the "theEvents" array
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
                            <div className="card">
                                <img src={theEvents[index].image} className="card-img-top" alt={theEvents[index].title} style={{ objectFit: 'cover', height: '200px' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{theEvents[index].title}</h5>
                                    <p className="card-text"><b>Category:</b> {theEvents[index].category}</p>
                                    <p className="card-text"><b>Where to learn more:</b></p>
                                    <p className="card-text">{theEvents[index].description}</p>
                                    <ul className="list-unstyled">
                                        {theEvents[index].sites.map((site, siteIndex) => (
                                            <li key={siteIndex}><span>&#8226;</span>&nbsp;
                                                <a href={site.url} target="_blank" rel="noopener noreferrer">{site.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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

export default InventoryView;