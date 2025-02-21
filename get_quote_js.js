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

let car_data;
const modelSelect = document.getElementById('model');
const makeSelect = document.getElementById('make');
const variantSelect = document.getElementById('variant');
document.getElementById('purchaseDate').max = new Date().toISOString().split("T")[0];
async function fetchCarData() {
    try {
        const response = await fetch('http://localhost:5000/cars');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        car_data=data;
        const makes= new Set();
        data.forEach(car => {
            makes.add(car.make);
        });
        
        //add car makes to options.
        
        makes.forEach(maker => {
            const option = document.createElement('option');
            option.value = maker;
            option.textContent = maker;
            makeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching car data:', error);
    }
}

// document.getElementById('make').addEventListener('click',fetchCarData());
// document.getElementById('model').addEventListener('click',()=>{
//     modelSelect.innerHTML='';
//         car_data.forEach(car => {
//             const option = document.createElement('option');
//             option.value = car.model;
//             option.textContent = car.model;
//             if(car.make==makeSelect.value)
//                 modelSelect.appendChild(option);
//         });
// });
// document.getElementById('variant').addEventListener('click',()=>{
//     variantSelect.innerHTML='';
//         car_data.forEach(car => {
//             const option = document.createElement('option');
//             option.value = car.variant;
//             option.textContent = car.variant;
//             if(car.model==modelSelect.value)
//                 variantSelect.appendChild(option);
//         });
// });
document.getElementById('make').addEventListener('click',fetchCarData());
document.getElementById('make').addEventListener('change',(e)=>{
    
    modelSelect.innerHTML='<option value="none">Select the car model.</option>';
    modelSelect.ariaSelected="false";
        car_data.forEach(car => {
            const option = document.createElement('option');
            option.value = car.model;
            option.textContent = car.model;
            if(car.make==makeSelect.value)
                modelSelect.appendChild(option);
        });
});
document.getElementById('model').addEventListener('change',(e)=>{
    
    variantSelect.innerHTML='<option value="none">Select the car variant.</option>';
        car_data.forEach(car => {
            const option = document.createElement('option');
            option.value = car.variant;
            option.textContent = car.variant;
            if(car.model==modelSelect.value)
                variantSelect.appendChild(option);
        });
});

async function findCarCapacity(cars, make, model, variant) {
    // Iterate through the array of car objects
    for (const car of cars) {
        // Check if make, model, and variant match
        if (car.make === make && car.model === model && car.variant === variant) {
            return car.capacity; // Return the capacity if found
        }
    }
    return null; // Return null if no match is found
}

function idv_calculator(cars, make, model, variant, date_of_purchase){
    let price;
    let today= new Date();
    let purchased=new Date(date_of_purchase);
    let yeardiff=today.getFullYear()-purchased.getFullYear();
    //let monthdiff=today.getMonth()-date_of_purchase.getMonth();
    for (const car of cars) {
        // Check if make, model, and variant match
        if (car.make === make && car.model === model && car.variant === variant) {
            price= car.ex_showroom_price; // Return the capacity if found
        }
    }
    if(yeardiff==0){
        return price-0.05*price;
    }
    else if(yeardiff==1){
        return price-0.1*price;
    }
    else if(yeardiff==2){
        return price-0.15*price;
    }
    else if(yeardiff==3){
        return price-0.25*price;
    }
    else if(yeardiff==4){
        return price-0.35*price;
    }
    else if(yeardiff==5){
        return price-0.40*price;
    }
    else{
        return price/2;
    }
}

document.getElementById('vehicle-form').addEventListener('submit', async function(e) {
    console.log(e);
    e.preventDefault();
    const vehicleType = document.getElementById('vehicleType').value;
    const planType = document.getElementById('planType').value;
    const addOnRequirements = document.getElementById('addOnRequirements').value;
    const purchaseDate=document.getElementById('purchaseDate').value
    console.log(purchaseDate);
    console.log(typeof(purchaseDate));
    let basePremium = 0;
    let idv=idv_calculator(car_data, makeSelect.value, modelSelect.value, variantSelect.value,purchaseDate);
    let od=idv*0.025;


    switch (planType) {
        case 'comprehensive':
            const cc= await findCarCapacity(car_data, makeSelect.value, modelSelect.value, variantSelect.value)
            console.log(cc);
            console.log(vehicleType);
            let Premium;
            if(cc>1500 && vehicleType==='Already_Registered')
                Premium=7890;
            else if(cc>1000 && vehicleType==='Already_Registered')
                Premium=3221;
            else if(cc<=1000 && vehicleType==='Already_Registered')
                Premium=2072;
            else if(cc>1500 && vehicleType==='New')
                Premium=24305;
            else if(cc>1000 && vehicleType==='New')
                Premium=9534;
            else
                Premium=5286;
            basePremium=od+Premium
            break;
        case 'thirdParty':
            const capacity= await findCarCapacity(car_data, makeSelect.value, modelSelect.value, variantSelect.value)
            console.log(capacity);
            console.log(vehicleType);
            if(capacity>1500 && vehicleType==='Already_Registered')
                basePremium=7890;
            else if(capacity>1000 && vehicleType==='Already_Registered')
                basePremium=3221;
            else if(capacity<=1000 && vehicleType==='Already_Registered')
                basePremium=2072;
            else if(capacity>1500 && vehicleType==='New')
                basePremium=24305;
            else if(capacity>1000 && vehicleType==='New')
                basePremium=9534;
            else
                basePremium=5286; // Example base premium for third party
            break;
        case 'ownDamage':
            basePremium = od; // Example base premium for own damage
            break;
    }

    
    // Add-on requirements adjustments
    if (addOnRequirements === 'ncb') {
        basePremium *= 0.8; // 20% discount for No Claim Bonus
    }
    else if (addOnRequirements === 'zeroDepreciation') {
        basePremium += basePremium*0.015; // Additional cost for Zero Depreciation
    }

    // Display the calculated premium
    const result=document.getElementById('result').innerText = `Expected Premium Price: ₹${basePremium.toFixed(2)}`;
});


