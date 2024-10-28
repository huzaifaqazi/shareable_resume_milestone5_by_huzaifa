document.addEventListener("DOMContentLoaded", () => {
    const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
    const downloadPdfButton = document.getElementById("downloadPdf") as HTMLButtonElement;
    const shareLinkButton = document.getElementById("shareLink") as HTMLButtonElement;

    document.getElementById("addEducation")!.addEventListener("click", () => {
        const educationContainer = document.getElementById("educationContainer")!;
        const newEducation = document.createElement("input");
        newEducation.type = "text";
        newEducation.className = "education";
        newEducation.placeholder = "Add education";
        educationContainer.appendChild(newEducation);
    });

    document.getElementById("addSkill")!.addEventListener("click", () => {
        const skillsContainer = document.getElementById("skillsContainer")!;
        const newSkill = document.createElement("input");
        newSkill.type = "text";
        newSkill.className = "skill";
        newSkill.placeholder = "Add skill";
        skillsContainer.appendChild(newSkill);
    });

    document.getElementById("addExperience")!.addEventListener("click", () => {
        const experienceContainer = document.getElementById("experienceContainer")!;
        const newExperience = document.createElement("textarea");
        newExperience.className = "experience";
        newExperience.rows = 2;
        newExperience.placeholder = "Add experience";
        experienceContainer.appendChild(newExperience);
    });

    resumeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = (document.getElementById("name") as HTMLInputElement).value;
        const fatherName = (document.getElementById("fatherName") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;

        const education = Array.from(document.getElementsByClassName("education") as HTMLCollectionOf<HTMLInputElement>)
            .map(input => input.value).filter(Boolean);
        const skills = Array.from(document.getElementsByClassName("skill") as HTMLCollectionOf<HTMLInputElement>)
            .map(input => input.value).filter(Boolean);
        const experiences = Array.from(document.getElementsByClassName("experience") as HTMLCollectionOf<HTMLTextAreaElement>)
            .map(input => input.value).filter(Boolean);

        const resumeHTML = `
            <h2>${name}</h2>
            <p><strong>Father's Name:</strong> ${fatherName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education</h3>
            <ul>${education.map(item => `<li>${item}</li>`).join('')}</ul>
            <h3>Skills</h3>
            <ul>${skills.map(item => `<li>${item}</li>`).join('')}</ul>
            <h3>Experience</h3>
            <ul>${experiences.map(item => `<li>${item}</li>`).join('')}</ul>
        `;

        resumeOutput.innerHTML = resumeHTML;

        // Show buttons for download and share
        downloadPdfButton.style.display = 'block';
        shareLinkButton.style.display = 'block';

        // Add download functionality
        downloadPdfButton.onclick = () => {
            downloadPDF(resumeHTML);
        };

        // Add share link functionality
        shareLinkButton.onclick = () => {
            const link = createShareableLink();
            alert(`Share this link: ${link}`);
        };
    });

    function downloadPDF(content: string) {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function createShareableLink(): string {
        const resumeContent = resumeOutput.innerHTML;
        const encodedContent = encodeURIComponent(resumeContent);
        return `${window.location.origin}/share?resume=${encodedContent}`;
    }
});
