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
        document.getElementById('get_quote').addEventListener('click', () => {
            if(user){
                window.location.href="get_quote.html"
            }
            else{
                window.location.href="signup.html"
            }
        });
        document.getElementById('acc').addEventListener('click', () => {
            if(user){
                window.location.href="profile.html"
            }
            else{
                window.location.href="signup.html"
            }
        });