import * as nrwl from "@nrwl/nx-plugin/testing";

describe("setup cargo:cosmwasm for osmosis", () => {
	let cosmwasm = "test"
		
	it("should create a new Cosmwasm smart contract", async () => {
		nrwl.ensureNxProject("nxcw", "dist/packages/cargo");

		await nrwl.runNxCommandAsync(`generate nxcw:osmosis ${cosmwasm}`);

		expect(() => {
			nrwl.checkFilesExist(`contracts/${cosmwasm}/src/lib.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/msg.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/state.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/contract.rs`);
		}).not.toThrow();
	}, 70000);
	it("should generate schema", async () => {
		nrwl.ensureNxProject("nxcw", "dist/packages/cargo");

		await nrwl.runNxCommandAsync(`schema ${cosmwasm}`);

		expect(() => {
			nrwl.checkFilesExist(`schema/${cosmwasm}/state.json`);
		}).not.toThrow()
	}, 30000);
	it("should compile into wasm", async () => {
		nrwl.ensureNxProject("nxcw", "dist/packages/cargo");

		await nrwl.runNxCommandAsync(`run ${cosmwasm}:wasm`);

		expect(() => {
			nrwl.checkFilesExist(`target/wasm32-unknown-unknown/release/${cosmwasm}.wasm`);
		}).not.toThrow();
	}, 30000);

});
