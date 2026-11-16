console.log("Welcome to AQUA Cafe. Enjoy your time and share memories with us!")
var name= "CAFE SHOP";
let Welcomemessage="Welcome to"+name+"! Enjoy your visit and take a moment to savor the exprience.";
const openingHour = 8;
const closingHour = 23;
const openinghours = "Open daily from 8 AM to 11 PM";
console.log(name)
console.log(openinghours)
console.log(Welcomemessage)
let WelcomemessageTemplate = 'Welcome to $ {name}! Enjoy your visit and take a moment to savor the exprience.';
    console.log(WelcomemessageTemplate)

let menuItems = ["Coffee", "tea", "Juice", "pastries", "toast"];
console.log("MenuItems:", menuItems);

console.log("First Item", menuItems[0]);
console.log("Last Item", menuItems[menuItems.length -1]);

for (let items of menuItems) {
    console.log('Menu Items: ${item}');
}

const cafe = {
    name: " AQUA Cafe",
    location: "1 Shariiati St, Tehran",
    openinghours: openinghours,
    menu: menuItems,
    greet: function() {
        console.log('Welcome to ${this.name}! We are located at ${this.location}.');
    }
};

console.log("Cafe Name:", cafe.name);
console.log("Cafe Location:", cafe.location);
cafe.greet();

const currentYearElement = document.querySelector("#current-year");

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

const tehranTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tehran",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
}).format(new Date());
const [tehranHour, tehranMinute] = tehranTime.split(":").map(Number);
const currentMinutes = tehranHour * 60 + tehranMinute;
const openingMinutes = openingHour * 60;
const closingMinutes = closingHour * 60;
let cafeStatus;

if (currentMinutes >= openingMinutes && currentMinutes < closingMinutes) {
    cafeStatus = "Open now";
} else {
    cafeStatus = "Closed now";
}

const cafeStatusElement = document.querySelector("#cafe-status");

if (cafeStatusElement) {
    cafeStatusElement.textContent = `${cafeStatus} · ${openinghours}`;
}

console.log(`AQUA Cafe is ${cafeStatus.toLowerCase()} (${openinghours}).`);

const timeGreeting = document.querySelector("#time-greeting");

if (timeGreeting) {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        timeGreeting.textContent = "Good morning";
    } else {
        timeGreeting.textContent = "Good afternoon";
    }
}

const services = [
    {
        title: "Freshly Brewed",
        text: "Enjoy espresso and coffee made fresh for your visit."
    },
    {
        title: "All-Day Breakfast",
        text: "Settle in with a tasty breakfast whenever you stop by."
    },
    {
        title: "Light Bites",
        text: "Pair your drink with a fresh sandwich or pastry."
    },
    {
        title: "Relaxed Seating",
        text: "Enjoy a comfortable spot to catch up or take a break."
    },
    {
        title: "Quick Takeaway",
        text: "Take your coffee and a bite with you around Tehran."
    }
];

const serviceGrid = document.querySelector(".service-grid");

if (serviceGrid) {
    const serviceCards = services.map((service, index) => {
        const card = document.createElement("article");
        const number = document.createElement("span");
        const title = document.createElement("h3");
        const text = document.createElement("p");

        card.className = "service-card";
        number.className = "service-card-number";
        number.textContent = String(index + 1).padStart(2, "0");
        number.setAttribute("aria-hidden", "true");
        title.textContent = service.title;
        text.textContent = service.text;
        card.append(number, title, text);

        return card;
    });

    serviceGrid.replaceChildren(...serviceCards);
}

const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#primary-navigation");

function closeNavigation() {
    if (!menuToggle || !navMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navMenu.classList.remove("is-open");
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
        navMenu.classList.toggle("is-open", !isOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });
}

const reservationDialog = document.querySelector("#reservation-dialog");
const reservationForm = document.querySelector("#reservation-form");
const closeReservationButton = document.querySelector(".dialog-close");
const reservationDate = document.querySelector("#reservation-date");

