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

	// Creating the minutes digits.
	const minutesLeft = document.createElement("span");
	const minutesRight = document.createElement("span");

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

	// Creating the seconds digits.
	const secondsLeft = document.createElement("span");
	const secondsRight = document.createElement("span");

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
		const currTimeUTC = new Date(currTime.toUTCString());
		const clockTime = currTimeUTC;

		clockTime.setHours(clockTime.getHours() + zoneGMT);
		const digitalTimeText = clockTime.toUTCString().split(" ")[4];

		console.log(currTime.toUTCString());
		// Getting the digits information
		const hours = "00"; //digitalTimeText.split(":")[0];
		const minutes = "00"; //digitalTimeText.split(":")[1];
		const seconds = "00"; //digitalTimeText.split(":")[2];

		if (hours > 10) {
			hoursLeft.innerHTML = hours[0];
			hoursRight.innerHTML = hours[1];
		} else {
			hoursLeft.innerHTML = "0";
			hoursRight.innerHTML = hours;
		}

		if (minutes > 10) {
			minutesLeft.innerHTML = minutes[0];
			minutesRight.innerHTML = minutes[1];
		} else {
			minutesLeft.innerHTML = "0";
			minutesRight.innerHTML = minutes;
		}

		if (seconds > 10) {
			secondsLeft.innerHTML = seconds[0];
			secondsRight.innerHTML = seconds[1];
		} else {
			secondsLeft.innerHTML = "0";
			secondsRight.innerHTML = seconds;
		}
	};

	setInterval(clock, timeInterval);
};

clockCreator("israel-jerusalem-time", 1000, 2);
clockCreator("argentina-buenos-aires-time", 1000, -3);
clockCreator("usa-washington-time", 1000, -5);
clockCreator("new-zealand-wellington-time", 1000, 13);
