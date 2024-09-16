//get participants from localStorage
function getParticipants(){
    const participants=localStorage.getItem("participants");
    return participants ? JSON.parse(participants) : [];
}

//save participants to localStorage
function saveParticipants(participants){
    localStorage.setItem("participants", JSON.stringify(participants));
}


function renderParticipants(){
    const participantsContainer=document.querySelector(".participantsContainer");
    participantsContainer.innerHTML="";

    const participants=getParticipants();
    participants.forEach((participant) =>{
        const participantItem = document.createElement("div")
        participantItem.className="participant-Item";
        participantItem.dataset.id=participant.id;

        participantItem.innerHTML=`
        <div class="icon" onclick="toggleDropdown(this)">
            <i class="fa fa-ellipsis-v"></i>
            <div class="dropdown-menu">
                <a href="#" onclick="editParticipantPrompt('${participant.id}')">Edit</a>
                <a href="#" onclick="deleteParticipant('${participant.id}')">Delete</a>
            </div>
        </div>
        Name:${participant.name}<br>
        Age: ${participant.age}<br>
        Phone: ${participant.phone}<br>
        Email: ${participant.email}<br>
        <strong>Class Details</strong>
        Type: ${participant.selectedClassValue}<br>
        Slot: ${participant.select_slot}<br>
        Number Of Participants:${participant.noOfParticipants}<br>
        <strong>Total Cost:${participant.totalCost}</strong><br>`;

        participantsContainer.appendChild(participantItem);


    });


}

//Toggle dropdown menu visibility
function toggleDropdown(iconElement){
    const dropdown=iconElement.querySelector(".dropdown-menu");
    dropdown.style.display=dropdown.style.display==="block"?"none":"block";
}




//open modal
    document.getElementById("btn_register").addEventListener("click",function(){
    document.getElementById("modalContainer").style.display="flex";
    document.getElementById("ModalForm").dataset.action="add";
    document.getElementById("ModalForm").reset()
    // document.getElementById("modalTitle").textContent="Register a Participant"; //set modal title

})

//close modal
document.getElementById("modalClose").addEventListener("click", ()=>{
    document.getElementById("modalContainer").style.display="none";
});


let classes=[
    {type: "Painting", slots:["8AM-10AM", "11AM-1PM", "1:30PM-3:30PM"]},
    {type:"Drawing", slots:["4PM-6PM","6:30PM-8:30PM", "9PM-11PM"]},
    {type:"Sculpture", slots:["7AM-9AM", "9:30AM-11:30AM", "12PM-2PM"]}
];

document.addEventListener('DOMContentLoaded', () => { //to load the html and script before loading images
    classTypes();
});


function classTypes(){
    let select_class=document.getElementById("select_class")

    classes.forEach(classItem=>{
        let option=document.createElement("option")
        option.value = classItem.type
        option.textContent=classItem.type
        select_class.appendChild(option)
    });
}

function changeSlots(){
    let selectedClassValue=document.getElementById("select_class").value
    let select_slot=document.getElementById("select_slot")

    select_slot.innerHTML='<option value="">Select Available Slot</option>'

    let findClass=classes.find(m => m.type === selectedClassValue) //to find sel class

    if(findClass){
        findClass.slots.forEach(slot=>{
            let option=document.createElement("option");
            option.value=slot;
            option.textContent=slot;
            select_slot.appendChild(option)

        })
    }


}

function validate(){
    valid=true;
    let name=document.getElementById("name").value
    let age=document.getElementById("age").value
    let phone=document.getElementById("phone").value
    let email=document.getElementById("email").value

    let g_name=document.getElementById("g_name").value
    let g_phone=document.getElementById("g_phone").value
    let g_email=document.getElementById("g_email").value

    let name_err=document.getElementById("name_err")
    let age_err=document.getElementById("age_err")
    let phone_err=document.getElementById("phone_err")

    if(name===""){
        name_err.textContent="Name Cannot be empty"
        valid=false
    }else{
        name_err=""
    }

    if(age===""){
        age_err.textContent="Age cannot be empty"
        valid=false
    }else{
        age_err=""
    }

    if(phone===""){
        phone_err.textContent="Phone Number cannot be empty"
        valid=false
    }else{
        phone_err=""
    }

    if(email===""){
        email_err.textContent="Email cannot be empty"
        valid=false
    }else{
        email_err=""
    }

    if(age<18){
        document.getElementById("guardian").classList.remove("hidden")

        if(g_name===""){
            g_name_err.textContent="Enter Guardian Name"
            valid=false
        }else{
            g_name_err=""
        }
    
        if(g_phone===""){
            g_phone_err.textContent="Enter Guardian Phone number"
            valid=false
        }else{
            g_phone_err=""
        }
    
        if(g_email===""){
            g_email_err.textContent="Enter Guardian Email"
            valid=false
        }else{
            g_email_err=""
        }
        
    }


    if(!valid){
        console.log("Error Filling the form")
    }else{
        console.log("Form Submitted")
        submitRegistration()
    }
    
}

