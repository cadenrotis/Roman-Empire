import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import TimelineView from "./TimelineView.js";
import RiseOfRomeView from "./RiseOfRomeView.js";
import PunicWarsView from "./PunicWarsView.js";
import FallOfRomeView from "./FallOfRomeView.js";
import StudentView from "./StudentView.js";
import InventoryView from "./InventoryView.js"

const Frontend = () => {
    // global states to handle the switching of views on the webpage
    const [timelineView, setTimelineView] = useState(true); // the default view
    const [riseofRomeView, setRiseofRomeView] = useState(false);
    const [punicWarsView, setPunicWarsView] = useState(false);
    const [fallofRomeView, setFallofRomeVieww] = useState(false);
    const [studentView, setStudentView] = useState(false);
    const [inventoryView, setInventoryView] = useState(false);

    // functions that handle the switching between the three views
    const switchToTimelineView = () => {
        if (timelineView === false) setTimelineView(true);

        setRiseofRomeView(false);
        setPunicWarsView(false);
        setFallofRomeVieww(false);
        setStudentView(false);
        setInventoryView(false);
    };

    const switchToRiseofRomeView = () => {
        if (riseofRomeView === false) setRiseofRomeView(true);

        setTimelineView(false);
        setPunicWarsView(false);
        setFallofRomeVieww(false);
        setStudentView(false);
        setInventoryView(false);
    };

    const switchToPunicWarsView = () => {
        if (punicWarsView === false) setPunicWarsView(true);

        setTimelineView(false);
        setRiseofRomeView(false);
        setFallofRomeVieww(false);
        setStudentView(false);
        setInventoryView(false);
    };

    const switchToFallofRomeView = () => {
        if (fallofRomeView === false) setFallofRomeVieww(true);

        setTimelineView(false);
        setRiseofRomeView(false);
        setPunicWarsView(false);
        setStudentView(false);
        setInventoryView(false);
    };

    const switchToStudentView = () => {
        if (studentView === false) setStudentView(true);

        setTimelineView(false);
        setRiseofRomeView(false);
        setPunicWarsView(false);
        setFallofRomeVieww(false);
        setInventoryView(false);
    };

    const switchToInventoryView = () => {
        if (inventoryView === false) setInventoryView(true);

        setTimelineView(false);
        setRiseofRomeView(false);
        setPunicWarsView(false);
        setFallofRomeVieww(false);
        setStudentView(false);
    };

    return (<div>
        {timelineView &&
            <TimelineView
                switchToTimelineView={switchToTimelineView}
                switchToRiseofRomeView={switchToRiseofRomeView}
                switchToPunicWarsView={switchToPunicWarsView}
                switchToFallofRomeView={switchToFallofRomeView}
                switchToStudentView={switchToStudentView}
                switchToInventoryView={switchToInventoryView}
            />}
        {riseofRomeView && (
            <RiseOfRomeView
                switchToTimelineView={switchToTimelineView}
                switchToRiseofRomeView={switchToRiseofRomeView}
                switchToPunicWarsView={switchToPunicWarsView}
                switchToFallofRomeView={switchToFallofRomeView}
                switchToStudentView={switchToStudentView}
                switchToInventoryView={switchToInventoryView}
            />
        )}
        {punicWarsView &&
            <PunicWarsView
                switchToTimelineView={switchToTimelineView}
                switchToRiseofRomeView={switchToRiseofRomeView}
                switchToPunicWarsView={switchToPunicWarsView}
                switchToFallofRomeView={switchToFallofRomeView}
                switchToStudentView={switchToStudentView}
                switchToInventoryView={switchToInventoryView}
            />}
        {fallofRomeView &&
            <FallOfRomeView
                switchToTimelineView={switchToTimelineView}
                switchToRiseofRomeView={switchToRiseofRomeView}
                switchToPunicWarsView={switchToPunicWarsView}
                switchToFallofRomeView={switchToFallofRomeView}
                switchToStudentView={switchToStudentView}
                switchToInventoryView={switchToInventoryView}
            />}
        {studentView &&
            <StudentView
                switchToTimelineView={switchToTimelineView}
                switchToRiseofRomeView={switchToRiseofRomeView}
                switchToPunicWarsView={switchToPunicWarsView}
                switchToFallofRomeView={switchToFallofRomeView}
                switchToStudentView={switchToStudentView}
                switchToInventoryView={switchToInventoryView}
            />}
        {inventoryView &&
            <InventoryView
                switchToTimelineView={switchToTimelineView}
                switchToRiseofRomeView={switchToRiseofRomeView}
                switchToPunicWarsView={switchToPunicWarsView}
                switchToFallofRomeView={switchToFallofRomeView}
                switchToStudentView={switchToStudentView}
                switchToInventoryView={switchToInventoryView}
            />}
    </div>);
}

export default Frontend;