function getLocalDateValue(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

if (reservationDate) {
    reservationDate.min = getLocalDateValue();
}

document.querySelectorAll("[data-open-reservation]").forEach((button) => {
    button.addEventListener("click", () => {
        closeNavigation();
        if (reservationDialog && !reservationDialog.open) {
            reservationDialog.showModal();
        }
    });
});

if (reservationDialog && closeReservationButton) {
    closeReservationButton.addEventListener("click", () => reservationDialog.close());
    reservationDialog.addEventListener("click", (event) => {
        if (event.target === reservationDialog) reservationDialog.close();
    });
}

function updateFieldError(input, errorId, message) {
    const error = document.getElementById(errorId);
    if (error) error.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
}

function validateName(input, errorId) {
    const value = input.value.trim();
    let message = "";
    if (!value) message = "Please enter your name.";
    else if (value.length < 2) message = "Name must be at least 2 characters.";
    return updateFieldError(input, errorId, message);
}

function validateEmail(input, errorId) {
    let message = "";
    if (!input.value.trim()) message = "Please enter your email address.";
    else if (!input.validity.valid) message = "Please enter a valid email address.";
    return updateFieldError(input, errorId, message);
}

function validateMessage(input, errorId) {
    const value = input.value.trim();
    let message = "";
    if (!value) message = "Please enter a message.";
    else if (value.length < 10) message = "Your message must be at least 10 characters.";
    return updateFieldError(input, errorId, message);
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    const nameInput = contactForm.querySelector("#name");
    const emailInput = contactForm.querySelector("#email");
    const messageInput = contactForm.querySelector("#message");
    const contactFeedback = document.querySelector("#contact-feedback");
    const contactFields = [
        { input: nameInput, errorId: "name-error", validate: validateName },
        { input: emailInput, errorId: "email-error", validate: validateEmail },
        { input: messageInput, errorId: "message-error", validate: validateMessage }
    ];

    contactFields.forEach(({ input, errorId, validate }) => {
        input.addEventListener("blur", () => validate(input, errorId));
        input.addEventListener("input", () => {
            validate(input, errorId);
            contactFeedback.textContent = "";
        });
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const results = contactFields.map(({ input, errorId, validate }) => validate(input, errorId));
        const firstInvalid = contactFields[results.indexOf(false)];

        if (firstInvalid) {
            firstInvalid.input.focus();
            contactFeedback.textContent = "Please fix the highlighted fields.";
            return;
        }

        contactFeedback.textContent = "Your message is valid. This demo does not send messages yet.";
    });
}

if (reservationForm) {
    const reservationName = reservationForm.querySelector("#reservation-name");
    const reservationEmail = reservationForm.querySelector("#reservation-email");
    const reservationFeedback = document.querySelector("#reservation-feedback");
    const reservationFields = [
        { input: reservationName, errorId: "reservation-name-error", validate: validateName },
        { input: reservationEmail, errorId: "reservation-email-error", validate: validateEmail }
    ];

    reservationFields.forEach(({ input, errorId, validate }) => {
        input.addEventListener("blur", () => validate(input, errorId));
        input.addEventListener("input", () => {
            validate(input, errorId);
            reservationFeedback.textContent = "";
        });
    });

    reservationDate.addEventListener("input", () => {
        reservationFeedback.textContent = "";
        updateFieldError(reservationDate, "reservation-date-error", "");
    });

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const results = reservationFields.map(({ input, errorId, validate }) => validate(input, errorId));
        let dateError = "";

        if (!reservationDate.value) dateError = "Please choose a date.";
        else if (reservationDate.value < getLocalDateValue()) dateError = "Please choose today or a future date.";

        results.push(updateFieldError(reservationDate, "reservation-date-error", dateError));
        const firstInvalidIndex = results.indexOf(false);

        if (firstInvalidIndex !== -1) {
            const invalidField = firstInvalidIndex < reservationFields.length
                ? reservationFields[firstInvalidIndex].input
                : reservationDate;
            invalidField.focus();
            reservationFeedback.textContent = "Please fix the highlighted fields.";
            return;
        }

        reservationFeedback.textContent = "Your reservation request is valid. This demo does not send bookings yet.";
    });
}

const themeToggle = document.querySelector("#theme-toggle");
const themeToggleLabel = document.querySelector("#theme-toggle-label");
const themeToggleIcon = document.querySelector(".theme-toggle-icon");
const themeStorageKey = "aqua-cafe-theme";

function applyTheme(theme, savePreference = false) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";

    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(isDark));
    if (themeToggle) {
        const nextModeLabel = `Switch to ${isDark ? "light" : "dark"} mode`;
        themeToggle.setAttribute("aria-label", nextModeLabel);
        themeToggle.title = nextModeLabel;
    }
    if (themeToggleLabel) themeToggleLabel.textContent = isDark ? "Light mode" : "Dark mode";
    if (themeToggleIcon) themeToggleIcon.textContent = isDark ? "\u2600" : "\u263E";

    if (savePreference) {
        try {
            localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
        } catch (error) {
            // The theme still works for this visit if storage is unavailable.
        }
    }
}

let savedTheme = null;

try {
    savedTheme = localStorage.getItem(themeStorageKey);
} catch (error) {
    // Use the device preference when browser storage is unavailable.
}

const prefersDarkMode = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
const initialTheme = savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : prefersDarkMode ? "dark" : "light";

applyTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
    });
}

const cafePicks = [
    {
        title: "Cappuccino & a croissant",
        description: "A silky cappuccino paired with a flaky, buttery pastry.",
    },
    {
        title: "Iced coffee break",
        description: "A refreshing iced coffee for a sunny afternoon in Tehran.",
    },
    {
        title: "Espresso & something sweet",
        description: "A bold espresso alongside a slice of our daily cake.",
    },
];

const dailySpecialContent = document.querySelector("#daily-special-content");
const nextSpecialButton = document.querySelector("#next-special");
let cafePickIndex = new Date().getDay() % cafePicks.length;

function renderCafePick() {
    if (!dailySpecialContent) return;

    const pick = cafePicks[cafePickIndex];
    const eyebrow = document.createElement("p");
    const title = document.createElement("h3");
    const description = document.createElement("p");

    eyebrow.className = "eyebrow";
    eyebrow.textContent = `Today's cafe pick (${cafePickIndex + 1} of ${cafePicks.length})`;
    title.textContent = pick.title;
    description.textContent = pick.description;
    dailySpecialContent.replaceChildren(eyebrow, title, description);
}

renderCafePick();

if (nextSpecialButton) {
    nextSpecialButton.addEventListener("click", () => {
        cafePickIndex = (cafePickIndex + 1) % cafePicks.length;
        renderCafePick();
    });
}
