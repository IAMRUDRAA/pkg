const express = require('express');

const Web3 = require('web3');

const bodyParser = require('body-parser');

const { body, validationResult } = require('express-validator');

const HDWalletProvider = require('@truffle/hdwallet-provider');

const BigNumber = require('bignumber.js');

const app = express();

app.use(bodyParser.json())

var web3 = new Web3('https://mainnet-rpc.thundercore.com');

let minABI = [

    // transfer

    {

     "constant": false,

     "inputs": [

      {

       "name": "_to",

       "type": "address"

      },

      {

       "name": "_value",

       "type": "uint256"

      }

     ],

     "name": "transfer",

     "outputs": [

      {

       "name": "",

       "type": "bool"

      }

     ],

     "type": "function"

    }

   ];

app.get('/', (req, res) => {

try {

const provider = new Web3('https://mainnet-rpc.thundercore.com');

const  web3 = new Web3(provider);

    const ret = web3.eth.accounts.create(web3.utils.randomHex(32))

        res.status(200).json({response: ret});

     } catch (e) {

        res.status(400).json({error: e});

        console.log(e)

    }

})

app.post('/sendmatic', body('recipient').not().isEmpty().trim().escape(), body('amount').isNumeric(), body('private_key').not().isEmpty().trim().escape(),  (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient, private_key, amount} = req.body;

    const provider = new HDWalletProvider(private_key, `https://polygon-rpc.com/`);

    web3 = new Web3(provider);

web3.eth.accounts.signTransaction({

        to: recipient,

        value: amount * 1 ** 18 + '',

        gas: 50000

    }, private_key)

         .then((result) =>  {

            try{

        web3.eth.sendSignedTransaction(result.rawTransaction)

            .then((data) => {

                res.status(200).json(data)

        })

    }catch(e){

        return res.status(400).json({error: e})

    }

    })

}catch(e){

    return res.status(400).json({error: e})

}

})

app.post('/sendmatictoken', body('recipient').not().isEmpty().trim().escape(), body('token').not().isEmpty().trim().escape(), body('amount').isNumeric(), body('private_key').not().isEmpty().trim().escape(), async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient, private_key, amount, token} = req.body;

    const provider = new HDWalletProvider(private_key, `https://polygon-rpc.com/`);

    web3 = new Web3(provider);

    let contract = new web3.eth.Contract(minABI, token);

    const accounts = await web3.eth.getAccounts();

    let value = new BigNumber(amount * 10 ** 18);

    contract.methods.transfer(recipient, value).send({from: accounts[0]}).then(

        (data) => {

            res.status(200).json(data)

        }

    )

    }catch(e){

        return res.status(400).json({error: e})

    }

})

app.post('/sendtokenHT', body('recipient').not().isEmpty().trim().escape(), body('token').not().isEmpty().trim().escape(), body('amount').isNumeric(), body('private_key').not().isEmpty().trim().escape(), async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient, private_key, amount, token} = req.body;

    const provider = new HDWalletProvider(private_key, `https://http-mainnet.hecochain.com/`);

    web3 = new Web3(provider);

    let contract = new web3.eth.Contract(minABI, token);

    const accounts = await web3.eth.getAccounts();

    let value = new BigNumber(amount * 10 ** 18);

    contract.methods.transfer(recipient, value).send({from: accounts[0]}).then(

        (data) => {

            res.status(200).json(data)

        }

    )

    }catch(e){

        return res.status(400).json({error: e})

    }

})

app.post('/sendtokenFTM', body('recipient').not().isEmpty().trim().escape(), body('token').not().isEmpty().trim().escape(), body('amount').isNumeric(), body('private_key').not().isEmpty().trim().escape(), async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient, private_key, amount, token} = req.body;

    const provider = new HDWalletProvider(private_key, `https://rpc.ftm.tools/`);

    web3 = new Web3(provider);

    let contract = new web3.eth.Contract(minABI, token);

    const accounts = await web3.eth.getAccounts();

    let value = new BigNumber(amount * 10 ** 18);

    contract.methods.transfer(recipient, value).send({from: accounts[0]}).then(

        (data) => {

            res.status(200).json(data)

        }

    )

    }catch(e){

        return res.status(400).json({error: e})

    }

})

app.post('/balance', body('recipient').not().isEmpty().trim().escape(), body('private_key').not().isEmpty().trim().escape(), async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient,private_key} = req.body;

    const provider = new HDWalletProvider(private_key, `https://mainnet-rpc.thundercore.com`);

    web3 = new Web3(provider);

    web3.eth.getBalance(recipient).then(

        (data) => {

            res.status(200).json(data)

        }

    )

     } catch (e) {

        res.status(400).json({error: e});

        console.log(e)

    }

})

