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

    //#region | Hours |
    // Creating the hours digits.
    const hoursLeft = document.createElement("div");
    const hoursRight = document.createElement("div");
    // Adding the relevant classes to the hours digits.
    hoursLeft.classList.add("digit-area");
    hoursRight.classList.add("digit-area");

    // Creating the hours left top and bottom digits.
    const hoursLeftTop = document.createElement("span");
    const hoursLeftBottom = document.createElement("span");

    // Creating the hours right top and bottom digits.
    const hoursRightTop = document.createElement("span");
    const hoursRightBottom = document.createElement("span");

    // Adding the relevant classes to the hours digits.
    hoursLeftTop.classList.add("digit", "top", "hours");
    hoursLeftBottom.classList.add("digit", "bottom", "hours");

    hoursRightTop.classList.add("digit", "top", "hours");
    hoursRightBottom.classList.add("digit", "bottom", "hours");
    //#endregion

    //#region | Hours - Minutes - Separator |
    // Creating the hours - minutes separator.
    const hoursMinutesSeparator = document.createElement("div");
    hoursMinutesSeparator.classList.add("separator-area");

    const hoursMinutesSeparatorTop = document.createElement("span");
    const hoursMinutesSeparatorMiddle = document.createElement("span");
    const hoursMinutesSeparatorBottom = document.createElement("span");

    hoursMinutesSeparatorTop.classList.add("top");
    hoursMinutesSeparatorMiddle.classList.add("middle");
    hoursMinutesSeparatorBottom.classList.add("bottom");

    hoursMinutesSeparator.appendChild(hoursMinutesSeparatorTop);
    hoursMinutesSeparator.appendChild(hoursMinutesSeparatorMiddle);
    hoursMinutesSeparator.appendChild(hoursMinutesSeparatorBottom);
    //#endregion

    //#region | Minutes |
    // Creating the minutes digits.
    const minutesLeft = document.createElement("div");
    const minutesRight = document.createElement("div");

    // Adding the relevant classes to the minutes digits.
    minutesLeft.classList.add("digit-area");
    minutesRight.classList.add("digit-area");

    // Creating the minutes left top and bottom digits.
    const minutesLeftTop = document.createElement("span");
    const minutesLeftBottom = document.createElement("span");

    // Creating the minutes right top and bottom digits.
    const minutesRightTop = document.createElement("span");
    const minutesRightBottom = document.createElement("span");

    // Adding the relevant classes to the minutes digits.
    minutesLeftTop.classList.add("digit", "top", "minutes");
    minutesLeftBottom.classList.add("digit", "bottom", "minutes");

    minutesRightTop.classList.add("digit", "top", "minutes");
    minutesRightBottom.classList.add("digit", "bottom", "minutes");
    //#endregion

    //#region | Minutes - Seconds - Separator |
    // Creating the minutes - seconds separator.
    const minutesSecondsSeparator = document.createElement("div");
    minutesSecondsSeparator.classList.add("separator-area");

    const minutesSecondsSeparatorTop = document.createElement("span");
    const minutesSecondsSeparatorMiddle = document.createElement("span");
    const minutesSecondsSeparatorBottom = document.createElement("span");

    minutesSecondsSeparatorTop.classList.add("top");
    minutesSecondsSeparatorMiddle.classList.add("middle");
    minutesSecondsSeparatorBottom.classList.add("bottom");

    minutesSecondsSeparator.appendChild(minutesSecondsSeparatorTop);
    minutesSecondsSeparator.appendChild(minutesSecondsSeparatorMiddle);
    minutesSecondsSeparator.appendChild(minutesSecondsSeparatorBottom);
    //#endregion

    //#region | Seconds |
    // Creating the seconds digits.
    const secondsLeft = document.createElement("div");
    const secondsRight = document.createElement("div");

    // Adding the relevant classes to the seconds digits.
    secondsLeft.classList.add("digit-area");
    secondsRight.classList.add("digit-area");

    // Creating the seconds left top and bottom digits.
    const secondsLeftTop = document.createElement("span");
    const secondsLeftBottom = document.createElement("span");

    // Creating the minutes right top and bottom digits.
    const secondsRightTop = document.createElement("span");
    const secondsRightBottom = document.createElement("span");

    // Adding the relevant classes to the seconds digits.
    secondsLeftTop.classList.add("digit", "top", "seconds");
    secondsLeftBottom.classList.add("digit", "bottom", "seconds");

    secondsRightTop.classList.add("digit", "top", "seconds");
    secondsRightBottom.classList.add("digit", "bottom", "seconds");
    //#endregion

    // Resetting to 0 for all digit elements and their separators.
    hoursLeftTop.innerHTML = "0";
    hoursLeftBottom.innerHTML = "0";

    hoursRightTop.innerHTML = "0";
    hoursRightBottom.innerHTML = "0";

    hoursMinutesSeparatorTop.innerHTML = ":";
    hoursMinutesSeparatorMiddle.innerHTML = ":";
    hoursMinutesSeparatorBottom.innerHTML = ":";

    minutesLeftTop.innerHTML = "0";
    minutesLeftBottom.innerHTML = "0";

    minutesRightTop.innerHTML = "0";
    minutesRightBottom.innerHTML = "0";

    minutesSecondsSeparatorTop.innerHTML = ":";
    minutesSecondsSeparatorMiddle.innerHTML = ":";
    minutesSecondsSeparatorBottom.innerHTML = ":";

    secondsLeftTop.innerHTML = "0";
    secondsLeftBottom.innerHTML = "0";

    secondsRightTop.innerHTML = "0";
    secondsRightBottom.innerHTML = "0";

    hoursLeft.appendChild(hoursLeftTop);
    hoursLeft.appendChild(hoursLeftBottom);

    hoursRight.appendChild(hoursRightTop);
    hoursRight.appendChild(hoursRightBottom);

    minutesLeft.appendChild(minutesLeftTop);
    minutesLeft.appendChild(minutesLeftBottom);

    minutesRight.appendChild(minutesRightTop);
    minutesRight.appendChild(minutesRightBottom);

    secondsLeft.appendChild(secondsLeftTop);
    secondsLeft.appendChild(secondsLeftBottom);

    secondsRight.appendChild(secondsRightTop);
    secondsRight.appendChild(secondsRightBottom);

    clockHeader.appendChild(hoursLeft);
    clockHeader.appendChild(hoursRight);

    clockHeader.appendChild(minutesLeft);
    clockHeader.appendChild(minutesRight);

    clockHeader.appendChild(secondsLeft);
    clockHeader.appendChild(secondsRight);

    const updateClock = () => {
        // Resetting the animation across all elements in the clock.
        hoursLeftTop.style.animation = "none";
        hoursLeftBottom.style.animation = "none";

        hoursRightTop.style.animation = "none";
        hoursRightBottom.style.animation = "none";

        minutesLeftTop.style.animation = "none";
        minutesLeftBottom.style.animation = "none";

        minutesRightTop.style.animation = "none";
        minutesRightBottom.style.animation = "none";

        secondsLeftTop.style.animation = "none";
        secondsLeftBottom.style.animation = "none";

        secondsRightTop.style.animation = "none";
        secondsRightBottom.style.animation = "none";

        // Getting the current time.
        const currTime = new Date();

        const hours = currTime.getUTCHours() + zoneGMT;
        const minutes = currTime.getUTCMinutes();
        const seconds = currTime.getUTCSeconds();

        if (hours < 10 && hours > 0) {
            // Only the hours-right.
            // Trigger the animation
            requestAnimationFrame(() => {
                hoursRightTop.style.animation = "1s ease updateDigit";
            });

            if (currTime.getUTCHours() + 1 >= 10) {
                hoursRightTop.innerHTML = 0;
            } else {
                hoursRightTop.innerHTML = currTime.getUTCHours() + 1;
            }

            hoursLeftBottom.innerHTML = currTime.getUTCHours();
        } else if (hours > 10) {
            // Hours right and left.
            // Trigger the animation
            requestAnimationFrame(() => {
                hoursLeftTop.style.animation = "1s ease updateDigit";
                hoursRightTop.style.animation = "1s ease updateDigit";
            });

            if (currTime.getUTCHours() + 1 > 9) {
                hoursRightTop.innerHTML = 0;
            } else {
                hoursRightTop.innerHTML = currTime.getUTCHours() + 1;
            }

            hoursRightBottom.innerHTML = currTime.getUTCHours();

            if (currTime.getUTCHours() + 1 > 24) {
                hoursLeftTop.innerHTML = 0;
            } else {
                hoursLeftTop.innerHTML = currTime.getUTCHours() + 1;
            }

            hoursLeftBottom.innerHTML = currTime.getUTCHours();
        }

        if (minutes < 10 && minutes > 0) {
            // Minutes right.
            // Trigger the animation
            requestAnimationFrame(() => {
                minutesRightTop.style.animation = "1s ease updateDigit";
            });

            if (currTime.getUTCMinutes() + 1 > 9) {
                minutesRightTop.innerHTML = 0;
            } else {
                minutesRightTop.innerHTML = currTime.getUTCMinutes() + 1;
            }

            minutesRightBottom.innerHTML = currTime.getUTCMinutes();
        } else if (minutes > 10) {
            // Minutes right and left.
            // Trigger the animation
            requestAnimationFrame(() => {
                minutesLeftTop.style.animation = "1s ease updateDigit";
                minutesRightTop.style.animation = "1s ease updateDigit";
            });

            if (currTime.getUTCMinutes() + 1 > 9) {
                minutesRightTop.innerHTML = 0;
            } else {
                minutesRightTop.innerHTML = currTime.getUTCMinutes() + 1;
            }

            minutesRightBottom.innerHTML = currTime.getUTCMinutes();

            if (currTime.getUTCMinutes() + 1 > 59) {
                minutesLeftTop.innerHTML = 0;
            } else {
                minutesLeftTop.innerHTML = currTime.getUTCMinutes() + 1;
            }

            minutesLeftBottom.innerHTML = currTime.getUTCMinutes();
        }

        if (seconds < 10 && seconds > 0) {
            // Seconds right.
            // Trigger the animation
            requestAnimationFrame(() => {
                secondsRightTop.style.animation = "1s ease updateDigit";
            });

            if (currTime.getUTCSeconds() + 1 > 9) {
                secondsRightTop.innerHTML = 0;
            } else {
                secondsRightTop.innerHTML = currTime.getUTCSeconds() + 1;
            }

            secondsRightBottom.innerHTML = currTime.getUTCSeconds();
        } else if (seconds > 10) {
            // Seconds right and left.
            // Trigger the animation
            requestAnimationFrame(() => {
                secondsLeftTop.style.animation = "1s ease updateDigit";
                secondsRightTop.style.animation = "1s ease updateDigit";
            });

            if (currTime.getUTCSeconds() + 1 > 9) {
                secondsRightTop.innerHTML = 0;
            } else {
                secondsRightTop.innerHTML = currTime.getUTCSeconds() + 1;
            }

            secondsRightBottom.innerHTML = currTime.getUTCSeconds();

            if (currTime.getUTCSeconds() + 1 > 59) {
                secondsLeftTop.innerHTML = 0;
            } else {
                secondsLeftTop.innerHTML = currTime.getUTCSeconds() + 1;
            }

            secondsLeftBottom.innerHTML = currTime.getUTCSeconds();
        }
    };

    const clock = () => {
        // Basing to GMT 0 / Z time zone.
        const currTime = new Date();

        // Getting the digits information
        let hours = currTime.getUTCHours() + zoneGMT;
        if (hours >= 24) {
            hours -= 24;
        }
        hours = "" + hours;
        const minutes = "" + currTime.getUTCMinutes();
        const seconds = "" + currTime.getUTCSeconds();

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

    setInterval(updateClock, timeInterval);
};

