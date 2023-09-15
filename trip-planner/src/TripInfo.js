function TripInfo({time, setTime, tripTitle, setTripTitle, onStartCountdownClick}) {

  const whereToClass = 'whereto' + ((!tripTitle) ? ' need-data' : '');

  return (
    <div className="TripBasics">
      <div>
        <h1>Plan Your Trip!</h1>
      </div>
      <div id="border-div">
        <div>
          <label for="leave-time">When are you leaving?</label>
          <br />
          <input class="leave-time" id="time-to-leave" type="time" value={time} onChange={e => setTime(e.target.value)} />
          <br />
        </div>
        <div>
          <label for="where-to">Where are you going?</label>
          <br />
          <input
            class={whereToClass}
            id="trip-title"
            type="text"
            placeholder="Trip to the Zoo!"
            value={tripTitle}
            onChange={e => setTripTitle(e.target.value)}></input>
          <br />
        </div>
      </div>
      <div id="start-trip-container">
        <button id="start-trip-prep" onClick={onStartCountdownClick}>Start Trip Countdown!</button>
      </div>
    </div>
  );
}

export default TripInfo;