function submitRegistration(){
    let name=document.getElementById("name").value
    let age=document.getElementById("age").value
    let phone=document.getElementById("phone").value
    let email=document.getElementById("email").value
    let selectedClassValue=document.getElementById("select_class").value
    let select_slot=document.getElementById("select_slot").value
    let noOfParticipants=document.getElementById("noOfParticipants").value
    let registrationSummary=document.getElementById("registrationSummary")
    let details=document.getElementById("details")
    let err_message=document.getElementById("err_message")

    

    //slot check availability
    let classItem = classes.find(m => m.type === selectedClassValue)
    let availableSlot = classItem && classItem.slots.includes(select_slot);
    if(!availableSlot){
        err_message.textContent="No slot available for this class"
        return
    }

    let costofParticipant=100
    let totalCost = costofParticipant * noOfParticipants

    //summary
    details.innerHTML= 
    `<strong>Detail of Participant</strong><br>
    Name:${name}<br>
    Age: ${age}<br>
    Phone: ${phone}<br>
    Email: ${email}<br>
    <strong>Class Details</strong><br>
    Type: ${selectedClassValue}<br>
    Slot: ${select_slot}<br>
    Number Of Participants:${noOfParticipants}<br>
    <strong>Total Cost:${totalCost}</strong><br>`

    registrationSummary.classList.remove("hidden");
}

// function submitreg(){
    document.getElementById("ModalForm").addEventListener("submit", (e)=>{
        e.preventDefault()

    valid=true;
    let name=document.getElementById("name").value
    let age=document.getElementById("age").value
    let phone=document.getElementById("phone").value
    let email=document.getElementById("email").value

    let g_name=document.getElementById("g_name").value
    let g_phone=document.getElementById("g_phone").value
    let g_email=document.getElementById("g_email").value

    let name_err=document.getElementById("name_err")
    let age_err=document.getElementById("age_err")
    let phone_err=document.getElementById("phone_err")

    if(name===""){
        name_err.textContent="Name Cannot be empty"
        valid=false
    }else{
        name_err=""
    }

    if(age===""){
        age_err.textContent="Age cannot be empty"
        valid=false
    }else{
        age_err=""
    }

    if(phone===""){
        phone_err.textContent="Phone Number cannot be empty"
        valid=false
    }else{
        phone_err=""
    }

    if(email===""){
        email_err.textContent="Email cannot be empty"
        valid=false
    }else{
        email_err=""
    }

    if(age<18){
        document.getElementById("guardian").classList.remove("hidden")

        if(g_name===""){
            g_name_err.textContent="Enter Guardian Name"
            valid=false
        }else{
            g_name_err=""
        }
    
        if(g_phone===""){
            g_phone_err.textContent="Enter Guardian Phone number"
            valid=false
        }else{
            g_phone_err=""
        }
    
        if(g_email===""){
            g_email_err.textContent="Enter Guardian Email"
            valid=false
        }else{
            g_email_err=""
        }
        
    }


    if(!valid){
        console.log("Error Filling the form")
    }else{
        console.log("Form Submitted")

        const form=e.target;
        let name=document.getElementById("name").value
        let age=document.getElementById("age").value
        let phone=document.getElementById("phone").value
        let email=document.getElementById("email").value
        let selectedClassValue=document.getElementById("select_class").value
        let select_slot=document.getElementById("select_slot").value
        let noOfParticipants=document.getElementById("noOfParticipants").value

        let costofParticipant=100;
        totalCost=costofParticipant * noOfParticipants;

        const action=form.dataset.action;

        let participants=getParticipants();
        if(action==="add"){
            const newParticipant={
                id: Date.now().toString(), //unique ID for each todo
                name,
                age,
                phone,
                email,
                selectedClassValue,
                select_slot,
                noOfParticipants,
                totalCost
            };
        participants.push(newParticipant);
        }else if(action==="edit"){
            const participantId=form.dataset.editId;
            const participant=participants.find((t) => t.id===participantId);
            if(participant){
                participant.name=name;
                participant.age=age;
            }
        }

        saveParticipants(participants);
        document.getElementById("modalContainer").style.display="none";
        renderParticipants(); //refresh the todos list
    }

        
    

});
// }

//edit existing participant
function editParticipantPrompt(id){
    let participants=getParticipants();
    let participant = participants.find((t) => t.id === id);

    if(participant){
        document.getElementById("name").value=participant.name;
        document.getElementById("age").value=participant.age;
        document.getElementById("phone").value=participant.phone;
        document.getElementById("email").value = participant.email;
        document.getElementById("select_class").value = participant.select_class;
        document.getElementById("select_slot").value = participant.select_slot;
        document.getElementById("noOfParticipants").value = participant.noOfParticipants;

        //set form action to edit and store the Id to bre edited
        const form = document.getElementById("ModalForm");
        form.dataset.action="edit";
        form.dataset.editId = id;

        document.getElementById("modalContainer").style.display = "flex";
        document.getElementById("modalTitle").textContent="Edit Participant"
    }
}

//Delete Participants
function deleteParticipant(id){
    if(confirm("Are you sure you want to delete this participant")){
        let participants = getParticipants();
        participants = participants.filter((t) => t.id !==id);
        saveParticipants(participants);
        renderParticipants();//refresh Participants
    }
}

//close dropdown when clicking outside of it
document.addEventListener("click", (e) => {
    if(!e.target.closest(".dropdown-menu") && !e.target.closest(".icon")){
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
            menu.style.display = "none"
        });
    }
});

//initial render of participants
renderParticipants(); 