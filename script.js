document.addEventListener("DOMContentLoaded", function () {
    var resumeForm = document.getElementById("resumeForm");
    var resumeOutput = document.getElementById("resumeOutput");
    var downloadPdfButton = document.getElementById("downloadPdf");
    var shareLinkButton = document.getElementById("shareLink");
    document.getElementById("addEducation").addEventListener("click", function () {
        var educationContainer = document.getElementById("educationContainer");
        var newEducation = document.createElement("input");
        newEducation.type = "text";
        newEducation.className = "education";
        newEducation.placeholder = "Add education";
        educationContainer.appendChild(newEducation);
    });
    document.getElementById("addSkill").addEventListener("click", function () {
        var skillsContainer = document.getElementById("skillsContainer");
        var newSkill = document.createElement("input");
        newSkill.type = "text";
        newSkill.className = "skill";
        newSkill.placeholder = "Add skill";
        skillsContainer.appendChild(newSkill);
    });
    document.getElementById("addExperience").addEventListener("click", function () {
        var experienceContainer = document.getElementById("experienceContainer");
        var newExperience = document.createElement("textarea");
        newExperience.className = "experience";
        newExperience.rows = 2;
        newExperience.placeholder = "Add experience";
        experienceContainer.appendChild(newExperience);
    });
    resumeForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = document.getElementById("name").value;
        var fatherName = document.getElementById("fatherName").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var education = Array.from(document.getElementsByClassName("education"))
            .map(function (input) { return input.value; }).filter(Boolean);
        var skills = Array.from(document.getElementsByClassName("skill"))
            .map(function (input) { return input.value; }).filter(Boolean);
        var experiences = Array.from(document.getElementsByClassName("experience"))
            .map(function (input) { return input.value; }).filter(Boolean);
        var resumeHTML = "\n            <h2>".concat(name, "</h2>\n            <p><strong>Father's Name:</strong> ").concat(fatherName, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <h3>Education</h3>\n            <ul>").concat(education.map(function (item) { return "<li>".concat(item, "</li>"); }).join(''), "</ul>\n            <h3>Skills</h3>\n            <ul>").concat(skills.map(function (item) { return "<li>".concat(item, "</li>"); }).join(''), "</ul>\n            <h3>Experience</h3>\n            <ul>").concat(experiences.map(function (item) { return "<li>".concat(item, "</li>"); }).join(''), "</ul>\n        ");
        resumeOutput.innerHTML = resumeHTML;
        // Show buttons for download and share
        downloadPdfButton.style.display = 'block';
        shareLinkButton.style.display = 'block';
        // Add download functionality
        downloadPdfButton.onclick = function () {
            downloadPDF(resumeHTML);
        };
        // Add share link functionality
        shareLinkButton.onclick = function () {
            var link = createShareableLink();
            alert("Share this link: ".concat(link));
        };
    });
    function downloadPDF(content) {
        var blob = new Blob([content], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    function createShareableLink() {
        var resumeContent = resumeOutput.innerHTML;
        var encodedContent = encodeURIComponent(resumeContent);
        return "".concat(window.location.origin, "/share?resume=").concat(encodedContent);
    }
});
