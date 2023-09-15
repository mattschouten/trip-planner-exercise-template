import { useState, useEffect } from "react";

function CountdownPage({time, tripTitle}) {
    const [newTaskText, setNewTaskText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(time));
    const [secondsLeft, setSecondsLeft] = useState(calculateSecondsLeft(time));
    const encouragement = "Let's go!";

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(time));
            setSecondsLeft(calculateSecondsLeft(time));
        }, 500);
        return () => {
          clearInterval(interval);
        };
      }, [time]);

    function encouragementAreaClasses() {
        const classes = ["encouragementArea"];
        if (secondsLeft < 60) { classes.push("encouragementAreaRed"); }
        if (secondsLeft < 300) { classes.push("encouragementAreaYellow"); }
        if (secondsLeft >= 300) { classes.push("encouragementAreaGreen") };

        return classes.join(' ');
    }

    function checkEnterKey(event) {
        if (event.key && event.key === 'Enter') {
            addNewTask();
        };
    }

    function addNewTask() {
        setTasks([...tasks, {text: newTaskText, done: false}]);
        setNewTaskText('');
    }

    function changeCheckbox(event) {
        const updatedTasks = Array.from(tasks);
        const index = event.target.id.match(/\d/)[0];

        updatedTasks[index].done = event.target.checked;
        setTasks(updatedTasks);
    }

    const listItems = tasks.map((task, index) => {
        let itemClass = "taskItem";
        if (task?.done) {
            itemClass += " done";
        }

        const id = `taskCheckbox_${index}`;

        return (
            <li className={itemClass} key={index}>
                <input
                    type="checkbox"
                    id={id}
                    onChange={changeCheckbox}
                    checked={task.done}
                />
                <label htmlFor={id}>{task.text}</label>
            </li>
        );
    });

    return (
        <div class="CountdownPage">
            <h1>{tripTitle}</h1>
            <div class={"timeInfo" + getTimeInfoColorClass(secondsLeft)}>
                <div>Out the door at {niceHumanTime(time)}</div>
                <div>{timeLeft} LEFT!</div>
            </div>
            <div class="otherStuff">
                <div>
                    <h2>Things Left To Do</h2>
                </div>
                <div>
                    <ul>
                        {listItems}
                    </ul>
                </div>

                <div>
                    <input
                        class="newTask"
                        placeholder="Add tasks here"
                        value={newTaskText}
                        onChange={e => setNewTaskText(e.target.value)}
                        onKeyDown={checkEnterKey}
                    />
                    <button onClick={addNewTask}>+</button>
                </div>
                <div className={encouragementAreaClasses()}>
                    {encouragement}
                </div>
            </div>
        </div>
    );
}

function niceHumanTime(time) {
    const now = new Date();

    const [hours, minutes] = time.split(':');

    now.setHours(hours);
    now.setMinutes(minutes);

    return now.toLocaleString('en-us', {hour: 'numeric', minute: 'numeric', hour12: true});
}

function calculateTimeLeft(time) {
    const now = new Date();
    const then = new Date();

    const [hours, minutes] = time.split(':');

    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(0);

    let secondsLeft = (now - then) / 1000; // millis

    if (secondsLeft > 3600) {
        let hours = Math.floor(secondsLeft / 3600);
        let minutes = Math.floor((secondsLeft % 3600) / 60);

        return `${hours} Hours and ${minutes} minutes`;
    } else if (secondsLeft > 60) {
        let minutes = Math.floor(secondsLeft / 60);
        let seconds = Math.floor((secondsLeft % 60));

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    return `${secondsLeft} SECONDS`;
}

function calculateSecondsLeft(time) {
    const departureTime = new Date();
    const currentTime = new Date();

    const [hours, minutes] = time.split(':');

    departureTime.setHours(hours);
    departureTime.setMinutes(minutes);
    departureTime.setSeconds(0);

    return Math.floor((departureTime - currentTime) / 1000); // millis to seconds
}

function getTimeInfoColorClass(secondsLeft) {
    if (secondsLeft < 60) { return " timeInfoRed"; }
    else if (secondsLeft < 300) { return " timeInfoYellow"; }
    else { return " timeInfoGreen"; }
}

export default CountdownPage;
