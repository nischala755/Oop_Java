document.addEventListener('DOMContentLoaded', () => {
    const metamaskLoginButton = document.getElementById('metamaskLogin');
    const walletStatus = document.getElementById('walletStatus');
    const amountInputDiv = document.getElementById('amountInput');
    const amountInput = document.getElementById('amount');
    const sendPaymentButton = document.getElementById('sendPayment');
    const transactionStatus = document.getElementById('transactionStatus');
    let web3;

    // Handle MetaMask Login
    metamaskLoginButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

                // Display wallet address
                const walletAddress = accounts[0];
                walletStatus.textContent = `Connected to MetaMask: ${walletAddress}`;

                // Initialize Web3 instance
                web3 = new Web3(window.ethereum);

                // Enable the 'Send Payment' button and amount input after successful connection
                amountInputDiv.style.display = 'block';
                sendPaymentButton.style.display = 'inline';

                // Set up the send payment functionality
                sendPaymentButton.addEventListener('click', async () => {
                    const amount = amountInput.value;
                    if (!amount || parseFloat(amount) <= 0) {
                        transactionStatus.textContent = "Please enter a valid amount.";
                        transactionStatus.className = "failure";
                    } else {
                        await simulatePayment(walletAddress, amount);
                    }
                });
            } catch (error) {
                walletStatus.textContent = `Failed to connect to MetaMask: ${error.message}`;
                walletStatus.className = "failure";
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    });

    // Function to simulate sending a payment
    async function simulatePayment(fromAddress, amountInEther) {
        const toAddress = "0xRecipientAddress"; // Replace with recipient address

        if (!web3) {
            transactionStatus.textContent = "Web3 is not initialized.";
            transactionStatus.className = "failure";
            return;
        }

        try {
            // Generate a fake transaction hash
            const fakeTxHash = "0x" + Math.random().toString(16).substr(2, 64);

            // Mock transaction status as successful
            setTimeout(() => {
                transactionStatus.innerHTML = `
                    Transaction successful!<br> 
                    Sent <strong>${amountInEther} ETH</strong>.<br>
                    Transaction Hash: <strong>${fakeTxHash}</strong>`;
                transactionStatus.className = "success";
            }, 1000); // Simulate a delay for the transaction processing
        } catch (error) {
            transactionStatus.textContent = `Transaction failed: ${error.message}`;
            transactionStatus.className = "failure";
        }
    }
});
