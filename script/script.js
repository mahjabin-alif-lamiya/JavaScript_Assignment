let motJobs       = document.getElementById("total-job");
let allinterviews = document.getElementById("all-interviews");
let allrejected   = document.getElementById("all-rejected");
let alljob        = document.getElementById("all-jobs");

const alljobFilterbtn      = document.getElementById('all-jobFilter');
const interviewFilterbtn   = document.getElementById('all-interviewfilter');
const rejectedFilterbtn    = document.getElementById('all-rejectedfilter');
const filteredJob          = document.getElementById('filtered-section');
const emptySection         = document.getElementById('empty-section');
const totalNumberEl        = document.getElementById('TotalNumberOfJob');
const mainContainer        = document.querySelector('main');


let interviewList = [];
let rejectedList  = [];


let activeFilter = 'all';


const jobsData = [
  {
    name: "Mobile First Corp",
    title: "React Native Developer",
    salary: "Remote . Full-time . $130,000 - $175,000",
    description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
  },
  {
    name: "WebFlow Agency",
    title: "Frontend Developer",
    salary: "Hybrid . Full-time . $80,000 - $110,000",
    description: "Design and implement responsive web experiences for modern clients using WebFlow-integrated technology stacks.",
  },
  {
    name: "DataViz Solutions",
    title: "Data Engineer",
    salary: "Remote . Full-time . $120,000 - $160,000",
    description: "Help us create reliable data pipelines and infrastructure using Apache Spark, Kafka, and Flink to power data-driven decisions.",
  },
  {
    name: "CloudFirst Inc",
    title: "Backend Engineer",
    salary: "Onsite . Full-time . $100,000 - $140,000",
    description: "Build cloud-based backend systems using Node.js, PostgreSQL, and AWS to power fast and reliable APIs at scale.",
  },
  {
    name: "Innovation Labs",
    title: "UI/UX Designer",
    salary: "Remote . Part-time . $70,000 - $90,000",
    description: "Create beautiful UI and UX frameworks for future digital products with our brilliant development team.",
  },
  {
    name: "MegaCorp Solutions",
    title: "Project Manager",
    salary: "Hybrid . Full-time . $95,000 - $120,000",
    description: "Lead cross-functional engineering teams, communicate timelines, and ensure delivery quality and stakeholder alignment.",
  },
  {
    name: "StartupXYZ",
    title: "Full Stack Developer",
    salary: "Onsite . Full-time . $90,000 - $120,000",
    description: "Build and maintain full-stack features using Node.js and React with a team of senior engineers.",
  },
  {
    name: "TechCorp Industries",
    title: "Senior Frontend Developer",
    salary: "Remote . Full-time . $110,000 - $145,000",
    description: "Manage cloud infrastructure, CI/CD pipelines, and containerized deployments using Docker, Kubernetes, and AWS.",
  },
];


function renderAllJobs() {
  alljob.innerHTML = '';

  for (let job of jobsData) {
    let div = document.createElement('div');
    div.classList = 'job-card bg-white py-4 mt-[10px] pl-4 shadow-lg rounded-lg';
    div.innerHTML = `
      <div class="flex justify-between">
        <h2 class="job-name text-2xl font-bold mt-3">${job.name}</h2>
        <button class="delete-job btn btn-soft bg-transparent mx-4 rounded-[50%] text-1xl px-1 py-1">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <p class="job-title mb-4 text-[#565656]">${job.title}</p>
      <p class="job-salary mb-4 text-[#565656]">${job.salary}</p>
      <h4 class="job-status bg-blue-100 text-blue-700 rounded-lg p-2 inline-block mb-4">NOT APPLIED</h4>
      <p class="job-end-title text-[#565656]">${job.description}</p>
      <div class="py-4 flex gap-4">
        <button class="gate-interview btn btn-outline btn-success">INTERVIEW</button>
        <button class="gate-rejected btn btn-outline btn-error">REJECTED</button>
      </div>
    `;
    alljob.appendChild(div);
  }

  calculationTotalJobs();
}


function calculationTotalJobs() {
  motJobs.innerText       = alljob.children.length;
  allinterviews.innerText = interviewList.length;
  allrejected.innerText   = rejectedList.length;

  if (activeFilter === 'all') {
    totalNumberEl.innerText = alljob.children.length + ' jobs';
  }
}


function createFilteredCard(job) {
  let statusLabel = job.status === 'interview'
    ? `<h4 class="job-status bg-green-100 text-green-700 rounded-lg p-2 inline-block mb-4">INTERVIEW</h4>`
    : `<h4 class="job-status bg-red-100 text-red-700 rounded-lg p-2 inline-block mb-4">REJECTED</h4>`;

  let div = document.createElement('div');
  div.classList = 'job-card bg-white py-4 mt-[10px] pl-4 shadow-lg rounded-lg';
  div.innerHTML = `
    <div class="flex justify-between">
      <h2 class="job-name text-2xl font-bold mt-3">${job.companyName}</h2>
      <button class="delete-job btn btn-soft bg-transparent mx-4 rounded-[50%] text-1xl px-1 py-1">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
    <p class="job-title mb-4 text-[#565656]">${job.jobTitle}</p>
    <p class="job-salary mb-4 text-[#565656]">${job.jobLocation}</p>
    ${statusLabel}
    <p class="job-end-title text-[#565656]">${job.jobendtitle}</p>
    <div class="py-4 flex gap-4">
      <button class="gate-interview btn btn-outline btn-success">INTERVIEW</button>
      <button class="gate-rejected btn btn-outline btn-error">REJECTED</button>
    </div>
  `;
  return div;
}


