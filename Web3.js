document.getElementById('metamaskLogin').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const userAccount = accounts[0];
            document.getElementById('transactionStatus').textContent = `Connected to MetaMask: ${userAccount}`;
        } catch (error) {
            document.getElementById('transactionStatus').textContent = 'Failed to connect to MetaMask: ' + error.message;
        }
    } else {
        alert('MetaMask is not installed!');
    }
});
