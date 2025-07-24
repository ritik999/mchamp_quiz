export const getMiniPayAddress = async() => {
            if (window && window.ethereum) {
              if (window.ethereum.isMiniPay) {
                let accounts = await window.ethereum.request({
                  method: "eth_requestAccounts",
                  params: [],
                });
                 return accounts[0];
              }
              }
              // return '0x3e6604F5c66265204154ebaB653aedbDA21CbA5c'
          };