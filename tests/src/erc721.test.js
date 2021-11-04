import "core-js/stable";
import "regenerator-runtime/runtime";
import { waitForAppScreen, zemu, txFromEtherscan } from './test.fixture';
import { TransportStatusError } from "@ledgerhq/errors";

test('[Nano S] Transfer erc721', zemu("nanos", async (sim, eth) => {

  // https://etherscan.io/getRawTx?tx=0x4b84aee342d8397b9b63a6639c832ec1eabc028edff6d6fab473ff04b291e314
  const rawTx = "0x02f901320182022f8459682f0085246ad7eb3182de2994424db67b40b15ed85475c3f29dedf601b6ee75b280b8c4f242432a000000000000000000000000dcdb88f3754b2841093d9348a2d02df8cf06314c000000000000000000000000df9fb2eff1f2871caeeb94bf262ffba84efddddc0000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000c001a0c4283f86dc852e43e9fd1077b448c63fec76bdeb44dfac977730725e41fa3676a0543b2d2f99f65fb20cd548964eee94b1c1865919f4574c7089d8b95678b667c2";
  const serializedTx = txFromEtherscan(rawTx);

  // with ETH need to test
  // const serializedTx = txFromEtherscan("0x02f901350182022f8459682f0085246ad7eb3182de2994424db67b40b15ed85475c3f29dedf601b6ee75b283424242b8c4f242432a000000000000000000000000dcdb88f3754b2841093d9348a2d02df8cf06314c000000000000000000000000df9fb2eff1f2871caeeb94bf262ffba84efddddc0000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000c001a0c4283f86dc852e43e9fd1077b448c63fec76bdeb44dfac977730725e41fa3676a0543b2d2f99f65fb20cd548964eee94b1c1865919f4574c7089d8b95678b667c2");

  const tx = eth.signTransaction(
    "44'/60'/1'/0/0",
    serializedTx,
  );

  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_erc721_transfer_ethereum', [8, 0]);

  await expect(tx).resolves.toEqual({
    "r": "363a70d6817dde251ab1d24ffb18f235fcc2b1acb12d42f56b0ee967902a1ef1",
    "s": "0a9bf6b4a00f27187bbb22536f70d7fea69b585adc033902939b08d10dbcdcfd",
    "v": "01",
  });
}));

test('[Nano S] Transfer erc721 big tokenID', zemu("nanos", async (sim, eth) => {

  const rawtx = "0x02f901320182022f8459682f0085246ad7eb3182de2994424db67b40b15ed85475c3f29dedf601b6ee75b280b8c4f242432a000000000000000000000000dcdb88f3754b2841093d9348a2d02df8cf06314c000000000000000000000000df9fb2eff1f2871caeeb94bf262ffba84efddddcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000c001a0c4283f86dc852e43e9fd1077b448c63fec76bdeb44dfac977730725e41fa3676a0543b2d2f99f65fb20cd548964eee94b1c1865919f4574c7089d8b95678b667c2"
  const serializedTx = txFromEtherscan(rawtx);

  const tx = eth.signTransaction(
    "44'/60'/1'/0/0",
    serializedTx,
  );

  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_erc721_transfer_ethereum', [8, 0]);

  await expect(tx).resolves.toEqual({
    "r": "363a70d6817dde251ab1d24ffb18f235fcc2b1acb12d42f56b0ee967902a1ef1",
    "s": "0a9bf6b4a00f27187bbb22536f70d7fea69b585adc033902939b08d10dbcdcfd",
    "v": "01",
  });
}));