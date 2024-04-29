import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const InventoryView = ({
    switchToTimelineView,
    switchToRiseofRomeView,
    switchToPunicWarsView,
    switchToFallofRomeView,
    switchToStudentView,
    switchToInventoryView,
    theEvents,
    setTheEvents
}) => {
    // hook to contain the logic for showing and hiding the input bar for inputting modified notes for the desired event
    const [showNotesInput, setShowNotesInput] = useState(false);

    // hook to keep track of the current index of theEvents array
    const [index, setIndex] = useState(0);

    // Function to view next event
    function getOneByOneEventNext() {
        if (theEvents.length > 0) {
            if (index === theEvents.length - 1) setIndex(0);
            else setIndex(index + 1);
        }
    }

    // Function to view previous event
    function getOneByOneEventPrev() {
        if (theEvents.length > 0) {
            if (index === 0) setIndex(theEvents.length - 1);
            else setIndex(index - 1);
        }
    }

    // Function to delete selected event from the database
    function deleteEvent() {
        // Get the id of the currently selected event
        let id = theEvents[index].id;
        console.log(id);

        // Make the DELETE request
        fetch(`http://localhost:8081/deleteEvent/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
            .then(response => response.json())
            .then(() => {
                alert("Event has successfully been deleted!");

                // Read the data of events from the modified database:
                fetch("http://localhost:8081/listEvents")
                    .then(response => response.json())
                    .then(events => {
                        setTheEvents(events);
                        setIndex(0);
                    });
            })
            .catch(error => console.error('Error deleting event:', error));
    }

    // Function to update the text of the selected event from the database
    function updateEvent() {
        setShowNotesInput(true);
    }

    // update the text of the requested event
    function updateEventNotes() {
        // Get the id of the currently selected event
        let id = theEvents[index].id;
        console.log(id);

        let updatedNotes = document.getElementById("updatedEventText").value;

        // Make the PUT request
        fetch(`http://localhost:8081/updateEvent/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
                {
                    "notes": updatedNotes
                }
            )
        })
            .then(response => response.json())
            .then(() => {
                alert("Event's notes has successfully been updated");
                setShowNotesInput(false); // Hide the input to change an event's notes

                // Read the data of events from the modified database:
                fetch("http://localhost:8081/listEvents")
                    .then(response => response.json())
                    .then(events => setTheEvents(events));
            })
            .catch(error => console.error('Error deleting event:', error));
    }

    // updating the event's text was canceled, so don't show the update input bar anymore
    function cancelTheUpdate() {
        setShowNotesInput(false); // Hide the input to change an event's notes
    }

    // find the index of the searchd event and set it to the hook to change the view to that event
    function findSearchedEvent() {
        let requestedEvent = document.getElementById("searchedEvent").value;
        console.log(requestedEvent);

        // find the index of the searched event
        for (let i = 0; i < theEvents.length; i++) {
            if (theEvents[i].title === requestedEvent) {
                setIndex(i);
            }
        }

        // Clear the input field after search
        document.getElementById("searchedEvent").value = "";
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

            {/* The header and description of the view */}
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

            {/* The search input bar and buttons to switch between the events in the theEvents array */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="text" id="searchedEvent" placeholder="Search for an Event" style={{ width: "300px" }} />
                <button onClick={findSearchedEvent}>Search</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => getOneByOneEventNext()}>Next</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => getOneByOneEventPrev()}>Prev</button>
            </div>

            <br></br>
            <br></br>

            {/* Shows the events in the theEvents array */}
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
                                    <p className="card-text"><b>Notes:</b> {theEvents[index].notes}</p>
                                    <br></br>
                                    {/* Buttons to delete the event or update the event's notes; located at the bottom of the event card */}
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <button onClick={() => deleteEvent()}>Delete</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button onClick={() => updateEvent()}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <br></br>
            <br></br>

            {/* When the user hits the update button, the search input for updating the event's notes will appear */}
            {showNotesInput && (
                <>
                    <p style={{ fontSize: "20px", textAlign: "center" }}>Input new notes for the event:</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <input type="text" id="updatedEventText" placeholder="Enter new text" />
                        <button onClick={updateEventNotes}>Update notes for Event</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={cancelTheUpdate}>Cancel</button>
                    </div>
                </>
            )}

            <br></br>

            {/* Footeer */}
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