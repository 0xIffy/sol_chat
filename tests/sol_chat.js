const anchor = require('@project-serum/anchor');
const assert = require("assert");
const { SystemProgram } = anchor.web3;

describe('Testing Sol Chat', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolChat;

  const baseAccount = anchor.web3.Keypair.generate();

  it('Is initialized!', async () => {
    // await programs.rpc.
    const tx = await program.rpc.initialize("Hello World", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount]
    });
    console.log("Your transaction signature", tx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Data:", account.data);
    assert.ok(account.data === "Hello World");
    
  });

  it('Has update functionality: ', async () => {
    const tx = await program.rpc.update("World, Hello", {
      accounts: {
        baseAccount: baseAccount.publicKey
      },
    });
    console.log("tx sig:", tx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Data:", account.data);
    assert.ok(account.data === "World, Hello");
    console.log("Account:", account);
    console.log("All data", account.dataList);
    assert.ok(account.dataList.length === 2);
  })
});