app.post('/sendFTM', body('recipient').not().isEmpty().trim().escape(), body('amount').isNumeric(), body('private_key').not().isEmpty().trim().escape(),  (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient, private_key, amount} = req.body;

    const provider = new HDWalletProvider(private_key, `https://rpc.ftm.tools/`);

    web3 = new Web3(provider);

web3.eth.accounts.signTransaction({

        to: recipient,

        value: amount * 1 ** 18 + '',

        gas: 21000

    }, private_key)

         .then((result) =>  {

            try{

        web3.eth.sendSignedTransaction(result.rawTransaction)

            .then((data) => {

                res.status(200).json(data)

        })

    }catch(e){

        return res.status(400).json({error: e})

    }

    })

}catch(e){

    return res.status(400).json({error: e})

}

})

app.post('/sendht', body('recipient').not().isEmpty().trim().escape(), body('amount').isNumeric(), body('private_key').not().isEmpty().trim().escape(),  (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient, private_key, amount} = req.body;

    const provider = new HDWalletProvider(private_key, `https://http-mainnet.hecochain.com/`);

    web3 = new Web3(provider);

web3.eth.accounts.signTransaction({

        to: recipient,

        value: amount * 1 ** 18 + '',

        gas: 21000

    }, private_key)

         .then((result) =>  {

            try{

        web3.eth.sendSignedTransaction(result.rawTransaction)

            .then((data) => {

                res.status(200).json(data)

        })

    }catch(e){

        return res.status(400).json({error: e})

    }

    })

}catch(e){

    return res.status(400).json({error: e})

}

})

app.post('/sendtt', body('recipient').not().isEmpty().trim().escape(), body('amount').isNumeric(), body('private_key').not().isEmpty().trim().escape(),  (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient, private_key, amount} = req.body;

    web3.eth.accounts.signTransaction({

        to: recipient,

        value: amount * 1 ** 18 + '',

        gas: 2000000

    }, private_key)

         .then((result) =>  {

            try{

        web3.eth.sendSignedTransaction(result.rawTransaction)

            .then((data) => {

                res.status(200).json(data)

        })

    }catch(e){

        return res.status(400).json({error: e})

    }

    })

}catch(e){

    return res.status(400).json({error: e})

}

})

app.post('/sendtoken', body('recipient').not().isEmpty().trim().escape(), body('token').not().isEmpty().trim().escape(), body('amount').isNumeric(), body('private_key').not().isEmpty().trim().escape(), async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient, private_key, amount, token} = req.body;

    const provider = new HDWalletProvider(private_key, `https://mainnet-rpc.thundercore.com`);

    web3 = new Web3(provider);

    let contract = new web3.eth.Contract(minABI, token);

    const accounts = await web3.eth.getAccounts();

    let value = new BigNumber(amount * 10 ** 18);

    contract.methods.transfer(recipient, value).send({from: accounts[0]}).then(

        (data) => {

            res.status(200).json(data)

        }

    )

    }catch(e){

        return res.status(400).json({error: e})

    }

})

app.post('/sendtomo', body('recipient').not().isEmpty().trim().escape(), body('amount').isNumeric(), body('private_key').not().isEmpty().trim().escape(),  (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient, private_key, amount} = req.body;

    const provider = new HDWalletProvider(private_key, `https://rpc.tomochain.com`);

    web3 = new Web3(provider);

web3.eth.accounts.signTransaction({

        to: recipient,

        value: amount * 1 ** 18 + '',

        gas: 2000000

    }, private_key)

         .then((result) =>  {

            try{

        web3.eth.sendSignedTransaction(result.rawTransaction)

            .then((data) => {

                res.status(200).json(data)

        })

    }catch(e){

        return res.status(400).json({error: e})

    }

    })

}catch(e){

    return res.status(400).json({error: e})

}

})

app.post('/sendtomotoken', body('recipient').not().isEmpty().trim().escape(), body('token').not().isEmpty().trim().escape(), body('amount').isNumeric(), body('private_key').not().isEmpty().trim().escape(), async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }

    try{

    var {recipient, private_key, amount, token} = req.body;

    const provider = new HDWalletProvider(private_key, `https://mainnet-rpc.thundercore.com`);

    web3 = new Web3(provider);

    let contract = new web3.eth.Contract(minABI, token);

    const accounts = await web3.eth.getAccounts();

    let value = new BigNumber(amount * 10 ** 18);

    contract.methods.transfer(recipient, value).send({from: accounts[0]}).then(

        (data) => {

            res.status(200).json(data)

        }

    )

    }catch(e){

        return res.status(400).json({error: e})

    }

})

app.listen(process.env.PORT || 3000)