function renderFilteredList(list) {
  filteredJob.innerHTML = '';

  if (list.length === 0) {
    filteredJob.classList.add('hidden');
    emptySection.classList.remove('hidden');
    totalNumberEl.innerText = '0 jobs';
    return;
  }

  emptySection.classList.add('hidden');
  filteredJob.classList.remove('hidden');
  totalNumberEl.innerText = list.length + ' jobs';

  for (let job of list) {
    filteredJob.appendChild(createFilteredCard(job));
  }
}


function togglestyle(id) {
  activeFilter = id === 'all-jobFilter' ? 'all'
               : id === 'all-interviewfilter' ? 'interview'
               : 'rejected';

 
  [alljobFilterbtn, interviewFilterbtn, rejectedFilterbtn].forEach(btn => {
    btn.classList.remove('btn-primary', 'text-white');
    btn.classList.add('btn-outline');
  });

  if (id === 'all-jobFilter') {
    alljobFilterbtn.classList.add('btn-primary', 'text-white');
    alljobFilterbtn.classList.remove('btn-outline');

    alljob.classList.remove('hidden');
    filteredJob.classList.add('hidden');
    emptySection.classList.add('hidden');
    totalNumberEl.innerText = alljob.children.length + ' jobs';

  } else if (id === 'all-interviewfilter') {
    interviewFilterbtn.classList.add('btn-primary', 'text-white');
    interviewFilterbtn.classList.remove('btn-outline');

    alljob.classList.add('hidden');
    renderFilteredList(interviewList);

  } else if (id === 'all-rejectedfilter') {
    rejectedFilterbtn.classList.add('btn-primary', 'text-white');
    rejectedFilterbtn.classList.remove('btn-outline');

    alljob.classList.add('hidden');
    renderFilteredList(rejectedList);
  }
}


mainContainer.addEventListener('click', function (event) {

  const card = event.target.closest('.job-card');
  if (!card) return;

 
  if (event.target.classList.contains('gate-interview')) {
    const jobTitle    = card.querySelector('.job-title').innerText;
    const companyName = card.querySelector('.job-name').innerText;
    const jobLocation = card.querySelector('.job-salary').innerText;
    const jobendtitle = card.querySelector('.job-end-title').innerText;

    const divinfo = { jobTitle, companyName, jobLocation, jobendtitle, status: 'interview' };

   
    const inRejected = rejectedList.findIndex(item => item.jobTitle === jobTitle);
    if (inRejected !== -1) rejectedList.splice(inRejected, 1);

   
    const inInterview = interviewList.find(item => item.jobTitle === jobTitle);
    if (!inInterview) interviewList.push(divinfo);
    else inInterview.status = 'interview'; 

    
    const statusBadge = card.querySelector('.job-status');
    statusBadge.className = 'job-status bg-green-100 text-green-700 rounded-lg p-2 inline-block mb-4';
    statusBadge.innerText = 'INTERVIEW';

    calculationTotalJobs();

    
    if (activeFilter === 'rejected') renderFilteredList(rejectedList);
    if (activeFilter === 'interview') renderFilteredList(interviewList);
  }

 
  if (event.target.classList.contains('gate-rejected')) {
    const jobTitle    = card.querySelector('.job-title').innerText;
    const companyName = card.querySelector('.job-name').innerText;
    const jobLocation = card.querySelector('.job-salary').innerText;
    const jobendtitle = card.querySelector('.job-end-title').innerText;

    const divinfo = { jobTitle, companyName, jobLocation, jobendtitle, status: 'rejected' };

    
    const inInterview = interviewList.findIndex(item => item.jobTitle === jobTitle);
    if (inInterview !== -1) interviewList.splice(inInterview, 1);

   
    const inRejected = rejectedList.find(item => item.jobTitle === jobTitle);
    if (!inRejected) rejectedList.push(divinfo);
    else inRejected.status = 'rejected';

   
    const statusBadge = card.querySelector('.job-status');
    statusBadge.className = 'job-status bg-red-100 text-red-700 rounded-lg p-2 inline-block mb-4';
    statusBadge.innerText = 'REJECTED';

    calculationTotalJobs();

   
    if (activeFilter === 'interview') renderFilteredList(interviewList);
    if (activeFilter === 'rejected') renderFilteredList(rejectedList);
  }


  if (event.target.closest('.delete-job')) {
    const jobTitle = card.querySelector('.job-title').innerText;

    
    interviewList = interviewList.filter(item => item.jobTitle !== jobTitle);
    rejectedList  = rejectedList.filter(item => item.jobTitle !== jobTitle);

    card.remove();
    calculationTotalJobs();

  
    if (activeFilter === 'interview') renderFilteredList(interviewList);
    if (activeFilter === 'rejected') renderFilteredList(rejectedList);
  }

});


renderAllJobs();