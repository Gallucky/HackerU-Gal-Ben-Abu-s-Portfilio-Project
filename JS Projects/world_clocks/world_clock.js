// World Clock

const clockCreator = (name, id, timeInterval, zoneGMT) => {
	if (zoneGMT < -12 || zoneGMT > 14) {
		return undefined;
	}

	// Creating the clock's div that will contain all of the components / elements.
	const clockDiv = document.createElement("div");
	clockDiv.classList.add("clock");

	// The clock title as an h1 header.
	const clockTitle = document.createElement("h1");
	clockTitle.innerHTML = name;

	// The clock value as an h2 header.
	const clockHeader = document.createElement("h2");
	clockHeader.id = id;

	// Creating the hours digits.
	const hoursLeft = document.createElement("span");
	const hoursRight = document.createElement("span");

	hoursLeft.innerHTML = "0";
	hoursRight.innerHTML = "0";

	// Setting the hours digits ids.
	hoursLeft.id = "hours-left";
	hoursRight.id = "hours-right";

	// Adding to the hours the digit class for general digit styling.
	hoursLeft.classList.add("digit");
	hoursRight.classList.add("digit");

	// Hours and minutes separator.
	const hoursMinutesSeparator = document.createElement("span");
	hoursMinutesSeparator.classList.add("clock-separator");
	hoursMinutesSeparator.id = "hours-minutes-separator";
	hoursMinutesSeparator.innerHTML = ":";

	// Creating the minutes digits.
	const minutesLeft = document.createElement("span");
	const minutesRight = document.createElement("span");

	minutesLeft.innerHTML = "0";
	minutesRight.innerHTML = "0";

	// Setting the minutes digits ids.
	minutesLeft.id = "minutes-left";
	minutesRight.id = "minutes-right";

	// Adding to the minutes the digit class for general digit styling.
	minutesLeft.classList.add("digit");
	minutesRight.classList.add("digit");

	// Minutes and seconds separator.
	const minutesSecondsSeparator = document.createElement("span");
	minutesSecondsSeparator.classList.add("clock-separator");
	minutesSecondsSeparator.id = "minutes-seconds";
	minutesSecondsSeparator.innerHTML = ":";

	// Creating the seconds digits.
	const secondsLeft = document.createElement("span");
	const secondsRight = document.createElement("span");

	secondsLeft.innerText = "0";
	secondsRight.innerText = "0";

	// Setting the seconds digits ids.
	secondsLeft.id = "seconds-left";
	secondsRight.id = "seconds-right";

	// Adding to the seconds the digit class for general digit styling.
	secondsLeft.classList.add("digit");
	secondsRight.classList.add("digit");

	// Appending the time elements to the header.
	clockHeader.appendChild(hoursLeft);
	clockHeader.appendChild(hoursRight);
	clockHeader.appendChild(hoursMinutesSeparator);
	clockHeader.appendChild(minutesLeft);
	clockHeader.appendChild(minutesRight);
	clockHeader.appendChild(minutesSecondsSeparator);
	clockHeader.appendChild(secondsLeft);
	clockHeader.appendChild(secondsRight);

	const clock = () => {
		// Basing to GMT 0 / Z time zone.
		const currTime = new Date();
		const currTimeClockFormat = currTime.toUTCString().split(" ")[4];

		// Getting the digits information
		let hours = Number(currTimeClockFormat.split(":")[0]) + zoneGMT;
		if (hours >= 24) {
			hours -= 24;
		}
		hours = "" + hours;
		const minutes = currTimeClockFormat.split(":")[1];
		const seconds = currTimeClockFormat.split(":")[2];

		console.log(`Name: ${name} Hours: ${hours} Minutes: ${minutes} Seconds: ${seconds}`);

		if (hours.length === 2) {
			hoursLeft.innerHTML = hours[0];
			hoursRight.innerHTML = hours[1];
		} else {
			hoursLeft.innerHTML = "0";
			hoursRight.innerHTML = hours;
		}

		if (minutes.length === 2) {
			minutesLeft.innerHTML = minutes[0];
			minutesRight.innerHTML = minutes[1];
		} else {
			minutesLeft.innerHTML = "0";
			minutesRight.innerHTML = minutes;
		}

		if (seconds.length === 2) {
			secondsLeft.innerHTML = seconds[0];
			secondsRight.innerHTML = seconds[1];
		} else {
			secondsLeft.innerHTML = "0";
			secondsRight.innerHTML = seconds;
		}
	};

	clockDiv.appendChild(clockTitle);
	clockDiv.appendChild(clockHeader);

	document.body.appendChild(clockDiv);

	setInterval(clock, timeInterval);
};

clockCreator("Israel/Jerusalem", "israel-jerusalem-time", 1000, 2);
clockCreator("Argentina/Buenos Aires", "argentina-buenos-aires-time", 1000, -3);
clockCreator("USA/Washington", "usa-washington-time", 1000, -5);
clockCreator("New Zealand/Wellington", "new-zealand-wellington-time", 1000, 13);
