const SECONDS = 1000;
const MINUTES = 60;
const HOURS = 60;
const DAYS = 24;
const MILLISECOND_TO_MINUTE = 60000;

export default class Timer extends Template {
  constructor() {
    super('Timer');

    this.timerIntervalID = null;
    this.endTime = new Date();
    this.timerText = this.fragment.querySelector('#timerText');
    this.workInterval = 25;
    this.breakInterval = 5;

    // buttons
    this.stopButton = this.fragment.querySelector('#stopTimer');
    this.stopButton.onclick = () => this.stopTimer();

    this.startWorkButton = this.fragment.querySelector('#startWork');
    this.startWorkButton.onclick = () => this.startTimer(true);

    this.startBreakButton = this.fragment.querySelector('#startBreak');
    this.startBreakButton.onclick = () => this.startTimer(false);
  }

  updateTimeText(timerThis) {
    // get current time and end time
    let currentTime = new Date();

    // get time difference to parse and update time text with
    let timeDiff = timerThis.endTime.getTime() - currentTime.getTime();

    if (timeDiff <= 0) {
      timerThis.stopTimer();
      return;
    }

    // calculate seconds
    let secondsDiff = timeDiff / SECONDS;
    let seconds = Math.floor(secondsDiff % MINUTES);

    // calculate minutes
    let minutesDiff = secondsDiff / MINUTES;
    let minutes = Math.floor(minutesDiff % HOURS);

    // update text
    let newTimeText = `${minutes < 10 ? `0${minutes}` : minutes}m ${
      seconds < 10 ? `0${seconds}` : seconds
    }s`;
    timerThis.timerText.innerText = newTimeText;
    document.title = `PT: ${newTimeText}`;
  }

  startTimer(isWork) {
    // clear interval if one exists
    if (this.timerIntervalID) {
      clearInterval(this.timerIntervalID);
    }

    // check if new timer is work or break timer
    if (isWork) {
      this.endTime = this.getNewWorkTime();
    } else {
      this.endTime = this.getNewBreakTime();
    }

    // start timer
    this.timerIntervalID = setInterval(this.updateTimeText, 1000, this);
  }

  stopTimer() {
    // clear interval if it exists
    if (this.timerIntervalID) {
      clearInterval(this.timerIntervalID);
    }

    // reset timer text
    this.timerText.innerText = '00m 00s';
    document.title = 'Pomodoro Timer';
  }

  // returns a new DateTime object with the new endTime adjusted for workInterval
  getNewWorkTime() {
    return new Date(
      new Date().getTime() + this.workInterval * MILLISECOND_TO_MINUTE
    );
  }

  // returns a new DateTime object with the new endTime adjusted for breakInterval
  getNewBreakTime() {
    return new Date(
      new Date().getTime() + this.breakInterval * MILLISECOND_TO_MINUTE
    );
  }
}