const clockUpdated = (name, id, timeInterval, zoneGMT) => {
    if (zoneGMT < -12 || zoneGMT > 14) {
        return undefined;
    }

    const currentDate = new Date();

    const clockText = document.getElementById(id);

    const hoursLeftTop = document.getElementById(`hours-left-top`);
    const hoursLeftBottom = document.getElementById(`hours-left-bottom`);
    const hoursRightTop = document.getElementById(`hours-right-top`);
    const hoursRightBottom = document.getElementById(`hours-right-bottom`);

    const hoursMinutesSeparatorTop = document.getElementById(`hours-minutes-separator-top`);
    const hoursMinutesSeparatorBottom = document.getElementById(`hours-minutes-separator-bottom`);

    const minutesLeftTop = document.getElementById(`minutes-left-top`);
    const minutesLeftBottom = document.getElementById(`minutes-left-bottom`);
    const minutesRightTop = document.getElementById(`minutes-right-top`);
    const minutesRightBottom = document.getElementById(`minutes-right-bottom`);

    const minutesSecondsSeparatorTop = document.getElementById(`minutes-seconds-separator-top`);
    const minutesSecondsSeparatorBottom = document.getElementById(
        `minutes-seconds-separator-bottom`
    );

    const secondsLeftTop = document.getElementById(`seconds-left-top`);
    const secondsLeftBottom = document.getElementById(`seconds-left-bottom`);
    const secondsRightTop = document.getElementById(`seconds-right-top`);
    const secondsRightBottom = document.getElementById(`seconds-right-bottom`);

    const timeHandling = () => {
        // Hours Handling.
        const currentHours = (currentDate.getUTCHours() + zoneGMT) % 24;
        const clockHours = +hoursLeftBottom.innerHTML + +hoursRightBottom.innerHTML;

        if (clockHours !== currentHours) {
            // The hour has changed - updating the clock.
            if (currentHours >= 10) {
                // Handle both right and left digits.
                // Handle only the right digit.
                if (hoursRightBottom.innerHTML !== currentHours.toString()[1]) {
                    // The hour has changed - updating the clock.
                    // Trigger the animation
                    requestAnimationFrame(() => {
                        hoursRightTop.style.animation = "1s ease updateDigit";
                        hoursLeftTop.style.animation = "1s ease updateDigit";

                        // When the animation has ended update the current hour digits.
                        hoursRightTop.addEventListener(
                            "animationend",
                            () => {
                                console.log("[Hours Right]: Animation finished.");
                                // Updating the hours-right-bottom digit.
                                hoursRightBottom.innerHTML = currentHours % 10;

                                hoursRightTop.innerHTML = (+currentHours.toString()[1] + 1) % 10;

                                // Removing the animation.
                                hoursRightTop.style.animation = "none";
                            },
                            // Ensures the listener is removed after execution.
                            { once: true }
                        );

                        hoursLeftTop.addEventListener(
                            "animationend",
                            () => {
                                console.log("[Hours Left]: Animation finished.");
                                // Updating the hours-right-bottom digit.
                                hoursLeftBottom.innerHTML = Math.floor(currentHours / 10);
                                switch (currentHours) {
                                    case 0:
                                        hoursLeftTop.innerHTML = 1;
                                        break;
                                    case 10:
                                        hoursLeftTop.innerHTML = 2;
                                        break;
                                    case 20:
                                        hoursLeftTop.innerHTML = 0;
                                        break;
                                    default:
                                }

                                // Removing the animation.
                                hoursLeftTop.style.animation = "none";
                            },
                            // Ensures the listener is removed after execution.
                            { once: true }
                        );
                    });
                }
            } else {
                // Handle only the right digit.
                if (hoursRightBottom.innerHTML !== currentHours.toString()) {
                    // The hour(s) has changed - updating the clock.
                    // Trigger the animation
                    requestAnimationFrame(() => {
                        hoursRightTop.style.animation = "1s ease updateDigit";

                        // When the animation has ended update the current hours digits.
                        hoursRightTop.addEventListener(
                            "animationend",
                            () => {
                                console.log("[Hours Right]: Animation finished.");
                                // Updating the hours-right-bottom digit.
                                hoursRightBottom.innerHTML = currentHours;
                                hoursRightTop.innerHTML = currentHours + 1;

                                // Removing the animation.
                                hoursRightTop.style.animation = "none";
                            },
                            // Ensures the listener is removed after execution.
                            { once: true }
                        );
                    });
                }
            }
        }

        // Minutes Handling.
        const currentMinutes = (currentDate.getUTCMinutes() + zoneGMT) % 60;
        const clockMinutes = +minutesLeftBottom.innerHTML + +minutesRightBottom.innerHTML;

        if (clockMinutes !== currentMinutes) {
            if (currentMinutes >= 10) {
                // Handle both right and left digits.
                // Handle only the right digit.
                if (minutesRightBottom.innerHTML !== currentMinutes.toString()[1]) {
                    // The hour has changed - updating the clock.
                    // Trigger the animation
                    requestAnimationFrame(() => {
                        minutesRightTop.style.animation = "1s ease updateDigit";
                        minutesLeftTop.style.animation = "1s ease updateDigit";

                        // When the animation has ended update the current minutes digits.
                        minutesRightTop.addEventListener(
                            "animationend",
                            () => {
                                console.log("[Minutes Right]: Animation finished.");
                                // Updating the minutes-right-bottom digit.
                                minutesRightBottom.innerHTML = currentMinutes % 10;

                                minutesRightTop.innerHTML =
                                    (+currentMinutes.toString()[1] + 1) % 10;

                                // Removing the animation.
                                minutesRightTop.style.animation = "none";
                            },
                            // Ensures the listener is removed after execution.
                            { once: true }
                        );

                        minutesLeftTop.addEventListener(
                            "animationend",
                            () => {
                                console.log("[Minutes Left]: Animation finished.");
                                // Updating the minutes-right-bottom digit.
                                minutesLeftBottom.innerHTML = Math.floor(currentMinutes / 10);
                                switch (currentMinutes) {
                                    case 0:
                                        minutesLeftTop.innerHTML = 1;
                                        break;
                                    case 10:
                                        minutesLeftTop.innerHTML = 2;
                                        break;
                                    case 20:
                                        minutesLeftTop.innerHTML = 3;
                                        break;
                                    case 30:
                                        minutesLeftTop.innerHTML = 4;
                                        break;
                                    case 40:
                                        minutesLeftTop.innerHTML = 5;
                                        break;
                                    case 50:
                                        minutesLeftTop.innerHTML = 0;
                                        break;

                                    default:
                                }

                                // Removing the animation.
                                minutesLeftTop.style.animation = "none";
                            },
                            // Ensures the listener is removed after execution.
                            { once: true }
                        );
                    });
                }
            } else {
                // Handle only the right digit.
                if (hoursRightBottom.innerHTML !== currentHours.toString()) {
                    // The minute(s) has changed - updating the clock.
                    // Trigger the animation
                    requestAnimationFrame(() => {
                        minutesRightTop.style.animation = "1s ease updateDigit";

                        // When the animation has ended update the current minutes digits.
                        minutesRightTop.addEventListener(
                            "animationend",
                            () => {
                                console.log("[Minutes Right]: Animation finished.");
                                // Updating the minutes-right-bottom digit.
                                minutesRightBottom.innerHTML = currentMinutes;
                                minutesRightTop.innerHTML = currentMinutes + 1;

                                // Removing the animation.
                                minutesRightTop.style.animation = "none";
                            },
                            // Ensures the listener is removed after execution.
                            { once: true }
                        );
                    });
                }
            }
        }

        // Seconds Handling.
        const currentSeconds = (currentDate.getUTCSeconds() + zoneGMT) % 60;
        const clockSeconds = +secondsLeftBottom.innerHTML + +secondsRightBottom.innerHTML;

        if (clockSeconds !== currentSeconds) {
            if (currentSeconds >= 10) {
                // Handle both right and left digits.
                // Handle only the right digit.
                if (secondsRightBottom.innerHTML !== currentSeconds.toString()[1]) {
                    // The second(s) has changed - updating the clock.
                    // Trigger the animation
                    requestAnimationFrame(() => {
                        secondsRightTop.style.animation = "1s ease updateDigit";
                        secondsLeftTop.style.animation = "1s ease updateDigit";

                        // When the animation has ended update the current seconds digits.
                        secondsRightTop.addEventListener(
                            "animationend",
                            () => {
                                console.log("[Seconds Right]: Animation finished.");
                                // Updating the seconds-right-bottom digit.
                                secondsRightBottom.innerHTML = currentSeconds % 10;

                                secondsRightTop.innerHTML =
                                    (+currentSeconds.toString()[1] + 1) % 10;

                                // Removing the animation.
                                secondsRightTop.style.animation = "none";
                            },
                            // Ensures the listener is removed after execution.
                            { once: true }
                        );

                        secondsLeftTop.addEventListener(
                            "animationend",
                            () => {
                                console.log("[Seconds Left]: Animation finished.");
                                // Updating the seconds-right-bottom digit.
                                secondsLeftBottom.innerHTML = Math.floor(currentSeconds / 10);
                                switch (currentSeconds) {
                                    case 0:
                                        secondsLeftTop.innerHTML = 1;
                                        break;
                                    case 10:
                                        secondsLeftTop.innerHTML = 2;
                                        break;
                                    case 20:
                                        secondsLeftTop.innerHTML = 3;
                                        break;
                                    case 30:
                                        secondsLeftTop.innerHTML = 4;
                                        break;
                                    case 40:
                                        secondsLeftTop.innerHTML = 5;
                                        break;
                                    case 50:
                                        secondsLeftTop.innerHTML = 0;
                                        break;

                                    default:
                                }

                                // Removing the animation.
                                secondsLeftTop.style.animation = "none";
                            },
                            // Ensures the listener is removed after execution.
                            { once: true }
                        );
                    });
                }
            } else {
                // Handle only the right digit.
                if (secondsRightBottom.innerHTML !== currentSeconds.toString()) {
                    // The second(s) has changed - updating the clock.
                    // Trigger the animation
                    requestAnimationFrame(() => {
                        secondsRightTop.style.animation = "1s ease updateDigit";

                        // When the animation has ended update the current seconds digits.
                        secondsRightTop.addEventListener(
                            "animationend",
                            () => {
                                console.log("[Seconds Right]: Animation finished.");
                                // Updating the seconds-right-bottom digit.
                                secondsRightBottom.innerHTML = currentSeconds;
                                secondsRightTop.innerHTML = currentSeconds + 1;

                                // Removing the animation.
                                secondsRightTop.style.animation = "none";
                            },
                            // Ensures the listener is removed after execution.
                            { once: true }
                        );
                    });
                }
            }
        }
    };

    setInterval(timeHandling, timeInterval);
};

clockUpdated("Israel/Jerusalem", "israel-jerusalem-time", 1000, 2);
clockUpdated("Argentina/Buenos Aires", "argentina-buenos-aires-time", 1000, -3);
clockUpdated("USA/Washington", "usa-washington-time", 1000, -5);
clockUpdated("New Zealand/Wellington", "new-zealand-wellington-time", 1000, 13);
