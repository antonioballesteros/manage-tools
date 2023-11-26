export async function fakeDelay(stallTime = 3000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}