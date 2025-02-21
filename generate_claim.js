let flag=false;
document.getElementById('log_out_btn').style.visibility='hidden';
const user = localStorage.getItem('user');
        if (user) {
            document.getElementById('sign_in_btn').style.fontSize='12px';
            document.getElementById('sign_in_btn').innerText = `Logged in as: ${JSON.parse(user).email}`;
            document.getElementById('log_out_btn').style.visibility='visible';
            
            document.getElementById('sign_in_btn').addEventListener('click', () => {
                window.location.href = '\\insurance-website\\signup.html'; // Redirect to login page
            });
        }

        // Logout functionality
        document.getElementById('log_out_btn').addEventListener('click', () => {
            localStorage.removeItem('user'); // Clear user data
            window.location.href = 'signup.html'; // Redirect to login page
        });
document.getElementById('claim-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    flag=true;
    const formData = new FormData();
    const eId = document.getElementById('eId').value;
    const Company_Name = document.getElementById('Company_Name').value;
    const Policy_Type = document.getElementById('Policy_Type').value;
    const Policy_Tier = document.getElementById('Policy_Tier').value;
    const billAmount = document.getElementById('billAmount').value;
    const fileInput = document.getElementById('damagePic').files[0];

    formData.append('eId', eId);
    formData.append('Company_Name', Company_Name);
    formData.append('Policy_Type', Policy_Type);
    formData.append('Policy_Tier', Policy_Tier);
    formData.append('billAmount', billAmount);
    formData.append('damagePic', fileInput);

    // Send the form data using fetch
    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        document.getElementById('result').innerHTML=`<p>Evaluation Result</p>
        <p>Car validation check:  <strong>${data.gate1_result}</strong> </p>
        <p>Damage presence check: <strong> ${data.gate2_result}</strong> </p>
        <p>Location of damage:  <strong>${data.location}</strong> </p>
        <p>Severity of damage:  <strong>${data.severity}</strong> </p>
        ` // Show success message
        flag=true;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});


document.getElementById('saveClaim').addEventListener('click', (e)=>{
    e.preventDefault();
    if(flag){
        window.location.href="profile.html";
    }
    else{
        alert("Fill details first");
    }
})