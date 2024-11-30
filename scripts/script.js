$(() => {
    console.log("Document and DOM are ready!");

    const groupMe = {
        firstName: "Garrett",
        lastName: "Bouldin",
        greekChoice: "Fraternity",
        greekOrg: "Lambda Sigma Phi",
        notifications: true,
    };

    const flare = {
        screenName: "gbouldin",
        dateOfBirth: "2003-06-15",
        eventType: "Mixer",
        eventSelection: "Square Dancing",
        attendance: false,
    };

    const campusGroups = {
        email: "gbouldin@una.edu",
        phoneNumber: "256xxxxxxx",
        campusEvents: "Spiritual",
        eventChoice: "Big Room",
        registrationStatus: true,
    };

    const greekOptions = {
        fraternity: ["Lambda Sigma Phi", "Sigma Chi", "Kappa Sigma"],
        sorority: ["Phi Mu", "Alpha Gamma Delta", "Zeta Tau Alpha"],
    };

    const flareEventSelections = {
        mixer: ["Roller Skating", "Square Dancing", "Water Balloon Fight", "Capture the Flag"],
        philanthropy: ["Mugshot's Spirit Night", "Work Day at Shoals Dream Center", "Food Drive"],
    };

    const campusEventChoices = {
        spiritual: ["Big Room", "Mass On Campus", "Chapel Young Adults"],
        social: ["Spring Concert", "Step-Sing", "Bingo Bango"],
    };

    const loadDataBtn = document.getElementById("loadDataBtn");
    const successMessageBtn = document.getElementById("successMessageBtn");
    const greekOrgSelect = document.getElementById("inputGreekOrg");
    const eventSelectionSelect = document.getElementById("inputEventSelection");
    const eventChoiceSelect = document.getElementById("inputEventChoice");

    const populateSelect = (selectElement, options) => {
        selectElement.innerHTML = '<option selected disabled>Items for selected choice</option>';
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    };

    const updateGreekOrgOptions = () => {
        const greekChoice = document.querySelector(`[name="greekChoice"]:checked`)?.value.toLowerCase();
        if (greekChoice && greekOptions[greekChoice]) {
            populateSelect(greekOrgSelect, greekOptions[greekChoice]);
        }
    };

    const updateCampusEventChoices = () => {
        const campusEvent = document.querySelector(`[name="campusEvents"]:checked`)?.value.toLowerCase();
        if (campusEvent && campusEventChoices[campusEvent]) {
            populateSelect(eventChoiceSelect, campusEventChoices[campusEvent]);
        }
    };

    const updateFlareEventSelection = () => {
        const eventType = document.querySelector(`[name="eventType"]:checked`)?.value.toLowerCase();
        if (eventType && flareEventSelections[eventType]) {
            populateSelect(eventSelectionSelect, flareEventSelections[eventType]);
        }
    };

    loadDataBtn.addEventListener("click", () => {
        document.getElementById("inputFirstName").value = groupMe.firstName;
        document.getElementById("inputLastName").value = groupMe.lastName;
        document.querySelector(`[name="greekChoice"][value="${groupMe.greekChoice}"]`).checked = true;
        updateGreekOrgOptions();
        greekOrgSelect.value = groupMe.greekOrg;
        document.getElementById("notifications").checked = groupMe.notifications;

        document.getElementById("inputScreenName").value = flare.screenName;
        document.getElementById("inputDateOfBirth").value = flare.dateOfBirth;
        document.querySelector(`[name="eventType"][value="${flare.eventType}"]`).checked = true;
        updateFlareEventSelection();
        eventSelectionSelect.value = flare.eventSelection;

        document.getElementById("inputEmail").value = campusGroups.email;
        document.getElementById("inputPhoneNumber").value = campusGroups.phoneNumber;
        document.querySelector(`[name="campusEvents"][value="${campusGroups.campusEvents}"]`).checked = true;
        updateCampusEventChoices();
        eventChoiceSelect.value = campusGroups.eventChoice;
        document.getElementById("registrationStatus").checked = campusGroups.registrationStatus;

        document.getElementById("attendance").checked = flare.attendance;
    });

    const updateData = () => {
        return {
            groupMe: {
                firstName: document.getElementById("inputFirstName").value || "N/A",
                lastName: document.getElementById("inputLastName").value || "N/A",
                greekChoice: document.querySelector(`[name="greekChoice"]:checked`)?.value || "N/A",
                greekOrg: greekOrgSelect.value || "N/A",
                notifications: document.getElementById("notifications").checked,
            },
            flare: {
                screenName: document.getElementById("inputScreenName").value || "N/A",
                dateOfBirth: document.getElementById("inputDateOfBirth").value || "N/A",
                eventType: document.querySelector(`[name="eventType"]:checked`)?.value || "N/A",
                eventSelection: eventSelectionSelect.value || "N/A",
                attendance: document.getElementById("attendance").checked,
            },
            campusGroups: {
                email: document.getElementById("inputEmail").value || "N/A",
                phoneNumber: document.getElementById("inputPhoneNumber").value || "N/A",
                campusEvents: document.querySelector(`[name="campusEvents"]:checked`)?.value || "N/A",
                eventChoice: eventChoiceSelect.value || "N/A",
                registrationStatus: document.getElementById("registrationStatus").checked,
            },
        };
    };

    successMessageBtn.addEventListener("click", () => {
        const updatedData = updateData();

        console.log(JSON.stringify(updatedData, null, 2));

        successMessage.innerHTML = ""; 
        $("#successMessage").append(`${updatedData.groupMe.firstName}, your data has been submitted successfully! Thank you for using GreekLink!`);
    });

    document.querySelectorAll("[name='greekChoice']").forEach(radio => {
        radio.addEventListener("change", updateGreekOrgOptions);
    });

    document.querySelectorAll("[name='campusEvents']").forEach(radio => {
        radio.addEventListener("change", updateCampusEventChoices);
    });

    document.querySelectorAll("[name='eventType']").forEach(radio => {
        radio.addEventListener("change", updateFlareEventSelection);
    });
});