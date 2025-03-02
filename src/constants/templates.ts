

export const templates = [
    {
        id: 'blank',
        label: "Blank Document",
        imageUrl: "/Templates/blank-document.svg",
        initialContent: ""
    },
    {
        id: "software-proposal",
        label: "Software Proposal",
        imageUrl: "/Templates/software-proposal.svg",
        initialContent: `
            <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); line-height: 1.6;">
                <h1 style="text-align: center; color: #333;">Software Proposal</h1>
                <h2 style="text-align: center; color: #555;">Project Name</h2>

                <h3 style="color: #444;">1. Introduction</h3>
                <p style="color: #666;">Provide an overview of the project and its objectives.</p>

                <h3 style="color: #444;">2. Objectives</h3>
                <ul style="color: #666;">
                    <li>Objective 1</li>
                    <li>Objective 2</li>
                    <li>Objective 3</li>
                </ul>

                <h3 style="color: #444;">3. Features</h3>
                <ul style="color: #666;">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul>

                <h3 style="color: #444;">4. Technology Stack</h3>
                <p style="color: #666;">List the technologies used in the project.</p>

                <h3 style="color: #444;">5. Development Timeline</h3>
                <p style="color: #666;">Provide an estimated timeline for completion.</p>

                <h3 style="color: #444;">6. Budget & Resources</h3>
                <p style="color: #666;">Outline the estimated budget and required resources.</p>

                <h3 style="color: #444;">7. Conclusion</h3>
                <p style="color: #666;">Summarize the benefits and expected outcomes of the project.</p>
            </div>
        `
    },
    {
        id: "cover-letter",
        label: "Cover Letter",
        imageUrl: "/Templates/cover-letter.svg",
        initialContent: `
            <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); line-height: 1.6;">
                <h1 style="text-align: center; color: #333;">Cover Letter</h1>
                <p style="color: #666;">[Your Name] <br> [Your Address] <br> [City, State, ZIP Code] <br> [Your Email] <br> [Your Phone Number]</p>
                <p style="color: #666;">[Date]</p>
                <p style="color: #666;">[Hiring Manager's Name] <br> [Company Name] <br> [Company Address] <br> [City, State, ZIP Code]</p>
                <h3 style="color: #444;">Dear [Hiring Manager's Name],</h3>
                <p style="color: #666;">I am writing to express my interest in the [Job Title] position at [Company Name]. With a strong background in [Your Field/Industry], I am confident that my skills and experience align perfectly with the requirements of this role.</p>
                <p style="color: #666;">In my previous role as [Your Previous Job Title] at [Previous Company], I successfully [describe a major achievement or responsibility]. I am particularly skilled in [mention key skills] and have a proven track record of [highlight key accomplishment].</p>
                <p style="color: #666;">I am excited about the opportunity to bring my expertise to [Company Name] and contribute to its continued success. I welcome the opportunity to discuss my application in more detail at your convenience.</p>
                <p style="color: #666;">Thank you for your time and consideration.</p>
                <p style="color: #666;">Sincerely, <br> [Your Name]</p>
            </div>
        `
    },
    {
        id: "business-letter",
        label: "Business Letter",
        imageUrl: "/Templates/business-letter.svg",
        initialContent: `
            <div style="margin-top: 40px; font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); line-height: 1.6;">
                <h1 style="text-align: center; color: #333;">Business Letter</h1>
                <p style="color: #666;">[Your Name/Company] <br> [Your Address] <br> [City, State, ZIP Code] <br> [Your Email] <br> [Your Phone Number]</p>
                <p style="color: #666;">[Date]</p>
                <p style="color: #666;">[Recipient's Name] <br> [Recipient's Company] <br> [Company Address] <br> [City, State, ZIP Code]</p>
                <h3 style="color: #444;">Dear [Recipient's Name],</h3>
                <p style="color: #666;">I am reaching out to discuss [state the purpose of the letter, such as a business partnership, inquiry, or request]. Our company, [Your Company Name], specializes in [briefly describe your company’s expertise].</p>
                <p style="color: #666;">We believe there is an opportunity for collaboration between our organizations, particularly in the area of [mention the key business interest]. I would appreciate the opportunity to further explore how we can work together to achieve mutual benefits.</p>
                <p style="color: #666;">Please let me know a convenient time to discuss this further. I look forward to your response.</p>
                <p style="color: #666;">Sincerely, <br> [Your Name/Company Name]</p>
            </div>
        `
    },
    {
        id: "letter",
        label: "Letter",
        imageUrl: "/Templates/letter.svg",
        initialContent: `
            <div style="margin-top: 40px; font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); line-height: 1.6;">
                <h1 style="text-align: center; color: #333;">Letter</h1>
                <p style="color: #666;">[Your Name] <br> [Your Address] <br> [City, State, ZIP Code] <br> [Your Email] <br> [Your Phone Number]</p>
                <p style="color: #666;">[Date]</p>
                <p style="color: #666;">[Recipient's Name] <br> [Recipient's Address] <br> [City, State, ZIP Code]</p>
                <h3 style="color: #444;">Dear [Recipient's Name],</h3>
                <p style="color: #666;">I hope this letter finds you well. I am writing to [state the purpose of the letter, whether it is personal, formal, or informational].</p>
                <p style="color: #666;">[Provide details about the purpose of your letter, including any necessary context, background, or key points.]</p>
                <p style="color: #666;">[Add any closing remarks, such as gratitude, next steps, or a request for a response.]</p>
                <p style="color: #666;">Sincerely, <br> [Your Name]</p>
            </div>
        `
    },
    {
        id: "resume",
        label: "Resume",
        imageUrl: "/Templates/resume.svg",
        initialContent: `
            <div style="margin-top: 40px; font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); line-height: 1.6;">
                <h1 style="text-align: center; color: #333;">Resume</h1>
                <h3 style="color: #444;">[Your Name]</h3>
                <p style="color: #666;">[Your Email] | [Your Phone] | [Your LinkedIn]</p>
                <h3 style="color: #444;">Summary</h3>
                <p style="color: #666;">Highly motivated [Your Profession] with [X] years of experience in [Industry/Field]. Proven ability to [mention a key strength or achievement].</p>
                <h3 style="color: #444;">Experience</h3>
                <p style="color: #666;"><strong>[Job Title] - [Company Name]</strong> (Dates) <br> - [Responsibility 1] <br> - [Responsibility 2] <br> - [Achievement]</p>
                <h3 style="color: #444;">Education</h3>
                <p style="color: #666;">[Degree] - [University Name] (Graduation Year)</p>
                <h3 style="color: #444;">Skills</h3>
                <ul style="color: #666;">
                    <li>[Skill 1]</li>
                    <li>[Skill 2]</li>
                    <li>[Skill 3]</li>
                </ul>
            </div>
        `
    },
    {
        id: "project-proposal",
        label: "Project Proposal",
        imageUrl: "/Templates/project-proposal.svg",
        initialContent: `
            <div style="margin-top: 40px; font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); line-height: 1.6;">
                <h1 style="text-align: center; color: #333;">Project Proposal</h1>
                <h3 style="color: #444;">1. Project Title</h3>
                <p style="color: #666;">[Enter the project title here]</p>
                <h3 style="color: #444;">2. Introduction</h3>
                <p style="color: #666;">This proposal outlines the key details of [Project Name], aiming to [describe the main goal of the project].</p>
                <h3 style="color: #444;">3. Objectives</h3>
                <ul style="color: #666;">
                    <li>[Objective 1]</li>
                    <li>[Objective 2]</li>
                    <li>[Objective 3]</li>
                </ul>
                <h3 style="color: #444;">4. Scope</h3>
                <p style="color: #666;">The project scope includes [list key deliverables and tasks].</p>
                <h3 style="color: #444;">5. Budget</h3>
                <p style="color: #666;">The estimated budget for this project is [amount]. This will cover [mention major expenses].</p>
                <h3 style="color: #444;">6. Timeline</h3>
                <p style="color: #666;">The project is expected to be completed in [timeframe].</p>
                <h3 style="color: #444;">7. Conclusion</h3>
                <p style="color: #666;">This project is expected to bring [mention key benefits]. We look forward to your approval and collaboration.</p>
            </div>
        `
    },
]