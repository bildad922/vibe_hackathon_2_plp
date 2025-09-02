// eduverse.js
        // Application State
        const state = {
            currentUser: null,
            users: [
                { email: 'demo@eduverse.com', password: 'password123', name: 'Demo User', plan: 'free' }
            ],
            subscriptions: [
                { name: 'Monthly Plan', id: 'monthly', price: 4.99, period: 'month' },
                { name: 'Annual Plan', id: 'annual', price: 49.99, period: 'year' },
                { name: 'Family Plan', id: 'family', price: 79.99, period: 'year' }
            ]
        };

        // DOM Elements
        const modals = {
            payment: document.getElementById('paymentModal'),
            login: document.getElementById('loginModal'),
            signup: document.getElementById('signupModal')
        };

        const forms = {
            payment: document.getElementById('paymentForm'),
            login: document.getElementById('loginForm'),
            signup: document.getElementById('signupForm')
        };

        const mainContent = document.getElementById('mainContent');
        const dashboard = document.getElementById('dashboard');
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');
        const userPlan = document.getElementById('userPlan');

        // Modal functionality
        const subscribeBtn = document.getElementById('subscribeBtn');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const upgradeBtn = document.getElementById('upgradeBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const closeBtns = document.querySelectorAll('.close');
        const showSignup = document.getElementById('showSignup');
        const showLogin = document.getElementById('showLogin');
        const planButtons = document.querySelectorAll('.select-plan');

        // Event Listeners
        subscribeBtn.addEventListener('click', () => openModal('payment'));
        loginBtn.addEventListener('click', () => openModal('login'));
        signupBtn.addEventListener('click', () => openModal('signup'));
        upgradeBtn.addEventListener('click', () => openModal('payment'));
        logoutBtn.addEventListener('click', logout);
        
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal('signup');
        });
        
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal('login');
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });

        planButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const plan = this.getAttribute('data-plan');
                document.getElementById('plan').value = plan;
                openModal('payment');
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeAllModals();
            }
        });

        // Form Submissions
        forms.login.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            login(email, password);
        });

        forms.signup.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            signup(name, email, password);
        });

        forms.payment.addEventListener('submit', function(e) {
            e.preventDefault();
            const plan = document.getElementById('plan').value;
            processPayment(plan);
        });

        // Functions
        function openModal(modalName) {
            closeAllModals();
            if (modals[modalName]) {
                modals[modalName].style.display = 'flex';
            }
        }

        function closeAllModals() {
            for (const key in modals) {
                if (modals[key]) {
                    modals[key].style.display = 'none';
                }
            }
        }

        function login(email, password) {
            const user = state.users.find(u => u.email === email && u.password === password);
            if (user) {
                state.currentUser = user;
                updateUI();
                closeAllModals();
                alert('Login successful!');
            } else {
                alert('Invalid email or password!');
            }
        }

        function signup(name, email, password) {
            // Check if user already exists
            if (state.users.some(u => u.email === email)) {
                alert('User with this email already exists!');
                return;
            }
            
            // Create new user
            const newUser = { name, email, password, plan: 'free' };
            state.users.push(newUser);
            state.currentUser = newUser;
            
            updateUI();
            closeAllModals();
            alert('Account created successfully!');
        }

        function logout() {
            state.currentUser = null;
            updateUI();
            alert('Logged out successfully!');
        }

        function processPayment(plan) {
            if (!state.currentUser) {
                alert('Please login first!');
                openModal('login');
                return;
            }
            
            // In a real application, this would communicate with a payment processor
            // For this demo, we'll just simulate a successful payment
            state.currentUser.plan = plan;
            
            // Find the plan details
            const planDetails = state.subscriptions.find(sub => sub.id === plan);
            
            updateUI();
            closeAllModals();
            alert(`Payment processed successfully! You've subscribed to the ${planDetails.name}.`);
        }

        function updateUI() {
            if (state.currentUser) {
                // User is logged in
                authButtons.style.display = 'none';
                userMenu.style.display = 'block';
                userName.textContent = state.currentUser.name;
                userPlan.textContent = state.currentUser.plan.charAt(0).toUpperCase() + state.currentUser.plan.slice(1) + ' Plan';
                
                // Show dashboard if user has a paid plan
                if (state.currentUser.plan !== 'free') {
                    mainContent.style.display = 'none';
                    dashboard.style.display = 'block';
                } else {
                    mainContent.style.display = 'block';
                    dashboard.style.display = 'none';
                }
            } else {
                // User is not logged in
                authButtons.style.display = 'flex';
                userMenu.style.display = 'none';
                mainContent.style.display = 'block';
                dashboard.style.display = 'none';
            }
        }

        // Initialize the application
        updateUI();