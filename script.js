// ---------------------
// JOB DATA
// ---------------------

const jobs = [
{
id:1,
title:"Frontend Intern",
company:"TechLabs",
location:"Berlin",
type:"Internship",
description:"Assist in building responsive UI components using HTML, CSS and JavaScript."
},
{
id:2,
title:"UI Designer",
company:"Creative Studio",
location:"Munich",
type:"Part-time",
description:"Design modern UI layouts and collaborate with frontend developers."
},
{
id:3,
title:"React Developer",
company:"Startup Hub",
location:"Remote",
type:"Working Student",
description:"Work with the frontend team to build interactive web applications using React and modern JavaScript. Assist in developing reusable components and improving UI performance."
},
{
id:4,
title:"Marketing Intern",
company:"Growth Lab",
location:"Berlin",
type:"Internship",
description:"Support the marketing team in creating digital campaigns, analyzing social media performance, and assisting with content planning for online channels."
},
{
id:5,
title:"Backend Developer",
company:"CodeWorks",
location:"Hamburg",
type:"Working Student",
description:"Assist backend developers in building and maintaining server-side logic,APIs, and database integrations using modern development tools."
},
{
id:6,
title:"Product Designer",
company:"DesignCo",
location:"Remote",
type:"Part-time",
description:"Create user-centered product designs, wireframes, and prototypes while collaborating closely with developers and product managers."
},
{
id:7,
title:"Data Analyst Intern",
company:"Insight AI",
location:"Berlin",
type:"Internship",
description:"Analyze datasets and support data-driven decision making. Help prepare reports, dashboards, and insights for internal teams."

},
{
id:8,
title:"Web Developer",
company:"WebFlow Agency",
location:"Munich",
type:"Working Student",
description:"Create user-centered product designs, wireframes, and prototypes while collaborating closely with developers and product managers."
},
{
id:9,
title:"QA Tester",
company:"QualitySoft",
location:"Hamburg",
type:"Part-time",
description:"Test web applications for bugs and usability issues. Document errors and work with developers to ensure product quality."
},
{
id:10,
title:"UX Research Intern",
company:"UserLab",
location:"Berlin",
type:"Internship",
description:"Assist UX researchers in conducting user interviews, usability testing, and analyzing user behavior to improve product experience."
},
{
id:11,
title:"Content Manager",
company:"MediaHouse",
location:"Remote",
type:"Part-time",
description:"Manage website content, update articles, and optimize digital content for SEO and audience engagement."
},
{
id:12,
title:"DevOps Assistant",
company:"CloudStack",
location:"Frankfurt",
type:"Working Student",
description:"Support DevOps engineers with deployment pipelines, cloud infrastructure monitoring, and automation of development workflows."
}
];

// ---------------------
//  STATE
// ---------------------

let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];



// ---------------------
//  DOM ELEMENTS
// ---------------------

const jobList = document.getElementById("jobList");
const favoritesList = document.getElementById("favoritesList");

const typeFilter = document.getElementById("typeFilter");
const locationFilter = document.getElementById("locationFilter");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("jobModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalCompany = document.getElementById("modalCompany");
const modalLocation = document.getElementById("modalLocation");
const modalType = document.getElementById("modalType");
const modalDescription = document.getElementById("modalDescription");




// ---------------------
// RENDER JOBS
// ---------------------

function renderJobs(jobArray){

  jobList.innerHTML = "";


  if(jobArray.length === 0){

    jobList.innerHTML = `
      <p class="empty-state">
        No jobs found
      </p>
    `;

    return;
  }

  jobArray.forEach(job => {

    const isSaved = savedJobs.some(function(item){
    return item.id === job.id;
    });

    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");

     jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.company}</p>
      <p>${job.location}</p>
      <p>${job.type}</p>

    <div class="job-actions">

    <button class="save-btn">
        <i class="${isSaved ? "fa-solid" : "fa-regular"} fa-heart"></i>
    </button>

    <button class="apply-btn"> Apply </button>

    </div>
    `;

    jobCard.addEventListener("click", function(){
      openModal(job);
    });

    const saveBtn = jobCard.querySelector(".save-btn");
    const applyBtn = jobCard.querySelector(".apply-btn");
    const icon = saveBtn.querySelector("i");

   applyBtn.addEventListener("click", function(event){

   event.stopPropagation();

   applyBtn.textContent = "Applied ✓";

   applyBtn.classList.add("applied");

   applyBtn.disabled = true;

  });

    saveBtn.addEventListener("click", function(event){

    event.stopPropagation();

    const isSaved = savedJobs.some(function(item){
    return item.id === job.id;
   });

    if(isSaved){

    savedJobs = savedJobs.filter(function(item){
      return item.id !== job.id;
    });

    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");

  }else{

    savedJobs.push(job);

    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");

  }

  renderFavorites();

  });

    jobList.appendChild(jobCard);

  });

}


// ---------------------
// RENDER FAVORITES
// ---------------------

function renderFavorites(){

  favoritesList.innerHTML = "";

  if(savedJobs.length === 0){

    favoritesList.innerHTML = `
      <p class="empty-state">
        No saved jobs yet
      </p>
    `;

    return;
  }

  savedJobs.forEach(function(job){

    favoritesList.innerHTML += `
      <div class="favorite-card">
        <h4>${job.title}</h4>
        <p>${job.company}</p>

        <button class="remove-btn" data-id="${job.id}">
          Remove
        </button>
      </div>
    `;

  });

  const removeButtons = favoritesList.querySelectorAll(".remove-btn");   

  removeButtons.forEach(function(button){

    button.addEventListener("click", function(){

      const jobId = Number(button.dataset.id);

      savedJobs = savedJobs.filter(function(job){
        return job.id !== jobId;
      });

      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

      renderFavorites();
      renderJobs(jobs);

    });

  });

}
  

// ---------------------
// MODAL 
// ---------------------

function openModal(job){

  modalTitle.textContent = job.title;
  modalCompany.textContent = "Company: " + job.company;
  modalLocation.textContent = "Location: " + job.location;
  modalType.textContent = "Type: " + job.type;
  modalDescription.textContent = job.description;

  modal.style.display = "block";

}

closeModal.addEventListener("click", function(){
  modal.style.display = "none";
});




// ---------------------
//  FILTER LOGIC
// ---------------------

function applyFilters(){

  const selectedType = typeFilter.value;
  const selectedLocation = locationFilter.value;
  const searchText = searchInput.value.toLowerCase();

 const filteredJobs = jobs.filter(function(job){

  if(selectedType !== "" && job.type !== selectedType){
    return false;
  }

  if(selectedLocation !== "" && job.location !== selectedLocation){
    return false;
  }

  if(searchText !== "" && !job.title.toLowerCase().includes(searchText)){
    return false;
  }


  return true;

});

  renderJobs(filteredJobs);

}


// ---------------------
// EVENT LISTENERS
// ---------------------

typeFilter.addEventListener("change", applyFilters);
locationFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);


window.addEventListener("click", function(event){

  if(event.target === modal){
    modal.style.display = "none";
  }

});

// ---------------------
//  INITIAL RENDER
// ---------------------

renderJobs(jobs);
renderFavorites();
